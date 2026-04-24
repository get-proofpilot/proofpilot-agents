# ref-premium-design-build-kitchen-bath

**Pre-composed bundle**: `ref-premium-design-build` base (cincomosqueteros.co DNA — Manrope + Fraunces italic accent, black/cream/muted-gold) specialized for **kitchen & bath remodel design-build studios**.

This is a LEARNING TEMPLATE, not a live client site.

Exemplar for $75K+ kitchen and primary-bath remodel firms with commissioned interior photography, an NKBA / Houzz pedigree, and a portfolio-first sales motion that ends in a discovery call (not a quote form).

## When to use

- Kitchen + bath design-build studios
- Whole-floor remodel firms (kitchen + multi-bath together)
- Boutique interior design-build practices with in-house carpenters
- Studios that take 6–9 months per commission and book by appointment

## When NOT to use

- Outdoor living / hardscape — use the base `ref-premium-design-build`
- Trades (plumbing, HVAC, roofing) — use `ref-contractor-heritage`
- Production cabinet companies (Lowes / HD installs) — use `ref-playful-chunky-consumer`
- Aerial drone-photography landscape — use `ref-dfw-luxe-aerial-landscape`
- Studios without commissioned interior photography of completed work

## Section rhythm (12 sections)

| # | Section | Source | Notes |
|---|---|---|---|
| 1 | `Header` | base | "Start a Project" CTA + italic "by appointment" sublabel |
| 2 | `Hero` | base, rewritten | "Kitchens *designed* for the way you live." |
| 3 | `AwardsPressRow` | base, retitled | NKBA / Houzz / Sub-Zero Wolf / Architectural Digest |
| 4 | `PhilosophyStatement` | base, rewritten | Interior architecture, not cabinet swaps |
| 5 | `ProjectCaseStudyGrid` | base, rewritten | 6 kitchen + bath case studies |
| 6 | `BeforeAfterTransform` | **NEW** — adapted from `vertical/ConcreteBeforeAfterDragger` | drag-to-reveal slider, palette-tuned |
| 7 | `DesignBuildSystem` | **NEW** — adapted from `vertical/RoofingSignatureSystem` | 5 phases, 6-month arc |
| 8 | `TeamCraftsmanship` | base, rewritten | designer / lead carpenter / project manager |
| 9 | `FinancingPremium` | **NEW** — adapted from `vertical/ConstructionFinancingPromoCard` + `contractor-heritage/FinancingCallout` | "up to 60 months" card |
| 10 | `EditorialQuote` | base, rewritten | One homeowner pull-quote |
| 11 | `ContactBespoke` | base, rewritten | "Begin the Conversation" form, kitchen/bath scopes |
| 12 | `Footer` | base, retitled | "Rooms we design" instead of "Portfolio" |

## Hard rules preserved from base

- **Section ordering is portfolio-first.** Case studies come before the system. Buyers fall in love with the work, then learn how it gets made.
- **Typography**: Manrope sans throughout + one italic Fraunces accent phrase per section. Never two display faces.
- **Button shape**: 4px radius, 18×28 padding, 0.14em letter-spacing. No pills, no sharp 0px.
- **Cream `#F7F2E8` ground.** Never white as the page surface.
- **Muted gold `#B08A3E`** as the only accent.
- **CTAs**: "Start a Project" and "Begin the Conversation" — **NEVER "Get a Quote"**. This is the signature.

## Optional palette nudge

The brief allows one warm counter-tone if a specific kitchen/bath vibe needs it:

- `#C8876B` soft terracotta — warm, hand-thrown ceramics, Mediterranean kitchens
- `#94A68E` sage — quiet, herbal, English-country baths

**Default is no nudge** — the base black + cream + gold holds for almost every kitchen/bath brand. Add the counter-tone only when the moodboard calls for it explicitly. Edit `--brand-gold-soft` in `src/index.css` and the matching `tailwind.config.ts` token.

## What to swap per client

| Token | Where | Example |
|---|---|---|
| `--brand-gold` | `src/index.css` + `tailwind.config.ts` | client's accent |
| Monogram letter | `Header.tsx`, `Footer.tsx` | client's mark |
| Placeholder gradients | `placeholder-*` classes | commissioned interior / detail / twilight photos |
| `{{BRAND_NAME}}`, `{{CITY}}`, `{{OWNER_NAME}}`, `{{LEAD_CARPENTER_NAME}}`, `{{PM_NAME}}`, `{{FINANCE_PARTNER_NAME}}` | every file | site-wide find/replace |

## Patterns composed

- `premium-design-build/ProjectCaseStudyGrid` — case study grid (base)
- `premium-design-build/TeamCraftsmanship` — craftsmanship-led team (base, retitled to designer / carpenter / PM)
- `premium-design-build/AwardsPressRow` — press + awards row (base, retitled to NKBA / Houzz)
- `vertical/ConcreteBeforeAfterDragger` → `BeforeAfterTransform` — drag-to-reveal kitchen / bath transformation
- `vertical/RoofingSignatureSystem` → `DesignBuildSystem` — 5-phase Discovery → Reveal arc
- `vertical/ConstructionFinancingPromoCard` + `contractor-heritage/FinancingCallout` → `FinancingPremium` — 60-month financing card normalized to the editorial palette

## Deviations from the patterns (and why)

- **BeforeAfterTransform** drops the imperative `Move Left & Right` instruction copy and uses italic-Fraunces "drag the slider to see the transformation" instead — the editorial preset can't read like a how-to popup.
- **DesignBuildSystem** drops the "named system" metaphor (Owl's "Protect Your Nest") because metaphor-driven processes feel gimmicky in this aesthetic. Replaced with named phases and a six-month duration callout — the kitchen/bath buyer wants a calendar.
- **FinancingPremium** drops the construction template's red diagonal slash + oversized partner logo block. Kept the split card and the oversized `%`, recolored to gold-on-ink. Disclosure copy stays — financing remains a real product offering, not a footnote.
- **Header** keeps the `Start a Project` CTA but adds an italic-Fraunces "by appointment" sublabel underneath. The kitchen/bath buyer expects curation; "by appointment" signals it without feeling exclusionary.
- **OwnerTwilightFeature, CapabilitiesList, ProcessPremium, CTABandBespoke** removed from the base bundle. The kitchen/bath rhythm is 12 sections instead of 13. The owner-twilight beat doesn't apply (kitchens are interior, not twilight). Capabilities live inside case studies. Process is replaced by `DesignBuildSystem`. The mid-page CTA band is dropped because the financing card and the contact form do the work.

## Getting started

```bash
npm install
npm run dev
# open http://localhost:5173
```

Build:

```bash
npm run build
```

## Placeholders, not production

- generic monogram placeholder (letter "B" in an outlined square)
- `{{HANDLEBAR}}` literal placeholders for copy
- CSS-gradient placeholders for every commissioned photo (`.placeholder-architectural`, `.placeholder-aerial`, `.placeholder-twilight`)
- black + cream + gold palette tagged as `brand-*` — editable per client

## See also

- `../ref-premium-design-build/` — the base bundle this specializes
- `../ref-premium-design-build/DNA.md` — full typography / palette / motif spec
- `~/proofpilot-agents/websitepilot/patterns/premium-design-build/` — standalone, prop-driven versions of base sections
- `~/proofpilot-agents/websitepilot/patterns/vertical/` — vertical patterns (before/after, signature system, financing)
