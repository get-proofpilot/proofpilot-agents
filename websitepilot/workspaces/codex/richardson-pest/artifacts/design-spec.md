# Design Spec

## Style family

`heroic-branded-conversion`

## Brand tokens

- `--obsidian`: `#0b0b0a`
- `--charcoal`: `#303030`
- `--ink`: `#151512`
- `--amber`: `#ffc000`
- `--gold`: `#ffd75a`
- `--paper`: `#f7f1e3`
- `--bone`: `#fffaf0`
- `--sage`: `#b6b38b`

## Typography

- Display: `Bebas Neue`
- Body: `Manrope`
- Accent: `Barlow Condensed`

The current site uses Lato, Birdseye, Playfair Display, Montserrat, and Open Sans. The demo should elevate away from the Weebly feel while still fitting the badge-like RPM logo. Display typography can be tall and urgent. Body copy should stay warm and readable.

## Layout requirements

- Sticky top contact bar on mobile and desktop.
- Hero with real service photo, dark overlay, amber CTA, service-area chips, license/Saturday proof, and a visible Richardson logo.
- Founder/family safety story within the first two sections.
- Service grid with 6-8 cards, each using verified service names.
- Process section with Home Evaluation, Pest Control Service, Regular Exterminating.
- Safety section using the pyrethrin/pet/child/environment-safe claims from the live site.
- Service area band listing Chandler, Gilbert, Queen Creek, Mesa, Tempe, San Tan Valley, Scottsdale, Ahwatukee, Sun Lakes, Gold Canyon, and Apache Junction.
- Closing CTA with phone number and small form mockup.

## Visual mechanics

- Repeating amber stinger line or angled stripe as the signature motif.
- Card corners can be clipped or angled.
- Use authentic photos with heavy cropping and overlays to overcome low resolution.
- Avoid stock imagery, generic insect illustrations, and unrelated custom assets.
- Keep motion subtle: load-in, hover lift, tactile button movement.

## Copy rules

- Defensible claims only.
- Use "same-day exterminating now available" because it appears on the live site.
- Use "father-son owned and operated" because it appears on the live site.
- Use "come back for free between regular pest services" only in the context stated by the site.
- Do not invent awards, ratings, or review counts.

## QA gates

- `npm run build` must pass.
- Desktop and mobile screenshots must be captured.
- Mobile CTA must remain visible and tappable.
- Logo removal test must pass through palette, copy, service-area specificity, and scorpion/family-safety motif.
