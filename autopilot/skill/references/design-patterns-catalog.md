# Design Patterns Catalog — The Master Cookbook

> The integrated doctrine that turns Matthew's 3-pillar framework (**Cohesive · Detail · Dynamic**) + 4 agency portfolio DNA + 7 style presets + pixel-perfect clone templates + a reusable section-pattern library into **one decision tree and one component cookbook**. Read this before every Designer Brain dispatch.

---

## The 3 pillars (from the ProofPilot Inspiration Guide)

Every site we ship must hit all three:

### 1. Cohesive — unified visual system
- **Color application** — primary for key elements, secondary for accents, clear hierarchy. Think color blocking, overlays, CTAs signaled by hue.
- **Typography** — pairing reflects brand personality. Headlines have presence, body is readable, combination is intentional.
- **Photo treatment** — overlays, consistent crops, custom frames, tied to brand identity. No "dropped in" stock feel.
- **Brand personality** — if you removed the logo, the design alone still communicates who the brand is.

### 2. Detail — custom elements, not assembled
- **Custom icons** — no generic packs. Match brand color + line weight + fill style.
- **Patterns / textures / background elements** — custom depth. Geometric patterns, line work, gradients, industry-specific motifs.
- **Borders, dividers, section treatments** — custom break patterns (angled wedges, torn paper, overlapping elements). Rounded vs sharp is consistent.
- **Buttons + interactive elements** — designed, not default. Shape, padding, radius, shadow, hover — fits the aesthetic.

### 3. Dynamic — movement and rhythm
- **Section layout** — thoughtful composition, balance of text/visuals, eye movement, avoid generic stacked blocks.
- **Visual rhythm** — alternate section types, vary pacing, strategic whitespace, peaks and valleys as the visitor scrolls.
- **Movement/animation** — purposeful scroll reveals, hover effects, micro-interactions. Energy without distraction.

**This is the shipping gate.** Before calling a demo done, verify all 3 pillars hit. Any pillar missing → revise, don't ship.

---

## The 4 canonical parent families (from `style-family-selector.md`)

Coarse-grain classification before preset refinement:

| Family | Reference agency | Vertical fit |
|--------|------------------|--------------|
| `heroic-branded-conversion` | 180 Sites | pest, electrical, garage, junk, pressure washing, Christmas lighting, concrete coatings, wraps |
| `operator-proof-longform` | Hook Agency | roofing, plumbing, HVAC, general contractor (heritage logo + SEO-first funnel) |
| `premium-outdoor-editorial` | Be The Anomaly + Get Local Leads | pool, outdoor living, landscape, concrete-luxe, hardscape (real aerial photography) |
| `clean-recurring-service` | — | pool cleaning, lawn care, recurring pest plans, recurring maintenance |

## The 7 fine-grained presets (from `style-presets.md`)

Within each family:

| Preset | Parent family | Use when |
|--------|---------------|----------|
| `rugged-industrial` | heroic-branded-conversion | rough-edged trade, pest/demolition/concrete, plainspoken-trade voice |
| `archetype-mascot` | heroic-branded-conversion | brandable archetype name (Volt Vikings, Patriot Illumination, Professor Pressure) |
| `playful-chunky-consumer` | heroic-branded-conversion | pets, kids, consumer-playful, Santa Banana Lighting, Doggone Good H&C |
| `contractor-heritage` | operator-proof-longform | heritage logo preserved, SEO-heavy pages, roofing/plumbing/HVAC/GC |
| `dfw-luxe-aerial` | premium-outdoor-editorial | upper-mid, real drone/aerial photography, pool/outdoor-living/concrete-luxe |
| `premium-design-build` | premium-outdoor-editorial | $50K+ design-build, commissioned photography, luxury remodels |
| `editorial-serif` | premium-outdoor-editorial | dental, medical, legal, wellness, heritage family practices (SPARINGLY — never on trades) |

## Pixel-perfect clone templates (new — the REAL starting scaffolds)

Three canonical reference clones live under `websitepilot/templates/sources/`. Each is a **full working Vite template** extracted pixel-level from a best-in-class reference build. Future demos should START here when the preset matches, then swap brand content.

| Clone template | Source of truth | Preset | Typography | Palette | Sections | When to start here |
|---------------|-----------------|--------|------------|---------|----------|---------------------|
| `ref-archetype-mascot/` | voltvikings.com | `archetype-mascot` | Saira 300-900 (one family, extreme weight range 17-123px) | Orange `#FF9143` + burnt `#FF620D` + purple `#3C0E70/#250845` + cream `#FFF6EF` | 12 (Header → Hero → TrustBar → Services → WhyUs → GuaranteeBand → Reviews → Process → ServiceArea → FAQ → CTA → Footer) | Brandable mascot name, bold trade presence |
| `ref-contractor-heritage/` | bearsplumbing.net | `contractor-heritage` | Roboto Condensed 400-800 (one family) | Red `#EF3E33` + ink `#231F20` + pink `#CC3366` + grays | 13 (PromoBar → Header → Hero+InlineForm → TrustBar4Icons → Services → DarkContactBand → AboutMascot → Partnerships → CouponsGrid → Reviews → ServiceArea → Blog → Footer) | Roofing/plumbing/HVAC with heritage logo |
| `ref-dfw-luxe-aerial/` | anomalypoolservices.io | `dfw-luxe-aerial` | Bebas Neue 400 (80/60/40 px) title-case + Work Sans body | Pool-blue `#4CA8DE` + navy `#121A1E` + mist `#E9F5FB` + twilight `#0C0C0C` | 13 (Header + utility → Hero (drone video) → TrustSignals → Services → About → Gallery → Process → Reviews → InlineQuoteForm → ServiceArea → FAQ → CTA → Footer) | Pool/outdoor-living/concrete-luxe with real aerial photography |

**Legacy scaffolds (adjacent archetypes, less precise):**
- `austinrockinshauling/` (rockin-rugged-industrial) — still useful for true hauling/demolition
- `state48glass/` — premium authority blue
- `keystonerestoration/` — earthy restoration
- `proactive-pool-solutions/` — clean residential cyan
- `doggy-detail/` — consumer playful

**Rule:** prefer the new `ref-*` clones over legacy scaffolds when the preset matches. Legacy scaffolds are adjacent archetypes that require more surgery.

## Section pattern library

`websitepilot/patterns/<preset>/` holds **prop-driven, brand-agnostic React components** extracted from the clone templates. Each section has a docstring (WHEN TO USE / WHEN NOT / fitting verticals).

### Archetype-mascot patterns (`patterns/archetype-mascot/`)
- `HeroArchetypeMascot` — full-bleed mascot + stacked giga headline (Saira 900 UPPERCASE 80-120px) + CTA pair + trust-bar
- `TrustBarAllCaps` — 4-5 uppercase stat pills, Saira 700, single-row
- `ServicesGridArchetype` — 3-4 icon-quadrant cards, mascot corner
- `CTAWithMascot` — full-width with mascot re-emergence (key archetype trick)
- `FooterMultiColPatriot` — navy, dense, 4-col

### Contractor-heritage patterns (`patterns/contractor-heritage/`)
- `HeroWithInlineQuoteForm` — split hero, photo left, 6-field form in right rail (Hook's signature conversion anchor)
- `PromoBarTop` — dark strip above nav, "Limited time / Financing available"
- `TrustBarIcons4Up` — LOCAL / WORKMANSHIP / UPFRONT / ON-TIME pattern, 4-icon uniform
- `ReviewsWithGoogle5Star` — Google-G pill + 5 gold stars + overlapping avatars
- `CouponsGridContractor` — 3-4 coupon cards (plumbing/HVAC specific)
- `FinancingCallout` — roofing-specific, hero band
- `FAQLongFormSEO` — 12-15 Q accordion, SEO-dense

### Dfw-luxe-aerial patterns (`patterns/dfw-luxe-aerial/`)
- `HeroDroneAerialTitleCase` — full-bleed aerial (or looping video) + Bebas title-case + ONE noun color-painted
- `GoogleStarPillWithAvatars` — signature BtA inline hero pill (G-icon + 5 stars + rating + overlapping avatars + "on Google, Yelp, NextDoor")
- `ChunkyOffsetShadowButton` — `box-shadow: 0 5px 0 0 currentColor` + 8px radius + Work Sans 700
- `DroneAerialAboutFounder` — 60/40 split with founder portrait
- `InlineQuoteFormDark` — dark-band embedded booking form mid-page (NOT saved for footer)
- `JewelToneCTABand`
- `GalleryMasonryAerials` — masonry grid of aerial/close-up alternating

### Future pattern families (roadmap)

- `patterns/rugged-industrial/` — Rockin + Richardson derivatives (extract from `/tmp/richardson-demo-v2/` + austinrockinshauling)
- `patterns/playful-chunky-consumer/` — from doggy-detail + Doggone Good H&C + Santa Banana
- `patterns/editorial-serif/` — from Red Rock Gemini + Kingswood Landscape

Pattern catalog grows as more clients ship. Rule: any section that ships twice + looks intentional becomes a pattern.

---

## The decision tree (the final pipeline)

```
Stage 1: Research (Claude + Playwright + Firecrawl) → /tmp/<client>/research.md
Stage 2: Brand Brain (Claude + Playwright + Firecrawl + Pillow) → brand-brain.json
  └─ Stage 7 fit signals: brand_maturity + service_model + proof_density + price_point + visual_temperament
Stage 2.5: Style Family pick (Claude) → template-pick.md
  └─ 4 families in `style-family-selector.md`
Stage 2.6: Preset narrow-down (Claude) → append to template-pick.md
  └─ 7 presets in `style-presets.md`
Stage 2.7: Clone template pick (Claude) → append to template-pick.md
  └─ If preset = archetype-mascot → ref-archetype-mascot/
  └─ If preset = contractor-heritage → ref-contractor-heritage/
  └─ If preset = dfw-luxe-aerial → ref-dfw-luxe-aerial/
  └─ Else → legacy scaffold + heavier customization
Stage 3: Designer Brain (Gemini subagent) → design-spec.md
  └─ Reads: style-presets.md, agency DNA docs, design-patterns-catalog.md
  └─ Cites: specific clone template sections + specific patterns to compose
  └─ Hard rules 0-7 from designer-brief-template.md enforced
Stage 4: Website Brain (Claude subagent)
  └─ Clone chosen ref-* template
  └─ Run scrub-template.sh (Lovable strip + real logo + favicon + OG)
  └─ Replace placeholder assets with brand content from Brand Brain
  └─ Swap palette/typography tokens if the brand demands variation within preset
  └─ Compose from patterns/<preset>/* where appropriate
  └─ Stage 4 is now largely "swap brand + compose" — structural DNA already right
Stage 5: Images (Claude + Recraft)
Stage 6a: Claude Playwright QA ("remove the logo" test)
Stage 6b: Gemini Flash Vision QA loop → qa-feedback.md → apply + re-run
Stage 7: scrub-template.sh final pass + deploy-preview.sh → demo.proofpilotapps.com/<slug>/
```

## Why clones beat "score + customize"

Previous doctrine: "score all 12 legacy scaffolds, pick closest, customize heavily." That meant starting from an adjacent archetype and doing 80% of the design work. Result: 3-5× more Website Brain time + stretched aesthetic.

New doctrine: pixel-perfect clone templates per preset. Start from a scaffold that's already 95% DNA-correct. Swap brand (logo, palette, typography, copy, mascot, photos). Website Brain becomes "fill the blanks," not "invent the design." 5× faster + higher quality ceiling.

**The clones are reference training material, not deliverables.** Each client demo is still custom — but we're customizing a Volt-Vikings-grade starting point, not a generic Vite template.

## What to do when no clone matches

- Fallback to the closest preset + legacy scaffold + heavy customization (the old flow)
- File a gap: log in `website-brain-scaffold.md` a note that preset X doesn't have a ref-clone yet
- When 2-3 client demos ship in that preset with good results, harvest the best into a new `ref-<preset>/` clone template

Preset-to-clone coverage gaps (as of 2026-04-24):
- ❌ `rugged-industrial` — use austinrockinshauling + Richardson v2 patterns for now; build `ref-rugged-industrial/` after 2 more rugged clients ship
- ❌ `playful-chunky-consumer` — use doggy-detail for now; target Doggone Good H&C or Santa Banana as future clone source
- ❌ `editorial-serif` — use Red Rock Gemini build as reference pending a proper clone template
- ❌ `premium-design-build` — use Kingswood Landscape as reference pending a clone

## Agency DNA cross-reference

Per Get Local Leads DNA doc (2026-04-24): four-way lane split

| Agency | Defining differentiator | Vertical focus |
|--------|--------------------------|----------------|
| **180 Sites** | Saira 900 ALL CAPS + invented mascot worlds + candy-saturation CTAs | Wide trades (exterior cleaning, Christmas lighting, concrete coatings) |
| **Be The Anomaly** | Bebas Neue 400 title-case + drone-aerial photography + chunky offset-shadow buttons | DFW luxe — pool, outdoor living |
| **Hook Agency** | Preserved heritage logos + SEO-optimized 12-15 sections + inline hero quote forms + data-backed case studies | Roofing, plumbing, HVAC, general contractor |
| **Get Local Leads** | Title-case modern-sans + ONE Playfair italic accent word + owner-cutout on twilight patio + full-width accent-color "Get A Free Quote" form band below hero | Hardscape, outdoor living, landscape design-build |

Each agency's preset-vertical matrix lives in their individual DNA doc. Read the one that matches your client's vertical before dispatching Designer Brain.

---

## Pillar-to-doctrine cross-reference

For each of Matthew's 3 pillars, which doctrine doc covers it:

| Pillar | Covered by |
|--------|-----------|
| **Cohesive** — color application, typography, photo treatment, brand personality | `style-presets.md` (color+typography rules per preset) + `brand-archaeology.md` (what the brand actually IS) + clone templates (cohesion by construction) |
| **Detail** — custom icons, textures, dividers, buttons | `patterns/<preset>/*` (reusable section components with detail baked in) + `websitepilot/assets/motifs/` (shared motif library) + `design-strategist.md` §6-7 (icon + button specs per preset) |
| **Dynamic** — section layout, visual rhythm, movement | `design-strategist.md` §9 (motion system) + `website-brain-scaffold.md` (reveal-fallback CSS, section-transition signature) + `style-presets.md` per-preset section rhythm rules |

## History

- 2026-04-24 — catalog created. Integrated Matthew's Inspiration Guide 3-pillar framework + all 4 agency portfolio DNA docs + 3 new pixel-perfect clone templates (`ref-archetype-mascot`, `ref-contractor-heritage`, `ref-dfw-luxe-aerial`) + their extracted section pattern libraries.
- Clone sources: voltvikings.com, bearsplumbing.net, anomalypoolservices.io — extracted via Firecrawl + Playwright complementary use. Placeholders for brand-specific assets; structural DNA is the contribution.
- Outstanding clone gaps: rugged-industrial, playful-chunky-consumer, editorial-serif, premium-design-build. File new clones as those verticals ship 2+ demos.
