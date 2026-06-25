# Brief: Why Markdown Tables Don't Convert to Word Tables Properly

**Cluster:** Conversion Problems & Fixes (cluster-0-post-0)
**Primary keyword:** markdown table not converting to word table
**Secondary keywords:** markdown to docx table broken, pipe table not rendering in word, gfm table word export
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/markdown-to-word-table-not-converting`

## Meta Description
Pipes and dashes showing up as literal text in your .docx instead of a real table? Here's why Markdown table conversion breaks and how to get a native Word table every time.

## Outline
- H1: Why Markdown Tables Don't Convert to Word Tables Properly
- H2: Markdown tables are a GFM extension, not core syntax
- H2: The most common causes
  - H3: Missing the header separator row (`| --- | --- |`)
  - H3: Inconsistent column counts between rows
  - H3: Converter doesn't parse GitHub Flavored Markdown at all
  - H3: Unescaped pipe characters inside cell content
- H2: Before/after — broken Markdown vs. correctly formatted table
- H2: Why MDTool outputs a real Word `<w:tbl>`, not an image or styled text block
- H2: Checklist before you convert

## Key points to cover
- Open by confirming tables aren't part of CommonMark at all — they're a GitHub Flavored Markdown addition, so any converter built on plain Markdown will print pipes as literal characters. This is the root cause behind most "table didn't convert" reports.
- Walk through the header-separator-row requirement since omitting it is the single most common self-inflicted cause.
- Explain that a true Word table (an actual `<w:tbl>` element in the .docx XML) is editable and resizable in Word, unlike competitors that sometimes paste tables in as monospaced plain text or an embedded image — tie this to MDTool's genuine GFM table support as the differentiator.

## Internal links to include
- → Pillar `/markdown-to-word` — anchor: "markdown to word converter" (mandatory)
- → `/blog/markdown-to-word-code-blocks-lost` — anchor: "code blocks lost when pasted into word" (in-cluster, recommended)
- → `/blog/markdown-to-word-headings-not-converting` — anchor: "headings not becoming Word styles" (in-cluster, recommended)

## Competing pages to differentiate from
- markdown-to-word.online's troubleshooting sub-page covers the symptom but not the GFM-vs-CommonMark root cause.
- Generic Markdown cheatsheets show correct table syntax but never address the "converter doesn't support GFM" failure mode.
