# premium-design-build DNA

Reference source: **[cincomosqueteros.co](https://cincomosqueteros.co)** — El Paso landscape + hardscape design-build studio. Cross-checked with Firecrawl scrape + Playwright computed styles. Both tools agreed on structure and type scale; Playwright won on exact font family (`"uber move"`, proprietary Uber typeface — swapped to Manrope in the clone) and hex colors (deep olive `#294500` footer + button green `#7AB222`). Firecrawl won on readable nav + footer text extraction.

Fallback sources considered but not used: podlaz.com and southernlandspecialist.com. Cinco resolved cleanly on the first fetch.

> **Important**: Cinco Mosqueteros is Cinco-green-forward. The `premium-design-build` preset is **black / cream / muted gold**, per Matthew's brief. This DNA doc captures Cinco's section rhythm and type scale faithfully, then notes every place the clone normalizes to the preset palette.

## Typography

| Role | Cinco source | Clone target | Notes |
|---|---|---|---|
| H1 (hero eyebrow) | `"uber move"` 50px / 70lh, wt 500, white | Manrope 50px / 60lh, wt 500, cream | mobile: 28px / 39lh |
| H2 (hero tagline) | `"uber move"` 74px, wt 600, white, bullet-separated ("Design • Build • Maintain") | Manrope 74px / 80lh, wt 700, cream, italic-serif bullets | mobile: 40px / 42lh |
| H2 section | `"uber move"` 60px, wt 500, `#0F0F0F` | Manrope 48px / 54lh, wt 700 | |
| H3 card | `"uber move"` 20px, wt 700, `#191919` | Manrope 22px, wt 600 | |
| H4 label | `"uber move"` 20px, wt 700 | Manrope 14px, wt 600, letter-spacing `0.18em`, ALLCAPS | label / eyebrow |
| Body | system-ui (Apple stack), 16px, color `#334155` | Manrope 16px / 26lh, color `#2A2A28` | |
| Button | `"uber move"` 15–22px, wt 700, radius **18px**, ALLCAPS | Manrope 14px, wt 700, radius **4px**, ALLCAPS, letter-spacing `0.14em` | Cinco's 18px pill-ish softened to editorial 4px |
| Italic accent | — (no italic in Cinco) | **Fraunces italic** — the SIGNATURE preset move | replaces Cinco's green highlight with an editorial pull-phrase |

Key preset rule: **H1/H2 are modern sans. One italic serif phrase per section.** Never mix two sans-serif display faces.

## Palette

Cinco observed vs clone target:

| Token | Cinco source | Clone target | Role |
|---|---|---|---|
| `--brand-gold` | `#7AB222` button green | `#B08A3E` muted gold | primary CTA |
| `--brand-gold-hover` | `#294500` deep olive | `#977530` | primary CTA hover |
| `--brand-gold-soft` | — | `#D4B26B` | italic accents on dark |
| `--brand-ink` | `#0F0F0F` headings | `#111111` | headings, dark-band bg |
| `--brand-ink-soft` | `#334155` body | `#2A2A28` | body |
| `--brand-ink-muted` | — | `#6F6E6A` | tertiary / meta |
| `--brand-cream` | `#FFFFFF` page bg | `#F7F2E8` | ground — replaces white |
| `--brand-cream-warm` | — | `#EFE7D4` | section alt |
| `--brand-cream-line` | — | `#D8CFBB` | rules, borders |
| `--brand-black` | `#294500` footer | `#0A0A0A` | footer |

When reskinning the preset: change `--brand-gold` first. Ink + cream stay. Never substitute green or blue for gold — gold + cream + black is the preset signature.

## Buttons & Inputs

Cinco uses an **18px** soft-rounded rectangle with heavy 21px padding. The clone softens this to **4px** — the editorial preset's restrained-but-not-sharp signature.

| Variant | Background | Border | Text |
|---|---|---|---|
| primary | `#B08A3E` gold | 1px same | white |
| ghost-dark | transparent | 1px ink | ink |
| ghost-light | transparent | 1px white/70 | white |
| text | transparent | bottom-rule 1px | gold, uppercase |

Padding: `18px 28px`. Letter-spacing: `0.14em`. `text-transform: uppercase`.

Inputs: 4px radius, white fill, 1px cream-line border. Focus: gold underline.

## Motif

1. **Italic serif accent phrase** — Fraunces italic 1–3 words slipped into every section heading. Replaces Cinco's colored highlight and becomes the preset's single editorial voice. *"Design · Build · Live"* (where the bullets are italic).
2. **Bullet-separated tri-word tagline** — Cinco's signature ("Design • Build • Maintain"). Kept as the hero H2 treatment.
3. **Muted-gold monogram** — single letter in a 4px-radius outlined square, used in header + footer.
4. **Twilight owner portrait** — the Get Local Leads signature. Owner cutout over a gold-lit twilight patio. Used once in the page.
5. **Commissioned architectural OR aerial photography** — every placeholder is a gradient stand-in for one of three treatments: architectural (warm, twilight-lit), aerial drone, or twilight-patio.

## Section order (13 sections)

1. Header — transparent-over-hero, opaque when scrolled
2. Hero — full-bleed architectural photo, eyebrow + H1 + H2 bullet tagline + italic accent + CTA row + floating studio card (right)
3. Awards / Press row — cream-warm band, 6 muted logos, subtle divider
4. Philosophy statement — long-form prose with a single italic pull-line, centered, no cards
5. Project case study grid — 6 case-study tiles, italic-accent project names, location + year meta
6. Owner twilight feature — split: twilight-patio placeholder with owner cutout / italic accent + bio + signature
7. Capabilities list — two-column understated list (not an icon grid) with italic arrow glyph
8. Team craftsmanship — 3 portraits on cream-warm, italic role, no icons
9. Process premium — 5 steps on dark ink, italic-serif 01–05 numerals
10. Editorial quote — oversized italic-serif pull-quote on cream-warm, single source
11. CTA band bespoke — dark ink band, italic H2, phone + Start-a-Project CTAs
12. Contact bespoke — "Begin the conversation" form on cream-warm (never "Get a Quote")
13. Footer — black, 4 columns, italic-gold section headings, muted-cream body

## When to use

- Hardscape + outdoor-living design-build ($50K+)
- Landscape architecture studios with commissioned photography
- Custom-home and estate-remodel firms
- Boutique pool + spa builders
- Any premium design-build firm with a portfolio-first sales motion

## When NOT to use

- Trades (plumbing, HVAC, roofing, pest) — use `ref-contractor-heritage`
- Consumer / playful — use `ref-playful-chunky-consumer`
- DFW-style aerial-only (drone + Jewel CTAs) — use `ref-dfw-luxe-aerial`
- Editorial-serif luxury (italic H1, crown monogram) — use `ref-editorial-serif`
- Any brand without commissioned or aerial photography — the italic-accent + cream palette reads wrong over stock imagery

## Don't

- Don't use Cinco's green palette — the preset is gold
- Don't drop the italic Fraunces accent phrase — it's the ONLY serif in the build
- Don't reorder portfolio and services — portfolio is first, capabilities are second
- Don't change the contact CTA label from "Start a Project" / "Begin the Conversation" to "Get A Quote"
- Don't substitute the 4px button radius with pills or sharp 0px

## Do

- Commissioned architectural OR aerial drone photography
- One italic serif phrase per section, nowhere else
- Portfolio-first rhythm (case studies before services)
- Owner twilight cutout (Get Local Leads signature beat)
- Muted gold accent — never fluorescent / never blue
- Bullet-separated tri-word tagline on the hero ("Design · Build · Live" style)

## Firecrawl vs Playwright recon notes

- **Firecrawl won** for: full nav tree (all sub-pages), footer text, service-area list, clean link extraction.
- **Playwright won** for: computed font family (detected proprietary `"uber move"` vs Firecrawl's assumed "Inter"), exact hex colors on backgrounds (`#294500` footer, `#7AB222` submit button), responsive breakpoints (hero H1 drops 50px → 28px at 390px width, H2 tagline drops 74px → 40px).
- **Both agreed** on: section order, hierarchy of H1/H2/H3 text, button labels.

Both tools kept for WebsitePilot recon going forward. Use Firecrawl first for structure + copy, Playwright second for computed styles + responsive verification.
