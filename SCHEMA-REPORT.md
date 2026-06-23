# Schema Markup Report — www.mdtool.dev/markdown-to-pdf

**Analyzed:** 2026-06-23
**Canonical target:** https://www.mdtool.dev/markdown-to-pdf (page correctly self-canonicalizes to prod domain from the beta deployment)

## Detection Summary

Format found: **JSON-LD only** (no Microdata, no RDFa) — correct, matches Google's preferred format.

| # | Schema Type | Location | JSON Valid |
|---|---|---|---|
| 1 | `WebApplication` | `<head>`/post-header script | ✅ |
| 2 | `FAQPage` | Below main content | ✅ |

(A third `application/ld+json` string match in source is Next.js's RSC flight-data payload duplicating block 2 for hydration — not a separate schema block, no action needed.)

## Validation Results

| Schema | Type | Status | Issues |
|--------|------|--------|--------|
| WebApplication | Active | ⚠️ | Valid but incomplete — missing `aggregateRating`/`review` (blocks the star-rating rich result), missing `image`/`screenshot`. `description` is generic sitewide copy ("...Markdown to PDF converter and more"), not specific to this tool — weakens entity clarity for this exact page. |
| FAQPage | No rich result (retired May 7, 2026) | ℹ️ Info | Structurally valid, all 8 Q&As well-formed (`Question` → `acceptedAnswer` → `Answer.text`). No SERP benefit anymore, but **keep it** — it remains useful for AI Mode / AI Overviews / LLM citation of these Q&As. Do not remove, do not expect a Google rich result from it. |

No deprecated types in use. No HowTo markup despite the page describing a 4-step process — correctly avoided (HowTo rich results were removed Sept 2023).

## Missing Schema Opportunities

| Gap | Severity | Why it matters |
|---|---|---|
| **No sitewide `Organization`/`WebSite` schema** | High | Homepage (`/`) has **zero** JSON-LD. There's no entity establishing "DevMark" as a brand (name, logo, sameAs) anywhere on the site. This weakens entity recognition for Google Knowledge Graph and AI citation tools, and there's nothing tying the per-tool pages back to a parent brand. |
| **No `BreadcrumbList`** | Medium | Site has a real hierarchy (Home → tool pages: `/markdown-to-pdf`, `/markdown-to-html`, `/blog`) but no breadcrumb markup or visible breadcrumb trail exists anywhere in the HTML. Breadcrumbs help both rich-result display and crawler/AI understanding of site structure. |
| **No `aggregateRating`/`Review` on WebApplication** | Medium | Without this, the SoftwareApplication-family rich result (stars + price in search) cannot render even though `offers` and `applicationCategory` are present. Only add this with real, verifiable rating data — do not fabricate. |
| **No `image`/`screenshot` on WebApplication** | Low | Recommended property for the software app rich card; a screenshot of the converter UI would qualify. |

## Recommendations (priority order)

1. **High — Add `Organization` schema sitewide** (e.g., in root layout so it appears on every page including `/markdown-to-pdf`). See `generated-schema.json` for ready JSON-LD — fill in real logo/sameAs URLs before shipping.
2. **Medium — Add `BreadcrumbList`** to `/markdown-to-pdf` (Home → Markdown to PDF). See `generated-schema.json`.
3. **Medium — Tighten the `description` field** in the existing `WebApplication` block to be specific to this tool rather than reused sitewide marketing copy (e.g. reuse the page's own meta description: "Convert Markdown to PDF instantly in your browser. Supports GitHub Flavored Markdown, code blocks with syntax highlighting, tables, images, and Mermaid diagrams.").
4. **Low — Add `aggregateRating` only once real review/rating data exists.** Do not fabricate to unlock the rich result.
5. **Info — Leave `FAQPage` in place.** No Google SERP benefit since May 7, 2026, but retain for AI/LLM citation value of the 8 Q&A pairs.

How to verify each fix landed: re-run `/seo schema https://www.mdtool.dev/markdown-to-pdf` after deploy, or paste the URL into Google's Rich Results Test — `Organization` and `BreadcrumbList` should both report as detected with no errors.
