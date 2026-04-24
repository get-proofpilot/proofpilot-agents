# Shared Motif SVG Library

Reusable motif SVGs for WebsitePilot / AutoPilot demo builds. Each motif ships as a `.svg` file + a `.tsx` React component wrapper (for drop-in use in Vite demos).

**Design principles:**
- `currentColor` fill so the parent CSS `color` drives the motif tint.
- Square viewBox (default 24×24) so it aligns in buttons + eyebrows + watermarks at any size.
- No fills except where the motif requires two-tone.
- Ship a base version + any necessary tall/wide/wordmark variants.

---

## Catalog

| Motif | Files | Use case | Shipped for |
|-------|-------|----------|-------------|
| `spire` | `spire.svg` + `Spire.tsx` | Desert red-rock silhouette | Red Rock Family Dentistry, any AZ-based service business |
| `lightning-bolt` | `lightning-bolt.svg` + `LightningBolt.tsx` | Electrical signal | Prestige Electrical, any electrical contractor |
| `shield` | `shield.svg` + `Shield.tsx` | Protection / guarantee | Pest control, restoration, security, any "we protect you" vertical |
| `scorpion` | `scorpion.svg` + `Scorpion.tsx` | Arizona pest specialty | Richardson Pest Management, other AZ pest brands |
| `heraldic-crest` | `heraldic-crest.svg` + `HeraldicCrest.tsx` | Multi-generational trust | Bugs Weeds & More, heritage-led home service |

---

## Usage in a Vite demo

```tsx
import { Scorpion, ScorpionIcon, ScorpionWatermark } from '@/motifs/Scorpion';

<h2 className="flex items-center gap-2">
  <Scorpion className="motif-glyph" /> Our services
</h2>

<button className="btn-primary">
  <ScorpionIcon /> Get a quote
</button>

<div className="relative">
  <ScorpionWatermark className="absolute right-0 bottom-0 w-[400px] opacity-5" />
  ...
</div>
```

---

## Adding a new motif

1. Author or trace the SVG. Keep it under 60 lines, use `currentColor`, square viewBox.
2. Save as `motifs/<slug>.svg`.
3. Create `<Slug>.tsx` with three named exports:
   - `<Slug />` — base (defaults to 24×24, inherits color)
   - `<SlugIcon />` — small button variant (14px)
   - `<SlugWatermark />` — large low-opacity variant
4. Update this README's catalog table.
5. Reference from the design-spec's Implementation Order when a relevant client comes up.

---

## Why this exists

Before this library, each Website Brain build hand-authored the motif from scratch. 60 lines × N clients = hundreds of lines of recreated work across demos. Now: import once, customize per demo (color, weight, applied placements — not the path data).

Gap flagged during Richardson Pest run (April 2026). Library seeded with the 5 motifs already extracted from past builds.
