---
name: pilot-cron-redesign-principles
description: >-
  Principles for auditing and redesigning Pilot cron jobs when scheduled output
  feels robotic, generic, duplicative, or too automation-like. Focuses on
  delivery contract clarity, cheap run gating, territory, structured findings,
  and clean separation between internal logs and human-facing messages.
triggers:
  - improve cron jobs
  - scheduled tasks feel sloppy
  - cron redesign
  - make Pilot feel more like a coworker
---

# Pilot Cron Redesign Principles

Use this when:
- scheduled Pilot output feels like automation instead of a coworker
- you are redesigning how Pilot decides when to speak
- you are comparing Pilot cron behavior to a stronger scheduled-agent system

## Core diagnosis
A cron system feels sloppy when one layer is trying to do all of these at once:
- detect signal
- decide whether it matters
- decide who should hear it
- format the visible message
- serve as the local execution log

Those responsibilities should be separated.

## Main design rules
### 1. Local logs and visible Slack messages are different artifacts
Never let one final blob try to be both.

Internal artifact can contain:
- receipts
- bookkeeping
- state
- skip reasons
- debugging notes

Human-facing Slack artifact should contain only:
- the headline
- the few facts that matter
- the action, ask, or recommendation

### 2. Silence should be decided early and cheaply
A strong cron system should be able to skip many runs before waking the full model.

Preferred order:
- cheap local/state checks first
- APIs second
- full agent reasoning last

### 3. Territory must be explicit
Each cron should know:
- what it owns
- what it does not own
- what audience it can speak to
- what should be deferred to another cron

When territory is vague, multiple jobs start sounding like overlapping automations.

### 4. Findings should exist before prose
Do not jump directly from raw data to a Slack message.
First create a structured internal finding with at least:
- entity
- priority
- audience
- owner
- trigger reason
- current status: watch / escalate / resolved / suppressed
- last surfaced timestamp

Then decide whether it becomes a message.

### 5. Output validation must be hard, not just prompt-based
Do not rely only on prompt wording to prevent ugly output.
A final validation layer should block system-looking text from becoming the visible message.

Examples of text that should never reach the visible message layer:
- silence markers
- heartbeat or state blobs
- execution receipts
- scan summaries
- tool/process narration
- local bookkeeping

### 6. Use narrow role-specific context, not giant general context, for cron jobs
Broad company context can help, but role-specific and lane-specific context gives cleaner outputs.

## Recommended 3-layer architecture
### Layer 1: Detection
Cheap checks determine whether a run is worth executing.

### Layer 2: Judgment
Structured findings are created and routed to the right owner/audience.

### Layer 3: Voice
Only approved findings become human-facing messages, written in the correct tone for the audience.

## Priority improvements when cron quality is poor
1. Fix the delivery contract so local-only runs are not treated like auto-delivered runs
2. Add cheap run/skip gating before the agent wakes up
3. Separate internal execution logs from outward message composition
4. Make cron ownership and exclusions explicit
5. Store findings and delivery history so follow-ups can evolve instead of repeating

## Concrete Hermes implementation notes
These are the specific code-level lessons from the Pilot cron rebuild and should be treated as defaults when working in Hermes:

### 1. Hermes scheduler can inject the wrong delivery contract
Check `cron/scheduler.py` before redesigning prompts.
A key failure mode was a hardcoded cron hint that always told jobs:
- the final response would be automatically delivered
- do not self-send
- use `[SILENT]` to suppress delivery

That is wrong for `deliver='local'` jobs.
Rule: branch the scheduler hint by delivery mode.
- `deliver='local'` -> final response is local-only, self-send if needed
- non-local delivery -> final response is auto-delivered, do not duplicate-send

### 2. Hermes supports pre-run `script`, but not true run/skip gating by default
The built-in `script` field injects stdout into the prompt. That is not the same as a cheap condition gate.
If you want Viktor-style "exit 0 run / exit 1 skip" behavior, add explicit `condition_script` support at the cron runtime layer.

### 3. Per-cron manifest directories improve identity and memory
Even if Hermes stores jobs centrally in `~/.hermes/cron/jobs.json`, give each job its own directory with:
- `task.json`
- `LEARNINGS.md`
- `state.json`
- `execution.log`
- `outbound/`
- `scripts/`

This gives each cron local memory and cleaner auditing.

### 4. Validate visible output in code, not just prompts
Add a final blocker for outward-facing content.
At minimum, block:
- `HEARTBEAT_STATE`
- `[HEARTBEAT_OK]`
- mixed `[SILENT]` + content
- `Cronjob Response:` wrappers
- obvious execution or automation labels like `run complete`, `scan results`, `automation alert`, `scheduled reminder`

### 5. Delivery receipts should be first-class artifacts
When a cron sends something outward, store a receipt in the job's `outbound/` directory.
Useful fields:
- timestamp
- platform
- chat_id / thread_id
- delivery path used
- preview of visible content
- delivery result / Slack response

This makes dedupe and follow-up evolution much easier.

### 6. Update legacy Pilot cron jobs away from `proofpilot-agency`
If a cron still anchors to `proofpilot-agency`, prefer switching it to:
- `pilot-company`
- `pilot-team`
- the role-specific skill for that lane

This reduces generic tone and makes cron behavior more specific.

### 7. Watch for active schedule collisions
When two active jobs share the same exact window and touch similar surfaces, they will feel like overlapping automations even if their prompts are decent.
Audit exact schedule collisions, then stagger or redefine territory before tuning message copy.

Concrete proven pattern from the Pilot cleanup:
- keep Heartbeat as the always-watching Matthew-facing cross-lane detector
- give the CEO sweep one later single-purpose attention-ledger window instead of multiple broad passes
- let ProjectPilot PM Control own internal PM planning in the PM channel
- let ProjectPilot Page Flow own only page movement / launch truth
- add per-job `condition_script` gates so these jobs skip quiet windows cheaply before the full agent wakes up

Example condition-script split that worked:
- CEO sweep condition checks pending approvals plus fresh CEO-relevant inputs like task tracker, Gmail, and Calendly artifacts
- PM control condition checks recent PM / ClickUp / context files
- Page-flow condition checks recent page-state / ClickUp / context files

This combination reduced overlap more effectively than prompt tuning alone because it fixed both schedule timing and job territory.

### 8. Persist runtime cron patches across Hermes updates
If you patch Hermes runtime files like:
- `cron/jobs.py`
- `cron/scheduler.py`
- `tools/cronjob_tools.py`

those changes will be wiped by `hermes update` unless you explicitly preserve them.
Recommended pattern:
- save a dedicated patch file like `/root/pilot-cron-runtime-patch.diff`
- update `/root/reapply-pilot-patches.sh` to apply both gateway and cron runtime patches
- extend the startup hook at `~/.hermes/hooks/pilot-context/handler.py` to verify cron markers and run the reapply script when missing

Do not treat cron-runtime changes as safe just because they are not gateway files. They still live inside the Hermes repo and need the same survival strategy.

### 9. Preserve backward compatibility when hardening cron script paths
A stricter cron script resolver can easily break existing tests and job setups.
When tightening script path handling in `cron/scheduler.py`, verify both:
- the new hardened path behavior you want
- legacy cron script expectations already covered by `tests/cron/test_cron_script.py`

If a security or structure improvement breaks that suite, adapt the resolver so it satisfies both the new safety goal and the established Hermes contract.

### 10. Scheduler refactors require test updates at the new seam
If you refactor agent construction, update tests to patch the new boundary instead of the old one.
Example from the Pilot cron rebuild:
- old tests patched `run_agent.AIAgent`
- lazy loading moved the seam to `cron.scheduler._load_ai_agent_class`

Also add test isolation for cron env passthrough and credential files, because cron tests can leak state across cases after scheduler changes.

### 11. Re-verify the whole cron/tool/timezone surface after runtime edits
Do not stop after one targeted test passes.
For Hermes cron runtime changes, the practical verification bundle is:
- `tests/cron`
- `tests/tools/test_cronjob_tools.py`
- `tests/test_timezone.py`
- `python3 -m py_compile` on modified runtime and helper files
- `bash -n /root/reapply-pilot-patches.sh`
- run the reapply script once to confirm the survival path actually works

Green unit tests alone are not enough if the update-survival script is broken.

### 12. Put structured findings into pre-run context scripts, not only prompts
If a cron is supposed to feel like Viktor, do not make the model rediscover priorities from giant raw context every run.
Use a pre-run `script` to emit a ranked shortlist first.

Proven Pilot pattern:
- keep reusable logic in a runtime module like `/root/pilot-reactor/proactive_artifacts.py`
- let cron-specific scripts transform live state into role-specific JSON
- attach that JSON via the cron `script` field so the prompt starts from already-scored candidates

This worked especially well for three distinct lanes:
- CEO attention ledger
- PM watch / planning queue
- page-flow / launch truth

Good candidate fields:
- title
- summary
- route_to
- next_move
- owner
- why_now
- priority or score
- source pointers

This raises output quality more reliably than prompt tuning because the model starts from curated findings instead of a blob of logs.

### 13. Territory memory should live beside each cron
When several jobs cover adjacent surfaces, add local job memory like `LEARNINGS.md` in each cron folder and use it to encode:
- what the job owns
- what it must suppress
- what another job already owns
- what a good artifact for this job looks like

This is especially useful after cron overlap cleanup. The prompt alone is not enough. Give the cron a local memory of its boundaries so future edits do not drift back into duplication.

### 14. Safe end-to-end cron verification should use local-only smoke jobs
When changing prompts, condition scripts, or pre-run scripts, create temporary smoke jobs with:
- `deliver='local'`
- the same `script` you plan to use in production
- a tiny verification prompt that checks required fields only

Then `run` those jobs and read the output files under `~/.hermes/cron/output/<job_id>/...`.
This verifies:
- scheduler wiring
- script injection
- prompt consumption
- output artifact shape
- no accidental external sends

For artifact-first jobs, verify exact essentials rather than generic prose quality.
Examples:
- attention ledger: title + shortlist + route target present
- PM watch: watch items count + route_to field present
- page flow alert: title + summary + next_move present

## Best principle
The problem is usually not lack of information. It is muddy boundaries between thinking, logging, routing, and speaking.

A good cron system should feel like one coworker waking up on a schedule, not a stack of automations sharing a voice.
