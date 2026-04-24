# ref-contractor-heritage-hvac

**Pre-composed bundle:** `ref-contractor-heritage` base + HVAC-specific vertical patterns. Ship a residential-HVAC demo without re-running the compose-patterns step.

## What this is

A fully-composed Vite scaffold with the contractor-heritage DNA (Roboto Condensed 800 UPPERCASE, red + ink palette, inline-quote-form anchor) plus seven HVAC-specialty patterns slotted into the section rhythm. Future runs of WebsitePilot for residential HVAC leads start here, fill in brand tokens, and ship.

## Base preset

`ref-contractor-heritage` — Hook Agency's signature build pattern for SEO-first home-service contractors. Heritage logo, mascot, family-owned, "since 1984" voice. Inline quote form is the conversion anchor.

## Vertical: residential HVAC

Tuned for residential heating, cooling, and indoor air quality contractors — the trades where:

- average ticket spans $89 tune-up to $10k full-system replacement (financing matters)
- traffic is highly mixed: emergency no-heat / no-cool, browsers comparing equipment, members renewing maintenance plans (three-door entry segments them)
- every home has TWO equipment systems (heating + cooling) with parallel decision paths (heat-pump-vs-furnace spec compare)
- coupons drive 30-40% of click-through on service cards (embedded coupon chips, not a separate coupons page)
- 24/7 emergency dispatch is a real differentiator for the brands that staff it

## Patterns composed

| Section | Component | Source |
|---|---|---|
| 3 (Hero composition) | `HvacBrandedVanHero` | Doggone Good HVAC — branded van as primary hero visual |
| 5 | `HvacThreeDoorEntry` | Smock HVAC — Heating / Cooling / IAQ 3-door intent splitter |
| 7a | `HvacGuaranteeBadgeRibbon` | Genz-Ryan — 5-icon named-program ribbon |
| 7b | `HvacCoreValuesPillarTrio` | Smock HVAC — "The 3 Cs" alliterative trust pillars |
| 8 | `TankVsTanklessSpecCompare` | Speedy Water Heaters — re-purposed for heat-pump vs gas-furnace |
| 9 | `HvacCouponEmbeddedServices` | Genz-Ryan — service grid with coupon chip per tile |
| 11 | `Plumbing247AvailabilityBand` | Smith Plumbing AZ — adapted for "24/7 EMERGENCY HVAC" |
| 12 | `FinancingCallout` | Hook contractor library — 0% APR financing band |
| 13 | `FAQLongFormSEO` | Hook contractor library — 12-15 question accordion |

The `Hero` component (`src/components/Hero.tsx`) composes `HvacBrandedVanHero` plus an inline quote form band in a single section, so the contractor-heritage "form-anchored hero" rule still holds.

## Section order

```
PromoBarTop (financing + 24/7 + tune-ups)
  → Header (Heating / Cooling / IAQ nav)
  → Hero (HvacBrandedVanHero + inline quote form) [vertical]
  → TrustBarIcons (LOCAL / WORKMANSHIP / UPFRONT / ON-TIME)
  → HvacThreeDoorEntry        [vertical]
  → Services (3-column detail under each door)
  → HvacGuaranteeBadgeRibbon  [vertical]
  → HvacCoreValuesPillarTrio  [vertical]
  → TankVsTanklessSpecCompare [vertical]
  → HvacCouponEmbeddedServices [vertical]
  → Reviews
  → Plumbing247AvailabilityBand [vertical · adapted to HVAC]
  → FinancingCallout
  → FAQLongFormSEO
  → CTABand
  → Footer
```

## Palette

Inherited from base — `brand-red #EF3E33` + `brand-ink #231F20`. Adds a comfort-blue accent (`brand-blue #1976D2`) for cooling-side moments: AC tile in the three-door, cooling column in Services, cooling-favored row highlights in TankVsTankless, IAQ block in coupons.

The duality is intentional: red signals heat / urgency / primary CTA, blue signals cool / calm / consultation. Together they read as the universal hot/cold visual language every HVAC homeowner already knows.

Vertical patterns are themed via `brand={…}` props inside `Index.tsx` so swapping palette per client is a single-file change.

## When to use this bundle

- lead is a residential HVAC contractor (heating + cooling, ideally + IAQ)
- average new-system ticket > $4k (so financing pays off)
- brief calls for SEO-first funnel + inline quote form
- client has (or is willing to invest in) a branded van wrap and a financing partner
- 24/7 emergency dispatch is real (not aspirational marketing)

## When NOT to use

- commercial-only HVAC — wrong tone, wrong rhythm
- single-service specialists (water-heater-only, mini-split-only, duct-cleaning-only)
- boutique luxury HVAC (high-end residential design-build) — use `ref-premium-design-build`
- brands without a real branded van — strip `HvacBrandedVanHero` and revert to base `Hero`
- brands without a financing partner — strip `FinancingCallout`, drop financing line in `PromoBarTop`

## What to customize per client

| Token | Where | Example |
|---|---|---|
| `--brand-red` / `--brand-ink` / `--brand-blue` | `src/index.css` + `tailwind.config.ts` | client palette swap |
| Logo placeholder (`HC`) | `Header.tsx`, `Footer.tsx` | client SVG/PNG |
| Branded van image | `Hero.tsx` `vanImage` prop | `/brand/branded-van.png` |
| `{{BRAND_NAME}}` / `{{CITY}}` / `{{STATE}}` / `{{PHONE_NUMBER}}` | every file | site-wide find/replace |
| Three-door labels | `HvacThreeDoorEntry` props in `Index.tsx` | rebrand "Indoor Air Quality" if client uses different name |
| Detailed services per door | `Services.tsx` | client's actual heating / cooling / IAQ services |
| Guarantee program names | `HvacGuaranteeBadgeRibbon` props | "Comfort Club Warranty", "RoyalBlue Promise", etc. |
| Three Cs (or whatever trio) | `HvacCoreValuesPillarTrio` props | client's real alliterative values |
| Heat-pump vs furnace specs | `TankVsTanklessSpecCompare` props | local cost ranges, climate-tuned recommendation |
| Coupons | `HvacCouponEmbeddedServices` props | client's active offers |
| Financing partner | `FinancingCallout` `partnerLogoUrl` | GoodLeap / Synchrony / FTL |
| FAQ items | `FAQLongFormSEO` `items` prop | 12-15 client-specific questions |

## What NOT to customize

The DNA of the contractor-heritage base stays:

- promo → hero (with form) → 4-icon trust → services rhythm
- Roboto Condensed 800 UPPERCASE headings
- Red diagonal slash motif (max 2-3 placements, 110deg hard-stop)
- Two-tone primary-CTA discipline (red primary + dark or white secondary, no outlines / gradients)
- Inline quote form anchored to the hero — never a modal

The HVAC-specific additions also stay:

- Three-door entry directly under the trust bar (intent-segments traffic before the services grid)
- Comfort-blue accent reserved for cooling moments (don't paint primary CTAs blue)
- 24/7 availability band sits between Reviews and FinancingCallout (emergency-caller exit)

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

Forked from `ref-contractor-heritage/`. To pull base updates, diff `src/` selectively — do NOT rsync over the composed `Index.tsx` or the HVAC-customized `Header.tsx`, `PromoBarTop.tsx`, `Services.tsx`, `Footer.tsx`, `Hero.tsx`, or `CTABand.tsx`.
