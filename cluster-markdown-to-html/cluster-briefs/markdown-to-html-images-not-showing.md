# Brief: Why Markdown Images Don't Show Up After Converting to HTML

**Cluster:** Conversion Problems & Fixes (cluster-0-post-2)
**Primary keyword:** markdown to html images not showing
**Secondary keywords:** markdown image broken link html, relative image path html export, img src not working markdown
**Template:** how-to
**Target word count:** ~1,250
**URL:** `/blog/markdown-to-html-images-not-showing`

## Meta Description
Your HTML loads fine but the images show broken-link icons? It's almost always a relative-path problem. Here's why it happens and three ways to fix it.

## Outline
- H1: Why Markdown Images Don't Show Up After Converting to HTML
- H2: The core issue — relative paths only resolve where the original file lived
  - H3: `![diagram](./images/diagram.png)` works in your editor, breaks once moved
- H2: Other causes
  - H3: Pasting the snippet into a CMS that strips or rewrites `<img>` tags
  - H3: Hotlinked / CORS-blocked remote images
- H2: How to fix each case (with before/after HTML)
- H2: Best practice — absolute URLs or uploaded media for anything you'll publish
- H2: Checklist before you export

## Key points to cover
- Lead with the relative-path explanation since it's the dominant cause: a Markdown file's image path is relative to the file's own location, and once the generated HTML is hosted somewhere else (a CMS, a different folder, a different domain) that path no longer points anywhere.
- Cover the CMS-paste case specifically, since this links naturally to the WordPress/CMS workflow post in cluster 3 — many readers hitting this error are mid-way through pasting a snippet into WordPress.
- Note that devmark's "Full document" export keeps `<img>` tags exactly as written from the Markdown source — it doesn't rewrite or host images, so the fix is on the path, not the tool.

## Internal links to include
- → Pillar `/markdown-to-html` — anchor: "markdown to html converter" (mandatory)
- → `/blog/markdown-to-html-table-not-rendering` — anchor: "tables not rendering" (in-cluster, recommended)
- → `/blog/markdown-to-html-code-blocks-not-highlighting` — anchor: "code blocks not highlighting" (in-cluster, recommended)
- → `/blog/markdown-to-html-wordpress-cms` — anchor: "convert markdown to html for wordpress" (cross-cluster, optional)

## Competing pages to differentiate from
- General Markdown syntax guides — show correct image syntax but don't troubleshoot post-conversion breakage at all.
- CMS-specific help docs (e.g. WordPress media library docs) — solve the symptom for one platform, not the general relative-path root cause that applies everywhere.
