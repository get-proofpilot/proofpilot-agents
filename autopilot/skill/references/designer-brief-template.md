# Designer Brain — Reusable Brief Template

> Fill this template with client-specific facts and hand it to `scripts/gemini-dispatch.sh`. This replaces hand-drafting a fresh brief per run (which took 6-10 min per run before standardization).

**Usage:**
1. Copy this file to `/tmp/<client>/designer-brain-brief.md`
2. Replace every `<<PLACEHOLDER>>` with real content
3. Dispatch: `./scripts/gemini-dispatch.sh /tmp/<client>/designer-brain-brief.md --cwd /tmp/<client>`

---

```markdown
# Gemini Designer Brain — <<CLIENT_NAME>>

You are **Stage 3 (Designer Brain)** of AutoPilot's three-brain architecture for <<CLIENT_NAME>>, a <<INDUSTRY>> business in <<CITY_STATE>>. Claude runs every other stage; your only job is producing `design-spec.md`.

---

## Inputs

- **Brand Brain output:** `/tmp/<<CLIENT_SLUG>>/brand-brain.json` — READ THIS FULLY. Contains every fact you need.
- **Style-family pick:** `/tmp/<<CLIENT_SLUG>>/template-pick.md` — READ THIS FULLY. It locks the chosen design lane and scaffold.
- **Authentic photography:** `/tmp/<<CLIENT_SLUG>>/assets/authentic/` — <<PHOTO_COUNT>> files (<<PHOTO_NOTES>>)
- **Logo:** `/tmp/<<CLIENT_SLUG>>/assets/logo-original.png`
- **Logo palette:** `/tmp/<<CLIENT_SLUG>>/assets/logo-palette.json`
- **Site screenshots:** `/tmp/<<CLIENT_SLUG>>/assets/home-fullpage.png` (+ any service page captures)

## Doctrine to follow (read in this order)

1. `~/proofpilot-agents/autopilot/skill/references/three-brain-architecture.md` (Stage 2 section)
2. **`~/proofpilot-agents/autopilot/skill/references/design-patterns-catalog.md` — THE MASTER COOKBOOK. Integrates 3 pillars (Cohesive · Detail · Dynamic), 4 agency DNA docs, 7 presets, 3 pixel-perfect clone templates, section pattern library. READ THIS FIRST.**
3. `~/proofpilot-agents/autopilot/skill/references/style-presets.md` — 7 presets inside 4 parent families (no defaulting to editorial-serif for trades)
4. `~/proofpilot-agents/autopilot/skill/references/design-strategist.md` (11-section output template)
5. `~/proofpilot-agents/autopilot/skill/references/gold-standard-playbook.md`
6. `~/proofpilot-agents/autopilot/skill/references/inspiration/180sites-portfolio-dna.md` — archetype-mascot + rugged references (Volt Vikings, Patriot, Valkyrie, Haro)
7. `~/proofpilot-agents/autopilot/skill/references/inspiration/betheanomaly-portfolio-dna.md` — dfw-luxe-aerial references (Anomaly Pool, Salas, Kingswood)
8. `~/proofpilot-agents/autopilot/skill/references/inspiration/hookagency-portfolio-dna.md` — contractor-heritage references (Bears, B&M, TopDog)
9. `~/proofpilot-agents/autopilot/skill/references/inspiration/getlocalleads-portfolio-dna.md` — hardscape/outdoor-living references (Cinco Mosqueteros, Pro Outdoor, KSJ)
10. `~/proofpilot-agents/autopilot/skill/references/inspiration/inspiration-guide.md` — Matthew's curated 30+ reference site list
11. **Pick a CLONE template if the preset has one:**
    - `archetype-mascot` → `~/proofpilot-agents/websitepilot/templates/sources/ref-archetype-mascot/` (Volt Vikings clone)
    - `contractor-heritage` → `~/proofpilot-agents/websitepilot/templates/sources/ref-contractor-heritage/` (Bears Plumbing clone)
    - `dfw-luxe-aerial` → `~/proofpilot-agents/websitepilot/templates/sources/ref-dfw-luxe-aerial/` (Anomaly Pool clone)
    - Other presets → fall back to legacy scaffolds (rockin-rugged, state48glass, keystone, etc)
12. **Pick section patterns to compose from:** `~/proofpilot-agents/websitepilot/patterns/<preset>/*` — prop-driven brand-agnostic React components
13. (optional) `~/proofpilot-agents/websitepilot/style-families/<<STYLE_FAMILY>>/FAMILY.md`

## Brand Brain summary (filled by Claude before dispatch)

- **Verdict:** <<PARTIAL_ANCHOR | PRESERVE+ELEVATE | INVENT>>
- **Selected style family:** <<STYLE_FAMILY>>
- **Selected scaffold template:** <<TEMPLATE_ID>>
- **Logo:** <<1-2 sentence description>>
- **Palette in the logo (pixel-analyzed):** <<hex list>>. Nothing else is in-bounds.
- **Typography in use:** <<current faces>> → <<PRESERVE | ELEVATE | INVENT>>
- **Photography:** <<N authentic assets, quick inventory>>
- **Voice signals:** <<2-3 sample lines from the client's actual site that capture their tone>>
- **Client facts:** <<owners, years in biz, location, services, phone, license, distinctive operational facts>>

## Output — `/tmp/<<CLIENT_SLUG>>/design-spec.md`

Follow `design-strategist.md` exactly. 11 numbered sections + Implementation Order + Success Test.

## HARD RULES (do not violate — these are ship-gates)

0. **PICK A STYLE PRESET FIRST** (from `style-presets.md` — the 7 presets). Lock it in the spec's opening section with: (a) which preset, (b) why it fits based on brand archaeology Stage 7 signals, (c) why other presets were ruled out. **No preset = no spec.** Default to `rugged-industrial` for home service trades (pest / roofing / plumbing / HVAC / concrete / electrical unless the client has strong heritage = contractor-heritage). Use `editorial-serif` ONLY for dental / medical / legal / financial / luxury / heritage-family-practice. Gemini's previous serif bias is what this rule exists to prevent.
1. **Don't add colors the logo doesn't have.** Palette is logo hexes + neutrals. No invented accents "for vibe."
2. **Preserve > elevate > invent** for typography, in that order. Only invent if current type is truly generic (Arial, Times, default sans) AND no brand equity. Typography choice is **bounded by the preset** — rugged-industrial demands condensed/geometric sans; editorial-serif permits Fraunces/Merriweather. No crossing.
3. **ONE motif** from the logo or brand heritage. Used 6+ places. No second motif.
4. **ONE signature section-transition.** Applied consistently. No mix.
5. **Photography strategy: authentic-first.** Real client assets beat stock. If authentic photos exist, use them aggressively.
6. **Fewer sections, uniform grids where content is parallel.** Every section must earn its place. Don't add sections to fill pattern slots from an inspiration site.
7. **Story before features.** If the brand has a founding story, origin, or voice-defining moment (brand brain flags this), lead with it.
8. **Respect the selected style family.** The family starter files are canonical behavior, not optional inspiration.

## LAYOUT RULES (include in every spec — learned from rendering failures)

These go in spec §6-8 and must be explicit:

- **Heading alignment.** Centered when content below is also centered (stats band, CTA band, hero when copy is declarative). Left-aligned when content is a grid of parallel items, a two-column section, or editorial-prose. **State the choice per section** — don't leave it ambiguous.
- **Eyebrow alignment matches its H2.** Centered headline = centered eyebrow. Never an orphan left-aligned eyebrow over a centered headline.
- **Section max-width + centering.** Specify a container width (e.g. `max-w-6xl mx-auto px-6`) per section — don't leave full-bleed vs contained ambiguous.
- **Hero specifics.** Call out: H1 font-size at 3 breakpoints (mobile / tablet / desktop), line-height, max-width of subheadline, button row alignment, trust-indicator placement (if any).
- **Whitespace rhythm.** Vertical padding between sections: specify one number (e.g. `py-24 md:py-32` for major sections). No ad-hoc pads.
- **Stat numeral treatment.** If the spec includes stats (14+ years, $85 price, etc), specify: font + weight + size + alignment + underline/rule + eyebrow label treatment. A lazy stat row is the #1 tell that a site is AI-generated.

## Audience + voice (filled by Claude)

<<2-3 sentences on who the target customer is and what voice register they respond to>>

## Likely sections (use your judgment — less is more)

<<list of 8-12 proposed section names, adjust per brief>>

Sections you might NOT need: blog teaser, booking form, complex insurance cards, timeline, process numerals. Only include if it clearly earns its place.

## Quality gate (the "remove the logo" test)

Before writing `design-spec.md`, mentally test: if the reader removed the logo, could they still tell this is:
1. A <<industry>> company?
2. <<regional_context>>?
3. <<ownership_context — family / chain / solo>>?
4. Specialized in <<specialty>>?
5. Premium enough to trust, not template-default?

Five yeses. If any no, adjust the spec before shipping it.

## When done

Write `/tmp/<<CLIENT_SLUG>>/design-spec.md` (the spec) + `/tmp/<<CLIENT_SLUG>>/DONE.md` (short summary: palette tokens, typography pair, motif, transition signature, photography call, any deviations).
```

---

## Why this template exists

Before standardization, every Designer Brain dispatch required Claude to compose a 6-10KB freeform brief. Issues observed:
- Brief quality drifted — some stages got full context, others got sparse hints.
- Hard rules were restated differently each time, opening drift windows.
- Layout rules (alignment, whitespace) were frequently omitted — Gemini had to guess.
- Hero specifications were vague — Gemini chose defaults that Claude later had to fix.

This template locks the structure. Claude fills placeholders, dispatches, gets consistent output.

## Companion helper

`scripts/gemini-dispatch.sh` takes a filled brief and runs it.
`scripts/gemini-design-qa.sh` runs post-build QA against the rendered site (see `design-qa.md`).
