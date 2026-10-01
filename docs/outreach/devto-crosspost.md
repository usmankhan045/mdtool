# Cross-posting plan: dev.to + Hashnode (with canonical URLs)

## ⚠️ Blocker: the three source posts don't exist yet

Checked 2026-10-01. All three return **404** on mdtool.dev and are not in `content/blog/`:
- https://www.mdtool.dev/blog/markdown-to-google-docs
- https://www.mdtool.dev/blog/markdown-to-pdf-python-pandoc
- https://www.mdtool.dev/blog/markdown-in-vscode

**Publish each one on mdtool.dev first** and wait until it is **indexed** (GSC URL Inspection shows "URL is on Google", and Bing Webmaster shows it as indexed). Only then cross-post. If the copy goes live first, Google may treat dev.to as the original despite the canonical tag. The front matter below assumes those exact slugs; change it if you pick different ones.

## How canonicals work on each platform (verified)

- **dev.to:** the editor supports Jekyll-style front matter with `title`, `published`, `description`, `tags` (**max 4**, comma-separated; dev.to tags are lowercase alphanumeric with no hyphens), `canonical_url`, `cover_image` (1000 × 420 works best) and `series`. Source: https://dev.to/p/editor_guide. With `canonical_url` set, dev.to outputs `<link rel="canonical">` pointing to mdtool.dev.
- **Hashnode:** in the web editor, open the post's settings (the draft settings panel) and fill **"Original article URL"** (the "are you republishing?" option). Hashnode then outputs the canonical (the API field is `originalArticleURL`). If you publish from GitHub with Hashnode's GitHub-source action, the front matter key is `canonical` (alias `canonicalUrl`). Source: https://github.com/Hashnode/Hashnode-source-from-github-template.

## Rules for every cross-post

1. Republish the **full** article. Don't truncate it with "read more on my site"; dev.to readers dislike that and it gets fewer reactions.
2. Change the intro (2-3 sentences written for the dev.to or Hashnode audience). Keep the body the same so the canonical makes sense.
3. Keep **1-2 contextual links** in the body to the matching MDTool tool page (for example `/markdown-to-word`). These are your actual backlinks. Don't stuff more.
4. End with a one-line disclosure: *"I build MDTool, the free browser converter used in this post."*
5. Use **absolute** image URLs (`https://www.mdtool.dev/...`), or upload images to the platform. Relative paths break.
6. Space them out: one cross-post per week, dev.to first, then Hashnode 1-2 days later.
7. Reply to every comment for the first 48 hours. Comments drive dev.to's feed ranking.
8. Create a dev.to **series** "Markdown to anything" so the three posts link to each other.

---

## Post 1: Markdown to Google Docs

**Source:** https://www.mdtool.dev/blog/markdown-to-google-docs
**Angle for dev.to:** "Google Docs can import Markdown now, but headings and tables still go wrong. Here's what actually works."

### dev.to front matter
```yaml
---
title: "How to Convert Markdown to Google Docs (and Keep Your Headings)"
published: false
description: "Three ways to get Markdown into Google Docs with real headings, tables and code formatting intact, from the built-in import to a .docx round trip."
tags: markdown, productivity, googledocs, writing
canonical_url: https://www.mdtool.dev/blog/markdown-to-google-docs
cover_image: https://www.mdtool.dev/og/markdown-to-google-docs.png
series: Markdown to anything
---
```

### Hashnode settings
```yaml
---
title: "How to Convert Markdown to Google Docs (and Keep Your Headings)"
slug: markdown-to-google-docs
tags: markdown, productivity, google-docs, writing
cover: https://www.mdtool.dev/og/markdown-to-google-docs.png
canonical: https://www.mdtool.dev/blog/markdown-to-google-docs
seoDescription: "Three ways to get Markdown into Google Docs with real headings, tables and code formatting intact."
enableToc: true
---
```
(In the web editor, paste the canonical into **"Original article URL"** instead.)

**In-body link:** "…export a .docx with real Heading styles ([free browser converter](https://www.mdtool.dev/markdown-to-word)) and open it with Google Docs…"

---

## Post 2: Markdown to PDF with Python and Pandoc

**Source:** https://www.mdtool.dev/blog/markdown-to-pdf-python-pandoc
**Angle for dev.to:** a code-first tutorial (`pypandoc`, `subprocess`, xelatex fonts, a batch script). This is the most "dev.to-native" of the three, so publish it first.

### dev.to front matter
```yaml
---
title: "Convert Markdown to PDF with Python and Pandoc (Fonts, Code Blocks, Batch Scripts)"
published: false
description: "A practical guide to scripting Markdown to PDF with pypandoc: picking a PDF engine, fixing Unicode and font errors, syntax highlighting, and converting a whole folder."
tags: python, markdown, pdf, tutorial
canonical_url: https://www.mdtool.dev/blog/markdown-to-pdf-python-pandoc
cover_image: https://www.mdtool.dev/og/markdown-to-pdf-python-pandoc.png
series: Markdown to anything
---
```

### Hashnode settings
```yaml
---
title: "Convert Markdown to PDF with Python and Pandoc (Fonts, Code Blocks, Batch Scripts)"
slug: markdown-to-pdf-python-pandoc
tags: python, markdown, pdf, pandoc, tutorial
cover: https://www.mdtool.dev/og/markdown-to-pdf-python-pandoc.png
canonical: https://www.mdtool.dev/blog/markdown-to-pdf-python-pandoc
seoDescription: "Script Markdown to PDF with pypandoc: PDF engines, Unicode fonts, syntax highlighting, and batch conversion."
enableToc: true
---
```

**In-body link:** in the "when you don't want to install LaTeX" section, add "…or for a one-off file, a [client-side Markdown to PDF converter](https://www.mdtool.dev/markdown-to-pdf) renders Mermaid and code without any install."

---

## Post 3: Markdown in VS Code

**Source:** https://www.mdtool.dev/blog/markdown-in-vscode
**Angle for dev.to:** "VS Code is already a great Markdown editor: preview, extensions, and how to export to PDF or Word without leaving your workflow."

### dev.to front matter
```yaml
---
title: "Markdown in VS Code: Preview, Extensions, and Exporting to PDF or Word"
published: false
description: "Set up VS Code as a Markdown editor: built-in preview, the extensions worth installing, linting, and the cleanest ways to export to PDF and Word."
tags: vscode, markdown, productivity, beginners
canonical_url: https://www.mdtool.dev/blog/markdown-in-vscode
cover_image: https://www.mdtool.dev/og/markdown-in-vscode.png
series: Markdown to anything
---
```

### Hashnode settings
```yaml
---
title: "Markdown in VS Code: Preview, Extensions, and Exporting to PDF or Word"
slug: markdown-in-vscode
tags: vscode, markdown, productivity, beginners
cover: https://www.mdtool.dev/og/markdown-in-vscode.png
canonical: https://www.mdtool.dev/blog/markdown-in-vscode
seoDescription: "Use VS Code as a Markdown editor: preview, extensions, linting, and exporting to PDF and Word."
enableToc: true
---
```

**In-body link:** "…for Word output with real heading styles, paste the file into a [Markdown to Word converter](https://www.mdtool.dev/markdown-to-word)…"

---

## Notes
- The `cover_image` / `cover` URLs above are **placeholders**. Create the OG images (1000 × 420 for dev.to; Hashnode accepts 1600 × 840) and update the paths, or drop the field.
- Leave `published: false` on dev.to until you have previewed the post. Then switch to `true`.
- After each cross-post goes live, open its page source and confirm the `<link rel="canonical" href="https://www.mdtool.dev/blog/...">` tag is present.
- Optional third platform: Medium's "Import a story" sets the canonical automatically. Lower value than dev.to and Hashnode for a developer tool.
