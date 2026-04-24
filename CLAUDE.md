# CLAUDE.md — Instructions for Claude Code

Claude: you're running inside `~/proofpilot-agents/`. This is a local skill package — no backend, no runtime. You ARE the runtime.

## Priority order for any task

1. **Read `AGENTS.md`** — the index — to pick the right pilot for what the user asked.
2. **Read `<pilot>/skill/SKILL.md`** — the operating doctrine — IN FULL before you take any action. No skimming.
3. **Read any reference files that SKILL.md points to.** The skill is the outer loop; the references are the inner loop.
4. **Do the work in `/tmp/<client>-<pilot>/`** — this package is READ-ONLY.
5. **Apply the pilot's quality gate before declaring done.** For design pilots: the "remove the logo" test. For audit pilots: the 5-gate framework. For report pilots: the 5-gate QA. Don't skip the gate.

## What NOT to do

- Do not modify any file in `~/proofpilot-agents/` unless the user is explicitly updating doctrine.
- Do not try to run `engine.py` or any `.py` file — they're stripped from this package. The Python backend lives in agent-hub/Railway and is a separate path.
- Do not invent brand facts. If the Brand Brain doesn't find it, it doesn't go in the build.
- Do not pre-pick a template. Score all 12 WebsitePilot profiles against the brief and take the winner.

## Skills available

If you're in Claude Code with skills enabled, you'll see skill files at `<pilot>/skill/SKILL.md`. Treat them like any other loaded skill: when the user invokes the pilot name or description matches, load + follow.

## Parallel pilots

Multiple pilots CAN run in parallel when their work is independent (e.g., AuditPilot + GBPPilot on the same client). Use the Agent tool with subagent_type=general-purpose to dispatch each in parallel, each reading the relevant SKILL.md. Never run two pilots that modify the same working directory in parallel.

## When in doubt

Ask the user. Don't guess at doctrine, don't guess at brand facts, don't guess at client context.
