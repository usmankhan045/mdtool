# Brief: Why Markdown Headings Don't Become Word Heading Styles (And How to Fix It)

**Cluster:** Conversion Problems & Fixes (cluster-0-post-2)
**Primary keyword:** markdown headings not converting to word heading styles
**Secondary keywords:** markdown to word heading 1 heading 2, word navigation pane not showing headings, docx heading styles missing
**Template:** how-to
**Target word count:** ~1,250
**URL:** `/blog/markdown-to-word-headings-not-converting`

## Meta Description
If your converted Word document's Navigation Pane is empty, your `#` headings probably became bold text instead of real Heading styles. Here's why — and how to fix it.

## Outline
- H1: Why Markdown Headings Don't Become Word Heading Styles
- H2: The tell: an empty Navigation Pane (View → Navigation Pane)
- H2: Bold text vs. a real Heading style — why Word can't tell them apart visually but treats them completely differently
- H2: Why this matters: table of contents, accessibility, document outline
- H2: How MDTool maps `#`–`######` to native Heading 1–6 styles
- H2: How to check your own .docx — and how to fix one that converted wrong
- H2: FAQ

## Key points to cover
- Lead with the practical symptom (empty Navigation Pane / no auto-generated table of contents) since that's how most people discover the problem, before explaining the cause.
- Explain that many converters apply bold + larger font size to mimic a heading's *appearance* without applying the underlying Word style (`Heading 1`, `Heading 2`, etc.) — visually identical, structurally invisible to Word's outline and TOC features.
- Connect directly to the planned table-of-contents post: a correct heading-style conversion is the prerequisite for Word's automatic TOC feature to work at all.

## Internal links to include
- → Pillar `/markdown-to-word` — anchor: "markdown to word converter" (mandatory)
- → `/blog/markdown-to-word-code-blocks-lost` — anchor: "code blocks lost when pasted into word" (in-cluster, recommended)
- → `/blog/markdown-to-word-table-not-converting` — anchor: "tables not converting properly" (in-cluster, recommended)
- → `/blog/markdown-to-word-table-of-contents` — anchor: "automatic table of contents" (cross-cluster, optional)

## Competing pages to differentiate from
- Generic "Word heading styles" tutorials explain the feature but assume you're typing in Word, not converting from Markdown.
- mdtoword.org's FAQ mentions heading levels but doesn't explain the bold-text-vs-style distinction that actually causes the confusion.
