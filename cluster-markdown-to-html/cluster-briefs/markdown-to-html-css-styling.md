# Brief: How to Style HTML Generated From Markdown (A CSS Guide)

**Cluster:** Markdown & HTML Fundamentals (cluster-3-post-1)
**Primary keyword:** markdown to html css styling
**Secondary keywords:** style markdown output css, github-markdown-css, markdown html theme
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/markdown-to-html-css-styling`

## Meta Description
Converted HTML always looks plain until you style it. Here's how to add CSS to Markdown-generated HTML — from a one-line stylesheet link to full custom theming.

## Outline
- H1: How to Style HTML Generated From Markdown (A CSS Guide)
- H2: Why the raw output looks plain (Markdown has no styling concept — HTML does)
- H2: Fastest option: drop in a pre-made stylesheet
  - H3: github-markdown-css (matches GitHub's rendering)
  - H3: Other ready-made themes (markdown-styles, markdowncss.github.io)
- H2: Styling specific elements: headings, code blocks, tables, blockquotes
- H2: Where to put the CSS — snippet (inherits host page styles) vs. full document (needs its own `<style>` or `<link>`)
- H2: A minimal custom stylesheet you can copy

## Key points to cover
- Open with the core fact: Markdown carries no style information at all — every visual choice (heading size, code block background, table borders) comes entirely from CSS applied to the resulting HTML, which is why raw output always looks unstyled.
- Cover `github-markdown-css` as the most common "I just want it to look like GitHub" answer, with the one-line CDN link.
- Tie directly back to devmark's snippet-vs-full-document choice from the pillar page: a snippet inherits whatever CSS the host page already has (good for CMS pasting), while a full document needs its own stylesheet linked or embedded — give a copy-pasteable example for each case.
- Include a genuinely useful minimal custom CSS block (headings, code, table borders, blockquote) so the post has real standalone utility, not just links to other people's stylesheets.

## Internal links to include
- → Pillar `/markdown-to-html` — anchor: "markdown to html converter" (mandatory)
- → `/blog/markdown-vs-html` — anchor: "markdown vs html" (in-cluster, recommended)
- → `/blog/semantic-html-from-markdown` — anchor: "semantic html from markdown" (in-cluster, recommended)

## Competing pages to differentiate from
- github-markdown-css's own README — documents the stylesheet itself but doesn't explain the broader "why does my converted HTML look plain" context or cover the snippet/full-document distinction at all.
- w3schools.io's brief CSS-in-Markdown page — thin, generic, doesn't address converter-specific output (class names from highlight.js, table markup, etc.).
