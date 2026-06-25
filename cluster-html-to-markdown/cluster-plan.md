# Content Cluster Plan: "HTML to Markdown"

**Site:** devmark / MDTool — client-side HTML→Markdown converter (no upload, no signup; built on `turndown` + GFM plugin)
**Pillar page:** `/html-to-markdown` (existing app route)
**Method:** SERP-overlap clustering — keywords grouped by shared top-10 Google results, not text similarity.

> Note: this site already has sibling clusters for "Markdown to PDF" (`../cluster-plan.md`) and "Markdown to HTML" (`../cluster-markdown-to-html/cluster-plan.md`). This is the third pillar — the *reverse* conversion direction — and outputs are kept in this subdirectory so the three don't overwrite each other.

## Why this shape

The pillar page (`app/html-to-markdown/page.tsx`) is already strong: it has a "How Ambiguous HTML Gets Resolved" section with an HTML-element-to-Markdown mapping table and 5 FAQs, ahead of most competitor tool pages. WebSearch confirmed five genuinely distinct SERP worlds: troubleshooting queries (Daring Fireball, Markdown Guide, Turndown GitHub issues), the converter/tool head term (codebeautify, htmlmarkdown.com, Syncfusion, Browserling, CodeShack, CloudConvert — with developer libraries like Turndown and JohannesKaufmann/html-to-markdown mixed into the *same* SERP, unlike the sibling cluster), a fast-moving AI/LLM scraping world (Firecrawl, Simplescraper, Bright Data — built around full-page URL scraping rather than paste-in-hand HTML), CMS/migration workflows (Confluence exporters, HTML-email tools), and a fundamentals bucket that intentionally defers to the sibling cluster's "Markdown vs. HTML" post rather than duplicating it.

## Pillar

| | |
|---|---|
| Page | `/html-to-markdown` |
| Keyword | html to markdown |
| Status | written (live tool) |
| Action | Add internal links to the 12 planned spokes below once written — currently links only to other tool pages, no topical spokes |

## Cluster 1 — Conversion Problems & Fixes (informational, blue)
*SERP world: Daring Fireball, Markdown Guide, and Turndown/PHP-league GitHub issue threads for specific elements breaking during conversion. High intent — visitor's output already looks wrong.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Why Code Blocks Lose Their Language Tag When You Convert HTML to Markdown | html to markdown code block language not preserved | 1,300 |
| 📝 planned | Why HTML Tables Don't Convert Cleanly to Markdown | html table to markdown not working | 1,300 |
| 📝 planned | Why Nested Lists Get Flattened When You Convert HTML to Markdown | html to markdown nested list indent | 1,200 |
| 📝 planned | Garbled Characters After Converting HTML to Markdown? Fix the Encoding | html to markdown encoding garbled characters | 1,200 |

## Cluster 2 — Comparisons & Tools (commercial, orange)
*SERP world: "converter", "online free", and "best" queries return the same 7+ shared results (codebeautify, htmlmarkdown.com, Syncfusion, Browserling, CodeShack, CloudConvert, PicoToolkit, Dillinger) — with Turndown.js and JohannesKaufmann/html-to-markdown ranking in the same SERP, unlike the sibling cluster. The comparison post should acknowledge the library option for scripted workflows while routing manual conversions to the tool.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Best HTML to Markdown Converter in 2026: DevMark vs. The Alternatives | best html to markdown converter | 1,650 |
| 📝 planned | Convert HTML to Markdown Without Uploading Your File | html to markdown converter free no upload | 1,300 |

## Cluster 3 — AI & LLM Workflows (informational/transactional, purple) — *new, distinct from sibling clusters*
*SERP world: "scrape website to markdown" returns Firecrawl, Simplescraper, Bright Data, Decodo — full-page URL scrapers for LLM ingestion, zero overlap with the static-HTML converter SERP. DevMark is paste/upload-based (you already have the HTML), so this cluster targets the narrower "clean up HTML I already copied, for a prompt" job rather than competing with full-site crawlers.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | How to Convert HTML to Markdown for ChatGPT and Claude Prompts | convert html to markdown for llm prompt | 1,400 |
| 📝 planned | HTML to Markdown vs. Web Scraping Tools: When You Already Have the HTML | html to markdown vs web scraper | 1,200 |

## Cluster 4 — Migration & Docs Workflows (informational/transactional, teal)
*Each keyword has its own distinct SERP and job-to-be-done (Confluence export, HTML-email cleanup, WordPress export) rather than the generic converter competitor set.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | How to Convert a Confluence Page to Markdown (No Plugin Required) | confluence page to markdown | 1,400 |
| 📝 planned | How to Convert an HTML Email to Markdown | html email to markdown | 1,200 |
| 📝 planned | How to Export WordPress Posts to Markdown Without a Plugin | wordpress html to markdown | 1,300 |

## Cluster 5 — Fundamentals & Reference (informational, green)
*Top-of-funnel reference content. Deliberately skips a duplicate "Markdown vs. HTML" post — that's already planned in the sibling "Markdown to HTML" cluster (`../cluster-markdown-to-html/cluster-plan.md`) and should be cross-linked, not rebuilt.*

| Status | Title | Keyword | Words |
|---|---|---|---|
| 📝 planned | Which HTML Elements Convert to Which Markdown Syntax? A Complete Mapping | html elements to markdown syntax mapping | 1,300 |

## Totals

- 13 posts (1 pillar + 12 spokes): **1 written (pillar only), 12 planned**
- Estimated total words: **~17,050**
- Internal links: **45** (24 mandatory pillar↔spoke, 18 in-cluster recommended, 3 cross-cluster optional)
- Cannibalization check: no two posts in this cluster share a primary keyword. Checked against both sibling clusters and the live blog (`content/blog/`) — no overlap. The one near-collision ("markdown vs html") was resolved by deferring to the sibling cluster's planned post instead of duplicating it.

## Internal Linking Rules Applied

- Every spoke links to the pillar and receives a link from it (mandatory, keyword-anchored).
- Cluster 1 (4 posts) is linked as a ring — each post has 2 recommended in-cluster links.
- Clusters 2 and 3 (2 posts each) are linked as a single bidirectional pair.
- Cluster 4 (3 posts) is linked as a triangle — each post has 2 recommended in-cluster links.
- Cluster 5 (1 post) has no in-cluster links — it gets 2 inbound optional cross-cluster links instead (from Cluster 1's code-block post and Cluster 4's Confluence post, both natural references to the element-mapping reference).
- 3 cross-cluster links total, capped at 1 per linking post.
- No orphan pages — every planned post is reachable from the pillar in one click.

## Next Steps

1. Review the 12 planned briefs in `cluster-briefs/`.
2. Write posts in priority order: best-converter comparison first (captures commercial intent immediately), then the LLM-prompts post (fastest-growing search behavior in 2026), then the conversion-problems cluster (highest-intent, lowest competition), then migration/docs, then the reference post last.
3. Once written, add the mandatory pillar↔spoke links to `app/html-to-markdown/page.tsx`'s "Related Tools" / supporting-copy sections.
4. Cross-link Cluster 5's post to the sibling cluster's `/blog/markdown-vs-html` once that post exists — don't duplicate it here.
5. Regenerate the map after each post ships: `/seo cluster map`.
