---
name: websitepilot
description: WebsitePilot — ProofPilot's combined website sales agent. Runs end-to-end website deals locally in Claude Code: lead qualification → sales audit → strategy → custom demo homepage (AutoPilot three-brain design) → branded deliverable. No VPS. No Railway call.
tags: [websitepilot, websites, sales, seo, audits, strategy, demos, proofpilot, local]
---

# WebsitePilot

## When to trigger

Load this skill when Matthew or the team asks for:
- A website sales agent / combined audit + strategy + demo workflow
- A prospect-closing website process
- A sales-focused website audit document
- A demo homepage or demo site to help close a deal
- A packaged website-prospecting system for home-service leads
- "Run WebsitePilot on <domain>"

## What this agent is

WebsitePilot is the full website-deal orchestrator. It unifies:

- **AuditPilot** — sales audit (pain + revenue opportunity)
- **StrategyPilot** — page system and growth blueprint
- **AutoPilot** — the custom demo homepage (three-brain design)
- **docx-kit** from `proofpilot-brand` — branded `.docx` output

## Canonical flow (local — Claude Code)

This is how WebsitePilot runs end-to-end in a single Claude Code session. Every stage is a dispatched subagent that writes its output to `/tmp/<client>/` and returns a structured report. Subsequent stages read the previous stage's file.

```
Lead qualification
        │
        ▼
┌─────────────────┐  (4 parallel subagents: rankings, site crawl, competitors, local map)
│  Sales audit    │─────────────────────────────────────┐
└─────────────────┘                                     │
        │                                               │
        ▼                                               │
┌─────────────────┐   reads audit + strategy doctrine   │
│   Strategy      │◄──────────────────────────────────────┘
└─────────────────┘
        │
        ▼
┌─────────────────┐   Three-Brain sequence (AutoPilot)
│  Demo brief     │─────────────────────────────────────┐
└─────────────────┘                                     │
        │                                               ▼
        │                              ┌─────────────────────────────┐
        │                              │    Brand Brain              │
        │                              │  (download logo, pixel      │
        │                              │   analyze, real assets)     │
        │                              └─────────────────────────────┘
        │                                               │
        │                                               ▼
        │                              ┌─────────────────────────────┐
        │                              │   Style Family Pick         │
        │                              │  (family first, scaffold    │
        │                              │   second)                   │
        │                              └─────────────────────────────┘
        │                                               │
        │                                               ▼
        │                              ┌─────────────────────────────┐
        │                              │    Designer Brain           │
        │                              │  (palette, type, motif,     │
        │                              │   transitions — strict)     │
        │                              └─────────────────────────────┘
        │                                               │
        │                                               ▼
        │                              ┌─────────────────────────────┐
        │                              │    Website Brain            │
        │                              │  (score family scaffolds,   │
        │                              │   pick winner, clone,       │
        │                              │   customize)                │
        │                              └─────────────────────────────┘
        │                                               │
        │           ┌───────────────────────────────────┘
        ▼           ▼
┌─────────────────────┐
│   Branded .docx     │   ← docx-kit from proofpilot-brand skill
│   + live demo URL   │   ← Vite dev server on localhost
└─────────────────────┘
```

## Core mission

Move a lead through one connected flow:
1. Qualify the right lead
2. Diagnose what is broken on the current site and in their search presence
3. Turn the diagnosis into a sales strategy with a 30/60/90 roadmap
4. Build a close-worthy custom demo homepage
5. Package everything so Matthew can close the deal faster

## Non-negotiables

- Every design decision ties back to real audit evidence.
- The strategy sharpens what the homepage is selling. It doesn't just list recommendations.
- The final deliverable reads as one connected sales document with proof → direction → next step.
- **AutoPilot output must pass the "remove the logo" test before reporting done.** See `autopilot/skill/references/gold-standard-playbook.md`.
- For stronger opportunities, bundle the audit, strategy, demo, and close path as one coherent document.

## Default workflow

### Stage 1 — Lead qualification
Confirm the company, domain, primary service, service area, and sales priority. If sourced from a lead sheet, pull any prior context (prior outreach, known blockers, referral source).

### Stage 2 — Sales audit
Run discovery subagents in parallel to expose pain with data:
- **Rankings reality** — DataForSEO domain overview + ranked keywords + target money-term SERPs
- **Site crawl** — Playwright-driven inventory: pages, conversion architecture, trust signals, schema, template residue
- **Competitor teardown** — top 5-7 real competitors with head-to-head keyword + content comparison
- **Local visibility** — 3-pack presence for primary service + city, GBP profile, geo reach

Synthesize into an **8-section Sales Audit v2** document (AuditPilot doctrine) at `/tmp/<client>/audit.md`. Lead with the pain stat (e.g. "Ranks for 0 of 15 money terms"). Sales-focused, not a technical checklist. Fifth-grade reading level. No em dashes. No semicolons.

### Stage 3 — Strategy layer
Turn audit findings into a **13-section StrategyPilot document** at `/tmp/<client>/strategy.md`:
- Homepage thesis
- Page-system plan (12-category taxonomy A-L)
- Offer positioning
- Service / location page architecture
- Content pillars
- 30/60/90 rollout
- ROI model (conservative / realistic / aggressive)
- 12-month future state
- Prioritized build plan (P1 / P2 / P3 / Not now)

StrategyPilot doctrine lives in the `strategypilot` skill. Reference it directly.

### Stage 4 — Demo brief
Condense audit + strategy into a **homepage demo brief** at `/tmp/<client>/demo-brief.md`:
- The one-sentence homepage thesis
- Section-by-section outline (hero / trust / services / moat / reviews / service area / process / FAQ / CTA / footer)
- Copy direction per section
- Conversion architecture (CTA ladder from sticky header → hero → mid-page → footer)
- What to remove from the current site (the kill list)

### Stage 5 — Custom demo (AutoPilot three-brain)

**Always run the three-brain sequence.** Skipping any brain is the primary cause of "template with a name swap" output.

#### Stage 5a — Brand Brain *(mandatory)*
Doctrine: `autopilot/skill/references/brand-archaeology.md`.
Capture what the brand IS — no opinions. Download the logo, pixel-analyze for colors, pull authentic photography (fleet, team, storefront), capture `@font-face` URLs, download favicon + OG image, read voice signals from copy.
**Output:** `/tmp/<client>/brand-brain.json` + verdict (PRESERVE+ELEVATE / PARTIAL ANCHOR / INVENT).

#### Stage 5b — Style Family Pick *(mandatory)*
Doctrine: `autopilot/skill/references/style-family-selector.md`.
Classify the prospect into the correct ProofPilot style family before any design spec gets written. Output `/tmp/<client>/template-pick.md`.

#### Stage 5c — Designer Brain *(mandatory — routed to Gemini 3.1 Pro)*
Doctrine: `autopilot/skill/references/design-strategist.md` + `autopilot/skill/references/gold-standard-playbook.md` + `autopilot/skill/references/inspiration/inspiration-guide.md` + `autopilot/skill/references/model-routing.md` + `autopilot/skill/references/style-family-selector.md`.
Decide preserve / elevate / invent for each element. Lock the palette (logo-derived only). Lock typography (preserve equity > elevate weight > invent face). Commit to ONE motif. Commit to ONE section-transition signature.

**Model routing: dispatch this stage to Gemini 3.1 Pro** via `./scripts/gemini-dispatch.sh` (see `autopilot/skill/references/model-routing.md`). Claude writes the brief, Gemini produces `design-spec.md`, Claude reads it and proceeds. Fallback: if Gemini is unreachable, Claude runs the stage itself.

```bash
./scripts/gemini-dispatch.sh /tmp/<client>/designer-brain-brief.md \
  --cwd /tmp/<client> \
  --log /tmp/<client>/designer-brain.log
```

**Output:** `/tmp/<client>/design-spec.md` with a numbered Implementation Order.

#### Stage 5d — Website Brain *(executor)*
Doctrine: `autopilot/skill/references/three-brain-architecture.md` (Stage 3).

1. **Run the design-system selector** in `websitepilot/templates/library.py`. Infer the style family first, then score scaffold templates inside that family. **Never pre-pick a default.** Pick winner + runner-up with rationale.
2. **Clone the winner's source** from `websitepilot/templates/sources/<slug>/` into `/tmp/<client>-demo/`.
3. `npm install` in the clone.
4. **Apply the Implementation Order** from `design-spec.md`, priority 1 → N:
   - Logo swap (Header + Footer)
   - Palette swap (CSS vars + tailwind config + legacy aliases pointing at the new palette)
   - Typography swap (`index.html` Google Fonts + tailwind `fontFamily`)
   - Hero — authentic photo + palette-aligned gradient overlay
   - Motif SVG component + 6+ placements
   - Button component rewrite
   - Section-transition signature applied consistently
   - Service card treatment (accent borders, duotone imagery, motif corner)
   - Eyebrow treatment on every section
   - Favicon + OG
   - Motion polish
5. `npm run build` — must pass with zero TS errors.
6. `npm run dev` — serve locally. Typically `http://localhost:5173/`.

**Reference example:** `autopilot/examples/prestige-v3-benchmark/` is the April 23 2026 benchmark. Read its README.md when any design decision looks uncertain.

### Stage 6 — QA and packaging

#### Design QA — two sub-stages

**6a. Claude Playwright pass.** Screenshot the demo (hero + full page, force `.reveal` elements visible first). Run the **"remove the logo" success test** from `autopilot/skill/references/gold-standard-playbook.md`. 5/5 yes or back to Designer Brain.

**6b. Gemini Flash vision QA loop.** Run `./scripts/gemini-design-qa.sh` to get a structured fix list from gemini-2.5-flash comparing the render to the spec:

```bash
./scripts/gemini-design-qa.sh /tmp/<client>-demo \
  --spec /tmp/<client>/design-spec.md \
  --brand /tmp/<client>/brand-brain.json \
  --port <PORT>
```

Read `/tmp/<client>/qa-feedback.md`, apply Must-fix items, re-run QA (max 2 iterations). Ship when Must-fix empty and score ≥ 8. Full doctrine: `autopilot/skill/references/design-qa.md`.

#### Sales document packaging
Render the bundle as a single branded `.docx` via the docx-kit in `proofpilot-brand/skills/_shared/docx-kit/`:
- Cover: client name + "Sales Audit · Growth Strategy · Homepage Demo Brief"
- Part 1 — Sales Audit (from `audit.md`)
- Part 2 — Growth Strategy (from `strategy.md`)
- Part 3 — Homepage Demo Brief (from `demo-brief.md`)
- Part 4 — Live Demo Preview (embed screenshots + the localhost URL)
- CTA close on its own page

Save as `/tmp/<client>/<Client>-WebsitePilot-YYYY-MM-DD.docx`.

## WebsitePilot output bundle

A full WebsitePilot deliverable:

- **`.docx` sales bundle** — branded, 35-45 pages typical
- **Live demo URL** — `http://localhost:5173/` during the pitch session
- **Demo screenshots** — hero + full-page
- **Artifact files** — `audit.md`, `strategy.md`, `demo-brief.md`, `brand-brain.json`, `template-pick.md`, `design-spec.md` (for future edits + traceability)
- **Next move** — the one-line recommended close for Matthew

## Golden rule

Every WebsitePilot run should answer this sequence:

1. **What is broken** — the pain, quantified with data
2. **Why it matters** — revenue leaking, competitors taking it
3. **What should be built** — the page system + strategy
4. **What the better version already looks like** — the live demo
5. **How Matthew should close from here** — the next move

## Design-system library (the best-starting-point decision)

`websitepilot/style-families/` houses 4 visual families. `websitepilot/templates/` houses 14 scaffold profiles across 6 source archetypes. WebsitePilot chooses the family first, then the scaffold inside that family — never a pre-selected default.

| Style family | Typical fit |
|--------------|-------------|
| heroic-branded-conversion | bold owner-led trades, mascot-able or emblem-heavy brands, urgent local service |
| operator-proof-longform | proof-heavy, FAQ/process/inspection-led, authority-first services |
| premium-outdoor-editorial | high-ticket outdoor, landscaping, design-build, gallery-led brands |
| clean-recurring-service | recurring maintenance, inspection-led care, friendly residential service |

| Archetype | Profile ids | Typical fit |
|-----------|-------------|-------------|
| state48glass | state48-authority-blue, state48-estimator-led | premium authority + early estimate capture |
| keystonerestoration | keystone-earthy-restoration, keystone-contact-heavy | warmth + trust + contact close |
| austinrockinshauling | rockin-rugged-industrial, rockin-gallery-social, rockin-service-area-map | blue-collar + social proof + territory |
| proactive-pool-solutions | proactive-clean-cyan, proactive-inspection-led, proactive-local-service-area | residential service + inspection funnels |
| doggy-detail | doggy-bold-membership, doggy-pricing-promo | consumer-playful + membership / offer-led |
| premium-outdoor-editorial | premium-outdoor-editorial-showcase, premium-outdoor-consultation-led | high-ticket outdoor + design-build editorial |

**All 6 archetypes share the same core stack:** Vite + React 18 + TypeScript. Most external mirrors use Tailwind 3 + shadcn/ui; the native premium outdoor scaffold uses authored CSS to keep the starter lighter and easier to adapt. The selector works uniformly across them, and the style-family starter files add reusable CSS + section-code guidance on top.

## Hard rules

- **Always run the three-brain sequence before Design.** Brand Brain → Style Family Pick → Designer Brain → Website Brain. No shortcuts.
- **Choose the family first, then score templates inside it.** Never pre-pick.
- **The chosen template is structural DNA only.** Content DNA (copy, color, typography, logo, imagery, motif, transitions) is replaced per Designer Brain's spec.
- **Preserve the client's real brand.** Logo in header + footer. Authentic photography in hero when available. Palette locked to logo colors + neutrals.
- **QA gate: "remove the logo" test.** 5/5 yes or back to Designer Brain.
- **One motif, one transition.** Multiple motifs = decoration, not design.

## Related skills loaded as needed

- `autopilot` — three-brain design pipeline (the canonical demo builder)
- `audit-pilot` — 8-section Sales Audit v2 writing discipline
- `strategy-pilot` — 13-section strategy writing discipline
- `proofpilot-brand` — docx-kit, brand tokens, shared design system
- `qa-pilot` — separate QA review of the final bundle if internal review is needed

Legacy / deprecated (do **not** load):
- `website-sales-pilot` — superseded by this skill (WebsitePilot is the current orchestrator)
- `lead-sheet-sales-audits` — roll into Stage 1 lead qualification if needed
- `proofpilot-lead-sheet-prioritization` — roll into Stage 1 if needed

## Running via backend (Railway — secondary path)

The `websitepilot/engine.py` Python code still ships as a FastAPI service on Railway via `POST /api/agents/website/run`. Use that path when:
- You need an SSE-streaming response for a web UI
- Job persistence in SQLite matters
- Orchestrating a batch of WebsitePilot runs

For single-client live pitches, one-off demos, and interactive iteration, **always prefer the local canonical flow above.** It's faster, easier to debug, and produces higher-fidelity custom design.

Backend-specific operational details live in `../CLAUDE.md`. This SKILL.md is about the local flow.

## Reference example

`autopilot/examples/prestige-v3-benchmark/` — the April 23 2026 Prestige build that set the current bar. User verdict: *"the branding and overall design look way more dialed in. This is what we want the strategy and level of design and branding to be at moving forward."* Read its README.md before any new design run.
