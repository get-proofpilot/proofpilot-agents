#!/usr/bin/env python3
"""Update an existing Slack message in place.

Examples:
    python3 update_existing_message.py C0ARPPREJQ0 1776853724.993639 --text "Done. <https://docs.google.com/...|View doc>"
    python3 update_existing_message.py C0ARPPREJQ0 1776853724.993639 --blocks-file /tmp/updated_blocks.json --fallback-text "Updated"
"""

from __future__ import annotations

import argparse
import json
import sys

from slack_api_utils import post_api, read_json, read_text, validate_blocks


def main() -> int:
    parser = argparse.ArgumentParser(description="Update an existing Slack message")
    parser.add_argument("channel", help="Slack channel or DM ID")
    parser.add_argument("message_ts", help="Slack ts of the message to update")
    parser.add_argument("--text", help="Updated plain text message")
    parser.add_argument("--text-file", help="Path to UTF-8 text file for updated text")
    parser.add_argument("--blocks-file", help="Path to JSON array of updated blocks")
    parser.add_argument("--fallback-text", help="Fallback text for notifications when using blocks")
    args = parser.parse_args()

    payload = {"channel": args.channel, "ts": args.message_ts}
    text = args.text or (read_text(args.text_file) if args.text_file else "")

    if args.blocks_file:
        blocks = read_json(args.blocks_file)
        errors = validate_blocks(blocks)
        if errors:
            raise SystemExit("Block validation failed:\n- " + "\n- ".join(errors))
        payload["blocks"] = blocks
        payload["text"] = args.fallback_text or text or "Pilot update"
    elif text:
        payload["text"] = text
    else:
        raise SystemExit("Provide updated text or --blocks-file")

    result = post_api("chat.update", payload)
    print(json.dumps(result, ensure_ascii=False))
    return 0 if result.get("ok") else 1


if __name__ == "__main__":
    sys.exit(main())
