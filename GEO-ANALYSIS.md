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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel — Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
