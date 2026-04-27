#!/usr/bin/env python3
"""Post a short summary in channel and full detail in thread.

Examples:
    python3 send_threaded_reply.py C0ARPPREJQ0 --summary-file /tmp/summary.txt --detail-blocks /tmp/detail_blocks.json
    python3 send_threaded_reply.py C0ARPPREJQ0 --summary-text "*Pulse ready.* One item needs attention." --detail-text-file /tmp/detail.txt
"""

from __future__ import annotations

import argparse
import json
import sys

from slack_api_utils import post_api, read_json, read_text, validate_blocks
from slack_blocks import channel_summary, quick_update


def main() -> int:
    parser = argparse.ArgumentParser(description="Post channel summary plus thread detail")
    parser.add_argument("channel", help="Slack channel or DM ID")
    parser.add_argument("--summary-text", help="Short summary text for the parent message")
    parser.add_argument("--summary-file", help="File containing parent summary text")
    parser.add_argument("--summary-footer", default="Full breakdown in thread below.")
    parser.add_argument("--detail-blocks", help="JSON file with full-detail blocks for the thread reply")
    parser.add_argument("--detail-text", help="Plain text for thread reply when blocks are not needed")
    parser.add_argument("--detail-text-file", help="File containing thread reply text")
    args = parser.parse_args()

    summary_text = args.summary_text or (read_text(args.summary_file) if args.summary_file else "")
    if not summary_text:
        raise SystemExit("Provide --summary-text or --summary-file")

    if args.detail_blocks:
        detail_blocks = read_json(args.detail_blocks)
        errors = validate_blocks(detail_blocks)
        if errors:
            raise SystemExit("Detail block validation failed:\n- " + "\n- ".join(errors))
        detail_payload = {"channel": args.channel, "text": "Pilot detail", "blocks": detail_blocks}
    else:
        detail_text = args.detail_text or (read_text(args.detail_text_file) if args.detail_text_file else "")
        if not detail_text:
            raise SystemExit("Provide --detail-blocks, --detail-text, or --detail-text-file")
        detail_payload = {"channel": args.channel, "text": detail_text, "blocks": quick_update(detail_text)}

    parent_payload = {
        "channel": args.channel,
        "text": summary_text,
        "blocks": channel_summary(summary_text, args.summary_footer),
    }

    parent = post_api("chat.postMessage", parent_payload)
    if not parent.get("ok"):
        print(json.dumps(parent, ensure_ascii=False))
        return 1

    detail_payload["thread_ts"] = parent["ts"]
    thread_reply = post_api("chat.postMessage", detail_payload)
    print(json.dumps({"parent": parent, "thread_reply": thread_reply}, ensure_ascii=False))
    return 0 if thread_reply.get("ok") else 1


if __name__ == "__main__":
    sys.exit(main())
