# Reddit and community replies

## How these threads were found (and what to check before replying)

Reddit blocks this research agent: direct fetches return "Please wait for verification", and the WebSearch tool refuses reddit.com. The threads below were found through the **Internet Archive's index of Reddit URLs** and a DuckDuckGo query, and each question was read from its **archive.org snapshot**. Every URL below is real, and the dates come from the snapshots.

Before you reply, open each thread logged in and check:
1. **Is it archived or locked?** Reddit used to archive posts after 6 months. Many subreddits now allow comments on old posts, but not all. If you can't comment, **don't** start a new thread just to promote; save the draft for the next person who asks the same question.
2. **Has it already been answered well?** Only add a reply if yours adds something (for example, the heading-styles detail).
3. **The subreddit's current rules** (sidebar and wiki). I couldn't fetch the rules pages, so treat the notes below as general norms and **always defer to the sidebar**.

**Better than old threads:** set up keyword alerts so you can answer **new** questions within hours. F5Bot (https://f5bot.com) is free and emails you when Reddit or Hacker News mention a keyword. Suggested keywords: `markdown to word`, `md to docx`, `markdown to docx`, `docx to markdown`, `word to markdown`, `markdown to pdf`, `obsidian export word`, `notion export word`.

## Community rules notes (general; confirm in each sidebar)

- **Reddit-wide:** Reddit's content policy and self-promotion guidance expect you to take part in the community, not just post links. Disclose your affiliation every time. Accounts whose only activity is linking one domain get flagged as spam and the domain can be shadow-filtered. **Before linking anything, comment helpfully, with no links, for a couple of weeks**, in these subs.
- **Lead with the answer, then the link.** Every draft below solves the problem first (including free non-MDTool options such as Pandoc), then mentions MDTool with a disclosure.
- **One link, plain URL, no tracking parameters, no UTM.**
- **Never** reply to more than 2-3 threads a day, never paste the same text twice, and never ask for upvotes.
- **r/ObsidianMD:** questions about plugins and workflows are welcome. Answer with the native or plugin route first (Pandoc plugin, DOCX Exporter plugin), then the web tool as a no-install alternative. Showcase posts for your own tools are normally expected in designated threads or with a flair; check the sidebar.
- **r/Markdown:** small sub that is friendly to tool posts. Several "I built a Markdown→PDF tool" posts were allowed in 2025-26 (for example 1mldm86 and 1rz033v). Your own post is plausible here, but follow its flair rules.
- **r/technicalwriting:** professional community. It is very allergic to marketing, and users often say "we can't use online converters" (confidentiality). Lead with the privacy angle (client-side, nothing uploaded) and invite people to check the network tab.
- **r/Notion:** many "export to Word" questions. The honest workflow is Notion → Export → Markdown & CSV → MDTool → .docx.
- **r/github:** strictly about GitHub. Only reply where the question is really about Markdown/README ↔ Word or PDF.
- **r/selfhosted:** **posts and recommendations must be self-hostable.** MDTool qualifies **only after** you add a LICENSE and self-host instructions (for example `npm ci && npm run build && npm start`, or a Dockerfile). Until then, don't recommend it there.

---

## Thread 1: r/ObsidianMD, "Obsidian vs Word/Docs for writing books: how do you…" (2026-03-28)

URL: https://www.reddit.com/r/ObsidianMD/comments/1s5prxo/obsidian_vs_worddocs_for_writing_books_how_do_you/

Context: wrote the first book in Obsidian, then lost days at publishing time (KDP) copying into Word and fixing styles.

```
The part that hurt for me was always the styles, not the text. If the export maps your # / ## to Word's actual Heading 1 / Heading 2 styles, then everything downstream works: the Navigation pane shows your chapters, Insert → Table of Contents builds itself, and you can restyle the whole manuscript by editing "Heading 1" once (KDP templates rely on that).

Options that do this:
- Pandoc (the Obsidian Pandoc plugin, or CLI: `pandoc book.md -o book.docx --reference-doc=kdp-template.docx`). The reference-doc trick lets you pull your KDP template's styles straight in.
- If you don't want to install Pandoc, I built a free browser tool that does the heading mapping: https://www.mdtool.dev/markdown-to-word. It runs client-side, so the manuscript isn't uploaded anywhere. Disclosure: I'm the dev. It doesn't embed images yet, so for picture-heavy books Pandoc is still the better choice.

Either way: keep writing in Obsidian, convert per chapter or for the whole book at the end, and do the final layout pass in Word.
```

## Thread 2: r/ObsidianMD, "New Obsidian User Loves Obsidian, Hates PDF Export" (2025-06-18)

URL: https://www.reddit.com/r/ObsidianMD/comments/1lehmny/new_obsidian_user_loves_obsidian_hates_pdf_export/

Context: needs nice-looking PDFs for work. Custom margins only apply to the first page and the snippets/plugins didn't help.

```
The first-page-only margin thing happens because Obsidian's export goes through the browser print engine, and print CSS for @page margins is flaky there.

What has worked for others:
- Better Export PDF plugin + a @page CSS snippet (works for some themes, not all)
- Pandoc → PDF via a LaTeX engine with `-V geometry:margin=2cm`: rock-solid margins on every page, but you need to install a TeX distribution

Another option (disclosure: I made it): https://www.mdtool.dev/markdown-to-pdf. It builds the PDF directly instead of "printing" the page, so margins are the same on every page, the text stays selectable, there's no browser header/footer, and `\pagebreak` gives you manual page breaks. You choose A4/Letter and one of 4 themes; there are no custom margin values yet. It runs in the browser and nothing is uploaded. If you try it and need custom margins, tell me. That's useful feedback.
```

## Thread 3: r/technicalwriting, "Best way to convert markdown to pdf?" (2024-09-11, 27 comments)

URL: https://www.reddit.com/r/technicalwriting/comments/1feejku/best_way_to_convert_markdown_to_pdf/

Context: company programming docs; Pandoc errored on non-Latin characters; the company won't allow online converters.

```
Two things you hit are both solvable:

1. Pandoc + non-Latin characters: the default pdflatex engine can't handle them. Use `--pdf-engine=xelatex` (or lualatex) and set a font that has the glyphs: `-V mainfont="Noto Sans"` (add `-V CJKmainfont="Noto Sans CJK SC"` for CJK). That fixes 90% of those errors.
2. "No online converters": the real concern is usually documents being uploaded to a third-party server. Tools that run entirely in the browser avoid that, because the file never leaves the machine (you can confirm in DevTools → Network).

Disclosure: I built one of those: https://www.mdtool.dev/markdown-to-pdf. It renders client-side to a vector PDF (selectable text, syntax-highlighted code, Mermaid diagrams). For a repeatable pipeline across many files, though, Pandoc or a docs generator in CI is still the right answer. Test your specific scripts first: the PDF fonts may not cover every non-Latin script, so check before relying on it.
```
Tested 2026-10-01: Chinese (simplified and common traditional) and Japanese kana render in MDTool's PDF via an on-demand Noto Sans SC font; Korean Hangul does not. Test Cyrillic and Greek before posting.

## Thread 4: r/technicalwriting, "Creating documentation in Word is tedious" (2024-10-17, 351 votes)

URL: https://www.reddit.com/r/technicalwriting/comments/1g5lsg5/creating_documentation_in_word_is_tedious/

Context: 30+ page docs with figures in Word are painful; asks who likes it.

```
What made it bearable for me was splitting authoring from delivery: write in Markdown (diff-able, reviewable in Git, no style drift), and only generate the .docx at the end for the people who need Word.

The trick that makes the generated file not feel like a "conversion" is heading styles. If # → Heading 1 and ## → Heading 2 (real Word styles, not bold text), the Navigation pane, cross-references and auto TOC all work, and the client's template can restyle everything.

Pandoc with `--reference-doc=company-template.docx` is the gold standard for this. For quick one-offs I built a free browser converter that does the heading mapping without installing anything: https://www.mdtool.dev/markdown-to-word (disclosure: I'm the dev; nothing is uploaded).
```

## Thread 5: r/Markdown, "docx to md" (2026)

URL: https://www.reddit.com/r/Markdown/comments/1strxoe/docx_to_md/

⚠️ The archive snapshot of this one only captured Reddit's verification page, so **read the question before replying** and adapt. Draft for the usual "how do I convert .docx to Markdown" question:

```
Depends on how much of the formatting you need to keep:

- Pandoc: `pandoc in.docx -t gfm --extract-media=./media -o out.md`. The most complete option, and it pulls images out into a folder.
- Microsoft's markitdown (Python) if you're feeding the result into an LLM pipeline.
- In the browser, no install: https://www.mdtool.dev/word-to-markdown converts headings, lists, tables, bold/italic and links to GitHub-flavored Markdown, and the file stays on your machine (it runs client-side). Disclosure: I made it.

Tip: if headings come out as plain bold text whatever you use, the source document probably used manual formatting instead of Word's Heading styles. Apply Heading 1/2/3 in Word first and convert again.
```

## Thread 6: r/Markdown, "App to convert Markdown to PDF" (2025-01-13)

URL: https://www.reddit.com/r/Markdown/comments/1i0er9p/app_to_convert_markdown_to_pdf/

Context: wants a simple **iOS** app to paste Markdown into and export a PDF with headings and italics.

```
If you don't need a native app, a browser tool works fine on iPhone: paste, then download.

https://www.mdtool.dev/markdown-to-pdf works in mobile Safari: paste your Markdown, choose a theme, and it downloads a PDF with real headings and italics (selectable text, not an image). It runs on the phone itself, so nothing is uploaded. Disclosure: I'm the developer, and it's free with no account.

Native options if you prefer an app: iA Writer and Ulysses both export PDF, and Shortcuts has a "Make Rich Text from Markdown" → "Make PDF" chain that's free.
```
⚠️ Test the full flow on an actual iPhone (Safari download behavior) before posting.

## Thread 7: r/Notion, "Notion Page to Word Document" (2024-03-29)

URL: https://www.reddit.com/r/Notion/comments/1bqph04/notion_page_to_word_document/

Context: wants a workflow, other than copy and paste, to turn a Notion page into a DOCX.

```
The cleanest route I've found: ••• menu → Export → "Markdown & CSV". That gives you a .md file that keeps the headings, lists, tables and code.

Then convert that .md to Word:
- Pandoc: `pandoc page.md -o page.docx` (add `--reference-doc=template.docx` for your own styles)
- Or, without installing anything, a browser converter I built: https://www.mdtool.dev/markdown-to-word. Notion's headings become real Word Heading styles, so the Navigation pane and table of contents work. It runs locally in the browser. Disclosure: I'm the dev.

Notion-only blocks (callouts, toggles, colors) don't survive any Markdown route, so expect to touch those up by hand.
```

## Thread 8: r/github, "Issue: GitHub with .docx or .doc for sharing" (2023-02-03)

URL: https://www.reddit.com/r/github/comments/10shfwb/issue_github_with_docx_or_doc_for_sharing/

Context: a researcher wants to use GitHub with students to review written work side by side, but the documents are Word files.

```
Git can store .docx, but it can't diff them (they're zipped XML), so you lose the main benefit you're after: seeing line-by-line changes.

The usual research workflow:
1. Convert the Word draft to Markdown once (one paragraph per line, or even one sentence per line, gives the nicest diffs)
2. Students work on the .md files in the repo; you review their pull requests with GitHub's diff and inline comments
3. When you need Word again (journal submission, supervisor), convert back

For step 1 and 3: Pandoc does both directions (`pandoc thesis.docx -t gfm -o thesis.md` and back). If your students don't want to install anything, I built a free browser tool for both directions: https://www.mdtool.dev/word-to-markdown and https://www.mdtool.dev/markdown-to-word (disclosure: I'm the dev). Headings map to real Word heading styles on the way back, and files aren't uploaded.
```

---

## Conditional / backup threads

**r/selfhosted, "Your favourite file converter?" (2026-01-21).** Only after a LICENSE and self-host instructions exist.
URL: https://www.reddit.com/r/selfhosted/comments/1qjdve3/your_favourite_file_converter/
```
For documents specifically (Markdown ⇄ Word/PDF/HTML), I've been building MDTool: a Next.js app where all conversion happens client-side, so the server only serves static assets. Self-host: `git clone https://github.com/usmankhan045/mdtool && npm ci && npm run build && npm start`. [LICENSE] licensed. Disclosure: it's mine. It's narrower than Morphos (no images or audio), but the .docx output uses real Word heading styles, which most general converters miss.
```

**r/ObsidianMD, "Export to docx method other than Pandoc?" (2023-02, likely archived).** A perfect fit if comments are still open.
URL: https://www.reddit.com/r/ObsidianMD/comments/11ei7ei/export_to_docx_method_other_than_pandoc/
Use the Thread 1 draft without the KDP lines. Also mention the "DOCX Exporter" community plugin (no Pandoc needed) **before** MDTool.

---

## Other communities (not Reddit)

| Community | Where | Angle |
|-----------|-------|-------|
| Obsidian Forum | https://forum.obsidian.md, "Help" threads about Word/PDF export | Same as Thread 1/2: native or plugin first, then the web tool |
| Write the Docs Slack | https://www.writethedocs.org/slack/ (#tools channel) | Docs-as-code people. Share only when asked, and frame it as "how we handle Markdown → Word handoff" |
| Hacker News comments | via F5Bot alerts for "markdown to word" | Answer the question; link only if it fits |
| Stack Overflow / Super User | Questions tagged `markdown` + `ms-word` / `docx` | **Answer with Pandoc** (accepted best practice). Link MDTool only as an optional extra, with disclosure; SO deletes answers that are just tool promotion |
| dev.to | Comment on "markdown to word/pdf" articles | Only with substance; your cross-posts (`devto-crosspost.md`) are the main play there |
