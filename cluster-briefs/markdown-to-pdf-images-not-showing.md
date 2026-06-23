# Brief: Why Markdown Images Don't Show Up in PDF Exports

**Cluster:** Conversion Problems & Fixes (cluster-0-post-2)
**Primary keyword:** markdown to pdf images not showing
**Secondary keywords:** markdown image not rendering pdf, broken images markdown export, relative image paths markdown pdf
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/markdown-to-pdf-images-not-showing`

## Meta Description
Images vanishing or showing broken-link icons is one of the most common Markdown-to-PDF failures. Learn the three causes — relative paths, base64 size limits, and lazy-loading — and how to fix each.

## Outline
- H1: Why Markdown Images Don't Show Up in PDF Exports
- H2: The three causes of broken images
  - H3: Relative file paths that don't resolve outside your editor
  - H3: Remote images blocked by CORS or hotlink protection
  - H3: Base64-embedded images exceeding converter size limits
- H2: How to fix each case (with before/after examples)
- H2: How devmark handles image embedding differently
- H2: Checklist before you export

## Key points to cover
- Show a markdown snippet with a relative path (`![diagram](./images/diagram.png)`) and explain why client-side and CLI tools resolve it differently.
- Cover the CORS/hotlinking failure mode explicitly — this is the #1 cause for images pulled from other websites.
- Mention that devmark resolves images client-side from the same browser context, avoiding server-side fetch/CORS failures entirely — a genuine product differentiator, state it factually.

## Internal links to include
- → Pillar `/markdown-to-pdf` — anchor: "markdown to pdf converter" (mandatory)
- → `/blog/markdown-table-pdf` — anchor: "tables breaking in PDF" (in-cluster, recommended)
- → `/blog/markdown-to-pdf-mermaid-diagrams` — anchor: "mermaid diagrams in PDF" (in-cluster, recommended)

## Competing pages to differentiate from
- GitHub issue threads (e.g. yzane/vscode-markdown-pdf image bugs) — these explain the bug but don't give a working fix path for non-technical users.
- General "markdown to pdf" guides that don't address images at all — be the page that actually explains the *why*, not just "re-upload your image."
