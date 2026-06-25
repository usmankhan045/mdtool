# Content Cluster Plan: "Word to Markdown"

**Site:** devmark / MDTool — client-side Word→Markdown / Markdown→Word / Markdown→PDF / Markdown→HTML / HTML→Markdown converter (no upload, no signup)
**Pillar page:** `/word-to-markdown` (existing app route)
**Method:** SERP-overlap clustering — keywords grouped by shared top-10 Google results, not text similarity.

> Note: this site already has sibling clusters for "HTML to Markdown" (`../cluster-html-to-markdown/`), "Markdown to Word" (`../cluster-markdown-to-word/`), and others. This is a new, fourth cluster for the Word→Markdown pillar — confirmed via `public/llms.txt` that no existing guide currently targets "word to markdown", "docx to markdown", or their variants. Outputs are kept in this subdirectory so the clusters don't overwrite each other.

## Why this shape

The pillar page (`app/word-to-markdown/page.tsx`) is already well-built: it has a "What Gets Lost When Converting from Word" section explaining the heading-style-vs-manual-formatting distinction (built on mammoth.js), a conversion element table, and 5 FAQ items — including an honest disclosure that embedded images aren't extracted. The gap is the same pattern as every prior cluster: **nothing links to it from content**.

WebSearch confirmed five genuinely distinct SERP worlds around "word to markdown": troubleshooting queries for specific elements breaking during DOCX→MD conversion (codegenes.net, christiantietze.de, blog.markdowntools.com, Pandoc GitHub issues — completely different from the tool-page SERP), commercial/comparison queries (stable competitor set: word2md.com, word2md.net, docstomarkdown.pro, monkt.com, vertopal, Aspose, Pandoc, Mammoth.js), source-app workflow queries (Obsidian plugin debates on forum.obsidian.md, Google Docs's own native Markdown export and the gd2md-html Workspace add-on — each with its own distinct SERP), AI/RAG pipeline queries (entirely separate competitor set: Microsoft MarkItDown, AnythingMD, oa.doc2md, and a wave of 2026 blog posts explaining why Markdown chunks more cleanly for LLM embeddings — 0 shared results with the generic converter SERP), and the long-tail natural-language phrasing "convert word document to markdown" (more conversational mixed-SERP supporting a complete-guide companion post). Generic developer/CLI queries ("docx to markdown python library", "pandoc --extract-media command line") were excluded — same call as every prior cluster: that audience wants code, not a browser tool.

## Pillar

| | |
|---|---|
| Page | `/word-to-markdown` |
| Keyword | word to markdown |
| Status | written (live tool, strong existing copy) |
| Action | Add internal links to the 10 planned spokes below once written — currently links only to other tool pages and the Markdown Cheatsheet post, no topical spokes |

## Cluster 1 — Conversion Problems & Fixes (informational, blue)
*SERP world: dedicated troubleshooting content on codegenes.net, christiantietze.de, blog.markdowntools.com, and Pandoc's own GitHub issue tracker (jgm/pandoc#11412) for images/tables/formatting elements breaking during DOCX→Markdown conversion. Zero overlap with the generic head-term SERP. High intent — visitor's output already looks wrong, converts as soon as a working fix is shown. Images issue is doubly relevant because MDTool's own tool also doesn't extract embedded images — honest explanation builds trust.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Why Images Disappear When You Convert Word to Markdown | word to markdown images not extracted | 1,300 |
| 📝 planned | Why Word Tables Don't Convert Cleanly to Markdown Tables | word table not converting to markdown table | 1,300 |
| 📝 planned | Why Manual Formatting Gets Lost When You Convert Word to Markdown | word formatting lost converting to markdown | 1,250 |

## Cluster 2 — Comparisons (commercial, orange)
*SERP world: "word to markdown converter", "convert docx to markdown online", and "best docx to markdown converter 2026" all return 6+ shared results from the same competitor set (word2md.com, word2md.net, docstomarkdown.pro, monkt.com, vertopal, Aspose, Pandoc, Mammoth.js) — same cluster, one comparison post and one no-Pandoc post. MDTool's wedge: true client-side mammoth.js processing, no server upload, no signup, no batch-file paywall.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Best Word to Markdown Converter in 2026: MDTool vs. word2md, Pandoc, and More | best word to markdown converter | 1,650 |
| 📝 planned | Word to Markdown Without Pandoc: A No-Install Browser Alternative | pandoc alternative word to markdown browser | 1,300 |

## Cluster 3 — Source-App Workflows (informational/transactional, teal)
*Each keyword has its own distinct SERP and job-to-be-done. Obsidian: forum threads and dedicated plugins (Docxer, obsidian-pandoc) debating plugin-vs-pre-convert, 0 overlap with generic converter SERP. Google Docs: entirely separate world (gdoc2md.com, Mr0grog/google-docs-to-markdown GitHub project, Google's native "Copy as Markdown" feature, GD2md-html Workspace add-on) — different source format, different audience, disambiguation content. Notion excluded: Notion imports .docx natively without a Markdown intermediate step, so targeting that keyword would require telling users MDTool is unnecessary for that workflow.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Importing Word Documents Into Obsidian as Markdown (No Plugin Required) | import word document into obsidian markdown | 1,300 |
| 📝 planned | Google Docs to Markdown vs. Word to Markdown: Which Converter Do You Actually Need | google docs to markdown converter | 1,250 |

## Cluster 4 — AI & Documentation Use Cases (informational, green)
*Fast-growing, fully distinct SERP world confirmed via WebSearch (2026): "convert docx to markdown for RAG LLM training data" returns Microsoft MarkItDown (2,700+ production projects), AnythingMD, oa.doc2md, and a wave of 2026 blog posts on RAG chunking quality — 0 shared results with the generic head-term SERP. Documentation-migration angle targets the same technical audience from the legacy-content angle (converting old Word docs into a docs-as-code repo) rather than the AI-pipeline angle — distinct enough for two posts, confirmed no shared top-10 results between the two query sets.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | How to Convert Word Documents to Markdown for RAG and LLM Knowledge Bases | convert docx to markdown for rag | 1,500 |
| 📝 planned | Migrating Word Documentation to Markdown for GitHub Wikis and Docs-as-Code | word documentation to markdown migration | 1,350 |

## Cluster 5 — Complete Guide & Reference (informational, purple)
*The natural-language phrasing "convert word document to markdown" has its own more conversational SERP (mixed how-to and tool content) distinct from the tool-landing-page head term — same pattern as the existing "Markdown to HTML Online: The Complete Conversion Guide" post on this site. Pairs with the already-written Markdown Cheatsheet as a reference cross-link.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | How to Convert a Word Document to Markdown: The Complete Guide | convert word document to markdown | 2,200 |
| ✅ written (reused) | Complete Markdown Cheatsheet — Every Syntax You Need | markdown cheatsheet | 1,636 |

## Totals

- 12 posts (1 pillar + 11 spokes): **2 written, 10 planned**
- Estimated total words: **~17,136**
- Internal links: **39** (22 mandatory pillar↔spoke, 14 in-cluster recommended, 3 cross-cluster optional)
- Cannibalization check: no two posts share a primary keyword — clear. No overlap with the existing "HTML to Markdown" or "Markdown to Word" cluster keyword sets either (inverse-direction troubleshooting queries return completely different domain sets — confirmed via WebSearch, zero shared top-10 results).

## SERP Overlap Highlights (sample pairs checked)

| Keyword A | Keyword B | Shared top-10 domains | Score | Decision |
|---|---|---|---|---|
| word to markdown converter | convert docx to markdown online | word2md.com, word2md.net, docstomarkdown.pro, monkt.com, vertopal, Aspose (6) | 6 | same cluster/pillar |
| best word to markdown converter | pandoc alternative word to markdown browser | word2md.com, word2md.net, docstomarkdown.pro, Pandoc, Aspose (5) | 5 | same cluster (cluster 2) |
| word to markdown images not extracted | word table not converting to markdown table | codegenes.net, blog.markdowntools.com (2) | 2 | interlink |
| word to markdown converter | convert docx to markdown for rag | 0 shared — entirely different competitor set | 0 | separate cluster (cluster 4) |
| import word document into obsidian markdown | google docs to markdown converter | 0 shared — different source app, different tools | 0 | separate spokes |
| word to markdown images not extracted | word to markdown converter (head term) | blog.markdowntools.com (1) | 1 | separate (troubleshooting spoke) |

Full per-cluster rationale is embedded in each cluster's `rationale` field in `cluster-plan.json`.

## Internal Linking Rules Applied

- Every spoke links to the pillar and receives a link from it (mandatory, keyword-anchored).
- Every post has 2 in-cluster links to its nearest neighbors (recommended).
- 3 cross-cluster links connect Comparisons → Complete Guide, AI/Docs → Cheatsheet, and Source-App → Pandoc Alternative (optional, capped at 1 per post).
- No orphan pages — every planned post is reachable from the pillar in one click.

## Next Steps

1. Review the 10 planned briefs in `cluster-briefs/`.
2. Priority order: **"How to Convert a Word Document to Markdown: The Complete Guide"** first (targets the broadest informational phrasing, full brief already generated), then the three troubleshooting posts (high intent, low competition, honest about MDTool's own image limitation), then the comparison post (highest commercial intent), then RAG/LLM (most current and distinctive angle in 2026), then the remaining Obsidian/Google Docs and documentation posts.
3. Add the mandatory pillar↔spoke links to `/word-to-markdown` as each post ships — the pillar currently links to zero topical spokes.
4. Regenerate the map after each post ships: `/seo cluster map` (point it at this directory).
