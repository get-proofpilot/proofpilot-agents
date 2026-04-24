#!/usr/bin/env python3
"""ClickUp gap analysis: compare requested items against live task state.

Usage:
    python3 clickup_gap_analysis.py <list_id> "item1" "item2" "item3" ...

Fetches all tasks in a ClickUp list, then diffs against requested items
to identify what already exists and what needs to be created.

This is the core pattern from Viktor's Saiyan Electric task creation:
Slack conversation = source of truth for intent
ClickUp = source of truth for current state
Gap between them = tasks to create
"""
import json
import os
import sys
import urllib.request

CLICKUP_TOKEN = os.getenv("CLICKUP_API_KEY") or os.getenv("CLICKUP_TOKEN", "")

def get_tasks(list_id: str) -> list:
    """Fetch all tasks from a ClickUp list."""
    if not CLICKUP_TOKEN:
        raise SystemExit("CLICKUP_API_KEY or CLICKUP_TOKEN is required")
    url = f"https://api.clickup.com/api/v2/list/{list_id}/task?subtasks=true&include_closed=false"
    req = urllib.request.Request(url, headers={"Authorization": CLICKUP_TOKEN})
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read().decode())
    return data.get("tasks", [])

def gap_analysis(list_id: str, requested_items: list) -> dict:
    """Compare requested items against live ClickUp state.

    Returns:
        {"already_exists": [...], "needs_creation": [...], "existing_tasks": [...]}
    """
    tasks = get_tasks(list_id)
    existing_names = {t["name"].lower().strip() for t in tasks}

    already_exists = []
    needs_creation = []

    for item in requested_items:
        item_lower = item.lower().strip()
        # Fuzzy match: check if any existing task contains the item or vice versa
        matched = any(
            item_lower in existing or existing in item_lower
            for existing in existing_names
        )
        if matched:
            already_exists.append(item)
        else:
            needs_creation.append(item)

    return {
        "already_exists": already_exists,
        "needs_creation": needs_creation,
        "existing_tasks": [{"name": t["name"], "status": t["status"]["status"]} for t in tasks]
    }

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: clickup_gap_analysis.py <list_id> 'item1' 'item2' ...")
        sys.exit(1)

    list_id = sys.argv[1]
    items = sys.argv[2:]

    result = gap_analysis(list_id, items)

    print(f"\nAlready in ClickUp ({len(result['already_exists'])}):")
    for item in result["already_exists"]:
        print(f"  - {item}")

    print(f"\nNeeds to be created ({len(result['needs_creation'])}):")
    for item in result["needs_creation"]:
        print(f"  - {item}")

    print(f"\nTotal existing tasks in list: {len(result['existing_tasks'])}")
