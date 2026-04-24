# Website Brain — Scaffold Setup Discipline

> Rules that apply to every Website Brain run, before you start executing the design-spec Implementation Order. These are load-bearing — skipping them causes preventable failures.

---

## Scaffold pre-flight (run BEFORE any design work)

### 1. Check for shadcn/ui primitives first

Before copying primitives from another demo, verify what's already in the cloned template:

```bash
ls src/components/ui/ 2>/dev/null
```

- If present → use as-is (most templates ship a full shadcn/ui suite).
- If absent → copy from a known-good demo (`/tmp/redrock-demo-final/src/components/ui/` has stubs for button/input/textarea/card/label/accordion/sheet).

Previous doctrine said "always copy from redrock-demo-final" — that's wrong. Check first.

### 2. Prune unused page routes BEFORE first build

Source templates ship with multiple page routes scaffolded (service-area pages, detail views, etc). They:
- Bloat the bundle by 2-3× before any customization.
- Import assets that may not exist (causing build failures).
- Leave orphaned components in `src/components/`.

**Fix path:**
1. Read `src/App.tsx` to see registered routes.
2. Identify which routes are needed for a homepage demo — usually just `/`.
3. Delete unused route components + their import statements in App.tsx.
4. Delete the orphaned section components they depended on (DumpTrailer, InstagramFeed, WestValleyServiceArea, etc).
5. Run `npm run build` and confirm zero errors.

This is **Step 2.5** between clone+install and design-spec execution. Don't skip.

### 3. Stub missing asset imports

Templates reference assets like `@/assets/water-damage.jpg` that don't exist post-clone. Two options:

- **Preferred:** stub with the closest authentic client photo from `/tmp/<client>/assets/authentic/`. This keeps the path valid AND pre-populates design content.
- **Fallback:** stub with `hero-redrock.webp` (or any authentic-looking client asset) so the build passes — then replace properly during Implementation Order.

```bash
# One-liner to auto-stub every missing asset import
grep -rohE "assets/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|svg)" src 2>/dev/null | sort -u | while read p; do
  full="src/$p"
  [ ! -f "$full" ] && cp src/assets/hero-<client>.webp "$full" 2>/dev/null
done
```

### 4. Auto-inject the scroll-reveal fallback CSS

This is **mandatory** on every Website Brain build. Without it, Playwright `fullPage:true` screenshots capture reveal-delayed sections blank — which breaks the QA stage.

Add to `src/index.css`:

```css
/* Scroll-reveal with safety fallback — required for Playwright fullPage QA */
.reveal {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  animation: reveal-fallback 0.5s ease-out 1.5s forwards;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
  animation: none;
}
@keyframes reveal-fallback {
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; animation: none; }
}
@media print {
  .reveal { opacity: 1 !important; transform: none !important; animation: none !important; }
}
```

The 1.5s `animation-delay` fallback means even if the IntersectionObserver never fires (screenshot tool, slow JS, disabled scripts), content still becomes visible. QA-loop reliable.

### 5. Default size for standalone motif SVGs

Any motif SVG component (`<Scorpion/>`, `<SpireGlyph/>`, `<LightningBolt/>`, etc) that's used OUTSIDE a button wrapper must have a default size, or it inflates to 415×415px (bug observed on Red Rock Claude v1).

Add to `src/index.css`:

```css
/* Default size for standalone motif glyphs */
svg.motif-glyph {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  fill: currentColor;
  display: inline-block;
  vertical-align: middle;
}
/* Button wrappers override with their own sizing */
.btn-primary svg.motif-glyph { width: 18px; height: 18px; fill: currentColor; }
.btn-primary-large svg.motif-glyph { width: 20px; height: 20px; }
```

All new motif components get `className="motif-glyph"` by default. Their displayed size comes from the wrapping context (button, eyebrow, watermark).

### 6. Generate favicon if the brand brain flagged it missing

If `brand-brain.json.favicon.url === null`, auto-emit:

- `public/favicon.svg` — the motif SVG, sized to 32×32 viewBox
- `public/favicon-32.png` — rasterized, for legacy
- `public/apple-touch-icon.png` — 180×180

Don't skip this. Missing favicons are a top "template default" tell.

### 7. Add meta tags for OG + twitter

If brand brain flagged the OG image as generic (not logo-forward), generate a new one:

- `public/og-image.png` — 1200×630, motif + wordmark + brand amber + single-line tagline
- Add `<meta property="og:image" content="/og-image.png">` + twitter:card tags to `index.html`

---

## Scaffold post-flight (before declaring build done)

### 8. Delete orphaned components

After pruning routes (step 2), check `src/components/` for components that are no longer imported:

```bash
cd /tmp/<client>-demo
for f in src/components/*.tsx; do
  name=$(basename "$f" .tsx)
  # grep for imports — tree-shaken but still noisy
  if ! grep -rq "from.*$name" src/pages src/App.tsx src/main.tsx 2>/dev/null; then
    echo "orphan: $f"
  fi
done
```

Delete (or archive to `.archive/` subdirectory if unsure). Tree-shaking handles bundle size but orphaned source is confusing during iteration.

### 9. Legacy-alias the palette

When you swap the palette tokens, untouched template components still reference the OLD tokens (e.g. `brand.red` in rockin-rugged). Don't break them:

- Keep the old token namespace in `tailwind.config.ts` but point its hex values at the NEW palette.
- Old components keep rendering with the new colors automatically.
- New components you author MUST use the new tokens directly (no aliases).

Example:

```ts
// tailwind.config.ts — rockin-rugged-industrial → Richardson amber swap
colors: {
  // NEW Richardson tokens (authored components use these)
  "brand-black": "#000000",
  "brand-charcoal": "#303030",
  "brand-amber": "#F0C000",
  "brand-amber-dark": "#D0A000",
  "neutral-offwhite": "#F0F0F0",
  // LEGACY rockin-rugged aliases (untouched components inherit new palette automatically)
  brand: {
    red: "#F0C000",      // was #E63946 — now points at amber
    darkRed: "#D0A000",  // was #C1121F — now points at amber-dark
    black: "#000000",
    gray: "#303030",
    lightGray: "#F0F0F0",
  },
}
```

### 10. Run `npm run build`, then `npm run dev -- --port <PORT>`

- Build MUST pass with zero TS errors.
- Dev server port assignment: check the active demos first (`lsof -i :5173-5180`) and pick an unused port.
- Port convention: 5173 = dev default / first demo, 5177 = Red Rock Gemini, 5178 = Richardson. Increment for new demos.

---

## Summary — the Website Brain scaffold checklist

- [ ] 1. Check for `src/components/ui/` — copy stubs only if absent
- [ ] 2. Prune unused page routes from `App.tsx` + their component imports
- [ ] 3. Stub missing asset imports with closest authentic client photo
- [ ] 4. Inject `.reveal` fallback CSS
- [ ] 5. Inject `svg.motif-glyph` default size CSS
- [ ] 6. Generate favicon if brand-brain flagged missing
- [ ] 7. Generate OG card if brand-brain flagged generic
- [ ] 8. Delete orphaned components post-prune
- [ ] 9. Legacy-alias palette tokens in `tailwind.config.ts`
- [ ] 10. `npm run build` passes → `npm run dev --port <unused>`

Then proceed to design-spec Implementation Order priorities 1 → N.
