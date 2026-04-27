#!/usr/bin/env python3
"""Shared Slack API helpers for Pilot scripts."""

from __future__ import annotations

import json
import os
import pathlib
import re
import urllib.request
from typing import Any

CANONICAL_SLACK_TOKEN = os.getenv("PROOFPILOT_FALLBACK_SLACK_BOT_TOKEN", "")
SLACK_TOKEN = os.getenv("SLACK_BOT_TOKEN") or CANONICAL_SLACK_TOKEN
SLACK_API_BASE = "https://slack.com/api"
VISIBLE_OUTPUT_FORBIDDEN_SNIPPETS = (
    "[SILENT]",
    "HEARTBEAT_STATE",
    "[HEARTBEAT_OK]",
    "Cronjob Response:",
    "run complete",
    "scan results",
    "automation alert",
    "scheduled reminder",
)


def read_text(path: str) -> str:
    return pathlib.Path(path).read_text(encoding="utf-8").strip()


def read_json(path: str) -> Any:
    return json.loads(pathlib.Path(path).read_text(encoding="utf-8"))


def sanitize_slack_text(text: str) -> str:
    if not isinstance(text, str):
        return text
    text = text.replace("\u2014", ",").replace("\u2013", ",")
    text = re.sub(r"\*\*([^*]+)\*\*", r"*\1*", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"<\2|\1>", text)
    lines = text.splitlines()
    cleaned_lines = []
    for line in lines:
        if line.startswith("### "):
            cleaned_lines.append("*" + line[4:].strip() + "*")
        elif line.startswith("## "):
            cleaned_lines.append("*" + line[3:].strip() + "*")
        elif line.startswith("# "):
            cleaned_lines.append("*" + line[2:].strip() + "*")
        else:
            cleaned_lines.append(line)
    return "\n".join(cleaned_lines)


def sanitize_payload(value: Any) -> Any:
    if isinstance(value, str):
        return sanitize_slack_text(value)
    if isinstance(value, list):
        return [sanitize_payload(item) for item in value]
    if isinstance(value, dict):
        return {key: sanitize_payload(item) for key, item in value.items()}
    return value


def payload_visible_errors(payload: dict) -> list[str]:
    text = json.dumps(payload, ensure_ascii=False)
    errors = []
    for snippet in VISIBLE_OUTPUT_FORBIDDEN_SNIPPETS:
        if snippet in text:
            errors.append(f"payload contains forbidden visible snippet: {snippet}")
    return errors


def post_api(method: str, payload: dict, *, token: str | None = None) -> dict:
    auth_token = token or SLACK_TOKEN
    if not auth_token:
        return {"ok": False, "error": "missing_slack_token"}
    req = urllib.request.Request(
        f"{SLACK_API_BASE}/{method}",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {auth_token}",
            "Content-Type": "application/json; charset=utf-8",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def post_api_with_fallback(method: str, payload: dict) -> dict:
    result = post_api(method, payload)
    if result.get("ok"):
        return result
    current_env_token = os.getenv("SLACK_BOT_TOKEN")
    if (
        result.get("error") == "invalid_auth"
        and CANONICAL_SLACK_TOKEN
        and current_env_token
        and current_env_token != CANONICAL_SLACK_TOKEN
    ):
        retry = post_api(method, payload, token=CANONICAL_SLACK_TOKEN)
        retry.setdefault("_token_fallback", True)
        return retry
    return result


def validate_blocks(blocks: list[dict]) -> list[str]:
    errors: list[str] = []
    if not isinstance(blocks, list):
        return ["blocks payload must be a JSON array"]
    if len(blocks) > 50:
        errors.append(f"too many blocks: {len(blocks)} > 50")

    for idx, block in enumerate(blocks, start=1):
        if not isinstance(block, dict):
            errors.append(f"block {idx}: must be an object")
            continue
        block_type = block.get("type")
        if block_type == "header":
            text = ((block.get("text") or {}).get("text") or "")
            text_type = ((block.get("text") or {}).get("type") or "")
            if text_type != "plain_text":
                errors.append(f"block {idx}: header text must use plain_text")
            if len(text) > 150:
                errors.append(f"block {idx}: header text exceeds 150 chars")
        elif block_type == "section":
            text_obj = block.get("text") or {}
            if text_obj:
                text = text_obj.get("text") or ""
                if len(text) > 3000:
                    errors.append(f"block {idx}: section text exceeds 3000 chars")
            fields = block.get("fields") or []
            if len(fields) > 10:
                errors.append(f"block {idx}: section has {len(fields)} fields, max 10")
            for field_idx, field in enumerate(fields, start=1):
                if len((field or {}).get("text") or "") > 2000:
                    errors.append(f"block {idx} field {field_idx}: exceeds 2000 chars")
        elif block_type == "context":
            elements = block.get("elements") or []
            if len(elements) > 10:
                errors.append(f"block {idx}: context has {len(elements)} elements, max 10")
            for elem_idx, element in enumerate(elements, start=1):
                if len((element or {}).get("text") or "") > 2000:
                    errors.append(f"block {idx} element {elem_idx}: exceeds 2000 chars")
        elif block_type == "actions":
            elements = block.get("elements") or []
            if len(elements) > 25:
                errors.append(f"block {idx}: actions has {len(elements)} elements, max 25")
        elif block_type == "image":
            alt_text = block.get("alt_text") or ""
            if not alt_text:
                errors.append(f"block {idx}: image block requires alt_text")

    return errors
