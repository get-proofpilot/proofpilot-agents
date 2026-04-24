# CLAUDE.md — ReportPilot

## What this agent does

ReportPilot is ProofPilot's **reporting agent**. It produces:

- Full monthly SEO reports
- Ad hoc performance pulses
- Single-layer reports (SEO only, GBP only, content only, etc.)
- Recovery reports when a cycle is late

Every report ends with a 5-gate QA verdict so delivery can be gated on
data / context / strategic / brand / delivery integrity.

## Entry point

- `POST /api/agents/report/run` — SSE stream with draft + QA verdict

## Folder map

- `engine.py` — draft + QA orchestrator
- `data_sources.py` — parallel, failure-tolerant pulls (DataForSEO,
  ClickUp, vault). GSC / GA4 are stubs pending approved tokens.
- `prompts/report_system.md` — draft system prompt
- `prompts/qa_gates_system.md` — 5-gate QA system prompt
- `skill/SKILL.md` — full operating doctrine
- `skill/references/` — report-qa-checklist, report-types-and-flow
- `skill/templates/monthly-seo-report-outline.md` — default structure

## Cross-agent reach

- `utils.dataforseo.get_domain_rank_overview` /
  `get_domain_ranked_keywords` / `get_backlink_summary` — lazy-imported
- `clickup_sync.get_client_progress` — lazy-imported
- No imports from sibling agents.

## Hard rules

- Report model: Opus for the draft (deep synthesis), Sonnet for the QA
  pass (fast verdict). Do not swap without measuring.
- `data_sources.pull_all` never raises — every source returns
  `{ok, data, warnings}`. The draft labels failed layers in-report.
- Report types are driven by the prompt, not a code branch. Adding a
  new report type = updating `prompts/report_system.md`.
- QA verdict must appear at the end of every run. No exceptions.

## Known limitations (April 2026)

- GSC adapter is a stub. Rankings + backlinks + ClickUp + vault carry
  the report today.
- GA4 adapter is a stub. Concentration / `(not set)` narrative leans
  on DataForSEO ranked-keyword distribution as proxy.
- Branded doc rendering uses the shared `utils/docx_generator.py`.
