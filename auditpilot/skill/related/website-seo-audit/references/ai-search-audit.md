# AI Search Visibility Audit

Complete methodology for auditing visibility in AI search platforms (ChatGPT, Perplexity, Google AI Overviews, etc.).

## Why AI Search Matters

Some businesses report 100% close rates on leads from ChatGPT. Why? People trust AI recommendations differently than Google results.

Google has sponsored results. People know there's advertising. There's skepticism.

ChatGPT gives a personalized recommendation based on the specific question. It feels like advice from a trusted friend. When ChatGPT says "Based on your needs, I'd recommend ABC Electric in Scottsdale," people trust it.

## How AI Search Works

When someone asks ChatGPT or Perplexity for a recommendation:

1. The AI runs multiple web searches in the background ("query fanout")
2. It gathers information from various sources
3. It synthesizes a response based on what it finds
4. It prioritizes authoritative, well-cited sources

## Top AI Search Visibility Factors

Research shows these factors matter most for AI recommendations:

1. **Presence on Expert-Curated "Best Of" Lists** - Being featured on listicles
2. **Brand Mentions Across the Web** - Unstructured citations in articles, blogs, news
3. **Prominence on Industry-Relevant Domains** - Mentioned on authoritative sites
4. **Quality of Reviews Across Platforms** - Not just Google, but Yelp, BBB, Facebook, etc.
5. **Authority of Third-Party Sites Where Reviews Exist** - Platform credibility matters
6. **Reddit/Forum Discussions** - Community recommendations heavily weighted
7. **Direct Website Content Quality** - Helpful, comprehensive, authoritative content

---

## AI Search Audit Process

### Step 1: Direct AI Recognition Test

Test whether AI platforms know and recommend the business.

**ChatGPT Test:**
```
"Who is the best [service] in [city]?"
"I need an [service provider] in [city] for [specific job]. Who should I call?"
"Can you recommend a reliable [service] company in [city]?"
```

**Perplexity Test:**
Same queries, note which sources it cites.

**Document:**
- Is the business mentioned?
- What competitors appear instead?
- What sources are cited?
- What's the sentiment of the recommendation?

### Step 2: Multi-Platform Review Audit

Check reviews across all platforms AI tools reference.

| Platform | Check For |
|----------|-----------|
| Google | Review count, rating, recency, response rate |
| Yelp | Review count, rating, photo count |
| Facebook | Recommendations, rating, engagement |
| BBB | Accreditation, rating, complaints |
| Angi | Reviews, rating, response rate |
| HomeAdvisor | Reviews, rating, badges |
| Thumbtack | Reviews, rating, Pro status |
| Industry-specific | NECA, IBEW, manufacturer sites |

**Score each platform:**
- Review count
- Average rating
- Most recent review date
- Owner response rate

**Compare to competitors:**
Do top competitors have more reviews or higher ratings on these platforms?

### Step 3: "Best Of" Listicle Audit

Search for listicles that might include the business.

**Search queries:**
- "best [service] in [city]"
- "top [service] companies [city]"
- "best [service] near [city]"
- "[city] [service] reviews"

**Document:**
- Which listicles exist?
- Is the business included?
- What position are they listed?
- Which competitors are featured?
- Who publishes these lists? (Yelp, local blogs, news sites)

**Opportunity identification:**
- Lists where they should be but aren't
- New lists that could be created (for their blog)

### Step 4: Reddit/Forum Audit

AI tools heavily weight community discussions.

**Search queries:**
```
site:reddit.com "[business name]"
site:reddit.com "[service] [city]"
site:reddit.com "best [service] [city]"
```

**Document:**
- Any mentions of the business?
- Positive or negative sentiment?
- Which competitors are recommended?
- Which subreddits discuss their services?

**Key subreddits to check:**
- r/[CityName]
- r/HomeImprovement
- r/askanelectrician
- r/Plumbing
- Industry-specific subreddits

### Step 5: Unstructured Citation Audit

Check for mentions in news, blogs, and other content.

**Search queries:**
```
"[business name]" -site:[their website]
"[owner name]" [service] [city]
"[business name]" news OR article OR featured
```

**Sources to check:**
- Local news sites
- Chamber of commerce
- Industry publications
- Local business blogs
- Press release archives

**Document:**
- Where are they mentioned?
- What context?
- Are mentions positive?
- Are key services/locations mentioned?

### Step 6: Website Content for AI

Check if website content is optimized for AI discovery.

**Content Structure:**
- Is content in HTML (not hidden in JavaScript)?
- Are headings properly structured (H1, H2, H3)?
- Is content comprehensive enough for AI to extract?

**Authority Signals:**
- Is author/owner expertise demonstrated?
- Are credentials, certifications, experience mentioned?
- Is there original data or unique insights?
- Does content answer specific questions?

**Technical AI Compatibility:**
- robots.txt allows AI crawlers (GPTbot, PerplexityBot, ClaudeBot)?
- Site is indexed in Bing (ChatGPT uses Bing)?
- Site is indexed in Brave (Claude uses Brave)?
- Schema markup provides structured data?

---

## AI Search Visibility Scorecard

Rate each area 1-5:

| Factor | Score | Notes |
|--------|-------|-------|
| Direct AI Recognition | /5 | Are they mentioned when asked? |
| Google Reviews | /5 | Count, rating, recency |
| Multi-Platform Reviews | /5 | Presence on Yelp, BBB, Facebook, etc. |
| "Best Of" Listicles | /5 | Included in curated lists? |
| Reddit/Forum Presence | /5 | Community discussions? |
| Unstructured Citations | /5 | News, blogs, PR mentions? |
| Website AI-Friendliness | /5 | Content quality, technical setup |

**Total: /35**

**Interpretation:**
- 0-10: Invisible to AI search
- 11-20: Minimal AI visibility
- 21-28: Moderate AI visibility
- 29-35: Strong AI visibility

---

## Recommendations Template

### Immediate Actions (0-30 days)

1. **Claim and optimize profiles** on all review platforms
2. **Request reviews** specifically on platforms where competitors are stronger
3. **Submit to "Best Of" lists** in the service area
4. **Verify AI crawler access** in robots.txt

### Medium-Term Actions (30-90 days)

1. **Create "Best [Service] in [City]" content** on own blog
2. **Build relationships with local bloggers/news** for mentions
3. **Engage authentically on Reddit** (not promotional)
4. **Pursue local press coverage** for unique stories

### Long-Term Actions (90+ days)

1. **Develop original research/data** AI tools will cite
2. **Build comprehensive resource content** on website
3. **Establish thought leadership** through podcasts, interviews
4. **Create case studies** with specific results and locations

---

## AI Crawler Configuration

For website technical setup, ensure robots.txt allows:

```
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: CCBot
Allow: /
```

Also verify:
- Site is submitted to Bing Webmaster Tools (ChatGPT uses Bing)
- Site is indexed in Brave Search (Claude uses Brave)
- Schema markup is properly implemented
- Content is rendered in HTML (not JavaScript-only)