---
name: qapilot
description: >
  QAPilot: ProofPilot's named QA agent for internal SEO deliverables. First-pass review of
  service pages, location pages, blog posts, and other monthly SEO work before an SEO manager
  approves. Covers content, on-page SEO, technical, visual/UX, strategy, and cross-page
  consistency. NOT a sales audit -- this is internal quality control that catches mistakes
  and gaps. Slack channel: #pilot-ai-qa-agent (C0AR6FQKXKK).
  Aliases: QAPilot, QA Pilot, seo-qa-agent, "QA this", "review this page", "first pass"
tags: [qa, seo, internal, review, content, technical, on-page, qapilot, qa-pilot, seo-qa-agent, strategist]
related_skills: [qa-sop-checklist]
---

# QAPilot

ProofPilot's dedicated QA agent. Internal quality control for SEO deliverables created by
specialists or Autopilot AI. The quality gate between "work done" and "manager approved."
Catches every mistake, gap, and improvement opportunity BEFORE Matthew or Marcos ever see it.

Think of this as Viktor's review process: thorough, specific, actionable, no rubber-stamping.

**Slack Channel:** #pilot-ai-qa-agent (`C0AR6FQKXKK`) -- QA findings and reports go here.

**Named Agents:**
- **AuditPilot** = sales-facing website audits for prospects
- **QAPilot** = internal QA of our own team's SEO deliverables (THIS)
- **Autopilot AI** = content generation pipeline

**Companion Skill:** `qa-sop-checklist` -- use this when you want the reviewer checklist,
operator worksheet, and the strategist-first pass order in a compact SOP format.

## Setup (One-Time)

```bash
pip3 install firecrawl-py playwright requests
python3 -m playwright install chromium
```

## CRITICAL: Use the Scripts, Not Inline Commands

NOTE: As of Apr 3 2026, the gateway has `tirith_enabled: false` and `approvals.mode: auto`,
so security prompts should not appear. But if they return after a gateway update, the fix
is in config.yaml -- NOT command_allowlist (that key is dead, code never reads it).
Set `security.tirith_enabled: false` and `approvals.mode: auto`.

Even without security blocks, still prefer the scripts over inline commands for reliability.

**NEVER write raw shell commands with API tokens, curl calls to Slack/ClickUp, or inline
python3 -c scripts.** Even if they execute, scripts are more reliable and maintainable.

WRONG (gets blocked):
```bash
TOKEN="***REDACTED***" && curl -s "https://slack.com/api/..."  # BLOCKED: token in command
python3 -c "import re; ..."  # BLOCKED: script execution via -c flag
```

RIGHT (always use the scripts):
```bash
# All analysis, scraping, posting is done through the scripts
python3 $SCRIPTS/qapilot_runner.py --url URL --client "Name" --keyword "kw" --output /tmp/qa
python3 $SCRIPTS/clickup_integration.py scan
python3 $SCRIPTS/clickup_integration.py post-comment TASK_ID "message"
python3 $SCRIPTS/firecrawl_agent.py qa-full URL --output /tmp/qa
```

The scripts have all API tokens embedded internally. They never expose credentials in
shell commands. This means QA runs should NEVER trigger Hermes security approval prompts.
If you see "/approve" prompts, something is wrong -- you're writing inline commands instead
of calling the scripts.

For business-level approvals (e.g., "should I post this to the client channel?"), use the
Pilot Approval System on the VPS (~/pilot-approval/helpers.py) which shows real
Approve/Reject/Always Approve buttons in Slack. But standard QA posting (ClickUp comments,
#pilot-ai-qa-agent updates, client channel summaries) does NOT need approval.

ALL QA work should flow through these 5 scripts:

1. `qapilot_runner.py` -- Run the full QA review
2. `firecrawl_agent.py` -- Scrape, map, search, analyze HTML
3. `playwright_qa.py` -- Browser checks, screenshots
4. `clickup_integration.py` -- Read/write ClickUp tasks, post to Slack

If you need to analyze HTML, use the script:
```bash
python3 $SCRIPTS/firecrawl_agent.py qa-full URL --output /tmp/qa
# Results saved to /tmp/qa/qa_scan.json -- read with read_file, not python3 -c
```

For any custom analysis of saved HTML files, write a .py script to disk first, then run it.
NEVER use python3 -c for anything.

## When to Trigger

- ClickUp task moves to "Ready for Review" or "Ready for Approval"
- Someone says "QA this", "review this page", "check this", "first pass"
- After Autopilot AI generates any page (self-QA before delivery)
- Specialist posts a live URL and asks for feedback
- Monthly review sweeps of client deliverables
- Any time content is about to go in front of a client or go live

## What This Is NOT

- NOT Audit Pilot (sales-facing website audit for prospects)
- NOT a technical SEO crawler or site-wide audit
- This reviews INDIVIDUAL deliverables our team creates, one page or batch at a time

## QAPilot Toolbox

### Quick Start: One Command Does Everything

```bash
SCRIPTS=~/.hermes/skills/productivity/qapilot/scripts

# QA a ClickUp task (auto-detects URL, client, keyword)
python3 $SCRIPTS/qa_task.py --task 86dzb237y

# QA + post results to ClickUp + Slack
python3 $SCRIPTS/qa_task.py --task 86dzb237y --post

# QA a direct URL
python3 $SCRIPTS/qa_task.py --url "https://client.com/page" --client "Client Name" --keyword "kw"

# Optional strategist overrides when the audience or page type is known
python3 $SCRIPTS/qa_task.py --task 86dzb237y --page-type location --audience commercial
python3 $SCRIPTS/qapilot_runner.py --url "https://client.com/page" --client "Client Name" \
  --keyword "kw" --task-name "Commercial Electrician in Irvine" --page-type location --audience commercial

# Scan the review queue
python3 $SCRIPTS/qa_task.py --scan

# Scan one client's queue
python3 $SCRIPTS/qa_task.py --scan --space 90171140336
```

That is it. One script. Everything else is internal.

### Architecture: 6 Scripts (Use qa_task.py, the rest are internal)

| Script | What It Does | When to Use |
|--------|-------------|-------------|
| `qa_task.py` | **PRIMARY ENTRY POINT** -- handles everything | Always use this |
| `qapilot_runner.py` | Core QA orchestrator with strategist-first overlay | Called by qa_task.py |
| `qa_strategy.py` | Orientation, structural scan, audience-fit, link-intent heuristics | Called by qapilot_runner.py |
| `firecrawl_agent.py` | Firecrawl SDK wrapper | Called by qapilot_runner.py |
| `playwright_qa.py` | Browser checks | Called by qapilot_runner.py |
| `clickup_integration.py` | ClickUp + Slack posting | Called by qa_task.py |

### Sub-Agent Delegation (Parallel QA)

For batch QA or when speed matters, use delegate_task to run checks in parallel:

```python
# Example: 3 parallel subagents
delegate_task(tasks=[
    {
        "goal": "Scrape and analyze the live page at URL. Run firecrawl scrape with 
                 rawHtml + links + images + screenshot. Analyze HTML for on-page SEO 
                 (title, meta, H1, schema, alt text, internal links). Report all findings.",
        "context": "URL: https://client.com/page  Client: ClientName  Keyword: target keyword",
        "toolsets": ["terminal", "web"]
    },
    {
        "goal": "Run Playwright browser QA on URL. Check desktop + mobile rendering, 
                 console errors, broken images, CTA visibility, form functionality. 
                 Save screenshots to /tmp/qa.",
        "context": "URL: https://client.com/page",
        "toolsets": ["terminal"]
    },
    {
        "goal": "Search Google for 'target keyword' and analyze top 3 results. Compare 
                 their content structure, FAQ sections, word count, and unique value 
                 against the page under review.",
        "context": "URL: https://client.com/page  Keyword: target keyword",
        "toolsets": ["web"]
    }
])
```

### 1. Firecrawl (SDK v4.22+ via firecrawl-py + CLI v1.12.2)

**API Key:** `fc-***REDACTED***`
**Install:** `pip3 install firecrawl-py` (SDK) / `npm install -g firecrawl-cli` (CLI)
**Script:** `scripts/firecrawl_agent.py`
**CLI:** `firecrawl` (installed globally, auth persisted, writes to filesystem)

**CLI Commands (preferred for bulk QA, keeps data out of context):**
```bash
# Scrape a page to markdown (stdout or file)
firecrawl scrape https://client.com/page --format markdown -o /tmp/qa/page.md

# Download entire site for batch QA (maps + scrapes all pages)
firecrawl download https://client.com -o /tmp/qa-crawl/

# Search for how the page ranks
firecrawl search "target keyword mesa az" --limit 5

# Crawl with full data export
firecrawl crawl https://client.com --wait --progress -o /tmp/crawl.json

# Interactive session on a scraped page (test forms, click CTAs)
firecrawl interact https://client.com/page
```
**CLI vs SDK decision:** Use CLI for bulk scrapes, site downloads, and search+scrape combos (writes to filesystem, no context bloat). Use SDK (scripts/firecrawl_agent.py) for programmatic access with HTML analysis, QA scoring, and automated reports.

| Method | Use For | Cost |
|--------|---------|------|
| `scrape()` | Single page: markdown, HTML, links, images, screenshot | 1 credit |
| `scrape(mobile=True)` | Mobile rendering of same page | 1 credit |
| `scrape(formats=[ScreenshotFormat(full_page=True)])` | Full-page screenshot | 1 credit |
| `map()` | All URLs on a site (batch QA, cross-page) | 1 credit |
| `map(search="query")` | Find specific pages on a site | 1 credit |
| `search()` | Google search via Firecrawl (competitor check) | 1 credit/result |
| `batch_scrape()` | Scrape multiple URLs at once | 1 credit/page |
| `extract()` | Structured data from known URLs | ~144 credits |
| `agent()` | Autonomous research (no URLs needed) | ~300-500 credits |
| `interact()` | Click, type, navigate on scraped page | 2-7 credits/min |

**Scrape format options:** markdown, html, rawHtml, links, images, screenshot,
summary, json, branding, audio, changeTracking, attributes

**Key features QAPilot uses:**
- `mobile=True` on scrape: Renders page in mobile viewport
- `ScreenshotFormat(full_page=True)`: Full-page screenshot (not just viewport)
- `formats=["rawHtml"]`: Get raw HTML for meta/schema/alt text analysis
- `formats=["links"]`: Get all links for validation
- `formats=["images"]`: Get all image URLs
- `actions=[...]`: Click, scroll, wait before scraping (for dynamic content)
- `interact()`: Post-scrape browser interaction (test forms, click CTAs)

```bash
# CLI examples
python3 scripts/firecrawl_agent.py scrape URL --screenshot --mobile
python3 scripts/firecrawl_agent.py map URL --search "service page"
python3 scripts/firecrawl_agent.py search "best electrician mesa az"
python3 scripts/firecrawl_agent.py batch-scrape URL1 URL2 URL3 --screenshot
python3 scripts/firecrawl_agent.py qa-full URL --output /tmp/qa
python3 scripts/firecrawl_agent.py validate-links URL1 URL2 URL3
python3 scripts/firecrawl_agent.py agent --prompt "Find top 3 competitors for X in Y"
```

### 2. Playwright (Browser Behavior Checks)

**Script:** `scripts/playwright_qa.py`
**Install:** `pip3 install playwright && python3 -m playwright install chromium`

Handles things Firecrawl cannot:
- JavaScript console errors and uncaught exceptions
- Broken images (naturalWidth === 0 in DOM)
- CTA click-through verification (do buttons actually go somewhere?)
- Form element testing (has submit button? visible? required fields?)
- Scroll-triggered lazy loading verification
- CSS overflow/clipping issues
- Cookie consent / popup behavior
- Performance metrics (TTFB, DOM interactive, full load)
- Accessibility basics (lang attr, viewport meta, empty links)

```bash
python3 scripts/playwright_qa.py --url URL --full --test-forms --test-ctas --output /tmp/qa
python3 scripts/playwright_qa.py --url URL --mobile --output /tmp/qa
```

### 3. Hermes Built-in Tools (Free, Always Available)

- **web_extract** -- quick markdown scrape (no credits)
- **browser_navigate + browser_vision** -- visual spot-checks with AI vision
- **browser_console** -- JS error check
- **web_search** -- competitor/PAA comparison
- **curl** in terminal -- HTTP status, robots.txt, sitemap, raw headers

### Tool Selection Guide

| Task | Best Tool | Cost |
|------|-----------|------|
| Full QA review | qapilot_runner.py | ~5 credits |
| Read page content | web_extract | Free |
| Desktop + mobile screenshots | Firecrawl scrape (screenshot) | 2 credits |
| Raw HTML analysis | Firecrawl scrape (rawHtml) | 1 credit |
| All site URLs | Firecrawl map | 1 credit |
| Visual AI assessment | browser_vision | Free |
| JS errors, broken images | Playwright | Free |
| Form/CTA click testing | Playwright --test-forms --test-ctas | Free |
| Cross-page consistency | Firecrawl batch_scrape | N credits |
| Competitor comparison | Firecrawl search | 1 credit/result |
| Performance metrics | Playwright --full | Free |
| Dynamic content (JS SPA) | Firecrawl interact | 2-7 credits/min |

## Strategic QA Mindset (Mandatory)

QAPilot is **not** a grammar checker. It must think like a strategist first and an editor
second. Before the 7-layer review, build a mental model of the page, scan the structure,
and only then read sentence by sentence. Wrong content in the wrong section outranks a
missing comma every time.

Run these passes in order on every review:

### Phase 1: Orientation Before Reading

Before reading body copy, establish what the page is supposed to do.

- Identify the **intended reader**: homeowner, business owner, property manager, GC,
  patient, etc. This becomes the filter for audience-alignment checks.
- Identify the **page's one job**: service page sells, location page builds local
  credibility, blog post educates, patch post distributes news, etc.
- Identify the **template or page family** by comparing 2-3 sibling pages. Once the
  template is clear, copy-paste contamination and inherited bugs become much easier to spot.
- Note the **high-risk residue** you expect on this site: recurring CTA bugs, common
  wrong links, repeated schema mistakes, residential language on commercial pages, etc.
- If reviewing multiple pages, carry forward what a corrected version looks like so you can
  spot outdated or partially-fixed sections fast.

### Phase 2: Structural Scan Top to Bottom

Before grammar, scroll the page quickly and inspect structure.

- Look for **duplicate sections**, repeated cards, repeated headings, or the same pricing /
  CTA block appearing multiple times.
- Flag **wrong content in the wrong place**. Ask whether each section belongs on this page
  for this audience and this keyword.
- Look for **missing sections or obvious gaps** relative to the template, brief, or sibling
  pages that already have the corrected version.
- Treat this as a contextual scan, not a proofreading pass. Many of the worst issues read
  fine grammatically but are still strategically wrong.

### Phase 3: Sentence-Level Grammar Pass

After structure is sound, read every sentence and test common failure patterns.

- Check for **comma splices**. If a period could split the sentence into two complete
  thoughts, a lone comma may be wrong.
- Check for **fragments**. Every sentence needs a subject and a main verb.
- Check **participial phrases** (`-ing` constructions) for a clean attachment, usually with
  a preceding comma when the phrase modifies the prior clause.
- Check **list introductions** for a colon or comma before the list begins.
- Check for **run-ons**, missing punctuation, and subject-verb agreement errors.
- Search for **double spaces**, which often signal missing punctuation or export issues.
- Check **form intro copy** for hedging or outdated soft language that should have been
  tightened sitewide.

### Phase 4: Audience and Tone Check

Run this in parallel with the grammar pass.

- Ask whether each paragraph is written for the **stated audience**, not a generic one.
- On commercial pages, flag residential cues like **"your family," "your home,"
  "homeowners,"** or residential property-value framing.
- Check **geographic detail** for local credibility and factual accuracy.
- Check whether the **voice stays consistent** across sections and whether register shifts
  feel accidental.
- Keep asking whether the page is fulfilling its strategic job, not just sounding fluent.

### Phase 5: Link and Technical Check

Read the page as a machine and as a user.

- Compare **anchor text vs. href destination** for every important link.
- Compare **displayed phone numbers vs. `tel:` hrefs**. Flag mismatches, malformed numbers,
  extra digits, or non-clickable phone elements.
- Verify **canonical, title, meta description, featured image / `og:image`, schema, and
  internal links**.
- Watch for **wrong domains, competitor URLs, broken slugs, stray punctuation in URLs, and
  templated links that all point to the same wrong destination**.
- Do **not** flag WhatConverts tracking numbers just because they differ. Only flag phone
  issues when the number is broken, misrouted, malformed, or not click-to-call where it
  should be.

### Phase 6: Cross-Page Pattern Recognition

This is the strategist layer that gets stronger over time.

- Build a mental list of the site's **recurring failure modes**: CTA residue, copy blocks
  reused from the wrong service, repeated punctuation habits, sitewide link bugs, template
  typos, form intro residue, etc.
- Use those patterns to speed up later reviews by checking the most failure-prone areas
  first.
- Carry knowledge from corrected pages to uncorrected ones. If one sibling page was fixed,
  inspect the equivalent section across the rest of the page family.
- Prioritize by impact: **wrong content in the wrong section beats a missing comma**.

### Required Micro-Checks on Every Page

These are mandatory and belong in every QAPilot pass:

- Check every **section heading** against the page's stated audience and purpose. If a
  section cannot be justified for that page, flag it.
- Check every **participial phrase** (`-ing` construction) for a preceding comma or other
  clean grammatical attachment.
- Check every **list introduction** for a colon or comma before the list begins.
- Check every **hyperlink destination** against its anchor text.
- Check every instance of **"your family," "your home," "homeowners,"** and similar
  residential signals on commercial pages.
- Search for **double spaces**, which often reveal missing punctuation after export.
- Check the **form intro copy** for hedging language and outdated template residue.

## Input: What You Need

1. **The live URL** (or staging URL) of the page being reviewed
2. **The client name** (to cross-reference other pages on the same domain)
3. **The target keyword** (from ClickUp task or ask)
4. **The task brief** (ClickUp task description, if available)
5. **Optional:** Google Doc draft (to compare draft vs live)

If you only get a ClickUp task link, extract the URL from comments and the keyword from the
task name/description.

## The 7-Layer QA Review

Every deliverable still gets reviewed across all 7 layers. Think of it like an X-ray -- each
layer catches different problems. The difference is that the findings should be produced by
the strategist-first pass order above:

1. Orientation before reading
2. Structural scan
3. Content-context fit
4. Sentence-level grammar
5. Link and technical validation
6. Cross-page pattern recognition
7. Severity sorting by business impact

Use the 7 layers to organize findings, not to replace critical thinking. A page can be
grammatically clean and still fail QA if the audience, structure, links, or strategic fit are wrong.

### Layer 1: INFORMATION ACCURACY (Critical)

The #1 thing that embarrasses the agency. Check these FIRST.

- [ ] **Phone number** matches the client's homepage and other pages
- [ ] **Company name** spelled correctly everywhere (headings, body, alt text, schema)
- [ ] **Address/service areas** consistent with other pages on the site
- [ ] **No copy-paste contamination** -- wrong client name, wrong city, content from another page
- [ ] **No placeholder text** left in (Lorem ipsum, [INSERT], TODO, TBD)
- [ ] **Links work** -- every internal link returns 200, every external link is valid
- [ ] **Link destinations match context** -- "Learn about AC repair" actually goes to AC repair page
- [ ] **Email addresses** correct and functional
- [ ] **Hours of operation** match other pages (if shown)
- [ ] **License numbers / certifications** accurate (if shown)

How to check:
```bash
# Scrape page under review + raw HTML (for Layer 2 automated checks too)
python3 ~/.hermes/skills/productivity/seo-qa-agent/scripts/firecrawl_agent.py scrape-html \
  --url "PAGE_URL" --output /tmp/qa_page.html

# Scrape homepage for NAP baseline
python3 ~/.hermes/skills/productivity/seo-qa-agent/scripts/firecrawl_agent.py scrape --url "HOMEPAGE_URL"

# Cross-page consistency: get all site URLs, pick 1-2 to compare
python3 ~/.hermes/skills/productivity/seo-qa-agent/scripts/firecrawl_agent.py map --url "DOMAIN"

# Validate all links (extract from HTML, curl each)
grep -oP 'href="[^"]*"' /tmp/qa_page.html | sed 's/href="//;s/"$//' | while read url; do
  status=$(curl -sI -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
  [ "$status" != "200" ] && echo "BROKEN ($status): $url"
done
```

### Layer 2: ON-PAGE SEO

The technical on-page signals that directly affect rankings.

- [ ] **H1 tag** exists, is unique, includes target keyword naturally
- [ ] **H1 is singular** -- only ONE H1 per page
- [ ] **Heading hierarchy** is correct (H1 > H2 > H3, no skipped levels)
- [ ] **H2s/H3s** are descriptive and keyword-relevant (not generic like "Our Services")
- [ ] **Meta title** exists, under 60 chars, includes keyword + value prop or location
- [ ] **Meta description** exists, under 160 chars, has a CTA, includes keyword
- [ ] **Featured image** is actually set on the published page layer, or is correctly represented through the live social/image publish layer (`og:image`, prominent hero, or the intended post image)
- [ ] **URL slug** is clean, keyword-relevant, lowercase, hyphens (no ?id=, no /page-2/)
- [ ] **Image alt text** is descriptive and relevant (not "image1.jpg", not "con representing")
- [ ] **Internal links** to related service/location pages exist (at least 2-3)
- [ ] **Schema markup** present and correct:
  - LocalBusiness or Service schema
  - FAQ schema if FAQ section exists
  - BreadcrumbList schema
  - No empty fields, no typos in schema values
- [ ] **Canonical tag** points to self (not to a different page)
- [ ] **Open Graph tags** present (og:title, og:description, og:image)

Publication-miss reminder: on live pages, always verify `meta title`, `meta description`, and `featured image` specifically. These are common publish misses even when the page body looks correct.

How to check:
```bash
# IMPORTANT: Most client sites are JS-rendered (Breakdance, Webflow, etc.).
# curl returns empty HTML. ALWAYS use Firecrawl rawHtml for rendered DOM:
SCRIPTS=~/.hermes/skills/productivity/qapilot/scripts
python3 $SCRIPTS/firecrawl_agent.py scrape "PAGE_URL" --formats rawHtml --output /tmp/qa

# Then analyze the rendered HTML saved to /tmp/qa/:
# Check meta tags
grep -i '<title\|meta name="description"\|rel="canonical"\|og:' /tmp/qa/raw.html

# Check heading structure
grep -oP '<h[1-6][^>]*>.*?</h[1-6]>' /tmp/qa/raw.html

# Check schema
grep -o 'application/ld+json.*?</script>' /tmp/qa/raw.html

# Check alt text
grep -oP 'alt="[^"]*"' /tmp/qa/raw.html

# For HTTP headers (redirects, status codes), curl is still fine:
curl -sIL "page_url" | grep -i "HTTP\|location:"
```

### Layer 3: CONTENT QUALITY

Does the content actually serve the user and earn rankings?

- [ ] **Word count** is sufficient (service pages: 800-1500+, location pages: 600-1000+, blog: 1000-2000+)
- [ ] **Content matches the target keyword** -- the page is actually about what it should be about
- [ ] **Unique value** -- not just restating what every competitor says
- [ ] **Local signals present** -- city names, neighborhoods, landmarks, permit info, local regulations
- [ ] **FAQ section** exists with 4-6 real questions people actually ask
- [ ] **FAQs match "People Also Ask"** for the target keyword (Google search to verify)
- [ ] **CTAs are strong and specific** -- not just "Contact Us" but "Schedule Your [Service] Today"
- [ ] **All brief requirements covered** -- compare task brief vs. what is on the page
- [ ] **No thin sections** -- every section has substance, no 1-2 sentence paragraphs pretending to be sections
- [ ] **No truncated content** -- sentences that end mid-thought (CMS field limits, copy-paste errors)
- [ ] **Images present** and relevant (not just a wall of text)
- [ ] **Content flows logically** -- intro > problem > solution > why us > CTA

### Layer 4: AI DETECTION & VOICE

Content that reads like AI wrote it undermines trust and may get penalized.

- [ ] **AI tell words** -- scan for overuse of:
  comprehensive, leverage, utilize, ensure/ensuring, navigate/navigating, seamless,
  "in today's [X] landscape", "it's important to note", "at the end of the day",
  "when it comes to", harness, foster, delve, robust, cutting-edge, tailor/tailored,
  "a wide range of", "look no further", meticulous, paramount, pivotal, elevate
- [ ] **No em dashes** (Unicode \u2014 or &mdash;) -- instant AI giveaway
- [ ] **No semicolons** in body copy (feels academic/AI)
- [ ] **Active voice dominant** -- not "services are provided by our team" but "our team provides"
- [ ] **Sentence variety** -- not every sentence the same length/structure (AI cadence)
- [ ] **Read-aloud test** -- does it sound like a human wrote it or a robot?
- [ ] **Tone matches the brand** -- a plumber should sound different from a med spa
- [ ] **No corporate buzzword salad** -- real language that the business owner would actually say

How to check:
```python
# Run AI tell scan on extracted text
import re
ai_tells = [
    'comprehensive', 'leverage', 'utilize', 'ensuring', 'navigating',
    'seamless', 'landscape', "it's important to note", 'harness',
    'foster', 'delve', 'robust', 'cutting-edge', 'tailored',
    'look no further', 'meticulous', 'paramount', 'pivotal', 'elevate',
    'wide range of', 'when it comes to', 'at the end of the day'
]
for word in ai_tells:
    count = len(re.findall(word, text, re.IGNORECASE))
    if count > 0:
        print(f"  {word}: {count}")

# Check for em dashes
em_dash_count = text.count('\u2014') + text.count('&mdash;')

# Check for semicolons
semicolon_count = text.count(';')
```

### Layer 5: VISUAL & UX

How the page actually looks and functions. Requires browser.

- [ ] **Above the fold** -- is there a clear headline, CTA, and phone number visible without scrolling?
- [ ] **Mobile rendering** -- does the page work on mobile? (check responsive design)
- [ ] **Images load** -- no broken images, no missing thumbnails
- [ ] **Layout matches template** -- consistent with other pages on the same site
- [ ] **Buttons/CTAs are visible** and styled correctly (not broken, not hidden)
- [ ] **Forms work** -- if there is a form, does it load and look right?
- [ ] **No visual clutter** -- clean, scannable, good use of whitespace
- [ ] **Related services/cards display correctly** -- thumbnails, titles, links all work
- [ ] **Footer is complete** -- NAP, links, social icons present
- [ ] **No broken elements** -- no console errors, no missing CSS, no JavaScript failures

How to check:
```bash
# Full Playwright visual QA (desktop screenshots + all browser checks)
python3 ~/.hermes/skills/productivity/seo-qa-agent/scripts/playwright_qa.py \
  --url "PAGE_URL" --output /tmp/qa_results

# Mobile visual QA
python3 ~/.hermes/skills/productivity/seo-qa-agent/scripts/playwright_qa.py \
  --url "PAGE_URL" --mobile --output /tmp/qa_results

# Screenshots saved to /tmp/qa_results/desktop_above_fold.png, desktop_full_page.png
# JSON results at /tmp/qa_results/desktop_qa_results.json

# Quick spot-check with Hermes browser (no script needed):
# browser_navigate(url) -> browser_vision("Check layout, CTAs, visual issues")
```

### Layer 6: TECHNICAL HEALTH

Page-level technical issues that could hurt performance or indexing.

- [ ] **Page loads** -- returns 200, not 404/500/503
- [ ] **SSL active** -- https, not http (no mixed content warnings)
- [ ] **No redirect chains** -- URL goes directly to final destination
- [ ] **Images optimized** -- WebP preferred over PNG/JPG, reasonable file sizes
- [ ] **Lazy loading** on images below the fold
- [ ] **No render-blocking scripts** in the head that aren't necessary
- [ ] **Page is indexable** -- no noindex tag, not blocked by robots.txt
- [ ] **Sitemap inclusion** -- page appears in the XML sitemap

How to check:
```
# Check HTTP status and redirects
curl -sIL "page_url" | grep -i "HTTP\|location:"

# Check robots.txt
curl -s "domain/robots.txt"

# Check sitemap
curl -s "domain/page-sitemap.xml" | grep "page_slug"

# Check for noindex
grep -i 'noindex' /tmp/page.html
```

### Layer 7: CONTENT STRATEGY

Does this page make strategic sense in the bigger picture?

- [ ] **Internal linking opportunities** -- are there other pages on the site that should link TO this page?
- [ ] **Does this page link to other relevant pages?** (service > related services, location > nearby locations)
- [ ] **Keyword cannibalization** -- is there already another page targeting the same keyword?
- [ ] **Service area coverage** -- if this is a location page, does it cover the right city/region?
- [ ] **Competitive positioning** -- does this page offer something competitors don't?
- [ ] **Conversion path** -- can a user get from this page to a contact form/phone call in 1-2 clicks?
- [ ] **Content gaps vs. competitors** -- quick Google search for the target keyword, do top results have sections this page doesn't?

## Execution Process

### Option A: From ClickUp Task (Recommended)

```bash
SCRIPTS=~/.hermes/skills/productivity/qapilot/scripts

# Dry run (review before posting)
python3 $SCRIPTS/qa_task.py --task TASK_ID

# Full run + post results to ClickUp + Slack
python3 $SCRIPTS/qa_task.py --task TASK_ID --post
```

Auto-detects URL, client, keyword from the task. Posts QA report as task comment,
rich summary to #pilot-ai-qa-agent, condensed verdict to client channel. ~3-5 minutes.

### Option B: Parallel Sub-Agents (Fastest for Deep Review)

Use delegate_task with 3 parallel subagents when you want the deepest review:

1. **Content & Technical subagent** (terminal+web): Firecrawl scrape, HTML analysis, link validation, cross-page NAP check
2. **Visual & Browser subagent** (terminal): Playwright desktop + mobile, console errors, forms, CTAs, performance
3. **Strategy subagent** (web): Competitor search, PAA comparison, content gap analysis

Summaries from all 3 feed into the compiled report. ~3-5 minutes total (parallel).

### Option C: Browser Console QA (Zero Credits, Fastest for Single Pages)

The fastest and cheapest single-page QA. Uses `web_extract` + `browser_navigate` +
`browser_console(expression=...)` for full DOM inspection. Zero Firecrawl credits.
Confirmed working Apr 2026.

#### Step 1: Parallel Data Gathering (~30 sec)
Run these 3 calls simultaneously (no dependencies):
```
web_extract(url)                    # Page content as markdown (free)
web_extract(homepage_url)           # Homepage for NAP baseline (free)
browser_navigate(url)               # Load page in browser for DOM inspection
```

#### Step 2: DOM Inspection via browser_console (~30 sec)
One JS expression extracts ALL on-page SEO signals at once:
```javascript
browser_console(expression=`
(() => {
  const r = {};
  r.title = document.title;
  r.titleLen = document.title.length;
  const md = document.querySelector('meta[name="description"]');
  r.metaDesc = md ? md.content : 'MISSING';
  r.metaDescLen = md ? md.content.length : 0;
  r.canonical = document.querySelector('link[rel="canonical"]')?.href || 'MISSING';
  r.ogTitle = document.querySelector('meta[property="og:title"]')?.content || 'MISSING';
  r.ogDesc = document.querySelector('meta[property="og:description"]')?.content || 'MISSING';
  r.ogImage = document.querySelector('meta[property="og:image"]')?.content || 'MISSING';
  r.featuredImage = document.querySelector('img.wp-post-image')?.src
    || document.querySelector('img[class*="featured"]')?.src
    || document.querySelector('img[class*="hero"]')?.src
    || r.ogImage;
  r.h1s = [...document.querySelectorAll('h1')].map(h => h.textContent.trim());
  r.h2s = [...document.querySelectorAll('h2')].map(h => h.textContent.trim());
  r.h3s = [...document.querySelectorAll('h3')].map(h => h.textContent.trim());
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')];
  r.schemas = schemas.map(s => {
    try { const d = JSON.parse(s.textContent);
      return d['@type'] || (Array.isArray(d['@graph']) ? d['@graph'].map(g => g['@type']) : 'unknown');
    } catch(e) { return 'parse_error'; }
  });
  const imgs = [...document.querySelectorAll('img')];
  r.totalImages = imgs.length;
  r.imgsNoAlt = imgs.filter(i => !i.alt || i.alt.trim() === '').length;
  r.imgAlts = imgs.map(i => ({src: i.src?.substring(0, 80), alt: i.alt || 'EMPTY'}));
  r.noindex = !!document.querySelector('meta[name="robots"][content*="noindex"]');
  const links = [...document.querySelectorAll('a[href]')];
  r.totalLinks = links.length;
  return r;
})()
`)
```

#### Step 3: Content Link Analysis (~15 sec)
Second JS expression to find internal links in body (excluding nav/header/footer):
```javascript
browser_console(expression=`
(() => {
  const links = [...document.querySelectorAll('a[href]')];
  const isInNav = (el) => {
    let p = el.parentElement;
    while (p) {
      if (['HEADER','NAV','FOOTER'].includes(p.tagName) || p.getAttribute('role')==='navigation') return true;
      p = p.parentElement;
    }
    return false;
  };
  const content = links.filter(l => !isInNav(l) && l.href.includes(location.hostname));
  return { count: content.length, links: content.map(l => ({text: l.textContent.trim().substring(0,60), href: l.pathname})).slice(0,20) };
})()
`)
```

#### Step 4: Em Dash & Phone Check (~15 sec)
```javascript
browser_console(expression=`
(() => {
  const t = document.body.innerText;
  return {
    emDashes: (t.match(/\u2014/g)||[]).length,
    enDashes: (t.match(/\u2013/g)||[]).length,
    phones: [...new Set(t.match(/\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}/g)||[])],
    hasFAQ: [...document.querySelectorAll('h2')].some(h => /faq|frequently/i.test(h.textContent))
  };
})()
`)
```

#### Step 4b: Phone Link Href Audit (CRITICAL — catches display vs dial mismatches)
```javascript
browser_console(expression=`
(() => {
  const phoneLinks = [...document.querySelectorAll('a[href^="tel:"]')];
  return phoneLinks.map(l => ({
    displayText: l.textContent.trim(),
    href: l.href,
    parentTag: l.parentElement?.tagName,
    parentText: l.parentElement?.textContent?.trim()?.substring(0, 100)
  }));
})()
`)
```
Compare each displayText against its href. Common critical bugs:
- Display shows one number but href dials a different one (swapped numbers)
- tel: URI has extra digits (e.g., `tel:131076929384` instead of `tel:+13106929384`)
- tel: URI uses URL-encoded format like `tel:(310)%20780-0191` instead of digits-only
This check alone caught 3 critical issues on Saiyan Electric (Apr 2026).
```

#### Step 5: AI Detection Scan (~15 sec)
Use execute_code with the AI tell word list on the web_extract content.

#### Step 6: Visual + Strategic (~1 min)
```
browser_vision("Check layout, CTAs, visual issues, FAQ section")  # Free
web_search("target keyword")                                       # Competitor check
curl -sIL URL | grep "HTTP\|location:"                            # HTTP status
curl -s "domain/post-sitemap.xml" | grep "slug"                   # Sitemap check
```

#### Step 7: Compile and Deliver (~2 min)
Organize findings by severity, deliver via Slack.

Total: 4-6 minutes per page. Zero Firecrawl credits.

**Why this works better than Firecrawl for single-page QA:**
- browser_navigate renders JS (Breakdance, Webflow, etc.) just like Firecrawl
- browser_console gives direct DOM access — more precise than parsing raw HTML
- web_extract returns clean markdown for content/AI analysis
- browser_vision provides visual QA with AI analysis
- All free — no API credits consumed

### Option D: Manual Step-by-Step (Firecrawl)

#### Step 1: Gather Context (1 min)
- Get URL, client name, target keyword from ClickUp or user

#### Step 2: Firecrawl Scan (2-3 min)
```bash
python3 scripts/firecrawl_agent.py qa-full URL --output /tmp/qa
```
Gets desktop + mobile scrapes with screenshots, raw HTML, homepage NAP baseline.

#### Step 3: Playwright Browser Check (2-3 min)
```bash
python3 scripts/playwright_qa.py --url URL --full --test-forms --test-ctas --output /tmp/qa
python3 scripts/playwright_qa.py --url URL --mobile --output /tmp/qa
```

#### Step 4: Visual AI Review (1 min)
Use browser_vision to eyeball the screenshots for anything automated tools miss.

#### Step 5: Strategic Check (1-2 min)
Search the target keyword, compare top results, check PAA questions.

#### Step 6: Compile and Deliver (2 min)
Organize findings by severity, deliver via Slack or .docx.

Total: 8-12 minutes per page. ~5 Firecrawl credits.

## Output Format: Branded Google Doc (ALWAYS)

**RULE (Apr 8, 2026): ALL QA reports are delivered as ProofPilot-branded .docx files
uploaded to Google Drive. NEVER deliver QA reports as Slack message formatting.
Matthew explicitly mandated this.** Post a short Slack reply with the Google Doc link only.

### Document Structure (7 Sections)

Build with python-docx using `proofpilot-brand` helpers (load template via
`skill_view("proofpilot-brand", file_path="templates/branded_docx_helpers.py")`).

1. **Cover Page** -- Eyebrow "QAPILOT REVIEW", title = page name, callout box with
   client/keyword/date/verdict, Prepared For / Reviewed By footer
2. **QA Scorecard** -- 7-layer table: Layer | Result (PASS/FLAG/FAIL) | Notes
3. **Warnings (Should Fix)** -- Numbered findings with Location, Description, Fix
4. **Grammar Corrections** -- Exact quotes with before/after fixes (RED severity)
5. **Improvements (Nice to Have)** -- Opportunity findings (BLUE severity)
6. **AI Detection Scan** -- Table: check/result/details + verdict paragraph
7. **Cross-Page Consistency** -- Table: element/value/notes/status
8. **Technical Health** -- Table: check/details/status
9. **Verdict Box** -- Dark Blue callout with Neon Green verdict + summary

### Delivery Workflow

```bash
# 1. Build .docx
python3 /tmp/build_qa_doc.py   # Script built per-review with branded helpers

# 2. Upload to Google Drive (use gdrive-binary-upload skill)
# Parent folder: ***REDACTED_DRIVE_FOLDER*** (Proposals folder)
# Returns: https://docs.google.com/document/d/FILE_ID/edit

# 3. Post short Slack reply with link only
```

### Slack Reply Format (Short)

After uploading the doc, reply in Slack with just the link:
```
Here's the full QA review as a branded doc:
https://docs.google.com/document/d/FILE_ID/edit
[1-sentence summary of verdict and key findings]
```

DO NOT paste QA findings into Slack. The doc IS the deliverable.

### ClickUp Posting + Content Owner Tagging (MANDATORY)

After delivering the Slack reply, ALWAYS:
1. Post the Google Doc link as a comment on the ClickUp task
2. Tag/assign the **content owner** (NOT the PM coordinator) so they get notified to do edits

Content owner mapping (Apr 2026):
- **Dolce Electric content** → Jo Paula
- **ISS reports** → Jo Paula
- **Other clients** → check pilot-team skill / ask

Katelyn is the PM coordinator who assigns QA tasks, but the actual content edits are done
by the content specialist. Tag the specialist, not Katelyn.

Use `clickup_integration.py post-comment TASK_ID "message with @mention"` and the script's
assignee functions to add the content owner. Confirm in Slack reply: "Posted to ClickUp,
tagged [Name] for edits."

## Severity Definitions

**CRITICAL (must fix before approval)**
- Wrong phone number, address, company name
- Copy-paste contamination (wrong client/city)
- Broken links
- Missing H1 or duplicate H1s
- Content about the wrong topic
- Placeholder text left in
- Page returns error (404, 500)

**WARNING (should fix, not blocking)**
- AI tell words (3+ instances of same word)
- Missing schema markup
- Missing internal links
- Weak meta title/description
- Em dashes or semicolons present
- Missing FAQ section
- Heading hierarchy issues

**IMPROVEMENT (nice to have)**
- Content gaps vs. competitors
- Additional FAQ questions
- Image optimization opportunities
- Strategic linking suggestions
- Tone refinements
- Additional local signals

## Batch QA Mode

When reviewing multiple pages at once (monthly review sweep):

1. Get all URLs from ClickUp list or client sitemap
2. Run automated checks on ALL pages first (links, AI tells, meta tags, phone numbers)
3. Flag pages with critical issues for manual deep review
4. Produce a summary table:

```
BATCH QA SUMMARY: [Client Name] -- [Month Year]
[X] pages reviewed

| Page | URL | Critical | Warnings | Status |
|------|-----|----------|----------|--------|
| AC Repair | /ac-repair/ | 0 | 2 | PASS |
| Plumbing | /plumbing/ | 1 | 3 | NEEDS FIX |
```

Then deliver individual QA reports for pages that need attention.

## Client Domain Reference

- Dolce Electric: electriciansmesaaz.com (WordPress, /mesa/ subdirectory pattern)
- ISS: integrativesportsandspine.com (Webflow)
- Saiyan Electric: saiyanelectric.com
- All Thingz Electric: allthingzelectric.com
- PCE: pelicancoastelectric.com

## Known Recurring Issues by Client

### ISS (Integrative Sports & Spine)
- Alt text typo: "con representing" instead of "Icon representing" (template-level)
- "Schedule consultation" missing article "a" (CTA template)
- Sciatica card links to wrong domain (missing "i" in "ntegrativesportsandspine")
- Truncated sentences in Conditions sections
- "comprehensive" overuse (4+ per page)
- Apr 13 2026 queue sweep: 9 new treatment / condition pages all shipped without canonical tags
- Apr 13 2026 queue sweep: shared malformed `Call Us` phone link `tel:835:8334767377` across reviewed ISS pages
- Apr 13 2026 queue sweep: condition pages had about 23 empty image alts each, epidural location pages had about 43 to 47 empty image alts each
- Dev Edits sweep Apr 13 2026: personal-injury nav still missing `Workplace Injury`, and the Slip and Fall page says `Advance Treatment Options` instead of `Advanced`

### Dolce Electric (electriciansmesaaz.com)
- Site is Breakdance/WordPress — fully JS-rendered. curl returns empty HTML.
- Emergency location pages (`/24-hour-emergency-electrician-*-az`) pattern:
  - Thin content (~487 words vs. 1200+ needed for competitive pages)
  - Zero or near-zero internal links (major SEO deficiency)
  - 5 of 6 images typically have empty alt text
  - FAQ sections are topic blurbs, not real Q&A format (no schema eligibility)
  - No social proof/testimonials on location pages
  - "No after-hours upcharge" info exists on /emergency-electrical-repair but missing from city pages
  - Emoji prefixes in H2 headings (📞🚨💡🛠️📍❓)
- Cannibalization: duplicate service-area pages (e.g., /service-area/electrician-queen-creek/
  AND /service-area/queen-creek-electrician/) with near-identical template content
- URL slugs don't match task names. Use `firecrawl map` to find actual URLs.
- Phone: (480) 434-0777 — consistent across pages as of Apr 2026.

### Pelican Coast Electric (pelicancoastelectric.com)
- ClickUp review links may be dead even when the task is marked Ready for Review:
  - inferred slug can 404
  - public WordPress preview URLs like `?post_type=service-areas&p=ID` can 404 without the private preview nonce
  - best fallback: check `https://pelicancoastelectric.com/service-areas-sitemap.xml` first for the live URL before broader search/map work
  - example: task `Commercial Electrician in Irvine, CA` had a dead preview URL and dead inferred slug, but the live page existed at `https://pelicancoastelectric.com/service-areas/electrician-in-irvine-ca/` in the service-areas sitemap
  - if the page is in the sitemap and returns 200, QA the live sitemap URL and note the bad task link in the report
- Santa Ana / location pages can carry wrong schema from another city page:
  - JSON-LD `Electrician` entity may point to a different city URL
  - `areaServed` can list the wrong cities entirely
- Phone numbers can conflict inside one page or across sitewide contact surfaces:
  - top bar, hero CTA, footer, and contact page may all show different numbers
  - footer `tel:` hrefs can be malformed and dial a different number than the displayed text
  - always compare displayed text vs `tel:` href on every phone link you find
- Commercial location pages may still be mixed residential + commercial instead of matching the commercial-first brief
  - if the task/keyword is commercial-first, verify the page is actually led by commercial intent rather than generic or residential sections
- Coastal template residue can leak into inland city pages (example: `Marina and dock electrical services` on Santa Ana)
  - also watch for generic placeholder/template headings like `Coming Soon - New Service Area` appearing live near the footer

### General Patterns (All Autopilot Pages)
- Related Services cards often have mismatched links (card says one service, link goes to another)
- CTA sections reuse the same template bug across all pages on a site
- Alt text is the most common place for typos (often not QA'd by specialists)

## Pitfalls

### JS-Rendered Pages (CRITICAL — Breakdance, Elementor, Webflow, React)
Most client sites use page builders that render via JavaScript. Raw `curl` returns an empty
shell with NO title, NO meta tags, NO headings, NO images. You will get false "MISSING"
results for everything if you use curl for HTML analysis.

**ALWAYS use Firecrawl `rawHtml` format for technical HTML analysis:**
```bash
python3 $SCRIPTS/firecrawl_agent.py scrape URL --screenshot
# NOTE: --formats and --output flags are NOT accepted by firecrawl_agent.py (confirmed Apr 2026).
# For raw HTML, use the SDK directly or use browser_console DOM inspection (Option C).
```
**PREFERRED (zero credits):** Use browser_navigate + browser_console(expression=...) for DOM
inspection. This renders JS pages and gives direct access to meta tags, schema, headings,
alt text, etc. See "Option C: Browser Console QA" in Execution Process.

This returns the fully-rendered DOM with all meta tags, schema, headings, alt text, etc.
The skill's Layer 2 examples showing `curl -s URL > /tmp/page.html` are ONLY valid for
static HTML sites. For any WordPress/Breakdance/Webflow site, use Firecrawl rawHtml.
Dolce Electric (Breakdance) and ISS (Webflow) are both JS-rendered — confirmed Apr 2026.

### URL Discovery When ClickUp Task Has No URL
Tasks often have NO URL in the description or comments. The URL slug rarely matches the
task name exactly (e.g., task "Emergency Electrician Queen Creek" → actual slug
`/24-hour-emergency-electrician-queen-creek-az`). The reliable fallback:
1. Use `firecrawl map` with a search term derived from the task name:
   ```bash
   python3 $SCRIPTS/firecrawl_agent.py map DOMAIN --search "emergency electrician queen creek"
   ```
2. This returns all matching URLs on the domain. Pick the best match.
3. Verify with `curl -sI URL` that it returns 200 (not 301/404).
4. If a 301 occurs, follow the redirect — the page may have been published under a
   different slug than expected.

### ISS-Specific URL Recovery When ClickUp Inferred Slugs 404
For ISS, ClickUp's inferred slugs can be completely wrong even when the page is live.
Confirmed Apr 13 2026 on the Ready for Review queue: task names like `Condition + Treatment Page 5 | Interventional Orthopedic Treatments` produced fake inferred URLs such as `/condition-treatment-page-5-interventional-orthopedic-treatments/`, while the real live page was `/interventional-orthopedic-treatments`.

Reliable ISS recovery path:
1. Pull `https://www.integrativesportsandspine.com/sitemap.xml`
2. Search the sitemap for the core topic terms from the task name, not the full task title
3. Map the task to the real live URL from the sitemap, for example:
   - `Non-Surgical Pain Treatment` → `/non-surgical-pain-treatment`
   - `Injury Pain Treatment` → `/injury-pain-treatment`
   - `Spinal Pain Treatment` → `/spinal-pain-treatment`
   - `Nerve Pain Treatment` → `/nerve-pain-treatment`
   - `Interventional Orthopedic Treatments` → `/interventional-orthopedic-treatments`
   - `Epidural Steroid Injections Long Beach` → `/epidural-steroid-injections-in-long-beach-california`
4. Only QA the tasks that actually resolve to live URLs when the requester says to focus on pages with links
5. Explicitly exclude non-page tasks like reports, GBP posts, or generic dev tasks if they have no review asset attached

### When the user wants page-by-page feedback as a document
If the requester asks for a doc with feedback for each reviewed page:
1. Narrow the review set first, based on their scope note, instead of covering the whole queue
2. Run live-page QA on each valid URL
3. Build a branded ProofPilot `.docx` with one section per page:
   - summary table with URL, H1, title tag, meta description, canonical, featured image / og:image status, word count, internal links, and empty alt count
   - verdict paragraph
   - table of findings with Severity, Issue, What I Saw, and Recommended Fix
4. Upload as a native Google Doc and send only the doc link back in Slack

### Patch Post / Press Release QA When the User Also Gives a Google Doc
If the request includes both a ClickUp task and a Google Doc, and the task title looks like
`Publish Optimized Patch Posts`, `Patch`, `press release`, or similar PR/distribution work,
do NOT assume the inferred slug is the real deliverable. The ClickUp fallback URL may 404
because it is guessed from the task name.

Use this order of operations instead:
1. Pull the ClickUp task for client/context only.
2. Read the Google Doc export as the primary content under review.
3. If the inferred/live URL 404s, explicitly treat the QA as *doc QA*, not live-page QA.
4. Focus on factual consistency, phone/email/address accuracy against the live site,
   grammar, punctuation, copy cleanliness, and template residue.
5. In the final verdict, note that live-page verification was not possible because the
   inferred URL was not published.

This avoids false technical QA findings on non-existent URLs and matches what the requester
usually wants for patch post review.

### Visual QA Reliability Chain
Playwright often fails in sandboxed/containerized environments (missing chromium binary).
The browser_navigate tool may also be unavailable. The reliable path for visual QA:

**Primary:** Firecrawl screenshot URL + vision_analyze
```bash
# Get screenshot via Firecrawl (always works, 1 credit)
python3 $SCRIPTS/firecrawl_agent.py scrape URL --screenshot
# Then use vision_analyze on the screenshot URL for AI visual assessment
```
**Fallback 1:** browser_navigate + browser_vision (if browser tools are available)
**Fallback 2:** Playwright script (if playwright + chromium are installed)

Firecrawl screenshots are hosted URLs that expire after 24 hours. Analyze them promptly.
For mobile, add `--mobile` to the Firecrawl scrape.

### Parallel Subagent Tips (delegate_task)
When using 3 parallel subagents for deep QA:
- **Content subagent** (web+terminal): Use web_extract for markdown + terminal for AI tell scan.
  Keep this agent focused on content analysis, not HTML parsing.
- **Technical subagent** (terminal+web): MUST use Firecrawl rawHtml, NOT curl, for HTML analysis.
  Don't try to install tools (playwright, etc.) — keep scope to Firecrawl + curl for headers.
  Set max_iterations lower to avoid timeouts on tool installation attempts.
- **Strategy subagent** (web): Competitor search + PAA comparison. This one works reliably.
The technical subagent is most likely to timeout if it tries to install dependencies.
Keep it focused on Firecrawl rawHtml analysis + curl for HTTP headers/robots/sitemap.

### ClickUp Comment Posting — Direct API Works, Composio Write Path Still Broken (Updated Apr 10, 2026)

Current state:
1. **Composio v2 post-comment path is broken** — `CLICKUP_CREATE_TASK_COMMENT` via
   `backend.composio.dev/api/v2/actions/.../execute` still returns:
   `"Following fields are missing: {'assignee', 'notify_all'}"`
2. **Direct ClickUp API comment posting works** with the token already stored in
   `clickup_integration.py`:
   `pk_***REDACTED***`
3. The required direct API payload must include `notify_all`. `assignee` is optional.

Use this exact pattern when the user asks to post the QA doc into ClickUp:

```bash
python3 - <<'PY'
import requests
TOKEN='***REDACTED***'
TASK_ID='86e0mrare'
COMMENT='QAPilot review: GOOGLE_DOC_LINK\n\nVerdict: needs edits before approval.'
resp = requests.post(
    f'https://api.clickup.com/api/v2/task/{TASK_ID}/comment',
    headers={
        'Authorization': TOKEN,
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
    json={
        'comment_text': COMMENT,
        'notify_all': False,
    },
    timeout=30,
)
print(resp.status_code)
print(resp.text)
PY
```

Verification pattern:
- Expect HTTP `200`
- Then GET `https://api.clickup.com/api/v2/task/{TASK_ID}/comment`
- Confirm the newest comment text matches what you posted

Important findings:
- `notify_all` is required in the direct API body
- Using `notify_all: False` successfully posted the comment
- The task `86e0mrare` accepted the comment on Apr 10, 2026
- This means QA reports can be posted to ClickUp again even though the Composio wrapper is stale

Practical rule:
- For ClickUp comments, prefer the direct API over the Composio write action until the script is patched
- Do not tell the user ClickUp posting is impossible without first trying the direct API path

### firecrawl_agent.py CLI Flags
The `firecrawl_agent.py` script does NOT accept `--formats` or `--output` flags (confirmed
Apr 8, 2026). Use `--screenshot` and `--mobile` flags only. For raw HTML analysis, use
browser_console DOM inspection (Option C) instead -- it's free and more reliable.

### General Pitfalls
- Firecrawl interact() costs 2-7 credits per MINUTE of session time. Always stop_interaction()
  when done. Use it only when you need to click through dynamic content or test forms
  that require JavaScript interaction.
- firecrawl-py SDK v4.22+: Use `from firecrawl import Firecrawl` (not FirecrawlApp).
  Search results are in `.web` (not `.data`). Map results have `.links` with objects.
- ALWAYS scrape the live page. Never rubber-stamp based on the Google Doc draft alone.
- The Google Doc and the live page WILL diverge. QA the live page.
- Check phone numbers against the homepage EVERY TIME. Copy-paste phone errors are #1.
- Quote exact text from the page so the specialist can find what you are talking about.
- Provide the fix WITH the issue. Don't just say "this is wrong."
- Note template-level bugs separately -- these need dev attention, not specialist fixes.
- Don't be pedantic about style preferences not in the brand guide.
- DO flag anything that would embarrass ProofPilot in front of a client.
- If the site is down, use SERP-based QA as a fallback (Google cache, Wayback Machine).

## ClickUp + Slack Integration

**Script:** `scripts/clickup_integration.py`

QAPilot is wired into the full agency workflow. It can pull tasks, run QA, post results
back to ClickUp AND the right Slack channels automatically.

### Architecture

```
ClickUp "Ready for Review"
    |
    v
clickup_integration.py scan  -->  list of tasks with URLs, clients, keywords
    |
    v
qapilot_runner.py  -->  7-layer QA report
    |
    v
clickup_integration.py post_qa_results()
    |-- ClickUp task comment (full QA report)
    |-- #pilot-ai-qa-agent Slack (rich Block Kit summary)
    |-- Client Slack channel (condensed verdict + link to ClickUp)
    |-- Tag: qa-pass or qa-needs-fixes
```

### Client Routing (Automatic)

QAPilot maps ClickUp space IDs to client names, Slack channels, and domains:

| Client | ClickUp Space | Slack Channel | Domain |
|--------|--------------|---------------|--------|
| Dolce Electric | 90171140336 | #dolce | electriciansmesaaz.com |
| Saiyan Electric | 90171038884 | #saiyan | saiyanelectric.com |
| All Thingz Electric | 90170921347 | #all-thingz | allthingzelectric.com |
| PCE | 90171147412 | #pce | pelicancoastelectric.com |
| ISS | 90171158237 | #iss | integrativesportsandspine.com |
| Cedar Gold | 90173603726 | #cedar-gold | N/A |
| Alpha PM | 90173548886 | #alpha-pm | N/A |
| Wild Within | 90174652310 | #wild-within | N/A |
| LAF Counseling | 90173975136 | #laf-counseling | N/A |
| HEROPM | 90174684474 | #heropm | N/A |

### CLI Commands

```bash
SCRIPTS=~/.hermes/skills/productivity/qapilot/scripts

# Scan the entire review queue
python3 $SCRIPTS/clickup_integration.py scan

# Scan just one client
python3 $SCRIPTS/clickup_integration.py scan --space 90171140336  # Dolce only

# Get task details + auto-detected URL
python3 $SCRIPTS/clickup_integration.py get-task TASK_ID

# Post a comment on a ClickUp task
python3 $SCRIPTS/clickup_integration.py post-comment TASK_ID "QA findings here"

# Post to Slack channel
python3 $SCRIPTS/clickup_integration.py slack-post C0AR6FQKXKK "Message"
```

### URL Detection

The integration automatically finds the live URL for a task by checking (in order):
1. URLs in task description
2. URL-type custom fields
3. URLs in task comments
4. Inferred from task name + client domain (fallback)

When the URL is inferred, it may need manual verification. The script flags the source.

### Full QA from ClickUp Task

When someone says "QA task 86dzb237y" or drops a ClickUp link, the flow is:

```python
# 1. Get task details
from clickup_integration import get_task, extract_url_from_task, get_client_from_task, extract_keyword_from_task
task = get_task("86dzb237y")
urls = extract_url_from_task(task)
client = get_client_from_task(task)
keyword = extract_keyword_from_task(task)

# 2. Run QA
from qapilot_runner import run_full_qa
report = run_full_qa(urls[0][0], client["name"], keyword, "/tmp/qa")

# 3. Post results everywhere
from clickup_integration import post_qa_results
report["_client_info"] = client
post_qa_results("86dzb237y", report)
```

### Where QA Results Go

1. **ClickUp task comment** -- Full QA report (plain text, every finding with fix)
   Addressed to the specialist. They see it in their task.
2. **#pilot-ai-qa-agent** -- Rich Block Kit summary with scorecard, screenshots, verdict
   The QA command center. Matthew/Marcos monitor this.
3. **Client Slack channel** -- One-liner verdict with link to ClickUp task
   Keeps the team informed without noise.
4. **Task tag** -- `qa-pass` or `qa-needs-fixes` for filtering in ClickUp

### Workflow States

```
Specialist creates page
    |
    v
Status: "In Progress" --> "Ready for Review"
    |
    v
QAPilot scans review queue (or is triggered manually)
    |
    v
QAPilot runs 7-layer review
    |
    v
QA results posted to ClickUp + Slack
    |
    v
If APPROVED: tag "qa-pass", specialist/manager can move to "Approved"
If NEEDS FIXES: tag "qa-needs-fixes", specialist fixes, resubmits
    |
    v
Matthew or Marcos final approval
```

### Triggering QA

QAPilot can be triggered in any of these ways:

1. **Direct command**: "QA this URL" / "QA task 86dzb237y" / "Review this page"
2. **ClickUp link**: Drop a ClickUp task URL and say "QA this"
3. **Slack message in any channel**: "@Pilot QA this [URL]"
4. **Batch scan**: "Scan the review queue" / "QA all Dolce tasks"
5. **Future: Automated heartbeat** -- Pilot scans "Ready for Review" queue periodically
   and runs QA on new tasks without being asked
