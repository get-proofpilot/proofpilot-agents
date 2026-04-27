#!/usr/bin/env python3
"""
Local Falcon helper for AuditPilot geo-grid rankings and heat maps.

Env / key:
  LOCAL_FALCON_API_KEY, or loads from ~/.proofpilot/secrets/local_falcon.env

Core functions:
  find_location(query, near=None)     -> list of matching Google Places
  add_location(place_id, platform)    -> save to Local Falcon account
  existing_reports(place_id=None)     -> list reports (optionally filtered)
  run_scan(place_id, keyword, lat, lng, grid_size, radius, measurement, platform, eager=True)
  fetch_report(report_key)            -> full report dict (points, rankings, metrics)
  download_images(report_key, owner_key, out_dir) -> {grid_png, heatmap_png}
  account()                           -> account + credit balance

All return parsed JSON dicts. Raises RuntimeError on non-200 responses.

CLI:
  python3 local_falcon.py account
  python3 local_falcon.py reports --limit 5
  python3 local_falcon.py report <report_key>
  python3 local_falcon.py images <report_key> <owner_key> --out /tmp/lf/
  python3 local_falcon.py find "Dolce Electric" --near "Mesa, AZ"
  python3 local_falcon.py scan --place_id ChIJ... --keyword "electrician near me" \\
      --lat 33.39 --lng -111.84 --grid 7 --radius 10 --measurement mi --platform google
"""
from __future__ import annotations
import argparse
import json
import os
import sys
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://api.localfalcon.com"
SECRETS = Path(
    os.environ.get(
        "LOCAL_FALCON_SECRETS_PATH",
        str(Path.home() / ".proofpilot" / "secrets" / "local_falcon.env"),
    )
)


def _load_key() -> str:
    key = os.environ.get("LOCAL_FALCON_API_KEY")
    if key:
        return key.strip()
    if SECRETS.exists():
        for line in SECRETS.read_text().splitlines():
            if line.startswith("LOCAL_FALCON_API_KEY="):
                return line.split("=", 1)[1].strip()
    raise RuntimeError(
        "LOCAL_FALCON_API_KEY not set. Export it or write to "
        f"{SECRETS} as LOCAL_FALCON_API_KEY=xxx"
    )


def _post(path: str, fields: dict) -> dict:
    key = _load_key()
    fields = {**fields, "api_key": key}
    data = urllib.parse.urlencode(fields).encode()
    req = urllib.request.Request(f"{BASE}{path}", data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    with urllib.request.urlopen(req, timeout=300) as r:
        body = json.loads(r.read())
    if not body.get("success"):
        raise RuntimeError(f"LocalFalcon error {body.get('code')}: {body.get('message')}")
    return body


def _get(path: str, params: dict | None = None) -> dict:
    key = _load_key()
    params = {**(params or {}), "api_key": key}
    url = f"{BASE}{path}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(url, timeout=120) as r:
        body = json.loads(r.read())
    if not body.get("success"):
        raise RuntimeError(f"LocalFalcon error {body.get('code')}: {body.get('message')}")
    return body


# Public API ---------------------------------------------------------------

def account() -> dict:
    return _post("/v2/account", {})["data"]


def find_location(query: str, near: str | None = None, platform: str = "google") -> list[dict]:
    # Local Falcon v2 uses `name` + `proximity`, not `query` + `near`.
    params = {"name": query, "platform": platform}
    if near:
        params["proximity"] = near
    return _post("/v2/locations/search", params)["data"]


def add_location(place_id: str, platform: str = "google") -> dict:
    return _post("/v2/locations/add", {"place_id": place_id, "platform": platform})["data"]


def existing_reports(place_id: str | None = None, limit: int = 25) -> list[dict]:
    params: dict = {"limit": str(limit)}
    if place_id:
        params["place_id"] = place_id
    return _get("/v1/reports/", params)["data"]["reports"]


def fetch_report(report_key: str) -> dict:
    """Returns the raw report data dict. Check report.get('arp') to detect completion."""
    return _get(f"/v1/reports/{report_key}/")["data"]


def wait_for_report(report_key: str, timeout: int = 300, interval: int = 20) -> dict:
    """Poll until the scan completes or timeout elapses.

    Local Falcon returns {status: 'processing'} with code 202 while running
    and the full report with ARP/ATRP/SoLV/data_points when done (code 200).
    This helper polls every `interval` seconds up to `timeout` seconds total.
    Raises TimeoutError if the scan does not finish in time.
    """
    import time
    elapsed = 0
    while elapsed < timeout:
        report = fetch_report(report_key)
        if report.get("arp") is not None and report.get("data_points"):
            return report
        time.sleep(interval)
        elapsed += interval
    raise TimeoutError(f"Scan {report_key} did not complete within {timeout}s")


def run_scan(
    place_id: str,
    keyword: str,
    lat: float | str,
    lng: float | str,
    grid_size: int | str = 7,
    radius: float | str = 5,
    measurement: str = "mi",
    platform: str = "google",
    ai_analysis: bool = False,
    eager: bool = False,
) -> dict:
    """Run a live geo-grid scan. Burns credits: grid_size^2 per scan."""
    return _post(
        "/v2/run-scan/",
        {
            "place_id": place_id,
            "keyword": keyword,
            "lat": str(lat),
            "lng": str(lng),
            "grid_size": str(grid_size),
            "radius": str(radius),
            "measurement": measurement,
            "platform": platform,
            "ai_analysis": "true" if ai_analysis else "false",
            "eager": "true" if eager else "false",
        },
    )["data"]


def download_images(report_key: str, owner_key: str, out_dir: str | Path) -> dict:
    """Downloads the grid image and heatmap PNGs for a scan report."""
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    urls = {
        "grid": f"https://lf-static-v2.localfalcon.com/image/{report_key}/{owner_key}",
        "heatmap": f"https://lf-static-v2.localfalcon.com/heatmap-img/{report_key}/{owner_key}",
    }
    paths = {}
    for kind, url in urls.items():
        dest = out / f"{report_key}_{kind}.png"
        with urllib.request.urlopen(url, timeout=60) as r:
            dest.write_bytes(r.read())
        paths[f"{kind}_png"] = str(dest)
    return paths


def summarize(report: dict) -> dict:
    """Extract the metrics AuditPilot cares about from a full report."""
    loc = report.get("location", {})
    return {
        "business": loc.get("name"),
        "place_id": report.get("place_id"),
        "keyword": report.get("keyword"),
        "platform": report.get("platform"),
        "grid_size": report.get("grid_size"),
        "radius": f"{report.get('radius')} {report.get('measurement')}",
        "data_points": report.get("points") or len(report.get("data_points") or []),
        "found_in": report.get("found_in"),
        "arp": report.get("arp"),
        "atrp": report.get("atrp"),
        "solv_pct": report.get("solv"),
        "unique_competitors": report.get("unique_competitors"),
        "rating": loc.get("rating"),
        "reviews": loc.get("reviews"),
        "heatmap_url": report.get("heatmap"),
        "grid_image_url": report.get("image"),
        "public_url": report.get("public_url"),
        "pdf_url": report.get("pdf"),
        "report_key": report.get("report_key"),
    }


def rich_report(report: dict, top_n: int = 10) -> dict:
    """
    Extract everything AuditPilot needs to drop into a doc: target metrics,
    top competitors by SoLV, #1 position holders, grid presence leaders,
    center-point top 5, and AI analysis if present.
    """
    from collections import Counter

    loc = report.get("location", {})
    places = report.get("places") or {}
    rankings = report.get("rankings") or {}
    by_solv = rankings.get("by_solv") or {}
    by_arp = rankings.get("by_arp") or {}
    by_atrp = rankings.get("by_atrp") or {}
    data_points = report.get("data_points") or []
    target_pid = report.get("place_id")

    # Top competitors by SoLV (skip the target business itself)
    top_by_solv = [
        pid
        for pid in sorted(by_solv.keys(), key=lambda k: float(by_solv[k]), reverse=True)
        if pid != target_pid
    ][:top_n]

    def profile(pid: str) -> dict:
        p = places.get(pid, {})
        return {
            "name": p.get("name"),
            "place_id": pid,
            "reviews": p.get("reviews"),
            "rating": p.get("rating"),
            "claimed": p.get("claimed"),
            "phone": p.get("phone"),
            "url": p.get("url") or p.get("display_url"),
            "found_in": p.get("found_in"),
            "found_in_pct": p.get("found_in_pct"),
            "solv": by_solv.get(pid, p.get("solv")),
            "arp": by_arp.get(pid, p.get("arp")),
            "atrp": by_atrp.get(pid, p.get("atrp")),
        }

    top_competitors = [profile(pid) for pid in top_by_solv]

    # #1 position holders across all grid points
    first_place_counter: Counter = Counter()
    top3_counter: Counter = Counter()
    grid_presence: Counter = Counter()
    for pt in data_points:
        results = pt.get("results") or []
        for idx, r in enumerate(results):
            grid_presence[r.get("place_id")] += 1
            if idx < 3:
                top3_counter[r.get("place_id")] += 1
            if idx == 0:
                first_place_counter[r.get("place_id")] += 1

    def leader_list(counter: Counter, n: int) -> list[dict]:
        out = []
        for pid, count in counter.most_common(n):
            p = places.get(pid) or {}
            out.append(
                {
                    "name": p.get("name", "?"),
                    "place_id": pid,
                    "count": count,
                    "reviews": p.get("reviews"),
                    "rating": p.get("rating"),
                }
            )
        return out

    total_points = len(data_points) or int(report.get("points") or 0) or 1

    # Center point top 5 (closest to target location)
    target_lat = float(report.get("lat") or loc.get("lat") or 0)
    target_lng = float(report.get("lng") or loc.get("lng") or 0)
    center_pt = None
    if data_points:
        center_pt = min(
            data_points,
            key=lambda p: abs(float(p.get("lat", 0)) - target_lat)
            + abs(float(p.get("lng", 0)) - target_lng),
        )
    center_top5 = []
    if center_pt:
        for r in (center_pt.get("results") or [])[:5]:
            center_top5.append(
                {
                    "rank": r.get("rank"),
                    "name": r.get("name"),
                    "reviews": r.get("reviews"),
                    "rating": r.get("rating"),
                    "distance": r.get("distance_from_point"),
                    "url": r.get("display_url"),
                }
            )

    # AI analysis if present
    ai = report.get("ai_analysis")
    ai_payload = None
    if isinstance(ai, dict):
        ai_payload = ai
    elif isinstance(ai, str) and ai.strip():
        ai_payload = {"text": ai}

    return {
        "target": {
            "business": loc.get("name"),
            "place_id": target_pid,
            "phone": loc.get("phone"),
            "url": loc.get("url") or loc.get("display_url"),
            "rating": loc.get("rating"),
            "reviews": loc.get("reviews"),
            "claimed": loc.get("claimed"),
        },
        "scan": {
            "keyword": report.get("keyword"),
            "platform": report.get("platform"),
            "grid_size": report.get("grid_size"),
            "radius": f"{report.get('radius')} {report.get('measurement')}",
            "total_points": total_points,
            "date": report.get("date"),
        },
        "metrics": {
            "solv_pct": report.get("solv"),
            "arp": report.get("arp"),
            "atrp": report.get("atrp"),
            "found_in": report.get("found_in"),
            "coverage_pct": round(
                (float(report.get("found_in") or 0) / total_points) * 100, 1
            ),
            "unique_competitors": report.get("unique_competitors"),
        },
        "top_competitors": top_competitors,
        "first_place_holders": leader_list(first_place_counter, top_n),
        "top3_holders": leader_list(top3_counter, top_n),
        "grid_presence_leaders": leader_list(grid_presence, top_n),
        "center_point_top5": center_top5,
        "ai_analysis": ai_payload,
        "images": {
            "grid_image": report.get("image"),
            "heatmap": report.get("heatmap"),
            "pdf": report.get("pdf"),
            "public_url": report.get("public_url"),
        },
        "report_key": report.get("report_key"),
    }


def render_rich_markdown(rich: dict) -> str:
    """Render a rich_report() output as readable markdown for the audit doc."""
    t = rich["target"]
    s = rich["scan"]
    m = rich["metrics"]
    lines = []
    lines.append(f"# Local Search Visibility Report — {t['business']}")
    lines.append(
        f"**Keyword:** {s['keyword']}  |  **Platform:** {s['platform']}  |  "
        f"**Grid:** {s['grid_size']}x{s['grid_size']} ({s['total_points']} points, {s['radius']} radius)  "
        f"|  **Scanned:** {s['date']}"
    )
    lines.append("")
    lines.append("## Target Metrics")
    lines.append(
        f"- **Share of Local Voice:** {m['solv_pct']}%  ({m['found_in']}/{s['total_points']} points, {m['coverage_pct']}% coverage)"
    )
    lines.append(f"- **Average Rank (ARP):** {m['arp']}")
    lines.append(f"- **Average Top Rank (ATRP):** {m['atrp']}")
    lines.append(f"- **Unique competitors in scan:** {m['unique_competitors']}")
    lines.append(f"- **Business Rating:** {t['rating']}★ ({t['reviews']} reviews)")
    lines.append("")
    lines.append("## Who Is Outranking You (Top 10 by SoLV)")
    lines.append("| # | Business | SoLV | ARP | ATRP | Reviews | Rating |")
    lines.append("|---|---|---|---|---|---|---|")
    for i, c in enumerate(rich["top_competitors"], 1):
        lines.append(
            f"| {i} | {c['name']} | {c['solv']}% | {c['arp']} | {c['atrp']} | {c['reviews']} | {c['rating']}★ |"
        )
    lines.append("")
    lines.append("## #1 Position Holders")
    for h in rich["first_place_holders"][:5]:
        lines.append(
            f"- **{h['name']}** holds #1 at {h['count']} grid points ({h['reviews']} reviews, {h['rating']}★)"
        )
    lines.append("")
    lines.append("## Top 5 at Your Front Door")
    for r in rich["center_point_top5"]:
        lines.append(
            f"- #{r['rank']} {r['name']} — {r['reviews']} reviews, {r['rating']}★, {r['distance']} away"
        )
    lines.append("")
    ai = rich.get("ai_analysis")
    if ai and isinstance(ai, dict):
        import re as _re

        def _clean(txt: str) -> str:
            txt = _re.sub(r"<a [^>]+>([^<]+)</a>", r"\1", txt or "")
            txt = _re.sub(r"<[^>]+>", "", txt)
            return txt.strip()

        summary = ai.get("summary")
        if summary:
            lines.append("## Strategic Summary")
            lines.append(_clean(summary))
            lines.append("")

        problem = ai.get("problem")
        if isinstance(problem, dict):
            majors = problem.get("major") or []
            minors = problem.get("minor") or []
            if majors:
                lines.append("## Major Problems")
                for item in majors:
                    lines.append(f"- {_clean(item)}")
                lines.append("")
            if minors:
                lines.append("## Minor Problems")
                for item in minors:
                    lines.append(f"- {_clean(item)}")
                lines.append("")

        success = ai.get("success")
        if isinstance(success, dict):
            wins = (success.get("major") or []) + (success.get("minor") or [])
            if wins:
                lines.append("## What Is Working")
                for item in wins:
                    lines.append(f"- {_clean(item)}")
                lines.append("")

        vulnerable = ai.get("vulnerable")
        if isinstance(vulnerable, list) and vulnerable:
            lines.append("## Vulnerable Competitors (Overtake Targets)")
            for item in vulnerable:
                lines.append(f"- {_clean(item)}")
            lines.append("")

        citations = ai.get("citations")
        if isinstance(citations, list) and citations:
            lines.append("## Citation Opportunities")
            for c in citations:
                if isinstance(c, dict):
                    lines.append(f"- {c.get('name')}: {c.get('url')}")
            lines.append("")
    imgs = rich["images"]
    lines.append("## Assets")
    lines.append(f"- Grid image (rich, map overlay): {imgs['grid_image']}")
    lines.append(f"- Heatmap overlay: {imgs['heatmap']}")
    lines.append(f"- PDF export: {imgs['pdf']}")
    lines.append(f"- Public link: {imgs['public_url']}")
    return "\n".join(lines)


# CLI ----------------------------------------------------------------------

def _print(obj):
    json.dump(obj, sys.stdout, indent=2, default=str)
    print()


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("account")

    r = sub.add_parser("reports")
    r.add_argument("--place_id")
    r.add_argument("--limit", type=int, default=25)

    rep = sub.add_parser("report")
    rep.add_argument("report_key")
    rep.add_argument("--summary", action="store_true")
    rep.add_argument("--rich", action="store_true", help="Full rich_report() structure")
    rep.add_argument("--markdown", action="store_true", help="Render as audit-ready markdown")
    rep.add_argument("--ai", action="store_true", help="Wait for AI analysis if enabled")

    img = sub.add_parser("images")
    img.add_argument("report_key")
    img.add_argument("owner_key")
    img.add_argument("--out", default="/tmp/localfalcon/")

    fl = sub.add_parser("find")
    fl.add_argument("query")
    fl.add_argument("--near")
    fl.add_argument("--platform", default="google")

    add = sub.add_parser("add")
    add.add_argument("place_id")
    add.add_argument("--platform", default="google")

    sc = sub.add_parser("scan")
    sc.add_argument("--place_id", required=True)
    sc.add_argument("--keyword", required=True)
    sc.add_argument("--lat", required=True)
    sc.add_argument("--lng", required=True)
    sc.add_argument("--grid", default="7")
    sc.add_argument("--radius", default="5")
    sc.add_argument("--measurement", default="mi")
    sc.add_argument("--platform", default="google")
    sc.add_argument("--ai", action="store_true", help="Request Local Falcon AI analysis")
    sc.add_argument("--eager", action="store_true")

    args = p.parse_args()

    if args.cmd == "account":
        _print(account())
    elif args.cmd == "reports":
        _print(existing_reports(args.place_id, args.limit))
    elif args.cmd == "report":
        if args.ai:
            # POST to wait for AI analysis
            data = _post(f"/v1/reports/{args.report_key}/", {"ai_analysis": "true"})["data"]
        else:
            data = fetch_report(args.report_key)
        if args.markdown:
            print(render_rich_markdown(rich_report(data)))
        elif args.rich:
            _print(rich_report(data))
        elif args.summary:
            _print(summarize(data))
        else:
            _print(data)
    elif args.cmd == "images":
        _print(download_images(args.report_key, args.owner_key, args.out))
    elif args.cmd == "find":
        _print(find_location(args.query, args.near, args.platform))
    elif args.cmd == "add":
        _print(add_location(args.place_id, args.platform))
    elif args.cmd == "scan":
        _print(
            run_scan(
                place_id=args.place_id,
                keyword=args.keyword,
                lat=args.lat,
                lng=args.lng,
                grid_size=args.grid,
                radius=args.radius,
                measurement=args.measurement,
                platform=args.platform,
                ai_analysis=args.ai,
                eager=args.eager,
            )
        )


if __name__ == "__main__":
    main()
