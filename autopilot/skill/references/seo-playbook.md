# SEO Playbook — Home Service Rank Strategy

> How every WebsitePilot demo ships SEO-ready from day one. Paired with `home-service-blueprint.md` (the WHY/WHAT) — this doc is the HOW of ranking. Every demo must satisfy this playbook before Stage 7 deploy.

---

## The rank premise

A beautiful website is useless if nobody finds it. Most home service sites miss the SEO piece entirely — they might have the design right, but they leave **money on the table** because the rank layer isn't built in.

**Service pages and location pages are where you see the most value for ranking.** If you're not building these, you're shipping a pretty picture, not a growth system.

---

## Keywords — where they live

### In the H1 headline (load-bearing)

Main keyword + city = H1 on every service page, every location page, every service+city combo page, and the homepage.

| Page type | H1 formula | Example |
|-----------|-----------|---------|
| Homepage | `#1 [Service] in [City]` OR `[Service] in [City] — [USP]` | `Junk Removal in Mesa — Same-Day Service Since 2011` |
| Service page | `[Service Name] in [City]` | `Termite Control in Mesa, AZ` |
| Location page | `[Primary Service] in [City]` | `Pest Control in Chandler` |
| Combo page | `[Service] in [City]` | `Scorpion Removal in Queen Creek` |

### In H2/H3 (supporting variations)

H2 + H3 subheads carry variation and long-tail keywords:
- H2: `Same Day [Service] Service` (variation)
- H2: `Residential and Commercial [Service]` (long-tail)
- H3: `What's Included in Our [City] [Service]?` (question-form long-tail)

### In body copy (natural density)

- 1-2 keyword mentions per 100 words (natural)
- City mentioned 3-5 times per page
- Long-tail variations peppered in (not stuffed)

---

## The service-page strategy (Google ranks pages, not websites)

Your competitor with 30 service pages will outrank you with 3. Every service you offer gets its own dedicated page. No combining services.

### Each service page = a mini 24/7 salesperson

Required 9 elements:

1. **Clear H1** — Service name + city in main headline
2. **Hero with CTA** — contact form or phone above the fold
3. **What We Handle** — specific items/problems solved (list)
4. **Your Process** — step-by-step breakdown of how the job works
5. **Pricing Info** — transparent ranges OR "starting at" prices
6. **FAQ Section** — 5-8 real questions customers ask
7. **Service Reviews** — testimonials specific to this service
8. **Related Services Internal Links** — cross-link to related offerings
9. **Related Location Pages Internal Links** — link to city pages where this service is offered

---

## The location-page hierarchy

This is how you rank when someone searches `[service] in [city]`.

```
Service Areas Hub (/service-areas)
   ├─ Region Pages (/service-areas/east-valley, /service-areas/west-valley)
   │   ├─ City Pages (/service-areas/mesa, /service-areas/chandler, /service-areas/gilbert, ...)
   │   │    └─ Embedded service+city combo anchors OR standalone combo pages
```

### Each location page needs

- **Unique content per location** — no copy/paste between cities
- **Local references + landmarks** ("...from Mesa's Falcon Field to Downtown")
- **Embedded Google Map** — with service-area polygon if available
- **Reviews filtered to customers in that city** (if reviews are tagged)
- **H1: `[Primary Service] in [City]`**
- **Internal links** back to service hub pages + related city pages

### Service + City combo pages — the money pages

These target high-intent searches: `junk removal mesa`, `scorpion control chandler`, `roof repair scottsdale` — someone searching that keyword is ready to hire TODAY.

**Growth math:** 5 main services × 8 cities = **40 combo pages**, each targeting a $50-$500/month keyword your competitors might not be going after.

URL: `yoursite.com/[service]-[city]` — e.g., `/junk-removal-mesa`, `/scorpion-control-queen-creek`.

Content requirements:
- H1: `[Service] in [City]` (exact-match keyword)
- Hero with form or CTA
- Section calling out **city-specific problems** — "Mesa's bark scorpions thrive in..." / "Chandler's bermuda-grass yards require..."
- Reviews from that city if available
- City map with service-area polygon
- Pricing or "starting at" range
- Internal links to related services + related cities

---

## Schema markup — how AI + Google see you

Schema.org JSON-LD is the code that tells Google + AI platforms who you are, what you do, where you are. It's how your info shows up in search results WITH stars, hours, contact info.

### Required schema types per home service site

| Schema type | Purpose | Where to apply |
|-------------|---------|----------------|
| **LocalBusiness** | Core business info — name, address, phone, hours, geo | Homepage + Contact page |
| **Service** | Each service you offer | Each service page |
| **FAQPage** | FAQs appear directly in SERP with accordion | Every page with 3+ FAQs |
| **Review** / **AggregateRating** | Stars in search results | Homepage + service pages + location pages |
| **GeoCoordinates** / **AreaServed** | Your service-area boundaries | LocalBusiness schema + location pages |
| **Product** (optional) | For pricing/financing offers if applicable | Offers/pricing sections |

### Template-level LocalBusiness schema

Every clone ships with a `public/schema.json` or inline `<script type="application/ld+json">` in `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{{CLIENT_NAME}}",
  "image": "{{LOGO_URL}}",
  "@id": "{{SITE_URL}}",
  "url": "{{SITE_URL}}",
  "telephone": "{{PHONE}}",
  "priceRange": "{{PRICE_RANGE}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{STREET}}",
    "addressLocality": "{{CITY}}",
    "addressRegion": "{{STATE}}",
    "postalCode": "{{ZIP}}",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{LAT}}",
    "longitude": "{{LNG}}"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "07:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "{{FACEBOOK_URL}}",
    "{{GOOGLE_BUSINESS_URL}}",
    "{{INSTAGRAM_URL}}"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{RATING}}",
    "reviewCount": "{{REVIEW_COUNT}}"
  }
}
```

Website Brain MUST inject this with client data before Stage 7 deploy.

---

## URL structure conventions

| Page type | URL pattern | Example |
|-----------|-------------|---------|
| Homepage | `/` | |
| Service page | `/[service-name]` | `/scorpion-control` |
| Service areas hub | `/service-areas` | |
| Region page | `/service-areas/[region-slug]` | `/service-areas/east-valley` |
| City page | `/service-areas/[city-slug]` | `/service-areas/mesa` |
| Service+City combo | `/[service]-[city]` | `/scorpion-control-mesa` |
| Blog post | `/blog/[post-slug]` | `/blog/why-arizona-has-so-many-scorpions` |
| About | `/about` | |
| Contact | `/contact` | |

**All lowercase. Hyphens between words. No underscores. No capitals. No trailing slash.**

---

## Internal linking (the crawl map)

Every page links to related pages. This helps Google crawl + understand relationships.

| Source page | Links OUT to |
|-------------|-------------|
| Homepage | All main service categories · Service Areas hub · About · Contact |
| Service page | Related sub-services (3-5) · City pages where this service is offered (3-8) · Related blog posts |
| City page | Service hub pages (all main services) · Related city pages (neighbors) |
| Service+City combo page | Parent service page · Parent city page · Related combo pages |
| Blog post | Relevant service pages (natural in-body links) · About page |
| Footer (every page) | All main services · Service Areas hub · About · Contact · Privacy · Terms |

**Rule:** never 3+ clicks from homepage to any ranking page. Service pages 1 click away. City pages 2 clicks at most.

---

## Technical basics (non-negotiable)

The launch-checklist.md enforces these. Summary:

- [ ] XML sitemap (`/sitemap.xml`) submitted to Google Search Console
- [ ] robots.txt allows full crawl
- [ ] Google Analytics 4 installed
- [ ] Google Search Console connected
- [ ] Page load speed < 3s (Vite build already optimizes — just watch bundle size)
- [ ] Mobile-friendly (Tailwind responsive — verified in Playwright mobile viewport)
- [ ] Alt text on every image (with keyword when relevant)
- [ ] Meta titles < 60 chars
- [ ] Meta descriptions < 160 chars
- [ ] `<link rel="canonical">` on every page
- [ ] Open Graph tags (already handled by `scrub-template.sh`)
- [ ] Twitter Card meta
- [ ] `hreflang` only if multi-language (skip for single-language home service)

### Per-page meta formula

```html
<title>{{Service}} in {{City}} | {{Client Name}}</title>
<meta name="description" content="{{Benefit-forward one-liner}}. {{License # proof}}. {{Phone}} — {{CTA}}." />
<link rel="canonical" href="https://{{domain}}/{{path}}" />
<meta property="og:title" content="{{same as title}}" />
<meta property="og:description" content="{{same as description}}" />
<meta property="og:image" content="/og-image.png" />
```

Keep meta titles < 60 chars. Meta descriptions < 160 chars.

---

## Address the problems people actually search

Have a section per service page that calls out the specific pain points. When someone sees their exact problem on the page, they know you're the solution.

Examples:
- "Garage full of junk you need gone?"
- "Dealing with an old deck that needs to come down?"
- "Need construction debris hauled from your job site?"
- "Estate cleanout after a loved one passed?"

These triple-duty:
1. Conversion — reader sees themselves, feels understood
2. SEO — long-tail keyword capture
3. Structured data — FAQ schema can wrap these problem-statement sections

---

## Per-preset SEO considerations

| Preset | SEO consideration | Recommended vertical patterns to layer |
|--------|-------------------|----------------------------------------|
| `contractor-heritage` | 12-15 sections is RIGHT for SEO (Hook's signature is content-heavy pages) | FAQLongFormSEO, CouponsGrid, FinancingCallout |
| `rugged-industrial` | Needs BEFORE/AFTER + comparison table for trust | ConcreteBeforeAfterDragger, ConcreteVsTraditionalCompare |
| `archetype-mascot` | Mascot can carry UI but SEO still needs real H1+service pages | TrustBarAllCaps + vertical process patterns |
| `dfw-luxe-aerial` | Luxury — fewer CTAs, more portfolio | GalleryMasonryAerials + LandscapeDroneReelGrid |
| `playful-chunky-consumer` | Consumer-playful can sacrifice some SEO density for vibe | MarqueeBar + MembershipCardsPlayful |
| `editorial-serif` | Dental/medical/legal → YMYL content, needs credibility schema | AboutPhilosophy + EditorialQuoteBlock |
| `premium-design-build` | Portfolio-first, CaseStudy schema required | ProjectCaseStudyGrid + AwardsPressRow |

---

## History

- 2026-04-24 — playbook codified from Matthew's Blueprint v2.0 SEO section + operationalized against the existing clone + pattern library.
