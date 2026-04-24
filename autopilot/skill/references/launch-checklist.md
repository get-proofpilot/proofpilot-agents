# Launch Checklist — Pre-Ship Verification

> The 23+ item checklist every demo must pass before `deploy-preview.sh`. Codified from Matthew's Blueprint v2.0 final checklist, extended with design/copy/technical items from the full doctrine.
>
> Automated via `scripts/audit-launch-checklist.sh <demo-dir> --brand /tmp/<client>/brand-brain.json` which runs checks that can be automated and flags manual-verify items.

---

## Blueprint — 14-section compliance

- [ ] **1. Navigation Bar** — logo left, phone number + Quote button in nav, mobile shows logo + CTA + menu icon only
- [ ] **2. Hero Section** — has SEO tagline + Big Headline (service + city) + reviews + license + contact form above fold + real team/crew photo + work photo
- [ ] **3. Before/After** — at least 2 case studies with before + after + city
- [ ] **4. Reviews** — multi-platform (Google + Facebook + Yelp or similar), star ratings displayed, count displayed, featured quotes
- [ ] **5. Trust Badges + Numbers** — at least 3 stats (years, jobs, reviews) + at least 2 badges (BBB / Google Guaranteed / license verification / manufacturer certs)
- [ ] **6. Why You** — 3-5 benefits (not features), each addresses a specific customer fear
- [ ] **7. How It Works** — 3-4 step process, each step 3-6 words
- [ ] **8. Services** — every service on homepage, each hyperlinked to its own page
- [ ] **9. About + Team** — owner photo + team photos + founder story + company values
- [ ] **10. FAQs** — 5-8 Q&As + FAQ schema markup applied
- [ ] **11. Offers** — at least one offer (seasonal / first-time / financing / bundle)
- [ ] **12. Service Areas** — service-areas hub + each city has own page, linked from homepage
- [ ] **13. Video/Social** — if client has content, embedded (IG feed / testimonials / walkthroughs)
- [ ] **14. Footer** — complete NAP + license + hours + social + service links + trust badges

---

## SEO compliance

- [ ] XML sitemap at `/sitemap.xml`
- [ ] `robots.txt` allows full crawl
- [ ] H1 on every page has main keyword + city
- [ ] Meta titles < 60 chars on every page
- [ ] Meta descriptions < 160 chars on every page
- [ ] `<link rel="canonical">` on every page
- [ ] LocalBusiness schema with complete NAP + hours + geo + aggregateRating
- [ ] Service schema on each service page
- [ ] FAQPage schema on FAQ sections (any section with 3+ Q&As)
- [ ] URL structure matches convention (`/service-name`, `/service-areas/city`, `/service-city`)
- [ ] Alt text on every image (keyword when relevant)
- [ ] Internal linking: service pages link to related services + related city pages
- [ ] Open Graph tags + Twitter Card meta on every page

---

## Technical + performance

- [ ] `npm run build` passes with zero TS errors
- [ ] Bundle JS < 500 KB (gzipped < 150 KB target)
- [ ] Page load < 3s on Lighthouse mobile test
- [ ] Mobile responsive — tested at 390px (iPhone 12/13) + 768px (tablet) + 1440px (desktop)
- [ ] GA4 measurement ID wired (placeholder if client doesn't have one yet)
- [ ] Google Search Console verification tag in `<head>` (or placeholder comment)
- [ ] Favicon.png + apple-touch-icon.png present (scrub-template.sh handles this)
- [ ] OG image present (1200×630, logo + tagline — scrub-template.sh handles this)

---

## Design compliance (from the 3 pillars + presets)

### Cohesive
- [ ] Palette matches the preset's locked tokens (no off-preset colors slipped in)
- [ ] Typography matches the preset's locked stack (no serif on rugged-industrial, no cliche sans on editorial-serif)
- [ ] Photo treatment consistent — grayscale/duotone/tint unified across authentic photos
- [ ] Brand personality passes "remove the logo" test

### Detail
- [ ] Custom icons (not lucide-default) in service cards / trust bar / process steps
- [ ] Motif SVG used in 6+ places
- [ ] Section transitions consistent (preset's signature applied throughout, not mixed)
- [ ] Button discipline — primary/secondary/tertiary styles consistent, correct radius for preset

### Dynamic
- [ ] Section rhythm varies (not stacked identical blocks)
- [ ] Reveal-fallback CSS injected (from website-brain-scaffold.md)
- [ ] Hover micro-interactions on buttons + cards
- [ ] Scroll-triggered reveals working (IntersectionObserver + fallback)

---

## Copy compliance (from copywriting-playbook.md)

- [ ] Hero uses one of 7 approved formulas
- [ ] CTA buttons use approved phrases (not "Learn More" / "Click Here")
- [ ] Why You is benefits not features, with concrete numbers
- [ ] Before/After captions follow `[City]: [Problem]. [Solution].` format
- [ ] Reviews show first name + city + platform + stars
- [ ] Trust numbers have 2-4 word labels
- [ ] About leads with founder first name + year + specific moment
- [ ] FAQ answers are 1-3 sentences, direct-first
- [ ] Offers lead with a number
- [ ] No third-person language ("we" not "our company")
- [ ] No filler adjectives without proof ("quality" / "professional" / "reliable")
- [ ] Voice register matches preset

---

## Pre-deploy final

- [ ] Run `scripts/scrub-template.sh` (Lovable stripped, real logo + favicon + OG landed)
- [ ] All 14 blueprint sections present in built dist
- [ ] Stage 6a Playwright "remove the logo" test passes 5/5
- [ ] Stage 6b Gemini Flash Vision QA scored 8+/10 with Must-fix empty
- [ ] `deploy-receipt.json` will capture canonical URL

---

## Why this exists

A website that misses a hero phone number is less valuable than a website that has one. A website that misses a license # misses a trust-build moment. A website with a weak Why You section loses the deal it could have won.

**The checklist is a quality floor.** Every item catches a specific failure mode Matthew's seen in the wild. Run it. Pass it. Ship it.
