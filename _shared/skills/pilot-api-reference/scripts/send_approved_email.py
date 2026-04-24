#!/usr/bin/env python3
import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

DEFAULT_APPROVALS_DIR = os.path.expanduser("~/pilot-approval/decisions")
DEFAULT_EXPECTED_USER_ID = os.environ.get("PILOT_EMAIL_APPROVER_UID", "U097JMZ2M2A")
DEFAULT_COMPOSIO_API_KEY = os.environ.get("COMPOSIO_API_KEY", "")
DEFAULT_ENTITY_ID = os.environ.get("COMPOSIO_ENTITY_ID", "")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def fail(message: str, code: int = 1, **extra):
    payload = {"ok": False, "error": message}
    if extra:
        payload.update(extra)
    print(json.dumps(payload, indent=2))
    sys.exit(code)


def load_json(path: str) -> dict:
    try:
        with open(path) as f:
            return json.load(f)
    except FileNotFoundError:
        fail("approval file not found", approval_file=path)
    except json.JSONDecodeError as exc:
        fail(f"approval file is invalid JSON: {exc}", approval_file=path)


def save_json(path: str, data: dict) -> None:
    tmp = f"{path}.tmp"
    with open(tmp, "w") as f:
        json.dump(data, f, indent=2)
    os.replace(tmp, path)


def composio_execute(tool_slug: str, arguments: dict, api_key: str, entity_id: str) -> dict:
    if not api_key:
        fail("COMPOSIO_API_KEY is required")
    if not entity_id:
        fail("COMPOSIO_ENTITY_ID is required")
    url = f"https://backend.composio.dev/api/v3/tools/execute/{tool_slug}"
    payload = json.dumps({"arguments": arguments, "entity_id": entity_id}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "x-api-key": api_key,
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8", errors="replace"), strict=False)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        fail(
            f"Composio {tool_slug} failed with HTTP {exc.code}",
            tool=tool_slug,
            response_body=body,
        )
    except urllib.error.URLError as exc:
        fail(f"Composio {tool_slug} failed: {exc}", tool=tool_slug)


def extract_email_fields(decision: dict) -> tuple[str, str, str]:
    callback = decision.get("callback_data") or {}
    metadata = decision.get("metadata") or {}

    recipient_email = (
        callback.get("recipient_email")
        or metadata.get("recipient_email")
        or callback.get("to")
        or metadata.get("to")
    )
    subject = callback.get("subject") or metadata.get("subject")
    body = (
        callback.get("full_body")
        or metadata.get("full_body")
        or callback.get("body")
        or metadata.get("body")
    )

    missing = []
    if not recipient_email:
        missing.append("recipient_email")
    if not subject:
        missing.append("subject")
    if not body:
        missing.append("body")
    if missing:
        fail(
            "approval record is missing required email fields",
            missing_fields=missing,
            approval_id=decision.get("approval_id"),
        )

    return recipient_email, subject, body


def summarize_send_response(send_result: dict) -> dict:
    data = send_result.get("data") or {}
    return {
        "tool_success": send_result.get("successful"),
        "message_id": data.get("messageId") or data.get("id") or data.get("message_id"),
        "thread_id": data.get("threadId") or data.get("thread_id"),
        "status": data.get("status"),
    }


def verify_sent_message(recipient_email: str, subject: str, api_key: str, entity_id: str) -> dict:
    fetch_result = composio_execute(
        "GMAIL_FETCH_EMAILS",
        {
            "max_results": 10,
            "query": f"in:sent to:{recipient_email} newer_than:7d",
        },
        api_key,
        entity_id,
    )
    messages = ((fetch_result.get("data") or {}).get("messages") or [])
    normalized_subject = subject.strip()
    for msg in messages:
        msg_subject = (
            msg.get("subject")
            or (msg.get("preview") or {}).get("subject")
            or ""
        ).strip()
        if msg_subject == normalized_subject:
            return {
                "verified": True,
                "message_timestamp": msg.get("messageTimestamp"),
                "message_id": msg.get("messageId"),
                "thread_id": msg.get("threadId"),
            }
    return {
        "verified": False,
        "checked_messages": len(messages),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Send a Pilot email only after Slack approval.")
    parser.add_argument("--approval-id", required=True, help="Slack approval ID from the approval block")
    parser.add_argument("--approvals-dir", default=DEFAULT_APPROVALS_DIR)
    parser.add_argument("--expected-user-id", default=DEFAULT_EXPECTED_USER_ID)
    parser.add_argument("--dry-run", action="store_true", help="Validate approval + payload without sending")
    args = parser.parse_args()

    approval_file = os.path.join(os.path.expanduser(args.approvals_dir), f"{args.approval_id}.json")
    decision = load_json(approval_file)

    approval_type = decision.get("approval_type") or (decision.get("callback_data") or {}).get("type")
    if decision.get("decision") != "approved":
        fail(
            "email send blocked because the approval is not approved",
            approval_id=args.approval_id,
            decision=decision.get("decision"),
        )
    if approval_type != "send_email":
        fail(
            "approval record is not an email approval",
            approval_id=args.approval_id,
            approval_type=approval_type,
        )
    if decision.get("decided_by") != args.expected_user_id:
        fail(
            "email send blocked because approval came from the wrong user",
            approval_id=args.approval_id,
            decided_by=decision.get("decided_by"),
            expected_user_id=args.expected_user_id,
        )
    if decision.get("executed_at"):
        fail(
            "email send blocked because this approval has already been used",
            approval_id=args.approval_id,
            executed_at=decision.get("executed_at"),
        )

    recipient_email, subject, body = extract_email_fields(decision)

    if args.dry_run:
        print(json.dumps({
            "ok": True,
            "dry_run": True,
            "approval_id": args.approval_id,
            "recipient_email": recipient_email,
            "subject": subject,
            "approved_by": decision.get("decided_by"),
        }, indent=2))
        return 0

    send_result = composio_execute(
        "GMAIL_SEND_EMAIL",
        {
            "recipient_email": recipient_email,
            "subject": subject,
            "body": body,
        },
        DEFAULT_COMPOSIO_API_KEY,
        DEFAULT_ENTITY_ID,
    )

    verification = verify_sent_message(
        recipient_email,
        subject,
        DEFAULT_COMPOSIO_API_KEY,
        DEFAULT_ENTITY_ID,
    )

    decision["executed_at"] = now_iso()
    decision["execution"] = {
        "status": "sent",
        "script": os.path.abspath(__file__),
        "recipient_email": recipient_email,
        "subject": subject,
        "send_response": summarize_send_response(send_result),
        "verification": verification,
    }
    save_json(approval_file, decision)

    print(json.dumps({
        "ok": True,
        "approval_id": args.approval_id,
        "recipient_email": recipient_email,
        "subject": subject,
        "verification": verification,
        "send_response": summarize_send_response(send_result),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
