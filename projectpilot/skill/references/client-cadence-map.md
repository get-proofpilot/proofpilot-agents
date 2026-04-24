# ProjectPilot Client Cadence Map

Use this to decide what "normal motion" looks like by client before calling something late.

## How to use
For any ProjectPilot sweep:
1. identify the client lane
2. load the expected cadence below
3. compare current state against that cadence
4. only surface the delta that changed behavior

Do not apply one generic PM clock to every client.

## Interpreting confidence
- `high` = we know the lane well enough to trust the defaults
- `medium` = defaults are directionally right, but live context still matters a lot
- `verify-live` = use the defaults only as a starting point and confirm the lane before escalating

---

## Dolce Electric
- Primary lane: SEO retainer
- Confidence: high
- Default owner: Jo Paula
- Default reviewer: Marcos
- Default coordinator: Katelyn
- GBP cadence: weekly posting expected
- Review-response cadence: weekly awareness, with stronger checks mid-month and end-of-month
- Page cadence: steady monthly content + publish flow, usually several service, location, and blog assets per month
- ProjectPilot focus:
  - weekly GBP readiness and live posting
  - review-response follow-through
  - making sure approved items actually get published

## ISS
- Primary lanes: SEO retainer + active QA/dev flow
- Confidence: high
- Default owner: Jo Paula for content and reports, Hammad for dev items
- Default reviewer: Marcos and/or Matthew depending on asset
- Default coordinator: Katelyn
- GBP cadence: active recurring GBP work
- Review-response cadence: mid-month and end-of-month minimum, sooner if the lane is already active
- Page cadence: frequent treatment, location, and dev changes, often with QA backlog risk
- ProjectPilot focus:
  - make sure reviewable assets actually exist before treating queue items as ready
  - watch dev -> QA -> launch continuity closely
  - watch live publish-layer misses on launched pages

## Pelican Coast Electric (PCE)
- Primary lane: SEO retainer
- Confidence: high
- Default owner: Rachalle for content, Marcos for review-heavy items
- Default reviewer: Marcos
- Default coordinator: Katelyn
- GBP cadence: recurring, but lower-noise lane than Dolce or ISS unless active work says otherwise
- Review-response cadence: mid-month and end-of-month minimum
- Page cadence: steady service and location publishing with review and QA sensitivity
- ProjectPilot focus:
  - live page verification after publish
  - phone, CTA, and template-residue checks on launch
  - avoid treating stale review queues as urgent unless there is a fresh delta

## Cedar Gold
- Split this client into two lanes every time.

### Cedar Gold SEO Retainer Lane
- Confidence: medium
- Default owner: Jo Paula or Charlie depending on content lane
- Default reviewer: Marcos for most content, Matthew for strategic/final decisions
- Default coordinator: Katelyn
- GBP cadence: if active in that month, treat as planned weekly deliverable
- Review-response cadence: case-by-case, less central than the website lane
- Page cadence: retainer content, approval, and review-load monitoring
- ProjectPilot focus:
  - review load
  - content readiness
  - buried approvals

### Cedar Gold Website / Build Lane
- Confidence: high
- Default owner: Hammad for build, Anthony for design-side inputs
- Default reviewer: Matthew for high-stakes approvals, Kevin for QA coordination
- Default coordinator: Katelyn
- Page cadence: active handoff, build, QA, and launch tracking
- ProjectPilot focus:
  - design-to-dev clarity
  - FAQ and asset blocker prevention
  - QA completion and launch integrity

## Saiyan Electric
- Primary lane: SEO retainer + local/commercial expansion
- Confidence: high
- Default owner: Jo Paula
- Default reviewer: Marcos
- Default coordinator: Katelyn
- GBP cadence: recurring local SEO support, usually lighter than Dolce unless campaign volume increases
- Review-response cadence: mid-month and end-of-month minimum
- Page cadence: ongoing local pages plus strategic commercial expansion batches
- ProjectPilot focus:
  - schema and publish consistency on new pages
  - strategic expansion pages actually moving through review
  - review-load spikes when large page batches land together

## All Thingz Electric
- Primary lane: SEO retainer
- Confidence: high
- Default owner: Jo Paula
- Default reviewer: Marcos
- Default coordinator: Katelyn
- GBP cadence: recurring local support
- Review-response cadence: mid-month and end-of-month minimum
- Page cadence: steady retainer publishing with service-area sensitivity
- ProjectPilot focus:
  - service-area and publish consistency
  - trust-signal consistency carrying into live pages
  - template-level technical debt leaking into new launches

## Power Route Electric
- Primary lane: reactivated SEO retainer
- Confidence: medium
- Default owner: John Genon for the current April landing-page lane unless live context changes
- Default reviewer: Marcos
- Default coordinator: Katelyn
- GBP cadence: verify-live, do not assume the full weekly rhythm is back until the local-profile lane is clearly active again
- Review-response cadence: only if the local-profile lane is explicitly active
- Page cadence: active again for April, so fresh ready-for-review items are real work, not paused backlog
- ProjectPilot focus:
  - treat new ready-for-review items as current review load
  - keep reactivation work separate from stale pre-pause backlog
  - verify whether the restart is full-retainer scope or a narrower landing-page restart before escalating cadence misses

## Wild Within
- Primary lane: newer retainer / fast-moving context
- Confidence: medium
- Default owner: varies by deliverable
- Default reviewer: Matthew and/or Marcos
- Default coordinator: Katelyn
- GBP cadence: only if actively scoped
- Review-response cadence: only if active in the lane
- Page cadence: context can change quickly, so assumptions expire fast
- ProjectPilot focus:
  - verify live scope before surfacing
  - keep a close eye on changing approvals and wording-sensitive items

## LAF Counseling
- Primary lane: SEO / content retainer
- Confidence: verify-live
- Default owner: varies by deliverable
- Default reviewer: Marcos and/or Matthew
- Default coordinator: Katelyn
- GBP cadence: assume recurring local support only if active in current scope
- Review-response cadence: mid-month and end-of-month minimum if the GBP lane is active
- Page cadence: likely lighter-volume publishing lane
- ProjectPilot focus:
  - avoid over-noising a lower-volume lane
  - verify scope and active deliverables before escalating

## Adam Levinstein Photography
- Primary lane: SEO / strategy retainer
- Confidence: verify-live
- Default owner: Marcos for strategy-heavy work unless content ownership is explicit
- Default reviewer: Matthew
- Default coordinator: Katelyn
- GBP cadence: unlikely to be as central as electrician lanes, confirm live scope first
- Review-response cadence: only if active in the local-profile lane
- Page cadence: likely lighter, strategy-sensitive, and approval-sensitive
- ProjectPilot focus:
  - buried approvals and strategy follow-through
  - avoid treating a quieter lane like a high-volume electrician retainer

## Trading Academy
- Primary lane: project / build / design-oriented lane
- Confidence: medium
- Default owner: Kevin for design-side execution unless live context shows otherwise
- Default reviewer: Matthew
- Default coordinator: varies, often lighter formal PM structure
- GBP cadence: not expected
- Review-response cadence: not expected
- Page cadence: project-based rather than recurring local SEO cadence
- ProjectPilot focus:
  - use Slack truth more than recurring-retainer assumptions
  - watch for approval drift and delivery ambiguity in build/design work

## Alpha Property Management
- Primary lane: lighter PM / content / website support lane
- Confidence: medium
- Default owner: varies by deliverable
- Default reviewer: Marcos and/or Matthew
- Default coordinator: Katelyn
- GBP cadence: only if active in live scope
- Review-response cadence: only if the local-profile lane is active
- Page cadence: lower-volume, easy for small items to hide
- ProjectPilot focus:
  - small backlog items aging quietly
  - watch for low-volume lanes falling through the cracks because they seem non-urgent

## HEROPM
- Primary lane: white-label production lane
- Confidence: medium
- Default owner: Kevin for design-side tasks unless live context shows a different operator
- Default reviewer: Matthew
- Default coordinator: light formal PM structure, often Slack-driven
- GBP cadence: not a default assumption
- Review-response cadence: not a default assumption
- Page cadence: project-based, often tracked in Slack more than ClickUp
- ProjectPilot focus:
  - use conversation truth heavily because ClickUp coverage may be thin
  - watch for drift caused by work living in Slack instead of the board

## House Dental
- Primary lane: new / low-context client lane
- Confidence: verify-live
- Default owner: unknown by default, confirm live lane first
- Default reviewer: Marcos and/or Matthew depending on asset type
- Default coordinator: Katelyn
- GBP cadence: only assume active if live scope confirms it
- Review-response cadence: only assume active if live scope confirms it
- Page cadence: low-confidence, verify before surfacing
- ProjectPilot focus:
  - low-confidence lane, so avoid invented urgency
  - confirm owner, reviewer, and actual deliverable cadence before escalating

---

## Default PM rule
If the client cadence says something should already be moving and live context confirms it is not, surface it.
If the cadence says the lane is quieter, paused, or more batch-oriented, prefer watchful silence until there is a real delta.
