# ref-playful-chunky-consumer

Internal ProofPilot reference template. Not a live client build.

## What this is

A pixel-rhythm clone of the **Santa Banana Lighting** archetype (`gosantabanana.com`), distilled to its reusable design DNA. Use this as the starting scaffold any time a WebsitePilot brief lands in the `playful-chunky-consumer` lane — character-led holiday / pets / kids / playful-consumer brands that pair a deep navy field with a candy-yellow + candy-red stop-light palette and run ONE Fira Sans family across all weights.

Source recon lives in `/tmp/recon-santabanana/` (Firecrawl scrape JSON, Playwright full-page PNG). DNA write-up lives in `./DNA.md`.

## When to use

- Holiday / seasonal consumer services (Christmas lighting, pumpkin decor, party rentals).
- Pet services (grooming, boarding, training, daycare) with a mascot or character.
- Kids / family services (tutoring, camps, clubs, parties).
- Any consumer brand the brief calls "playful," "friendly," or "character-led."

## When NOT to use

- Trade-professional authority (commercial restoration, luxury custom builds) → use `ref-contractor-heritage` or `keystonerestoration`.
- Rugged industrial / blue-collar vertical → use `ref-rugged-industrial`.
- Premium editorial / aerial lifestyle → use `ref-dfw-luxe-aerial` or `premium-outdoor-editorial`.
- Bold-mascot home-service (but rougher, less candy) → use `ref-archetype-mascot`.

## What to swap (client-level DNA changes)

| Swap | Where | Notes |
|---|---|---|
| Logo / mascot mark | `Header.tsx` + `FooterBright.tsx` + hero `IntroSplit` peek | Replace the circular `SB` placeholder. Keep the same slot dimensions (48×48px header, 112×112px peek). |
| Mascot photo / illustration | `IntroSplit.tsx`, `Hero.tsx` | The round-peek bob element is designed for a PNG with transparent background. |
| Color tokens | `tailwind.config.ts` → `theme.extend.colors.brand.*` AND `src/index.css` → `:root` | Change hex values; do NOT change role names. `primary` stays the candy CTA, `accent` stays the second-stop (phone / mid-CTA), `dark` stays the hero field. |
| Font | `index.html` Google Fonts URL + `tailwind.config.ts` fontFamily.sans | Replace `Fira Sans` with another wide-weight-range sans if the client brand requires it (Barlow, Archivo, Sora). Must include weights 500/700/800/900. |
| Photography | `BeforeAfterGallery.tsx`, `IntroSplit.tsx`, `ServiceArea.tsx` | All placeholder divs. Replace with 4:3 or 3:2 warm-tone photography. |
| Copy | `{{DOUBLE-CURLY}}` placeholders throughout | Every `{{...}}` marks a client-specific slot. Grep `{{` to find them all. |
| Services | `ServicesPlayful.tsx` | 4 pillars — keep the count. 6+ = overflow to a separate page. |
| Benefits | `BenefitsGrid.tsx` | 6 tiles — keep the alternating dark/white pattern. |
| Process | `ProcessCards.tsx` | 3 steps is the signature — 4+ dilutes the drumbeat. |
| Cities | `ServiceArea.tsx` | 6–12 cities in pill-tags. |
| FAQs | `FaqPlayful.tsx` | 5–7 questions. |

## What NOT to change (preserve the DNA)

- The candy-yellow + candy-red + deep-navy triad. Don't replace yellow with orange or red with pink without the lane preset repointed to a new reference.
- **Button radius stays 5px.** Pills (999px) read wrong on this lane — yellow-on-navy at 5px radius is the signal. If the client demands pills, fork the preset.
- One font family, wild weight range (400 body ↔ 900 display).
- Character appears 3+ times (header mark, hero peek, intro peek). Cutting to just the logo breaks the "character-led" promise.
- Twinkle-light seam dividers (`.lights-divider` in `index.css`). Remap the motif (paw-prints for pets, stars for kids) but keep the seam.
- UPPER + 900 weight on every display headline.

## Build

```bash
cd ~/proofpilot-agents/websitepilot/templates/sources/ref-playful-chunky-consumer
npm install
npm run dev    # localhost:8082
npm run build  # dist/
```

## File map

```
src/
├── App.tsx
├── main.tsx
├── index.css                      — CSS tokens + buttons + typography utility classes + twinkle-light divider
├── lib/utils.ts                   — cn() helper
├── pages/Index.tsx                — mounts all sections in their canonical order
└── components/
    ├── Header.tsx                 — dark navy, logo + mascot mark + nav + phone-red + yellow CTAs
    ├── Hero.tsx                   — deep-navy radial + 2-col giant headline + inline quote card + twinkle seam
    ├── MarqueeBar.tsx             — candy-yellow sliding feature bullets
    ├── IntroSplit.tsx             — cream + text left + photo right + round mascot peek on edge
    ├── ServicesPlayful.tsx        — mid-blue band, 4 dark-navy service cards with per-card CTA
    ├── BenefitsGrid.tsx           — cream, 6-tile alternating dark/white grid
    ├── CTABandCandy.tsx           — candy-red full-bleed with twinkle seams top/bottom
    ├── ProcessCards.tsx           — cream, 3 dark-navy step cards with giant "One/Two/Three"
    ├── BeforeAfterGallery.tsx     — cream, 2×3 split-tile placeholder gallery
    ├── ReviewsWithEmoji.tsx       — dark navy, 3 testimonial cards each led by an emoji
    ├── ServiceArea.tsx            — cream + city pills + map-tile placeholder
    ├── FaqPlayful.tsx             — cream, rounded accordion with yellow +/– pill indicator
    ├── CTAFinal.tsx               — dark navy + twinkle seam + 3-button trio (quote / call / text)
    └── FooterBright.tsx           — darker navy, 4-col + utility strip
```
