# Brief: Why Manual Formatting Gets Lost When You Convert Word to Markdown

**Cluster:** Conversion Problems & Fixes (cluster-0-post-2)
**Primary keyword:** word formatting lost converting to markdown
**Secondary keywords:** word headings not converting markdown, word direct formatting markdown, mammoth word styles, word to markdown heading styles missing
**Template:** how-to
**Target word count:** ~1,250
**URL:** `/blog/word-to-markdown-formatting-lost`

## Meta Description
Bold text that was "made big" instead of styled as Heading 1 won't survive a Word-to-Markdown conversion. This post explains the named-style rule and how to fix a document before converting.

## Outline
- H1: Why Manual Formatting Gets Lost When You Convert Word to Markdown
- H2: The core issue: Word has two kinds of formatting
  - H3: Named styles (Heading 1, Heading 2, Body Text, Strong) — what converters read
  - H3: Direct formatting (manually resizing, bolding, or coloring text) — what converters ignore
- H2: Why converters only read named styles
  - H3: How the .docx XML structure separates style references from manual overrides
  - H3: Why guessing "this big bold paragraph is probably a heading" is unreliable
- H2: The four most common formatting-lost situations
  - H3: Pseudo-headings (large bold text, no heading style applied)
  - H3: Color-coded text for meaning (no Markdown equivalent for color)
  - H3: Custom fonts and sizes applied directly (no Markdown equivalent)
  - H3: Underline used for emphasis (no Markdown underline syntax)
- H2: How to repair your Word document before converting
  - H3: Using the Styles panel to apply Heading 1/2/3 to pseudo-headings
  - H3: Using Find & Replace with format matching to catch direct-formatted spans
  - H3: The Nuclear Option: paste into a new document using "Paste as plain text" then re-apply styles
- H2: What MDTool (mammoth.js) can and can't fix automatically
  - H3: The style-map feature: remapping custom styles to Markdown elements
  - H3: Why the browser version doesn't expose style-map configuration (yet)

## Key points to cover
- The pillar page (`/word-to-markdown`) already explains this distinction well in its "What Gets Lost" section. This post should go deeper on the repair workflow — it's the action step the tool page can't take space for.
- Use a concrete before/after example in the intro: a Word document where every chapter title was made bold and 18pt by hand (no style applied) → after conversion, all titles become plain paragraphs. A second version where the same titles use Heading 2 style → they come out as `## Chapter Title`.
- The color-coded-text pattern is common in business documents where someone uses red text to mean "needs review" or yellow highlight to mean "important". These carry semantic meaning in Word that has no Markdown equivalent at all — the post should name this as a format mismatch that conversion can't solve, and suggest converting such documents to plain text notes instead.
- The mammoth.js style-map is a real feature (documented in the mammoth.js README) that power users can use via the Node.js API to remap custom named styles. Mentioning this honestly (and noting MDTool's browser version doesn't expose it) differentiates from tools that pretend to handle everything.

## Internal links to include
- → Pillar `/word-to-markdown` — anchor: "word to markdown converter" (mandatory)
- → `/blog/word-to-markdown-table-not-converting` — anchor: "tables not converting cleanly" (in-cluster, recommended)
- → `/blog/word-to-markdown-images-not-extracted` — anchor: "images disappearing during conversion" (in-cluster, recommended)

## Competing pages to differentiate from
- Generic how-to posts on Medium and markdowntools.com cover the named-style rule but skip the repair workflow entirely — this post should be the definitive "how to actually fix it" resource.
- The mammoth.js README covers style-map configuration for developers; this post should surface that capability for non-developers who might otherwise think conversion is a dead end for their document.
