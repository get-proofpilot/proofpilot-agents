# ref-playful-chunky-consumer-junk

**Pre-composed bundle:** `ref-playful-chunky-consumer` base + JUNK-REMOVAL vertical patterns. Skip the compose step for any junk-removal demo.

## What this is

A fully-composed Vite scaffold with the playful-chunky DNA (Fira Sans 500–900 UPPERCASE, navy + candy-yellow + red, 5px chunky rectangles, twinkle-light seam dividers) plus junk-removal-specific patterns layered in. Brand-agnostic placeholders only — no live client copy, no real photography, no client-specific pricing.

## Base preset

`ref-playful-chunky-consumer` — Santa Banana Lighting DNA (gosantabanana.com). Distilled for character-led consumer brands. Originally tuned for holiday-lighting; the visual DNA (deep navy field, candy-yellow primary, candy-red phone CTA, Fira Sans wild weight range, chunky rectangles) ports cleanly to junk-removal where the brand voice is "friendly + confident + we'll-actually-show-up."

## Vertical: junk removal

Tuned for residential + small-commercial junk-removal businesses where the buyer:

- needs same-day or next-day pickup more often than scheduled service
- self-selects by **scenario** (garage cleanout / construction debris / estate / yard) — not by service-name lookup
- distrusts the category because national chains hide pricing — "text a photo, get a flat number" is the universal differentiator
- responds to **"we haul it / you smile"** energy more than "premium-rated / award-winning" framing

## Patterns composed

| Section | Component | Adapted from |
|---|---|---|
| 4 | `MultiStepServiceTypeIntake` | `patterns/vertical/MultiStepServiceTypeIntake` (Speedy Water Heaters DNA) — junk type → scale → contact |
| 5 | `JunkServicePhotoTiles` | `patterns/vertical/JunkServicePhotoTiles` (Junk Bros DNA) — 9 photo tiles, lime "PICK UP TODAY" badges |
| 6 | `JunkFlatRatePricingBand` | `patterns/vertical/GarageFlatRatePricingHero` — adapted from hero to mid-page band, junk truck-load tiers |
| 7 | `TextAPhotoQuotePromise` | `patterns/vertical/ExteriorInstantQuotePromise` — "60s online quote" reframed as "10-min text-a-photo quote" |
| 9 | `ReviewsWithEmoji` | base `playful-chunky-consumer` pattern — emoji-led testimonials, junk-flavored quotes |
| 11 | `FaqPlayful` | base pattern — 7 junk-specific Qs (what we take, won't take, flat-rate, same-day, donation, commercial, no-contact pickup) |
| 12 | `CTABandCandy` | base pattern — candy-red full-bleed end CTA, twinkle seams top/bottom |

The brief also called out `MembershipCardsPlayful` from the playful-chunky-consumer pattern set. We chose **not** to wire it into the canonical Index for junk-removal — junk is a transactional one-and-done category, and tier cards (Classic / Signature / Showcase) over-complicate the buyer flow vs. the "Starting at $X" flat-rate band. The pattern is still imported in `patterns/playful-chunky-consumer/MembershipCardsPlayful.tsx` and can be added back for verticals like recurring commercial accounts or storage memberships if a client briefs that scope.

## Section order

```
Header → Hero (express-lane card)
  → MarqueeBar
  → MultiStepServiceTypeIntake     [vertical, 3-step]
  → JunkServicePhotoTiles          [vertical, 9 tiles]
  → JunkFlatRatePricingBand        [vertical, dark band w/ tier cards]
  → TextAPhotoQuotePromise         [vertical, "10 min" promise]
  → ProcessCards                   [How it works, 3-step]
  → ReviewsWithEmoji               [base playful pattern]
  → ServiceArea                    [pill grid + map slot]
  → FaqPlayful                     [7 junk-specific Qs]
  → CTABandCandy                   [end CTA — base playful pattern]
  → FooterBright
```

13 sections total, matches the rhythm of the 4 reference vertical bundles (`ref-contractor-heritage-roofing`, `ref-rugged-industrial-pest`, `ref-dfw-luxe-aerial-landscape`, `ref-contractor-heritage-hvac`).

## Palette nudge

Inherited from the base preset, with one addition in `tailwind.config.ts`:

- `brand.go` (`#9CD60F` lime) added as a third candy-stop, used **only** for badges, chips, and the same-day "PICK UP TODAY" flag on photo tiles. Yellow + red + navy still carry the brand; lime is the junk-vertical's "go-energy" tell.
- The twinkle-light seam divider (`.lights-divider`) now uses a 4-stop dot rhythm (yellow + red + lime + navy) so the new accent is visible at every dark/light seam.
- `ink`, `dark`, `accent`, and `primary` are unchanged.

The structural DNA (Fira Sans 900 display, 5px chunky rectangles, deep-navy hero, candy-red phone CTA, twinkle seams) is **unchanged**.

## Hard rules — preserve the DNA

- **Button radius stays 5px.** This was the explicit lesson from playful-chunky DNA — pills (999px) read wrong on this lane. Yellow-on-navy + chunky rectangles = the brand signal.
- **One font family, wild weight range.** Fira Sans 400 ↔ 900. Don't pair a second display face.
- **Character-led header + hero.** Mascot mark in `Header` + `FooterBright` + (per-client) hero peek.
- **Twinkle-light seams** at every dark/light section transition.
- **UPPERCASE + 900 weight** on every display heading.

## When to use this bundle

- Residential junk-removal + hauling brands serving a single metro
- Small-commercial junk + cleanout operators (estate, office, post-construction)
- Brands with strong job-site photography (real before/after, real trucks, real crews)
- Markets where flat-rate text-quote pricing is a real differentiator vs. national dispatch chains

## When NOT to use

- Premium / white-glove "concierge cleanout" brands — the candy palette reads down-market for that audience; consider `ref-dfw-luxe-aerial` instead
- Multi-state / franchise junk operators — this DNA reads "local + family-owned"; if the brief is national-franchise, use `ref-archetype-mascot` (College Hunks / 1-800 vibe)
- Brands without consistent photography — the `JunkServicePhotoTiles` section needs 9 real photos; placeholder gradients won't ship
- Hazmat / specialty waste haulers — the playful tone reads off-brand; consider `ref-rugged-industrial` instead

## What to customize per client

| Token | Where | Example |
|---|---|---|
| `brand.primary`, `brand.accent`, `brand.go` | `tailwind.config.ts` + `src/index.css` | client palette swap (KEEP role names) |
| `{{BRAND-NAME-L1}}` / `{{BRAND-NAME-L2}}` | `Header.tsx` + `FooterBright.tsx` | "ACME" / "Junk Removal" |
| `{{MASCOT-MARK}}` | `Header.tsx` + `FooterBright.tsx` | logo mark — currently "JR" placeholder |
| `{{PHONE-RAW}}` / `{{PHONE-DISPLAY}}` | grep across `src/` | client phone for tel/sms |
| `{{CITY-1..10}}` | `ServiceArea.tsx` | metro neighborhoods |
| `{{METRO}}` | `ServiceArea.tsx` | "Greater Phoenix", etc. |
| `{{CITY-A..C}}` | `ReviewsWithEmoji.tsx` | per-review city tags |
| Photo-tile assets | `JunkServicePhotoTiles.tsx` | swap gradient placeholders for real `<img>` job-site photos |
| Pricing tiers | `JunkFlatRatePricingBand.tsx` | client's actual flat-rate brackets |
| Service tiles | `JunkServicePhotoTiles.tsx` `TILES` | drop tiles the client doesn't service (e.g. no concrete) |
| FAQ items | `FaqPlayful.tsx` `FAQS` | client-specific exclusions / hours / payment |

## What NOT to customize

- Section rhythm. Multi-step intake → photo tiles → pricing band → text-a-photo promise is the conversion order this vertical needs. Reordering kills lead-flow.
- 5px button radius. Don't shift to pills.
- Fira Sans display family. Don't pair with a second display sans.
- Twinkle-light seams. Re-skin the dot pattern (truck silhouettes, recycle arrows) but keep the seam.
- Photo-tile aspect ratio (4:3). Square or portrait kills the "scenario at a glance" read.

## Run it

```bash
cd ~/proofpilot-agents/websitepilot/templates/sources/ref-playful-chunky-consumer-junk
npm install
npm run dev    # localhost:5173
npm run build  # dist/
```

## File map

```
src/
├── App.tsx
├── main.tsx
├── index.css                              — CSS tokens + buttons + typography + twinkle-light seam + pill-go
├── lib/utils.ts                           — cn() helper
├── pages/Index.tsx                        — mounts all 13 sections in their canonical junk order
└── components/
    ├── Header.tsx                         — dark navy strip, logo + mascot mark + nav + phone + GET INSTANT QUOTE
    ├── Hero.tsx                           — deep-navy radial + giant headline + same-day pill + express-lane card
    ├── MarqueeBar.tsx                     — candy-yellow sliding feature bullets (junk-flavored)
    ├── MultiStepServiceTypeIntake.tsx     [vertical] — 3-step intake (junk type → scale → contact)
    ├── JunkServicePhotoTiles.tsx          [vertical] — 9 photo tiles + lime "PICK UP TODAY" badges
    ├── JunkFlatRatePricingBand.tsx        [vertical] — dark band + 4 flat-rate tier cards
    ├── TextAPhotoQuotePromise.tsx         [vertical] — "10 min" promise + 3-step explainer
    ├── ProcessCards.tsx                   — cream, 3 dark-navy step cards (How It Works)
    ├── ReviewsWithEmoji.tsx               — dark, 3 emoji-led testimonial cards
    ├── ServiceArea.tsx                    — cream + city pills + map placeholder
    ├── FaqPlayful.tsx                     — cream, accordion, 7 junk-specific Qs
    ├── CTABandCandy.tsx                   — candy-red full-bleed end CTA, twinkle seams
    └── FooterBright.tsx                   — darker navy, 4-col + utility strip
```

## Bundle origin

Forked from `ref-playful-chunky-consumer/`. Diff against base when pulling structural updates — but keep `Index.tsx`, `Hero.tsx`, the four `vertical/` components (`MultiStepServiceTypeIntake`, `JunkServicePhotoTiles`, `JunkFlatRatePricingBand`, `TextAPhotoQuotePromise`), the `ReviewsWithEmoji.tsx` + `FaqPlayful.tsx` + copy in `CTABandCandy.tsx`, and the `brand.go` lime token local to this fork.
