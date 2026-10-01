# Awesome-list and directory PRs

Verified 2026-10-01 by reading each repo's README, contributing guide and recent PR history through the GitHub API.

**Before opening any PR:** add a LICENSE to `usmankhan045/mdtool` and set the repo description (see `github-repo.md`). Maintainers click through to the repo, and some lists remove entries that have no license.

General rules:
- One PR per list, one entry per PR.
- Disclose that you are the developer in every PR body. Maintainers spot self-submissions anyway, and being upfront gets more merges.
- Match each list's entry format **exactly**, including bullet style (`-` or `*`), trailing period, and capitalization.
- Your forks already exist for BubuAnabelas/awesome-markdown, mundimark/awesome-markdown, mundimark/awesome-markdown-editors and devtoolsd/awesome-devtools. **Sync each fork with upstream before you branch**, because some of them are months behind.

| § | List | Stars | Last merged PR | Accepts PRs? | Section |
|---|------|-------|----------------|--------------|---------|
| 1 | mattcone/markdown-guide (markdownguide.org/tools) | 4.1K | 2026-04-11 (tinyMD) | Yes | Tool directory (`_tools/`) |
| 2 | mundimark/awesome-markdown-editors | 2.3K | 2026-08-06 | Yes | Markdown Online Editors |
| 3 | mundimark/awesome-markdown | 1.9K | 2026-09-29 | Yes | Markdown to Portable Document Format (PDF) |
| 4 | testthedocs/awesome-docs | 0.9K | 2026-09-25 | Yes (2 maintainer reviews; PR closed after 30 days without a reply) | Tool Collection |
| 5 | BolajiAyodeji/awesome-technical-writing | 2.3K | Active (pushed 2026-07-22; recent tool entries) | Yes | Useful Tools |
| 6 | BubuAnabelas/awesome-markdown | 959 | 2023-05 (72 open PRs) | **Dormant**: low odds | Tools → Converters |
| 7 | devtoolsd/awesome-devtools | 683 | 2025-10-12 (100+ open PRs) | **Stale**: low odds | Docs & Knowledge |
| 8 | matiassingers/awesome-readme | 21.5K | 2026-09-28 | Yes, but Tools must have "established demand" and "isn't new" | Tools (**deferred**) |

---

## 1. Markdown Guide tool directory: highest value (verified dofollow link)

Repo: https://github.com/mattcone/markdown-guide. Contribution notes: https://github.com/mattcone/markdown-guide/wiki/Markdown-tool-directory

The site's tool pages link to the tool's website with **no `rel` attribute** (checked on `/tools/tinymd/`). The maintainer says he accepts no compensation and that "Developers are welcome to submit information about their applications."

Files to add (copy the structure of PR #273, tinyMD):
- `_tools/mdtool.md` (below)
- `assets/images/tool-icons/mdtool.png`: **200 × 200** PNG of the MDTool logo
- `assets/images/tools/mdtool.png`: **1200 × 750** PNG screenshot of the Markdown → Word page with the preview visible

**Check every `available` value in the actual editor before you submit.** The values below come from `lib/markdown.ts` (`marked` with `gfm: true, breaks: true`, highlight.js, no footnote, heading-ID or definition-list extensions). The maintainer re-tests entries.

```markdown
---
title: MDTool
category: "online editor"
description: "MDTool is a free, client-side Markdown converter for PDF, Word, and HTML."
icon: mdtool.png
website: https://www.mdtool.dev
syntax:
  - id: headings
    available: y
  - id: paragraphs
    available: y
  - id: line-breaks
    available: y
    notes: "A single newline is rendered as a line break (GitHub comment style)."
  - id: bold
    available: y
  - id: italic
    available: y
  - id: blockquotes
    available: y
  - id: ordered-lists
    available: y
  - id: unordered-lists
    available: y
  - id: code
    available: y
  - id: horizontal-rules
    available: y
  - id: links
    available: y
  - id: images
    available: y
  - id: tables
    available: y
  - id: fenced-code-blocks
    available: y
  - id: syntax-highlighting
    available: y
  - id: footnotes
    available: n
  - id: heading-ids
    available: n
  - id: definition-lists
    available: n
  - id: strikethrough
    available: y
  - id: task-lists
    available: y
  - id: emoji-cp
    available: y
  - id: emoji-sc
    available: n
  - id: highlight
    available: n
  - id: subscript
    available: n
  - id: superscript
    available: n
  - id: auto-url-linking
    available: y
  - id: disabling-auto-url
    available: y
  - id: html
    available: p
    notes: "HTML renders in the preview and HTML export. PDF and Word exports convert supported elements only."
---

[MDTool](https://www.mdtool.dev) is a free, browser-based Markdown converter. Conversion runs client-side: files aren't uploaded to a server and no account is required.

MDTool converts Markdown to PDF (selectable vector text, four themes, A4 or Letter, rendered Mermaid diagrams), to Word `.docx` files that use Word's built-in Heading 1–6 styles (so the Navigation pane and automatic table of contents work), and to HTML. It also converts Word documents and HTML back to Markdown, and includes a visual Markdown table generator.

{% include image.html file="/assets/images/tools/mdtool.png" alt="MDTool Markdown to Word converter" %}

MDTool uses [marked](https://marked.js.org/) with GitHub Flavored Markdown enabled, [highlight.js](https://highlightjs.org/) for code, and [Mermaid](https://mermaid.js.org/) for diagrams.

{% include tool-syntax-table.html %}
```

**PR title:** `Add MDTool to tools directory`

**PR body:**
```
Adds MDTool (https://www.mdtool.dev), a free browser-based Markdown converter (PDF, Word .docx, HTML, and Word/HTML back to Markdown). Everything runs client-side; no account or upload.

Files:
- _tools/mdtool.md
- assets/images/tool-icons/mdtool.png (200x200)
- assets/images/tools/mdtool.png (1200x750)

I tested each syntax element in the editor before filling in the table. Footnotes, heading IDs, definition lists, highlight, sub/superscript and emoji shortcodes are not supported, so they're marked "n".

Disclosure: I'm the developer. Happy to change anything to fit the directory.
```

---

## 2. mundimark/awesome-markdown-editors: "Markdown Online Editors"

Section: `## Markdown Online Editors`. Entries are **not** alphabetical; new ones are appended. Add yours right after the `MD2PDF.cc` entry (the closest precedent: "A privacy-first, client-side Markdown to PDF converter with KaTeX & Mermaid support"), before `**Taskade**`.

**Entry (exact format; copy the leading space and line breaks):**
```markdown
**MDTool**
(web: [`mdtool.dev`](https://www.mdtool.dev),
 github: [`usmankhan045/mdtool`](https://github.com/usmankhan045/mdtool)) - Free, client-side Markdown editor and converter. Exports vector PDF (with Mermaid diagrams and syntax highlighting), Word .docx with native Heading 1–6 styles, and HTML; also converts Word and HTML back to Markdown. No signup, no uploads.
```

**PR title:** `Add MDTool to Markdown Online Editors`

**PR body:**
```
Adds MDTool (https://www.mdtool.dev, source: https://github.com/usmankhan045/mdtool) to "Markdown Online Editors".

It's a browser-based Markdown editor with live preview that exports to PDF, Word (.docx with real heading styles) and HTML, and converts .docx/HTML back to Markdown. All conversion runs client-side.

Placed after MD2PDF.cc since it's the closest existing entry.

Disclosure: I'm the developer.
```

---

## 3. mundimark/awesome-markdown: "Markdown to Portable Document Format (PDF)"

Section: `### Markdown to Portable Document Format (PDF)`. Follow the format of the existing `Resumx` entry (web link + octocat repo link, lowercase description, no trailing period). Append after `Resumx`.

**Entry:**
```markdown
- [MDTool](https://www.mdtool.dev) [:octocat:](https://github.com/usmankhan045/mdtool) - client-side web converter: Markdown to vector PDF with rendered Mermaid diagrams and syntax highlighting, plus Word (.docx with native heading styles) and HTML; no uploads
```

**PR title:** `Add MDTool to Markdown to PDF`

**PR body:**
```
Adds MDTool to "Markdown to Portable Document Format (PDF)".

- Web: https://www.mdtool.dev/markdown-to-pdf
- Source: https://github.com/usmankhan045/mdtool

Runs entirely in the browser (pdfmake + marked + Mermaid), produces selectable vector text rather than a screenshot, and also exports .docx and HTML.

Disclosure: I'm the developer.
```

Optional follow-up in a separate PR, at least 2 weeks later and only if the first one is merged: add a line under `### Microsoft Word to Markdown`:
```markdown
- [MDTool Word to Markdown](https://www.mdtool.dev/word-to-markdown) - browser-based .docx to Markdown (headings, lists, tables); file never leaves the device
```

---

## 4. testthedocs/awesome-docs: "Tool Collection"

Rules from CONTRIBUTING.md: alphabetical order; one link per item; the link text is the project name; descriptions "clear, concise, and non-promotional"; the description follows the link on the same line and ends with punctuation. Two maintainers review every PR, and a PR is closed after 30 days without a reply.

Insert alphabetically between `- [markdown-doctest](...)` and `- [Merge Docs Pro](...)`.

**Entry:**
```markdown
- [MDTool](https://www.mdtool.dev) - Browser-based Markdown converter that exports PDF, HTML, and Word files with native heading styles, and converts Word or HTML back to Markdown without uploading files.
```

**PR title:** `Add MDTool to Tool Collection`

**PR body:**
```
Adds MDTool to "Tool Collection" (alphabetical, after markdown-doctest).

MDTool is a free, browser-based converter for docs-as-code workflows: Markdown → PDF / HTML / Word (.docx using built-in Heading styles, so Word's navigation pane and TOC work), and Word/HTML → Markdown. Conversion runs client-side.

Source and README: https://github.com/usmankhan045/mdtool

Disclosure: I'm the developer.
```

---

## 5. BolajiAyodeji/awesome-technical-writing: "Useful Tools"

Rules from CONTRIBUTING.md: AP-style title case for the name; Useful Tools entries use `[Title Case Name](link)` followed by a description; the description starts with a capital and ends with a period; "The body of your commit message should contain a link to the resource." Entries are appended (not alphabetical). Add yours at the end of the list, after `MacMD Viewer`, inside the `<details>` block.

**Entry:**
```markdown
* [MDTool](https://www.mdtool.dev) - Free browser-based converter for Markdown to Word (with native heading styles), PDF, and HTML, and Word or HTML back to Markdown, with no uploads.
```

**Commit message:**
```
Add MDTool to Useful Tools

https://www.mdtool.dev
```

**PR title:** `Add MDTool to Useful Tools`

**PR body:**
```
Adds MDTool to Useful Tools.

Technical writers often draft in Markdown but have to deliver Word documents. MDTool converts Markdown to .docx using Word's built-in Heading 1–6 styles, so the Navigation pane, TOC and corporate templates work. It also exports PDF/HTML and converts .docx back to Markdown. It's free, runs in the browser, and doesn't upload files.

Link: https://www.mdtool.dev

Disclosure: I'm the developer.
```

---

## 6. BubuAnabelas/awesome-markdown: "Converters" (low odds, dormant)

Rules from `.github/contributing.md`: format `[PROJECT](LINK) - DESCRIPTION.`; alphabetical within the category; https links; the description starts with a capital and ends with a period; one PR per suggestion. The PR template asks for Project URL, Category, Description and a checklist (one project, alphabetical, commit less than 2 years old, clear README in English). Web apps get the `![Globe][globe]` icon.

Insert between `- [Markdown to PDF](https://www.markdowntopdf.com/) ...` and `- [Pandoc](https://pandoc.org/) ...`.

**Entry:**
```markdown
- [MDTool](https://www.mdtool.dev/) - Client-side web app that converts Markdown to PDF, Word (.docx) and HTML, and Word or HTML back to Markdown. ![Globe][globe]
```

**PR title:** `Add MDTool to Converters`

**PR body (fills the repo's template):**
```
## Project URL
https://www.mdtool.dev/ (source: https://github.com/usmankhan045/mdtool)

## Category
Tools → Converters

## Description
Adds MDTool, a free browser-based Markdown converter: Markdown → PDF / Word (.docx with native heading styles) / HTML, and Word/HTML → Markdown. All conversion runs client-side; no uploads or account.

## Why it should be included to `awesome-markdown` (optional)
It covers both directions (to and from Markdown) in one web tool, with no install, which complements the CLI converters already listed. Disclosure: I'm the developer.

## Checklist
- [x] Only one project/change is in this pull request
- [x] Addition in alphabetical order
- [x] Has a commit from less than 2 years ago
- [x] Has a **clear** README in English
```

---

## 7. devtoolsd/awesome-devtools: "Docs & Knowledge" (low odds, stale)

Format: `* [Name](url) - Description.` Entries are not alphabetical. Append after `xyd`.

**Entry:**
```markdown
* [MDTool](https://www.mdtool.dev/) - Free, client-side Markdown converter: PDF, Word (.docx with real heading styles), HTML, and Word/HTML back to Markdown.
```

**PR title:** `Add MDTool to Docs & Knowledge`

**PR body:**
```
Adds MDTool (https://www.mdtool.dev) to Docs & Knowledge: a free browser-based Markdown converter (PDF, Word, HTML, and back). No signup, runs client-side.

Disclosure: I'm the developer.
```

---

## 8. matiassingers/awesome-readme: "Tools" (**deferred**)

Do not submit yet. CONTRIBUTING.md says: "The tool has an established demand (i.e. a significant number of users, stars, etc)" and "The tool is a fully working solution that isn't new". Revisit once the repo has meaningful stars or usage (for example 100+ stars, or Product Hunt and HN traction you can cite).

When ready, insert it alphabetically between `Make a README` and `README best practices`:
```markdown
- [MDTool](https://www.mdtool.dev/) - Convert a project README to a print-ready PDF or Word document, with rendered Mermaid diagrams, syntax-highlighted code and GitHub-style tables.
```
PR title: `Add MDTool to Tools`
