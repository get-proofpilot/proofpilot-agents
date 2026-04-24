---
name: proofpilot-brand
description: ProofPilot brand styling for documents and spreadsheets. Applies exact brand colors, typography, and formatting to Word documents (.docx) and Excel spreadsheets (.xlsx). Use when creating ProofPilot client deliverables including SEO audits, website blueprints, proposals, reports, strategy documents, scorecards, or any professional document for ProofPilot clients. Triggers on keywords like "ProofPilot document", "client report", "audit", "blueprint", "proposal", "branded document", or any request to create professional deliverables.
---

# ProofPilot Brand Styling

Apply ProofPilot's exact brand identity to all documents and spreadsheets.

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Electric Blue | #0051FF | Heading 2, alternating table headers, secondary elements |
| Dark Blue | #00184D | Heading 1, primary table headers, CTA boxes, score rows |
| Neon Green | #C8FF00 | Score highlights, CTA headlines, value prop text |
| Black | #000000 | Heading 3, body text |
| Light Gray | #F4F4F4 | Placeholder backgrounds, form label cells |
| Medium Gray | #666666 | Secondary text, descriptions, taglines |
| White | #FFFFFF | Text on colored backgrounds |
| Red | #DC3545 | Warning headers, critical issues |
| Green | #28A745 | Success headers, positive findings |

## Typography

| Element | Font | Size (pt) | Weight | Color |
|---------|------|-----------|--------|-------|
| Eyebrow Text | Bebas Neue | 10-12 | Bold | Electric Blue |
| Document Title (H1) | Bebas Neue | 30-36 | Bold | Dark Blue / Black |
| Section Title (H1) | Bebas Neue | 20-26 | Bold | Dark Blue / Black |
| Section Subtitle (H2) | Bebas Neue | 16 | Bold | Electric Blue |
| Heading 3 | Bebas Neue | 13 | Bold | Black |
| Body Text | Calibri | 11 | Regular | #333333 |
| Table Cell | Calibri | 10 | Regular | #444444 |
| Taglines | Calibri | 11-12 | Italic | Medium Gray |
| Small Text | Calibri | 9 | Regular | Medium Gray |

## Heading Pattern: Eyebrow + Title

ALL section headings use this two-tier pattern (NOT dark blue background boxes):

1. **Eyebrow text** (small, Electric Blue, bold, all-caps): e.g. "SECTION 01" or "SERVICE PAGE REALITY CHECK"
2. **Title text** (large, Dark Blue or Black, bold): e.g. "Where You Stand Today" or "Your main Services page does not display any services."
3. **Optional tagline** (italic, Medium Gray) with a light bottom border

This creates visual hierarchy on a WHITE background. No colored background boxes behind headings.

## Cover Page Design

The cover page is CLEAN and OPEN, not a full-page dark blue box:

1. **Eyebrow** (Electric Blue, 16-18pt, bold, centered): e.g. "WEBSITE AUDIT"
2. **Main title** (Dark Blue or Black, 30-36pt, bold, centered): e.g. "WEBSITE STRATEGY"
3. **Subtitle** (Medium Gray, italic, centered): e.g. "Prepared for YSC Paving"
4. **Info table** (clean bordered table with key details: Prepared For, Website, Location, Date, Competitor)
5. **Small highlight bar** at bottom only (Dark Blue bg, Neon Green text): one-line strategic focus

Do NOT wrap the entire cover page in a dark blue box. Keep it white/clean with the highlight bar as the only dark element.

## Callout Boxes

Use callout boxes SPARINGLY for key highlights only:
- Small, not full-width dark blue blocks
- Dark Blue background with Neon Green title and white body text
- Reserve for: strategic focus bars, score summaries, CEO talking points
- Most content should be on white background with the eyebrow+title heading pattern

## Document Creation Workflow

### Step 1: Apply Heading Pattern
Every major section: Electric Blue eyebrow text above Dark Blue/Black title on white background.

### Step 2: Apply Cover Page
Clean centered layout with eyebrow + title + info table + small highlight bar.

### Step 3: Follow Table Patterns
- Table headers: Dark Blue or Electric Blue background with white text
- Score text ("/10", "/40") is Neon Green, bold
- Cell padding: 40-80 before/after
- Alternating row backgrounds: white / Light Gray

### Step 4: Header/Footer
- Header: "PROOFPILOT | [Document Title]" right-aligned, 8pt
- Footer: "ProofPilot | Confidential" centered, 7pt, Medium Gray

## Spreadsheet Creation

### Color Application
```python
from openpyxl.styles import Font, PatternFill, Alignment

# Brand colors (no # prefix for openpyxl)
ELECTRIC_BLUE = "0051FF"
DARK_BLUE = "00184D"
NEON_GREEN = "C8FF00"
MEDIUM_GRAY = "666666"

# Header row styling
header_fill = PatternFill("solid", fgColor=DARK_BLUE)
header_font = Font(bold=True, color="FFFFFF", name="Calibri", size=11)

# Score cell styling
score_font = Font(bold=True, color=NEON_GREEN, name="Calibri", size=12)
```

### Spreadsheet Structure
- Preferred premium layout for Google Sheets and .xlsx deliverables:
  - Row 1: merged title row across the active table width, centered, dark blue text on white background
  - Row 2: merged subtitle row, centered, italic, medium gray
  - Row 3: merged strategic-focus or usage note bar, Dark Blue background with WHITE text for readability
  - Rows 5-6: KPI card row set with dark blue, electric blue, and optional purple accent fills. Card labels are white. Card numbers can be Neon Green.
  - Row 8 or similar: section band like `LEAD TABLE`, `WORKBOOK GUIDE`, or `VERTICAL PRIORITY SNAPSHOT` with white text on a dark branded fill
  - Row 9+: main column header row, Dark Blue or Electric Blue fill with white text, then data rows with borders, alternating light fills, and specialty columns highlighted
- Use frozen panes below the KPI/card area so the branded intro stays visible while scrolling
- Hide gridlines for client-facing sheets whenever possible
- Use Neon Green mainly for numeric KPI values, score cells, or limited high-impact metrics
- Do NOT use Neon Green for paragraph bars, guidance copy, or long explanatory text. Use WHITE text on Dark Blue instead.
- Do NOT use purple in ProofPilot spreadsheets. Stay inside the core palette: Dark Blue, Electric Blue, Neon Green, White, Light Gray, Medium Gray, Green, and Red.
- If Light Blue is used as a background, pair it with WHITE text, not Neon Green.
- Category or priority columns can use Electric Blue, Dark Blue, or Green fills with white text for quick scanning

### Important Google Sheets Workaround
If the user wants a Claude-level premium branded spreadsheet and the live Google Sheets formatting tools are too limited, do NOT keep forcing the Composio formatting calls.

Instead:
1. Pull the live sheet data
2. Rebuild the workbook as a fully styled `.xlsx` with `openpyxl`
3. Use merged title/subtitle rows, tab colors, freeze panes, filters, hidden gridlines, branded headers, alternating sections, and KPI tiles
4. Upload the `.xlsx` to Google Drive with metadata `mimeType=application/vnd.google-apps.spreadsheet` so it converts into a native Google Sheet
5. Share the new Google Sheet link with the user

This is the reliable way to get exact ProofPilot spreadsheet branding, including merged report-style top sections, centered headings, white header text, and tab-level polish.

## Key Findings Colors

| Section | Header Color |
|---------|--------------|
| What's Working Well | Green (#28A745) |
| Critical Issues | Red (#DC3545) |
| Quick Wins | Electric Blue (#0051FF) |
| Pages You Need | Dark Blue (#00184D) |

## Pre-Output Checklist

Before presenting any ProofPilot document:
- Colors use exact hex codes from Brand Colors table
- Headings use Bebas Neue font with eyebrow+title pattern (NOT dark blue background boxes)
- Body text uses Calibri font on white background
- Cover page is clean/white with eyebrow title + info table + small highlight bar (NOT full-page dark blue box)
- Table headers use Dark Blue or Electric Blue background with white text
- Score text is Neon Green and bold
- Callout boxes used sparingly for key highlights only
- Header shows "PROOFPILOT | [Document Title]"
- Footer shows "ProofPilot | Confidential" centered

## Brand Voice

- Direct, confident language
- Active voice
- Short, impactful sentences
- Address reader as "you" and "your"
- No em dashes or semicolons
- Data-driven claims when possible

## python-docx Implementation

### Reusable Helper Functions (ALWAYS USE THESE)

Load the template file with `skill_view("proofpilot-brand", file_path="templates/branded_docx_helpers.py")`.

This file contains battle-tested helper functions that implement every brand element:
- `setup_document()` — page setup, margins, default styles
- `add_header_footer(doc, doc_type)` — branded header/footer
- `add_cover_page(doc, ...)` — full cover page with callout box and Prepared For/By
- `add_section_heading(doc, eyebrow, title, tagline)` — eyebrow + title pattern
- `add_callout_box(doc, title, bullets)` — Dark Blue box with Neon Green title
- `add_cta_box(doc, title, subtitle)` — Electric Blue CTA for end of document
- `add_branded_table(doc, headers, rows, header_color)` — data table with alternating rows
- `add_card_row(doc, cards)` — multi-column colored card layout
- `add_check_bullet(doc, text, bold_prefix)` — checkmark bullet points
- `add_week_heading(doc, week, title)` — timeline/phase headings
- `add_body_text(doc, text)`, `add_sub_heading(doc, text)`, `add_spacer(doc, pts)`

**Copy these helpers into your builder script.** Do NOT write raw python-docx from scratch.

### Key Implementation Notes
- Use `font='Bebas Neue'` AND set rFonts XML element for Google Docs compatibility
- Use `parse_xml` with `nsdecls("w")` for table border and shading elements
- Section headings: Electric Blue eyebrow paragraph (10pt) + Dark Blue title paragraph (20-26pt) on white background
- Cover page: centered text paragraphs (NOT a full-page dark blue 1x1 table). Only use a 1x1 table for the small highlight bar at bottom.
- Callout boxes: 1x1 tables with Dark Blue bg, used SPARINGLY for strategic focus bars and score highlights
- Table no-borders: `<w:tblBorders>` with all vals set to "none"
- Table full-width: `<w:tblW w:type="pct" w:w="5000"/>`
- Google Docs may substitute fonts if Bebas Neue isn't in the viewer's font library

## File Naming

`[Document-Type]-[Topic].docx`

Examples:
- `40-Point-Website-SEO-Audit.docx`
- `Ultimate-Home-Service-Website-Blueprint.docx`
- `Local-SEO-Strategy-Proposal.docx`