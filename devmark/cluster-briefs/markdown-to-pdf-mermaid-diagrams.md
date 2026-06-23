# Brief: Markdown to PDF with Mermaid Diagrams — Why They Disappear (And How to Keep Them)

**Cluster:** Conversion Problems & Fixes (cluster-0-post-3)
**Primary keyword:** markdown to pdf mermaid diagram
**Secondary keywords:** mermaid diagram not rendering pdf, mermaid markdown pdf export, convert mermaid flowchart to pdf
**Template:** how-to
**Target word count:** ~1,400
**URL:** `/blog/markdown-to-pdf-mermaid-diagrams`

## Meta Description
Mermaid diagrams render fine in your editor, then show up as raw code blocks (or vanish) in the exported PDF. Here's why most converters fail at this, and how to actually keep your flowcharts.

## Outline
- H1: Markdown to PDF with Mermaid Diagrams
- H2: Why Mermaid breaks in most converters
  - H3: Headless browser / Puppeteer version mismatches (the VS Code extension bug)
  - H3: Converters that never executed the Mermaid JS at all (Pandoc, plain regex-based parsers)
- H2: What correct output looks like vs. broken output (side-by-side image)
- H2: How to convert a Markdown file with Mermaid diagrams to PDF
- H2: Supported diagram types (flowchart, sequence, gantt, class)

## Key points to cover
- Cite the real-world bug class: Mermaid 10.4+ moved to ES Modules, breaking older `evaluate()` script-injection approaches used by tools like vscode-markdown-pdf — this is documented in public GitHub issues and gives the post real technical credibility.
- Explain that devmark renders Mermaid natively in-browser (it already depends on the `mermaid` package) before generating the PDF, so there's no headless-browser version mismatch to manage.
- Include 1-2 example diagrams (flowchart + sequence) readers can copy-paste to test.

## Internal links to include
- → Pillar `/markdown-to-pdf` — anchor: "markdown to pdf mermaid diagram" (mandatory)
- → `/blog/markdown-to-pdf-images-not-showing` — anchor: "images not rendering" (in-cluster, recommended)
- → `/blog/markdown-to-pdf-code-blocks` — anchor: "code blocks losing syntax highlighting" (in-cluster, recommended)

## Competing pages to differentiate from
- yzane/vscode-markdown-pdf GitHub issues — high-authority but it's a bug tracker, not a solution page.
- md2pdf-mermaid (GitHub project) — targets developers willing to install a CLI tool; differentiate as the no-install browser alternative.
