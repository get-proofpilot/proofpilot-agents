# ref-dfw-luxe-aerial

Reference clone template for the **dfw-luxe-aerial** preset — pool / outdoor living / concrete-luxe / landscape brands that ship drone-aerial photography and want the Be The Anomaly DNA.

Cloned from [anomalypoolservices.io](https://www.anomalypoolservices.io/) (Be The Anomaly's flagship internal build). Substitution was not needed — source site rendered fully under both WebFetch (Firecrawl-stand-in) and Playwright MCP.

## Stack
- Vite + React 18 + TypeScript
- Tailwind 3 (custom tokens in `tailwind.config.ts`)
- Bebas Neue (display, title-case) + Work Sans (body/buttons) via Google Fonts
- No shadcn / Radix dependency — kept intentionally minimal so any downstream brand run can layer shadcn on top without conflict.

## Install & run
```bash
npm install
npm run dev   # http://localhost:5193
npm run build
```

## Signature moves (Anomaly Pool / BtA DNA)
1. **Title-case Bebas Neue headline** — NOT ALL CAPS. This is the BtA differentiator vs 180 Sites.
2. **One-noun color-paint accent** — one word per headline wrapped in `<span className="accent">` using `#4CA8DE`.
3. **Chunky offset-shadow button** — `box-shadow: 0 5px 0 0 #121A1E;` 8px radius, navy border, Work Sans 700.
4. **Google 5-star pill in hero** — G icon, 5 gold stars, rating, 3–5 overlapping avatars, count chip.
5. **Full-bleed drone aerial hero** with 138deg navy-to-transparent overlay (not an offset card).
6. **Dark-band inline quote form** directly under hero / mid-page (`bg-twilight`, white form card).
7. **Alternating navy / white / mist 50/50 section bands** for rhythm.

## Brand-agnostic placeholders
- `[BRAND NAME]`, `[L]` (logo letter), `(000) 000-0000`, `[CITY / METRO]`, `[FOUNDER PORTRAIT]`, `[AERIAL]`, `[STEP PHOTO]` — replace per brand run.
- `/public/placeholder-aerial.svg` is a synthetic twilight-backyard-with-pool SVG so we never ship the real Anomaly Pool drone photo. Swap in a licensed drone aerial for real brand runs.

## Section map
Header → Hero → TrustSignalsRow → Services → About → Gallery → Process → Reviews → InlineQuoteForm → ServiceArea → FAQ → CTABand → Footer

## Color tokens (Tailwind)
- `accent` #4CA8DE (pool blue)
- `accent-ink` #2F85B7
- `navy` #121A1E
- `mist` #E9F5FB
- `twilight` #0C0C0C

## When to use this template
- Pool builders, outdoor living, hardscape, concrete, landscape, custom deck builders.
- Any DFW / luxury-suburb home-service brand where drone aerials carry the portfolio.
- Any brand whose voice is tradesman-confident, not hospitality-soft.

## When NOT to use
- Brands without drone aerials — use `ref-contractor-heritage` instead.
- Hospitality / spa / boutique-retail — the navy-heavy palette reads too industrial.
- Ultra-luxury high-end custom builders who need a serif-driven editorial feel — use `premium-outdoor-editorial`.
