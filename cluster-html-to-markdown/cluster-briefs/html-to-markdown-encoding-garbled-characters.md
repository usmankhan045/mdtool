# Brief: Garbled Characters After Converting HTML to Markdown? Fix the Encoding

**Cluster:** Conversion Problems & Fixes (cluster-0-post-3)
**Primary keyword:** html to markdown encoding garbled characters
**Secondary keywords:** html to markdown mojibake, windows-1252 markdown conversion broken, utf-8 html to markdown special characters
**Template:** how-to
**Target word count:** ~1,200
**URL:** `/blog/html-to-markdown-encoding-garbled-characters`

## Meta Description
Curly quotes turned into "â€™", em dashes into garbage symbols, after converting HTML to Markdown? That's a character-encoding mismatch, not a converter bug — here's how to fix it.

## Outline
- H1: Garbled Characters After Converting HTML to Markdown? Fix the Encoding
- H2: What's actually happening (mojibake, not corruption)
- H2: The usual cause: HTML saved or exported as ISO-8859-1 / Windows-1252, read as UTF-8
- H2: How to check which encoding your source HTML actually is
- H2: The fix
  - H3: Re-save or re-export the source HTML as UTF-8 before converting
  - H3: Setting the encoding explicitly when using a CLI/library-based converter
  - H3: Why a browser-based, paste-in converter usually avoids this entirely
- H2: Checklist before you publish

## Key points to cover
- Define mojibake clearly for a non-technical reader: a curly apostrophe (’) is one byte in Windows-1252 but two bytes in UTF-8 — if a tool reads UTF-8 bytes as if they were Windows-1252 (or vice versa), each "wrong" character gets reinterpreted as 1-2 garbage characters, which is exactly the â€™-style pattern people see.
- Explain the most common real-world source: HTML exported from Word, Outlook, or older CMS platforms, which frequently still default to Windows-1252 rather than UTF-8.
- Give the practical fix path: open the source HTML in a plain-text editor and re-save explicitly as UTF-8 before pasting it into a converter; for CLI/library workflows, explicitly pass an encoding flag rather than trusting auto-detection.
- Note honestly where devmark's own browser-based, paste-in workflow helps: since you're pasting rendered text (not raw bytes) into a paste field, the browser/clipboard layer has usually already normalized to Unicode by the time it reaches the converter — so this failure mode mostly shows up when uploading a raw .html file with a non-UTF-8 declared charset, not when copy-pasting visible text.

## Internal links to include
- → Pillar `/html-to-markdown` — anchor: "html to markdown converter" (mandatory)
- → `/blog/html-to-markdown-nested-list-indent` — anchor: "nested list indent" (in-cluster, recommended)
- → `/blog/html-to-markdown-code-block-language` — anchor: "code block language not preserved" (in-cluster, recommended)

## Competing pages to differentiate from
- General "what is mojibake" explainer pages — cover the concept abstractly, not the specific HTML-to-Markdown conversion path.
- Library documentation (PHP league, html-to-markdown Go/Python packages) — cover the `--encoding` flag for developers, not what a non-technical user pasting a file should actually do.
