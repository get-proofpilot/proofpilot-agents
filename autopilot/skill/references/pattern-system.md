# Pattern System — Brand-Native Backgrounds + Treatments

> The visual layer that separates a template-skin demo from a hand-designed agency build. Every demo gets a custom pattern set generated **by Nano Banana Pro**, designed **from the client's specific brand DNA** — not borrowed from a reusable library.

## Two non-negotiable rules

### Rule #1 — Every treatment is Nano Banana-generated

No exceptions. Backgrounds, frieze borders, decorative bands, accent shapes, watermarks, badges, stamps, textures, section dividers — all rendered via `scripts/generate-image.sh`. Pure CSS / SVG only as fallback when the rendered output is genuinely worse (e.g., simple primitives like a 1px line). Even small marks like corner stripes are Nano Banana-rendered, not `linear-gradient` shortcuts.

**Why:** CSS-only patterns read as "template skin." Generic Nano Banana renders pulled from a reusable catalog read as "borrowed aesthetic." Only Nano Banana renders prompted from the client's specific brand DNA produce the agency-grade custom feel.

### Rule #2 — Every treatment is brand-derivative, not pattern-borrowed

Pattern doctrine is BRAND-DERIVATIVE, not BRAND-ADDITIVE. Pull treatments **from** the brand brain — don't bolt them **on** from a reference catalog.

**Reference images from agency-grade sites (Volt Vikings, Valkyrie Wraps, Owl Roofing, V.C. Veterans, Hook Agency, 180 Sites, Be The Anomaly) show what's POSSIBLE, not what to apply.** When studying refs, ask: *"What is the principle this treatment achieves — warmth, depth, trust, technicality?"* Then design a client-specific equivalent in the client's color, voice, region, and trade.

**The "remove the logo" test:** if the treatments could be lifted onto a different brand and still look the same → they're template skin. Regenerate them brand-first.

## Brand-first generation procedure

For every demo:

### Step 1 — Read the brand brain
Pull the client's:
- **Color palette** (primary hex, secondary hex, ink/dark color)
- **Voice** (rugged-industrial / luxe / playful / heritage / editorial)
- **Region** (Sonoran desert / Pacific Northwest / Southeast humid / Northeast craftsman / etc.)
- **Trade culture** (electrical = blueprints + technical, plumbing = mechanical + fittings, pest = field-work + outdoor + UV-blacklight, roofing = craftsman + drone, landscape = botanical + tools)
- **Brand-native motifs** (scorpion for desert pest, multimeter for electrical, pipe wrench for plumbing, drone for roofing, sheers for landscape)
- **Differentiators** (signature service like Premier's "Black Light Scorpion Service")

### Step 2 — Pick 2-3 treatments that REINFORCE the brand
**Restraint rule: max 3 sections per demo with custom treatments.** Pattern overload reads as "designed by committee."

For each treatment, ask: *Does this make sense ONLY for THIS brand?* If yes, generate it. If no, you're cargo-culting from a reference site.

### Step 3 — Write brand-specific Nano Banana prompts
Generic prompts → template-y output. Brand-specific prompts → custom output.

**Bad (generic, template-y):**
> "Ornate frieze border with decorative motif, repeating pattern, edge-to-edge tileable strip 1920x80"

**Good (Premier-native, brand-derivative):**
> "Hand-rendered repeating scorpion-tail silhouette pattern, deep concrete green #21B249 stylized scorpion tails curling alternately, weathered industrial brushwork, set against dark slate #0B0F12 background, masculine Tucson veteran aesthetic, edge-to-edge tileable horizontal strip, NO Victorian ornamentation, NO laurel wreath, NO flowery scrollwork, just the scorpion tail repeating motif, 1920x80"

The brand-specific version names: exact hex colors, brand subjects (scorpion-tail), regional/cultural cues (Tucson + masculine + veteran), trade aesthetic (industrial + weathered), and explicit negatives (no Victorian, no laurel, no scrollwork) to keep the output away from generic-trust-seal land.

### Step 4 — Apply with restraint, then verify visually
Wire each treatment into ONE section only. Build, deploy, and screenshot the live render before declaring done. Visual verification is non-negotiable — Nano Banana sometimes interprets prompts unexpectedly (oversized strokes, transparency-checker artifacts, etc.).

## Generation gotchas (lessons learned)

### "Transparent background" → checkered JPG trap

Asking Nano Banana for a `transparent background` produces a JPG with the checkerboard transparency placeholder baked in. JPG can't encode transparency.

**Prompt fix:** specify *"the entire square frame is solid [section-bg-color] background, no checkered pattern, no transparency artifacts."* Match the bg color to the section where the asset will live (white for light sections, dark slate for dark sections).

**CSS fix for centered subjects (badges, watermarks):** `clip-path: circle(45% at center)` plus oversized `background-size: 110-115%` masks the checker ring while the subject fills the visible circle. Better: regenerate with explicit solid bg matching the destination.

### "Stripe / slash / mark" → oversized brushstroke trap

Nano Banana interprets *"slash"* or *"stripe"* as a big bold brushstroke and overpowers the host element. For small precise corner marks, generate with explicit constraints: *"four small thin diagonal marks anchored ONLY at the four corners, the rest of the frame is plain white"* — and verify the output is actually small.

### Multiply blend on dark backgrounds → invisible asset

Generated assets with `mix-blend-mode: multiply` disappear on dark sections (multiply darkens; dark + dark = darker). For dark sections, either:
- Use `mix-blend-mode: screen` (lighter parts show)
- Generate the asset with a SOLID DARK background that matches the section, no blend mode needed

The second approach is cleaner — the asset blends seamlessly because its background IS the section color.

## Brand-derivative treatment patterns by trade

For inspiration only — never copy verbatim. Always re-derive from the specific client's brand brain.

### Pest control / desert region (e.g., Premier Pest, Tucson AZ)
- **Scorpion-tail flourish band** — repeating scorpion-tail silhouette in brand-color on dark, used as section divider
- **UV-blacklight scorpion-glow background** — Sonoran night-scene with UV-reactive glowing scorpions (visualizes the brand's signature service)
- **Industrial spray-stencil stamp** — weathered "BRAND" + "GUARANTEE" + "CITY ST" stenciled on galvanized steel, footer brand mark

### Electrical (e.g., Saiyan, Albert's Power Route)
- **Schematic-style background lines** — printed-circuit-board traces or wiring diagram in brand-color, low-opacity
- **Multimeter / breaker silhouette band** — repeating tool silhouettes
- **Voltage-arc accent flourish** — concept of an electrical arc rendered as a hand-drawn flourish

### Plumbing (e.g., Bears Plumbing, Power Route plumbing)
- **Pipe-wrench section divider** — repeating wrench silhouettes
- **Brass-fitting watermark** — single oversized fitting silhouette as quiet brand mark
- **Water-line schematic background** — pipework diagram in dark

### Roofing
- **Shingle-pattern texture** — overhead shingle rows as quiet section overlay
- **Drone-line wireframe** — schematic drone or crane in blueprint style
- **Galvanized-steel weathered band** — reflects the trade material itself

### Landscape
- **Botanical silhouette frieze** — plants native to the region
- **Tool-silhouette band** — sheers, rake, mower repeating
- **Topographic terrain texture** — for service-area sections

These are STARTING POINTS for prompt engineering, not finished treatments. Always regenerate per-client with that client's specific colors, motifs, voice, region, and brand-specific differentiators.

## Common Vite pitfall — pattern URLs in JSX

CSS `url()` references in `src/index.css` are rewritten correctly by Vite's `--base` flag, but JSX string literals like `<img src="/patterns/foo.jpg" />` are NOT. Use:

```tsx
<img src={`${import.meta.env.BASE_URL}patterns/foo.jpg`} />
```

CSS-only application is preferred — keeps the pattern system declarative and avoids the BASE_URL ceremony.

## Reference inventory — agency-grade examples studied

For inspiration ONLY (Rule #2). Do not copy these treatments — design new ones from the client's brand DNA.

- **Volt Vikings** (electrician, AZ) — ornate frieze top strip, halftone gradient, purple wedge accents. Their treatments work for their purple-Nordic brand. Don't apply to a green Tucson industrial brand.
- **Valkyrie Fleet Wraps** (vehicle wrap, NOLA) — ghosted lifestyle photo bg, yellow callout boxes with corner racing-slashes, layered angular dividers. Don't apply to a different brand.
- **Owl Roofing** — circular guarantee medallion (gold + dark green), wood-grain tonal bg. Don't apply to a desert pest brand.
- **V.C. Veterans Contracting** (roofing) — drone wireframe blueprint behind iPad mockup, floating callout, active-state pill row.

Each ref demonstrates a *principle* (decoration, depth, trust, technicality, interactivity). The principle is portable; the execution is not.

## Why this doc exists

Matthew's feedback during the V2-cargo-cult attempt (2026-04-25):
> *"You tried to copy it too much. You made it look really trashy. None of this looks like it flows or fits their brand. Doesn't look custom. Even the medallion just looks off and weird. This stuff doesn't look good."*
>
> *"Looks like you're just pulling random assets that aren't custom, generated by NanoBanana image generation."*

The fix: **brand-first, Nano Banana-generated, restraint applied, verified visually.** No reusable pattern catalog to pick from. Every demo's pattern set is custom-generated for that client.

## History

- **2026-04-24** — V1 pattern system codified after Premier Pest live demo. 10 patterns + 7 utility classes shipped. Section-to-pattern mapping established.
- **2026-04-25 (V2 cargo-cult attempt + revert)** — Tried to expand to 21 patterns + 14 utilities by copying treatments from agency reference sites. Result was visually trashy, off-brand, and template-feeling. Matthew called it. Reverted all V2 treatments.
- **2026-04-25 (brand-first reset)** — Rewrote doctrine: brand-derivative, Nano Banana-only, restraint-applied. Premier Pest re-shipped with 3 brand-native treatments designed from Premier's brand DNA: (1) scorpion-tail flourish band, (2) UV-blacklight scorpion-glow background on PestEmergencyBand, (3) industrial Premier-30-Day-Guarantee stencil stamp in footer brand strip. All 3 generated via Nano Banana from Premier-specific prompts. None borrowed from reference sites.
