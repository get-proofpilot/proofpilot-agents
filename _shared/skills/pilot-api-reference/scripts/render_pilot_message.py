#!/usr/bin/env python3
"""Render canonical Pilot Slack message blocks from JSON input.

Examples:
    python3 render_pilot_message.py --type morning_briefing --input /tmp/briefing_data.json --output /tmp/briefing_blocks.json
    python3 render_pilot_message.py --type pm_digest --input /tmp/digest_data.json --output /tmp/digest_blocks.json
    python3 render_pilot_message.py --type quiet_heads_up --input /tmp/flag.json --output /tmp/flag_blocks.json
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from pilot_message_templates import (
    attention_ledger,
    lead_card_summary,
    morning_briefing,
    multi_section_report,
    page_flow_alert,
    pm_digest,
    pm_watch_update,
    quiet_heads_up,
    summary_plus_thread_parent,
    work_completed,
)


def render(template_type: str, data: dict) -> list[dict]:
    if template_type == "morning_briefing":
        return morning_briefing(**data)
    if template_type == "pm_digest":
        return pm_digest(**data)
    if template_type == "quiet_heads_up":
        return quiet_heads_up(**data)
    if template_type == "work_completed":
        return work_completed(**data)
    if template_type == "lead_card_summary":
        return lead_card_summary(**data)
    if template_type == "summary_plus_thread_parent":
        return summary_plus_thread_parent(**data)
    if template_type == "attention_ledger":
        return attention_ledger(**data)
    if template_type == "pm_watch_update":
        return pm_watch_update(**data)
    if template_type == "page_flow_alert":
        return page_flow_alert(**data)
    if template_type == "multi_section_report":
        sections = data.get("sections") or []
        data = dict(data)
        data["sections"] = [tuple(item) for item in sections]
        return multi_section_report(**data)
    raise SystemExit(f"Unsupported template type: {template_type}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Render a canonical Pilot Slack message to Block Kit JSON")
    parser.add_argument("--type", required=True, choices=[
        "morning_briefing",
        "pm_digest",
        "quiet_heads_up",
        "work_completed",
        "lead_card_summary",
        "summary_plus_thread_parent",
        "attention_ledger",
        "pm_watch_update",
        "page_flow_alert",
        "multi_section_report",
    ])
    parser.add_argument("--input", required=True, help="Path to JSON input data")
    parser.add_argument("--output", required=True, help="Path to write rendered Block Kit JSON")
    args = parser.parse_args()

    data = json.loads(Path(args.input).read_text(encoding="utf-8"))
    blocks = render(args.type, data)
    Path(args.output).write_text(json.dumps(blocks, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"ok": True, "template": args.type, "block_count": len(blocks), "output": args.output}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
