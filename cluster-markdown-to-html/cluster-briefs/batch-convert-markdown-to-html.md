# Brief: How to Batch Convert Multiple Markdown Files to HTML

**Cluster:** Developer & CMS Workflows (cluster-2-post-2)
**Primary keyword:** batch convert markdown files to html
**Secondary keywords:** convert folder of markdown to html, multiple md files to html online, markdown to html bulk
**Template:** how-to
**Target word count:** ~1,200
**URL:** `/blog/batch-convert-markdown-to-html`

## Meta Description
Got a folder of .md files and need HTML for all of them? Here are three ways to batch convert — from a quick browser loop to a one-line static site generator command.

## Outline
- H1: How to Batch Convert Multiple Markdown Files to HTML
- H2: When you actually need batch conversion (docs sites, knowledge bases, content migrations)
- H2: Option 1 — convert one at a time in your browser (fine for under ~10 files)
- H2: Option 2 — a static site generator (Hugo, 11ty, Jekyll) if you need this repeatedly
- H2: Option 3 — a CLI script (pandoc loop, Node script) for true one-off bulk jobs
- H2: Which option fits your situation

## Key points to cover
- Be honest about scope: devmark itself converts one file at a time, so frame this as genuinely helpful guidance across all three options rather than forcing a one-tool answer — set the right expectation early (under "Option 1") about where the browser tool fits and where it doesn't.
- For readers who only have 5-10 files, point out that "batch" framing often overstates the problem — quantify the actual time cost of converting each individually in a browser tool vs. setting up tooling.
- For readers with dozens+ files or a recurring need, be straightforward that a static site generator or script is the right call, and give a real, minimal pandoc loop example for the CLI-comfortable reader.

## Internal links to include
- → Pillar `/markdown-to-html` — anchor: "markdown to html converter" (mandatory)
- → `/blog/markdown-to-html-wordpress-cms` — anchor: "convert markdown to html for wordpress" (in-cluster, recommended)
- → `/blog/github-readme-to-html` — anchor: "github readme.md to html" (in-cluster, recommended)

## Competing pages to differentiate from
- Static site generator docs (Hugo, Jekyll) — solve the recurring/large-scale case well but assume the reader already wants a full site generator, overkill for a one-off folder of files.
- Generic "how to use pandoc" tutorials — accurate for CLI users but ignore the much larger audience that just wants a quick browser-based answer for a handful of files.
