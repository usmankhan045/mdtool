# Brief: Migrating Word Documentation to Markdown for GitHub Wikis and Docs-as-Code

**Cluster:** AI & Documentation Use Cases (cluster-3-post-1)
**Primary keyword:** word documentation to markdown migration
**Secondary keywords:** migrate word docs to markdown, word to github wiki markdown, docx to docs as code, convert word documentation to mkdocs, word to docusaurus markdown
**Template:** how-to
**Target word count:** ~1,350
**URL:** `/blog/word-documentation-to-markdown-migration`

## Meta Description
Moving internal documentation from Word to a GitHub wiki, MkDocs, or Docusaurus site? Here's the conversion workflow, the cleanup checklist, and the decisions you'll need to make before you start.

## Outline
- H1: Migrating Word Documentation to Markdown for GitHub Wikis and Docs-as-Code
- H2: Why teams migrate documentation from Word to Markdown
  - H3: Version control (git diff on .md vs. opaque DOCX binary)
  - H3: Docs-as-code: documentation lives next to the code it documents
  - H3: Markdown as the input format for GitHub wiki, MkDocs, Docusaurus, GitBook, Mintlify
- H2: Before you start: inventory and triage
  - H3: Which Word docs actually need to become Markdown (vs. being archived)
  - H3: Which documents have images that will need manual work
  - H3: Which documents rely on Word-specific features (tracked changes, comments, footnotes)
- H2: The conversion workflow
  - H3: Single file: MDTool or word2md.com
  - H3: Batch migration: Pandoc with --extract-media, or MarkItDown for LLM-adjacent pipelines
  - H3: Post-conversion cleanup script: remove extra blank lines, normalize heading levels
- H2: Platform-specific considerations
  - H3: GitHub Wiki — supports standard GFM; images must be uploaded as wiki assets
  - H3: MkDocs — requires `docs/` folder structure; each heading becomes a nav entry
  - H3: Docusaurus — requires MDX-compatible Markdown; watch for angle brackets in code
  - H3: GitBook — imports Markdown directly; sync via Git repository
- H2: The cleanup checklist
  - H3: Heading hierarchy (no skipped levels — H1 → H3 breaks MkDocs nav)
  - H3: Internal cross-references (Word's hyperlinks to other docs need to become relative .md paths)
  - H3: Code blocks (inline `code` vs. fenced blocks)
  - H3: Tables (complex tables may need simplification or HTML table fallback)
  - H3: Footnotes (Word footnotes have no standard Markdown equivalent — decide: inline parenthetical or remove)
- H2: Keeping the Markdown in sync after migration
  - H3: The "Markdown is now the source of truth" decision (stop editing the Word file)
  - H3: Tools for exporting back to Word when stakeholders need it (this site's Markdown to Word converter)

## Key points to cover
- The audience is a developer or technical writer at a company with a legacy Word documentation library who is migrating to docs-as-code. They're not just converting one document — they may have 20-100 files. Frame the post accordingly.
- The triage step is undervalued and should be real. Not every Word doc needs to become Markdown: executive communications, finance reports, and compliance documents may be better left as PDFs or archived. The migration is for the documentation that will actively be maintained and versioned.
- The platform-specific section is the differentiator. Each docs platform has a slightly different flavour of Markdown and a different folder structure requirement. MkDocs' strict nav-from-headings model is a real migration trap that breaks docs silently.
- The "stop editing the Word file" section matters for cultural reasons: many teams migrate to Markdown but then continue editing the Word source when non-technical stakeholders need changes, creating two sources of truth. Naming this problem and recommending the Markdown→Word converter for stakeholder export is both honest and commercially relevant.
- The internal cross-reference problem (Word → Markdown hyperlinks between docs) is a real pain point that competing posts ignore. Word's internal hyperlinks often point to absolute paths or UNC paths that break completely in Markdown. Flag this as a manual cleanup step.

## Internal links to include
- → Pillar `/word-to-markdown` — anchor: "word to markdown converter" (mandatory)
- → `/blog/word-to-markdown-for-rag-llm` — anchor: "converting docx to markdown for RAG" (in-cluster, recommended)
- → `/markdown-to-word` — anchor: "markdown to word converter" (cross-site, for the "export back to Word" section)

## Competing pages to differentiate from
- tutorialsteacher.com has a basic step-by-step conversion article with no platform-specific or cleanup guidance.
- The existing `content/blog/markdown-to-word-documentation.mdx` on this site covers the inverse direction (Markdown → Word for technical docs). This post covers the reverse migration and should explicitly cross-link to it as the companion piece for teams that need to maintain both formats.
