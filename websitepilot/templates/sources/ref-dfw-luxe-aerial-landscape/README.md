# ref-dfw-luxe-aerial-landscape

**Pre-composed bundle:** `ref-dfw-luxe-aerial` base + landscape / outdoor-living vertical patterns. Skip the compose step for any landscape-design demo.

## What this is

A fully-composed Vite scaffold with the dfw-luxe-aerial DNA (Bebas Neue title-case, navy + accent, full-bleed aerial hero with 138deg overlay, chunky offset-shadow buttons) — with the accent palette nudged from pool-blue to landscape-green and the portfolio reworked around drone-reels-first / masonry-second.

## Base preset

`ref-dfw-luxe-aerial` — built around DFW pool + outdoor-living designers (Anomaly Pool family). Aerial-photo hero, condensed display type in title-case, dramatic navy overlays, Google-star-pill above-the-fold trust.

## Vertical: landscape & outdoor living

Tuned for **full-property landscape design-build studios** — Pro Outdoor (Phoenix), McKay Landscape, top-tier estate studios. The trades where:
- aerial drone footage is the most valuable conversion asset
- the buyer is buying a designer (not a crew), so the founder block is load-bearing
- "intentional from the air and from the front door" is the value proposition
- estate maintenance is part of the relationship, not a separate service line

## Patterns composed

| Section | Component | Source |
|---|---|---|
| 5 | `LandscapeDroneReelGrid` | Pro Outdoor / podlaz.com — looping drone reel grid (no chrome, 8-12s loops) |
| 6 | `GalleryMasonryAerials` | dfw-luxe-aerial library — 4-col masonry w/ 2x2 hero tile |
| 7 | `DroneAerialAboutFounder` | dfw-luxe-aerial library — navy-band 60/40 founder + offset stat badge |

## Section order

```
Header → Hero (drone aerial + Google star pill)
  → TrustSignalsRow
  → Services (6-card landscape)         [vertical copy]
  → LandscapeDroneReelGrid              [vertical]
  → GalleryMasonryAerials               [vertical]
  → DroneAerialAboutFounder             [vertical]
  → Process
  → Reviews
  → InlineQuoteForm
  → ServiceArea
  → CTABand
  → Footer
```

## Palette nudge

Inherited from base, **with one adjustment** in `tailwind.config.ts`:

| Token | Base (pool) | Landscape variant |
|---|---|---|
| `accent` | `#4CA8DE` (pool-blue) | `#2D6A4F` (landscape-green) |
| `accent-ink` | `#2F85B7` | `#1F5238` |
| `mist` | `#E9F5FB` (pool tint) | `#E8F2EC` (fresh-green tint) |
| `chunk-accent` shadow | `#4CA8DE` | `#2D6A4F` |
| `navy`, `twilight`, type, button mechanics | unchanged | unchanged |

The structural DNA (Bebas Neue title-case, 138deg aerial overlay, chunky offset-shadow buttons, navy panels) is **preserved**. Only the accent identity shifts from "pool" to "garden".

## When to use this bundle

- full-property landscape design-build studios
- outdoor-living specialists (pavilions, kitchens, fire features) where landscape is the spine
- founder-led brand with a real portrait and 5+ years
- aerial drone footage is available (or budget exists to shoot it)
- estate / luxury residential clients (avg project > $50k)

## When NOT to use

- maintenance-only landscape companies — strip the founder + drone-reel sections, use a simpler preset
- pool-only specialists — use base `ref-dfw-luxe-aerial` (pool-blue accent fits)
- xeriscape / native plant boutiques — reads too estate-formal
- sub-$15k project specialists (mow + blow, simple plant install) — wrong tone

## What to customize per client

| Token | Where | Example |
|---|---|---|
| `accent`, `mist` | `tailwind.config.ts` | client palette swap (still recommend a green/earth tone) |
| Hero image + headline | `Hero.tsx` | client's best aerial + studio voice |
| Service cards | `Services.tsx` `SERVICES` array | match client's actual service line |
| Drone reels | `Index.tsx` `LandscapeDroneReelGrid` `reels` prop (or use defaults) | client's actual reel URLs |
| Masonry tiles | `Index.tsx` `GalleryMasonryAerials` `tiles` prop | real project photos + labels |
| Founder copy + stats | `Index.tsx` `DroneAerialAboutFounder` props | real founder voice, real stat numbers |

## What NOT to customize

- Bebas Neue title-case headlines (no UPPERCASE forcing)
- 138deg navy gradient hero overlay
- Chunky offset-shadow button mechanic (`box-shadow: 0 5px 0 0 navy`)
- Reels-first → masonry-second portfolio order (don't lead with stills)
- Founder block follows portfolio (work first, person second)

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

Forked from `ref-dfw-luxe-aerial/`. Pull base updates carefully — the palette nudge and the Index.tsx composition are local to this fork.
