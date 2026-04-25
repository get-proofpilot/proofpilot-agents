# Pattern System V2 — Custom Backgrounds + Treatments

> The visual layer that separates a template-skin demo from a hand-designed agency build. Every demo gets a pattern library generated via **Nano Banana Pro** and applied section-by-section per the rules below.
>
> **V2 expansion (2026-04-25):** 11 new agency-grade treatments added after studying ref images from Volt Vikings (electrician), Valkyrie Fleet Wraps (vehicle wrap), Owl Roofing, and V.C. Veterans Contracting (drone roof inspection). Total catalog: **21 patterns + 14 utility classes.**

The four pillars from the inspiration guide (Cohesive · Detail · Dynamic) all show up here. Pillar #2 ("Detail — patterns, textures, background elements") is the entire job of this doc.

## Generation doctrine — Nano Banana first

**Default to Nano Banana Pro for any custom background or treatment.** Pure CSS / SVG only as fallback when image render is genuinely worse.

**Why:** Hand-rendered patterns have texture, imperfection, and visual character that geometric CSS shapes don't. Matthew is targeting agency-grade aesthetic (Hook Agency, 180 Sites, Be The Anomaly tier) — those sites use rendered illustration and hand-drawn texture, not CSS wedges. Pure-CSS treatments read as "template skin"; rendered patterns read as "custom design."

When to reach for CSS instead: (a) shape needs infinite scaling/responsiveness, (b) it's a true geometric primitive (border, line, dot), or (c) the asset is purely structural rather than decorative.

## The 21-pattern V2 library

Generated via `scripts/generate-image.sh` per demo. Lives at `<demo>/public/patterns/`.

### V1 — base 10 (universal + brand-specific)

| Pattern | Purpose | Where to apply |
|---------|---------|----------------|
| `diagonal-slash.jpg` | Aggressive industrial overlay on dark sections | Dark hero / dark CTA bands |
| `scorpion-motif.jpg` *(brand)* | Committed brand mark watermark | Hero corner, footer |
| `desert-grit.jpg` | Warm sandstone overlay for cream surfaces | Light cards, light bands |
| `paper-grain.jpg` | Subtle fibrous overlay on white cards | Service cards, FAQ accordions |
| `cross-hatch.jpg` | Editorial newspaper-style overlay | Photographs, About-section imagery |
| `dot-matrix.jpg` | Subtle small-dot ghost background | Stat bands, trust-USP rows |
| `hex-grid.jpg` | Geometric ghost grid | Process sections, methodology |
| `saguaro-pattern.jpg` *(regional)* | Sonoran-themed silhouette pattern | FAQ section |
| `sonoran-topo.jpg` *(regional)* | Topographic contour lines | Service-area sections |
| `section-wedge.jpg` | Sharp angled section divider | Between dark→light flips |

### V2 — agency-grade additions (the 11 new treatments)

| Pattern | Inspiration | Purpose | Where to apply |
|---------|-------------|---------|----------------|
| `sonoran-frieze.jpg` | Volt Vikings ornate top band | Decorative themed strip | Top edge of hero / above-fold |
| `halftone-fade.jpg` | Volt Vikings right-side gradient | Soft hero overlay | Right edge of hero/intro |
| `accent-wedge-tl.jpg` | Volt Vikings purple corner triangle | Bold geometric accent | Top-left corner of cards/bands |
| `accent-wedge-br.jpg` | Volt Vikings purple corner triangle | Bold geometric accent | Bottom-right corner of cards/bands |
| `ghost-technicians.jpg` | Valkyrie warriors faded background | Ghosted lifestyle photo bg | About / story / process bg |
| `corner-slashes.jpg` | Valkyrie yellow CTA box slash marks | Premium callout decoration | Featured cards, callouts |
| `layered-divider.jpg` | Valkyrie navy multi-stop divider | Multi-stop diagonal cut | Between bold-color sections |
| `premier-guarantee-badge.jpg` *(brand)* | Owl Roofing circular medallion | Trust seal | Trust band, plans band, footer |
| `woodgrain-tonal.jpg` | Owl Roofing wood-grain bg | Soft organic ring texture | Tonal bands, story sections |
| `sprayer-wireframe.jpg` *(vertical)* | V.C. Veterans drone wireframe | Technical blueprint illustration | Story / about sections |
| `icon-strip-mono.jpg` | V.C. Veterans active-icon row | Mono icon panel for split cards | Stat cards, service-pill rows |

**Brand-specific patterns** are regenerated per client (`<motif>-motif.jpg`, `<client>-guarantee-badge.jpg`).
**Regional patterns** vary by region (saguaro for AZ, palmetto for FL, pine for PNW, etc.).
**Vertical patterns** vary by trade (sprayer for pest, multimeter for electrical, pipe-wrench for plumbing, drone for roofing, sheers for landscape).

## CSS pattern utility classes

All wired up in `src/index.css` under `@layer components`.

### V1 base utilities

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

### V2 agency-grade utilities

```css
/* 1. Frieze top — ornate decorative band */
.frieze-top                    /* applies ::before strip at top */

/* 2. Halftone fade — gradient density overlay */
.bg-halftone-fade              /* applies ::after with screen blend */

/* 3. Accent wedges — corner geometric accents */
.accent-wedge-tl
.accent-wedge-br

/* 4. Ghost photo background — faded lifestyle photo */
.ghost-photo-bg

/* 5. Corner slashes — premium callout decoration */
.corner-slashes                /* applies ::before with multiply */

/* 6. Stat card with icon panel — split layout */
.stat-card-iconpanel
.stat-card-iconpanel__text
.stat-card-iconpanel__icon

/* 7. Layered section divider */
.section-divider-layered

/* 8. Guarantee badge — circular trust seal */
.guarantee-badge

/* 9. Wood-grain tonal background */
.bg-woodgrain-tonal

/* 10. Wireframe illustration — blueprint line-art */
.wireframe-illustration

/* 11. Device mockup — tablet bezel */
.device-mockup-tablet

/* 12. Floating callout — overlapping card */
.floating-callout

/* 13. Active-state icon pill row */
.icon-pill-row
.icon-pill
.icon-pill--active
```

Each class uses `mix-blend-mode` (multiply for light surfaces, screen/overlay for dark) at 6-25% opacity so patterns are felt, not seen.

## Section-to-pattern mapping V2 (the recipe)

For a typical home-service demo following the Blueprint 14-section wireframe:

| Blueprint section | V1 treatment (base) | V2 treatment (agency-grade) |
|-------------------|---------------------|------------------------------|
| 1. Navigation | None | None — keep clean |
| 2. Hero | `diagonal-slash` overlay + motif watermark | + `frieze-top` ornate band |
| 3. Before/After | `paper-grain-overlay` cards | + `corner-slashes` on featured cards |
| 4. Reviews | `desert-grit-overlay` cards | optional `corner-slashes` |
| 5. Trust + Numbers | `bg-pattern-dot-matrix` | + `guarantee-badge` floated next to headline |
| 6. Why You | None | + `bg-halftone-fade` for character |
| 7. How It Works | `bg-pattern-hex` + ghost numerals | + `wireframe-illustration` for vertical motif |
| 8. Services | `paper-grain-overlay` cards | + `icon-strip-mono` panel for stat-style cards |
| 9. About + Team | `cross-hatch-overlay` photo | + `ghost-photo-bg` + `wireframe-illustration` |
| 10. FAQs | `bg-pattern-saguaro` regional | + `bg-woodgrain-tonal` for organic depth |
| 11. Offers | None | + `corner-slashes` on offer cards |
| 12. Service Areas | `bg-pattern-topo` | + `device-mockup-tablet` for map showcase |
| 13. Video/Social | None | + `floating-callout` for play-button overlay |
| 14. Footer | Motif watermark | + `guarantee-badge` mini in footer |
| Section transitions | `.section-wedge-top` | upgrade to `.section-divider-layered` for high-impact flips |

**Rule of restraint:** no more than 6-7 sections with V2 treatments combined. The rest stay clean. Pattern overuse → "designed by committee" feel.

## Generation procedure (per demo)

After `init-from-clone.sh` + `scrub-template.sh`:

```bash
DEMO=/tmp/<client>-demo
mkdir -p "$DEMO/public/patterns"

# === BRAND-SPECIFIC (regenerate per client) ===
./scripts/generate-image.sh \
  --prompt "Single editorial silhouette of a <motif>, deep <brand-color> on transparent, brand-mark quality, 1024x1024 centered" \
  --out "$DEMO/public/patterns/<motif>-motif.jpg" --aspect 1:1

./scripts/generate-image.sh \
  --prompt "Circular trust seal medallion for <Client Name>, outer ring text '<TAGLINE>' top and '<CITY>, <STATE>' bottom, inner shield with <motif> icon, laurel wreath flanks, two-tone <brand-color> and dark, agency-grade hand-drawn medallion, soft drop shadow, 1024x1024" \
  --out "$DEMO/public/patterns/<client>-guarantee-badge.jpg" --aspect 1:1

# === REGIONAL (per region/state) ===
./scripts/generate-image.sh \
  --prompt "Repeating <regional> pattern, monochrome with subtle <accent> tint, low opacity, 1024x1024 seamless tileable" \
  --out "$DEMO/public/patterns/<region>-pattern.jpg" --aspect 1:1

# === VERTICAL (per trade) ===
./scripts/generate-image.sh \
  --prompt "Technical wireframe blueprint of <trade-tool>, schematic isometric view, thin precise black lines on transparent, engineering blueprint style, 1024x1024" \
  --out "$DEMO/public/patterns/<tool>-wireframe.jpg" --aspect 1:1

# === V2 UNIVERSAL (cache + reuse across demos) ===
for slug in sonoran-frieze halftone-fade accent-wedge-tl accent-wedge-br ghost-technicians corner-slashes layered-divider woodgrain-tonal icon-strip-mono; do
  if [ ! -f "$DEMO/public/patterns/$slug.jpg" ]; then
    ./scripts/generate-image.sh --prompt "..." --out "$DEMO/public/patterns/$slug.jpg" --aspect <ar>
  fi
done

# === V1 BASE (cache + reuse) ===
for slug in diagonal-slash hex-grid dot-matrix cross-hatch paper-grain desert-grit; do
  if [ ! -f "$DEMO/public/patterns/$slug.jpg" ]; then
    ./scripts/generate-image.sh --prompt "..." --out "$DEMO/public/patterns/$slug.jpg" --aspect 1:1
  fi
done
```

For maximum efficiency, add a future `scripts/generate-pattern-set-v2.sh <demo> --motif <slug> --vertical <slug> --region <slug>` helper that runs all 21 generations in parallel.

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

## Reference inventory — agency-grade examples studied

The V2 expansion was modeled on these specific reference images (all home-service / blue-collar verticals):

- **Volt Vikings** (electrician, AZ) — ornate Nordic frieze top strip, halftone gradient right side, purple wedge accents at corners. Treatment density: high.
- **Valkyrie Fleet Wraps** (vehicle wrap, NOLA) — ghosted warrior photo backgrounds, yellow callout boxes with corner racing-slashes, layered angular navy section dividers, dark-panel mono icons in stat cards.
- **Owl Roofing** — circular guarantee medallion (gold + dark green), wood-grain tonal section background.
- **V.C. Veterans Contracting** (roofing) — drone wireframe blueprint behind iPad mockup, floating "Inspection Report" callout card overlapping device, active-state circular icon pill row.

Each ref demonstrates a treatment that takes a section from "template" to "custom-built." V2 codifies all of these as reusable patterns generated via Nano Banana Pro.

## Why this doc exists

The user's feedback during the Premier Pest run: *"What about custom background patterns and treatments? They have custom spiders, custom backgrounds. Those are all really good things from the inspo sites."*

Then expanded with: *"Let's expand our custom backgrounds or treatments that we can add to things to make it look way more custom. These are examples from different sites, different sections, different backgrounds, different accents, different icons, treatments like whatever, anything along those lines. Learn from this in order to be able to produce at this level with nano banana."*

Without this doctrine, demos look like Vite + clone template + brand swap = template skin.
With it, demos look like agency-grade builds — diagonal slashes on dark bands, hex grids ghosting behind process sections, saguaro silhouettes peppering FAQ, paper grain on service cards, ghost numerals oversized behind step-by-step blocks. **Plus V2:** ornate friezes, halftone fades, ghosted lifestyle photo backgrounds, circular guarantee medallions, wood-grain tonal bands, wireframe blueprint illustrations, multi-stop layered section dividers.

This is the pillar #2 ("Detail") of Matthew's 3-pillar Cohesive · Detail · Dynamic framework, fully operationalized at agency tier.

## Generation gotchas (lessons learned)

### The "transparent background" → checkered JPG trap

When you ask Nano Banana Pro for a pattern with `transparent background`, the JPG output bakes in the standard checkerboard transparency placeholder. JPG doesn't support transparency, so the model renders the placeholder pattern visually.

**Fix in the prompt:** explicitly say *"the entire square frame is solid white background, no checkered pattern, no transparency artifacts"* — Nano Banana will then render a clean white field around the asset.

**Fix in CSS:** for assets where the subject is centered (badges, watermarks), apply `clip-path: circle(45% at center)` plus oversized `background-size: 110-115%` so the clip cuts away the checker ring while the subject fills the visible circle.

**When CSS-only beats Nano Banana:** treatments like `corner-slashes` that should be small thin marks at corners — Nano Banana tends to interpret "stripe" or "slash" as a big bold brushstroke and overpowers the host element. Pure CSS `linear-gradient` corner pseudo-elements give better control.

### When to fall back to CSS / SVG

- Pattern is a true geometric primitive (line, dot, single shape)
- Pattern needs to scale infinitely with the viewport
- Pattern needs to be precisely 4-corner-anchored or layout-aware
- Pattern's brand color must shift dynamically (use `currentColor` or CSS vars)

For everything else, Nano Banana Pro produces the agency-grade hand-rendered character that pure CSS cannot.

## History

- **2026-04-24** — V1 pattern system codified after Premier Pest live demo. 10 pattern types generated, 7 CSS utility classes shipped, section-to-pattern mapping established.
- **2026-04-25** — V2 expansion shipped. 11 new patterns generated from Volt Vikings / Valkyrie Wraps / Owl Roofing / V.C. Veterans references, 14 new CSS utility classes added (now 21 patterns + 14 utilities total). Nano-Banana-first generation rule codified. Reference inventory documented.
- **2026-04-25 (post-deploy fixes)** — Documented the JPG-transparency-checker trap. Premier Guarantee badge moved to `clip-path: circle(45%) + background-size: 115%` to mask the checker ring. Corner-slashes treatment moved from Nano Banana JPG to pure-CSS `linear-gradient` corner pseudo-elements (matches Valkyrie ref better — small thin marks instead of huge brushstrokes). Sprayer wireframe + layered-divider regenerated with explicit "solid white background" prompts to eliminate transparency artifacts.
