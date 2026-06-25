# Brief: Which HTML Elements Convert to Which Markdown Syntax? A Complete Mapping

**Cluster:** Fundamentals & Reference (cluster-4-post-0)
**Primary keyword:** html elements to markdown syntax mapping
**Secondary keywords:** html tag markdown equivalent, what html converts to markdown, html to markdown cheat sheet
**Template:** explainer
**Target word count:** ~1,300
**URL:** `/blog/html-elements-to-markdown-mapping`

## Meta Description
A complete reference table mapping every common HTML element to its Markdown equivalent — and which ones (inline styles, spans, scripts) have no equivalent at all.

## Outline
- H1: Which HTML Elements Convert to Which Markdown Syntax? A Complete Mapping
- H2: Why this mapping isn't 1:1 — Markdown has ~15 constructs, HTML has 100+
- H2: Full reference table — element by element
  - H3: Text formatting (`<strong>`, `<em>`, `<del>`, `<code>`)
  - H3: Structure (`<h1>`–`<h6>`, `<p>`, `<blockquote>`, `<hr>`)
  - H3: Lists (`<ul>`, `<ol>`, `<li>`, nested lists)
  - H3: Tables (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`/`<th>`)
  - H3: Code (`<pre>`, `<code>`, language classes)
  - H3: Links and media (`<a>`, `<img>`)
  - H3: What has no Markdown equivalent (`<span>`, inline `style`, `<script>`, `<div>`, `colspan`/`rowspan`)
- H2: Edge cases worth knowing about
- H2: How to use this table when debugging a conversion

## Key points to cover
- Open with the honest framing already established elsewhere on the site: HTML-to-Markdown conversion is lossy by design, not a converter limitation — Markdown supports roughly 15 formatting constructs while HTML defines over 100 element types.
- Build the table as a genuine reference — element, Markdown output, and a one-line note on caveats (e.g. `<table>` → GFM pipe table, *unless nested or using colspan/rowspan, see `/blog/html-table-to-markdown-not-working`*) — so this post functions as the hub that the conversion-problem posts can link back into.
- Cover the "no equivalent, dropped" column honestly and completely: inline `style` attributes, `<span>` used purely for color/font, `<script>`/`<style>` tags, custom data attributes, and `<div>` used for layout rather than semantic structure.
- Tie the table directly to devmark's own conversion engine (turndown + GFM plugin) so the reference is concretely accurate to what the site's tool actually does, not generic/abstract.

## Internal links to include
- → Pillar `/html-to-markdown` — anchor: "html to markdown converter" (mandatory)
- → `/blog/html-table-to-markdown-not-working` — anchor: "html table to markdown not working" (cross-cluster, optional, inbound)
- → `/blog/confluence-page-to-markdown` — anchor: "confluence page to markdown" (cross-cluster, optional, inbound)
- → sibling cluster's `/blog/markdown-vs-html` — anchor: "markdown vs html" (cross-pillar reference; do not duplicate that post's content here)

## Competing pages to differentiate from
- Markdown Guide's basic-syntax page — documents Markdown syntax in isolation, doesn't map it back to the HTML element that would produce each construct.
- Individual converter library READMEs (Turndown, html-to-markdown) — document their own configuration options, not a vendor-neutral element-by-element reference a reader can use regardless of which tool they're using.
