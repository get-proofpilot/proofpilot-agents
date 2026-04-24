# patterns/vertical

Prop-driven, brand-agnostic React section patterns harvested from vertical-specific
home-service sites in the ProofPilot Inspiration Guide. These extend the preset-level
pattern libraries (archetype-mascot, contractor-heritage, premium-design-build, etc.)
with moves that don't belong to a single preset but recur across specific trade
verticals.

Unlike preset-level patterns, vertical patterns are **composable into any preset**
as long as the brand vertical matches. They're not a "style lane" — they're a
toolbox of specific section moves proven in the wild.

## Index

| Pattern | Source | Vertical | Compatible Presets | When to use |
|---|---|---|---|---|
| `LandscapeDroneReelGrid` | [podlaz.com](https://podlaz.com) | Landscaping / Outdoor Living | premium-design-build, dfw-luxe-aerial, editorial-serif | Portfolio section when you have aerial/drone reels — tile of 6-8 short looping Vimeo-style videos |
| `ConcreteVsTraditionalCompare` | [jandjcustomcurbing.com](https://www.jandjcustomcurbing.com) | Concrete / Curbing / Specialist trades | contractor-heritage, rugged-industrial | Mid-funnel "us vs them" 2-column check/X comparison for specialists competing with generalists |
| `RoofingSignatureSystem` | [owlroofing.com](https://owlroofing.com) | Roofing / Exterior | contractor-heritage, archetype-mascot, editorial-serif | Named proprietary system + 3-step substeps + named guarantee — turns commodity workflow into brand asset |
| `HvacCouponEmbeddedServices` | [genzryan.com](https://genzryan.com) | HVAC / Plumbing / Electrical | contractor-heritage, archetype-mascot, playful-chunky-consumer | Service grid where each tile carries a $-off coupon chip — converts browsing into offer-triggered scroll |
| `HvacThreeDoorEntry` | [smockhvac.com](https://smockhvac.com) | HVAC / Plumbing / Electrical | contractor-heritage, rugged-industrial | Three-intent CTA row (Instant Quote / Book Service / Membership) directly under hero |
| `Plumbing247AvailabilityBand` | [smithservicesaz.com](https://smithservicesaz.com) | Plumbing / HVAC / Electrical emergencies | rugged-industrial, contractor-heritage | Oversized "24/7/365" emergency band with phone + text + sub-60-minute response promise |
| `GarageIconServiceStrip` | [callhighlevel.com](https://callhighlevel.com) | Garage doors / Locksmith / Tint / single-trade brands | contractor-heritage, rugged-industrial, archetype-mascot | Tight horizontal 6-up icon nav under hero — service menu without photos or copy |
| `RoofingTeamLedProcess` | [northfaceconstruction.com](https://northfaceconstruction.com) | Roofing / Siding / Remodeling | contractor-heritage, premium-design-build, editorial-serif | Numbered process cards fronted by real team member headshots + first-person quotes |
| `ConcreteBeforeAfterDragger` | [concretefixers.com](https://concretefixers.com) | Concrete / Pressure wash / Wraps / Turf / Roofing | all — universal proof block | Interactive draggable before/after slider — scroll-stopper for visual transformations |
| `ExteriorCommercialClientMarquee` | [onpointpressurewash.com](https://www.onpointpressurewash.com) | Pressure wash / Cleaning / Roofing / Landscape with commercial books | contractor-heritage, rugged-industrial | Dense 2-row logo marquee of real commercial clients (Walmart, Chevron, Chipotle, etc.) |
| `JunkServicePhotoTiles` | [junk-bros.com](https://junk-bros.com) | Junk removal / Hauling / Demolition / Land clearing | archetype-mascot, playful-chunky-consumer, rugged-industrial | Photo-first service cards where each tile is a full-bleed jobsite photo instead of an icon |
| `HvacBrandedVanHero` | [calldoggone.com](https://calldoggone.com) | HVAC / Plumbing / Electrical / Pest with fleet wrap | archetype-mascot, playful-chunky-consumer | Hero where the branded van is the primary visual — reinforces "I've seen that van around town" recall |
| `RoofingVisualizerCta` | [veteranscontractingllc.com](https://veteranscontractingllc.com) | Roofing / Siding / Windows / Exterior remodel | contractor-heritage, premium-design-build | "Try Before You Buy" band linking to a 3rd-party home visualizer (DesignEyeQ / Hover / Roofle) |
| `TurfPromoRibbonGuarantees` | [biltrightturf.com](https://biltrightturf.com) | Turf / Pool / Windows / Roofing install with promos | archetype-mascot, contractor-heritage, playful-chunky-consumer | Top-of-page promo ribbon + 3-guarantee card row working as urgency + reassurance combo |
| `ConcretePaginatedProcess` | [prestigeconcretedfw.com](https://www.prestigeconcretedfw.com) | Concrete / Construction / Pool / Excavation / Solar | contractor-heritage, rugged-industrial, premium-design-build | Paginated 01/04 stacked process cards with in-progress imagery — reads like a production diary |
| `WrapsCoverageTierCompare` | [valkyriewraps.com](https://valkyriewraps.com) | Wraps / PPF / Tint / Epoxy / Tiered-install trades | archetype-mascot, rugged-industrial, dfw-luxe-aerial | 3-tier coverage-option row (Spot / Partial / Full) showing sample results, no fake pricing |
| `ConstructionMultiCityPhoneRow` | [youngconstructionnorthiowa.com](https://youngconstructionnorthiowa.com) | Multi-market roofing / construction / franchise | contractor-heritage, rugged-industrial | Top utility bar with per-market city-labeled phone numbers — signals real local presence |
| `ExteriorInstantQuotePromise` | [jefflikescleanwindows.com](https://jefflikescleanwindows.com) | Pressure wash / Window / Gutter / Lawn / Holiday lighting | archetype-mascot, playful-chunky-consumer | "60 seconds to a quote" online-instant-quote promise + 1-2-3 flow |
| `GarageFlatRatePricingHero` | [prolinedoorservice.com](https://prolinedoorservice.com) | Garage doors / Locksmith / Water heater / Repair trades | contractor-heritage, rugged-industrial, archetype-mascot | Hero with upfront "starting at $X" price bullets — defies the "call for pricing" norm |

## Usage

```tsx
import RoofingSignatureSystem from "./RoofingSignatureSystem";
import ConcreteBeforeAfterDragger from "./ConcreteBeforeAfterDragger";

<RoofingSignatureSystem
  eyebrow="The Cedar Gold System"
  systemName="Protect Your Home"
  steps={[...]}
  brand={{ ink: "#0D1B2A", primary: "#D4A341", primaryInk: "#0D1B2A", surface: "#F4F1E8", accent: "#A37819" }}
/>

<ConcreteBeforeAfterDragger
  pairs={[
    { before: "/projects/driveway-before.jpg", after: "/projects/driveway-after.jpg", caption: "Sunken driveway, lifted in 48 hours" },
  ]}
  brand={{ ink: "#1A1A1A", accent: "#F2A71B", surface: "#F4F1EB" }}
/>
```

## Rules

- Every pattern is self-contained: no cross-imports.
- Every pattern accepts a `brand` prop with sensible defaults that render the
  source site's feel out of the box.
- No dependency on shadcn, radix, framer-motion. Tailwind arbitrary values +
  inline styles only.
- Defaults reflect the source site's content at time of harvest, with
  `{{TOKEN}}` placeholders only for brand name / city swaps where needed.
- Attribution: every file's docstring cites the source URL. Patterns are
  structural; no brand names, logos, or copyrighted copy are imported.

## Compatibility matrix quick reference

| Preset | Strong vertical fit |
|---|---|
| `archetype-mascot` | HVAC, Plumbing, Junk, Pressure Wash, Turf, Holiday Lighting |
| `contractor-heritage` | Roofing, Siding, Remodeling, Concrete, HVAC, Multi-trade |
| `premium-design-build` | Landscape, Outdoor Living, Hardscaping, Pool |
| `dfw-luxe-aerial` | Landscape, Wraps, Concrete Coatings, Premium install |
| `rugged-industrial` | Demolition, Excavation, Commercial pressure wash, Garage doors |
| `editorial-serif` | Premium landscape, Architectural, Design-build, High-end remodel |
| `playful-chunky-consumer` | HVAC mascot brands, Junk mascot brands, Holiday lighting |
