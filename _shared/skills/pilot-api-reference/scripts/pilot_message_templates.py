#!/usr/bin/env python3
"""Canonical Viktor-style Slack message templates for Pilot.

These builders give Pilot a small set of consistent high-quality message shapes
for the patterns that come up constantly across crons and interactive work.
"""

from __future__ import annotations

from typing import Iterable, Sequence

from slack_blocks import channel_summary, context, divider, header, quick_update, section


def _join_bullets(items: Sequence[str]) -> str:
    return "\n".join(f"• {item}" for item in items if item)


def work_completed(message: str, link_url: str | None = None, link_label: str = "Open") -> list[dict]:
    text = f":white_check_mark: {message}"
    if link_url:
        text += f"\n\n<{link_url}|{link_label}>"
    return quick_update(text)


def quiet_heads_up(title_emoji: str, title: str, summary: str, detail: str | None = None, footer: str | None = None) -> list[dict]:
    blocks: list[dict] = [section(f"{title_emoji} *{title}*\n{summary}")]
    if detail:
        blocks.extend([divider(), section(detail)])
    if footer:
        blocks.extend([divider(), context(footer)])
    return blocks


def pm_digest(
    title: str,
    summary: str,
    needs_attention: Sequence[str] | None = None,
    on_track: Sequence[str] | None = None,
    decisions: Sequence[str] | None = None,
    footer: str | None = None,
) -> list[dict]:
    blocks: list[dict] = [header(title), section(summary)]

    if needs_attention:
        blocks.extend([
            divider(),
            section(":red_circle: *Needs attention*\n" + _join_bullets(needs_attention)),
        ])
    if on_track:
        blocks.extend([
            divider(),
            section(":white_check_mark: *Moving*\n" + _join_bullets(on_track)),
        ])
    if decisions:
        blocks.extend([
            divider(),
            section(":dart: *Needs a decision*\n" + _join_bullets(decisions)),
        ])
    if footer:
        blocks.extend([divider(), context(footer)])
    return blocks


def morning_briefing(
    title: str,
    summary: str,
    schedule: Sequence[str] | None = None,
    inbox: Sequence[str] | None = None,
    moving: Sequence[str] | None = None,
    priorities: Sequence[str] | None = None,
    footer: str | None = None,
) -> list[dict]:
    blocks: list[dict] = [header(title), section(summary)]

    if schedule:
        blocks.extend([
            divider(),
            section(":calendar: *Today's schedule*\n" + _join_bullets(schedule)),
        ])
    if inbox:
        blocks.extend([
            divider(),
            section(":envelope: *Inbox*\n" + _join_bullets(inbox)),
        ])
    if moving:
        blocks.extend([
            divider(),
            section(":bar_chart: *What's moving*\n" + _join_bullets(moving)),
        ])
    if priorities:
        numbered = "\n".join(f"{idx}. {item}" for idx, item in enumerate(priorities, start=1) if item)
        blocks.extend([
            divider(),
            section(":key: *Your priorities*\n" + numbered),
        ])
    if footer:
        blocks.extend([divider(), context(footer)])
    return blocks


def lead_card_summary(opening: str, leads: Sequence[dict], closer: str | None = None) -> list[dict]:
    lines = [opening]
    for idx, lead in enumerate(leads, start=1):
        name = lead.get("name", "Unknown")
        company = lead.get("company", "")
        date = lead.get("date", "")
        metrics = lead.get("metrics", "")
        services = lead.get("services", "")
        location = lead.get("location", "")
        email = lead.get("email", "")
        header_line = f"{idx}. *{name}*"
        if company:
            header_line += f" , {company}"
        if date:
            header_line += f" ({date})"
        lines.append(header_line)
        if metrics:
            lines.append(f"• {metrics}")
        if services:
            lines.append(f"• {services}")
        if location:
            lines.append(f"• {location}")
        if email:
            lines.append(f"• {email}")
        lines.append("")
    if closer:
        lines.append(closer)
    text = "\n".join(line for line in lines if line is not None).strip()
    return quick_update(text)


def summary_plus_thread_parent(summary_text: str, footer_text: str = "Full breakdown in thread below.") -> list[dict]:
    return channel_summary(summary_text, footer_text)


def multi_section_report(title: str, summary: str, sections: Iterable[tuple[str, str]], footer: str | None = None) -> list[dict]:
    blocks: list[dict] = [header(title), section(summary)]
    for section_title, body in sections:
        blocks.extend([divider(), section(f"*{section_title}*\n{body}")])
    if footer:
        blocks.extend([divider(), context(footer)])
    return blocks


def attention_ledger(
    title: str,
    summary: str,
    follow_up: Sequence[str] | None = None,
    decide: Sequence[str] | None = None,
    review: Sequence[str] | None = None,
    escalate: Sequence[str] | None = None,
    footer: str | None = None,
) -> list[dict]:
    blocks: list[dict] = [header(title), section(summary)]
    if follow_up:
        blocks.extend([divider(), section(":wave: *Follow up*\n" + _join_bullets(follow_up))])
    if decide:
        blocks.extend([divider(), section(":dart: *Decide*\n" + _join_bullets(decide))])
    if review:
        blocks.extend([divider(), section(":eyes: *Review*\n" + _join_bullets(review))])
    if escalate:
        blocks.extend([divider(), section(":warning: *Escalate*\n" + _join_bullets(escalate))])
    if footer:
        blocks.extend([divider(), context(footer)])
    return blocks


def pm_watch_update(
    title: str,
    summary: str,
    watch_items: Sequence[str] | None = None,
    route_to: Sequence[str] | None = None,
    resolved: Sequence[str] | None = None,
    footer: str | None = None,
) -> list[dict]:
    blocks: list[dict] = [header(title), section(summary)]
    if watch_items:
        blocks.extend([divider(), section(":large_yellow_circle: *Watch items*\n" + _join_bullets(watch_items))])
    if route_to:
        blocks.extend([divider(), section(":clipboard: *Routing*\n" + _join_bullets(route_to))])
    if resolved:
        blocks.extend([divider(), section(":white_check_mark: *Resolved or moving*\n" + _join_bullets(resolved))])
    if footer:
        blocks.extend([divider(), context(footer)])
    return blocks


def page_flow_alert(title: str, summary: str, next_move: str, footer: str | None = None) -> list[dict]:
    blocks: list[dict] = [section(f":bar_chart: *{title}*\n{summary}")]
    blocks.extend([divider(), section(f"*Next move*\n{next_move}")])
    if footer:
        blocks.extend([divider(), context(footer)])
    return blocks
