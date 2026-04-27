#!/usr/bin/env python3
"""Send an acknowledgment message in the current Slack thread.

Uses PILOT_SESSION_CHAT_ID / PILOT_SESSION_THREAD_ID env vars, with
HERMES_SESSION_* as a legacy fallback, to post in the exact thread the user
messaged from.

Usage (from agent via terminal tool):
    python3 _shared/skills/pilot-api-reference/scripts/slack_ack.py "On it. Give me a few minutes."

Or with explicit channel/thread:
    python3 slack_ack.py "Working on it." --channel C0AC89HP4N4 --thread 1775630758.784529
"""

import json
import os
import sys
import urllib.request

SLACK_TOKEN = os.getenv("SLACK_BOT_TOKEN", "")

def send_ack(message: str, channel: str = None, thread_ts: str = None) -> dict:
    """Post an ack message in the current thread."""
    channel = channel or os.getenv("PILOT_SESSION_CHAT_ID") or os.getenv("HERMES_SESSION_CHAT_ID", "")
    thread_ts = thread_ts or os.getenv("PILOT_SESSION_THREAD_ID") or os.getenv("HERMES_SESSION_THREAD_ID", "")

    if not channel:
        return {"ok": False, "error": "No channel (PILOT_SESSION_CHAT_ID not set)"}
    if not SLACK_TOKEN:
        return {"ok": False, "error": "SLACK_BOT_TOKEN not set"}

    payload = {"channel": channel, "text": message}
    if thread_ts:
        payload["thread_ts"] = thread_ts

    req = urllib.request.Request(
        "https://slack.com/api/chat.postMessage",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {SLACK_TOKEN}",
            "Content-Type": "application/json",
        },
    )
    resp = urllib.request.urlopen(req, timeout=10)
    return json.loads(resp.read().decode())

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("message", help="The ack message to send")
    parser.add_argument("--channel", default=None)
    parser.add_argument("--thread", default=None)
    args = parser.parse_args()

    result = send_ack(args.message, args.channel, args.thread)
    if result.get("ok"):
        print(f"Ack sent (ts: {result.get('ts')})")
    else:
        print(f"Failed: {result.get('error')}", file=sys.stderr)
        sys.exit(1)
