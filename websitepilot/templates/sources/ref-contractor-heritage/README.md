# ref-contractor-heritage

**Reference clone of [bearsplumbing.net](https://bearsplumbing.net)** — the ProofPilot exemplar for the `contractor-heritage` preset. This is a LEARNING TEMPLATE, not a live client site.

Hook Agency's signature build pattern for roofing / plumbing / HVAC / GC clients with a heritage logo and an SEO-first funnel.

## When to use

Start from this template when a brief calls for:

- home service contractor (plumber, roofer, HVAC, electrician, GC)
- heritage-feeling brand (mascot, family-owned, "since 1984", regional pride)
- red + black or red + dark palette
- SEO-first funnel with a programmatic areas-served surface
- inline quote form as the primary conversion anchor (NOT a modal)

## When NOT to use

- boutique/luxury home service (stone, bespoke landscape, custom millwork) → use `ref-artisan-lux` instead
- pure-tech / SaaS → wrong palette and rhythm entirely
- any business where the hero should be copy-only or image-only (Hook contractor DNA is `split hero with form`)

## What to swap per client

| Token | Where | Example |
|---|---|---|
| `--brand-red` | `src/index.css` + `tailwind.config.ts` | swap to client's accent |
| `--brand-ink` | ditto | swap to client's dark |
| Logo placeholder | `Header.tsx`, `Footer.tsx` — look for `"BP"` text node | client logo svg/png |
| Mascot | `AboutMascot.tsx` — bear silhouette svg | client's mascot photo |
| `{{BRAND_NAME}}` / `{{CITY}}` / `{{SERVICE}}` | literally every file | site-wide find/replace |
| Service list | `Services.tsx`, `Footer.tsx` | client's actual services |
| Cities | `ServiceAreaMap.tsx`, `Footer.tsx` | client's service area |
| Reviews | `Reviews.tsx` | import from Google Places API or paste |
| Coupons | `CouponsGrid.tsx` | client's active offers |

## What NOT to swap

The DNA stays. Specifically:

- **Section order**: promo → header → hero-with-inline-form → 4-icon-trust → services → dark contact band → about/mascot → partnerships → coupons → reviews → areas → blog → footer. Don't reorder.
- **Typography**: Roboto Condensed 800 UPPERCASE headings. Keep.
- **Button shape**: radius 7px, padding 16×32, uppercase 700. Keep.
- **Two-tone CTA discipline**: red primary + dark secondary. No outlines, no gradients, no pills.
- **Red diagonal slash** motif — max 2-3 placements, all 110deg hard-stop.
- **Four-icon trust band** with three-word max labels.
- **Inline quote form right rail in hero.** This is the conversion anchor.

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

This repo deliberately ships with:
- generic bear silhouette (NOT Bears Plumbing's mascot)
- `{{HANDLEBAR}}` literal placeholders for copy
- `Logo 1 … Logo 10` grey boxes for partnerships
- red+black color system tagged as `brand-*` — editable per client

Future runs of websitepilot clone this folder, fill in brand tokens, generate service copy, then inject assets.

## Extracted patterns (prop-driven)

See `~/proofpilot-agents/websitepilot/patterns/contractor-heritage/` for standalone, prop-driven versions of each section component that can be dropped into any contractor build.
