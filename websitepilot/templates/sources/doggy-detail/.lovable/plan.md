

# Pricing Section and Club Membership Update

## What's Changing

### 1. Update Club Membership Prices
The current Club section shows incorrect tiers and prices. Updating to match the price list:
- **Up to 50 lbs** at **$34/mo** (was "Up to 40 lbs" at $32)
- **Over 50 lbs** at **$38/mo** (was "Over 40 lbs" at $36)

### 2. New Pricing Section
A new dedicated pricing section will be added to the homepage, displaying all three service categories from the price list:

**Self Wash**
| Weight | Price |
|--------|-------|
| Up to 20 lbs | $24 |
| Up to 100 lbs | $28 |
| Over 100 lbs | $32 |

**Groomer Services** (base / "starting at" prices)
| Size | Bath Only (All Breeds) | Bath Only (Doodles) | Full Service (All Breeds) | Full Service (Doodles) |
|------|----------------------|-------------------|--------------------------|----------------------|
| Up to 20 lbs (S) | $75 | $90 | $90 | $105 |
| 21-50 lbs (M) | $95 | $110 | $105 | $125 |
| 51-100 lbs (L) | $115 | $130 | $125 | $145 |
| Over 100 lbs (XL) | $135 | $150 | $155 | $175 |

**Additional Services**
- Nail Trim or Nail Grind: $24

### Design Approach
- The pricing section will use a clean, light background (cream) to contrast with the dark Steps section and red Club section surrounding it
- Self Wash prices shown as simple cards (matching the Club card style)
- Groomer Services shown as a structured table with clear All Breeds vs Doodles columns
- A note that groomer prices are base / "starting at" prices
- Additional services listed below
- All styling follows existing patterns: Oswald headings, racing-red accents, the diamond divider motif

### Page Placement
The pricing section will be placed between **Steps** and **Promos** in the page flow, giving a natural progression: How It Works -> Pricing -> About Us

---

## Technical Details

**Files modified:**
- `src/components/ClubMembership.tsx` -- update weight tiers (40 -> 50 lbs) and prices ($32/$36 -> $34/$38)
- `src/pages/Index.tsx` -- import and add new Pricing component between Steps and Promos

**Files created:**
- `src/components/Pricing.tsx` -- new section with Self Wash cards, Groomer Services table, and Additional Services

**No new dependencies needed.** The table will use basic HTML table elements styled with Tailwind, consistent with the site's existing design system.

