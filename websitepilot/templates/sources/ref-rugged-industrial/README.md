# ref-rugged-industrial

Reference clone template for the **rugged-industrial** preset — concrete coatings, epoxy, pest, demolition, hauling, junk removal, industrial metal fabrication, and any trade where the voice is tradesman-direct and the floor above the fold is load-bearing.

Cloned from [taggconcretecoatings.com](https://www.taggconcretecoatings.com) (Matthew's concrete-industrial gold standard, flagged in 180 Sites' DNA doc for its diagonal concrete slashes + hexagon mark). Firecrawl and Playwright both rendered the source fully; cross-check showed no delta between the two extraction paths — Firecrawl's `branding` block and Playwright's computed-styles agreed on `Montserrat 500–900 + Roboto body`, `#151C24 ink + #0071BA concrete accent`, 4-5px radius, UPPERCASE section H2 up to 71px desktop.

## Stack
- Vite + React 18 + TypeScript
- Tailwind 3 (custom tokens in `tailwind.config.ts`)
- Montserrat 500/600/700/800/900 (display, ALL CAPS) + Roboto body via Google Fonts
- No shadcn / Radix dependency — kept intentionally minimal so any downstream brand run can layer shadcn on top without conflict.

## Install & run
```bash
npm install
npm run dev   # http://localhost:5194
npm run build
```

## Signature moves (Tagg / rugged-industrial DNA)
1. **ALL-CAPS Montserrat 900 section headlines at 55–71px desktop.** This is the single most important signature. Drop it and the whole page loses industrial authority.
2. **Flat concrete-blue rectangle CTA** (`#0071BA`, 4px radius, 2px border, no box-shadow). Contrast with `dfw-luxe-aerial`'s chunky offset shadow — rugged is flat, not springy.
3. **Full-bleed ink hero + inline quick-quote card** on the right. Form is above the fold, not hidden behind "Contact."
4. **Diagonal-slash + hexagon texture motif** carried via inline SVG `backgroundImage` — brand-agnostic replica of Tagg's PNG overlays. Applied to service grid, six-step, final CTA, service area.
5. **Alternating dark-ink / white / blue-ribbon / light-gray bands** give the 14-section page rhythm.
6. **Comparison table + numbered process steps** do more trust-lifting than testimonials. Rugged brands sell on *how*.
7. **Four-column dense dark footer** — load-bearing for local-SEO crawl.

## Brand-agnostic placeholders
- `[BRAND]`, `[METRO]`, `[City One]…[City Twelve]`, `[FOUNDER NAME]`, `(000) 000-0000`, `info@[brand].com`, `[Street Address]` — replace per brand run.
- `/public/placeholder-garage.svg` is a synthetic dark-floor-with-flake scene so we never ship Tagg's actual garage photography.
- `/public/placeholder-crew.svg`, `/public/placeholder-floor.svg`, `/public/placeholder-map.svg` round out the set.
- The hex-diamond logo mark is a generic polygon — swap in the brand's real SVG mark per run.

## Section map (14 blocks)
UtilityBar → Header → Hero (full-bleed + inline quote card) → ServiceRibbon (deep-blue) → Intro (50/50) → Services (dark-ink 3-up grid) → TrustUSPs (white 4-up) → MidCTABand (concrete ribbon) → PeaceOfMind (founder + checklist) → Reviews (dark 2-up) → Comparison (light-gray 4-col table) → SixStepProcess (dark 6-up numbered) → ServiceArea (dark + map) → FAQ (white accordion) → FinalCTA (full-bleed + form) → Footer (dark 4-col)

## Color tokens (Tailwind)
- `ink` `#151C24` (section + type)
- `ink-deep` `#0B1017` (cards, hover, footer)
- `concrete` `#0071BA` (accent)
- `concrete-deep` `#005083` (hover)
- `steel` `#F3F3F3` (neutral band)
- `text-body` `#333333`
- `caution` `#E0A419` (review stars)

## When to use this template
- Concrete coatings, polished concrete, epoxy
- Pest control, demolition, junk removal, hauling
- Industrial metal fabrication, welding, powder coating
- Auto-detailing / ceramic / wrap (rugged lane — not the luxury lane)

## When NOT to use
- Luxury / editorial / hospitality / spa — the Montserrat 900 uppercase reads too flat-industrial. Use `premium-outdoor-editorial` instead.
- Aerial-photography-heavy portfolios (pools, landscape) — use `ref-dfw-luxe-aerial` (chunky offset button, title-case Bebas, drone-aerial hero).
- Family-plumber / heritage contractor — use `ref-contractor-heritage` (mist-blue hero with inline quote + promo bar).
- Mascot-driven brands (pest, lawn) — use `ref-archetype-mascot` instead.
