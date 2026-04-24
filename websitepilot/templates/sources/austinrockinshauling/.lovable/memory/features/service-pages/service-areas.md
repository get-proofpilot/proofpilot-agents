---
name: Service Area Pages (West & East Valley)
description: Two regional landing pages built from a shared ServiceAreaPage component covering West Valley (12 cities) and East Valley (14 cities) with FAQ + LocalBusiness schema
type: feature
---
Two service area pages live at `/service-areas/west-valley-phoenix-az` and `/service-areas/east-valley-phoenix-az`, both built from a shared `src/pages/ServiceAreaPage.tsx` component and passed region-specific data from `WestValleyServiceArea.tsx` / `EastValleyServiceArea.tsx`.

Layout (mirrors site service-page architecture):
1. Hero with custom region image (`west-valley-hero.jpg` sandy desert / `east-valley-hero.jpg` red caliche), dark gradient overlay, H1, dual CTAs (Free Estimate + Call).
2. Intro paragraph block — region positioning + soil context.
3. "What We Do In The {Region}" — 4-card grid linking to the four core service pages (Dump Trailer, Demolition, Dirt Work, Skid Steer) with region-specific descriptions (West = sandy/easy, East = caliche/heavy).
4. "Cities We Serve" — 2-column grid of cards. Each city: H3, 1–2 paragraphs, Common Projects / Zip Codes / Notable Areas footer. West has 12 cities, East has 14.
5. "{Region} At A Glance" — dark section with red-header table (City / Population / Growth / Soil / Top Projects) and red CTA banner footer.
6. "On The Map" — `ServiceAreaMap` embed + city link grid + cross-link to sibling region.
7. FAQ accordion (6 Qs each) with hover-red transition + sibling-region link below.
8. `ServiceQuoteCTA` reused from other service pages.

SEO: react-helmet-async sets unique title/meta/canonical per region. Two JSON-LD blocks emitted: FAQPage (built from FAQ array) and LocalBusiness (areaServed array of city objects).

Header navigation: the previous "Service Areas" placeholder link in `Header.tsx` is replaced by a hover dropdown (desktop) and accordion (mobile) listing West Valley and East Valley. Independent `isAreasOpen` state controls the mobile accordion.
