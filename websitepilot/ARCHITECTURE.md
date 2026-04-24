# WebsitePilot Architecture

> Status: v1 · Authored 2026-04-22 from the WebsitePilot deep export
> (`websitepilot_export_20260423_064500.zip`) + 5 client template repos.

## Mission

Move one lead from discovery → close-ready proof. WebsitePilot is the
**combined website sales agent**: it unifies lead qualification, a
sales-focused audit, a strategy blueprint, a live demo homepage, a
close pitch, and a final bundle — all in one workflow.

It exists so Matthew can walk into a sales call holding:

1. Proof the current site is underperforming
2. A clear strategy for what to build instead
3. A live preview of the better version
4. A recommended close path

## Position in the pilot roster

WebsitePilot **composes** capabilities from other pilots. It does not
duplicate them:

| Concern          | Owned by        | How WebsitePilot uses it                              |
|------------------|-----------------|-------------------------------------------------------|
| Sales audit      | AuditPilot      | Reuses `engine.run_audit` (lazy import)               |
| Strategy doc     | StrategyPilot   | Reuses `engine.run_strategy` (lazy import)            |
| Demo page build  | AutoPilot       | Calls AutoPilot's pipeline with `page_type=homepage`  |
| Internal QA      | QAPilot         | Optional pass on the close doc                        |
| Close proposal   | proposals wf    | Reuses `workflows/proposals.py` for the final doc     |
| Shared brand doc | `_shared/` docs | Applies proofpilot-brand + doc-delivery doctrine      |

WebsitePilot owns what is *sales-specific*: the demo homepage brief,
the template selector, the sales-pitch narrative, and the final bundle
tiering (light / standard / full).

## Pipeline

```
 ┌──────────────┐    ┌──────────┐    ┌────────────┐    ┌────────────┐    ┌──────────────┐    ┌───────────┐    ┌──────────┐
 │ 1 Qualify    │ -> │ 2 Audit  │ -> │ 3 Strategy │ -> │ 4 Brief    │ -> │ 5 Template + │ -> │ 6 Close   │ -> │ 7 Bundle │
 │   lead       │    │ (sales)  │    │ blueprint  │    │ for demo   │    │   demo build │    │   pitch   │    │          │
 └──────────────┘    └──────────┘    └────────────┘    └────────────┘    └──────────────┘    └───────────┘    └──────────┘
```

Streams markdown via SSE. The final frame carries the bundle metadata
the frontend needs to render preview + docx links.

### Stage details

| # | Stage                | Engine call                                  | System prompt                         |
|---|----------------------|----------------------------------------------|---------------------------------------|
| 1 | Qualify lead         | (Python only; normalizes domain/service)     | —                                     |
| 2 | Sales audit          | `agents.auditpilot.engine.run_audit`         | AuditPilot's SYNTHESIS_SYSTEM         |
| 3 | Strategy blueprint   | `agents.strategypilot.engine.run_strategy`   | StrategyPilot's SYNTHESIS_SYSTEM      |
| 4 | Demo brief synthesis | `prompts/demo_brief_system.md`               | Claude Sonnet                         |
| 5 | Template select + demo | `templates/library.py::select_templates` → `agents.autopilot.sprint_runner.run_sprint` (or dry-run when AutoPilot is not reachable) | Template context injected in notes |
| 6 | Close pitch          | `prompts/close_pitch_system.md`              | Claude Opus                           |
| 7 | Bundle               | `bundle.py::shape_bundle(tier)`              | —                                     |

Each stage is **failure-tolerant**. If AutoPilot is unavailable,
WebsitePilot still delivers the audit + strategy + brief + close pitch
and clearly marks the demo as `BLOCKED`.

## Template library

Lives at `backend/agents/websitepilot/templates/`.

- `registry.json` — 12 template profiles across 5 source archetypes.
  Each profile carries an id, status, source_slug, supported
  page_types, selection_terms (for auto-select), style_traits,
  best_for, prompt_focus.
- `sources/<slug>/` — curated mirrors of the 5 proven ProofPilot builds
  (`package.json`, `src/index.css`, `src/pages/Index.tsx`, all
  `src/components/*.tsx`). Used by the design agent for structural
  inspiration, not literal copying.
- `library.py` — pure Python registry loader + scorer. No external
  deps. Exports `load_registry`, `list_templates`, `get_template`,
  `select_templates`, `build_template_context`.
- `sync.py` — refreshes the mirrored sources from local clones of the
  5 source repos. Used when we re-baseline the library.

### Selector algorithm

`select_templates(page_type, service, keyword, location, notes)`
scores every ready template:

- `+12` if the template supports the requested page_type
- `+4` per `selection_term` that matches the blob of
  (page_type + service + keyword + location + notes), lowercased
- `+2` for homepage-preferred defaults when no explicit override
- Requested override IDs (comma-separated) bypass scoring

Returns the top-`limit` (default 2) templates.

`build_template_context` renders the picked templates into a prompt
block the design stage can inject into its notes — including component
order, key component filenames, and truncated excerpts from
`Index.tsx` and `index.css`. Capped at ~9000 chars by default.

## Tier model

Every WebsitePilot run selects a delivery tier that shapes the bundle:

- **light** — quick pain summary + 3-5 findings + demo recommendation
- **standard** — audit summary + homepage angle + demo preview + next step
- **full** — full audit + strategy blueprint + demo + screenshots + close path

Tier is either explicit in the request, or inferred from the lead's
declared value (`lead_value` / `monthly_revenue`).

## Handoff contract

Every run ends with a WebsitePilot Handoff Summary:

```
Status: DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_INPUT
Lead: company, domain, market
Audit artifact: link or inline
Strategy artifact: link or inline
Demo artifact: preview URL (or BLOCKED reason)
Biggest leverage point: one sentence
Recommended next move: one sentence
```

This is parsed by the frontend into the Matthew-facing sales card.

## What WebsitePilot must NEVER do

1. Invent audit numbers, screenshots, or competitor claims.
2. Publish anything to the prospect's live site.
3. Copy client brand names or proprietary copy from template sources.
   Templates are *structural* DNA, not content DNA.
4. Deliver a demo without visual verification (either automated via
   `visual_qa.py` or human eyes).
5. Spend Opus budget on cheap stages (qualify + brief use Sonnet).
