# CLAUDE.md — ProjectPilot

## What this agent does

ProjectPilot is the **PM + launch-control agent**. It runs four sweep
types across the active client roster:

- `pm_control` — general PM sweep (red flags, watch items, routing)
- `gbp_compliance` — weekly GBP posting state per client
- `page_flow` — copy → dev → QA → launch handoff + live verification
- `review_response` — unanswered-review age monitoring

Unlike QAPilot (which reviews one page deeply), ProjectPilot asks:
**"Did this actually get across the line?"**

## Entry points

- `POST /api/agents/project/sweep` — SSE stream of findings
- `GET /api/agents/project/state` — current tracker dump
- `GET /api/agents/project/skill` — full SKILL.md

## Folder map

- `engine.py` — sweep orchestrator (prompt-driven)
- `state.py` — persistent tracker (SQLite or JSON fallback)
- `prompts/` — one `.md` per sweep type
- `schemas.py` — Pydantic I/O (SweepRequest, SweepFinding)
- `skill/SKILL.md` — full operating doctrine (verbatim source of truth)
- `skill/references/` — client-cadence-map, watch-memory, tracker-schema, cron-prompts

## Truth layers

ProjectPilot reasons across three layers, never one:

1. **ClickUp** — workflow truth
2. **Slack threads + `#for-approvals`** — approval truth
3. **Live URL / GBP** — publication truth

If any two disagree, that's a finding. If all three agree → silent.

## Cross-agent reach

- `clickup_sync.get_all_clients_progress()` — lazy-imported (same
  module server.py uses for the SEO Playbook).
- `vault_data/_clients-index.yaml` — read-only client roster.
- Firecrawl / Maps checks are prompt-driven (Claude decides how to
  verify) — no code-level browser automation here.

## Hard rules

- Never post when a sweep found nothing new. Silence > noise.
- Never hardcode per-client aging thresholds — those live in the prompt.
- Never modify `vault_data/`. It's a read-only mirror.
- Always update state after a sweep, even on silent runs — the
  `last_run` timestamp drives future dedup.

## State tracker

Minimum fields per entry (see `skill/references/tracker-schema.md`):
client, asset_type, clickup_task_id, live_url, owner, reviewer,
coordinator, current_clickup_status, slack_approval_status,
publish_window, image_status, last_live_check_at,
oldest_unanswered_review_age_days, risk_state, next_action,
last_escalated_at.

Storage: `$DOCS_DIR/projectpilot/state.json` (Railway volume) with
`load_state()` / `save_state()` helpers.
