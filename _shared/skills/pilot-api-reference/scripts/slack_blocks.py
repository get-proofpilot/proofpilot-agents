#!/usr/bin/env python3
"""Reusable Block Kit builders and heuristics for Pilot Slack messages."""

from __future__ import annotations

from typing import Optional


def header(text: str) -> dict:
    return {
        "type": "header",
        "text": {"type": "plain_text", "text": text[:150], "emoji": True},
    }


def section(text: str) -> dict:
    return {
        "type": "section",
        "text": {"type": "mrkdwn", "text": text[:3000]},
    }


def fields_section(fields: list[tuple[str, str]]) -> dict:
    return {
        "type": "section",
        "fields": [
            {"type": "mrkdwn", "text": f"*{label}*\n{value}"[:2000]}
            for label, value in fields[:10]
        ],
    }


def divider() -> dict:
    return {"type": "divider"}


def context(*texts: str) -> dict:
    return {
        "type": "context",
        "elements": [{"type": "mrkdwn", "text": text[:2000]} for text in texts[:10]],
    }


def image_block(url: str, alt_text: str, title: Optional[str] = None) -> dict:
    block = {"type": "image", "image_url": url, "alt_text": alt_text}
    if title:
        block["title"] = {"type": "plain_text", "text": title[:2000], "emoji": True}
    return block


def button(text: str, action_id: str, url: Optional[str] = None, style: Optional[str] = None, value: Optional[str] = None) -> dict:
    btn = {
        "type": "button",
        "text": {"type": "plain_text", "text": text[:75], "emoji": True},
        "action_id": action_id[:255],
    }
    if url:
        btn["url"] = url
    if style in {"primary", "danger"}:
        btn["style"] = style
    if value is not None:
        btn["value"] = value[:2000]
    return btn


def actions(*buttons: dict) -> dict:
    return {"type": "actions", "elements": list(buttons[:25])}


def quick_update(text: str) -> list[dict]:
    return [section(text)]


def status_report(title: str, lead: str, body_sections: list[str], footer: Optional[str] = None) -> list[dict]:
    blocks: list[dict] = [header(title), section(lead)]
    for body in body_sections:
        blocks.extend([divider(), section(body)])
    if footer:
        blocks.extend([divider(), context(footer)])
    return blocks


def approval_request(request_text: str, approve_label: str = "Approve", reject_label: str = "Reject") -> list[dict]:
    return [
        section(request_text),
        actions(
            button(approve_label, "approve", style="primary"),
            button(reject_label, "reject", style="danger"),
        ),
    ]


def channel_summary(summary_text: str, footer_text: str = "Full breakdown in thread below.") -> list[dict]:
    return [section(summary_text), context(footer_text)]


def estimate_render_lines(blocks: list[dict]) -> int:
    total = 0
    for block in blocks:
        block_type = block.get("type")
        if block_type == "header":
            total += 2
        elif block_type == "divider":
            total += 1
        elif block_type == "context":
            total += 2
        elif block_type == "image":
            total += 12
        elif block_type == "section":
            if block.get("fields"):
                field_lines = 0
                for field in block["fields"]:
                    text = field.get("text") or ""
                    field_lines = max(field_lines, max(1, text.count("\n") + 1))
                total += max(2, field_lines)
            else:
                text = ((block.get("text") or {}).get("text") or "")
                total += max(2, text.count("\n") + 1)
        elif block_type == "actions":
            total += 2
    return total


def classify_collapse_zone(blocks: list[dict]) -> str:
    lines = estimate_render_lines(blocks)
    if lines <= 16:
        return "fully_visible"
    if lines <= 40:
        return "borderline"
    return "likely_collapsed"
