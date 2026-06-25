# Brief: Why Code Blocks Get Lost When You Paste Markdown Into Word

**Cluster:** Conversion Problems & Fixes (cluster-0-post-1)
**Primary keyword:** markdown code blocks lost when pasted into word
**Secondary keywords:** markdown code block not monospace in word, fenced code block word export, syntax highlighting lost in docx
**Template:** how-to
**Target word count:** ~1,250
**URL:** `/blog/markdown-to-word-code-blocks-lost`

## Meta Description
Code blocks turning into regular paragraph text — or disappearing entirely — when you convert Markdown to Word? Here's why fenced code survives badly and how to fix it.

## Outline
- H1: Why Code Blocks Get Lost When You Paste Markdown Into Word
- H2: What "lost" actually means — three different failure modes
  - H3: Code becomes regular proportional-font text
  - H3: Backticks/fences appear as literal characters
  - H3: Indentation and line breaks collapse
- H2: Why this happens — copy-paste vs. real conversion
- H2: What a correct conversion should preserve (monospace font, background shading, line breaks)
- H2: How MDTool maps fenced code blocks to a dedicated Word paragraph style
- H2: Limits — what syntax highlighting (colored tokens) doesn't survive into Word, and why

## Key points to cover
- Distinguish copy-pasting rendered Markdown preview (which loses code formatting because it's pasting visual text, not structure) from running it through an actual converter that parses the AST.
- Explain plainly that Word has no concept of "syntax highlighting tokens" the way a code editor or HTML `<pre><code>` does — so even a correct conversion can only preserve monospace font + block shading, not per-token coloring. Set this expectation honestly rather than overpromising.
- Cross-reference the pillar's existing Mermaid-diagram explanation as the same pattern: explain *why* a specific element doesn't fully survive instead of hiding the limitation.

## Internal links to include
- → Pillar `/markdown-to-word` — anchor: "markdown to word converter" (mandatory)
- → `/blog/markdown-to-word-table-not-converting` — anchor: "tables not converting to word tables" (in-cluster, recommended)
- → `/blog/markdown-to-word-headings-not-converting` — anchor: "headings not converting to word styles" (in-cluster, recommended)

## Competing pages to differentiate from
- markdowntoword.pro's troubleshooting page lists the symptom but doesn't explain why syntax-highlighting colors specifically can't survive in a .docx.
- General "how to format code in Word" guides assume manual formatting, not Markdown conversion.
