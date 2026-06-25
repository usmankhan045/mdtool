# Brief: Why Nested Lists Get Flattened When You Convert HTML to Markdown

**Cluster:** Conversion Problems & Fixes (cluster-0-post-2)
**Primary keyword:** html to markdown nested list indent
**Secondary keywords:** nested ul li markdown conversion, markdown list indentation wrong, html list to markdown sublist
**Template:** how-to
**Target word count:** ~1,200
**URL:** `/blog/html-to-markdown-nested-list-indent`

## Meta Description
Nested `<ul>`/`<ol>` lists coming out of an HTML-to-Markdown conversion as one flat list, or indented inconsistently? Here's why indentation breaks and how CommonMark actually expects sublists to be marked up.

## Outline
- H1: Why Nested Lists Get Flattened When You Convert HTML to Markdown
- H2: How CommonMark actually represents a sublist (it's whitespace, not a tag)
- H2: Where conversion goes wrong
  - H3: Inconsistent indent width (2 vs. 3 vs. 4 spaces) across renderers
  - H3: A `<ul>` nested directly inside a `<li>` with no wrapping `<p>` — list-tightness edge cases
  - H3: Mixed `<ul>`/`<ol>` nesting losing the parent's marker style
- H2: How to verify your output is actually correct (it might just render differently)
- H2: Fixing it manually when the converter gets it wrong
- H2: Checklist before you publish

## Key points to cover
- Explain the core mechanic: Markdown has no nesting tag — a sublist is just a list whose marker line is indented relative to its parent item's text start. Different renderers (GitHub, CommonMark reference, some static-site generators) historically disagreed on exactly how many spaces count, which is why the same Markdown can look "flattened" in one renderer and correctly nested in another — sometimes the conversion is fine and the renderer is the variable.
- Cover the real conversion bug case: a `<ul>` placed directly inside a `<li>` with no surrounding paragraph — some converters mis-handle the indent level here and emit the sublist at the same indent as its parent, producing a visually flat list.
- Give a concrete fix: when in doubt, indent sublist items by 4 spaces (most reliable across renderers) and verify by pasting into GitHub's own Markdown preview before treating it as a converter bug.

## Internal links to include
- → Pillar `/html-to-markdown` — anchor: "html to markdown converter" (mandatory)
- → `/blog/html-table-to-markdown-not-working` — anchor: "html table to markdown not working" (in-cluster, recommended)
- → `/blog/html-to-markdown-encoding-garbled-characters` — anchor: "encoding garbled characters" (in-cluster, recommended)

## Competing pages to differentiate from
- Markdown Guide's basic-syntax page — explains how to write a nested list by hand, not what happens when a converter's indent logic disagrees with your renderer.
- Stack Overflow threads on the topic — fragmented across renderer-specific complaints, no single page explains the whitespace mechanic clearly for a non-developer audience.
