---
name: proofpilot-agents
description: >
  ProofPilot Named Agent Registry. Eight specialist AI agents: QAPilot (skill: qapilot),
  ProjectPilot (skill: projectpilot), AutoPilot (skill: autopilot), AuditPilot (skill: audit-pilot),
  RedditPilot (skill: redditpilot), StrategyPilot (skill: strategy-pilot),
  GBPPilot (skill: gbp-pilot), and ReportPilot (skill: reportpilot).
  Load the corresponding skill when ANY agent is mentioned by name. This registry exists
  to ensure agents are always found, even if the user says "QAPilot" instead of the
  skill name "qapilot". ALWAYS load this skill first when you hear any agent name,
  then load the specific agent skill.
tags: [agents, registry, qapilot, autopilot, auditpilot, strategypilot, reportpilot, qa, audit, reporting, content, proofpilot]
---

# ProofPilot Named Agent Registry

ProofPilot has 8 named specialist AI agents. When ANYONE mentions one of these by name,
IMMEDIATELY load the corresponding skill with skill_view().

## Agent Directory

| Agent Name | Skill to Load | What It Does |
|-----------|---------------|-------------|
| **QAPilot** | `qapilot` | Internal QA of SEO deliverables. Reviews pages our team creates before manager approval. 7-layer review. |
| **ProjectPilot** | `projectpilot` | PM + launch-control agent. Tracks GBP coverage, review-response hygiene, page handoffs, launch verification, and what should have moved forward already. |
| **AutoPilot** | `autopilot` | SEO content generation pipeline. 6-stage pipeline on VPS that generates production-ready HTML pages. |
| **AuditPilot** | `audit-pilot` | Sales-focused website audits for prospects. Branded .docx reports with DataForSEO data. |
| **RedditPilot** | `redditpilot` | Reddit marketing automation. Subreddit discovery, opportunity scanning, AI content gen with anti-detection, Slack approval. Multi-client. |
| **StrategyPilot** | `strategy-pilot` | SEO strategy and page architecture planning. Builds full ProofPilot-branded strategy documents, page-system recommendations, and prioritized growth roadmaps. |
| **GBPPilot** | `gbp-pilot` | Google Business Profile strategy and map-pack alignment. Builds categories, services, products, posts, review systems, and website mirroring plans for local businesses. |
| **ReportPilot** | `reportpilot` | Client reporting agent for monthly SEO reports, ad hoc performance reports, and ongoing reporting workflows. Combines live data, QA, and strategic insight layers. |

## Trigger Phrases -> Agent Mapping

| If someone says... | Load this skill |
|-------------------|----------------|
| "QAPilot", "QA Pilot", "QA this", "review this page", "first pass", "check this page" | `qapilot` |
| "ProjectPilot", "Project Pilot", "project manager agent", "PM agent", "check handoffs", "check launch", "check GBP posting", "check review responses" | `projectpilot` |
| "AutoPilot", "Auto Pilot", "use autopilot", "generate a page", "content sprint", "build service page", "redesign homepage" | `autopilot` |
| "AuditPilot", "Audit Pilot", "audit this site", "website audit", "SEO audit", "run an audit", "evaluate this website", "competitive intelligence", "reverse-engineer their playbook", "learn what they do well", "study this agency" | `audit-pilot` |
| "RedditPilot", "Reddit Pilot", "reddit agent", "reddit bot", "post on reddit", "reddit marketing", "reddit automation", "reddit comments" | `redditpilot` |
| "StrategyPilot", "Strategy Pilot", "strategy doc", "SEO strategy", "website strategy", "content strategy", "growth strategy", "page map" | `strategy-pilot` |
| "GBPPilot", "GBP Pilot", "GBP strategy", "Google Business Profile strategy", "Google Business Profile optimization", "GMB strategy", "map pack strategy", "Google Maps visibility plan" | `gbp-pilot` |
| "ReportPilot", "Report Pilot", "monthly report", "SEO report", "client report", "performance report", "ad hoc report", "report draft" | `reportpilot` |

## How to Use

1. You see a message mentioning an agent name or trigger phrase
2. Call the matching skill, such as `skill_view("qapilot")`, `skill_view("projectpilot")`, `skill_view("autopilot")`, `skill_view("audit-pilot")`, `skill_view("strategy-pilot")`, or `skill_view("reportpilot")`
3. Follow that skill's instructions exactly
4. Do NOT improvise or "manually follow the methodology" if a tool is unavailable -- STOP and tell the user

## Agent Boundaries

- **QAPilot** reviews pages WE created (internal quality control)
- **ProjectPilot** tracks whether recurring deliverables, GBP work, review responses, and page launches are actually moving and truly complete
- **AuditPilot** audits PROSPECT websites (sales documents)
- **AutoPilot** GENERATES new content (production pipeline)
- **ReportPilot** BUILDS and QA's client reporting deliverables from live data and current context

These are different tools for different jobs. Don't confuse them.

## Old Skill Names (Redirects)

These old names may appear in memory, cron jobs, or conversations:
- `seo-qa-agent` -> now `qapilot`
- `autopilot-ai` -> now `autopilot`
- `audit-pilot` -> unchanged
