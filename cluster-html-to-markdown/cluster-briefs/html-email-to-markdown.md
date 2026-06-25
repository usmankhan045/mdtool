# Brief: How to Convert an HTML Email to Markdown

**Cluster:** Migration & Docs Workflows (cluster-3-post-1)
**Primary keyword:** html email to markdown
**Secondary keywords:** convert outlook email to markdown, gmail html to markdown, email table layout to markdown
**Template:** how-to
**Target word count:** ~1,200
**URL:** `/blog/html-email-to-markdown`

## Meta Description
HTML emails are built from deeply nested tables and inline styles for client compatibility — which makes them messier to convert than a normal web page. Here's how to get a clean Markdown version anyway.

## Outline
- H1: How to Convert an HTML Email to Markdown
- H2: Why HTML email is uglier markup than a regular web page
  - H3: Table-based layout instead of CSS layout (for email client compatibility)
  - H3: Inline styles on every element instead of a stylesheet
- H2: How to get the raw HTML out of Gmail/Outlook
- H2: What survives conversion and what doesn't
- H2: When to convert the whole email vs. just extract the text you need

## Key points to cover
- Explain plainly why email HTML looks worse under the hood than a normal webpage: email clients have historically had inconsistent CSS support, so the entire industry standardized on table-based layout and inline `style` attributes as the only reliably-rendering approach — meaning a converter sees a wall of layout tables that have nothing to do with the email's actual visible content.
- Give the practical extraction steps per client: Gmail's "Show original" (View Original Message) and Outlook's "View Source" / saving as .htm, since most readers won't know where to find the raw HTML.
- Be honest about the result: layout tables used purely for spacing will often convert to spurious empty Markdown tables or extra blank lines — note this as an expected side effect rather than a converter bug, and suggest a quick manual cleanup pass for short emails.
- Cover the realistic use case driving this search: pulling a newsletter or a forwarded HTML email into Markdown notes, not converting bulk email archives (that's a different, larger job).

## Internal links to include
- → Pillar `/html-to-markdown` — anchor: "html to markdown converter" (mandatory)
- → `/blog/confluence-page-to-markdown` — anchor: "confluence page to markdown" (in-cluster, recommended)
- → `/blog/wordpress-html-to-markdown` — anchor: "wordpress html to markdown" (in-cluster, recommended)

## Competing pages to differentiate from
- Markdown Here / Unmarkdown — solve the opposite direction (composing email *from* Markdown), not extracting Markdown from a received HTML email.
- file2markdown.ai's blog post — covers the same topic but as a vehicle for promoting its own paid converter rather than explaining the table-layout/inline-style root cause.
