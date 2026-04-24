# patterns/rugged-industrial

Prop-driven, brand-agnostic React patterns extracted from `ref-rugged-industrial` (sourced from Tagg Concrete Coatings' DNA — ALL-CAPS Montserrat 900, concrete-blue-on-ink, flat rugged rectangles, diagonal-slash + hex-grid motifs).

Each file is standalone: drop into any Vite/Next project that loads Tailwind, Montserrat, and Roboto. No external deps beyond React 18.

## Tokens required
```css
--color-ink: #151C24;        /* section + type black-navy */
--color-ink-deep: #0B1017;   /* card + hover */
--color-concrete: #0071BA;   /* accent blue — CTAs, H3 */
--color-concrete-deep: #005083;
--color-steel: #F3F3F3;      /* neutral band */
--color-text: #333333;
```

## Fonts required
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
```

## Files
| File | What it is | When to use |
| --- | --- | --- |
| `HeroRuggedAllCaps.tsx` | Full-bleed photo + 102-deg ink overlay + ALL-CAPS Montserrat 900 headline + inline quick-quote card | Concrete / pest / demolition / hauling / industrial brands where form lives above the fold. |
| `DiagonalSlashTransition.tsx` | Thin concrete-blue band with inline diagonal-slash SVG motif | Between any two stacked white sections to break the rhythm industrially. |
| `TrustBarConcrete.tsx` | 4-up USP grid with shield icon + square concrete icon tiles | Under any hero that needs instant rugged-trust scaffolding. |
| `ServicesGridIndustrial.tsx` | Dark-ink + hex-grid texture + 3-up service cards with blue outline icons | Any trade with 6–9 service verticals. |
| `CTABandRugged.tsx` | Concrete-blue full-bleed CTA band with ink CTA + diagonal-slash bg | Penultimate section before footer, or mid-page commitment wedge. |
| `FooterDenseDark.tsx` | 4-column dark-ink footer with NAP + socials + service-area list | Bottom of any rugged-industrial page. |

## WHEN to reach for these
- Concrete coatings, epoxy, polished concrete
- Pest / demolition / hauling / junk removal
- Industrial metal fabrication / welding
- Auto-detail / wrap / ceramic coatings (the rugged variant, not the luxury variant)

## WHEN NOT to
- Hospitality / spa / boutique — too loud
- Editorial / luxury — use `premium-outdoor-editorial` instead
- Aerial-photography-driven — use `dfw-luxe-aerial` instead (chunky shadow button, title-case Bebas)
- Heritage / family-plumber — use `contractor-heritage` instead (inline quote-form on mist-blue hero)
