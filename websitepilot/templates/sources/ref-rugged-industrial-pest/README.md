# ref-rugged-industrial-pest

**Pre-composed bundle:** `ref-rugged-industrial` base + pest-control vertical patterns. Skip the compose step for any pest demo.

## What this is

A fully-composed Vite scaffold with the rugged-industrial DNA (Montserrat 900 UPPERCASE, ink + concrete-blue, full-bleed dark hero with diagonal-slash motif) plus pest-specific patterns layered in. Richardson v2 demo learnings are baked in:

- Hero leads with **same-day + pet-safe**, not chemical names
- `PestEmergencyBand` sits ABOVE services so emergency callers convert before scrolling
- Single-founder photo replaced with **family team triple portrait**
- Bi-monthly **price shown upfront** (no discovery-call gate) in `MidCTABand`

## Base preset

`ref-rugged-industrial` — Tagg-style 14-section funnel. Originally built around concrete coatings; the visual DNA (dark ink, oversized condensed display, hex/diagonal motifs, ribbon CTAs) reads equally well for any tough-trade vertical.

## Vertical: residential pest control

Tuned for the **Phoenix / Vegas / Tucson / Tampa belt** — the markets where:
- scorpion + spider + termite anxiety drives recurring service contracts
- pet-safe + family-safe is the #1 buyer concern (above price)
- emergency calls (scorpion at 2am, wasp by the door) convert when same-day is visible
- bi-monthly recurring revenue is the business model — pricing simplicity matters

## Patterns composed

| Section | Component | Adapted from |
|---|---|---|
| 4 | `PestEmergencyBand` | `patterns/vertical/Plumbing247AvailabilityBand` adapted to pest emergency context |
| 7 | `Services` (3-card) | Pest-specific cards: General Pest / Scorpion / Termite |
| 9 | `MidCTABand` | Repurposed as bi-monthly $X simplicity band |
| 10 | `PeaceOfMind` | Family team triple portrait + founder story |
| 15 | `FAQ` | 7 pest-specific Qs (pet-safe, same-day, bi-monthly vs one-time, scorpion, termite, re-treats) |

## Section order

```
UtilityBar → Header → Hero (pest-service intake)
  → PestEmergencyBand          [vertical]
  → ServiceRibbon
  → Intro (family-led)         [vertical copy]
  → Services (3-card pest)     [vertical]
  → TrustUSPs
  → MidCTABand ($X bi-monthly) [vertical]
  → PeaceOfMind (family team)  [vertical]
  → Reviews
  → Comparison
  → SixStepProcess
  → ServiceArea
  → FAQ (pest)                 [vertical]
  → FinalCTA
  → Footer
```

## Palette nudge

Inherited from base, with one adjustment in `tailwind.config.ts`:

- `ink` shifted from `#151C24` → `#0F1620` (darker, predator/desert bias)
- `concrete` blue accent retained for trust signals
- `caution` amber retained for emergency callouts

The structural DNA (Montserrat display, oversized hero, diagonal-slash motif, ribbon CTA) is **unchanged**.

## When to use this bundle

- residential pest control in scorpion/termite/wasp-heavy markets (AZ, NV, TX, FL, southern CA)
- recurring bi-monthly revenue model
- 1-3 owner family operation positioning
- same-day or 24-hour dispatch capability
- pet-safe / family-safe is a real differentiator

## When NOT to use

- enterprise / B2B pest control (food-service, hospital, industrial) — wrong tone, use a B2B preset
- pure termite-only specialist — strip the bi-monthly pricing band and Family Team
- fumigation / tenting specialist — the rugged industrial palette reads off-tone for this; consider `ref-contractor-heritage` instead
- markets where scorpion/wasp emergencies are uncommon — drop `PestEmergencyBand`

## What to customize per client

| Token | Where | Example |
|---|---|---|
| `ink`, `concrete` | `tailwind.config.ts` | client palette swap |
| `[METRO]` and `[BRAND]` | search/replace across `src/` | `Phoenix`, `Sun Devil Pest` |
| Service-needed dropdown | `Hero.tsx` | match the client's actual service menu |
| `$X` placeholder | `MidCTABand.tsx` | bi-monthly recurring price |
| Family portraits | `PeaceOfMind.tsx` `FAMILY` array | client owner/tech names + roles |
| Phone + SMS | `PestEmergencyBand.tsx` | client phone for same-day + text |
| Service cards | `Services.tsx` `SERVICES` array | swap if client doesn't do termite, etc. |
| FAQ items | `FAQ.tsx` `ITEMS` array | client-specific |

## What NOT to customize

- The 17-section rhythm — moving `PestEmergencyBand` below services kills emergency conversion
- Montserrat 900 UPPERCASE display
- Ribbon CTA (concrete-blue with ink-deep diagonal slash)
- Family team **triple** portrait — going to 1 portrait reverts the Richardson v2 fix

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

Forked from `ref-rugged-industrial/`. Diff against base when pulling structural updates — but keep `Index.tsx`, `Hero.tsx`, `MidCTABand.tsx`, `PeaceOfMind.tsx`, `FAQ.tsx`, `Services.tsx`, `PestEmergencyBand.tsx` and the palette nudge in `tailwind.config.ts` local to this fork.
