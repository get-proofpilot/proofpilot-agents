# Website Brain — Scaffold Setup Discipline

> Rules that apply to every Website Brain run, before you start executing the design-spec Implementation Order. These are load-bearing — skipping them causes preventable failures.

## Canonical bootstrap (v2 clone-first flow)

As of 2026-04-24, all 7 presets have pixel-perfect reference clones + full section pattern libraries. Bootstrap is **one command**:

```bash
./scripts/init-from-clone.sh \
  --client <slug> \
  --preset <preset-name> \
  --logo /tmp/<client>/assets/logo-original.png \
  --client-name "Client Display Name" \
  --tagline "One-line OG tagline" \
  --brand-color "#hex"
```

This chains:
1. Clone `websitepilot/templates/sources/ref-<preset>/` → `/tmp/<client>-demo/`
2. Run `scrub-template.sh` → strips Lovable, lands real logo, favicon + OG auto-generated
3. `npm install` + smoke build
4. Reports ready for brand-swap pass

**Valid presets** (each has a ref-* clone + patterns/<preset>/ library):

| Preset | Clone DNA source | Typography | Palette |
|--------|------------------|------------|---------|
| `archetype-mascot` | voltvikings.com | Saira 300-900 single-family | orange/purple + cream |
| `contractor-heritage` | bearsplumbing.net | Roboto Condensed 400-800 | red + ink + pink |
| `dfw-luxe-aerial` | anomalypoolservices.io | Bebas Neue 400 title-case + Work Sans | pool-blue + navy |
| `rugged-industrial` | taggconcretecoatings.com | Montserrat 900 UPPERCASE + Roboto | ink + concrete-blue |
| `playful-chunky-consumer` | gosantabanana.com | Fira Sans 500-900 UPPERCASE | navy + candy-yellow + red |
| `editorial-serif` | Kingswood Landscape | Fraunces italic H1 + roman eyebrow | cream + ink + green |
| `premium-design-build` | cincomosqueteros.co | Manrope + Fraunces italic accent | black + cream + muted gold |

After `init-from-clone.sh`, the Website Brain's job shrinks from "build the site" to **"brand-swap the clone."** Specifically:
- Replace hero + section copy with Brand-Brain-derived content
- Swap placeholder photos for authentic client photography
- Adjust palette tokens if the brand demands variation within the preset (often not needed)
- Compose additional patterns from `websitepilot/patterns/<preset>/*` or `websitepilot/patterns/vertical/*` for vertical-specific signature moves

## Pattern composition

Two pattern directories ship prop-driven brand-agnostic React components:

- **`websitepilot/patterns/<preset>/*`** — 5-8 patterns per preset, matching each clone's DNA
- **`websitepilot/patterns/vertical/*`** — 18 vertical-specific patterns from Matthew's 30+ inspo-guide sites (concrete before/after dragger, roofing financing CTA, HVAC service-area map, pressure-washing reel gallery, commercial logo marquee, 24/7 emergency band, etc)

When to compose a vertical pattern: when the client's vertical has a signature move the preset-default clone doesn't cover.

Every pattern has a WHEN-TO-USE / WHEN-NOT-TO-USE docstring + source URL citation.

## Legacy scaffolds (pre-clone era)

Still useful when no ref-* preset matches cleanly:
- `austinrockinshauling/` — true hauling/demolition (adjacent to rugged-industrial)
- `state48glass/`, `keystonerestoration/`, `proactive-pool-solutions/`, `doggy-detail/` — legacy archetypes

Manual fallback flow: `cp -R` the legacy scaffold, then `scrub-template.sh`, then build from scratch per the design-spec.

---

## Mandatory first step — `scrub-template.sh`

**Before any design work:**

```bash
./scripts/scrub-template.sh /tmp/<client>-demo \
  --logo /tmp/<client>/assets/logo-original.png \
  --client-name "Client Display Name" \
  --tagline "One-line tagline for the OG card" \
  --brand-color "#<hex>"
```

What it does:
1. **Removes `lovable-tagger`** from `package.json` + scrubs `componentTagger` from `vite.config` (no Lovable attribution in prod bundle)
2. **Deletes template-default public/ assets** (Lovable `favicon.ico`, `placeholder.svg`, default `robots.txt` < 200 bytes)
3. **Copies the real client logo** to `src/assets/logo.png` — the canonical import path
4. **Generates `public/favicon.png`** (32×32) + **`public/apple-touch-icon.png`** (180×180) from the logo
5. **Generates `public/og-image.png`** (1200×630) — logo + tagline on brand-color background
6. **Patches `index.html`** meta tags so favicon / og:image / twitter:image point at the new assets

**Then update Header + Footer** to import + render the real logo (the scrub script can't do this — it's per-template-specific):

```tsx
import logoSrc from '@/assets/logo.png';

// Header + Footer:
<a href="/" aria-label="<Client> — home">
  <img src={logoSrc} alt="<Client>" className="h-12 md:h-14 w-auto" />
</a>
```

**Never** use a type-recreated wordmark as the primary nav/hero lockup. Real logo is the brand equity. Type recreation is acceptable ONLY as a secondary footer mark, never as nav.

**Why this is Step 0:** Richardson Pest v2 initially shipped with an amber-square + scorpion-icon treatment instead of the real Richardson logo — because Brand Brain pulled the logo correctly but Website Brain never copied it into `src/assets/`. Similarly the Lovable favicon stayed in place because nothing in the doctrine forced a scrub. This rule prevents both.

## Mandatory deploy step — path-based URL via `deploy-preview.sh`

After the build passes + Stage 6b QA loop clears, deploy with:

```bash
./scripts/deploy-preview.sh /tmp/<client>-demo --client <client-slug>
```

Ships to `https://demo.proofpilotapps.com/<client-slug>/` via the single `proofpilot-preview` Pages project. Full doctrine in `deploy-preview.md`. The helper auto-patches BrowserRouter `basename={import.meta.env.BASE_URL}` if needed (React Router doesn't inherit Vite's `--base` by default).

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
