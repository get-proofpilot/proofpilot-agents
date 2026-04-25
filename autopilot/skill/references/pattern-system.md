# Pattern System — REMOVED FROM PROCESS

> **Status (2026-04-25):** Decorative pattern generation is **OUT** of the WebsitePilot process. Do not generate custom backgrounds, friezes, watermarks, badges, stencils, accent shapes, or section dividers via Nano Banana for demos.

## What this means in practice

- **Skip pattern generation entirely.** No `scripts/generate-pattern-set.sh`, no `generate-image.sh` calls for backgrounds or decorative treatments.
- **Demos finish without `/patterns/*.jpg` assets.** No `bg-pattern-*` classes, no `*-overlay` classes, no `scorpion-watermark`, no guarantee badges, no frieze bands, no UV-blacklight backdrops, no stencil stamps.
- **Visual character comes from:** typography hierarchy, brand color, asymmetric layouts, real client photography, brand-color blocking, and inline-SVG line accents (e.g., `rugged-ribbon`'s diagonal-slash data URI, `bg-diagonal-slash` tailwind utility). Pure CSS only.
- **What's still in scope for `generate-image.sh`:** hero photos, owner portraits, OG cards, authentic-asset upscales (image-to-image), service icons. **Not** decorative patterns.

## Why this rule exists

Three iterations failed the quality bar in one day (2026-04-25):

1. **V2 cargo-cult** — Generated 11 patterns from agency reference sites (Volt Vikings frieze, Owl Roofing medallion, Valkyrie corner-slashes, V.C. Veterans wireframe). Looked trashy and template-feeling because the treatments belonged to other brands' aesthetics applied to Premier Pest. Matthew: *"You tried to copy it too much. None of this looks like it flows or fits their brand. Doesn't look custom."*

2. **V3 brand-first** — Generated 3 Premier-native treatments designed from Premier's brand DNA (scorpion-tail flourish band, UV-blacklight scorpion bg, industrial guarantee stencil stamp). Even brand-derivative prompts produced output that didn't meet the quality bar. Matthew: *"These aren't great. Let's remove this from the process for now."*

3. **V1 base patterns** (paper-grain, dot-matrix, hex-grid, sonoran-topo, saguaro, scorpion-motif, etc.) — Quietly carried in demos. Stripped as part of the same cleanup.

## When this rule may be revisited

Possible re-evaluation triggers:
- Nano Banana Pro output quality improves to the point where decorative renders read as agency-native rather than placeholder/template
- Matthew brings the topic back in a new context with a different approach in mind
- A specific client engagement explicitly requires custom textures and Matthew authorizes the generation

**Until any of those happen: no decorative pattern generation in the WebsitePilot process.** Don't try to revive this doctrine on your own initiative.

## What replaced this layer

In the absence of decorative patterns, lean harder on:

- **Typography** — Oswald display 900, generous size hierarchy, uppercase for section headlines, restraint elsewhere
- **Brand color blocks** — flat concrete-green ribbons, dark slate sections, white card surfaces. The `rugged-ribbon` and `rugged-ink-texture` classes that used inline SVG can stay; pattern-JPG variants are stripped.
- **Inline SVG accents** — small line-art flourishes baked into the CSS as data URIs (no external assets, no Nano Banana)
- **Real photography** — generated hero photos, real client photography, owner portraits, authentic-asset upscales
- **Layout structure** — asymmetric composition, blueprint 14-section rhythm, full-bleed photography, framed crew/work photos

Pillar #2 of the Cohesive · Detail · Dynamic framework ("Detail — patterns, textures, background elements") is **on hold.** Pillars #1 (Cohesive) and #3 (Dynamic) carry the visual weight for now.

## History

- **2026-04-24** — V1 pattern system codified after Premier Pest live demo. 10 patterns + 7 utility classes shipped.
- **2026-04-25 (V2)** — Cargo-cult expansion to 21 patterns from reference sites. Failed quality bar. Reverted.
- **2026-04-25 (V3)** — Brand-first reset with 3 Premier-native treatments. Failed quality bar. Reverted.
- **2026-04-25 (REMOVAL)** — Pattern generation removed from the WebsitePilot process. All `/patterns/*.jpg` assets and pattern CSS classes stripped from Premier Pest demo. This doctrine collapsed to a single note: don't generate decorative patterns.
