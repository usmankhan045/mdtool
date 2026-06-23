# Content Cluster Plan: "Markdown to PDF"

**Site:** devmark — client-side Markdown→PDF / Markdown→HTML converter (no upload, no signup; built on html2pdf.js, marked, mermaid, highlight.js)
**Pillar page:** `/markdown-to-pdf` (existing app route)
**Method:** SERP-overlap clustering — keywords grouped by shared top-10 Google results, not text similarity.

## Why this shape

Your blog already has 6 posts that map cleanly onto two of the four clusters below — they were clearly written around real failure points (code blocks, tables) and real competitive angles (best-of comparison, GitHub README). This plan keeps that structure, slots the existing posts in as **written**, and adds 7 **planned** posts to close gaps where competitors already rank and where your product's actual differentiators (client-side processing, Mermaid support, no signup) give you a real edge — rather than chasing generic CLI/Python/Node-library queries that searchers for a no-code browser tool don't care about.

## Pillar

| | |
|---|---|
| Page | `/markdown-to-pdf` |
| Keyword | markdown to pdf |
| Status | written (live tool) |
| Action | Add ~1,200 words of supporting copy + FAQ around the embedded converter (don't push the tool below the fold) |

## Cluster 1 — Conversion Problems & Fixes (informational, blue)
*SERP world: GitHub issue threads & troubleshooting guides for specific Markdown elements breaking in PDF export. High intent — visitor already has a broken file.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| ✅ written | Markdown to PDF Code Blocks: Why They Break and How to Fix It | markdown to pdf code blocks | 1,357 |
| ✅ written | Why Markdown Tables Break in PDF Exports | markdown table pdf | 1,612 |
| 📝 planned | Why Markdown Images Don't Show Up in PDF Exports | markdown to pdf images not showing | 1,300 |
| 📝 planned | Markdown to PDF with Mermaid Diagrams: Why They Disappear | markdown to pdf mermaid diagram | 1,400 |

## Cluster 2 — Comparisons & Privacy (commercial, orange)
*SERP world: tool-comparison + "without uploading"/privacy queries return the same competitor set (CloudConvert, Dillinger, CodeShack, DevineTools). This is devmark's core wedge: client-side, no signup.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| ✅ written | Best Markdown to PDF Converter in 2026: DevMark vs. The Alternatives | best markdown to pdf converter | 1,657 |
| 📝 planned | Convert Markdown to PDF Without Uploading Your File | convert markdown to pdf without uploading | 1,300 |
| 📝 planned | Online Converter vs. Pandoc — Which Should You Use? | markdown to pdf vs pandoc | 1,200 |

## Cluster 3 — Developer & Docs Workflows (informational/transactional, teal)
*Each keyword has its own distinct SERP and job-to-be-done (resume builders, docs tooling) rather than the generic "converter" competitor set.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| ✅ written | GitHub README to PDF: The Complete Developer Guide | github readme to pdf | 1,361 |
| 📝 planned | How to Convert Your Markdown Resume to a Polished PDF | markdown resume to pdf | 1,300 |
| 📝 planned | How to Batch Convert Multiple Markdown Files to PDF | batch convert markdown files to pdf | 1,200 |

## Cluster 4 — Markdown Fundamentals (informational, green)
*Top-of-funnel reference content. Builds topical authority and links; feeds the other clusters.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| ✅ written | Complete Markdown Cheatsheet — Every Syntax You Need | markdown cheatsheet | 1,636 |
| 📝 planned | GitHub Flavored Markdown vs. Standard Markdown | github flavored markdown vs standard markdown | 1,100 |

## Totals

- 13 posts (1 pillar + 12 spokes): **6 written, 7 planned**
- Estimated total words: **~17,600**
- Internal links: **39** (24 mandatory pillar↔spoke, 12 in-cluster recommended, 3 cross-cluster optional)
- Cannibalization check: no two posts share a primary keyword — clear.

## Internal Linking Rules Applied

- Every spoke links to the pillar and receives a link from it (mandatory, keyword-anchored).
- Every post has 2 in-cluster links to its nearest neighbors (recommended).
- 3 cross-cluster links connect Fundamentals → Problems/Workflows and Comparisons → Workflows where topically justified (optional, capped at 1 per post).
- No orphan pages — every planned post is reachable from the pillar in one click and from at least one written post.

## Next Steps

1. Review the 7 planned briefs in `cluster-briefs/`.
2. Write posts in priority order: privacy/no-upload page first (competitive wedge, reuses comparison research already in the best-of post), then Mermaid (reuses existing `mermaid` dependency as proof), then the rest.
3. Add the mandatory pillar↔spoke links to the 6 existing posts — none of them currently appear to link back to `/markdown-to-pdf` by keyword anchor (verify during editing).
4. Regenerate the map after each post ships: `/seo cluster map`.
