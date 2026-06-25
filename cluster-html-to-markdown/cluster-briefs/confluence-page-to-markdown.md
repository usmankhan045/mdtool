# Brief: How to Convert a Confluence Page to Markdown (No Plugin Required)

**Cluster:** Migration & Docs Workflows (cluster-3-post-0)
**Primary keyword:** confluence page to markdown
**Secondary keywords:** export confluence page to markdown without plugin, confluence html export to md, confluence space to markdown
**Template:** how-to
**Target word count:** ~1,400
**URL:** `/blog/confluence-page-to-markdown`

## Meta Description
You don't need a Marketplace app or API access to get a single Confluence page into Markdown. Export it as HTML and convert that — here's the exact steps.

## Outline
- H1: How to Convert a Confluence Page to Markdown (No Plugin Required)
- H2: When you don't need a Marketplace app or the Atlassian API
  - H3: Single page or a handful of pages → this method
  - H3: Entire space with hierarchy, attachments, child pages → use a dedicated exporter instead
- H2: Step-by-step: Confluence → HTML export → Markdown
  - H3: Exporting a page as HTML/PDF from Confluence's own export menu
  - H3: Pasting or uploading the HTML into devmark
  - H3: What Confluence's macros (info panels, expand blocks, status labels) convert to — and what gets dropped
- H2: Cleaning up after conversion (Confluence-specific quirks)
- H2: When to reach for a dedicated tool instead

## Key points to cover
- Be precise about Confluence's own export path (three-dot menu → Export → HTML or PDF, or per-page "Export to Markdown" if the org has a Marketplace app installed) so the steps are followable without guessing at menu names.
- Walk through what Confluence-specific macros become after HTML export and conversion: headings, paragraphs, tables, code blocks with language survive; info/warning/note panels and expand blocks typically collapse to a plain blockquote or get dropped, since Markdown has no native equivalent — say so honestly rather than implying perfect fidelity.
- Give the explicit decision point: this paste/upload method is for one page or a few; bulk-exporting an entire space with child-page hierarchy and attachments intact needs a dedicated exporter (confluence-markdown-exporter or a Marketplace app), which this post should name and link to rather than pretend doesn't exist.
- Note the privacy angle naturally if relevant: a paste-based converter processing the export locally fits the "internal docs, don't want to upload to a third party" instinct many Confluence admins have — link to `/blog/html-to-markdown-no-upload-privacy`.

## Internal links to include
- → Pillar `/html-to-markdown` — anchor: "html to markdown converter" (mandatory)
- → `/blog/html-email-to-markdown` — anchor: "html email to markdown" (in-cluster, recommended)
- → `/blog/wordpress-html-to-markdown` — anchor: "wordpress html to markdown" (in-cluster, recommended)
- → `/blog/html-elements-to-markdown-mapping` — anchor: "html elements to markdown mapping" (cross-cluster, optional)

## Competing pages to differentiate from
- confluence-markdown-exporter (GitHub) and Marketplace apps — built for bulk/whole-space export via API access; overkill and requires setup for someone who just wants one page converted right now.
- Atlassian Community forum threads — fragmented Q&A, no single authoritative step-by-step for the no-plugin path.
