# Pattern System — Custom Backgrounds + Treatments

> The visual layer that separates a template-skin demo from a hand-designed agency build. Every demo gets a pattern library generated via Nano Banana Pro and applied section-by-section per the rules below.

The four pillars from the inspiration guide (Cohesive · Detail · Dynamic) all show up here. Pillar #2 ("Detail — patterns, textures, background elements") is the entire job of this doc.

## The 10-pattern starter library

Generated via `scripts/generate-image.sh` per demo. Lives at `<demo>/public/patterns/`.

| Pattern | Purpose | Where to apply | Example sections |
|---------|---------|----------------|------------------|
| `diagonal-slash.jpg` | Aggressive industrial overlay on dark sections | Dark hero / dark CTA bands | Hero overlay, MidCTABand |
| `scorpion-motif.jpg` *(brand-specific)* | Committed brand mark watermark | Hero corner, footer brand mark | Used as `.scorpion-watermark` element |
| `desert-grit.jpg` | Warm sandstone overlay for cream surfaces | Light cards, light bands | About card, Reviews card |
| `paper-grain.jpg` | Subtle fibrous overlay on white cards | Service cards, FAQ accordions | Services grid card surface |
| `cross-hatch.jpg` | Editorial newspaper-style overlay | Photographs, About-section imagery | Intro section photo |
| `dot-matrix.jpg` | Subtle small-dot ghost background | Stat bands, trust-USP rows | TrustUSPs |
| `hex-grid.jpg` | Geometric ghost grid | Process sections, methodology blocks | SixStepProcess |
| `saguaro-pattern.jpg` *(regional)* | Sonoran-themed silhouette pattern | FAQ section, region-specific bands | FAQ for AZ clients |
| `sonoran-topo.jpg` *(regional)* | Topographic contour lines | Service-area sections | ServiceArea map area |
| `section-wedge.jpg` | Sharp angled section divider | Top edges of dark sections | Between hero + first content section |

**Brand-specific patterns** like `scorpion-motif` and `saguaro-pattern` are generated per client. Universal patterns (`diagonal-slash`, `dot-matrix`, `hex-grid`, `cross-hatch`, `paper-grain`, `desert-grit`) are reusable across demos.

## CSS pattern utility classes

All wired up in `src/index.css` under `@layer components`. Pattern of usage:

```css
/* Section background patterns — apply to <section> element */
.bg-pattern-topo
.bg-pattern-hex
.bg-pattern-saguaro
.bg-pattern-dot-matrix

/* Surface overlays — apply to elements with relative positioning */
.desert-grit-overlay
.paper-grain-overlay
.cross-hatch-overlay

/* Brand watermark elements — absolutely positioned */
.scorpion-watermark    /* generic name = .<motif>-watermark per client */

/* Decorative ghost numerals — use behind step-by-step sections */
.ghost-numeral

/* Section transition wedge */
.section-wedge-top
```

Each class uses `mix-blend-mode` (multiply for light surfaces, screen/overlay for dark) at 6-12% opacity so patterns are felt, not seen.

## Section-to-pattern mapping (the recipe)

For a typical home-service demo following the Blueprint 14-section wireframe:

| Blueprint section | Pattern treatment |
|-------------------|-------------------|
| 1. Navigation | None — keep clean |
| 2. Hero | `diagonal-slash` overlay on dark bg + scorpion/motif watermark in corner |
| 3. Before/After | `paper-grain-overlay` on each case-study card |
| 4. Reviews | `desert-grit-overlay` on review cards |
| 5. Trust Badges + Numbers | `bg-pattern-dot-matrix` on the section |
| 6. Why You | None — keep type-driven |
| 7. How It Works (Process) | `bg-pattern-hex` + ghost numerals behind each step |
| 8. Services | `paper-grain-overlay` on each service card |
| 9. About + Team | `cross-hatch-overlay` on photo, `desert-grit-overlay` on text card |
| 10. FAQs | `bg-pattern-saguaro` (regional) OR `bg-pattern-hex` (universal) |
| 11. Offers | None — keep contrast high |
| 12. Service Areas | `bg-pattern-topo` (desert) OR `bg-pattern-dot-matrix` (universal) |
| 13. Video/Social | None |
| 14. Footer | Motif watermark in corner |
| Section transitions | `.section-wedge-top` between every dark→light flip |

**Rule of restraint:** no more than 4-5 sections with pattern treatments. The rest stay clean. Pattern overuse → "designed by committee" feel.

## Generation procedure (per demo)

After `init-from-clone.sh` + `scrub-template.sh`:

```bash
DEMO=/tmp/<client>-demo
mkdir -p "$DEMO/public/patterns"

# Brand-specific patterns (regenerate per client)
./scripts/generate-image.sh \
  --prompt "Single editorial silhouette of a <motif>, deep <brand-color> on transparent, brand-mark quality, 1024x1024 centered" \
  --out "$DEMO/public/patterns/<motif>-motif.jpg" --aspect 1:1

./scripts/generate-image.sh \
  --prompt "Repeating <regional> pattern, monochrome with subtle <accent> tint, low opacity, 1024x1024 seamless tileable" \
  --out "$DEMO/public/patterns/<region>-pattern.jpg" --aspect 1:1

# Universal patterns (can be cached + reused if desired)
for slug in diagonal-slash hex-grid dot-matrix cross-hatch paper-grain desert-grit; do
  if [ ! -f "$DEMO/public/patterns/$slug.jpg" ]; then
    ./scripts/generate-image.sh --prompt "..." --out "$DEMO/public/patterns/$slug.jpg" --aspect 1:1
  fi
done
```

For maximum efficiency, add a future `scripts/generate-pattern-set.sh <demo> --motif <slug>` helper that runs all 10 generations in parallel.

## Image-to-image upscale of authentic client assets

```bash
./scripts/generate-image.sh \
  --input /tmp/<client>/assets/authentic/owner-real.jpg \
  --prompt "Editorial portrait re-render preserving the same person's exact face, identity, hairstyle, clothing colors, and pose. Upscale to ultra high resolution, photorealistic commercial photography, soft directional studio light, deep contrast, polished color grading, no logos, no text added." \
  --out <demo>/public/owner-real.jpg \
  --aspect 4:5 \
  --negative "no logos, no text, do not change the person's face or identity"
```

Used on Premier Pest run: real Brand Brain owner photos (89-98 KB low-res) → 624-693 KB ultra-res commercial portraits with face/identity preserved.

## Common Vite pitfall — pattern URLs in JSX

CSS `url()` references in `src/index.css` are rewritten correctly by Vite's `--base` flag, but JSX string literals like `<img src="/patterns/foo.jpg" />` are NOT. Use:

```tsx
<img src={`${import.meta.env.BASE_URL}patterns/foo.jpg`} />
```

Or import the asset directly:

```tsx
import topo from '@/assets/patterns/sonoran-topo.jpg';
<div style={{ backgroundImage: `url(${topo})` }} />
```

CSS-only application is preferred — keeps the pattern system declarative and avoids the BASE_URL ceremony.

## Why this doc exists

The user's feedback during the Premier Pest run: *"What about custom background patterns and treatments? They have custom spiders, custom backgrounds. Those are all really good things from the inspo sites."*

Without this doctrine, demos look like Vite + clone template + brand swap = template skin.
With it, demos look like agency-grade builds — diagonal slashes on dark bands, hex grids ghosting behind process sections, saguaro silhouettes peppering FAQ, paper grain on service cards, ghost numerals oversized behind step-by-step blocks. Each section has a unique surface character that ties to the brand and region.

This is the pillar #2 ("Detail") of Matthew's 3-pillar Cohesive · Detail · Dynamic framework, fully operationalized.

## History

- 2026-04-24 — pattern system codified after Premier Pest live demo. 10 pattern types generated, 7 CSS utility classes shipped, section-to-pattern mapping established.
