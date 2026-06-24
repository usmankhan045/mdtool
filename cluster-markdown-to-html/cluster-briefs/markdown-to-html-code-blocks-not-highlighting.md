# Brief: Why Code Blocks Lose Syntax Highlighting When You Convert Markdown to HTML

**Cluster:** Conversion Problems & Fixes (cluster-0-post-0)
**Primary keyword:** markdown to html code blocks not highlighting
**Secondary keywords:** highlight.js not working markdown, fenced code block no color html, markdown code block plain text html
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/markdown-to-html-code-blocks-not-highlighting`

## Meta Description
Converted your Markdown to HTML and the code blocks came out as plain black-and-white text? Here's why syntax highlighting is missing and the two-line fix.

## Outline
- H1: Why Code Blocks Lose Syntax Highlighting When You Convert Markdown to HTML
- H2: The HTML is correct — the highlighting CSS is missing
  - H3: What highlight.js actually outputs (spans with class names, not colors)
  - H3: Why a "snippet" export looks plain but a "full document" export doesn't
- H2: Three ways to fix it
  - H3: Use the Full Document export (stylesheet is included automatically)
  - H3: Link a highlight.js theme stylesheet yourself when pasting a snippet into a CMS
  - H3: Make sure your fenced code block has a language identifier (` ```js ` not ` ``` `)
- H2: Common mistakes that look like highlighting bugs but aren't
- H2: Checklist before you publish

## Key points to cover
- Explain that syntax-highlighting libraries (highlight.js, Prism) don't inject colors inline — they add `class="language-js"` / `hljs-keyword` spans, and a separate CSS theme paints the colors. If you strip the `<head>` (i.e. you exported a snippet, not a full document) and your host page has no highlight.js theme loaded, the code renders in plain text. This is the single most common cause and is directly tied to devmark's own snippet-vs-full-document choice.
- Cover the missing-language-identifier case (```` ``` ```` with no language hint vs ` ```python `) — second most common cause, easy fix.
- Give a copy-pasteable CDN `<link>` for a highlight.js theme so snippet users can fix it in one line.

## Internal links to include
- → Pillar `/markdown-to-html` — anchor: "markdown to html converter" (mandatory)
- → `/blog/markdown-to-html-table-not-rendering` — anchor: "markdown to html table not rendering" (in-cluster, recommended)
- → `/blog/markdown-to-html-images-not-showing` — anchor: "images not showing in HTML output" (in-cluster, recommended)
- → `/blog/markdown-vs-html` — anchor: "code blocks not highlighting" (cross-cluster, optional)

## Competing pages to differentiate from
- GitHub Docs' code-highlighting page — covers GitHub's own renderer, not what happens when you export Markdown to a standalone HTML file.
- Markdown Monster / daily-dev-tips posts — explain the highlight.js setup for a single specific editor/tool, not the general "why is my exported HTML plain" failure mode any converter user can hit.
