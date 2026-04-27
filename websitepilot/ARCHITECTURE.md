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
| 5 | Style-family + template select + demo | `templates/library.py::recommend_design_system` → `agents.autopilot.sprint_runner.run_sprint` (or dry-run when AutoPilot is not reachable) | Family + template context injected in notes |
| 6 | Close pitch          | `prompts/close_pitch_system.md`              | Claude Opus                           |
| 7 | Bundle               | `bundle.py::shape_bundle(tier)`              | —                                     |

Each stage is **failure-tolerant**. If AutoPilot is unavailable,
WebsitePilot still delivers the audit + strategy + brief + close pitch
and clearly marks the demo as `BLOCKED`.

## Design-system library

Lives at `websitepilot/templates/`, with companion family doctrine in `websitepilot/style-families/`.

- `registry.json` — 14 template profiles across 6 source archetypes.
  Each profile carries an id, status, style_family, source_slug,
  supported page_types, selection_terms (for auto-select),
  style_traits, best_for, prompt_focus.
- `../style-families/manifest.json` — 4 visual-family definitions.
  Each family carries selection cues, anti-fit cues, fit metadata,
  default scaffold ids, starter-file paths, and reference URLs.
- `../style-families/<family>/starter/` — family starter CSS and section
  components. This is the code layer that teaches the model how the
  family behaves, not just what it is called.
- `sources/<slug>/` — curated mirrors of the 5 proven ProofPilot builds
  (`package.json`, `src/index.css`, `src/pages/Index.tsx`, all
  `src/components/*.tsx`). Used by the design agent for structural
  inspiration, not literal copying.
- `library.py` — pure Python registry loader + scorer. No external
  deps. Exports `load_registry`, `load_style_families`,
  `infer_style_families`, `select_templates`,
  `recommend_design_system`, `build_style_family_context`,
  `build_template_context`.
- `sync.py` — refreshes the mirrored sources from local clones of the
  external source repos. Native sources stay in this package.

### Selector algorithm

`recommend_design_system(page_type, service, keyword, location, notes, ...)`
runs three decisions in order.

First: `infer_style_families(...)` scores each family with:

- `+5` per matching `selection_term`
- `-6` per matching `anti_fit_term`
- `+6` when `brand_maturity` fits
- `+6` when `proof_density` fits
- `+5` when `price_point` fits
- `+7` when `service_model` fits
- `+4` per matching visual temperament signal

Second: `derive_brand_customization(...)` converts Brand Brain cues into
anti-sameness design guardrails:

- typography strategy and font pairing
- body copy legibility rule
- corner, button, and card treatment
- section-transition signature
- motif intensity
- QA checks against repeated template defaults

Third: `select_templates(...)` scores templates inside the chosen
family:

- `+12` if the template supports the requested `page_type`
- `+4` per matching `selection_term`
- `+10` when the template is a native scaffold for the chosen family
- `+5` when it is a bridge scaffold via `secondary_style_families`
- `+4` to `+1` when it appears early in the family's default scaffold order
- `+2` when it is a proven recipe

Requested override IDs bypass scoring for either layer.

Returns the top-`limit` families and templates, plus prompt-ready context.
The return payload also includes `brand_customization` and
`brand_customization_context` so Designer Brain has concrete guardrails
for typography, radius, buttons, cards, motif intensity, and transition
style before touching code.

`build_style_family_context` renders the chosen family doctrine into a
prompt block — including the family rationale, starter CSS excerpt, and
starter section-component excerpt.

`build_template_context` renders the chosen scaffold templates into a
second prompt block — including component order, key component
filenames, and truncated excerpts from `Index.tsx` and `index.css`.
Capped at ~9000 chars by default.

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
