#!/usr/bin/env python3
"""Upload a file to Slack and optionally share a linked companion message.

Examples:
    python3 upload_and_share_file.py D0AQ9PB64L8 /tmp/report.pdf --comment "Weekly report"
    python3 upload_and_share_file.py C0ARPPREJQ0 /tmp/report.docx --thread-ts 1776853724.993639 --share-text "*Report ready.* <FILE_PERMALINK|Open file>"
"""

from __future__ import annotations

import argparse
import json
import os
import pathlib
import sys
import urllib.request

from slack_api_utils import SLACK_API_BASE, SLACK_TOKEN, post_api


def upload_file(channel: str, file_path: str, comment: str = "", thread_ts: str | None = None) -> dict:
    boundary = "----PilotSlackUploadBoundary7MA4YWxkTrZu0gW"
    filename = os.path.basename(file_path)
    data = pathlib.Path(file_path).read_bytes()

    parts = []
    def add_field(name: str, value: str) -> None:
        parts.append(f"--{boundary}\r\n".encode())
        parts.append(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode())
        parts.append(value.encode())
        parts.append(b"\r\n")

    add_field("channels", channel)
    if comment:
        add_field("initial_comment", comment)
    if thread_ts:
        add_field("thread_ts", thread_ts)

    parts.append(f"--{boundary}\r\n".encode())
    parts.append(f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'.encode())
    parts.append(b"Content-Type: application/octet-stream\r\n\r\n")
    parts.append(data)
    parts.append(b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode())

    body = b"".join(parts)
    req = urllib.request.Request(
        f"{SLACK_API_BASE}/files.upload",
        data=body,
        headers={
            "Authorization": f"Bearer {SLACK_TOKEN}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    parser = argparse.ArgumentParser(description="Upload a file to Slack and optionally share a follow-up message")
    parser.add_argument("channel", help="Slack channel or DM ID")
    parser.add_argument("file_path", help="Local path to the file")
    parser.add_argument("--comment", default="", help="Optional initial comment on the file upload")
    parser.add_argument("--thread-ts", help="Optional thread timestamp")
    parser.add_argument("--share-text", help="Optional companion message. Use the literal token FILE_PERMALINK to inject the uploaded permalink")
    args = parser.parse_args()

    upload_result = upload_file(args.channel, args.file_path, args.comment, args.thread_ts)
    if not upload_result.get("ok"):
        print(json.dumps(upload_result, ensure_ascii=False))
        return 1

    share_result = None
    if args.share_text:
        permalink = ((upload_result.get("file") or {}).get("permalink")) or ""
        text = args.share_text.replace("FILE_PERMALINK", permalink)
        payload = {"channel": args.channel, "text": text}
        if args.thread_ts:
            payload["thread_ts"] = args.thread_ts
        share_result = post_api("chat.postMessage", payload)

    print(json.dumps({"upload": upload_result, "share": share_result}, ensure_ascii=False))
    if share_result is not None and not share_result.get("ok"):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
