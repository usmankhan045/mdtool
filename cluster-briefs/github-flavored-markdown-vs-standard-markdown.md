# Brief: GitHub Flavored Markdown vs. Standard Markdown — What's the Difference?

**Cluster:** Markdown Fundamentals (cluster-3-post-1)
**Primary keyword:** github flavored markdown vs standard markdown
**Secondary keywords:** GFM vs CommonMark, what is github flavored markdown, markdown flavors compared
**Template:** explainer
**Target word count:** ~1,100
**URL:** `/blog/github-flavored-markdown-vs-standard-markdown`

## Meta Description
"Standard" Markdown doesn't have tables, task lists, or strikethrough — GitHub Flavored Markdown (GFM) added those. Here's exactly what's different, and why it matters when you're converting to PDF.

## Outline
- H1: GitHub Flavored Markdown vs. Standard Markdown
- H2: Standard Markdown (CommonMark) — what it covers
- H2: What GFM adds on top: tables, task lists, strikethrough, autolinks, footnotes, Mermaid/alerts
- H2: Where else GFM is supported (GitLab, Bitbucket, Discord, Reddit, Slack)
- H2: Why this matters for PDF conversion (a converter built only for CommonMark will mangle GFM tables and task lists)
- H2: Quick reference table: feature-by-feature comparison

## Key points to cover
- This is reference/TOFU content — keep it factual and citation-grade (it's exactly the kind of page that gets pulled into AI Overviews and LLM answers if structured as a clean comparison table).
- Explicitly connect back to the practical pain point: readers who hit broken tables or task lists in a PDF export often don't realize they're using a GFM-specific feature a generic converter doesn't support.

## Internal links to include
- → Pillar `/markdown-to-pdf` — anchor: "github flavored markdown vs standard markdown" (mandatory)
- → `/blog/markdown-cheatsheet` — anchor: "markdown cheatsheet" (in-cluster, recommended)
- → `/blog/github-readme-to-pdf` — anchor: "github readme to pdf" (cross-cluster, optional — GFM is the syntax GitHub READMEs are written in)

## Competing pages to differentiate from
- github.github.com/gfm (the formal spec) — authoritative but dense; win on plain-language comparison table.
- ToMarkdown, macmdviewer guides — similar angle; differentiate by tying the comparison directly to the PDF-conversion pain point instead of stopping at syntax reference.
