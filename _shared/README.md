# `_shared/` — doctrine + light helpers

Read-only directory that every pilot can reference without importing
from a sibling agent.

## What is here

- `skills/` — verbatim SKILL.md + references for doctrine multiple
  pilots share:
  - `proofpilot-brand` — brand colors, typography, docx rendering rules
  - `proofpilot-doc-delivery` — standard delivery patterns
  - `proofpilot-docx-gdrive-workflow` — branded doc + Drive upload
  - `proofpilot-gdocs-styling` — Google Docs styling patterns
  - `pilot-api-reference` — Slack + DataForSEO + ClickUp helper scripts
  - `pilot-communication` — tone + phrasing for Pilot coworker voice
  - `pilot-company` — ProofPilot internal context
  - `pilot-team` — team member identities and lanes
  - `pilot-client-knowledge` — per-client operating context
  - `proofpilot-seo-report-data-stack` — data-source ladder for SEO reports
  - `maps` — Google Maps evidence workflow
  - `strategypilot-defaults` — default strategy inputs + heuristics
  - `proofpilot-agents` — overview of the agent hub itself

- `doctrine.py` — tiny loader helpers (`load_shared_skill`,
  `load_shared_reference`, `list_shared_skills`) for any pilot that
  wants to read a shared SKILL at runtime.

## Why `_shared/` and not `shared/`

The agent loader (`backend/agents/__init__.py`) skips directories
starting with `_`. That keeps this folder out of auto-discovery so it
doesn't get mounted as a fake "pilot" with no manifest or router.

## Hard rules

- No Python business logic lives here. Only doctrine + loader helpers.
- Never import from a sibling pilot. If you need a utility, put it
  under `backend/utils/` or `backend/core/` instead.
- Never write to this directory at runtime. Updates go through the
  deep export flow.
