# GEO Analysis: devmark-beta.vercel.app/markdown-to-pdf

**Audited:** 2026-06-23
**Page:** Free Markdown to PDF Converter (tool page)

## 1. GEO Readiness Score: 47/100

| Category | Score | Weight |
|---|---|---|
| Citability | 14/25 | 25% |
| Structural Readability | 14/20 | 20% |
| Multi-Modal Content | 5/15 | 15% |
| Authority & Brand Signals | 4/20 | 20% |
| Technical Accessibility | 10/20 | 20% |

## 2. Platform Breakdown

| Platform | Outlook | Why |
|---|---|---|
| Google AI Overviews | Low | Inherits classic-SEO ranking signal, which is currently undermined by the canonical/domain mismatch (see Critical finding below). |
| Google AI Mode | Low-Medium | Broader pool, rewards freshness/entity authority — content is ~3.5 months old and has no entity signals. |
| ChatGPT | Low | No Wikipedia/Reddit/LinkedIn presence detected for "DevMark." |
| Perplexity | Low | No Reddit/community discussion presence detected. |

## 3. Critical Finding: Canonical Domain Does Not Resolve

The canonical tag, Open Graph URLs, JSON-LD `url` field, and **every URL in
sitemap.xml** point to `https://devmark.tools`. That domain returns **NXDOMAIN**
— it does not exist yet:

```
$ host devmark.tools
Host devmark.tools not found: 3(NXDOMAIN)
```

Effect: any AI crawler or search engine that follows the canonical/schema
URL hits a dead domain. The live, working content sits at
`devmark-beta.vercel.app`, which the page itself tells crawlers to ignore
in favor of citing/indexing a non-existent host. This blocks indexing and
AI citation regardless of how well-optimized the on-page content is —
**fix this before investing further in content-level GEO work.**

Fix: either (a) finish DNS/domain setup for `devmark.tools` before treating
this build as production-ready, or (b) point canonical/OG/schema/sitemap at
the working `devmark-beta.vercel.app` host until the real domain is live.

## 4. AI Crawler Access Status

`robots.txt`:
```
User-Agent: *
Allow: /

Sitemap: https://devmark.tools/sitemap.xml
```

| Crawler | Status |
|---|---|
| GPTBot | 200 (allowed) |
| ClaudeBot | 200 (allowed) |
| PerplexityBot | 200 (allowed) |

Blanket `Allow: /` — no AI crawler is blocked. Good baseline. Note the
`Sitemap:` directive itself points to the non-resolving `devmark.tools`
domain (same issue as above).

## 5. llms.txt Status

**Missing** (404 at `/llms.txt`). Per Google's primary-source guidance this
carries no citation-ranking weight, so it's not a priority fix, but a
lightweight file costs little:

```
# DevMark
> Free, client-side developer tools for Markdown, PDF, and HTML conversion.

## Tools
- [Markdown to PDF](https://devmark.tools/markdown-to-pdf): Convert Markdown to PDF in-browser, no upload, no login.
- [Markdown to HTML](https://devmark.tools/markdown-to-html): Convert Markdown to HTML in-browser.

## Guides
- [Best Markdown to PDF Converters](https://devmark.tools/blog/best-markdown-to-pdf-converter)
- [GitHub README to PDF Guide](https://devmark.tools/blog/github-readme-to-pdf)
```

## 6. Server-Side Rendering Check

Content shell (H1, intro, "How to Convert," FAQ, related links, footer) is
fully **server-side rendered** — good, this is what AI crawlers (no JS
execution) will see.

The interactive editor/preview widget correctly bails to client-side
rendering (`BAILOUT_TO_CLIENT_SIDE_RENDERING`) — expected and fine, since
it's an interactive tool, not citable prose.

**Issue found:** the FAQ accordion only renders the **answer text for the
currently-open panel** into the DOM. Verified by diffing the JSON-LD
`FAQPage` schema (8 Q&As) against the visible HTML (only 1 of 8 `<p>`
answer blocks present):

```
Total FAQ questions in JSON-LD: 8
Visible <p> answer blocks in rendered HTML: 1
```

The other 7 answers exist only inside the `FAQPage` JSON-LD script tag, not
in visible text. JSON-LD is still machine-readable, but Google's passage-
citability emphasis is on extractable visible text, and relying solely on
schema for 87% of your FAQ content is a fragile single point of failure.
**Fix:** keep all 8 answers in the DOM at all times (collapse visually with
CSS `max-height`/`hidden` attribute toggling rather than conditionally
unmounting them in React).

## 7. Passage-Level Citability

- Hero paragraph is 26 words — well short of the 134-167 word optimal
  citation block, and it's instructional/marketing copy ("no login, no
  watermark, no limits"), not a self-contained definition.
- No "Markdown to PDF conversion is..." style definition appears in the
  first 60 words anywhere on the page.
- The FAQ answers that ARE present are strong, quotable, specific facts
  (e.g., "syntax-highlighted using highlight.js, which supports over 190
  programming languages" is exactly the kind of citable data point AI
  engines pull) — this pattern should be extended/protected across all 8
  answers (see §6).

## 8. Authority & Brand Signals

- No author byline (acceptable for a utility tool page, but no
  Organization-level credibility signal either).
- No visible "last updated" date on the page itself. Sitemap `lastmod` is
  `2026-03-08` — **~3.5 months old** as of this audit (2026-06-23),
  already past the 3-month mark where citation likelihood starts dropping,
  heading toward the 6-month cliff where pages lose AI citation eligibility.
- No detected Wikipedia/Reddit/YouTube/LinkedIn presence for "DevMark."
- `WebApplication` and `FAQPage` JSON-LD are present (good foundation) but
  lack `datePublished`/`dateModified`, and there's no `Organization`
  schema with `sameAs` links to ground the brand as an entity.

## 9. Multi-Modal Content

None detected: no images, no screenshots of the 4 PDF themes (GitHub,
Academic, Minimal, Dark), no video, no infographic — despite the tool
itself supporting Mermaid diagrams, there's no visual example shown on the
page. Multi-modal content sees 156% higher AI selection rates per current
research; this is the single largest content gap.

## 10. Top 5 Highest-Impact Changes

1. **Fix the canonical/OG/schema/sitemap domain mismatch** — `devmark.tools`
   doesn't resolve. Nothing else matters for indexing/citation until this
   is fixed (point at the live host, or finish domain setup).
2. **Keep all 8 FAQ answers in the rendered DOM**, not just the open
   accordion panel — currently 7 of 8 only exist in JSON-LD.
3. **Add a 40-60 word definitional opener**: "Markdown to PDF conversion is
   the process of turning `.md` files into formatted PDF documents while
   preserving code blocks, tables, and Mermaid diagrams." Gives AI engines
   a directly quotable, self-contained answer.
4. **Add a visible last-updated date** and put this page on a refresh
   cadence — current content is already ~3.5 months stale against the
   3-month citation-decay window.
5. **Add at least one image** — a screenshot grid of the 4 PDF themes with
   descriptive alt text (e.g., "GitHub-theme PDF output with syntax-
   highlighted code block") — closes the multi-modal gap entirely absent
   today.

## 11. Schema Recommendations

- Keep existing `WebApplication` + `FAQPage` schema (FAQPage has no Google
  SERP rich-result benefit anymore per the May 2026 retirement, but is
  worth keeping for AI/LLM citation value — do not remove).
- Add `datePublished` / `dateModified` to `WebApplication` for recency
  signals.
- Add `Organization` schema with `sameAs` (GitHub, X/Twitter, etc. once
  those exist) to ground "DevMark" as a citable entity.
- Do not add `HowTo` schema for the "How to Convert" steps — deprecated
  since September 2023.

## 12. Content Reformatting Suggestions

- Rewrite the hero paragraph to lead with a definition, then the
  marketing hooks ("no login, no watermark") second.
- Rephrase "How to Convert Markdown to PDF" as a question-form heading
  ("How Do You Convert Markdown to PDF for Free?") to match query
  patterns AI Overviews/AI Mode tend to surface.
- Extend the specific-stat pattern from the highlight.js FAQ answer
  ("190 programming languages") across the other answers where a
  concrete number is available (e.g., file size limit, theme count).

---

## Top 5 Highest-Impact Changes (Quick Reference)

| # | Change | Effort | Impact |
|---|---|---|---|
| 1 | Fix canonical/OG/schema/sitemap domain (devmark.tools → live host) | Low | Critical (blocks indexing) |
| 2 | Render all 8 FAQ answers in DOM, not just open panel | Low | High |
| 3 | Add 40-60 word definitional opener | Low | High |
| 4 | Add visible last-updated date + refresh cadence | Low | Medium |
| 5 | Add theme screenshot(s) with alt text | Medium | Medium |

---

# GEO Analysis: 4-Page Audit — 2026-06-24

**Audited:** 2026-06-24
**Pages:** `/html-to-markdown` (tool), `/blog/html-to-markdown-cms-migration`, `/blog/html-to-markdown-github`, `/blog/clean-html-to-markdown` (3 new posts)

## Deployment Note — Important

The live site at `https://www.mdtool.dev` has **not yet picked up today's work**:

- `https://www.mdtool.dev/html-to-markdown` is live but serves the **pre-edit** version (old title "HTML to Markdown Converter — Free & No Login," old "How Ambiguous HTML Gets Resolved" section).
- All three new blog post URLs return **404** — they exist locally in `content/blog/` but haven't been built/deployed.

This audit scores the **local source** that will become these URLs once deployed, not the current live response. Re-run this audit post-deploy to confirm the scores hold against the actual served HTML.

## Sitewide Findings From the 2026-06-23 Audit — Status Check

| Finding (from §3–§11 above) | Status today |
|---|---|
| Critical: canonical/sitemap pointed at non-resolving `devmark.tools` | ✅ **Resolved.** `app/layout.tsx` `metadataBase`, `app/sitemap.ts`, and every page's `canonical` now consistently use `https://www.mdtool.dev`, which resolves and serves correctly. |
| FAQ accordion only rendered the open panel's answer into the DOM (7 of 8 answers existed only in JSON-LD) | ✅ **Resolved.** `components/seo/FaqSection.tsx` now maps over *all* items unconditionally and toggles visibility with a CSS `hidden` class (`display:none`), not conditional unmounting — every answer is present in the server-rendered HTML regardless of which accordion panel is open. Verified by reading the component source directly. |
| No sitewide `Organization` schema | ✅ **Resolved.** `app/layout.tsx` renders `<StructuredData type="organization" />` globally; includes `name`, `url`, `logo`, and one `sameAs` (GitHub). Only one `sameAs` link exists — add Twitter/X or LinkedIn if/when those accounts exist (Low priority, not a regression). |
| No `BreadcrumbList` anywhere | ✅ **Resolved on audited pages.** `/html-to-markdown` and all three new blog posts render `BreadcrumbList` schema. |
| `llms.txt` missing (404) | ✅ **Resolved.** `/llms.txt` is live, well-structured (Tools + Guides + "Notes for AI agents" sections), uses the correct `mdtool.dev` URLs throughout. **Gap:** it does not yet list any of today's 3 new posts or reflect the upgraded `/html-to-markdown` copy — expected, since none of that is deployed yet. Update it once these ship (see Top 5 below). |
| No visible last-updated date on `/markdown-to-pdf` | Not re-checked (out of scope today) — but `/html-to-markdown` now shows a visible "Updated June 24, 2026" string. |

## 1. GEO Readiness Scores

| Page | Score | Tier |
|---|---|---|
| `/html-to-markdown` | **77/100** | Strong |
| `/blog/html-to-markdown-github` | **67/100** | Acceptable |
| `/blog/html-to-markdown-cms-migration` | **63/100** | Acceptable |
| `/blog/clean-html-to-markdown` | **62/100** | Acceptable |

### `/html-to-markdown` breakdown

| Category | Score | Weight | Notes |
|---|---|---|---|
| Citability | 21/25 | 25% | Strong definitional opener ("HTML to Markdown conversion strips HTML down to..."), concrete Preserves/Strips tables, and the "Is It Free" section is ~130 words and fully self-contained — almost exactly the 134-167 word optimal citation length. |
| Structural Readability | 16/20 | 20% | Clean H1→H2→H3, 10-item FAQ in clear Q&A form, two data tables. Loses points because the H2/H3 section titles ("What to Know Before You Convert," "Is It Free") aren't phrased as questions, which is what AI Overview/AI Mode query-matching rewards most. |
| Multi-Modal Content | 9/15 | 15% | Has the `ConversionDiagram` SVG and the live converter itself (counts as an interactive tool), but no screenshots or video. |
| Authority & Brand Signals | 13/20 | 20% | Visible update date, cites primary technical sources (turndown, CommonMark, GFM spec), `Organization` schema with one `sameAs`. No named Person author/credentials, no Wikipedia/Reddit/YouTube presence for the brand. |
| Technical Accessibility | 18/20 | 20% | All text content is server-rendered (only the converter widget bails to client-side); `robots.txt` is blanket-allow; `llms.txt` lists this page (though with the old, thinner description — update once deployed). |

### Blog posts breakdown (all three share the same structural pattern)

| Category | Weight | CMS Migration | GitHub | Clean HTML | Why |
|---|---|---|---|---|---|
| Citability | 25% | 17/25 | 20/25 | 16/25 | The GitHub post scores highest because it cites a specific, verifiable, unique data point — GitHub's actual `html-pipeline` sanitization allowed-tag list — which is exactly the kind of citable fact AI engines pull. The other two are accurate and well-sourced but more qualitative/process-driven, with fewer standalone quotable facts. |
| Structural Readability | 20% | 15/20 | 15/20 | 15/20 | Clean H2 hierarchy, FAQ in Q&A form, short paragraphs. None use a comparison table or question-form headings — both are quick wins available on a future pass. |
| Multi-Modal Content | 15% | 3/15 | 3/15 | 3/15 | **Largest gap across all three.** No hero images exist yet (flagged at the time these were written — `public/blog/*.jpg` files were never generated), no diagrams, no video. This is the single biggest lever available for all three posts. |
| Authority & Brand Signals | 20% | 12/20 | 13/20 | 12/20 | `datePublished`/`dateModified` present and fresh (today's date), cites primary sources (turndown, CommonMark, GFM spec, GitHub's `html-pipeline`), but author is the generic `Organization`-type "MDTool Editorial Team" rather than a named Person with credentials — consistent with the rest of the site, not a regression, but a ceiling on the Authority score everywhere it applies. |
| Technical Accessibility | 20% | 16/20 | 16/20 | 16/20 | Rendered server-side via `MDXRemote` from `next-mdx-remote/rsc` (an RSC-compatible server component) — fully crawlable without JS execution. Not yet reflected in `/llms.txt` or live `sitemap.xml` because they aren't deployed; both will pick these up automatically post-deploy (`app/sitemap.ts` calls `getAllBlogPosts()` dynamically — no manual sitemap edit needed; `llms.txt` is a static file and *does* need a manual edit). |

## 2. Platform Breakdown (all 4 pages)

| Platform | Outlook | Why |
|---|---|---|
| Google AI Overviews | Medium | Ranking-correlated; these pages aren't live/indexed yet, so no current signal — content quality itself is solid once indexed. |
| Google AI Mode | Medium | Rewards freshness (all 4 pages are dated today) and entity authority (weak — no brand entity presence yet). |
| ChatGPT | Low-Medium | No Wikipedia/Reddit presence for "MDTool." The GitHub post's sourced, specific fact (sanitization tag list) is the kind of content ChatGPT's web search tends to surface when it does crawl. |
| Perplexity | Low | No Reddit/community discussion presence detected for the brand or these specific topics. |

## 3. AI Crawler Access Status

`robots.txt` (confirmed live):
```
User-Agent: *
Allow: /

Sitemap: https://www.mdtool.dev/sitemap.xml
```

Blanket `Allow: /` covers GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, and CCBot implicitly — no AI crawler is blocked. The sitemap directive correctly points at the live, resolving domain (last audit's issue is fixed). Optional, Low-priority refinement: add explicit per-crawler `User-Agent` blocks if you ever want to allow AI *search* crawlers while blocking AI *training* crawlers (e.g., block `CCBot` specifically) — not needed today since the blanket allow is intentional and working.

## 4. Top 5 Highest-Impact Changes

1. **Deploy today's work.** Nothing else on this list matters until `/html-to-markdown`'s edits and the 3 new posts are actually live — right now AI crawlers see either stale content or a 404.
2. **Generate the 3 missing hero images** (`public/blog/html-to-markdown-cms-migration.jpg`, `html-to-markdown-github.jpg`, `clean-html-to-markdown.jpg`) — this is the single largest, identical gap across all three new posts (Multi-Modal: 3/15 each).
3. **Update `/llms.txt`** to add an "HTML to Markdown" line under Tools (refresh the description to match the upgraded page) and 3 new entries under Guides for the new posts, once deployed.
4. **Rephrase section headings as questions** on `/html-to-markdown` (e.g., "Is It Free" → "Is MDTool's HTML to Markdown Converter Free?") and add at least one comparison table to each of the 3 blog posts — both are low-effort, structural-readability wins.
5. **Add a named author with credentials** (or at least a consistent "About the MDTool team" bio block linked from posts) instead of the generic "MDTool Editorial Team" Organization byline — raises the Authority ceiling across every piece of content on the site, not just these 4 pages.

## 5. Content Reformatting Suggestions

- `/html-to-markdown`: convert "What MDTool Preserves" / "What Gets Stripped" / "Is It Free" from statements to questions to better match AI Overview / AI Mode query patterns.
- `html-to-markdown-cms-migration.mdx` and `clean-html-to-markdown.mdx`: each has at least one place where a comparison table would out-perform the current bullet list (e.g., "What Converts Cleanly and What Does Not" → two-column table; "What Turndown Does to Clean It Up" → before/after table).
- `html-to-markdown-github.mdx`: already has the strongest single citable fact on the site (GitHub's allowed HTML tag list) — consider pulling it into its own short table (`Tag` | `Allowed?` | `Notes`) rather than a prose list, to make it even more directly extractable.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel — Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
