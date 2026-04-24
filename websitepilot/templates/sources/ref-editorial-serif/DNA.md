# editorial-serif DNA

Reference source: **[kingswoodlandscape.com](https://www.kingswoodlandscape.com)** — Be The Anomaly's luxury-serif outlier build for a high-end design-build landscape firm.

Fallback source considered but not used: cincomosqueteros.co (Kingswood is live).

## Typography

| Role | Family | Size | Weight | Style | Notes |
|---|---|---|---|---|---|
| H1 (hero) | Serif 72 Beta → Fraunces | 83px / 91.3 lh | 400 | **italic** | SIGNATURE MOVE — italic display serif |
| H1 eyebrow (H2 in markup) | Serif 72 Beta → Fraunces | 28–36px | 400 | roman, tracked 0.06em | sits above H1 as label |
| H2 section | Serif 72 Beta → Fraunces | 44px / 48.4 lh | 400 | roman | no uppercase |
| H3 metric | Serif 72 Beta → Fraunces | 40px | 400 | italic on accent stats | green |
| Body | Georgia fallback; Fraunces in clone | 14–17px / 25–30 lh | 400 | roman |  |
| Button | Fraunces | 14–20px | 600 | some italic ("Learn more") | letter-spacing **0.18–0.20em** |
| Eyebrow | Fraunces | 12–14px | 500 | italic or roman caps | letter-spacing **0.20–0.24em** |

Key rule: **H1 is italic serif, H2 is roman serif.** Never mix sans in display.

## Palette

Taken from computed styles. Cream + green + ink, no secondary accents.

| Token | Hex | Role |
|---|---|---|
| `--brand-cream` | `#FFFCF4` | ground — replaces white everywhere |
| `--brand-cream-warm` | `#F6F0E2` | section alt, card bg |
| `--brand-cream-line` | `#CFCDC6` | rules, borders |
| `--brand-accent` | `#42AC54` | primary CTA, monogram, eyebrows |
| `--brand-accent-hover` | `#399948` | primary CTA hover |
| `--brand-ink` | `#1F1E1A` | headings, dark band bg |
| `--brand-ink-soft` | `#464646` | body text |
| `--brand-ink-muted` | `#8C8B87` | tertiary / placeholder |
| `--brand-black` | `#0E0D0A` | footer bg |

When reskinning: change `--brand-accent` first. Ink + cream stay. Never introduce a third hue.

## Buttons & Inputs

All **0px border-radius.** No rounded corners anywhere.

| Variant | Background | Border | Text |
|---|---|---|---|
| primary | `#42AC54` | none | white |
| ghost-dark | transparent | 1px ink | ink |
| ghost-light | transparent | 1px white/70 | white |
| italic-link | none | bottom-rule 1px | ink, italic serif |

Padding: `16px 32px`. Letter-spacing: `0.18em`. Text-transform: uppercase for buttons; capitalize for italic-link.

Inputs: no border box — only a `1px` bottom rule. Placeholder is italic. Background transparent.

## Motif

1. **Crown monogram** — 7-peaked silhouette glyph in accent green, stamped on service cards, divider ornaments, and logo mark. Replaces the brand mark.
2. **Monogram divider** — horizontal rule with a tiny crown centered, separates subsections.
3. **Editorial numerals** — italic accent-green numerals on stats (01–05 for process) replace icon-based step indicators.
4. **Commissioned architectural photography** — every photo is full-bleed, warm, outdoor, no people-looking-at-camera. Gallery + hero treatment.

## Section order (11 sections)

1. Header (transparent-over-hero, opaque when scrolled)
2. Hero (full-bleed photo, bottom-left eyebrow+italic H1, bottom-right subcopy+CTA card)
3. Signature Stats (4 editorial numerals on cream, monogram divider above)
4. Services (6 disciplines, 3×2 grid on cream-warm, crown on the "hero" card)
5. Process (5 steps on dark ink, italic numerals, flanking commissioned photos)
6. Collection (6 projects, portfolio grid, title overlay + arrow badge)
7. Ethos (two long-form paragraphs + monogram divider + certification row)
8. Editorial Quote (oversized italic pull-quote on cream-warm)
9. Reviews (3 testimonials, border-left accent, italic city tag)
10. CTA Band (dark ink, italic H2, phone + discovery-call CTAs, studio/hours/inquiries row)
11. Footer (black, 4 link columns, italic green headings, wordmark social links)

## When to use

- Luxury design-build (landscape, custom-home, remodel, estate services)
- Dental / medical / cosmetic practices where "editorial" is on-brand
- Legal / financial firms targeting HNW clients
- Art galleries, museums, private clubs

## When NOT to use

- Trades (plumbing, HVAC, roofing, pest) — always use `ref-contractor-heritage`
- SaaS / B2B software — wrong rhythm, wrong palette
- Consumer-friendly / playful brands — use `ref-playful-chunky-consumer`
- Any brand without commissioned photography — italic serif + stock photos reads like a wedding invitation

## Don't

- Don't add stars inside review cards — stars live in eyebrow only
- Don't add gradient buttons or pill buttons — 0px only
- Don't use sans-serif display — not even for H3
- Don't add icons to the 5-step process — editorial numerals only
- Don't use the green `#42AC54` as a section background — accents only

## Do

- Commissioned architectural photography, warm-toned, human-free where possible
- Italic serif H1, roman serif H2 everywhere else
- Monogram divider between dense sections
- Heavy letter-spacing on all caps labels (0.18–0.24em)
- Cream `#FFFCF4` ground in place of white — the warmth is load-bearing
