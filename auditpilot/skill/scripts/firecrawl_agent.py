#!/usr/bin/env python3
"""
firecrawl_agent.py - Firecrawl v2 Agent & Extract wrapper for AuditPilot

Provides two modes:
  1. extract_site()  - /v2/extract: Structured extraction from KNOWN URLs (cheaper)
  2. agent_discover() - /v2/agent: Autonomous discovery (no URLs needed, costs more)

Usage from AuditPilot subagents:
  python3 firecrawl_agent.py extract --url "https://example.com/*" --prompt "..." --schema-file schema.json
  python3 firecrawl_agent.py agent --prompt "Find top HVAC companies in Mesa AZ" --schema-file schema.json
  python3 firecrawl_agent.py poll --job-id "019d..." --endpoint extract|agent
  python3 firecrawl_agent.py competitor-intel --business "Parker & Sons" --city "Phoenix" --trade "HVAC"
  python3 firecrawl_agent.py site-extract --url "https://example.com" --trade "plumbing"
  python3 firecrawl_agent.py rich-scrape --url "https://example.com" [--mobile]
"""

import argparse
import json
import os
import sys
import time
import requests

# API config
API_KEY = os.environ.get("FIRECRAWL_API_KEY")
BASE_URL = "https://api.firecrawl.dev"


def headers() -> dict:
    if not API_KEY:
        raise SystemExit("FIRECRAWL_API_KEY is required for Firecrawl helpers.")
    return {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

# Default credit caps (safety)
DEFAULT_EXTRACT_MAX_CREDITS = 500
DEFAULT_AGENT_MAX_CREDITS = 500
MAX_POLL_WAIT = 300  # 5 minutes max


# ============================================================
# SCHEMAS - Pre-built for common AuditPilot use cases
# ============================================================

SITE_EXTRACT_SCHEMA = {
    "type": "object",
    "properties": {
        "company_name": {"type": "string", "description": "Business name"},
        "phone": {"type": "string", "description": "Primary phone number"},
        "address": {"type": "string", "description": "Physical address"},
        "services": {
            "type": "array",
            "items": {"type": "string"},
            "description": "All services offered"
        },
        "service_areas": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Cities/areas served"
        },
        "about_summary": {"type": "string", "description": "Brief company description from About page"},
        "team_size": {"type": "string", "description": "Number of employees or team description"},
        "years_in_business": {"type": "string", "description": "How long in business"},
        "certifications": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Licenses, certifications, awards"
        },
        "unique_selling_points": {
            "type": "array",
            "items": {"type": "string"},
            "description": "What makes them different - guarantees, specialties, etc."
        }
    }
}

COMPETITOR_SCHEMA = {
    "type": "object",
    "properties": {
        "competitors": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string", "description": "Company name"},
                    "website": {"type": "string", "description": "Website URL"},
                    "phone": {"type": "string", "description": "Phone number"},
                    "services": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Services offered"
                    },
                    "service_areas": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Cities/areas served"
                    },
                    "review_count": {"type": "integer", "description": "Number of Google reviews"},
                    "avg_rating": {"type": "number", "description": "Average Google rating"},
                    "years_in_business": {"type": "string", "description": "How long established"},
                    "unique_selling_points": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Key differentiators"
                    }
                }
            },
            "description": "Top competitors found"
        }
    }
}

REVIEW_SCHEMA = {
    "type": "object",
    "properties": {
        "company_name": {"type": "string"},
        "total_reviews": {"type": "integer"},
        "avg_rating": {"type": "number"},
        "platforms": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "platform": {"type": "string", "description": "Google, Yelp, BBB, etc."},
                    "review_count": {"type": "integer"},
                    "rating": {"type": "number"},
                    "profile_url": {"type": "string"}
                }
            }
        },
        "common_complaints": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Recurring negative themes"
        },
        "common_praise": {
            "type": "array",
            "items": {"type": "string"},
            "description": "Recurring positive themes"
        }
    }
}


# ============================================================
# CORE API FUNCTIONS
# ============================================================

def extract_site(urls, prompt, schema=None, enable_web_search=False, max_credits=DEFAULT_EXTRACT_MAX_CREDITS):
    """
    /v2/extract - Extract structured data from known URLs.
    Cheaper than /agent. Use when you already have the target URL.
    Returns job_id for async polling.
    """
    payload = {
        "urls": urls if isinstance(urls, list) else [urls],
        "prompt": prompt,
        "enableWebSearch": enable_web_search,
    }
    if schema:
        payload["schema"] = schema

    resp = requests.post(f"{BASE_URL}/v2/extract", headers=headers(), json=payload)
    result = resp.json()

    if not result.get("success"):
        print(f"ERROR: Extract failed - {result.get('error', 'Unknown error')}", file=sys.stderr)
        return None

    return {
        "job_id": result["id"],
        "endpoint": "extract",
        "status": "processing"
    }


def agent_discover(prompt, schema=None, urls=None, model="spark-1-mini", max_credits=DEFAULT_AGENT_MAX_CREDITS):
    """
    /v2/agent - Autonomous discovery. No URLs needed.
    More expensive but finds data you don't know where to look for.
    Use for competitor research, market intel, lead enrichment.
    """
    payload = {
        "prompt": prompt,
        "model": model,
        "maxCredits": max_credits,
    }
    if schema:
        payload["schema"] = schema
    if urls:
        payload["urls"] = urls if isinstance(urls, list) else [urls]

    resp = requests.post(f"{BASE_URL}/v2/agent", headers=headers(), json=payload)
    result = resp.json()

    if not result.get("success"):
        print(f"ERROR: Agent failed - {result.get('error', 'Unknown error')}", file=sys.stderr)
        return None

    return {
        "job_id": result["id"],
        "endpoint": "agent",
        "status": "processing"
    }


def poll_job(job_id, endpoint="extract", timeout=MAX_POLL_WAIT):
    """
    Poll an async job until completion or timeout.
    Returns the data on success, None on failure.
    """
    url = f"{BASE_URL}/v2/{endpoint}/{job_id}"
    start = time.time()
    poll_interval = 5  # start at 5s, increase

    while time.time() - start < timeout:
        resp = requests.get(url, headers=headers())
        result = resp.json()

        status = result.get("status", "unknown")

        if status == "completed":
            data = result.get("data", {})
            credits = result.get("creditsUsed", 0)
            tokens = result.get("tokensUsed", 0)
            print(f"Completed. Credits: {credits}, Tokens: {tokens}", file=sys.stderr)
            return data

        if status == "failed":
            error = result.get("error", "Unknown error")
            print(f"FAILED: {error}", file=sys.stderr)
            return None

        elapsed = int(time.time() - start)
        print(f"  [{elapsed}s] Status: {status}...", file=sys.stderr)
        time.sleep(poll_interval)
        poll_interval = min(poll_interval + 5, 30)  # back off to 30s max

    print(f"TIMEOUT after {timeout}s", file=sys.stderr)
    return None


def extract_and_wait(urls, prompt, schema=None, enable_web_search=False, max_credits=DEFAULT_EXTRACT_MAX_CREDITS, timeout=MAX_POLL_WAIT):
    """Extract + poll until done. Returns data directly."""
    job = extract_site(urls, prompt, schema, enable_web_search, max_credits)
    if not job:
        return None
    return poll_job(job["job_id"], "extract", timeout)


def agent_and_wait(prompt, schema=None, urls=None, model="spark-1-mini", max_credits=DEFAULT_AGENT_MAX_CREDITS, timeout=MAX_POLL_WAIT):
    """Agent + poll until done. Returns data directly."""
    job = agent_discover(prompt, schema, urls, model, max_credits)
    if not job:
        return None
    return poll_job(job["job_id"], "agent", timeout)


# ============================================================
# HIGH-LEVEL AUDIT HELPERS
# ============================================================

def site_extract_helper(url, trade="home services"):
    """
    Extract comprehensive business info from a known website.
    Use in Subagent 1 (Site Crawl) alongside existing Firecrawl map/scrape.
    """
    prompt = (
        f"Extract all business information from this {trade} company website. "
        f"Get company name, phone number, physical address, all services offered, "
        f"service areas/cities, about/company description, team size, years in business, "
        f"certifications/licenses/awards, and unique selling points or guarantees."
    )
    # Use wildcard to crawl the whole site
    site_url = url.rstrip("/") + "/*"
    return extract_and_wait(
        urls=[site_url],
        prompt=prompt,
        schema=SITE_EXTRACT_SCHEMA,
        enable_web_search=False,
        max_credits=300
    )


def competitor_intel(business_name, city, trade, num_competitors=3):
    """
    Find and profile top competitors using /v2/agent.
    Use in Subagent 2 (Keywords + Competitors).
    """
    prompt = (
        f"Find the top {num_competitors} {trade} companies in {city} that compete with {business_name}. "
        f"For each competitor, find their website, phone number, services offered, service areas, "
        f"Google review count and rating, how long they have been in business, "
        f"and what makes them stand out (guarantees, specialties, awards). "
        f"Do NOT include {business_name} in the results - only their competitors."
    )
    return agent_and_wait(
        prompt=prompt,
        schema=COMPETITOR_SCHEMA,
        model="spark-1-mini",
        max_credits=500,
        timeout=300
    )


def review_intel(business_name, city, trade):
    """
    Gather review data across platforms for a business.
    Use in Subagent 2 for trust signal analysis.
    """
    prompt = (
        f"Find review and reputation data for {business_name} ({trade}) in {city}. "
        f"Check Google, Yelp, BBB, Angi/HomeAdvisor, and any other review platforms. "
        f"Get the review count and rating from each platform, plus common themes "
        f"in both positive and negative reviews."
    )
    return agent_and_wait(
        prompt=prompt,
        schema=REVIEW_SCHEMA,
        model="spark-1-mini",
        max_credits=300,
        timeout=300
    )


def rich_scrape(url, mobile=False, include_screenshot=True):
    """Direct v2 scrape for additive design and branding signals."""
    formats = ["markdown", "html", "rawHtml", "branding", "links", "images"]
    if include_screenshot:
        formats.append({"type": "screenshot", "fullPage": True, "quality": 85})
    resp = requests.post(
        f"{BASE_URL}/v2/scrape",
        headers=headers(),
        json={
            "url": url,
            "formats": formats,
            "mobile": mobile,
            "onlyMainContent": False,
            "blockAds": True,
            "timeout": 60000,
        },
        timeout=120,
    )
    result = resp.json()
    if not result.get("success"):
        print(f"ERROR: Rich scrape failed - {result.get('error', 'Unknown error')}", file=sys.stderr)
        return None
    return result.get("data", {})


# ============================================================
# CLI INTERFACE
# ============================================================

def main():
    parser = argparse.ArgumentParser(description="Firecrawl v2 Agent/Extract for AuditPilot")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # extract command
    ext = subparsers.add_parser("extract", help="Extract from known URLs (/v2/extract)")
    ext.add_argument("--url", required=True, help="URL(s) to extract from (supports wildcards)")
    ext.add_argument("--prompt", required=True, help="Extraction instructions")
    ext.add_argument("--schema-file", help="JSON schema file path")
    ext.add_argument("--web-search", action="store_true", help="Enable web search enrichment")
    ext.add_argument("--max-credits", type=int, default=500)
    ext.add_argument("--wait", action="store_true", default=True, help="Wait for completion (default: true)")
    ext.add_argument("--no-wait", action="store_true", help="Return job ID immediately")

    # agent command
    agt = subparsers.add_parser("agent", help="Autonomous discovery (/v2/agent)")
    agt.add_argument("--prompt", required=True, help="What to find")
    agt.add_argument("--schema-file", help="JSON schema file path")
    agt.add_argument("--url", help="Optional URL hint")
    agt.add_argument("--model", default="spark-1-mini", choices=["spark-1-mini", "spark-1-pro"])
    agt.add_argument("--max-credits", type=int, default=500)
    agt.add_argument("--wait", action="store_true", default=True)
    agt.add_argument("--no-wait", action="store_true")

    # poll command
    poll = subparsers.add_parser("poll", help="Poll an existing job")
    poll.add_argument("--job-id", required=True)
    poll.add_argument("--endpoint", required=True, choices=["extract", "agent"])
    poll.add_argument("--timeout", type=int, default=300)

    # site-extract shortcut
    se = subparsers.add_parser("site-extract", help="Full site business info extraction")
    se.add_argument("--url", required=True, help="Business website URL")
    se.add_argument("--trade", default="home services", help="Trade/industry")

    # competitor-intel shortcut
    ci = subparsers.add_parser("competitor-intel", help="Find and profile competitors")
    ci.add_argument("--business", required=True, help="Business name")
    ci.add_argument("--city", required=True, help="City/market")
    ci.add_argument("--trade", required=True, help="Trade (HVAC, plumbing, electrical, etc.)")
    ci.add_argument("--count", type=int, default=3, help="Number of competitors to find")

    # review-intel shortcut
    ri = subparsers.add_parser("review-intel", help="Gather review data across platforms")
    ri.add_argument("--business", required=True, help="Business name")
    ri.add_argument("--city", required=True, help="City")
    ri.add_argument("--trade", required=True, help="Trade")

    # rich-scrape shortcut
    rs = subparsers.add_parser("rich-scrape", help="Rich Firecrawl scrape with branding, HTML, images, and screenshot")
    rs.add_argument("--url", required=True, help="Business website URL")
    rs.add_argument("--mobile", action="store_true", help="Render in mobile viewport")
    rs.add_argument("--no-screenshot", action="store_true", help="Skip screenshot generation")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    schema = None
    if hasattr(args, "schema_file") and args.schema_file:
        with open(args.schema_file) as f:
            schema = json.load(f)

    result = None

    if args.command == "extract":
        if args.no_wait:
            result = extract_site(args.url, args.prompt, schema, args.web_search, args.max_credits)
        else:
            result = extract_and_wait(args.url, args.prompt, schema, args.web_search, args.max_credits)

    elif args.command == "agent":
        urls = [args.url] if args.url else None
        if args.no_wait:
            result = agent_discover(args.prompt, schema, urls, args.model, args.max_credits)
        else:
            result = agent_and_wait(args.prompt, schema, urls, args.model, args.max_credits)

    elif args.command == "poll":
        result = poll_job(args.job_id, args.endpoint, args.timeout)

    elif args.command == "site-extract":
        result = site_extract_helper(args.url, args.trade)

    elif args.command == "competitor-intel":
        result = competitor_intel(args.business, args.city, args.trade, args.count)

    elif args.command == "review-intel":
        result = review_intel(args.business, args.city, args.trade)

    elif args.command == "rich-scrape":
        result = rich_scrape(args.url, mobile=args.mobile, include_screenshot=not args.no_screenshot)

    if result is not None:
        print(json.dumps(result, indent=2))
    else:
        print("No data returned.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
