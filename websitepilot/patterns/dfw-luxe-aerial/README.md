# patterns/dfw-luxe-aerial

Prop-driven, brand-agnostic React patterns extracted from the `ref-dfw-luxe-aerial` reference clone (sourced from Be The Anomaly's Anomaly Pool Services build).

Each file is standalone: drop into any Vite/Next project that has Tailwind, Bebas Neue, and Work Sans loaded. No external deps beyond React 18.

## Tokens required
```css
--color-accent: #4CA8DE;  /* pool blue */
--color-navy: #121A1E;
--color-twilight: #0C0C0C;
--color-mist: #E9F5FB;
```

## Fonts required
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

## Files
| File | What it is | When to use |
| --- | --- | --- |
| `HeroDroneAerialTitleCase.tsx` | Full-bleed aerial hero + title-case Bebas headline with one color-painted noun | Brand has a real drone aerial and needs the BtA signature hero. |
| `GoogleStarPillWithAvatars.tsx` | Google G + 5 gold stars + rating + 3–5 overlapping avatars pill | Inside hero, under copy, or as a floating trust card anywhere. |
| `ChunkyOffsetShadowButton.tsx` | The `0 5px 0 0` offset-shadow button with 8px radius and navy border | Any CTA on any BtA-family site. |
| `DroneAerialAboutFounder.tsx` | 60/40 navy-band split with portrait + stats + color-painted headline | Founder-led brands where trust comes from a face + years. |
| `InlineQuoteFormDark.tsx` | Dark-twilight band with white form card and chunky submit | Mid-page or just under hero when form is the primary conversion. |
| `JewelToneCTABand.tsx` | Full-bleed accent-colored CTA with dual buttons | Penultimate page section before footer. |
| `GalleryMasonryAerials.tsx` | Masonry-ish 4-col grid with a hero tile spanning 2x2 | Any portfolio heavy on aerial photography. |
