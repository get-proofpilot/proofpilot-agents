# AGENTS.md — Agent roster for Codex / Claude / Gemini

**You are an agentic coding model operating inside the `~/proofpilot-agents/` directory.** This file is the index. Read it first, then drill into the specific pilot the user invoked.

---

## The rule

When the user says "run WebsitePilot" / "use AuditPilot" / "AutoPilot this" etc., **you MUST read that pilot's `skill/SKILL.md` before writing any code or making any decisions.** The SKILL.md is the operating doctrine — it contains the full procedure, the hard rules, the failure modes, and the quality gates. Do not paraphrase from memory. Read the file.

---

## The 10 pilots and their entry points

| Invocation                                     | Read first                                               | Outputs                                          |
|------------------------------------------------|----------------------------------------------------------|--------------------------------------------------|
| "Run AuditPilot" / "audit [url]"               | `auditpilot/skill/SKILL.md`                              | Branded sales audit doc (.docx)                  |
| "Run AutoPilot" / "build [page type] for [client] targeting [keyword]" | `autopilot/skill/SKILL.md` + its `references/three-brain-architecture.md` | SEO page HTML + QA score |
| "Run GBPPilot" / "optimize GBP for [client]"   | `gbppilot/skill/SKILL.md`                                | GBP optimization plan                            |
| "Use PilotCore" / "brief me on [client]"       | `pilotcore/skill/SKILL.md`                               | Context brief / escalation note                  |
| "Run ProjectPilot" / "launch-control sweep"    | `projectpilot/skill/SKILL.md`                            | Cross-client status report                       |
| "Run QAPilot" / "QA [deliverable]"             | `qapilot/skill/SKILL.md`                                 | 7-layer QA report with verdicts                  |
| "Run RedditPilot" / "scan reddit for [client]" | `redditpilot/skill/SKILL.md`                             | Opportunity list + drafted replies               |
| "Run ReportPilot" / "monthly for [client]"     | `reportpilot/skill/SKILL.md`                             | Branded monthly report (.docx)                   |
| "Run StrategyPilot" / "strategy for [client]"  | `strategypilot/skill/SKILL.md`                           | 13-section strategy doc                          |
| "Run WebsitePilot" / "build demo for [client]" | `websitepilot/skill/SKILL.md`                            | Live Vite demo + branded sales bundle (.docx)    |

---

## Working files go in `/tmp/`

**Never modify anything inside `~/proofpilot-agents/`.** This package is read-only doctrine + templates.

Per-client work happens in `/tmp/<client-slug>-<pilot>/`:

- `/tmp/prestige-demo/` — WebsitePilot work for Prestige Electrical
- `/tmp/bugs-weeds/` — WebsitePilot work for Bugs Weeds & More
- `/tmp/<client>-audit/` — AuditPilot
- etc.

Asset conventions:
- Brand archaeology output → `/tmp/<client>-<pilot>/brand-brain.json`
- Design spec → `/tmp/<client>-<pilot>/design-spec.md`
- Template-pick rationale → `/tmp/<client>-<pilot>/template-pick.md`
- Built demo → `/tmp/<client>-demo/` (Vite app)
- QA screenshots → `/tmp/<client>-demo/qa-screenshots/`

---

## Cross-agent choreography

Some pilots call siblings. Their `AGENTS.md` documents which. At a glance:

- **WebsitePilot** → calls AuditPilot (discovery), StrategyPilot (page plan), AutoPilot (page builds), QAPilot (review).
- **AutoPilot** → calls QAPilot for the final review loop.
- **PilotCore** → can call any pilot as a sub-agent.
- **ReportPilot** → reads outputs from StrategyPilot + AuditPilot for context.

When you dispatch a sibling pilot, read its SKILL.md too — don't assume you know it.

---

## The three-brain architecture (shared pattern)

Several pilots (AutoPilot, WebsitePilot) use a **three-brain architecture** with **model routing**:

1. **Brand Brain** — archaeology. What IS the brand right now? No opinions, just facts. → **Claude** (Playwright + Python Pillow)
2. **Designer Brain** — strategy. What should we preserve, elevate, or invent? → **Gemini 3.1 Pro subagent** (validated April 2026 as cleaner + tighter than Claude on this stage). Dispatched via `./scripts/gemini-dispatch.sh`.
3. **Website Brain** — execution. Apply the design spec to a template starter. → **Claude** (multi-file TS/TSX editing).

Read `autopilot/skill/references/three-brain-architecture.md` for the architecture and `autopilot/skill/references/model-routing.md` for how Claude dispatches the Designer Brain to Gemini. These are the two most important references in the package.

**Gemini requirement:** `GEMINI_API_KEY` env var (get one at https://aistudio.google.com/apikey) + `npm i -g @google/gemini-cli`. If unavailable, Claude runs Designer Brain itself — never block the pipeline on Gemini.

---

## Shared doctrine (`_shared/`)

Cross-agent skill files that apply to every pilot:

- `_shared/brand-skill/SKILL.md` — ProofPilot brand guardrails
- `_shared/doc-delivery/` — how to ship branded `.docx` / `.pdf`
- `_shared/pilot-communication/` — how pilots talk to each other + to the user
- `_shared/pilot-api-reference/` — (legacy) API reference from Railway; local use ignores it

---

## Hard rules (every pilot)

1. **Read SKILL.md first.** Every time. Even if you've seen it before — doctrine evolves.
2. **Never write inside `~/proofpilot-agents/`.** Work in `/tmp/`.
3. **Never invent facts.** If the brief lacks a fact, ask the user or scrape the client site.
4. **Authentic first.** Real client photos / copy / data beat stock / placeholder / invented.
5. **Every claim is defensible** — if you write "snowbirds welcomed," it's because the Brand Brain found that on the client's actual site.
6. **No Bootstrap blue, no teal "because industry," no invented metallics** — preserve > elevate > invent, in that order.
7. **Build must pass.** If a pilot produces code, `npm run build` / `pytest` / equivalent MUST pass before declaring done.
8. **The "remove the logo" test is the ship gate** for any design deliverable. See `autopilot/skill/references/gold-standard-playbook.md`.

---

## Failure modes to avoid (pattern-matched across past runs)

| Symptom | Root cause | Prevented by |
|---------|-----------|--------------|
| "Demo used generic navy + gold, not the client's logo colors" | Designer Brain didn't commit to logo palette | three-brain-architecture.md hard rule #1 |
| "Demo didn't pull the real logo" | Brand Brain skipped the logo-download step | brand-archaeology.md step 2 |
| "Looks like a template with a name swap" | Website Brain didn't customize deeply enough | Implementation Order priorities 1-14 in design-spec.md |
| "Audit findings feel generic" | AuditPilot skipped the live-site crawl | auditpilot SKILL.md Stage 1 |
| "Report is just numbers without narrative" | ReportPilot missed the story gates | reportpilot SKILL.md §5-gate framework |

---

## Canonical reference builds

Before any new run of a design/build pilot, read the canonical reference:

- **AutoPilot / WebsitePilot:** `autopilot/examples/prestige-v3-benchmark/` — the April 23 2026 Prestige build. Locked brand discipline.
- **Other pilots:** their `examples/` folder.

If your work doesn't match the quality of the reference, stop and revise before declaring done.
