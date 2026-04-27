#!/usr/bin/env python3
"""Pilot Tools Dispatcher — Single entry point for all integration calls.

Viktor's architecture insight: "Build a single tools.py dispatcher that takes
(tool_name, params) and routes to the right client. The dispatcher becomes your
single point for logging, rate limiting, and error handling."

Usage:
    from tools_dispatcher import call_tool
    result = call_tool("slack.post_message", channel="D0AQ9PB64L8", text="Hello")
    result = call_tool("clickup.get_tasks", space_id="90173603726")
    result = call_tool("gmail.fetch", query="is:unread newer_than:1d", max_results=20)

All calls go through this dispatcher for:
- Centralized logging
- Retry logic (3 attempts with backoff)
- Error normalization
- Rate limit awareness
"""

import json
import logging
import os
import time
import urllib.request
import urllib.error
from typing import Any, Optional

logger = logging.getLogger("pilot.tools")

# Credentials are intentionally runtime-only. Set them in the shell or through
# the local ProofPilot secret loader; do not bake harness-specific defaults in.
SLACK_TOKEN = os.getenv("SLACK_BOT_TOKEN", "")
CLICKUP_TOKEN = os.getenv("CLICKUP_API_KEY") or os.getenv("CLICKUP_TOKEN", "")
COMPOSIO_KEY = os.getenv("COMPOSIO_API_KEY") or os.getenv("COMPOSIO_KEY", "")
COMPOSIO_ENTITY = os.getenv("COMPOSIO_ENTITY_ID", "")
FIREFLIES_TOKEN = os.getenv("FIREFLIES_API_KEY", "")

MAX_RETRIES = 3
RETRY_DELAY = 15  # seconds


def _request(url: str, method: str = "GET", headers: dict = None,
             data: dict = None, timeout: int = 30) -> dict:
    """Make an HTTP request with retry logic."""
    headers = headers or {}

    for attempt in range(MAX_RETRIES):
        try:
            if data:
                req = urllib.request.Request(
                    url,
                    data=json.dumps(data).encode("utf-8"),
                    headers={**headers, "Content-Type": "application/json"},
                    method=method
                )
            else:
                req = urllib.request.Request(url, headers=headers, method=method)

            resp = urllib.request.urlopen(req, timeout=timeout)
            return json.loads(resp.read().decode())

        except urllib.error.HTTPError as e:
            if e.code == 429:  # Rate limited
                wait = RETRY_DELAY * (attempt + 1)
                logger.warning(f"Rate limited on {url}, waiting {wait}s (attempt {attempt+1})")
                time.sleep(wait)
                continue
            elif e.code >= 500:  # Server error
                logger.warning(f"Server error {e.code} on {url} (attempt {attempt+1})")
                time.sleep(RETRY_DELAY)
                continue
            else:
                body = e.read().decode() if e.fp else ""
                return {"error": f"HTTP {e.code}", "detail": body}

        except Exception as e:
            if attempt < MAX_RETRIES - 1:
                logger.warning(f"Request failed: {e} (attempt {attempt+1})")
                time.sleep(RETRY_DELAY)
            else:
                return {"error": str(e)}

    return {"error": "Max retries exceeded"}


# === SLACK ===

def slack_post_message(channel: str, text: str, thread_ts: str = None) -> dict:
    payload = {"channel": channel, "text": text}
    if thread_ts:
        payload["thread_ts"] = thread_ts
    return _request(
        "https://slack.com/api/chat.postMessage",
        method="POST",
        headers={"Authorization": f"Bearer {SLACK_TOKEN}"},
        data=payload
    )

def slack_get_history(channel: str, limit: int = 20, oldest: str = None) -> dict:
    url = f"https://slack.com/api/conversations.history?channel={channel}&limit={limit}"
    if oldest:
        url += f"&oldest={oldest}"
    return _request(url, headers={"Authorization": f"Bearer {SLACK_TOKEN}"})

def slack_get_replies(channel: str, ts: str, limit: int = 20) -> dict:
    return _request(
        f"https://slack.com/api/conversations.replies?channel={channel}&ts={ts}&limit={limit}",
        headers={"Authorization": f"Bearer {SLACK_TOKEN}"}
    )


# === CLICKUP ===

def clickup_get_tasks(space_id: str = None, statuses: list = None,
                       include_closed: bool = False, page: int = 0) -> dict:
    url = f"https://api.clickup.com/api/v2/team/9006070686/task?subtasks=true&page={page}"
    if space_id:
        url += f"&space_ids[]={space_id}"
    if statuses:
        for s in statuses:
            url += f"&statuses[]={s}"
    if include_closed:
        url += "&include_closed=true"
    return _request(url, headers={"Authorization": CLICKUP_TOKEN})

def clickup_get_task(task_id: str) -> dict:
    return _request(
        f"https://api.clickup.com/api/v2/task/{task_id}",
        headers={"Authorization": CLICKUP_TOKEN}
    )

def clickup_update_task(task_id: str, updates: dict) -> dict:
    return _request(
        f"https://api.clickup.com/api/v2/task/{task_id}",
        method="PUT",
        headers={"Authorization": CLICKUP_TOKEN},
        data=updates
    )

def clickup_create_task(list_id: str, payload: dict) -> dict:
    return _request(
        f"https://api.clickup.com/api/v2/list/{list_id}/task",
        method="POST",
        headers={"Authorization": CLICKUP_TOKEN},
        data=payload,
    )

def clickup_add_comment(task_id: str, comment_text: str, notify_all: bool = False) -> dict:
    return _request(
        f"https://api.clickup.com/api/v2/task/{task_id}/comment",
        method="POST",
        headers={"Authorization": CLICKUP_TOKEN},
        data={"comment_text": comment_text, "notify_all": notify_all},
    )

def clickup_set_due_date(task_id: str, ms_timestamp: str | int, due_date_time: bool | None = None) -> dict:
    payload = {"due_date": str(ms_timestamp)}
    if due_date_time is not None:
        payload["due_date_time"] = bool(due_date_time)
    return clickup_update_task(task_id, payload)

def clickup_update_assignees(task_id: str, add: list | None = None, rem: list | None = None) -> dict:
    assignees = {}
    if add:
        assignees["add"] = add
    if rem:
        assignees["rem"] = rem
    return clickup_update_task(task_id, {"assignees": assignees})


# === COMPOSIO (Gmail, Calendar, GSC, etc.) ===

def composio_execute(tool_slug: str, arguments: dict) -> dict:
    return _request(
        f"https://backend.composio.dev/api/v3/tools/execute/{tool_slug}",
        method="POST",
        headers={"x-api-key": COMPOSIO_KEY},
        data={"arguments": arguments, "entity_id": COMPOSIO_ENTITY}
    )


# === FIREFLIES ===

def fireflies_query(graphql_query: str) -> dict:
    return _request(
        "https://api.fireflies.ai/graphql",
        method="POST",
        headers={"Authorization": f"Bearer {FIREFLIES_TOKEN}"},
        data={"query": graphql_query}
    )


# === DISPATCHER ===

TOOL_MAP = {
    "slack.post_message": slack_post_message,
    "slack.get_history": slack_get_history,
    "slack.get_replies": slack_get_replies,
    "clickup.get_tasks": clickup_get_tasks,
    "clickup.get_task": clickup_get_task,
    "clickup.update_task": clickup_update_task,
    "clickup.create_task": clickup_create_task,
    "clickup.add_comment": clickup_add_comment,
    "clickup.set_due_date": clickup_set_due_date,
    "clickup.update_assignees": clickup_update_assignees,
    "composio.execute": composio_execute,
    "fireflies.query": fireflies_query,
}

def call_tool(tool_name: str, **kwargs) -> dict:
    """Central dispatcher. All tool calls go through here."""
    if tool_name not in TOOL_MAP:
        return {"error": f"Unknown tool: {tool_name}", "available": list(TOOL_MAP.keys())}

    start = time.time()
    try:
        result = TOOL_MAP[tool_name](**kwargs)
        elapsed = time.time() - start
        logger.info(f"[{tool_name}] OK in {elapsed:.1f}s")
        return result
    except Exception as e:
        elapsed = time.time() - start
        logger.error(f"[{tool_name}] FAILED in {elapsed:.1f}s: {e}")
        return {"error": str(e)}


if __name__ == "__main__":
    # Quick test
    import sys
    if len(sys.argv) > 1:
        tool = sys.argv[1]
        print(f"Testing {tool}...")
        if tool == "slack.test":
            r = slack_get_history("D0AQ9PB64L8", limit=1)
            print(json.dumps(r, indent=2)[:500])
        elif tool == "clickup.test":
            r = clickup_get_tasks(space_id="90173603726")
            tasks = r.get("tasks", [])
            print(f"Got {len(tasks)} tasks")
    else:
        print("Available tools:", list(TOOL_MAP.keys()))
