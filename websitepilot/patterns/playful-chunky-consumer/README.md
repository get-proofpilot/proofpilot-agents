# patterns/playful-chunky-consumer

Prop-driven, brand-agnostic React primitives extracted from the Santa Banana Lighting clone (`~/proofpilot-agents/websitepilot/templates/sources/ref-playful-chunky-consumer`).

These are the highest-value structural moves from the playful-chunky-consumer lane — navy hero with inline quote card, chunky 5px-radius candy buttons, services-grid with per-card CTA, tiered package cards, emoji-led reviews, a full-bleed candy CTA band, a sliding feature marquee, and the darker-navy 4-col footer. Each pattern is self-contained: no cross-imports beyond the local `types.ts` (the `BrandTokens` shape) and one another where composition helps (e.g. `ChunkyRoundedButton` is the shared CTA primitive).

## Usage

```tsx
import HeroPlayfulMascot from "./HeroPlayfulMascot";

<HeroPlayfulMascot
  brand={{
    name: "Pawsome Day Camp",
    primary: "#F4C430",
    primaryInk: "#1A1A1A",
    accent:  "#E44D4D",
    accentInk: "#FFFFFF",
    dark:    "#1C3B5E",
    darker:  "#0F1F30",
    sky:     "#2E6BA6",
    onDark:  "#FFFFFF",
    onDarkMuted: "#D1DEEB",
    fontFamily: "'Fira Sans', sans-serif",
  }}
  headline="The Happiest Dog Camp in the East Bay"
  subheadline="Wag-filled days. Tired-happy pups by pickup."
  primaryCta={{ label: "Book a Meet & Greet", href: "/book" }}
  secondaryCta={{ label: "Call (555) 222-0000", href: "tel:5552220000" }}
/>;
```

## When each pattern applies

| Pattern | Use when | Avoid when |
|---|---|---|
| `HeroPlayfulMascot` | Character-led consumer brand with a quick-quote conversion goal. | B2B / corporate / premium-editorial; no available hero asset. |
| `ChunkyRoundedButton` | Every CTA in this lane (hero, services, final). | Premium / editorial; when pill (999px) radius is required. |
| `ServicesPlayful` | 4 service / offer pillars, each with its own CTA. | 1–3 or 6+ services; services that need hero imagery. |
| `MembershipCardsPlayful` | 2–4 packages / tiers / memberships (seasonal, pets, kids). | 5+ packages; enterprise / SaaS pricing. |
| `ReviewsWithEmoji` | Consumer brand where reviews read emotional. | B2B / medical / financial; star-rating-forward testimonials. |
| `CTABandCandy` | Mid-page attention-stop or pre-footer drum-roll. | Premium-editorial; inside the hero. |
| `MarqueeBar` | Below-hero or above-footer 4–8 short feature bullets. | >8 bullets; long (>4-word) items. |
| `FooterBright` | Local / consumer / home-service with multiple link groups. | Single-CTA micro-sites; B2B 2-col footers. |

## Brand prop shape

Every pattern accepts a `brand?: Partial<BrandTokens>` prop of this TypeScript shape (see `types.ts`):

```ts
type BrandTokens = {
  name: string;
  primary: string;        // candy CTA color (yellow-gold)
  primaryInk: string;     // ink on primary CTA
  accent: string;         // second-stop (candy-red, phone CTA)
  accentInk: string;      // ink on accent surface
  dark: string;           // navy hero / surface
  darker: string;         // deeper navy / footer
  sky?: string;           // optional mid-blue alt-band
  cream?: string;         // light alt-surface
  onDark: string;
  onDarkMuted?: string;
  ink?: string;
  inkMuted?: string;
  fontFamily?: string;      // display family (Fira Sans on ref)
  bodyFontFamily?: string;  // body family (Open Sans on ref)
};
```

## Rules

- Every prop defaults to a Santa-Banana-identical value so the component renders faithfully out of the box.
- No pattern pulls in a styling dependency (no shadcn, no radix, no framer, no tailwind-only). CSS is inline + one inline `<style>` block for the marquee keyframes.
- `ChunkyRoundedButton` is the one shared sub-primitive — other patterns import it but that's the only allowed cross-import.
- **Button radius is 5px, not 999px.** If you need pills, fork the file.
- Every pattern's docstring spells out its WHEN TO USE / WHEN NOT TO USE criteria. If a brief violates the "when not to" list, pick a different lane.
