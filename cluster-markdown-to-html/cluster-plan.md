# Content Cluster Plan: "Markdown to HTML"

**Site:** devmark / MDTool — client-side Markdown→HTML / Markdown→PDF converter (no upload, no signup; built on `marked` + `highlight.js`)
**Pillar page:** `/markdown-to-html` (existing app route)
**Method:** SERP-overlap clustering — keywords grouped by shared top-10 Google results, not text similarity.

> Note: this site already has a separate "Markdown to PDF" cluster (see `../cluster-plan.md`). This is a sibling cluster for the HTML pillar — outputs are kept in this subdirectory so the two don't overwrite each other.

## Why this shape

The pillar page (`app/markdown-to-html/page.tsx`) is already well-built: it has a snippet-vs-full-document comparison table, a semantic-HTML/accessibility section, and 6 FAQ items — stronger than most competitor tool pages. The gap isn't the pillar, it's that **nothing links to it from content**. WebSearch confirmed four genuinely distinct SERP worlds around "markdown to html": generic converter queries (one shared competitor set: markdowntohtml.com, Syncfusion, CodeShack, MarkdownLivePreview, Dillinger), troubleshooting queries (GitHub Docs, Markdown Guide, dev blogs), developer/CMS workflow queries (GitHub repos/npm for README, WordPress plugin directory for CMS), and top-of-funnel concept queries (Google's own style guide, multiple "markdown vs html" comparison blogs). Generic library/CLI queries ("markdown to html python", "javascript library") were excluded — same call as the PDF cluster: that audience wants code, not a browser tool, and converts at ~0%.

## Pillar

| | |
|---|---|
| Page | `/markdown-to-html` |
| Keyword | markdown to html |
| Status | written (live tool, strong existing copy) |
| Action | Add internal links to the 11 planned spokes below once written — currently links only to other tool pages and one blog post, no topical spokes |

## Cluster 1 — Conversion Problems & Fixes (informational, blue)
*SERP world: GitHub Docs, Markdown Guide, and troubleshooting blogs for specific elements breaking during HTML export. High intent — visitor's output already looks wrong.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Why Code Blocks Lose Syntax Highlighting When You Convert Markdown to HTML | markdown to html code blocks not highlighting | 1,300 |
| 📝 planned | Why Markdown Tables Don't Render Properly in HTML Output | markdown to html table not rendering | 1,250 |
| 📝 planned | Why Markdown Images Don't Show Up After Converting to HTML | markdown to html images not showing | 1,250 |

## Cluster 2 — Comparisons & Privacy (commercial, orange)
*SERP world: "converter", "free no upload", and "best online tool" queries all return the same competitor set (markdowntohtml.com, Syncfusion, CodeShack, MarkdownLivePreview, Dillinger) — confirmed 7+ shared results, so these stay as one pillar + one comparison post rather than fragmenting into separate pages.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Best Markdown to HTML Converter in 2026: DevMark vs. The Alternatives | best markdown to html converter | 1,600 |
| 📝 planned | Convert Markdown to HTML Without Uploading Your File | markdown to html converter free no upload | 1,250 |

## Cluster 3 — Developer & CMS Workflows (informational/transactional, teal)
*Each keyword has its own distinct SERP and job-to-be-done (GitHub README rendering, WordPress publishing, batch processing) rather than the generic "converter" competitor set.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | GitHub README.md to HTML: GitHub-Style Output Without the Command Line | readme.md to html github style | 1,350 |
| 📝 planned | How to Convert Markdown to HTML for WordPress and Other CMS Platforms | convert markdown to html for wordpress | 1,300 |
| 📝 planned | How to Batch Convert Multiple Markdown Files to HTML | batch convert markdown files to html | 1,200 |

## Cluster 4 — Markdown & HTML Fundamentals (informational, green)
*Top-of-funnel reference content. Builds topical authority and links; feeds the other clusters. Reuses the existing "Markdown Cheatsheet" post (written for the PDF cluster) as a cross-link rather than duplicating it.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Markdown vs. HTML: Key Differences and When to Use Each | markdown vs html | 1,400 |
| 📝 planned | How to Style HTML Generated From Markdown (A CSS Guide) | markdown to html css styling | 1,300 |
| 📝 planned | Why Semantic HTML Matters When You Convert Markdown | semantic html from markdown accessibility | 1,150 |
| ✅ written (reused) | Complete Markdown Cheatsheet — Every Syntax You Need | markdown cheatsheet | 1,636 |

## Totals

- 13 posts (1 pillar + 12 spokes): **2 written, 11 planned**
- Estimated total words: **~17,100**
- Internal links: **47** (26 mandatory pillar↔spoke, 18 in-cluster recommended, 3 cross-cluster optional)
- Cannibalization check: no two posts share a primary keyword — clear. No overlap with the existing "Markdown to PDF" cluster's keyword set either.

## Internal Linking Rules Applied

- Every spoke links to the pillar and receives a link from it (mandatory, keyword-anchored).
- Every post has 2 in-cluster links to its nearest neighbors (recommended).
- 3 cross-cluster links connect Fundamentals → Problems/Workflows where topically justified (optional, capped at 1 per post).
- No orphan pages — every planned post is reachable from the pillar in one click.

## Next Steps

1. Review the 11 planned briefs in `cluster-briefs/`.
2. Priority order: **best-of comparison post first** (highest commercial intent, fastest to write since it reuses the existing PDF best-of post's competitor research), then the three troubleshooting posts (high intent, low competition), then Fundamentals, then Developer/CMS workflows.
3. Add the mandatory pillar↔spoke links to `/markdown-to-html` as each post ships — the pillar currently links to zero topical spokes.
4. Regenerate the map after each post ships: `/seo cluster map` (point it at this directory).
