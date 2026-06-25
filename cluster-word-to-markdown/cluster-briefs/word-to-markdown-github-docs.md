# Brief: Migrating Word Documents to Markdown for GitHub and Docs Sites

**Cluster:** AI & Documentation Use Cases (cluster-3-post-1 variant)
**Primary keyword:** word to markdown github
**Secondary keywords:** word document github markdown, docx to github readme, migrate word docs to github, word to markdown static site
**Template:** how-to
**Target word count:** ~1,200
**URL:** `/blog/word-to-markdown-github-docs`

## Meta Description
Moving Word content into a GitHub repo, wiki, or static site generator? Here's the conversion workflow, the post-conversion fixes that matter (heading levels, images, code blocks, anchor links), and how GitHub wikis differ from READMEs.

## TL;DR / Key Takeaways Box
- GitHub's platform renders GitHub Flavored Markdown (GFM spec v0.29-gfm) — standard Markdown won't break, but GFM pipe tables and fenced code blocks work best
- The most-missed step after `pandoc --extract-media`: committing `git add assets/` alongside the `.md` file — images exist locally but aren't staged
- GitHub wikis support `[[WikiLink]]` double-bracket cross-page links; READMEs do not — they are different renderers
- GitHub's auto-generated TOC (shown when a file has 2+ headings) is a fast sanity check for heading hierarchy post-conversion

## Audience
Developers and technical writers who have documentation in Word and want to move it into a GitHub repository, GitHub wiki, or a docs-as-code platform (Jekyll, Hugo, Eleventy, Astro, Docusaurus, MkDocs). They may be doing a one-off document migration or setting up a systematic docs-in-git workflow for a team.

## SERP Context
Top results for "word to markdown github" and "docx to github readme":
- Medium article by Elena Sheremetyeva (~950 words): no troubleshooting, no image path commit step, no heading anchor format explanation
- glukhov.org conversion guide (~2,500 words): covers Pandoc well but misses GitHub wiki vs README distinction, heading anchor generation rules, GitHub auto-TOC
- Pandoc GitHub gists (<500 words each): command-only, zero context for GitHub-specific rendering behavior

**Key gaps no competitor covers:**
1. GitHub wiki `[[WikiLink]]` syntax vs. README relative links — different behavior, no article explains this for Word migrators
2. The `git add assets/` step after `--extract-media` — most commonly missed
3. GitHub's heading anchor format (`## My Heading` → `#my-heading`) vs. Pandoc's generated anchors (which don't match)
4. GitHub auto-TOC as a heading-validation tool post-conversion
5. MDX-specific considerations for Astro/Docusaurus (JSX breaks the MDX parser)

## Outline
- H1: Migrating Word Documents to Markdown for GitHub and Docs Sites
- H2: Why Dev Teams Keep Docs in Markdown on GitHub
  - H3: Docs-as-code: documentation in Git alongside the code it describes
  - H3: GFM is GitHub's native format — README, wikis, issues, PRs all render it
  - H3: Static site generators (Jekyll, Hugo, Eleventy, Astro, Docusaurus, MkDocs) all use Markdown source
- H2: Converting Existing Word Docs With MDTool
  - H3: Step 1 — Prepare: accept tracked changes, delete comments
  - H3: Step 2 — Convert: drag-and-drop on the word to markdown converter
  - H3: Step 3 — Rename the file (lowercase-hyphen convention)
  - H3: Step 4 — Place the file in the repo (README.md, docs/, content/)
- H2: What Needs Fixing After Conversion
  - H3: Heading levels — one H1 per document, use GitHub auto-TOC as sanity check
  - H3: Images — extract with Pandoc `--extract-media`, then `git add assets/` (the missed step)
  - H3: Code blocks — replace 4-space indented blocks with fenced ``` blocks + language tags
  - H3: Internal anchor links — GitHub's format vs. Pandoc-generated IDs
- H2: Setting Up a Docs Folder in a GitHub Repo
  - H3: Repository docs (README.md, docs/ folder)
  - H3: GitHub wiki — separate git repo, `[[WikiLink]]` syntax, image upload to `_assets/`
  - H3: Static site generator — content dir varies by platform (docs/, content/, src/)
- H2: Frequently Asked Questions (8 items)

## Key Points to Cover
- Lead with the GFM spec citation (github.github.com/gfm v0.29-gfm) as an E-E-A-T signal. This is a stable, authoritative source and most competitors don't cite it.
- The heading anchor rules section is the highest-value technical differentiator: GitHub lowercases heading text and replaces spaces with hyphens. `## My Section` → `#my-section`. Pandoc generates different anchor IDs. Any in-document cross-reference links from the Word conversion will be wrong on GitHub and need manual fixing.
- The `git add assets/` step must be called out explicitly. It is the single most commonly missed step after `pandoc --extract-media` — documented in Pandoc issue tracker and developer forums. Framing it as "the most commonly missed step" sets the right expectation.
- GitHub wiki distinction: wikis are a separate Git repository (`git clone https://github.com/USER/REPO.wiki.git`). Images go to `_assets/` in the wiki's repo. `[[WikiLink]]` cross-page links work in wikis but NOT in repository Markdown files. No competitor draws this line clearly.
- No YAML frontmatter for GitHub READMEs — GitHub renders the `---` block as a horizontal rule, not metadata. YAML is needed for Jekyll/Hugo/etc., not for plain GitHub files. Set this expectation clearly to avoid unnecessary work.
- GFM extensions over CommonMark (5 total): tables, task list items, strikethrough, extended autolinks, disallowed raw HTML — cite the GFM spec.

## Citation Capsules
- **GFM spec**: v0.29-gfm, github.github.com/gfm — cite directly
- **GitHub Octoverse 2025**: 630M total repositories, 121M new repositories added in 12 months ending Aug 2025 — cite github.blog/news-insights/octoverse
- **GitHub wiki image upload**: Available since February 14, 2022; images land in `_assets/` — cite github.blog/changelog/2022-02-14-upload-images-to-wiki-pages
- **Pandoc heading issue**: jgm/pandoc#5122 (headers missing after DOCX conversion), #3088 (wrong local links) — cite GitHub issue tracker
- **GitHub auto-TOC**: Appears when a rendered file has 2+ headings — cite docs.github.com basic-writing-and-formatting-syntax

## Internal Links to Include
- → `/word-to-markdown` — anchor: "word to markdown converter" (mandatory, pillar↔spoke)
- → `/blog/html-to-markdown-github` — anchor: "HTML to Markdown for GitHub" (cross-cluster, recommended — from the FAQ about HTML legacy docs)
- → `/blog/github-readme-to-pdf` — anchor: "GitHub README to PDF" (cross-cluster, optional — from the "you might also need" related links)
- → `/blog/markdown-cheatsheet` — anchor: "Markdown cheatsheet" (recommended — from post-conversion editing section)

## FAQ Items (8)

1. Does GitHub render all Markdown the same way across READMEs, wikis, and issues?
2. Is there a file size limit for Markdown files on GitHub?
3. Can I link between `.md` files in a repository?
4. Why does my converted README look fine locally but wrong on GitHub?
5. What's the difference between GitHub wiki pages and repository documentation?
6. Should I use MDTool or Pandoc for converting Word docs destined for GitHub?
7. Do I need to add YAML frontmatter for GitHub READMEs?
8. Can I convert HTML pages from a legacy docs site to Markdown for GitHub?

## Competing Pages to Differentiate From
- **Medium/Sheremetyeva (~950 words)**: No troubleshooting, no image commit step, no anchor format. Gap: Everything in the "What Needs Fixing" section.
- **glukhov.org (~2,500 words)**: Good Pandoc coverage but misses wiki vs. README distinction, auto-TOC tip, heading anchor rules. Gap: GitHub-specific rendering nuances.
- **Pandoc gists (<500 words)**: Command-only. Gap: Context, GitHub-specific behavior, the full workflow.

The goal is to own the "what do I do *after* converting to Markdown" angle — every competitor stops at the conversion step.

## Status

**Post written:** Yes — `content/blog/word-to-markdown-github-docs.mdx` (June 25, 2026)
