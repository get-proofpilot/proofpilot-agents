#!/usr/bin/env python3
"""Add a Slack reaction with Viktor-style defaults.

Examples:
    python3 react_to_message.py C0ARPPREJQ0 1776853724.993639 --emoji eyes
    python3 react_to_message.py C0ARPPREJQ0 1776853724.993639 --preset done
"""

from __future__ import annotations

import argparse
import json
import sys

from slack_api_utils import post_api

REACTIONS = {
    "acknowledged": "eyes",
    "done": "white_check_mark",
    "in_progress": "hourglass_flowing_sand",
    "launched": "rocket",
    "investigating": "mag",
    "noted": "bulb",
    "urgent": "sos",
}


def main() -> int:
    parser = argparse.ArgumentParser(description="Add a Slack reaction")
    parser.add_argument("channel", help="Slack channel ID")
    parser.add_argument("timestamp", help="Slack message ts")
    parser.add_argument("--emoji", help="Emoji name without colons, e.g. eyes")
    parser.add_argument("--preset", choices=sorted(REACTIONS), help="Use Viktor-style reaction vocabulary")
    args = parser.parse_args()

    emoji = args.emoji or REACTIONS.get(args.preset or "acknowledged")
    result = post_api("reactions.add", {"channel": args.channel, "timestamp": args.timestamp, "name": emoji})
    print(json.dumps(result, ensure_ascii=False))
    return 0 if result.get("ok") else 1


if __name__ == "__main__":
    sys.exit(main())
