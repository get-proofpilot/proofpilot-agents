# patterns/archetype-mascot

Prop-driven, brand-agnostic React primitives extracted from the Volt Vikings clone (`~/proofpilot-agents/websitepilot/templates/sources/ref-archetype-mascot`).

These are the highest-value structural moves from the archetype-mascot lane — hero, trust row, services grid, CTA with mascot, multi-col patriot footer. Each pattern is self-contained: no cross-imports beyond a single `brand` prop shape.

## Usage

```tsx
import HeroArchetypeMascot from "./HeroArchetypeMascot";

<HeroArchetypeMascot
  brand={{
    name: "Bears Plumbing",
    primary: "#F4A300",
    primaryInk: "#000000",
    dark: "#1E3A56",
    darker: "#102033",
    onDark: "#FFFFFF",
  }}
  mascotSrc="/bears-plumbing-mascot.svg"
  headlineLines={["LEGENDARY", "PLUMBING", "IN OREGON"]}
  subheadline="Fast, honest, friendly — priced up-front."
  primaryCta={{ label: "GET A FAST QUOTE", href: "/quote" }}
/>
```

## When each pattern applies

| Pattern | Use when | Avoid when |
|---|---|---|
| `HeroArchetypeMascot` | Brand has a mascot/character; home-service vertical; homeowner audience. | B2B / corporate / premium-editorial. |
| `TrustBarAllCaps` | First section after the hero; 3–5 proof bullets fit. | You have >5 bullets → use a card-grid instead. |
| `ServicesGridArchetype` | 4–8 services to surface. 8+ requires a separate services page. | 1–3 services only — use a single-column featured-service block instead. |
| `CTAWithMascot` | Mid-page or end-page trust band. Brand has a mascot asset. | No mascot available. |
| `FooterMultiColPatriot` | Home-service / local-business brands. Multiple service areas + services lists. | Single-service or SaaS. |

## Brand prop shape

Every pattern accepts a `brand` prop of this TypeScript shape:

```ts
type BrandTokens = {
  name: string;
  primary: string;        // loud CTA color
  primaryInk: string;     // text color on CTA
  dark: string;           // deep field color
  darker: string;         // deeper field variant for seams
  cream?: string;         // warm light alt surface
  onDark: string;         // primary text color on dark surfaces
  onDarkMuted?: string;   // secondary text on dark
  accent?: string;        // UPPER-headline accent (optional)
  fontFamily?: string;    // e.g. "Saira" — loads must be handled by host
};
```

## Rules

- Every prop defaults to a Volt Vikings-identical value so the component renders faithfully out of the box.
- No pattern imports another pattern.
- Tailwind arbitrary values are used where needed; no separate CSS file per pattern.
- Components are dependency-free except for `react` and `lucide-react`. No shadcn, no radix, no framer.
