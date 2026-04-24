# ref-premium-design-build

**Reference clone of [cincomosqueteros.co](https://cincomosqueteros.co)**, adapted to the ProofPilot `premium-design-build` preset. This is a LEARNING TEMPLATE, not a live client site.

Exemplar for $50K+ hardscape / outdoor-living / landscape-architecture design-build firms with commissioned architectural or aerial drone photography and a discovery-call-first sales motion.

## When to use

- Hardscape + outdoor-living design-build studios
- Landscape architecture firms, custom-home and estate-remodel builders
- Boutique pool + spa designers
- Any firm with commissioned photography and a portfolio-first sales motion

## When NOT to use

- Trades (plumbing, HVAC, roofing) — use `ref-contractor-heritage`
- Consumer / playful — use `ref-playful-chunky-consumer`
- DFW-style drone-only aerial — use `ref-dfw-luxe-aerial`
- Editorial-serif luxury (italic H1, crown monogram) — use `ref-editorial-serif`
- Any brand without commissioned / aerial imagery

## What to swap per client

| Token | Where | Example |
|---|---|---|
| `--brand-gold` | `src/index.css` + `tailwind.config.ts` | client's accent |
| `--brand-ink` | ditto | rarely needs change |
| Monogram letter | `Header.tsx`, `Footer.tsx` | client's mark |
| Placeholder gradients | all `.placeholder-*` classes | commissioned architectural / aerial / twilight photos |
| `{{BRAND_NAME}}` / `{{CITY}}` / `{{OWNER_NAME}}` / `{{PHONE}}` / `{{EMAIL}}` | every file | site-wide find/replace |

## What NOT to swap

The DNA stays:

- **Section order**: header → hero → awards → philosophy → portfolio → owner feature → capabilities → team → process → quote → CTA band → contact → footer.
- **Typography**: Manrope sans throughout + one italic Fraunces accent phrase per section. Never add a second display face.
- **Button shape**: 4px radius, 18×28 padding, 0.14em letter-spacing. No pills, no sharp 0px.
- **Cream `#F7F2E8` ground.** Never white.
- **Muted gold `#B08A3E`** as the only accent. Never green, blue, or neon.
- **Owner twilight cutout** — one placement per build.
- **"Start a Project" / "Begin the Conversation"** CTAs — never "Get a Quote".

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

- generic monogram placeholder (letter "B" in an outlined square)
- `{{HANDLEBAR}}` literal placeholders for copy
- CSS-gradient placeholders for every commissioned photo (`.placeholder-architectural`, `.placeholder-aerial`, `.placeholder-twilight`)
- black + cream + gold palette tagged as `brand-*` — editable per client

Future runs of WebsitePilot clone this folder, fill in brand tokens, generate service copy, then inject commissioned photography.

## Extracted patterns (prop-driven)

See `~/proofpilot-agents/websitepilot/patterns/premium-design-build/` for standalone, brand-agnostic versions of each signature section that can be dropped into any premium design-build build.

## See also

- `DNA.md` — full typography / palette / motif spec + Firecrawl vs Playwright recon notes
