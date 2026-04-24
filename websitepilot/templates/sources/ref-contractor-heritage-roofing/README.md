# ref-contractor-heritage-roofing

**Pre-composed bundle:** `ref-contractor-heritage` base + roofing-specific vertical patterns. Ship a roofing demo without re-running the compose-patterns step.

## What this is

A fully-composed Vite scaffold with the contractor-heritage DNA (Roboto Condensed 800, red+ink palette, inline-quote-form hero) plus four roofing-specialty patterns slotted into the section rhythm. Future runs of WebsitePilot for roofing leads start here, fill in brand tokens, and ship.

## Base preset

`ref-contractor-heritage` — Hook Agency's signature build pattern for SEO-first home-service contractors. Heritage logo, mascot, family-owned, "since 1984" voice. Inline quote form is the conversion anchor.

## Vertical: roofing & exterior

Tuned for roofers, siding contractors, and exterior remodelers — the trades where:
- average ticket is $8k-25k (financing matters)
- buyer trust gap is high (team-led process matters)
- visualizers exist for shingles/siding (visualizer CTA matters)
- proprietary "systems" are a real conversion lever (Owl Roofing, GAF, Roofle pattern)

## Patterns composed

| Section | Component | Source |
|---|---|---|
| 5 | `RoofingSignatureSystem` | Owl Roofing — "Protect Your Nest" named-system block + named guarantee |
| 7 | `RoofingTeamLedProcess` | Northface Construction — numbered process with real headshots + first-person quotes |
| 9 | `FinancingCallout` | Hook contractor library — $3k+ ticket financing band w/ partner logo |
| 11 | `RoofingVisualizerCta` | EagleView/DesignEyeQ "Try Before You Buy" home-visualizer band |
| 12 | `FAQLongFormSEO` | Hook contractor library — 12-15 question accordion, schema.org/FAQPage ready |

## Section order

```
PromoBarTop → Header → Hero (inline quote form)
  → TrustBarIcons (4-icon)
  → RoofingSignatureSystem  [vertical]
  → Services (3-card: Roof Replacement / Storm Damage / Siding+Gutters)
  → RoofingTeamLedProcess   [vertical]
  → CouponsGrid
  → FinancingCallout        [vertical]
  → ServiceAreaMap
  → RoofingVisualizerCta    [vertical]
  → FAQLongFormSEO          [vertical]
  → DarkContactBand
  → Footer
```

## Palette

Inherited from base — `brand-red #EF3E33` + `brand-ink #231F20`. Vertical patterns are themed via `brand={…}` props in `Index.tsx` so swapping palette per client is a single-file change.

## When to use this bundle

- lead is a roofing, siding, gutter, or exterior remodeling contractor
- average ticket > $5k
- brief calls for SEO-first funnel + inline quote form
- client has (or is willing to invest in) team headshots and a financing partner

## When NOT to use

- emergency-repair-only services (drain clean, no-heat tune-up) — wrong rhythm
- boutique luxury exterior (architectural roofing, copper) — use `ref-premium-design-build`
- non-residential / commercial-only roofing — wrong tone
- trades with no visualizer partner option — strip `RoofingVisualizerCta` first

## What to customize per client

| Token | Where | Example |
|---|---|---|
| `--brand-red` / `--brand-ink` | `tailwind.config.ts` | client palette swap |
| Logo placeholder | `Header.tsx`, `Footer.tsx` | client SVG/PNG |
| `{{HERO_H1}}` / `{{CITY}}` / `{{STATE}}` | `Hero.tsx` and across files | site-wide find/replace |
| Signature system name | `RoofingSignatureSystem` props in `Index.tsx` | "Protect Your Castle", "Shield-First Process", etc. |
| Team headshots + quotes | `RoofingTeamLedProcess` props | client's actual team |
| Financing partner logo | `FinancingCallout` `partnerLogoUrl` | GoodLeap / Synchrony / FTL |
| Visualizer partner | `RoofingVisualizerCta` `partnerLogo` + `partnerLabel` | DesignEyeQ / Hover / Roofle |
| FAQ items | `FAQLongFormSEO` `items` prop | 12-15 client-specific Qs |

## What NOT to customize

The DNA of the contractor-heritage base stays:
- promo → hero (inline form) → 4-icon trust → services rhythm
- Roboto Condensed 800 UPPERCASE headings
- Red diagonal slash motif (max 2-3 placements, 110deg hard-stop)
- Two-tone CTA discipline (red primary + dark secondary, no outlines/gradients)

## Run it

```bash
npm install
npm run dev
# → http://localhost:5173
```

Build:

```bash
npm run build
```

## Bundle origin

Forked from `ref-contractor-heritage/`. To pull base updates, diff `src/` selectively — do NOT rsync over the composed `Index.tsx`.
