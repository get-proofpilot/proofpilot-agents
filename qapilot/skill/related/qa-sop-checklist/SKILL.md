---
name: qa-sop-checklist
description: >
  Strategic SOP checklist for ProofPilot page QA. Companion to qapilot. Forces reviewers to
  establish audience, page purpose, template, structure, grammar, links, and cross-page
  patterns before issuing a verdict.
tags: [qa, sop, checklist, strategist, content-review, qapilot]
related_skills: [qapilot]
---

# QA SOP Checklist

Companion skill to `qapilot`. Use this when you want the shortest possible operator playbook
for reviewing a page or a batch of pages with strategist-level thinking.

## Core Principle

QA is not proofreading. The reviewer must think like a strategist first and an editor second.
A grammatically clean page can still fail if it speaks to the wrong audience, repeats the
wrong template section, links to the wrong destination, or undermines local credibility.

**Priority rule:** wrong content in the wrong section beats a missing comma every time.

## When to Use

- Manual QA of a live service, location, blog, or landing page
- Batch review across multiple pages on the same site
- Second-pass review after a specialist says a page is fixed
- Onboarding new QA reviewers who need the ProofPilot review order
- Any time you want a compact checklist instead of the full `qapilot` operating manual

## Required Inputs

Collect these before reviewing:

- Live URL
- Client name
- Target keyword or page topic
- Page type: service, location, blog, press release, patch post, etc.
- Intended audience: homeowner, business owner, property manager, GC, patient, etc.
- Brief or ClickUp task context, if available
- 1 to 3 sibling pages on the same site, if template comparison is useful

## Review Order, Always Follow This Sequence

### Phase 1: Orientation Before Reading

Before reading body copy, establish what the page is supposed to be.

- Who is the intended reader?
- What is the page's one job?
- What template or page family is this built from?
- What recurring sitewide/template bugs are already known?
- If reviewing a batch, what does the corrected version look like on sibling pages?

**Goal:** build the filter you will use for every later judgment.

### Phase 2: Structural Scan Top to Bottom

Scroll before you read closely.

- Look for duplicate sections, repeated headings, repeated pricing/CTA blocks, repeated cards
- Ask whether each section belongs on this exact page for this exact audience
- Flag wrong-content sections even if the writing itself looks clean
- Look for missing sections or obvious template gaps
- Compare against fixed sibling pages when available

**Goal:** catch contextual and template failures before grammar distracts you.

### Phase 3: Sentence-Level Grammar Pass

Read sentence by sentence and test the recurring error patterns.

- Comma splices
- Fragments
- Participial phrase attachment, especially `-ing` phrases needing a comma
- Run-ons
- Missing punctuation before lists
- Subject-verb agreement
- Double spaces that hint at missing punctuation or export damage
- Hedging or outdated form intro copy

**Goal:** clean the sentence-level issues only after structure and context make sense.

### Phase 4: Audience and Tone Check

Run this alongside the grammar pass.

- Is each paragraph written for the stated audience?
- On commercial pages, are there residential signals like `your family`, `your home`,
  `homeowners`, or residential resale framing?
- Are local details accurate and credibility-building?
- Does the tone stay consistent from section to section?
- Does the content still serve the page's one job?

**Goal:** protect positioning, credibility, and brand fit.

### Phase 5: Link and Technical Check

Read links and technical signals deliberately.

- Compare anchor text to actual href destination
- Compare displayed phone numbers to `tel:` hrefs
- Check for wrong domains, competitor links, malformed URLs, or stray punctuation
- Verify title, meta description, canonical, schema, featured image / `og:image`, and internal links
- Respect WhatConverts variability, only flag numbers that are broken, misrouted, malformed,
  or not click-to-call where expected

**Goal:** catch the silent errors that look fine visually but fail functionally.

### Phase 6: Cross-Page Pattern Recognition

Use what the site has already taught you.

- Keep a running list of recurring sitewide issues
- Check the most failure-prone sections first on later pages
- Carry fixes from one sibling page to the next
- Speed up by recognizing template residue instead of rediscovering it every time

**Goal:** make QA sharper and faster with each additional page.

## Mandatory Micro-Checks

Do these on every page, no exceptions:

1. Check every section heading against the page's stated audience and purpose
2. Check every `-ing` phrase for clean attachment, often a preceding comma
3. Check every list introduction for a colon or comma before the list begins
4. Check every hyperlink destination against its anchor text
5. Check every residential audience signal on commercial pages
6. Search for double spaces
7. Check form intro copy for hedging language or outdated template wording

## Severity Rubric

### Critical

- Wrong audience or page purpose
- Wrong service/topic section on the page
- Wrong city/local detail
- Broken, misrouted, or competitor links
- Wrong phone behavior or malformed `tel:` link
- Duplicate sections that materially damage the page
- Major copy-paste contamination

### Warning

- Grammar and punctuation errors that affect polish or clarity
- Weak/internal-link gaps
- Tone drift
- Missing FAQ or supporting sections
- Minor schema / metadata misses

### Improvement

- Strategic opportunities
- Better local proof
- Better CTA phrasing
- Added FAQs, proof, media, or cross-links

## Final Verdict Framework

After reviewing, summarize the page in this order:

1. Page purpose and audience you audited against
2. Highest-impact structural/context issue
3. Highest-impact technical/link issue
4. Most important grammar/style cleanup needed
5. Overall verdict: pass, needs edits, or fail before approval

## Relationship to QAPilot

- Use `qapilot` for the full operating system, tools, scripts, and delivery workflow
- Use `qa-sop-checklist` when you need the compact strategic checklist and pass order
- Best practice: load both when building or running a high-quality QA review
