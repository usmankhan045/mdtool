# Brief: Importing Word Documents Into Obsidian as Markdown (No Plugin Required)

**Cluster:** Source-App Workflows (cluster-2-post-0)
**Primary keyword:** import word document into obsidian markdown
**Secondary keywords:** obsidian docx import, convert word to obsidian vault, obsidian word document plugin, word to obsidian notes
**Template:** how-to
**Target word count:** ~1,300
**URL:** `/blog/word-to-markdown-obsidian-import`

## Meta Description
Obsidian doesn't open .docx files natively. The cleanest path is a browser-based Word-to-Markdown conversion first, then drop the .md file into your vault. Here's the full workflow.

## Outline
- H1: Importing Word Documents Into Obsidian as Markdown (No Plugin Required)
- H2: Why Obsidian doesn't just open .docx files
  - H3: Obsidian's vault model is Markdown-only (plain text files)
  - H3: Why this is actually an advantage for long-term note portability
- H2: The no-plugin path (recommended for most people)
  - H3: Step 1 — Convert the .docx to Markdown using MDTool or word2md.com
  - H3: Step 2 — Review and clean up the output (heading check, image placeholders)
  - H3: Step 3 — Save the .md file into your Obsidian vault folder
  - H3: Step 4 — Re-add images manually (or link to the originals)
- H2: The plugin path — when it makes sense
  - H3: The Docxer community plugin (add .docx to vault, click Convert)
  - H3: The obsidian-pandoc plugin (requires Pandoc installed locally)
  - H3: Tradeoffs: plugin maintenance risk, Obsidian sync behaviour with .docx files
- H2: Formatting checklist after importing
  - H3: Check that heading styles were applied in the original Word doc
  - H3: Remove extra blank lines from list items
  - H3: Replace image placeholders with working vault links
  - H3: Convert Word footnotes to Obsidian-style footnotes if needed
- H2: Batch-importing a folder of Word documents
  - H3: When the plugin path is worth it for large imports
  - H3: Using Pandoc via the command line for a whole folder at once

## Key points to cover
- The post should open from the reader's perspective: they have a folder of Word notes from before they started using Obsidian, or they received a Word doc they want to add to their vault. The conversion is a one-time migration step, not a recurring workflow.
- Be honest about what breaks during conversion (images need manual work, footnotes need adjusting) so the reader isn't surprised after following the steps.
- The Docxer plugin (github.com/Developer-Mike/obsidian-docxer) is the most maintained single-file conversion plugin as of 2026. Name it specifically. Don't give a generic "check the community plugins" answer.
- Obsidian Sync behaviour is worth a note: .docx files added to a vault folder will sync via Obsidian Sync (eating storage quota) even if they're only there temporarily for conversion — recommend converting outside the vault folder first, then moving only the .md file in.
- The batch path (Pandoc command line) is worth mentioning for users migrating a whole archive of Word notes, but should be a secondary section, not the primary recommendation.

## Internal links to include
- → Pillar `/word-to-markdown` — anchor: "word to markdown converter" (mandatory)
- → `/blog/google-docs-vs-word-to-markdown` — anchor: "google docs vs word to markdown" (in-cluster, recommended)

## Competing pages to differentiate from
- wildandfreetools.com/blog/word-to-markdown-obsidian-import covers the no-plugin path but skips the post-import cleanup checklist entirely.
- forum.obsidian.md threads discuss the plugin options but are fragmented and don't compare the approaches side by side — a single structured post fills this gap.
- file2markdown.ai's Obsidian guide recommends their own paid tool; this post should give a free-first path.
