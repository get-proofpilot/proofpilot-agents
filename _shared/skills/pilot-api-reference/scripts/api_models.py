"""Pydantic-style typed models for ProofPilot API responses.

Viktor's insight: "When I call sdk.clickup.get_tasks() I get back List[ClickUpTask]
with typed fields, not raw JSON."

These models use dataclasses (stdlib) instead of Pydantic to avoid dependency issues
in cron sandboxes. They provide type safety and field access via attributes.

Usage:
    from api_models import ClickUpTask, SlackMessage, GmailEmail

    # Parse raw API response
    tasks = [ClickUpTask.from_dict(t) for t in raw_data.get("tasks", [])]
    for t in tasks:
        print(f"{t.name} ({t.status}) assigned to {t.assignee_name}")
"""

from dataclasses import dataclass, field
from typing import Optional, List
from datetime import datetime


@dataclass
class ClickUpTask:
    id: str
    name: str
    status: str
    assignee_name: Optional[str] = None
    assignee_id: Optional[int] = None
    space_id: Optional[str] = None
    list_name: Optional[str] = None
    due_date: Optional[str] = None
    date_created: Optional[str] = None
    date_updated: Optional[str] = None
    priority: Optional[str] = None
    tags: List[str] = field(default_factory=list)
    description: Optional[str] = None
    url: Optional[str] = None

    @classmethod
    def from_dict(cls, d: dict) -> "ClickUpTask":
        assignees = d.get("assignees", [])
        assignee = assignees[0] if assignees else {}
        priority = d.get("priority")
        return cls(
            id=d.get("id", ""),
            name=d.get("name", ""),
            status=d.get("status", {}).get("status", "unknown") if isinstance(d.get("status"), dict) else str(d.get("status", "")),
            assignee_name=assignee.get("username"),
            assignee_id=assignee.get("id"),
            space_id=d.get("space", {}).get("id") if isinstance(d.get("space"), dict) else None,
            list_name=d.get("list", {}).get("name") if isinstance(d.get("list"), dict) else None,
            due_date=d.get("due_date"),
            date_created=d.get("date_created"),
            date_updated=d.get("date_updated"),
            priority=priority.get("priority") if isinstance(priority, dict) else None,
            tags=[t.get("name", "") for t in d.get("tags", [])],
            description=d.get("description", ""),
            url=d.get("url", ""),
        )

    @property
    def is_overdue(self) -> bool:
        if not self.due_date:
            return False
        try:
            due_ts = int(self.due_date) / 1000
            return datetime.utcnow().timestamp() > due_ts
        except (ValueError, TypeError):
            return False


@dataclass
class SlackMessage:
    ts: str
    user: str
    text: str
    channel: Optional[str] = None
    thread_ts: Optional[str] = None
    reply_count: int = 0
    is_bot: bool = False
    bot_id: Optional[str] = None
    app_id: Optional[str] = None

    @classmethod
    def from_dict(cls, d: dict, channel: str = None) -> "SlackMessage":
        return cls(
            ts=d.get("ts", ""),
            user=d.get("user", ""),
            text=d.get("text", ""),
            channel=channel,
            thread_ts=d.get("thread_ts"),
            reply_count=d.get("reply_count", 0),
            is_bot=bool(d.get("bot_id") or d.get("bot_profile")),
            bot_id=d.get("bot_id"),
            app_id=d.get("app_id") or d.get("bot_profile", {}).get("app_id"),
        )

    @property
    def is_unanswered(self) -> bool:
        return self.reply_count == 0 and "?" in self.text

    @property
    def age_hours(self) -> float:
        try:
            msg_time = float(self.ts)
            return (datetime.utcnow().timestamp() - msg_time) / 3600
        except (ValueError, TypeError):
            return 0


@dataclass
class GmailEmail:
    message_id: str
    thread_id: str
    sender: str
    subject: str
    body_preview: str = ""
    timestamp: Optional[str] = None
    label_ids: List[str] = field(default_factory=list)
    is_unread: bool = False

    @classmethod
    def from_dict(cls, d: dict) -> "GmailEmail":
        return cls(
            message_id=d.get("messageId", ""),
            thread_id=d.get("threadId", ""),
            sender=d.get("sender", ""),
            subject=d.get("subject", ""),
            body_preview=d.get("messageText", d.get("preview", {}).get("body", ""))[:500],
            timestamp=d.get("messageTimestamp"),
            label_ids=d.get("labelIds", []),
            is_unread="UNREAD" in d.get("labelIds", []),
        )

    @property
    def is_newsletter(self) -> bool:
        skip_domains = ["beehiiv.com", "substack.com", "vidiq.com", "superhuman.com",
                        "thehustle.co", "therundown.ai", "lendingtree.com"]
        return any(domain in self.sender.lower() for domain in skip_domains)

    @property
    def is_actionable(self) -> bool:
        return not self.is_newsletter and self.is_unread


@dataclass
class CalendlyEvent:
    uri: str
    name: str
    start_time: str
    end_time: str
    status: str
    invitees_count: int = 0

    @classmethod
    def from_dict(cls, d: dict) -> "CalendlyEvent":
        counter = d.get("invitees_counter", {})
        return cls(
            uri=d.get("uri", ""),
            name=d.get("name", ""),
            start_time=d.get("start_time", ""),
            end_time=d.get("end_time", ""),
            status=d.get("status", ""),
            invitees_count=counter.get("total", 0) if isinstance(counter, dict) else 0,
        )

    @property
    def event_uuid(self) -> str:
        """Extract UUID from event URI for invitee lookup."""
        return self.uri.rstrip("/").split("/")[-1] if self.uri else ""

    @property
    def is_amped(self) -> bool:
        amped_keywords = ["amped", "ev charger", "panel upgrade", "electrical", "lead"]
        return any(kw in self.name.lower() for kw in amped_keywords)


# Space ID to client name mapping
SPACE_CLIENT_MAP = {
    "90171147412": "PCE",
    "90171038884": "Saiyan",
    "90170921347": "ATE",
    "90171140336": "Dolce",
    "90173603726": "Cedar Gold",
    "90171158237": "ISS",
    "90173975136": "LAF",
    "90171157281": "Adam Levinstein",
    "90171158234": "Trading Academy",
    "90173548886": "Alpha PM",
    "90174684474": "HEROPM",
    "90171041652": "ProofPilot Internal",
    "90171117629": "ProofPilot Dev",
}

def resolve_client_name(space_id: str) -> str:
    """Resolve a ClickUp space ID to client name."""
    return SPACE_CLIENT_MAP.get(space_id, f"Unknown ({space_id})")
