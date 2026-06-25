# Brief: Why Word Tables Don't Convert Cleanly to Markdown Tables

**Cluster:** Conversion Problems & Fixes (cluster-0-post-1)
**Primary keyword:** word table not converting to markdown table
**Secondary keywords:** docx table to markdown conversion, word merged cells markdown, word table formatting lost, mammoth word table markdown
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/word-to-markdown-table-not-converting`

## Meta Description
Word tables with merged cells, nested tables, or mixed column widths often produce broken Markdown output. Here's why each case breaks and what to do before converting.

## Outline
- H1: Why Word Tables Don't Convert Cleanly to Markdown Tables
- H2: What Markdown tables can and can't represent
  - H3: The pipe table format and its hard constraints (no merged cells, no nested tables, one row per line)
  - H3: Why complex Word tables have no equivalent in Markdown
- H2: The four Word table patterns that most commonly break
  - H3: Merged cells (colspan/rowspan) — Markdown has no syntax for these
  - H3: Nested tables — output is garbled or flattened
  - H3: Tables with no header row — mammoth needs a header row to build a pipe table
  - H3: Tables relying on column width for meaning — width is lost in plain text
- H2: What mammoth.js actually does with each case
- H2: How to fix your Word table before converting
  - H3: Split merged cells manually
  - H3: Add a header row if missing
  - H3: Flatten nested tables into separate plain tables
- H2: When to abandon Markdown tables entirely
  - H3: Switching to an HTML table block inside your Markdown file
  - H3: Keeping the Word source as the authoritative version

## Key points to cover
- The post should open with a concrete example: a 3-column Word table with two merged cells in the header row → show what mammoth outputs vs. what a valid Markdown pipe table looks like. The visual contrast makes the problem immediately clear.
- Markdown's pipe table spec is strict: every row needs the same number of cells, the separator row (`|---|---|---|`) is required, and there is no colspan/rowspan syntax. A Word table that uses merged cells to communicate structure (e.g. a grouped header) literally cannot be expressed in pipe table format.
- Most converters handle simple tables fine. The problems are almost always caused by the four patterns listed above. Frame this as a "table audit" the writer can run on their Word doc before hitting convert.
- The "use an HTML table inside Markdown" escape hatch is practical and worth covering — most Markdown renderers (GitHub, Jekyll, Hugo) accept raw HTML blocks inside .md files, and this is the actual solution for tables that carry essential merged-cell structure.
- Avoid recommending Pandoc's `--no-highlight` or grid table format as a solution without explaining the downstream rendering tradeoffs — grid tables aren't supported by most static site generators.

## Internal links to include
- → Pillar `/word-to-markdown` — anchor: "word to markdown converter" (mandatory)
- → `/blog/word-to-markdown-images-not-extracted` — anchor: "images disappearing during conversion" (in-cluster, recommended)
- → `/blog/word-to-markdown-formatting-lost` — anchor: "manual formatting getting lost" (in-cluster, recommended)

## Competing pages to differentiate from
- rostrum.blog has a narrow R-focused post on converting a Word table to Markdown that won't apply to most visitors.
- The MarkItDown GitHub issue #20 (Word table conversion) is a developer thread — useful as a primary source to cite, not a competitor to match.
- Most generic "word to markdown" tool pages don't explain the four failure patterns; they just say "tables are supported" and leave users to debug on their own. Specificity is the differentiator here.
