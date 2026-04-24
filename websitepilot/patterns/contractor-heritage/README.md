# patterns/contractor-heritage

Prop-driven, brand-agnostic section primitives distilled from the Bears Plumbing / Hook Agency contractor-heritage reference clone (`templates/sources/ref-contractor-heritage/`).

Each pattern:

- Accepts props for brand (red, ink, logo, etc) + content (titles, arrays, urls).
- Renders Bears-identical output when no props provided (sensible defaults).
- Is standalone — no cross-component imports. Only relies on Tailwind + inline tokens.
- Has a top-level docstring declaring **WHEN TO USE** / **WHEN NOT TO USE** / **FITTING VERTICALS**.

## Components

| File | Purpose |
|---|---|
| `HeroWithInlineQuoteForm.tsx` | Split hero, H1 + reassurance bullets left, 6-field quote form right rail |
| `PromoBarTop.tsx` | Thin dark band above nav with promo/hours links |
| `TrustBarIcons4Up.tsx` | 4-icon trust band: LOCAL / WORKMANSHIP / UPFRONT / ON-TIME |
| `ReviewsWithGoogle5Star.tsx` | Google-G pill + overlapping avatars + 3 review cards |
| `CouponsGridContractor.tsx` | 3-card coupon grid on dark band, tel:-link entire card |
| `FinancingCallout.tsx` | Roofing-specific financing band (0% APR for 12 mo) |
| `FAQLongFormSEO.tsx` | 12-15 question accordion, SEO-dense for schema.org FAQ |

## Usage

```tsx
import HeroWithInlineQuoteForm from "@websitepilot/patterns/contractor-heritage/HeroWithInlineQuoteForm";

<HeroWithInlineQuoteForm
  brand={{ red: "#0055A4", ink: "#1A1D22" }}
  h1="Roofing Services in Austin, TX"
  subCopy="Storm damage? Call by noon, crew on-roof same day."
  bullets={["Family Owned Since 1998", "GAF Master Elite", "24-Hour Emergency", "Free Estimates"]}
  primaryCta={{ label: "Book a free inspection", href: "#quote" }}
  secondaryCta={{ label: "Call (512) 555-1212", href: "tel:+15125551212" }}
  googleRating={{ value: 4.9, count: 412 }}
/>
```
