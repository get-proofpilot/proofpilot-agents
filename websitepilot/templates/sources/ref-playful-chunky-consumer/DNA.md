# playful-chunky-consumer — Design DNA

**Source:** https://gosantabanana.com/ (Santa Banana Lighting, Queen Creek AZ).
**Captured:** 2026-04-23 (desktop 1440 viewport).
**Recon artefacts:** `/tmp/recon-santabanana/` (Firecrawl markdown/HTML, Playwright full-page PNG, computed styles JSON).

This is the exemplar for the `playful-chunky-consumer` lane. Reuse when the brief is:
- Holiday / seasonal consumer services (Christmas lighting, decor, parties).
- Pet services (grooming, boarding, training) where a friendly character anchors the brand.
- Kids / family services (tutoring, camps, clubs) with playful voice.
- Any consumer brand that wants "confident-chunky" rather than "slick-premium" or "rugged-industrial."

---

## 1. Palette (extracted via Playwright `getComputedStyle`)

| Role        | Hex       | Where it shows up |
|-------------|-----------|-------------------|
| `primary`   | `#FDD40C` | Yellow/gold primary CTAs — every "Get a Fast Quote" button. |
| `primaryInk`| `#090F17` | Near-black ink on yellow CTAs. |
| `accent`    | `#D11F2E` | Candy-red: phone button border, mid-page CTA band fill. |
| `dark`      | `#063250` | Deep navy — hero field, CTA band, card fill. |
| `darker`    | `#0F1A28` | Even deeper navy — footer, darker card surfaces. |
| `sky`       | `#146094` | Mid-blue alt band used inside the services section. |
| `cream`     | `#F8F8F8` | Neutral very-light alt-section background. |
| `ink`       | `#0F1A28` | Body-text color on cream surfaces. |
| `onDark`    | `#FFFFFF` | Headlines / body on dark surfaces. |

Palette logic: three **candy stops** (yellow, red, yellow) on a navy field. The navy is NOT black — it's the playful-confident bed. Yellow always means "act." Red always means "call / urgent." Never invert.

---

## 2. Typography

- **Display family:** `Fira Sans` — used at weights 500 / 700 / 800 / 900.
- **Body family:** `Open Sans` — weights 400 / 500 / 700.
- **Every H1/H2/H3 is uppercase, weight 900, letter-spacing -0.3 to -0.5px.**
- **Type scale (desktop 1440):**

| Role          | Size   | Weight | Line-height | Transform |
|---------------|--------|--------|-------------|-----------|
| Hero giga     | 100px  | 900    | 1           | UPPER     |
| Hero display  | 89px   | 900    | 1.1         | UPPER     |
| Section H1    | 57px   | 900    | 1.3         | UPPER     |
| Section H2    | 41px   | 800    | 1.2         | UPPER     |
| Eyebrow copy  | 31px   | 500    | 1           | — (sentence) |
| Card title    | 23px   | 800    | 1.2         | UPPER     |
| Tile title    | 20px   | 700    | 1.3         | — (sentence) |

This is the signature: wild weight range (400 body ↔ 900 display) inside a **single** family. That's what reads "chunky." Mixing two display families kills the signal.

---

## 3. Section rhythm (top → bottom)

1. **Header** — dark navy strip, logo + mascot mark + nav + phone-red CTA + yellow primary CTA.
2. **Hero** — deep-navy radial gradient, 2-column: giant UPPER headline + inline quote card (right column).
3. **Marquee bar** — candy-yellow sliding bullets ("Custom Fitted Lights ● Picture Perfect Installs ●…").
4. **Intro split** — cream, text left + photo right + mascot emoji-peek overlapping the photo edge.
5. **Services (4-card)** — mid-blue (`#146094`) band, 4 dark-navy cards with uppercase H4 + CTA on each.
6. **Benefits grid (6-tile)** — cream, alternating dark/white tiles in a 3-col grid.
7. **CTA band** — candy-red full-bleed, twinkle-light dividers above and below.
8. **Process (3-step)** — cream, 3 dark-navy cards with giant "One / Two / Three" counters.
9. **Before/After gallery** — cream, 2×3 split-tile grid.
10. **Reviews** — dark navy, 3 testimonials each led by an emoji glyph.
11. **Service area** — cream, city pills + map tile.
12. **FAQ** — cream, rounded accordion with yellow "+/–" pill indicator.
13. **Final CTA** — dark navy, twinkle-light seam on top, 3-button trio (quote / call / text).
14. **Footer** — darker navy, 4-col with mini map.

---

## 4. Button spec

| Role          | Fill                | Ink       | Border                 | Radius | Size & padding | Notes |
|---------------|---------------------|-----------|------------------------|--------|----------------|-------|
| Primary       | `#FDD40C`           | `#090F17` | 2px solid `#FDD40C`    | 5px    | 18px / 13×28   | Uppercase, Fira Sans 700. |
| Primary XL    | same                | same      | same                   | 5px    | 22px / 16×34   | Used in hero + final CTA. |
| Accent (phone)| transparent         | `#D11F2E` | 2px solid `#D11F2E`    | 5px    | 20px / 14×24   | Hover: fill red, ink white. |
| Ghost-light   | transparent         | `#FFFFFF` | 2px solid `#FFFFFF`    | 5px    | 20px / 14×24   | Dark sections only. Hover: fill white, ink navy. |

**IMPORTANT — button radius is 5px, not 999px.** This contradicts the "pill button" cue sometimes associated with "consumer-playful." The Santa Banana DNA moves the playfulness into the **candy color + chunky weight + oversized padding**, not the curve. Keep buttons rectangular-with-soft-corners to preserve the brand read. If a future variant needs literal pills, that's a fork, not this preset.

---

## 5. Photography & illustration

- **Mascot:** one character (banana-themed Santa figure in the reference). Used as a circular peek element on the hero edge, on the intro-split image edge, and as the favicon/logo mark.
- **Photography:** warm-tone night shots of homes lit up. 4:3 or 3:2 aspect. Shot at dusk/night with the lights hero'd. All placeholders in this scaffold are divs — replace with real photos before ship.
- **Illustration cues:** twinkle-light strings as section seams (`.lights-divider`) — tiny alternating yellow/red/blue dots repeating along a 16px band. This is the "light-string" motif.
- **Micro-motion:** mascot `animate-bob` (slow Y-bob with rotate), marquee bullets slide left infinitely, hover on primary CTA nudges up 1px and casts a yellow shadow.

---

## 6. Layout tokens

- Container max-width: `1320px`.
- Card radius: `8px` (moderate — not sharp, not soft).
- Button radius: `5px` (chunky corners, not pills).
- Section padding: `py-20` (mobile) → `py-28` (desktop).
- Grid gap inside card rows: `gap-5`.

---

## 7. Tool-by-tool verdict (Firecrawl vs Playwright)

- **Firecrawl wins for**: structure (markdown outline captured every heading + CTA copy in one pass), metadata (OG title, favicon, theme color), scroll-order of sections. It gave us the full copy spine in ~3s.
- **Playwright wins for**: computed styles (only way to see that H2 renders at 89px weight 900 vs the design-file spec), actual runtime button radius (5px NOT 999px), font-family resolution (`Fira Sans` fell through the CDN fallback chain), section background colors (many Elementor sections are `rgba(0,0,0,0)` and inherit from a parent — Firecrawl HTML alone wouldn't tell us this), animation / scroll behavior.
- **First pass of Firecrawl failed** (site served an anti-bot interstitial; subsequent scrape with `--wait-for 5000` got through). Without Playwright in the second loop we'd have shipped the WRONG button spec (Tailwind `rounded-full` looks right in a design mockup but doesn't match the runtime).

---

## 8. Five copy-forward lessons (reuse on next brief)

1. **Candy stop-lights over gradient CTAs.** Flat yellow + flat red on flat navy reads "playful-confident" more than any gradient treatment would. Save gradients for the hero backdrop only.
2. **One font, full weight range.** Resist the urge to pair a display face with a body face — 900 weight Fira next to 400 weight Fira is more memorable than mixing two families.
3. **Character appears three times, minimum.** Header mark + hero peek + intro-split peek. That's the "character-led" promise earned, not just stated.
4. **Twinkle-light seams = motif, not chrome.** Eight tiny dots across the band seam do more brand work than a whole hero illustration. Port the motif (pets? use paw-prints; kids? use star-prints) into the seam instead of the photo.
5. **Inline quote-card in the hero.** Don't split the hero CTA from a quote page. The Santa Banana hero's right rail converts because it's ONE step to commit.
