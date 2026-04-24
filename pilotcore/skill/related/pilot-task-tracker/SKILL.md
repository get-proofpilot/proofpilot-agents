---
name: pilot-task-tracker
description: >-
  Use when claiming work from Slack conversations, tracking Pilot's own task
  progress, reporting on active work in digests, or running the execution cron.
  Covers task schema, status flow, reading/writing tasks on VPS via SSH,
  cron integration patterns, and execution pitfalls. Tasks persist at
  ~/pilot-tasks.json on VPS across sessions.
---

# Pilot Task Tracker

## Overview
Pilot claims tasks, tracks them, reports on them, and completes them. Tasks persist in `~/pilot-tasks.json` on the Hostinger VPS (187.124.234.21) across sessions. The reactor reads this file when generating responses and status updates. Connect via paramiko SSH to read/write.

## Task Schema
```json
{
  "id": "abc123",
  "project": "Cedar Gold",
  "title": "Build IRA product pages",
  "description": "Create 5 IRA product pages based on approved content",
  "status": "in_progress",
  "owner": "pilot",
  "created_at": "2026-03-30T04:00:00Z",
  "due_date": "2026-04-02",
  "completed_at": null,
  "source": "channel-monitor",
  "notes": [
    {"ts": "2026-03-30T04:00:00Z", "text": "Claimed from #cedar-gold-group discussion"},
    {"ts": "2026-03-30T16:00:00Z", "text": "3 of 5 pages drafted, staging for review"}
  ]
}
```

## Status Flow
`claimed` > `in_progress` > `completed`
Side statuses: `blocked` (waiting on someone), `cancelled` (no longer needed)

## Projects (use these exact names)
Cedar Gold, PCE, Power Route, Saiyan, Dolce, All Thingz, ISS, Wild Within, Alpha PM, Trading Academy, HEROPM, Adam Levinstein, LAF Counseling, AMPED, Home Heroes, BYND, ProofPilot Internal

## How Tasks Get Created

### From Channel Monitoring (context sync cron)
When scanning channels, look for:
- Unanswered questions Pilot can answer
- Work items nobody has claimed
- Tasks mentioned but not assigned
- Follow-ups that fell through the cracks

### From Matthew (direct request)
Matthew assigns work in DMs. Create a task immediately with source "matthew-request".

### From Execution Cron (self-generated)
When completing work, Pilot may identify follow-up tasks. Create them with source "self-generated".

## Reading Tasks
```bash
# All active tasks
cat ~/pilot-tasks.json | python3 -c "import json,sys; tasks=json.load(sys.stdin); [print(f'{t[\"id\"]} | {t[\"project\"]} | {t[\"title\"]} | {t[\"status\"]}') for t in tasks if t['status'] not in ('completed','cancelled')]"

# Tasks by project
cat ~/pilot-tasks.json | python3 -c "import json,sys; tasks=json.load(sys.stdin); [print(f'{t[\"id\"]} | {t[\"title\"]} | {t[\"status\"]}') for t in tasks if t['project']=='Cedar Gold']"

# Overdue tasks
cat ~/pilot-tasks.json | python3 -c "
import json,sys,datetime
tasks=json.load(sys.stdin)
today=datetime.date.today().isoformat()
for t in tasks:
  if t.get('due_date') and t['due_date']<today and t['status'] not in ('completed','cancelled'):
    print(f'OVERDUE: {t[\"project\"]} | {t[\"title\"]} | due {t[\"due_date\"]}')
"
```

## Writing Tasks (Python pattern)
```python
import json, datetime, uuid

def load_tasks():
    try:
        with open('/root/pilot-tasks.json') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_tasks(tasks):
    with open('/root/pilot-tasks.json', 'w') as f:
        json.dump(tasks, f, indent=2)

def claim_task(project, title, description="", due_date=None, source="channel-monitor"):
    tasks = load_tasks()
    now = datetime.datetime.utcnow().isoformat() + "Z"
    task = {
        "id": uuid.uuid4().hex[:8],
        "project": project,
        "title": title,
        "description": description,
        "status": "claimed",
        "owner": "pilot",
        "created_at": now,
        "due_date": due_date,
        "completed_at": None,
        "source": source,
        "notes": [{"ts": now, "text": f"Claimed by Pilot from {source}"}]
    }
    tasks.append(task)
    save_tasks(tasks)
    return task["id"]

def update_task(task_id, status=None, note=None):
    tasks = load_tasks()
    now = datetime.datetime.utcnow().isoformat() + "Z"
    for t in tasks:
        if t["id"] == task_id:
            if status:
                t["status"] = status
                if status == "completed":
                    t["completed_at"] = now
            if note:
                t["notes"].append({"ts": now, "text": note})
            break
    save_tasks(tasks)
```

## Cron Integration

### Context Sync (every 4h)
After scanning channels, check ~/pilot-tasks.json for:
- Tasks that are blocked and the blocker may have been resolved
- Tasks with approaching deadlines
- Completed tasks that should be reported

### Execution Cron (daily)
1. Load all tasks with status "claimed" or "in_progress"
2. For each task, determine if Pilot can make progress now
3. Do the actual work (research, draft content, build deliverables)
4. Update task notes with what was done
5. Stage deliverables for Matthew's approval in DM

### Digest Reporting
When generating digests, include a "Pilot's Plate" section:
- :white_check_mark: Completed since last digest
- :arrows_counterclockwise: In progress with latest update
- :red_circle: Blocked with what's needed
- :dart: Claimed and ready to start

## Execution Pitfalls (Learned Mar 2026)

### Large Slack API Pulls in execute_code
The execute_code sandbox has a ~50KB stdout cap. When paginating Slack history (100+ messages per page), responses get truncated mid-JSON and cause parse failures. Even `json.loads(s, strict=False)` won't help with truncation.
**Fix:** Write a standalone .py script to disk via write_file, then run it with `terminal("python3 /root/script.py", timeout=60)`. The terminal tool handles large outputs properly. This applies to any bulk API data collection.

### Web Search for Small Businesses
`web_search` and `web_extract` frequently return zero results for small electrical contractors and home service businesses. Many don't have enough web presence. Try:
1. Firecrawl scrape of their domain directly (if you have the URL from their email)
2. Yelp/Google search with location qualifiers
3. Accept that some leads simply won't have online presence to enrich

## Best Practices
- Always add a note when changing status
- Use consistent project names (see list above)
- Archive completed tasks older than 30 days (move to ~/pilot-tasks-archive.json)
- One task per deliverable, not one task per project
- When reporting, show pride in completed work (see pilot-communication Viktor Standard)
