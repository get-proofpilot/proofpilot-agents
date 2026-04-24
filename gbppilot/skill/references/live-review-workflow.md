# Live GBP Review Workflow

Use this when inspecting a Google Business Profile without a direct GBP API.

## Goal

Capture the live surface as a human searcher would see it, then separate what is truly visible from what is only recommended or inferred.

## Best browser pattern

Prefer a Google Maps search URL over a normal Google web search:

`https://www.google.com/maps/search/<business+name+city>`

This is more reliable than standard Google results pages, which often trigger anti-bot checks.

## What to capture

From the visible listing, note:
- display business name
- visible primary category
- star rating
- review count
- latest visible post age if shown
- approximate number of visible owner posts in the last 30 to 60 days when possible
- whether products appear, and approximately how many are visible
- whether a services list appears, and the exact visible service labels if it does
- whether the service list looks duplicated, bloated, thin, or well grouped
- visible areas served or service-area cues
- obvious photo quality or completeness issues
- whether Q and A appears active or empty
- whether the listing looks storefront or service-area oriented

## Browser workflow

1. Open the Maps search URL in the browser tool.
2. Use `browser_snapshot` to capture the accessible text.
3. Use `browser_console` or `browser_vision` if the visible text is incomplete.
4. If the panel shows Posts, Products, Services, or Areas served buttons or sections, click into them and capture what is visible.
5. If the panel shows a local-post section, capture the relative age text and count any posts visible without guessing at hidden history.
6. Record what is actually visible. Do not invent hidden fields.

## How to write service findings

When a public services list is visible:
- capture the exact labels first
- note duplicates, messy capitalization, or obvious overlap
- collapse the list into clean canonical service clusters for strategy purposes
- do not claim that the public list proves the exact backend structure, only that these labels are publicly visible

## How to write product findings

When products are visible:
- count the visible products if feasible
- note whether they look like hero offers or weak filler
- note whether images, descriptions, and calls to action are strong or underbuilt

If no products are visible, say that plainly. For most local service businesses, that is usually a missed opportunity.

## How to write post findings

When posts are visible:
- count the posts you can see in the last 30 to 60 days
- note the newest visible post age
- identify whether the posts are offers, updates, proof-of-work, or thin filler

When posts are not visible:
- label the post layer as not visible in the public view
- if the surface looks empty, state that no visible posts were found in the inspected view

## How to write area-served findings

When Areas served is visible:
- capture the exact cities, zip codes, neighborhoods, or districts shown
- compare them against the real service area suggested by the website and business positioning
- flag if the list is missing obvious core cities or padded with odd micro-areas that do not match the website strategy

## Notes to store

Always separate:
- **confirmed**: directly visible in Maps or profile text
- **likely**: inferred from the website or profile presentation
- **recommended**: the right strategic setup even if current backend proof is unavailable
- **missing / not visible**: cannot be confirmed live

## Good evidence examples

- "Visible category: Electrician"
- "72 reviews, 4.9 stars"
- "Latest owner post visible as 6 days ago"
- "No visible posts found in the inspected public view"
- "No visible products carousel"
- "Public services list is visible but contains duplicates and overlapping labels"
- "Areas served list includes Mesa, Gilbert, and Chandler, but does not show Scottsdale even though the website targets it"
- "Photos look mostly stock and do not show the team"

## Cautions

- Do not claim you verified backend GBP settings that are not visible publicly.
- Do not assume unanswered reviews if review replies are not visible in the current interface.
- Do not confuse website pages with GBP services or products.
- Do not assume the visible services list is the full backend services taxonomy.
- If Google blocks the session or only gives a limited view, mark the live profile portion as partially unverified and continue with website and competitor research.
