# CLAUDE.md — WebsitePilot

## What this agent does

WebsitePilot is the **combined website sales agent**. Given a lead
(company, domain, service, market), it runs a 7-stage pipeline and
ships a sales bundle:

1. Qualify lead
2. Sales audit (via AuditPilot)
3. Strategy blueprint (via StrategyPilot)
4. Demo homepage brief synthesis
5. Template selection + AutoPilot demo handoff
6. Close pitch (Opus, adaptive thinking)
7. Final bundle + handoff summary

It **composes** other pilots. It does not duplicate their internals.

## Entry points

- `POST /api/agents/website/run` — SSE stream, bundle + handoff block
- `POST /api/agents/website/templates/select` — preview picks + match scores
- `GET  /api/agents/website/templates` — list the library
- `GET  /api/agents/website/skill` — full SKILL.md
- `GET  /api/agents/website/health`

## Folder map

- `engine.py` — the 7-stage pipeline
- `bundle.py` — tier shaping + handoff block rendering
- `schemas.py` — Pydantic I/O
- `prompts/` — three system prompts (websitepilot / demo_brief / close_pitch)
- `templates/` — 12-profile design library + selector + sync script
  - `registry.json` — template profiles
  - `library.py` — loader + scorer + context builder
  - `sources/<slug>/` — curated mirror per source archetype
- `visual_qa.py` — Playwright + Claude vision screenshot compare
- `skill/` — full SKILL.md + references + related-skill doctrine
- `ARCHITECTURE.md` — the pipeline diagram and design rationale

## Cross-agent reach (all lazy-imported inside stages)

- `agents.auditpilot.engine.run_audit` — stage 2
- `agents.strategypilot.engine.run_strategy` — stage 3
- `agents.autopilot.sprint_runner.run_sprint` — stage 5 (demo handoff)
- Everything else: `_shared/` doctrine is read-only

## Template library rules

- Templates are **structural DNA**, not content DNA. Use their section
  rhythm, module ideas, and layout confidence — never copy brand
  names or client-specific copy.
- 12 profiles, 5 source archetypes. Multiple profiles can point at the
  same source but emphasize different angles
  (state48-authority-blue vs state48-estimator-led, etc).
- `select_templates` auto-picks; callers override with
  `design_template` (comma-separated ids accepted).
- `build_template_context` returns a prompt block capped at ~9000
  chars; this gets merged into AutoPilot's `notes` field.

## Hard rules

- Story order (pain → why → build → preview → close) is sacred.
- Every audit claim must trace to evidence. No invented numbers.
- Demo not verified visually ≠ demo done.
- Low-value leads get the **light** tier; don't force a full bundle.
- Never copy brand names from template sources.
- Every run ends with the WebsitePilot Handoff Summary block.

## How the demo handoff actually runs

`_kick_off_demo` calls `agents.autopilot.runtime.launch_homepage_demo`.
That module:

1. Tries to reuse `server._pipeline_engine` (the live singleton so
   every run shares `_active_runs` with `/api/pipeline/{id}` polls).
2. Falls back to a fresh `PipelineEngine` when `server` isn't
   importable (scripts, tests).
3. Returns `{status: queued, pipeline_id: pipe_xxxxx, engine: shared}`
   and schedules `engine.execute()` via `asyncio.create_task` so the
   HTTP response returns fast.

When called outside a running loop (CLI, pytest), the run is created
and persisted but not auto-executed — callers re-invoke `execute()`
themselves.

## Known gaps (April 2026)

- Visual QA runs one comparison round today. Future: iterative
  tighten loop when `similarity_score < 7`.
- `bundle.DemoArtifact.preview_url` is populated only when AutoPilot
  finishes a run. Until then the UI polls `/api/pipeline/{id}`.
- Stage 2 / 3 don't pass `competitor_domains` or `differentiators`
  back into the close pitch explicitly — they appear via the audit /
  strategy markdown the pitch prompt already ingests.
