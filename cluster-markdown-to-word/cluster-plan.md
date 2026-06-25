# Content Cluster Plan: "Markdown to Word"

**Site:** devmark / MDTool — client-side Markdown→Word / Markdown→PDF / Markdown→HTML converter (no upload, no signup; Word export built on `docx`)
**Pillar page:** `/markdown-to-word` (existing app route)
**Method:** SERP-overlap clustering — keywords grouped by shared top-10 Google results, not text similarity.

> Note: this site already has sibling clusters for "Markdown to PDF" (see `../cluster-plan.md`) and "Markdown to HTML" (see `../cluster-markdown-to-html/cluster-plan.md`). This is a new, third cluster for the Word pillar — confirmed via `public/llms.txt` that no existing guide currently targets "markdown to word" or its variants. Outputs are kept in this subdirectory so the three clusters don't overwrite each other.

## Why this shape

The pillar page (`app/markdown-to-word/page.tsx`) is already well-built: it has a Markdown-element-to-Word-output comparison table, an honest explanation of why Mermaid diagrams/images aren't supported yet, and 5 FAQ items — stronger copy than most competitor tool pages. The gap is the same pattern as the other two clusters: **nothing links to it from content**. WebSearch confirmed four genuinely distinct SERP worlds around "markdown to word": troubleshooting queries for specific elements breaking during DOCX export (markdown-to-word.online's dedicated troubleshooting sub-pages, markdowntoword.pro, GitHub issues), commercial/comparison queries (a stable competitor set of markdowntoword.io/.net/.pro, mconverter.eu, cloudconvert, mdtoword.org, Writage, Pandoc), source-app workflow queries (ChatGPT, Obsidian, Notion, and GitHub README each have their own distinct competitor set and conversion quirks), and reference/use-case queries (resume-building, table of contents). Generic batch/CLI queries ("batch convert markdown files to word", "pandoc command line") were excluded — same call as the PDF and HTML clusters: that audience wants code (Aspose, Python, C#), not a browser tool, and converts at ~0%.

## Pillar

| | |
|---|---|
| Page | `/markdown-to-word` |
| Keyword | markdown to word |
| Status | written (live tool, strong existing copy) |
| Action | Add internal links to the 11 planned spokes below once written — currently links only to other tool pages and the Markdown Cheatsheet post, no topical spokes |

## Cluster 1 — Conversion Problems & Fixes (informational, blue)
*SERP world: dedicated troubleshooting pages from markdown-to-word.online, markdowntoword.pro, and mdtoword.org for specific elements breaking during DOCX export. High intent — visitor's output already looks wrong.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Why Markdown Tables Don't Convert to Word Tables Properly | markdown table not converting to word table | 1,300 |
| 📝 planned | Why Code Blocks Get Lost When You Paste Markdown Into Word | markdown code blocks lost when pasted into word | 1,250 |
| 📝 planned | Why Markdown Headings Don't Become Word Heading Styles (And How to Fix It) | markdown headings not converting to word heading styles | 1,250 |

## Cluster 2 — Comparisons & Privacy (commercial, orange)
*SERP world: "best converter", "no upload privacy", and "pandoc alternative" queries all return heavy overlap on the same competitor set (markdowntoword.io, .net, .pro, mconverter.eu, cloudconvert, mdtoword.org, Writage, Pandoc) — confirmed 7+ shared results, so these stay as one comparison post + one Pandoc-alternative post rather than fragmenting further.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Best Markdown to Word Converter in 2026: MDTool vs. The Alternatives | best markdown to word converter | 1,650 |
| 📝 planned | Markdown to Word Without Pandoc: A No-Install Browser Alternative | pandoc alternative markdown to word browser | 1,300 |

## Cluster 3 — Source-App Workflows (informational/transactional, teal)
*Each keyword has its own distinct SERP and job-to-be-done (ChatGPT output, Obsidian vault notes, GitHub README, Notion pages) rather than the generic "converter" competitor set. ChatGPT-to-Word alone supports dedicated competitor sites (md2doc.com, docstomarkdown.pro) with near-zero SERP overlap against the head term.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | How to Turn ChatGPT Markdown Into a Word Document | paste chatgpt markdown into word document | 1,350 |
| 📝 planned | Obsidian to Word: Exporting Notes Without Losing Formatting | obsidian notes export to word document | 1,300 |
| 📝 planned | GitHub README to Word: Converting README.md Without the Command Line | github readme to word document | 1,300 |
| 📝 planned | Notion to Word: Exporting Pages via Markdown the Easy Way | notion export markdown to word | 1,200 |

## Cluster 4 — Use Cases & Reference (informational, green)
*Document-formatting reference content. Builds topical authority and feeds the other clusters; reuses the existing "Markdown Cheatsheet" post (written for the PDF cluster) as a cross-link rather than duplicating it.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | How to Write a Resume in Markdown and Export It to Word | markdown resume to word document | 1,250 |
| 📝 planned | How to Get a Table of Contents When You Convert Markdown to Word | markdown to word table of contents | 1,200 |
| ✅ written (reused) | Complete Markdown Cheatsheet — Every Syntax You Need | markdown cheatsheet | 1,636 |

## Totals

- 13 posts (1 pillar + 12 spokes): **2 written, 11 planned**
- Estimated total words: **~16,986**
- Internal links: **45** (24 mandatory pillar↔spoke, 18 in-cluster recommended, 3 cross-cluster optional)
- Cannibalization check: no two posts share a primary keyword — clear. No overlap with the existing "Markdown to PDF" or "Markdown to HTML" cluster keyword sets either ("markdown resume to word" and "github readme to word" are DOCX-specific variants distinct from their PDF/HTML counterparts — confirmed no shared top-10 results).

## SERP Overlap Highlights (sample pairs checked)

| Keyword A | Keyword B | Shared top-10 domains | Score | Decision |
|---|---|---|---|---|
| best markdown to word converter | pandoc alternative markdown to word browser | markdowntoword.io, cloudconvert, mconverter.eu, Pandoc, Writage (5) | 5 | same cluster |
| markdown table not converting to word table | markdown code blocks lost when pasted into word | markdown-to-word.online, markdowntoword.io, markdowntoword.pro (3) | 3 | interlink |
| paste chatgpt markdown into word document | obsidian notes export to word document | markdown-to-word.online, markdowntoword.pro (2) | 2 | interlink |
| markdown to word | best markdown to word converter | markdowntoword.io, cloudconvert, mconverter.eu, mdtoword.org (4) | 4 | same cluster (pillar↔spoke) |
| github readme to word document | paste chatgpt markdown into word document | markdown-to-word.online (1) | 1 | separate (own spokes, light interlink only) |
| markdown resume to word document | markdown to word table of contents | none shared in sampled top-10 | 0-1 | separate |

Full per-pair rationale is embedded in each cluster's `rationale` field in `cluster-plan.json`.

## Internal Linking Rules Applied

- Every spoke links to the pillar and receives a link from it (mandatory, keyword-anchored).
- Every post has 2 in-cluster links to its nearest neighbors (recommended).
- 3 cross-cluster links connect Comparisons → Workflows → Use Cases where topically justified (optional, capped at 1 per post).
- No orphan pages — every planned post is reachable from the pillar in one click.

## Next Steps

1. Review the 11 planned briefs in `cluster-briefs/`.
2. Priority order: **best-of comparison post first** (highest commercial intent, fastest to write since it reuses the HTML/PDF cluster's competitor research pattern), then the three troubleshooting posts (high intent, low competition, dedicated competitor sub-pages prove the demand), then ChatGPT-to-Word (largest distinct SERP world in Source-App Workflows), then the remaining Source-App and Use Cases posts.
3. Add the mandatory pillar↔spoke links to `/markdown-to-word` as each post ships — the pillar currently links to zero topical spokes.
4. Regenerate the map after each post ships: `/seo cluster map` (point it at this directory).
