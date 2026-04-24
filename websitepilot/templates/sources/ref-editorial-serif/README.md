# ref-editorial-serif

**Reference clone of [kingswoodlandscape.com](https://www.kingswoodlandscape.com)** — the ProofPilot exemplar for the `editorial-serif` preset. This is a LEARNING TEMPLATE, not a live client site.

Be The Anomaly's signature build pattern for $50K+ luxury design-build firms with commissioned photography and a discovery-call-first sales motion.

## When to use

- Luxury design-build (landscape, custom homes, estate remodels, bespoke millwork)
- Dental, medical, cosmetic practices where "editorial" is on-brand
- Legal / financial firms targeting HNW clients
- Any brand that already has commissioned photography

## When NOT to use

- Trades (plumbing, HVAC, roofing) — use `ref-contractor-heritage`
- SaaS / B2B software — use a tech preset
- Pure-consumer / playful brands — use `ref-playful-chunky-consumer`
- Industrial / masculine — use `ref-rugged-industrial`
- Any brand without commissioned photography — italic serif + stock imagery reads wrong

## What to swap per client

| Token | Where | Example |
|---|---|---|
| `--brand-accent` | `src/index.css` + `tailwind.config.ts` | swap green to client's accent |
| `--brand-ink` | ditto | rarely needs change |
| Crown monogram SVG | `Header.tsx`, `Footer.tsx`, `SignatureStats.tsx`, `Services.tsx`, `Ethos.tsx`, `EditorialQuote.tsx` | client's mark |
| Placeholder gradient hero | `Hero.tsx` | commissioned architectural photo |
| Placeholder service photos | `Services.tsx` | commissioned photos |
| Placeholder project photos | `Collection.tsx` | portfolio imagery |
| Placeholder ethos photos | `Ethos.tsx` | commissioned photos |
| Certification placeholders | `Ethos.tsx` | client's trade cert logos |
| `{{BRAND_NAME}}` / `{{CITY}}` / `{{SERVICE}}` | every file | site-wide find/replace |

## What NOT to swap

The DNA stays. Specifically:

- **Section order**: header → hero → signature stats → services → process → collection → ethos → editorial quote → reviews → cta → footer. Don't reorder.
- **Typography**: Fraunces serif throughout. **H1 is italic, H2 is roman.** That is the signature.
- **Button shape**: 0px radius, 16×32 padding, 0.18em letter-spacing. No pills, no gradients.
- **Cream `#FFFCF4` ground.** Warmth is load-bearing.
- **Crown monogram motif** — at least three placements (logo, section divider, card accent).
- **Editorial numerals** on stats and process steps — never icons.

## Getting started

```bash
npm install
npm run dev
# open http://localhost:5173
```

Build:

```bash
npm run build
```

## Placeholders, not production

This repo deliberately ships with:

- generic crown-silhouette SVG (NOT Kingswood's mark)
- `{{HANDLEBAR}}` literal placeholders for copy
- CSS-gradient placeholders for every commissioned photo
- cream + green palette tagged as `brand-*` — editable per client

Future runs of WebsitePilot clone this folder, fill in brand tokens, generate service copy, then inject commissioned photography.

## Extracted patterns (prop-driven)

See `~/proofpilot-agents/websitepilot/patterns/editorial-serif/` for standalone, prop-driven versions of each section component that can be dropped into any luxury design-build build.
