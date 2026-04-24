#!/usr/bin/env python3
"""Post Slack messages via Web API, with Block Kit, updates, template rendering, and validation.

Examples:
    python3 slack_post.py D0AQ9PB64L8 "Quick text message"
    python3 slack_post.py D0AQ9PB64L8 --text-file /tmp/message.txt
    python3 slack_post.py D0AQ9PB64L8 --blocks-file /tmp/blocks.json --fallback-text "Morning briefing"
    python3 slack_post.py D0AQ9PB64L8 --template-type attention_ledger --template-data-file /tmp/ledger.json
    python3 slack_post.py D0AQ9PB64L8 --payload-file /tmp/payload.json
    python3 slack_post.py D0AQ9PB64L8 --blocks-file /tmp/blocks.json --thread-ts 1776100000.123456
    python3 slack_post.py D0AQ9PB64L8 --replace-ts 1776100000.123456 --blocks-file /tmp/updated.json --fallback-text "Updated"
"""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import sys
from datetime import datetime, timezone

sys.path.insert(0, os.getenv("PILOT_REACTOR_PATH", "/root/pilot-reactor"))

try:
    from outbound_guard import record_delivery as guard_record_delivery
    from outbound_guard import record_suppression as guard_record_suppression
    from outbound_guard import should_suppress_payload
except ModuleNotFoundError:
    def guard_record_delivery(*args, **kwargs):
        return None

    def guard_record_suppression(*args, **kwargs):
        return None

    def should_suppress_payload(*args, **kwargs):
        return False, {}
from render_pilot_message import render
from slack_blocks import classify_collapse_zone
from slack_api_utils import (
    payload_visible_errors,
    post_api_with_fallback,
    read_json,
    read_text,
    sanitize_payload,
    validate_blocks,
)


def _fallback_text_from_blocks(blocks: list[dict]) -> str:
    parts: list[str] = []
    for block in blocks:
        if block.get("type") == "header":
            text = ((block.get("text") or {}).get("text") or "").strip()
            if text:
                parts.append(text)
        elif block.get("type") == "section":
            text = ((block.get("text") or {}).get("text") or "").strip()
            if text:
                parts.append(text.replace("\n", " "))
        if parts:
            break
    fallback = " | ".join(parts).strip()
    return fallback[:280] if fallback else "Pilot update"


def build_payload(args: argparse.Namespace) -> tuple[dict, str | None]:
    if args.payload_file:
        payload = read_json(args.payload_file)
        payload.setdefault("channel", args.channel)
        if args.thread_ts and "thread_ts" not in payload:
            payload["thread_ts"] = args.thread_ts
        payload = sanitize_payload(payload)
        return payload, None

    payload: dict = {"channel": args.channel}
    template_type = args.template_type

    text = args.text
    if args.text_file:
        text = read_text(args.text_file)

    if template_type:
        if not args.template_data_file:
            raise SystemExit("--template-type requires --template-data-file")
        template_data = read_json(args.template_data_file)
        blocks = render(template_type, template_data)
        errors = validate_blocks(blocks)
        if errors:
            raise SystemExit("Block validation failed:\n- " + "\n- ".join(errors))
        blocks = sanitize_payload(blocks)
        payload["blocks"] = blocks
        payload["text"] = args.fallback_text or _fallback_text_from_blocks(blocks)
    elif args.blocks_file:
        blocks = read_json(args.blocks_file)
        errors = validate_blocks(blocks)
        if errors:
            raise SystemExit("Block validation failed:\n- " + "\n- ".join(errors))
        blocks = sanitize_payload(blocks)
        payload["blocks"] = blocks
        payload["text"] = args.fallback_text or text or _fallback_text_from_blocks(blocks)
    elif text:
        payload["text"] = text
    else:
        raise SystemExit("Provide message text, --text-file, --blocks-file, --template-type with --template-data-file, or --payload-file")

    payload = sanitize_payload(payload)

    if args.thread_ts:
        payload["thread_ts"] = args.thread_ts
    if args.reply_broadcast:
        payload["reply_broadcast"] = True
    if args.replace_ts:
        payload["ts"] = args.replace_ts

    return payload, template_type


def maybe_record_receipt(method: str, payload: dict, result: dict, template_type: str | None = None, extra_meta: dict | None = None) -> None:
    outbound_dir = os.getenv("HERMES_CRON_OUTBOUND_DIR", "").strip()
    job_id = os.getenv("HERMES_CRON_JOB_ID", "").strip()
    if not outbound_dir or not job_id:
        return

    outdir = pathlib.Path(outbound_dir)
    outdir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d_%H-%M-%S")
    receipt_path = outdir / f"{timestamp}_manual_slack_post.json"
    blocks = payload.get("blocks") or []
    receipt = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "delivered" if result.get("ok") else "delivery_error",
        "via": "slack_post.py",
        "method": method,
        "job_id": job_id,
        "channel": payload.get("channel"),
        "thread_ts": payload.get("thread_ts"),
        "replace_ts": payload.get("ts"),
        "text_preview": str(payload.get("text", ""))[:500],
        "has_blocks": bool(blocks),
        "block_count": len(blocks),
        "collapse_zone": classify_collapse_zone(blocks) if blocks else "plain_text",
        "template_type": template_type,
        "slack_response": result,
    }
    if extra_meta:
        receipt["guard"] = extra_meta
    receipt_path.write_text(json.dumps(receipt, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Post or update a Slack message with optional Block Kit")
    parser.add_argument("channel", help="Slack channel or DM ID, e.g. D0AQ9PB64L8")
    parser.add_argument("text", nargs="?", help="Plain fallback text or simple message")
    parser.add_argument("--text-file", dest="text_file", help="Path to UTF-8 text file for message text")
    parser.add_argument("--blocks-file", dest="blocks_file", help="Path to JSON array of Block Kit blocks")
    parser.add_argument("--template-type", dest="template_type", choices=[
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
    ], help="Render a canonical Pilot template instead of passing raw blocks")
    parser.add_argument("--template-data-file", dest="template_data_file", help="Path to JSON data for --template-type")
    parser.add_argument("--fallback-text", dest="fallback_text", help="Fallback plain text when using Block Kit")
    parser.add_argument("--payload-file", dest="payload_file", help="Path to full JSON payload")
    parser.add_argument("--thread-ts", dest="thread_ts", help="Optional Slack thread timestamp")
    parser.add_argument("--replace-ts", dest="replace_ts", help="Update an existing message instead of posting a new one")
    parser.add_argument("--reply-broadcast", action="store_true", help="Broadcast a thread reply into the channel")
    args = parser.parse_args()

    payload, template_type = build_payload(args)
    visible_errors = payload_visible_errors(payload)
    if visible_errors:
        raise SystemExit("Visible output validation failed:\n- " + "\n- ".join(visible_errors))

    method = "chat.update" if args.replace_ts else "chat.postMessage"
    guard_meta: dict | None = None
    cron_job_id = os.getenv("PILOT_CRON_JOB_ID") or os.getenv("HERMES_CRON_JOB_ID", "")
    if method == "chat.postMessage" and cron_job_id.strip():
        suppressed, guard_meta = should_suppress_payload(payload, template_type=template_type)
        if suppressed:
            guard_record_suppression(
                payload,
                reason=guard_meta.get("reason", "suppressed_by_guard"),
                template_type=template_type,
            )
            result = {
                "ok": True,
                "suppressed": True,
                "reason": guard_meta.get("reason"),
                "matched_at": guard_meta.get("matched_at"),
                "headline": guard_meta.get("headline"),
            }
            maybe_record_receipt(method, payload, result, template_type=template_type, extra_meta=guard_meta)
            print(json.dumps(result, ensure_ascii=False))
            return 0

    result = post_api_with_fallback(method, payload)
    if method == "chat.postMessage" and result.get("ok"):
        guard_record_delivery(payload, result=result, template_type=template_type)
    maybe_record_receipt(method, payload, result, template_type=template_type, extra_meta=guard_meta)
    print(json.dumps(result, ensure_ascii=False))
    return 0 if result.get("ok") else 1


if __name__ == "__main__":
    sys.exit(main())
