---
name: autopilot
description: >
  AutoPilot: ProofPilot's named agent for generating custom SEO pages and demo
  homepages. Canonical path is local Claude Code — three-brain architecture
  (Brand → Designer → Website) applied to a WebsitePilot template starter.
  Aliases: AutoPilot, Auto Pilot, autopilot-ai, "generate page", "build homepage",
  "content sprint", "build service page"
tags: [autopilot, seo, content, design, brand, websitepilot, proofpilot]
---

# AutoPilot

## When to trigger

Load this skill when Matthew or the team asks for:
- "AutoPilot", "Auto Pilot", "use autopilot", "run autopilot"
- "Generate a page", "create a service page", "build a homepage"
- "Content sprint" or "batch content generation"
- "Redesign" a page with new brand + content
- Any website demo inside a WebsitePilot run

## Canonical flow (local — Claude Code)

This is how AutoPilot runs in the normal case. Everything happens in the current Claude Code session with Claude + Playwright + Python (Pillow) + Bash + Recraft MCP. No VPS, no Railway call, no external model orchestration.

```
Research  →  Brand Brain  →  Style Family Pick  →  Designer Brain  →  Website Brain  →  Images  →  QA
                                                                           ↑
                                                        Pick scaffold inside the chosen family
                                                     (score family first, then scaffold)
```

Each stage reads the previous stage's output file. Dispatched as sequential subagents when the work is parallelizable within a stage. Never skip a stage. Never merge stages.

### Stage 1 — Research
Gather the facts about the client + the market. Keyword demand, SERP, competitor teardown, ranking reality. Uses DataForSEO MCP, Playwright, WebFetch. No opinions yet.

### Stage 2 — Brand Brain *(mandatory)*
**Doctrine:** `references/brand-archaeology.md`.
Capture what the brand IS. No opinions. Download the logo, pixel-analyze for dominant colors, capture typography including `@font-face` URLs, download every authentic photo (fleet, team, storefront), pull favicon + OG image, note voice signals.

**Output:** `brand-brain.json` + a verdict: PRESERVE+ELEVATE / PARTIAL ANCHOR / INVENT. Most clients are PARTIAL ANCHOR.

### Stage 2.5 — Style Family Pick *(mandatory)*
**Doctrine:** `references/style-family-selector.md`.
Classify the brand into the right ProofPilot style family first, then pick the best scaffold inside that family. Output `/tmp/<client>/template-pick.md`.

### Stage 3 — Designer Brain *(mandatory — routed to Gemini 3.1 Pro)*
**Doctrine (in read order):**
1. `references/home-service-blueprint.md` — **THE STRATEGY**. The 14-section wireframe, hero 7-element rule, ranks-and-converts premise. EVERY design-spec must include a Blueprint Coverage Matrix.
2. `references/design-patterns-catalog.md` — **THE DESIGN COOKBOOK**. Cohesive/Detail/Dynamic pillars + 7 presets + clone templates + pattern library.
3. `references/seo-playbook.md` — keyword placement, schema markup, URL structure, internal linking (the rank layer)
4. `references/copywriting-playbook.md` — 7 hero copy formulas, voice register per preset, CTA library, benefits-not-features 5×5 rule
5. `references/launch-checklist.md` — pre-ship verification (every demo must pass)
6. `references/style-family-selector.md` + `references/style-presets.md`
7. `references/design-strategist.md` + `references/gold-standard-playbook.md`
8. `references/inspiration/180sites-portfolio-dna.md` + `references/inspiration/betheanomaly-portfolio-dna.md` + `references/inspiration/hookagency-portfolio-dna.md` + `references/inspiration/getlocalleads-portfolio-dna.md` + `references/inspiration/inspiration-guide.md`
9. `references/model-routing.md`

**Family + preset first. Then design.** Stage 2.5 already picked the family. This stage narrows to a specific preset inside that family (`style-presets.md`, 7 presets). **No defaulting to editorial-serif.** Home service brands are overwhelmingly `rugged-industrial` (pest, roofing, hauling, concrete, industrial) or `contractor-heritage` (roofing, plumbing, HVAC with heritage logo). `editorial-serif` is reserved for dental / medical / legal / luxury / heritage-family-practice.

**NEW (v2.2):** every `design-spec.md` MUST include a **Blueprint Coverage Matrix** per `home-service-blueprint.md` — one row per each of the 14 canonical blueprint sections, mapping to a concrete ref-clone component OR `patterns/<preset>/*.tsx` OR `patterns/vertical/*.tsx`. Spec is rejected if any matrix row is blank/"N/A" without explicit justification. This enforces the ranks+converts strategy at the spec layer.

Then decide what to preserve, elevate, or invent within the preset's bounds. Produce a concrete `design-spec.md` with palette, typography, THE one committed motif, THE one section-transition signature, button system, icon system, photography strategy, motion.

**Model routing (default): dispatch to Gemini 3.1 Pro.** Gemini's design judgment is cleaner and tighter than Claude's on this specific stage (validated April 2026, Red Rock Family Dentistry head-to-head). Claude orchestrates the pipeline; Gemini handles only Designer Brain.

How to dispatch (from the `~/proofpilot-agents/` directory):

```bash
# 1. Write the Designer Brain brief to /tmp/<client>/designer-brain-brief.md
#    (template in references/model-routing.md)
# 2. Invoke the helper — Gemini writes design-spec.md + DONE.md in the working dir
./scripts/gemini-dispatch.sh /tmp/<client>/designer-brain-brief.md \
  --cwd /tmp/<client> \
  --log /tmp/<client>/designer-brain.log
# 3. Claude reads /tmp/<client>/design-spec.md and proceeds to Stage 4 (Website Brain)
```

Requires `GEMINI_API_KEY` env var. **Fallback:** if Gemini is unreachable or errors, Claude runs Designer Brain itself — don't block the pipeline on Gemini availability.

Full routing doctrine (when to route, when not to, brief template, failure modes): `references/model-routing.md`.

**Hard rules (learned from Prestige v2 + Red Rock v1) — include these verbatim in any brief you hand to Gemini:**
- Do **not** add colors the logo doesn't have. If the logo is red + blue + black + white, the palette is red + blue + black + white + grey. Period.
- Do **not** replace typography that has brand equity. If the client's current site uses Manrope + Poppins, keep those and elevate with weight. Replace only when current type is genuinely generic (Arial, default sans).
- Commit to **one** motif, not three.
- Commit to **one** section-transition signature, not a mix.
- Fewer sections, uniform grids when content is parallel. Every section must earn its place — don't add sections to fill pattern slots from an inspiration site.

### Stage 4 — Website Brain *(executor)*
**Doctrine:** `references/three-brain-architecture.md` (Stage 3 section).
Pick the best starting template and customize it heavily. This is the single most important design quality lever.

**Design-system selection** — use `websitepilot/templates/library.py::recommend_design_system(...)` against the brief + brand fit signals. Pick the style family first, then the top scaffold (winner) and runner-up. Never pre-pick a default.

**Customization discipline:**
- Copy the template's source to a scratch dir (e.g. `/tmp/<client>-demo/`).
- `npm install`.
- Apply the `design-spec.md` Implementation Order priority 1 → N:
  1. Swap in the real logo image (Header + Footer).
  2. Replace CSS tokens in `src/index.css` + `tailwind.config.ts` with the locked palette. Add legacy aliases for old tokens so un-touched components don't break, but point every alias at the new palette.
  3. Update `index.html` to load the chosen Google Fonts. Update tailwind `fontFamily`.
  4. Hero background — use authentic client photo with brand-color gradient overlay (black if the palette is B&W+accent, otherwise a palette-aligned tint).
  5. Extract + embed the motif SVG. Use it 6+ places.
  6. Rewrite the Button component per spec (primary / secondary / tertiary).
  7. Apply the signature section-transition consistently.
  8. Service card treatment — accent borders from the palette, duotone imagery, motif corner.
  9. Eyebrow treatment on every major section.
  10. Favicon + OG.
  11. Motion polish (scroll reveals, stat counters, hover).

- `npm run build` must pass with zero TS errors.
- Serve with `npm run dev` (Vite, typically `localhost:5173`).

### Stage 5 — Images
Generate custom imagery via Recraft MCP (`mcp__recraft__generate_image`) informed by the Designer Brain's photography strategy section. Apply duotone treatment in CSS to tie stock-generated images to the palette. **Always prefer authentic client photography** (from Brand Brain) to Recraft output — one real fleet photo beats ten perfect generations.

### Stage 6 — QA (two sub-stages)

**Stage 6a — Claude Playwright pass.** Screenshot the demo (hero + full page, force `.reveal` elements visible before full-page capture). Run the **"remove the logo" success test** from `references/gold-standard-playbook.md`:

1. Remove the logo mentally — can a visitor still tell what the business does, who it serves, and what vibe it has?
2. Next to 5 template sites in the same vertical — does this one stand out as clearly more designed?
3. Print black-and-white — does the hierarchy still read?
4. Scroll at 50% speed — do section transitions feel rhythmic?
5. Would the target customer describe this as "designed FOR" their company, or "a website that happens to be for" their company?

If any answer is "no," go back to the Designer Brain.

**Stage 6b — Gemini Flash vision QA loop.** After Stage 6a passes, run:

```bash
./scripts/gemini-design-qa.sh /tmp/<client>-demo \
  --spec /tmp/<client>/design-spec.md \
  --brand /tmp/<client>/brand-brain.json \
  --port <PORT> \
  --round 1
```

Gemini 2.5 Flash (vision) critiques the live render against the spec and writes `/tmp/<client>/qa-feedback.md` with a structured Must-fix / Should-fix / Won't-fix list. Claude reads the feedback, applies fixes, re-runs QA (up to 2 iterations total). Ship when Must-fix is empty and score ≥ 8.

Full doctrine: `references/design-qa.md`. The loop is quality-improvement, not a blocker — if Gemini is unreachable, ship Stage 6a's pass.

## Source doctrine

Read in this order before any design run:

1. `references/three-brain-architecture.md` — the sequenced architecture (Brand → Designer → Website)
2. `references/brand-archaeology.md` — Brand Brain procedure + output schema
3. `references/style-family-selector.md` — choose the visual lane before choosing the scaffold
4. `references/design-strategist.md` — Designer Brain procedure + spec template
5. `references/gold-standard-playbook.md` — cross-vertical patterns + "remove the logo" test
6. `references/inspiration/inspiration-guide.md` — the 3 pillars + ProofPilot's gold-standard home-service site references (Hook Agency, 180 Sites, Be The Anomaly, Get Local Leads)

**Concrete reference example:** `../examples/prestige-v3-benchmark/` — the April 23 2026 Prestige build that set the bar. Includes the Brand Brain JSON, Designer Brain spec, hero screenshot, and a README explaining the discipline that made v3 work.

## Template library (the starting-point decision)

`websitepilot/style-families/` defines 4 visual families. `websitepilot/templates/` contains 14 scaffold profiles across 6 source archetypes.

Choose in this order:

1. **Style family**
2. **Scaffold profile**

| Style family | Best for |
|--------------|----------|
| heroic-branded-conversion | bold owner-led trades, mascot-able or emblem-heavy brands, urgent local service |
| operator-proof-longform | proof-heavy, authority-first, FAQ/process/inspection-led services |
| premium-outdoor-editorial | high-ticket outdoor, landscaping, design-build, gallery-led brands |
| clean-recurring-service | recurring maintenance, plan-led, friendly residential service |

Scaffold archetypes available today:

| Archetype | Profiles | Best for |
|-----------|----------|----------|
| state48glass (authority blue) | state48-authority-blue, state48-estimator-led | premium authority, early estimate capture, builder credibility |
| keystonerestoration (earthy) | keystone-earthy-restoration, keystone-contact-heavy | restoration, roofing, remodel, warm trust |
| austinrockinshauling (industrial) | rockin-rugged-industrial, rockin-gallery-social, rockin-service-area-map | hauling, demolition, concrete, blue-collar |
| proactive-pool-solutions (clean cyan) | proactive-clean-cyan, proactive-inspection-led, proactive-local-service-area | residential service, inspection-led funnels, polished homeowner feel |
| doggy-detail (bold consumer) | doggy-bold-membership, doggy-pricing-promo | consumer-playful, membership framing, pricing-led offers |

**Rule: never pre-pick.** Infer the family first, then score scaffold profiles against the client's brief (page_type + industry blob + fit signals). Pick the winner with the highest score inside that family. If a family has no native scaffold yet, use the best bridge scaffold and lean harder on the family starter code.

Then **customize heavily.** The template is structural DNA — section rhythm, module shells, layout confidence. The content DNA (copy, color, fonts, logo, imagery, motif, transitions) is all replaced.

## Hard rules (do NOT compromise on these)

- **Authentic first.** Real client photography beats Recraft every time. If the Brand Brain finds a fleet photo, storefront, or team shot, it goes in the hero. Not buried. Not cropped out.
- **Preserve > elevate > invent.** This is a ladder. Preserve everything you can. Elevate only where there's a concrete reason. Invent only when the Brand Brain verdict is INVENT.
- **One motif, one transition.** Two motifs = decoration, not design.
- **Logo colors or bust.** The palette is the logo's colors + neutrals. Not "the logo plus navy and copper because builders."
- **Never ship template-level.** The "remove the logo" test is the QA gate. All five questions yes.

## Failure modes we've seen

| Mode | Root cause | Prevented by |
|------|-----------|--------------|
| "Demo used generic navy + gold, not client's actual colors" | Designer Brain didn't commit to logo palette | Designer Brain hard rule #1 (don't add colors the logo doesn't have) |
| "Demo didn't include the real logo" | Brand Brain skipped the logo download step | Brand Brain mandatory step 2 |
| "Demo uses Exo 2 but their site uses Manrope" | Designer Brain replaced equity-laden typography unnecessarily | Designer Brain hard rule #2 (preserve > elevate > invent) |
| "Looks like a template with a name swap" | Website Brain didn't customize deeply enough | Website Brain Implementation Order priorities 1-14 |
| "Section transitions feel default" | No signature transition committed | Designer Brain step 5 + gold-standard playbook |

## Running via the backend (Railway service — secondary path)

The `backend/` Python code in this repo (`engine.py`, `stages.py`, `brand_extractor.py`, etc.) still exists and still runs on Railway as the production fulfillment service. Use it when you want:
- A SQLite-persisted job record for a content sprint
- Branded `.docx` export via the backend's docx_generator
- Automatic preview deploy to `preview.proofpilotapps.com`
- Orchestration of many pages in batch

For one-off demos, live pitches, and design iteration, **prefer the local canonical flow above** — it's faster, produces custom-designed output, and doesn't fight the backend's old model-orchestration code.

Backend-specific details (SSH to VPS, OpenRouter model matrix, preview-server deploy) live in `../CLAUDE.md`. This SKILL.md is about the local flow.

## Checklist before reporting "done"

- [ ] Brand Brain output exists: `brand-brain.json` with non-empty logo analysis + verdict
- [ ] Style-family selection exists: `template-pick.md` with family + scaffold rationale
- [ ] Designer Brain output exists: `design-spec.md` with locked palette and committed motif
- [ ] Template picked from the WebsitePilot library with rationale
- [ ] Clone + npm install passed
- [ ] Design-spec Implementation Order priorities 1-8 minimum completed
- [ ] Real logo appears in header + footer
- [ ] Authentic photography in hero or builder-credibility section (where applicable)
- [ ] Dev server running, screenshot captured
- [ ] "Remove the logo" test: 5/5 yes
- [ ] No state48 / template-default colors visible in the final render
