# ProofPilot Agents — Local Skill Package

This is the **local, runtime-free** version of the ProofPilot agent roster. Every agent is a collection of markdown doctrine + examples + (for WebsitePilot) Vite template scaffolds. The **model is the runtime** — Claude Code, ChatGPT Codex, or Gemini CLI reads these skill files and executes them end-to-end.

**No Railway. No FastAPI. No orchestration backend.** If you're looking for the production API, that lives in the original `proofpilot/agent-hub` repo. This package is everything you need to run the agents locally in a fresh session.

---

## How to use this package

### In Claude Code
Open Claude Code in this directory (`cd ~/proofpilot-agents && claude`) and say what you want to run. For example:
- "Use WebsitePilot to build a demo for https://example.com"
- "Use AuditPilot on https://example.com — produce a sales audit"
- "Use AutoPilot to generate a service page for [client] targeting [keyword]"

Claude will read the relevant `<pilot>/skill/SKILL.md` and follow the doctrine.

### In ChatGPT Codex
Point Codex at this folder. Tell it: "Read `AGENTS.md` for the agent roster, then read the SKILL.md file for the Pilot I'm invoking. Execute the doctrine end-to-end. Working files go in `/tmp/<client>-<pilot>/`, never modify anything in this package."

### In Gemini CLI
`cd ~/proofpilot-agents && gemini -y -p "$(cat autopilot/skill/SKILL.md) — now run this for https://example.com"` or similar.

---

## The 10 Pilots

| Pilot          | What it does                                                                                    | Entry skill                          |
|----------------|-------------------------------------------------------------------------------------------------|--------------------------------------|
| **AuditPilot** | Multi-stage sales audit of a prospect's digital presence → branded audit doc                    | `auditpilot/skill/SKILL.md`          |
| **AutoPilot**  | Three-brain SEO page builder (Brand → Designer → Website) for service / location / blog pages   | `autopilot/skill/SKILL.md`           |
| **GBPPilot**   | Google Business Profile strategist — optimize listings, categories, posts, Q&A                  | `gbppilot/skill/SKILL.md`            |
| **PilotCore**  | Central coworker — context, briefings, escalation, glue between other pilots                    | `pilotcore/skill/SKILL.md`           |
| **ProjectPilot** | Project management + launch-control sweeps across active clients                              | `projectpilot/skill/SKILL.md`        |
| **QAPilot**    | 7-layer QA review for SEO deliverables (content, structure, links, brand, compliance, intent, conversion) | `qapilot/skill/SKILL.md`    |
| **RedditPilot** | Reddit outreach engine — scan for opportunities, draft, A/B, learn                             | `redditpilot/skill/SKILL.md`         |
| **ReportPilot** | Monthly + ad-hoc client reports with 5-gate QA                                                 | `reportpilot/skill/SKILL.md`         |
| **StrategyPilot** | 13-section SEO strategy document (the quarterly roadmap)                                     | `strategypilot/skill/SKILL.md`       |
| **WebsitePilot** | End-to-end website sales agent: audit → strategy → demo → close. Owns the 12-template library. | `websitepilot/skill/SKILL.md`        |

---

## Cross-agent choreography

WebsitePilot calls AuditPilot, StrategyPilot, and AutoPilot under the hood. AutoPilot references the inspiration guide. PilotCore is the briefing glue. Each agent's `AGENTS.md` documents which siblings it uses — read those first when orchestrating multi-agent work.

---

## What's NOT in this package

- `*.py` — the Railway/FastAPI runtime (engine.py, router.py, stages.py, brand_extractor.py, etc.). Not needed locally — the model replaces them.
- `tests/` — Python unit tests for the Railway runtime.
- `node_modules/`, `dist/`, `__pycache__/` — generated artifacts.
- `*.db`, `*.sqlite` — the job-persistence DBs from Railway.

If you ever need to see the Python implementation for reference, it lives at `~/ProofPilot/agent-hub/backend/agents/<pilot>/`.

---

## Standard agent shape

```
<pilot>/
  agent.md              # one-line identity
  SOUL.md               # identity, values, boundaries
  CLAUDE.md             # scoped doctrine for this folder
  AGENTS.md             # which sibling agents this one calls
  README.md             # human overview
  TOOLS.md              # external systems + MCP tools used
  USER.md               # (optional) user-facing notes
  HEARTBEAT.md          # heartbeat / monitoring pattern
  skill/
    SKILL.md            # FULL OPERATING DOCTRINE — the source of truth
    references/         # supporting doctrine (named per-concern)
  context/              # bookmark context docs
  examples/             # shipped outputs (sanitized, canonical reference builds)
  prompts/              # reusable prompt templates (.md only)
  memory/               # memory patterns (yaml or md)
```

**Rule:** when a user invokes a pilot, the model reads `<pilot>/skill/SKILL.md` first. Everything else is supporting material.

---

## WebsitePilot template library

`websitepilot/templates/` contains the 12-profile template library used for demo builds:

- `registry.json` — 12 scored profiles across 5 archetypes
- `sources/` — 5 full Vite scaffolds (React + Tailwind + shadcn)
  - `state48glass/` — authority blue
  - `keystonerestoration/` — earthy restoration
  - `austinrockinshauling/` — industrial hauling
  - `proactive-pool-solutions/` — clean residential cyan
  - `doggy-detail/` — bold consumer

Never pre-pick a template. Score all 12 profiles against the brief, take the winner, customize heavily.

---

## Canonical reference builds

- `autopilot/examples/prestige-v3-benchmark/` — the April 23 2026 Prestige Electrical build. Locked brand discipline, canonical reference for what "good" looks like. Read before any new run.
- `auditpilot/examples/`, `strategypilot/examples/`, etc. — shipped outputs for each agent type.

---

## Updating this package

This package is **extracted from `~/ProofPilot/agent-hub/backend/agents/`** (the agent-hub repo). To refresh:

```bash
rsync -a --delete \
  --exclude='__pycache__/' \
  --exclude='*.pyc' \
  --exclude='node_modules/' \
  --exclude='dist/' \
  --exclude='.venv/' \
  --exclude='*.db' --exclude='*.sqlite*' \
  --exclude='*.py' \
  --exclude='tests/' \
  ~/ProofPilot/agent-hub/backend/agents/ ~/proofpilot-agents/
```

The original agent-hub stays the source of truth for doctrine; this is a snapshot for portable use.

---

## License + ownership

Internal ProofPilot use. Do not distribute outside the team without approval.
