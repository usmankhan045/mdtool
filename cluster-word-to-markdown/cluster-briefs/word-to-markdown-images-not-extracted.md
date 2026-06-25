# Brief: Why Images Disappear When You Convert Word to Markdown

**Cluster:** Conversion Problems & Fixes (cluster-0-post-0)
**Primary keyword:** word to markdown images not extracted
**Secondary keywords:** docx to markdown missing images, mammoth.js images word, word document images not showing in markdown, pandoc --extract-media
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/word-to-markdown-images-not-extracted`

## Meta Description
When you convert a Word document to Markdown, images go missing. Here's exactly why it happens, what the two main tools do differently, and your options for getting images into your Markdown output.

## Outline
- H1: Why Images Disappear When You Convert Word to Markdown
- H2: The short answer: .docx files don't store images as regular files
  - H3: How Word actually embeds images (the word/media/ folder inside the ZIP)
  - H3: Why the converter sees them but can't output them as paths
- H2: What mammoth.js (and MDTool) does with embedded images
  - H3: What gets converted vs. what gets silently skipped
  - H3: The honest disclosure: MDTool drops images for now
- H2: What Pandoc does differently — and where it still falls short
  - H3: The --extract-media flag: what it does and how to use it
  - H3: The caption bug: images with Word-style captions are silently skipped (jgm/pandoc#11412)
- H2: Your options depending on how many images you have
  - H3: Option A — Re-add images manually after converting text (best for 1-5 images)
  - H3: Option B — Use Pandoc with --extract-media for image-heavy documents
  - H3: Option C — Export from Word as HTML first, then convert the HTML
- H2: Preventing the problem: Word document hygiene before conversion

## Key points to cover
- Be concrete about the DOCX ZIP structure: a .docx is a ZIP archive; images live at word/media/image1.png, image2.jpeg, etc. The converter reads the XML markup but, depending on the library, may not extract the media folder at all.
- Mammoth.js (the library MDTool is built on) does expose an `options.convertImage` callback that can base64-encode images inline — MDTool does not currently use it. Be honest. The FAQ on the tool page already says this. Expand it here into a real explanation rather than a dismissal.
- Pandoc's `--extract-media=./images` flag does extract and reference images — but Pandoc fails silently on images with Word-style captions (confirmed GitHub issue jgm/pandoc#11412). Note this precisely so readers don't waste time debugging a Pandoc bug.
- The HTML export workaround is underrated: Word's "Save as HTML" bundles images in a folder that can then be fed to an HTML-to-Markdown converter with image references preserved.
- Do not over-recommend third-party paid tools. Frame objectively: for most people with a text-heavy document, re-adding 2-3 images by hand is faster than the Pandoc CLI setup.

## Internal links to include
- → Pillar `/word-to-markdown` — anchor: "word to markdown converter" (mandatory)
- → `/blog/word-to-markdown-table-not-converting` — anchor: "tables not converting cleanly" (in-cluster, recommended)
- → `/blog/word-to-markdown-formatting-lost` — anchor: "formatting lost during conversion" (in-cluster, recommended)

## Competing pages to differentiate from
- codegenes.net covers the Pandoc --extract-media flag precisely but doesn't explain the mammoth.js/browser-converter limitation at all — this post should cover both code paths.
- blog.markdowntools.com has a general guide but glosses over the silent-skip-on-captioned-images Pandoc bug — naming the GitHub issue number builds credibility.
- Avoid the common pattern of listing paid SaaS tools as the primary solution — readers came here because a browser tool didn't work, and most have 2-5 images that don't warrant a paid subscription.
