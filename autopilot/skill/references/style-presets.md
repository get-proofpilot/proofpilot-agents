# Style Presets — Fine-Grained Aesthetic Flavors

> **This doc complements `style-family-selector.md`** (the 4 coarse families) by defining 7 fine-grained aesthetic presets that sit INSIDE those families. Designer Brain first picks a family (`style-family-selector.md`), then picks a preset below that details typography, palette temperament, section rhythm, and iconography approach.

## Family → Preset mapping

| Parent family (`style-family-selector.md`) | Preset flavors |
|-------------------------------------------|----------------|
| `heroic-branded-conversion` | `rugged-industrial` · `archetype-mascot` · `playful-chunky-consumer` |
| `operator-proof-longform` | `contractor-heritage` |
| `premium-outdoor-editorial` | `dfw-luxe-aerial` · `premium-design-build` · `editorial-serif` |
| `clean-recurring-service` | (share `contractor-heritage` or `editorial-serif` patterns scaled down; no bespoke preset yet) |

**Workflow:** `brand-archaeology.md` Stage 7 fit signals → `style-family-selector.md` picks 1 of 4 families → this doc narrows to 1 of 7 presets → `design-strategist.md` output template → Website Brain executes.

## Why this exists

**The Red Rock + Richardson lesson (April 2026):** Gemini 3.1 Pro defaulted to Fraunces (Red Rock) then Merriweather 900 (Richardson) — both serif. For Red Rock (family dental practice, warm editorial voice) that landed fine. For Richardson Pest (family-owned scorpion-and-termite specialist) the serif was **wrong**: the brand's actual voice is plainspoken ("Stop living in fear, just call us"), the vertical is rough-edged trade service, and the clients who matter compete against 180 Sites / Be The Anomaly / Hook Agency builds — all of which use bold sans, not serif.

Without a preset discipline, every Designer Brain run defaults to "premium editorial" because it maps "family-owned + established" → newsroom authority. That's a category error for ~80% of home service work.

## The 7 presets

| Preset | Reference agency | Typography | Palette temperament | Section count | Best for |
|--------|------------------|------------|---------------------|---------------|----------|
| `rugged-industrial` | 180 Sites (Haro Electric) + Rockin-Rugged | Condensed sans (Saira / Oswald / Teko) 800-900 UPPERCASE display + Inter body | Dark navy/black + ONE high-sat accent (red, amber, lime, cyan) | 8-10 | Pest, demolition, hauling, concrete, industrial services, roofing |
| `archetype-mascot` | 180 Sites (Volt Vikings, Valkyrie Wraps, Professor Pressure) | Geometric display (Poppins / Montserrat / Orbitron 800) + Open Sans body | Brand-narrative palette keyed to the archetype (Viking blues, Pirate black+gold) + 1 accent | 8-10 | Brandable archetype names — Volt Vikings, Patriot Illumination, Professor Pressure. Requires client brand that can support a mascot world. |
| `dfw-luxe-aerial` | Be The Anomaly (Anomaly Pool, Salas Concrete, Kingswood Landscape) | Bebas Neue 400-500 title case + Work Sans body + Titillium Web mono | Single jewel tone (cyan / crimson / forest / purple) on navy + white. Alternate dark/light bands 50/50. | 10-12 | Pool, outdoor living, concrete, landscape, upper-mid trades with real drone-aerial photography available |
| `contractor-heritage` | Hook Agency (Bears Plumbing, B&M Roofing, TopDog HVAC) | Client's heritage face preserved (often Knockout / Roboto Condensed / Libre / Uniform Bold) + Museo Sans body | Preserved client palette (red+black for Bears, client-specific for each) | 12-15 (SEO-heavy) | Roofing, plumbing, HVAC, general contractors with existing logo + brand heritage worth preserving. Long-form SEO content matters. |
| `editorial-serif` | Our Red Rock Family Dentistry benchmark | Serif display (Fraunces / Merriweather / Playfair) 800-900 + Inter body | Warm sand/off-white (never pure white) + logo-derived accent + ink neutrals | 10-12 | Dental, medical, legal, financial advisory, heritage multi-generational family practices, luxury design-build, aesthetic/wellness. Use SPARINGLY — only when client voice is genuinely editorial/authoritative, not plainspoken-trade. |
| `playful-chunky-consumer` | Doggy Detail archetype | Chunky rounded sans (Grandstander / Poppins Bold 900) + Work Sans body | Candy palette (pink+teal / orange+yellow / etc) + white | 8-10 | Pet services, kids activities, party / event, anything consumer-playful. Membership framing common. |
| `premium-design-build` | Be The Anomaly (Kingswood Landscape — outlier) | Restrained serif (Libre Caslon / Cormorant) + sans body OR all-lowercase geometric sans | Black + cream + gold accent OR muted earth tones | 10-12 | $50K+ design-build firms, luxury remodels, high-end architecture/landscape. Real commissioned photography required. |

## How to pick (Designer Brain decision tree)

Run the `brand-archaeology.md` **Stage 7 — Fit signals** classifier first (service_model / price_point / visual_temperament / brand_maturity). Then use this tree:

```
Is the vertical pest / demolition / hauling / concrete / industrial / most roofing?
  → rugged-industrial (default)
  → UNLESS the client's logo + brand heritage is strong enough for contractor-heritage

Is the client's brand name a genuine archetype (Volt Vikings, Valkyrie, Patriot, Professor)?
  → archetype-mascot

Is the vertical pool / outdoor living / landscape / concrete-luxe, AND the client has drone-aerial photography?
  → dfw-luxe-aerial

Is the vertical roofing / plumbing / HVAC / general contractor with preserved logo equity and SEO-first funnel?
  → contractor-heritage

Is the vertical dental / medical / legal / financial / wellness / heritage-family-practice?
  → editorial-serif

Is the client consumer-playful (pets / kids / party / events)?
  → playful-chunky-consumer

Is the client $50K+ design-build with commissioned photography?
  → premium-design-build
```

Only one preset per demo. No blending.

## The preset spec (what "pick a preset" actually commits to)

Each preset is a locked bundle. When Designer Brain picks `rugged-industrial`, they commit to ALL of these at once:

### `rugged-industrial`

**Reference builds:** `autopilot/examples/` Richardson-rebuild (to ship), 180 Sites' Haro Electric, Rockin Rugged Industrial template.

- **Display face:** Saira Condensed 800-900 OR Oswald 700-800 OR Teko 700. UPPERCASE. Tracking +0.02em.
- **Body face:** Inter 400-600 OR Manrope 400-500.
- **Eyebrow:** same as display, smaller, tracking +0.15em, 12-14px.
- **Data/price:** IBM Plex Mono 400-600 OR JetBrains Mono.
- **Heading size (desktop):** H1 80-120px, H2 48-64px, H3 28-32px.
- **Palette:** dark navy or true black as primary surface, ONE high-sat accent (red / amber / lime / cyan), off-white or sand for light surfaces. 4 colors max.
- **Button primary:** solid accent bg, dark text, 0px radius, hard `shadow-[4px_4px_0px_#000]` on hover, uppercase Oswald 700 label with icon prefix.
- **Button secondary:** 2px border of dark on transparent, fills dark on hover with accent text.
- **Icon system:** two-tone custom SVG (dark stroke + accent fill on one element) OR single-tone at 1.75-2px stroke. Never lucide-as-is.
- **Section rhythm:** hero → trust stat band (solid color) → services 3-4 cards → why us → review pull quotes → service area → process 3-step → FAQ → CTA. 8-10 sections.
- **Transitions:** angled wedge `clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 100%)` with accent hairline top border, applied on every dark-to-light transition.
- **Motif approach:** one committed motif from the logo or brand. Used in eyebrow + button icon + service card corner + watermark (3-5 placements).
- **Photography treatment:** grayscale(60-80%) + contrast(1.1-1.2) unify. Crew photos + real trucks + real client sites beat stock every time.
- **Don't do:** serif display, pastel palette, airy whitespace, rounded everything, editorial prose blocks.

### `archetype-mascot`

**Reference builds:** 180 Sites Volt Vikings, Valkyrie Wraps, Patriot Illumination.

- **Display face:** Poppins 800-900 OR Montserrat 800-900 OR Orbitron 800 OR Bebas Neue 400. UPPERCASE. ALL CAPS is signature — don't soften to title case.
- **Body face:** Open Sans 400-600 OR Montserrat 400.
- **Heading size (desktop):** H1 90-120px (stacked 3 lines), H2 56-80px.
- **Palette:** brand-narrative keyed to the archetype. Volt Vikings = navy + amber + lime on white; Patriot = navy + red + cream; Professor Pressure = white + burnt orange + charcoal. 4-5 colors.
- **Button primary:** full accent bg, uppercase 700, 4-8px radius, subtle lift on hover.
- **Section rhythm:** hero (with mascot illustration visible) → trust bar → services grid → archetype story ("Why the Vikings?") → reviews → service area → FAQ → CTA.
- **Motif approach:** the archetype IS the motif. Illustrated (not photographic), used 6+ places. Custom illustration work.
- **Photography treatment:** mascot illustration in foreground, real client photo desaturated in background — layered.
- **Don't do:** half-commit to the archetype. If it's Volt Vikings, the mascot is EVERYWHERE. If it's half-there, kill it entirely.
- **Qualification:** requires client name that supports it. "ABC Electric" doesn't work. "Volt Vikings" does.

### `dfw-luxe-aerial`

**Reference builds:** Be The Anomaly's Anomaly Pool, Salas Concrete, Kingswood Landscape.

- **Display face:** Bebas Neue 400-500 (yes, 400-500 — BtA uses regular weight). Title case (not UPPERCASE).
- **Body face:** Work Sans 400-500 OR Inter 400-500.
- **Heading size (desktop):** H1 70-80px (title case, not ALL CAPS).
- **Palette:** single jewel tone — cyan `#4CA8DE` (pool), crimson `#A91D3A` (outdoor living), forest + gold (landscape), purple (locksmith) — on navy `#1a1f2e` base + white. Alternate dark/light bands roughly 50/50.
- **Button primary:** 6-8px radius, chunky `0 5px 0 0` offset solid shadow, labels like "Get a Free Quote" / "Request A Free Estimate".
- **Section rhythm:** hero (drone aerial + inline reviews pill) → services card grid → about with founder portrait → gallery → process → reviews with Google 5-star badge → inline form → service area → FAQ → CTA. 10-12 sections.
- **Hero specifics:** full-bleed drone-aerial shot of the client's actual work / property. Title-case H1 with ONE noun color-painted or block-highlighted in the accent. Google 5-star pill with overlapping review avatars inline.
- **Motif approach:** minimal motif — the logo + one accent shape (diagonal stripe, hexagon, wave). Less is more.
- **Photography treatment:** full-color, heavily color-graded aerials. Sharp, contrasty.
- **Don't do:** stock aerials, invented palettes, ALL CAPS headlines, cartoon mascots.
- **Qualification:** requires real aerial/drone photography available OR will be commissioned.

### `contractor-heritage`

**Reference builds:** Hook Agency's Bears Plumbing, B&M Roofing, TopDog HVAC.

- **Display face:** client's heritage face PRESERVED. If their current site uses Knockout (Bears Plumbing), keep it. If Roboto Condensed 800, keep it. If Uniform Bold, keep it. Only replace if truly generic (Arial / default sans).
- **Body face:** Museo Sans 400-500 OR client's current body face if it has equity.
- **Heading size (desktop):** H1 60-90px UPPERCASE typically.
- **Palette:** preserved client palette. Don't invent. Bears = red + black. B&M = blue + white. TopDog = gold + black.
- **Button primary:** solid client-accent bg, white text, pill radius (24px), uppercase 700, white-circle-right-arrow icon on the right edge (Hook's signature move).
- **Section rhythm:** dark promo bar above nav → hero with inline 3-step quote form in right rail → 4-icon trust band (LOCAL / WORKMANSHIP / UPFRONT / ON-TIME) → services with SEO-heavy content → about → before/after gallery → reviews with Google badge → financing callout (roofing) OR coupon grid (plumbing/HVAC) → service area map → long-form FAQ → CTA. **12-15 sections, SEO-dense.**
- **Hero specifics:** split layout — photo left (real crew + truck), inline quote form floating right rail with 3 simple fields. Google reviews pill with overlapping avatars inside the hero.
- **Motif approach:** ink-splatter / diagonal-slash / heritage-crest — whatever the client has equity in. Preserve, don't invent.
- **Photography treatment:** real crew photos, real trucks, real client job sites. No stock. No drones unless it's that kind of project.
- **Don't do:** strip the client's heritage face, invent a new palette, go minimal.
- **Qualification:** client has existing logo + brand equity worth preserving; SEO matters; content-heavy pages OK.

### `editorial-serif`

**Reference builds:** Red Rock Family Dentistry (Gemini build).

- **Display face:** Fraunces 800-900 (opsz 144) OR Merriweather 900 OR Playfair Display 900.
- **Body face:** Inter 400-500.
- **Eyebrow:** Inter 600 uppercase 12px tracking-widest, with small motif icon prefix.
- **Heading size (desktop):** H1 56-80px (more restraint than rugged-industrial).
- **Palette:** warm sand/off-white (never pure white), logo-derived accent (crimson / amber / olive), ink neutrals. 6-8 tokens.
- **Button primary:** solid accent bg, 4-6px radius, subtle shadow. Hover darkens or adds outline.
- **Section rhythm:** hero (full-bleed photo or split composite) → stats band → about (founder / team) → services → team grid → reviews → service area → insurance/plans → FAQ → CTA → footer. 10-12 sections.
- **Motif approach:** elegant motif from logo/heritage (spire, flourish, crest). Used subtly — watermarks + eyebrow icons.
- **Photography treatment:** warm tones, slight desaturation, natural light. Real team photos.
- **Don't do:** aggressive condensed display, ALL CAPS, harsh palettes, hard shadows.
- **Qualification (critical):** client voice must be genuinely editorial/authoritative. Dental, medical, legal, financial, wellness, heritage. **If the client's voice is plainspoken-trade, use rugged-industrial instead.**

### `playful-chunky-consumer`

**Reference builds:** Doggy Detail archetype (in-library).

- **Display face:** Grandstander 700-900 OR Poppins 900 OR Fredoka 700. Chunky rounded.
- **Body face:** Work Sans 400-500 OR Inter 400.
- **Palette:** candy — pink+teal / orange+yellow / bright-blue+coral. 4-5 colors plus white.
- **Button primary:** fully rounded pill (999px radius), big chunky label, accent bg, hover scale(1.05).
- **Section rhythm:** hero with mascot/photo → membership/pricing cards → services → team → reviews → FAQ → CTA. 8-10 sections.
- **Motif approach:** mascot-adjacent (paw print, bone, star) used playfully.
- **Photography treatment:** bright, saturated, real subjects (dogs, kids, customers).
- **Don't do:** take itself too seriously, use serifs, use dark backgrounds except as accents.
- **Qualification:** consumer-playful brand. Pet services, kids, party, events.

### `premium-design-build`

**Reference build:** Kingswood Landscape (BtA outlier).

- **Display face:** Libre Caslon 900 OR Cormorant Garamond 700 OR all-lowercase geometric sans.
- **Body face:** Inter 400 OR Work Sans 400.
- **Palette:** black + cream + muted gold / earth tones. Restrained.
- **Button primary:** square (0px radius) or pill, dark on cream OR outlined, restrained.
- **Section rhythm:** hero (commissioned photo) → philosophy statement → portfolio gallery → process → team → press/awards → contact. 8-10 sections.
- **Motif approach:** monogram or crest. Minimal.
- **Photography treatment:** architectural, sharp, commissioned.
- **Don't do:** aerial-drone (unless genuinely bespoke), loud palettes, chunky shadows, consumer energy.
- **Qualification:** $50K+ average project, commissioned photography available, design-build/luxury positioning.

## Preset selection must be documented in design-spec.md

Designer Brain's design-spec.md MUST include near the top:

```markdown
## Preset selected: <preset-name>

### Why this preset fits
<2-3 sentences citing the brand archaeology Stage 7 fit signals>

### Why other presets were ruled out
<1 line each for 2-3 adjacent presets the reader might expect>
```

This forces the decision to be explicit and debatable.

## Don't-blend rule

Pick one preset. Commit. Don't mix rugged-industrial display type with editorial-serif palette warmth. The result reads as "designed by committee."

Exception: the PHOTOGRAPHY TREATMENT and MOTIF ICON may be adjusted per client as long as the dominant preset character stays intact.

## Reference portfolio docs (read these for examples)

- `inspiration/180sites-portfolio-dna.md` — 6 deep-dives across `rugged-industrial` + `archetype-mascot`
- `inspiration/betheanomaly-portfolio-dna.md` — 6 deep-dives across `dfw-luxe-aerial` (+ the Kingswood outlier for `premium-design-build`)
- `inspiration/hookagency-portfolio-dna.md` — 5-7 deep-dives across `contractor-heritage`

## The failure mode this prevents

Before this doctrine: "Richardson Pest is family-owned + established, so Gemini reads 'premium authority' and picks Merriweather 900 serif." Result: dentist-grade editorial type on a scorpion-hunting brand.

After this doctrine: "Richardson Pest vertical = pest control, voice = plainspoken-trade, brand maturity = partial-anchor. Decision tree → `rugged-industrial`. Locked: Oswald 800 display, Inter body, Rockin rhythm, 0-radius amber buttons with hard shadows. Matches what Hook Agency / 180 Sites would build."

## History

- April 2026 — doctrine added after the Richardson Pest rebuild exposed Gemini's serif default. Built from 180 Sites / Be The Anomaly / Hook Agency portfolio recon + the four prior demo runs (Prestige / Bugs Weeds / Red Rock / Richardson).
