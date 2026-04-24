---
name: proofpilot-gdocs-styling
description: Create and style ProofPilot branded Google Docs via Composio Google Docs API. Use when creating proposals, audits, or any client-facing document as a native Google Doc with ProofPilot brand colors, typography, headers/footers, and table styling.
---

# ProofPilot Google Docs Styling via Composio

## Creating the Document

Use `GOOGLEDOCS_CREATE_DOCUMENT_MARKDOWN` with fields:
- `markdown_text`: Full markdown content (headings, tables, bullets all work)
- `title`: Document title
- `folder_id`: Google Drive folder ID (Proposals folder: `***REDACTED_DRIVE_FOLDER***`)

## Applying Brand Styles

All styling done via `GOOGLEDOCS_UPDATE_EXISTING_DOCUMENT` with field `editDocs` (array of Google Docs API batchUpdate requests).

### Step 1: Get Document Structure
Use `GOOGLEDOCS_GET_DOCUMENT_BY_ID` with field `id`. Response is at `data.response_data.body.content`. Parse to find startIndex/endIndex for all headings, tables, and key text.

### Step 2: Text Styling
Use `updateTextStyle` requests with range (startIndex, endIndex).

Brand colors (RGB 0-1 scale for API):
- Dark Blue (#00184D): `{red: 0, green: 0.094, blue: 0.302}`
- Electric Blue (#0051FF): `{red: 0, green: 0.318, blue: 1.0}`
- Neon Green (#C8FF00): `{red: 0.784, green: 1.0, blue: 0}`
- Medium Gray (#666666): `{red: 0.4, green: 0.4, blue: 0.4}`
- White: `{red: 1, green: 1, blue: 1}`
- Red (#DC3545): `{red: 0.863, green: 0.208, blue: 0.271}`
- Green (#28A745): `{red: 0.157, green: 0.655, blue: 0.271}`

Rules:
- H1 headings: Dark Blue, bold, 20pt
- H2 headings: Electric Blue, bold, 16pt
- "What's Working Well": Green
- "Critical Issues": Red
- Taglines: Medium Gray, italic
- Cover title: Electric Blue, 22pt, centered

### Step 3: Table Header Backgrounds
DO NOT use `updateTableCellStyle` with `tableRange`, it conflicts with `cells` field.

Instead use `updateParagraphStyle` with `shading.backgroundColor` on paragraphs inside first-row cells. Alternate Dark Blue and Electric Blue between tables.

Also make header row text white + bold via `updateTextStyle`.

### Step 4: Header and Footer
Create via editDocs requests:
1. `createHeader` with `type: "DEFAULT"`, `sectionBreakLocation: {index: 0}`. Returns headerId in reply.
2. `insertText` with `segmentId` = headerId, text = "PROOFPILOT | [Doc Title]"
3. Style header text: right-aligned, Medium Gray, 9pt, bold
4. `createFooter` same pattern. Center-aligned, 8pt.

### Step 5: Sharing
Use `GOOGLEDRIVE_ADD_FILE_SHARING_PREFERENCE` with file_id = document_id, role "writer", type "anyone".

## Best Approach: Build .docx Then Upload
Google Docs API styling is limited and tedious. Better workflow:
1. Build fully styled .docx with python-docx (Bebas Neue headings, Calibri body, branded tables, cover page)
2. Upload binary .docx to GDrive using gdrive-binary-upload skill
3. Share with "anyone with link" as writer
4. The .docx opens natively in Google Docs with formatting preserved

This produces a much better looking document than API styling. Use the API styling approach only for simple documents or when you need to edit an existing Google Doc.

## Pitfalls
- `updateTableCellStyle` with `tableRange` always fails with "oneof field 'cells' already set". Use paragraph shading instead.
- `GOOGLEDOCS_UPDATE_DOCUMENT_STYLE` is for document-level named styles, NOT text range styling. Use `UPDATE_EXISTING_DOCUMENT` with `editDocs`.
- `GOOGLEDOCS_UPDATE_TABLE_ROW_STYLE` tool requires field `updateTableRowStyle`, not individual params.
- `GOOGLEDOCS_GET_DOCUMENT_BY_ID` uses field `id`, not `document_id`.
- `GOOGLEDOCS_CREATE_DOCUMENT_MARKDOWN` uses field `markdown_text`, not `markdown_content`.
- Always re-fetch document after inserts before styling, as indices shift.
- For fast client-specific variants of an existing Google Doc, it is often better to **copy the source doc** with `GOOGLEDRIVE_COPY_FILE` and then run a batch of `GOOGLEDOCS_REPLACE_ALL_TEXT` operations instead of rebuilding the doc.
- If the second pass becomes a **structural rewrite** rather than a light variant — for example changing a single-path playbook into multiple workflow lanes like `live call`, `form`, `missed call`, and `follow-up` — stop patching the old copy and create a **fresh v2 document** instead. This is usually faster, cleaner, and easier to QA than dozens of replacement calls against the original.
- **Method choice matters:** for Matthew/ProofPilot deliverables, default to the `proofpilot-doc-delivery` workflow and build a branded `.docx` with the `proofpilot-brand` helpers. Do not use a plain markdown Google Doc for a final deliverable unless Matthew explicitly asks for a lightweight internal draft. For client-facing or shareable deliverables, branded docx first is the default because it produces a materially better-looking result than raw Docs markdown + API styling.
- `GOOGLEDOCS_CREATE_DOCUMENT_MARKDOWN` can intermittently return a Google Docs `500 Internal error encountered`, especially on the first attempt with `folder_id` included. Reliable fallback: retry once after a short wait with a simpler payload, and if the deliverable is meant to be final/client-facing, stop using markdown-doc creation and switch to the `proofpilot-doc-delivery` workflow instead.
- `GOOGLEDOCS_CREATE_DOCUMENT_MARKDOWN` can intermittently fail with a Google Docs `500 INTERNAL` when `folder_id` is included in the create call, even if the markdown itself is valid. Reliable recovery pattern: retry after a short wait, and if it still fails, create the doc *without* `folder_id`, capture the returned `data.document_id`, then share/move it afterward if needed. Confirmed Apr 20 2026 while creating Power Route meeting notes.
- After replacement-heavy edits, verify the final copy with the public TXT export endpoint: `https://docs.google.com/document/d/DOC_ID/export?format=txt`. This is the fastest way to catch leftover brand names or old offer-specific language.
- `GOOGLEDOCS_REPLACE_ALL_TEXT` is literal and can miss lines if you include markdown-ish bullet prefixes from a TXT export (for example `* `). If a replacement unexpectedly returns 0, retry with the plain sentence text instead of the leading bullet characters.
- Do NOT use overly generic replace targets like `Text`, `Day 2`, or other short/common labels unless you have verified they only occur once in the full exported document. These can silently mutate unrelated content and corrupt good copy. Confirmed Apr 20 2026: replacing the table cell label `Text` changed the sentence `Text me a photo...` into `Call + text + email me a photo...` inside a branded Power Route playbook.
- Safe rule: replacements should target full sentences, unique phrases, or clearly unique headings. If you need broader structural edits, rebuild the section or the full doc instead of chaining generic replacements.
- A `successful: true` replace response is not enough by itself. If `occurrencesChanged` is missing, null, or lower than expected, immediately verify with the TXT export and search for leftover anchor phrases.
- **Never run `GOOGLEDOCS_REPLACE_ALL_TEXT` on short generic words that can appear in other sentences or tables** such as `Text`, `Day 2`, or similarly broad labels. Confirmed Apr 20 2026 while revising the branded Power Route lead-playbook: replacing the channel label `Text` in a follow-up table also mutated unrelated body copy and produced broken prose like `Call + text + email me a photo...`. Safe pattern: replace full unique phrases or full sentences only, with enough surrounding context to make the target unmistakable.
- When doing iterative revisions on a branded Google Doc, use the public TXT export after every batch of replacements and search specifically for accidental collateral edits, not just leftover old phrases. Check for both (1) old wording that should be gone and (2) new wording appearing in the wrong places.
- When adapting a niche playbook into a broader one, search the exported text for leftover anchor phrases from the old offer (for example product names, source-channel assumptions, or intake-method assumptions) before calling the draft done.