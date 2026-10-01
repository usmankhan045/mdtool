# Show HN v2

## Can you repost? Yes, within limits

- First post: **"Show HN: MDTool – free, client-side Markdown to PDF, HTML and Word (no uploads)"**, item **48906238**, 2026-07-14, **3 points**, no discussion: https://news.ycombinator.com/item?id=48906238
- HN FAQ (https://news.ycombinator.com/newsfaq.html), quoted: *"If a story has not had significant attention in the last year or so, a small number of reposts is ok. Otherwise we bury reposts as duplicates."* and *"Please don't delete and repost the same story."*
- Show HN rules (https://news.ycombinator.com/showhn.html): it must be something people can try (yes, no signup), and *"Please don't ask friends to upvote or comment. That's not ok on HN."*
- 3 points with no comments is not "significant attention", so **one** repost with a new angle is within the rules. Don't do a third one if this one also sinks; let it go.
- Use a **different URL** from the first post (`/markdown-to-word` instead of the homepage) and a **different angle**. That isn't a trick: this post really does present a different capability.
- Optional and allowed: HN's moderators accept emails at **hn@ycombinator.com** about a Show HN that got no attention, and they sometimes invite it into the "second-chance pool". Keep the email short, factual and non-pushy. Send it only if v2 also gets overlooked; never send more than one.

## Timing
- Weekday, **about 8-10 am US Eastern** (Tue-Thu). Avoid the same day as the Product Hunt launch.
- Block 3-4 hours to answer every comment fast. Engagement in the first hour decides whether it reaches the front page.
- Have the GitHub repo polished first (LICENSE, README hero). HN readers click through to the source.

## Title (≤ 80 characters; HN removes hype words, so keep it factual)

Recommended (77 characters):
```
Show HN: Client-side Markdown to Word with native heading styles, Mermaid PDF
```
Alternates:
- `Show HN: Markdown → .docx in the browser with real Word Heading styles` (70)
- `Show HN: I made Markdown→Word keep real heading styles (and Mermaid in PDFs)` (76)

**URL:** `https://www.mdtool.dev/markdown-to-word`

## First comment (post it immediately after submitting)

```
Hi HN, I'm Usman. I posted MDTool here in July and it sank without a trace, so this time I want to show the two parts I think are actually interesting technically.

1) Markdown → .docx with native heading styles, entirely client-side

Most "Markdown to Word" converters on the web either upload your file to a server running Pandoc, or produce an HTML-in-a-.doc shim where "headings" are just big bold paragraphs. Open those in Word and the Navigation pane is empty, Insert → Table of Contents finds nothing, and a corporate template can't restyle them.

MDTool parses Markdown with marked, walks the tokens and builds the OOXML itself with the docx library in the browser. # through ###### map to Word's built-in Heading 1–6 styles, lists become real numbered/bulleted lists, GFM tables become Word tables, and code uses a monospace run style. The result opens cleanly in Word, Google Docs, LibreOffice and Pages. Try it: write a few headings and open the file with View → Navigation Pane.

2) Mermaid diagrams in a vector PDF, also client-side

The PDF path doesn't screenshot the page (html2canvas-style output is blurry and the text can't be selected). It converts the rendered HTML into a pdfmake document: text stays text, code is syntax-highlighted with highlight.js, and ```mermaid blocks are rendered by Mermaid in the browser and embedded as diagrams. There's `\pagebreak` support and no browser print header/footer.

Nothing is uploaded: there's no backend for conversion, so the Network tab stays quiet while you convert. There's also Word→Markdown (mammoth + turndown), HTML→Markdown, and a table generator.

Known gaps: no images in the Word export yet, no footnotes, and no custom reference template. I'd love to hear which of those matters most, plus any .md file that breaks it.

Source: https://github.com/usmankhan045/mdtool
```

⚠️ Before posting, re-check each technical claim against the current code (`lib/docx.ts`, `lib/pdf.ts`, `lib/mermaid.ts`), especially "no images in Word export", and test whether Mermaid diagrams end up as vector or raster in the PDF. HN commenters will test it.

## Replies to prepare in advance
- **"Why not just Pandoc?"** "Pandoc is the gold standard, and I use it in CI. This is for when you can't or won't install it (locked-down work laptop, a non-technical colleague, a phone), or when the file is confidential and you don't want to use an upload-based converter."
- **"How do you make money?"** Answer honestly (ads? nothing yet?). Check what `components/ads` is doing before you answer.
- **"Is it open source?"** Point to the repo and the license (add one first).
- **"It broke on X"**: thank them, open a GitHub issue live and link it in the reply.
