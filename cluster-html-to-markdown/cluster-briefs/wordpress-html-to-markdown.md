# Brief: How to Export WordPress Posts to Markdown Without a Plugin

**Cluster:** Migration & Docs Workflows (cluster-3-post-2)
**Primary keyword:** wordpress html to markdown
**Secondary keywords:** wordpress export to markdown no plugin, migrate wordpress to markdown static site, wordpress post html to md
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/wordpress-html-to-markdown`

## Meta Description
Migrating a WordPress post to a Markdown-based static site (Hugo, Astro, 11ty)? You don't need an export plugin for a handful of posts — view source, paste, convert. Here's the workflow.

## Outline
- H1: How to Export WordPress Posts to Markdown Without a Plugin
- H2: When the no-plugin path makes sense (and when it doesn't)
  - H3: A handful of posts → view-source-and-paste
  - H3: An entire site with hundreds of posts, media, and metadata → use a dedicated migration plugin
- H2: Step-by-step: from a published post to clean Markdown
  - H3: Getting just the post content HTML (not the whole page chrome)
  - H3: Converting and what WordPress-specific blocks become
- H2: What Gutenberg block markup looks like after conversion (and what's lost)
- H2: Rebuilding front matter (title, date, slug) for your static site generator

## Key points to cover
- Be specific about where to find just the post content in WordPress's rendered HTML (typically inside an `<article>` or `.entry-content` div) vs. the full page including header/nav/sidebar/footer — converting the whole page produces a mess; converting just the content div produces something close to ready-to-use Markdown.
- Cover what Gutenberg blocks become realistically: paragraphs, headings, lists, images, and code blocks convert cleanly since they render as standard HTML; custom blocks (galleries, embeds, columns layouts) often don't have a Markdown equivalent and need manual rebuilding — say this plainly rather than implying full Gutenberg fidelity.
- Give a concrete front-matter template (title, date, slug, tags) a reader needs to add manually after conversion, since the converter only outputs body Markdown, not the YAML front matter a static site generator expects.
- Set the honest scope boundary up front: this is for migrating a few posts by hand, not an automated bulk migration — point toward a dedicated plugin (e.g. an XML-export-to-Markdown tool) for that case.

## Internal links to include
- → Pillar `/html-to-markdown` — anchor: "html to markdown converter" (mandatory)
- → `/blog/confluence-page-to-markdown` — anchor: "confluence page to markdown" (in-cluster, recommended)
- → `/blog/html-email-to-markdown` — anchor: "html email to markdown" (in-cluster, recommended)

## Competing pages to differentiate from
- WordPress export/migration plugin marketing pages — assume you want to migrate the entire site via their plugin, not a manual one-post-at-a-time workflow.
- Static-site-generator migration guides (Hugo/Astro docs) — cover the destination format and tooling, not the actual HTML-to-Markdown conversion step itself.
