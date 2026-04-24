# CLAUDE.md — GBPPilot

## What this agent does

GBPPilot is the **Google Business Profile strategist**. Given a
business, its website, its live GBP (or Maps listing), and its service
areas, it produces a full ProofPilot-branded GBP strategy document
covering categories, services, products, reviews, posts, NAP,
geo-relevance, and a website mirroring roadmap.

It is a local-search operating system for one surface (the GBP) plus
the website work needed to support it.

## Entry point

- `POST /api/agents/gbp/run` — SSE stream, `.docx` at the end
- `GET /api/agents/gbp/skill` — returns the full SKILL.md

## The operating procedure

The authoritative doctrine lives in `skill/SKILL.md` plus
`skill/references/`. The single distilled prompt the engine sends to
Claude is `prompts/gbp_system.md`.

If the SKILL drifts from the prompt, update the prompt — the prompt is
what the engine actually ships.

## Folder map

- `engine.py` — orchestrator + light live-evidence collector
- `schemas.py` — Pydantic I/O models
- `prompts/gbp_system.md` — system prompt (distilled from SKILL)
- `skill/` — full SKILL.md + references (verbatim source of truth)
- `router.py` — FastAPI routes (auto-mounted)
- `manifest.py` — metadata exposed to Agent Hub

## Cross-agent reach

- `agents.auditpilot.data_collector.firecrawl_scrape` — lazy-imported
  for the site evidence pass. This is the shared Firecrawl entry
  point; swap to `backend/integrations/firecrawl.py` when that exists.
- `utils.dataforseo.get_domain_ranked_keywords` /
  `utils.dataforseo.research_competitors` — lazy-imported.

All imports are inside `_collect_light_evidence()` so boot stays cheap.

## Hard rules

- Label every unverifiable claim: `visible` / `likely` /
  `recommended` / `unverified`.
- Never skip the mirroring matrix or the 30-60-90 rollout.
- Never echo a huge, messy public services list as separate page
  recommendations — collapse into canonical clusters.
- No em dashes, no semicolons in body copy. Enforced by the prompt.
- Never publish anything. GBPPilot strategizes; humans act.
