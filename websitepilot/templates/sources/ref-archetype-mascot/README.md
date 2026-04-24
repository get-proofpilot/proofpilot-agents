# ref-archetype-mascot

Internal ProofPilot reference template. Not a live client build.

## What this is

A pixel-rhythm clone of the **Volt Vikings** archetype, distilled to its reusable design DNA. Use this as the starting scaffold any time a WebsitePilot brief lands in the `archetype-mascot` lane — bold mascot-led home-service brands that use ONE wide-weight sans-serif at wild size contrasts, a purple-and-cream surface rhythm, and an orange primary CTA as the brand stop-light.

Source recon lives in `~/recon-volt/` (DNA.md, computed-styles.json, structure.json, playwright-fullpage.png).

## When to use

- Home-service vertical (electrical, plumbing, HVAC, pest, roofing, hauling, pool).
- Brand has or wants a mascot / character who can anchor the hero AND reappear at section seams.
- Brief calls for "bold" / "legendary" / "heroic" / "family-owned but playful."
- Target audience is homeowners, not businesses.

## When NOT to use

- Premium / editorial aesthetics → use `premium-outdoor-editorial`.
- Trade-professional authority (restoration, commercial, luxury) → use `keystonerestoration` or `state48glass`.
- Anything with a minimalist / swiss / neutral palette spec.

## What to swap (client-level DNA changes)

| Swap | Where | Notes |
|---|---|---|
| Logo | `Header.tsx` and `Footer.tsx` | Replace the circular `VV` placeholder + wordmark. Keep the left-aligned 2-line lockup. |
| Mascot | `public/placeholder-mascot.svg` | Same `viewBox=0 0 431 563` so the hero `h-[88%]` positioning does not break. |
| Color tokens | `tailwind.config.ts` → `theme.extend.colors.brand.*` AND `src/index.css` → `:root` | Change values; do NOT change role names. `primary` stays the loud CTA, `dark` stays the deep field, `cream` stays the alt-section, `accent` stays the burnt-orange H1 tint. |
| Font | `index.html` Google Fonts line + `tailwind.config.ts` fontFamily.sans | Replace `Saira` with another wide-range sans (Barlow / Archivo / Anton / Oswald). Must have weights 400/700/800/900 for the giant headlines. |
| Copy | `{{DOUBLE-CURLY}}` placeholders scattered through each component | Every `{{...}}` marks a client-specific slot. Grep `{{` to find them all. |
| Service list | `Services.tsx` | 4–8 services; card template stays identical. |
| City pills | `ServiceArea.tsx` | 6–12 cities; pill style stays identical. |
| FAQs | `Faq.tsx` | 5–8 questions. |

## What NOT to change (preserve the DNA)

- The wild font-size range (17px → 123px on desktop) — this IS the design language.
- The section rhythm: dark → cream → dark → cream → orange drum → dark → cream → dark → cream → dark. Breaking this flow breaks the brand read.
- UPPERCASE + weight 900 on every "display" headline.
- The orange CTA has BLACK text, not white. Keeping black-on-orange is what makes it feel stop-light-loud.
- 10px border radius on buttons is the signature — not 4px, not 999px.

## Build

```bash
cd ~/proofpilot-agents/websitepilot/templates/sources/ref-archetype-mascot
npm install
npm run dev    # localhost:8080
npm run build  # dist/
```

## File map

```
src/
├── App.tsx
├── main.tsx
├── index.css                      — CSS tokens + button + typography utility classes
├── lib/utils.ts                   — cn() helper
├── pages/Index.tsx                — mounts all sections in their canonical order
└── components/
    ├── Header.tsx                 — logo + nav + phone-pill
    ├── Hero.tsx                   — night-sky mascot hero, 3-line giga headline
    ├── TrustBar.tsx               — cream intro block with bullet list
    ├── Services.tsx               — 2×4 service card grid on dark
    ├── WhyUs.tsx                  — 4 pillars + 6-card "why choose us"
    ├── GuaranteeBand.tsx          — orange 100% satisfaction band + zigzag seam
    ├── Reviews.tsx                — 2 testimonial cards on dark
    ├── Process.tsx                — 3 numbered step cards on cream
    ├── ServiceArea.tsx            — city pill grid on dark
    ├── Faq.tsx                    — 6 purple accordion bars on cream
    ├── CTABand.tsx                — dark final drum-roll with mascot silhouette
    └── Footer.tsx                 — 4 columns dark + utility strip
```
