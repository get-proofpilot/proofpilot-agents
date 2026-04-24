# The Home Service Website Blueprint — ProofPilot Operating Framework v2.0

> The master doctrine for every WebsitePilot / AutoPilot run. This is what turns a design-first clone template into a **website that ranks AND converts**. Every demo Website Brain ships must satisfy this blueprint or it's a template skin, not a deliverable.
>
> Source: Matthew Anderson's internal ProofPilot Strategy Framework v2.0 (December 2025), codified here as operational doctrine.

---

## The operating constants

**The Goal:** Make people trust you enough to pick up the phone.

**The Strategy:** Put your face on it, show your work, prove you're worth it.

**The Result:** A website that works 24/7 and brings in real leads.

A website that makes money does exactly two things:
1. **It ranks.** People find you when they search for what you do.
2. **It converts.** When people land on it, they pick up the phone or fill out the form.

If the site isn't doing both, it's not a deliverable — it's an expensive business card nobody sees.

## What every website must do (three non-negotiables)

1. **BUILD TRUST** — make them believe you're legit and worth the money
2. **REMOVE FEAR** — kill the worry that they're going to get screwed
3. **GET THE CALL** — make it stupid easy for them to contact you right now

---

## The canonical 14-section wireframe

Order matters. People scroll in a predictable pattern. You hit them with the right thing at the right time.

| # | Section | Primary purpose | Clone/pattern source |
|---|---------|-----------------|---------------------|
| 1 | **Navigation Bar** | Contact + trust signals above the fold on every page | Every `ref-*` clone has Header.tsx |
| 2 | **Hero Section** | 3-second trust + convert window — THE make-or-break | Preset-specific Hero patterns |
| 3 | **Before/After (Show Your Work)** | Visual proof of transformation | `patterns/vertical/ConcreteBeforeAfterDragger.tsx` + variants |
| 4 | **Reviews and Proof** | Multi-platform social proof | `patterns/*/ReviewsWithGoogle5Star.tsx` + variants |
| 5 | **Trust Badges + Numbers** | Years, jobs, reviews, BBB, license, manufacturer certs | `patterns/*/TrustBar*.tsx` + `patterns/vertical/TurfPromoRibbonGuarantees.tsx` |
| 6 | **Why You (Benefits)** | 3-5 reasons to hire us over anyone else — addresses fears | `patterns/*/*Why*.tsx` |
| 7 | **How It Works (Process)** | 3-4 step process removes the unknown | `patterns/*/Process*.tsx` + `patterns/vertical/RoofingTeamLedProcess.tsx` |
| 8 | **Services** | Every service hyperlinked to its own page | `patterns/*/Services*.tsx` + `patterns/vertical/HvacThreeDoorEntry.tsx` etc |
| 9 | **About You and Team** | Faces + story = emotional choice | `patterns/*/About*.tsx` + `patterns/premium-design-build/TeamCraftsmanship.tsx` |
| 10 | **FAQs** | Answer objections + rank for long-tail (schema required) | `patterns/contractor-heritage/FAQLongFormSEO.tsx` |
| 11 | **Offers & Incentives** | Remove "I'll think about it" — seasonal / first-time / financing | `patterns/contractor-heritage/CouponsGridContractor.tsx` + `FinancingCallout.tsx` |
| 12 | **Service Areas + City Pages** | Every city its own page — SEO gold | `patterns/*/ServiceArea*.tsx` |
| 13 | **Video & Social Content** | Instagram embed, project walkthroughs, testimonials on video | TBD — add to pattern library when first demo uses |
| 14 | **Footer** | Final contact info + trust + crawlable links | Every `ref-*` clone has Footer.tsx |

**Every Website Brain run must verify each of these 14 sections is present in the built demo.** Missing sections = automatic fail on Stage 6b QA.

---

## Hero Section — the 3-second window

**Single most important part of the site.** Most people never scroll. This section alone makes or breaks conversion.

Required elements (ALL seven — no exceptions):

| # | Element | Purpose | Brand-Brain input |
|---|---------|---------|-------------------|
| 1 | **SEO tagline** — "#1 [Service] in [City]" | Helps rank + tells visitor they're in the right place | `practice_context.location` + `services` |
| 2 | **Big headline** — service + city + what you do | Clear. Direct. Main keyword + city | Hero copy formula in `copywriting-playbook.md` |
| 3 | **Reviews** — Google + Facebook + Yelp, stars + count + platform logos | Instant credibility | Brand Brain pulls current counts if available |
| 4 | **License number** — "Licensed & Insured \| #ROC123456" | Removes fear — proves you're real | `practice_context.certifications` + `license_number` |
| 5 | **Contact form** — name, phone, email, brief description (short) | Most leads come from here | Every preset clone has form-hero variant |
| 6 | **Team photo** — real photo of owner/crew, NOT stock | People want to see who they're hiring | `imagery.authentic_paths` from Brand Brain |
| 7 | **Work photo** — background image or slideshow of completed projects | Visual proof of work quality | `imagery.authentic_paths` from Brand Brain |

**"If you're trying to close $20,000 jobs, your hero section has got to look like you're worth $20,000."** Hero quality is a direct signal of job-size capacity. A $5K-job hero sells $5K jobs. A $20K-job hero sells $20K jobs.

---

## Section-by-section required elements

### 3. Before/After
Each case study requires: before photo (good quality, shows problem) · after photo (same angle, shows transformation) · what was wrong · what you did · city (local SEO).

### 4. Reviews
Google reviews with G logo + stars · Facebook reviews (second platform adds credibility) · review count displayed ("127 Five-Star Reviews") · featured review quotes with real names.

### 5. Trust Badges + Numbers
**Numbers:** years in business · projects completed · happy customers · total review count.
**Badges:** BBB · Google Guaranteed · License/Insurance verification · Manufacturer certs (GAF, Owens Corning) · Industry associations.

### 6. Why You
**Benefits, not features. Every benefit counters a specific fear.** 3-5 items max:
- Same-day service (solves problem fast)
- Free estimates (no risk to learn more)
- Upfront pricing (no surprises)
- Satisfaction guarantee (removes risk)
- Owner on every job (accountability)

### 7. How It Works
Simple 3-4 step process: call → quote → work → walkthrough. Removes the unknown, makes taking action low-risk.

### 8. Services
**Every service hyperlinked to its own page.** Google ranks pages, not websites. The homepage Services section is link bait for deep service pages.

### 9. About + Team
Owner photo (reputation on the line) · team photos (real people doing real work) · your story (why you started) · company values.

### 10. FAQs
Use **FAQ schema markup**. Good FAQ topics: cost · timeline · financing · licensed/insured · service areas · guarantee · quote process.

### 11. Offers
Seasonal specials · first-time customer discount · financing · referral bonuses · bundle deals. Removes "I'll think about it."

### 12. Service Areas
**Each city = its own page.** Hub page + region pages + city pages + service+city combo pages. 5 services × 8 cities = 40 long-tail SEO pages.

### 13. Video & Social
Instagram feed embed · project walkthroughs · process time-lapses · team introduction · customer testimonials on video (most powerful social proof).

### 14. Footer
Phone · email · address · hours · link to Services/About/Contact/Service Areas · license number · social · trust badges.

---

## The integrated pipeline — where each doctrine applies

```
Stage 1: Research (Claude + Playwright + Firecrawl)
  ├─ Use blueprint wireframe as checklist during competitor analysis
  └─ Output: research.md

Stage 2: Brand Brain (Claude)
  ├─ brand-archaeology.md — standard archaeology
  ├─ PLUS: fill blueprint-critical fields (license #, review counts per platform,
  │   authentic photos of owner+crew+work, service area cities, certifications)
  └─ Output: brand-brain.json

Stage 2.5: Style Family + Preset pick (Claude)
  └─ style-family-selector.md → style-presets.md → one of 7 presets

Stage 3: Designer Brain (Gemini 3.1 Pro subagent)
  ├─ Reads: design-patterns-catalog.md + home-service-blueprint.md (this doc)
  │   + seo-playbook.md + copywriting-playbook.md + preset-specific DNA
  ├─ Cites: specific ref-* clone + specific preset + vertical patterns
  ├─ HARD RULE: every design-spec must include a "Blueprint Coverage Matrix"
  │   mapping each of the 14 required sections to a concrete pattern/component
  └─ Output: design-spec.md

Stage 4: Website Brain (Claude subagent)
  ├─ init-from-clone.sh — preset-matched clone scaffold
  ├─ scrub-template.sh — Lovable strip + real logo + favicon + OG
  ├─ Brand-swap + compose patterns per design-spec
  ├─ HARD RULE: blueprint 14-section compliance
  └─ launch-checklist.md verification

Stage 5: Images (Claude + Recraft)
  └─ Apply photo treatment per preset + authentic-first

Stage 6a: Claude Playwright QA ("remove the logo" + blueprint checklist)
Stage 6b: Gemini Flash Vision QA loop
  └─ NEW: blueprint checklist is part of critique prompt

Stage 7: Deploy via deploy-preview.sh → demo.proofpilotapps.com/<slug>/
```

## The "Blueprint Coverage Matrix" — required in every design-spec

Every Designer Brain output must include this table:

| Blueprint section | Covered by | Implementation status |
|-------------------|------------|----------------------|
| 1. Navigation Bar | `components/Header.tsx` (from ref-clone) | Base + client CTA swap |
| 2. Hero Section | `patterns/<preset>/Hero*.tsx` + the 7 required hero elements | Critical — all 7 elements must land |
| 3. Before/After | `patterns/vertical/ConcreteBeforeAfterDragger.tsx` OR client authentic photos | Dependent on client's photo inventory |
| 4. Reviews | `patterns/*/ReviewsWith*.tsx` | Multi-platform required |
| 5. Trust Badges + Numbers | `patterns/*/TrustBar*.tsx` | Pull from Brand Brain certifications |
| 6. Why You | `components/WhyUs.tsx` (from ref-clone) | Benefits-not-features rule |
| 7. How It Works | `patterns/*/Process*.tsx` | 3-4 steps max |
| 8. Services | `components/Services.tsx` + each service hyperlinked | Must link to service pages |
| 9. About + Team | `components/About*.tsx` | Owner + crew photos mandatory |
| 10. FAQs | `patterns/contractor-heritage/FAQLongFormSEO.tsx` OR preset default | Schema required |
| 11. Offers | `patterns/contractor-heritage/CouponsGridContractor.tsx` OR FinancingCallout | Seasonal + first-time |
| 12. Service Areas | `components/ServiceArea*.tsx` + one page per city | City-page plan in sitemap |
| 13. Video/Social | Optional unless client has content | Client-content-dependent |
| 14. Footer | `components/Footer.tsx` (from ref-clone) | Base + client NAP + license |

Designer Brain's spec is rejected if this matrix has any section marked "N/A" without explicit justification.

## The failure modes this doctrine prevents

| Failure | Root cause | This doctrine enforces |
|---------|-----------|------------------------|
| "Site looks good but doesn't rank" | Missing H1 keyword+city, no schema, no service pages | Blueprint §SEO + `seo-playbook.md` |
| "Site ranks but nobody converts" | Weak hero, no phone in nav, no license, no reviews | Blueprint §Hero 7 required elements |
| "Nice design but feels like a template" | Missing Before/After, missing team photos, stock imagery | Blueprint §3 + §9 + authentic-first rule |
| "We'll think about it — never hears back" | No offers/financing, no guarantee, no urgency | Blueprint §11 + §6 Why You |
| "Can't find us for [city]" | Only homepage, no city pages | Blueprint §12 + location-page hierarchy |
| "Phone doesn't ring" | Form hidden, no CTA in nav, phone small | Blueprint §Navigation + Hero form above fold |

---

## Pillar integration (existing doctrine × blueprint)

| Matthew's inspo-guide 3 pillars | Blueprint enforces | Clone templates provide |
|--------------------------------|-------------------|-------------------------|
| **Cohesive** (color/typography/photo/brand personality) | Hero elements 1-2 + Trust badges consistent | Preset-locked palette + typography in every ref-* clone |
| **Detail** (custom icons/patterns/dividers/buttons) | Trust badges quality + CTA discipline | Pattern library + motif library |
| **Dynamic** (section layout/rhythm/movement) | 14-section rhythm hard rule | Section rhythm baked into clone templates |

## History

- 2026-04-24 — blueprint codified from Matthew's internal ProofPilot Strategy Framework v2.0. Integrates with existing `design-patterns-catalog.md` as the operational/strategic counterpart (design-patterns is the HOW, blueprint is the WHY and the MUST-HAVE).
