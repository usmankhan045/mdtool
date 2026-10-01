# YouTube screencast: 2 minutes

**Goal:** one video that (a) appears for "markdown to word" and "readme to pdf" video results, (b) gives Product Hunt, Show HN and directories a demo, and (c) adds a YouTube entity signal (channel → website) that Copilot and Gemini can cite.

## Title (≤ 70 characters so it isn't truncated)
Recommended:
```
Markdown to Word with Real Heading Styles + README to PDF (Free, No Upload)
```
Alternates:
- `Convert Markdown to Word (Navigation Pane Works!) and README to PDF`
- `Markdown → Word & PDF in Your Browser: Headings, Tables, Mermaid`

## Description
```
Convert Markdown to a Word document that uses real Heading 1–6 styles (so the Navigation pane and table of contents work), and turn a GitHub README with a Mermaid diagram into a clean PDF, free and entirely in your browser.

Tools used:
▸ Markdown to Word: https://www.mdtool.dev/markdown-to-word
▸ Markdown to PDF: https://www.mdtool.dev/markdown-to-pdf
▸ Word to Markdown: https://www.mdtool.dev/word-to-markdown
▸ Markdown cheat sheet with examples: https://www.mdtool.dev/markdown-cheat-sheet

Nothing is uploaded: conversion runs client-side. No signup, no watermark.

Chapters:
0:00 The problem: "headings" that aren't headings
0:12 README → PDF with a Mermaid diagram
0:50 Markdown → Word
1:15 Word's Navigation pane and auto table of contents
1:40 Privacy: nothing leaves your browser
1:52 Word → Markdown and other tools

MDTool (mdtool.dev) is a web-based Markdown converter. It is not MonoDevelop's mdtool CLI.
Made by Muhammad Usman: https://www.linkedin.com/in/muhammadusman80/
Source: https://github.com/usmankhan045/mdtool

#markdown #msword #pdf
```

**Tags:** markdown to word, markdown to docx, markdown to pdf, readme to pdf, mermaid pdf, word navigation pane, convert markdown, md to docx, github readme pdf, technical writing, mdtool

**Thumbnail (1280 × 720):** left: `# Title` / `## Section` in a code font; right: the Word Navigation pane with a tree. Big text: **"REAL Word headings"**. Use high contrast and no more than 4 words.

## Recording setup
- 1920 × 1080, browser zoom 125%, a clean browser profile (no extensions or bookmarks bar), with Microsoft Word for the Word scenes. Use LibreOffice only if you don't have Word; its "Navigator" is the equivalent of Word's Navigation pane.
- Record each scene separately, then cut. Add on-screen captions (many viewers watch muted) and upload an accurate `.srt` file. YouTube indexes captions.
- Pre-make two files:
  - `README.md`: a short project README with H1/H2s, a fenced code block (JS or Python), a GFM table and this Mermaid block:
    ````
    ```mermaid
    flowchart LR
      A[Write Markdown] --> B{MDTool}
      B --> C[PDF]
      B --> D[Word .docx]
      B --> E[HTML]
    ```
    ````
  - `report.md`: about 1 page with `#`, 3× `##` and 2× `###` headings, a table and a bullet list.

## Script (about 2:00, about 260 spoken words)

| Time | On screen | Voiceover |
|------|-----------|-----------|
| **0:00-0:12** | Another .docx open in Word: the Navigation pane is empty and the Styles pane shows "Normal" on a big bold "heading". | "Most Markdown-to-Word converters give you headings that only *look* like headings. Word doesn't know they're headings: no navigation, no table of contents. Let's fix that, and turn a README into a PDF while we're at it." |
| **0:12-0:25** | mdtool.dev/markdown-to-pdf. Paste `README.md`; the live preview shows the Mermaid flowchart rendered. | "First, a GitHub README. Paste it into MDTool's Markdown to PDF tool. The preview already renders the Mermaid diagram, the code highlighting and the table." |
| **0:25-0:40** | Pick the **GitHub** theme (others: Academic, Minimal, Dark), choose A4, click the PDF download button. | "Pick a theme and a page size, and download." |
| **0:40-0:50** | Open the PDF. Zoom into the diagram, then drag-select text in a paragraph and a code block. | "The diagram is in the PDF, and the text is real text: you can select and search it. It's not a screenshot." |
| **0:50-1:05** | mdtool.dev/markdown-to-word. Paste `report.md`; show the preview. Click **Download Word (Free)**. | "Now Markdown to Word. Paste the Markdown, download the .docx." |
| **1:05-1:15** | Open in Word. Click a heading; zoom into the Styles gallery showing **Heading 2** highlighted. | "Click any heading: it's Word's real Heading 2 style, not bold text." |
| **1:15-1:30** | View → **Navigation Pane** (or Ctrl+F). The heading tree appears; click an item to jump. | "So the Navigation pane works immediately, and you can jump around the document." |
| **1:30-1:40** | References → Table of Contents → Automatic Table 1. A TOC appears with page numbers. | "One click and Word builds a table of contents. Your company template can restyle it all too." |
| **1:40-1:52** | Browser DevTools → Network tab, cleared, then convert again. No upload request appears. | "And it all happens in your browser. Watch the network tab: nothing is uploaded. No account, no watermark." |
| **1:52-2:00** | Quick cuts: Word to Markdown, the table generator, the cheat sheet. End card: **mdtool.dev**. | "It also converts Word back to Markdown. Links are in the description: mdtool.dev." |

## After publishing
- [ ] Pin a comment: "Which Markdown feature do you need in Word next: images, footnotes or custom templates?"
- [ ] Embed the video on `/markdown-to-word` (lazy-load it with a poster image so performance doesn't suffer) and add `VideoObject` JSON-LD with `name`, `description`, `thumbnailUrl`, `uploadDate`, `duration` (`PT2M`), `contentUrl`/`embedUrl`
- [ ] Export 2 GIFs (the Navigation pane, and the Mermaid PDF) for Product Hunt, the README, Reddit replies (where images are allowed) and the Show HN first comment
- [ ] Add the YouTube channel URL to the Organization `sameAs` on mdtool.dev
- [ ] YouTube channel "About" page: the disambiguation line, plus links to mdtool.dev and GitHub
