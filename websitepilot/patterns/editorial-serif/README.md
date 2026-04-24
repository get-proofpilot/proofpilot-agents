# patterns/editorial-serif

Prop-driven, brand-agnostic section primitives distilled from the Kingswood Landscape / Be The Anomaly editorial-serif reference clone (`templates/sources/ref-editorial-serif/`).

Each pattern:

- Accepts props for brand (accent, ink, cream) + content (titles, arrays, urls).
- Renders Kingswood-identical output when no props provided (sensible defaults).
- Is standalone — no cross-component imports. Relies on inline tokens + Fraunces serif.
- Has a top-level docstring declaring **WHEN TO USE** / **WHEN NOT TO USE** / **FITTING VERTICALS**.

## Components

| File | Purpose |
|---|---|
| `HeroEditorialSerif.tsx` | Full-bleed architectural hero, italic serif H1 bottom-left + subcopy CTA card bottom-right |
| `MonogramDivider.tsx` | Centered crown glyph flanked by hairlines, used between dense sections |
| `GalleryCommissioned.tsx` | 3-up portfolio grid, photo-only cards with title + arrow-badge overlay |
| `AboutPhilosophy.tsx` | Two-paragraph ethos column + monogram divider + flanking photo column + cert row |
| `EditorialQuoteBlock.tsx` | Oversized italic pull-quote on cream-warm ground, magazine treatment |
| `CTABandRestrained.tsx` | Dark-ink final CTA band with italic H2, phone + primary row, no form |
| `FooterLuxe.tsx` | Black-ground 4-column footer with italic accent headings + social wordmarks |

## Usage

```tsx
import HeroEditorialSerif from "@websitepilot/patterns/editorial-serif/HeroEditorialSerif";

<HeroEditorialSerif
  brand={{ accent: "#8A6D3B", ink: "#0E0C08", cream: "#FBF8F1" }}
  eyebrow="Introducing"
  h1Italic="The Harrington Suite"
  subCopy="A dental practice reimagined as a study in craft, proportion, and unhurried care."
  primaryCta={{ label: "Book A Consultation", href: "#contact" }}
  backgroundImageUrl="/hero-commissioned.jpg"
  navLabels={["Practice", "Care", "Story", "Contact"]}
  brandName="Harrington Dental"
  brandTagline="Bespoke Restorative Care"
/>
```

## Hard rules

- Never swap the italic-serif H1 for a sans-serif. That is the preset's SIGNATURE.
- Never change button radius off of 0px. 0px is load-bearing.
- Never drop the cream ground for pure white — warmth is load-bearing.
- Use commissioned photography only. Stock imagery collapses the treatment.
- Use SPARINGLY in production — luxury design-build, dental, medical, legal, estate remodel, high-end remodel only. Never for trades.
