# Brief: Why HTML Tables Don't Convert Cleanly to Markdown

**Cluster:** Conversion Problems & Fixes (cluster-0-post-1)
**Primary keyword:** html table to markdown not working
**Secondary keywords:** html table merged cells markdown, nested table to markdown, colspan rowspan markdown table
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/html-table-to-markdown-not-working`

## Meta Description
Your HTML table converted to a broken or empty Markdown table? Markdown tables can't represent merged cells, nested tables, or rich cell content the way HTML can — here's exactly what breaks and what to do about it.

## Outline
- H1: Why HTML Tables Don't Convert Cleanly to Markdown
- H2: The core mismatch — GFM tables are a grid, HTML tables are a layout engine
- H2: Three things HTML tables can do that Markdown tables genuinely cannot
  - H3: `colspan` and `rowspan` (merged cells)
  - H3: A table nested inside another table's cell
  - H3: Block-level content inside a cell (lists, multiple paragraphs, another table)
- H2: What a good converter does when it hits these cases (and what a bad one does)
- H2: Workarounds: when to keep a complex table as an HTML block inside your Markdown instead
- H2: Checklist before you publish

## Key points to cover
- State the mismatch plainly: GFM tables are strictly rows × columns, single line of text per cell, no merged cells. HTML tables predate the web's layout era and can express alignment-as-data (`colspan`/`rowspan`) and arbitrary nested content.
- Walk through what happens to each: `colspan`/`rowspan` gets flattened — the merged cell's text repeats or empties out depending on the converter; a nested table gets flattened to its text content (its own rows run together) rather than producing a Markdown table inside a Markdown table cell, which doesn't exist; multi-paragraph or list content inside a cell gets collapsed to one line, usually with `<br>` substituted for paragraph breaks.
- Give the practical fix: Markdown (CommonMark + GFM) allows raw HTML to pass through unchanged, so for a genuinely complex table, the correct move is to keep it as a literal `<table>` block inside the `.md` file rather than forcing it into pipe-table syntax that can't represent it. Most Markdown renderers (GitHub, most static-site generators) render embedded HTML tables fine.
- Cover the most common real-world trigger: tables copied from Word, Excel, or Confluence, which often abuse `colspan` for visual spacing.

## Internal links to include
- → Pillar `/html-to-markdown` — anchor: "html to markdown converter" (mandatory)
- → `/blog/html-to-markdown-code-block-language` — anchor: "code block language not preserved" (in-cluster, recommended)
- → `/blog/html-to-markdown-nested-list-indent` — anchor: "nested list indent" (in-cluster, recommended)

## Competing pages to differentiate from
- TableConvert / Table to Markdown's own help pages — written to sell their own table-specific converter, don't explain the underlying colspan/rowspan limitation.
- Generic "Markdown table syntax" tutorials — show how to write a simple table by hand, not what happens when an existing complex HTML table is forced into that syntax.
