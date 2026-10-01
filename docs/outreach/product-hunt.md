# Product Hunt launch kit

Rules checked 2026-10-01 against PH's launch guide (https://www.producthunt.com/launch) and 2026 launch checklists:
- Launching is free.
- Only **personal** accounts can launch, not company accounts. Hunt it yourself; you don't need a "hunter".
- **You cannot ask people to upvote.** Ask them to "check it out and leave feedback". Messages that ask for upvotes get launches penalized.
- The launch day starts at 12:01 am Pacific Time. Schedule for that time.
- Field limits: tagline **≤ 60 characters**, description **≤ 260 characters**. Gallery images are 1270 × 760 px (recommended). Thumbnail is 240 × 240.
- Guides recommend an account with about 30 days of genuine activity before launch (upvote and comment on other launches). Start now if your PH account is new.

## Name
MDTool

## Tagline (pick one; all ≤ 60 characters)
1. **`Markdown to Word with real heading styles, no uploads`** (53). Recommended.
2. `Markdown to Word with real headings, 100% in your browser` (57)
3. `Markdown to Word with real heading styles. Private, free.` (57)

## Description (255 characters)
```
Convert Markdown to Word files that use Word's built-in Heading 1–6 styles, so the Navigation pane, TOC and templates work. Also exports PDF (with Mermaid diagrams) and HTML, and turns .docx back into Markdown. Runs in your browser: no uploads, no signup.
```

## Links
- Website: `https://www.mdtool.dev/markdown-to-word` (land on the strongest tool, not the homepage)
- Additional links: `https://github.com/usmankhan045/mdtool`, `https://www.mdtool.dev/markdown-to-pdf`
- Pricing: **Free**
- "Is this product open source?": answer Yes **only after** the LICENSE file is added.

## Topics (pick 3; PH limits how many you can choose)
Primary: **Productivity**, **Developer Tools**, **Writing**. Alternates if the form offers them: **Markdown**, **Privacy**, **Open Source** (only once licensed). Pick from the exact names the launch form suggests as you type.

## Maker first comment (post it as soon as the launch goes live)

```
Hey Product Hunt 👋 I'm Usman, the developer behind MDTool.

I write everything in Markdown, but the people I send documents to live in Word. Every converter I tried gave me a .docx where the "headings" were just big bold text: the Navigation pane was empty, Insert → Table of Contents found nothing, and the company template ignored them.

So MDTool builds the .docx itself and maps # to Word's real Heading 1, ## to Heading 2, and so on. Open the file, press Ctrl+F (or View → Navigation Pane) and your outline is already there. Tables come out as real Word tables and code blocks keep their monospace.

A few other things it does:
• Markdown → PDF with selectable vector text (not a screenshot), 4 themes, A4/Letter, and rendered ```mermaid diagrams
• Markdown → HTML (snippet or full document)
• Word (.docx) → Markdown and HTML → Markdown, for moving docs into GitHub, Obsidian or a static site
• A visual Markdown table generator (paste from Excel/Sheets) and a cheat sheet with examples

Privacy: conversion runs entirely in your browser. Your file isn't uploaded, there's no account, and nothing is stored.

What I'd love feedback on: which Markdown features you need in Word that are still missing (footnotes? images? a custom reference template?). I read every comment today.
```

## Gallery (5 images, 1270 × 760)

1. **Hero: the Navigation pane.** On the left, a Markdown file with `#`, `##`, `###`. On the right, the same document open in Microsoft Word with the Navigation pane showing the heading tree. Overlay text: *"Real Word headings. Your outline, instantly."*
2. **Before and after.** Split image: another converter's .docx (headings styled as "Normal" + bold, empty Navigation pane) next to MDTool's (Styles gallery highlighting "Heading 2"). Overlay: *"Not bold text. Actual Heading 1–6 styles."* Don't name a competitor in the image.
3. **Privacy.** A browser DevTools Network tab during conversion showing no upload request, plus a lock icon. Overlay: *"Converted in your browser. Nothing is uploaded."*
4. **PDF with Mermaid.** A README containing a ```mermaid flowchart and a code block, next to the exported PDF page with the diagram rendered and the text selected (to prove it's vector). Overlay: *"README → PDF, diagrams included."*
5. **The round trip.** A three-panel strip: .docx → Markdown (Word to Markdown tool), Markdown table generator, cheat sheet. Overlay: *"And back again: Word → Markdown, tables, cheat sheet."*

Optional: use a 30-60 s cut of the YouTube screencast (`youtube.md`) as the first gallery item.

## Thumbnail
240 × 240 MDTool logo on a solid background. Use the same artwork as the 200 × 200 icon for the Markdown Guide PR.

## Launch-day checklist

**T-14 to T-7 days**
- [ ] PH account active (comment on 5-10 launches in Productivity and Developer Tools)
- [ ] LICENSE added; GitHub repo description, topics and README hero done
- [ ] Gallery images and thumbnail exported at the exact sizes
- [ ] YouTube screencast published (link it in the first comment or gallery)
- [ ] Create the "Coming soon" / scheduled launch page and collect followers
- [ ] Prepare a short "ask for feedback" note for friends, colleagues, the LinkedIn post and any newsletter. **No "please upvote".**

**T-1 day**
- [ ] Schedule the launch for **12:01 am PT** on a Tuesday-Thursday (high traffic) or a weekend (easier to place but lower traffic). For a free niche tool, weekends often place better.
- [ ] Check the site under load: Vercel limits, no console errors, and Word/PDF downloads work on Safari, Chrome, Firefox and mobile Safari
- [ ] Add a small "Featured on Product Hunt" banner to the homepage, ready to switch on (dofollow from you to PH is fine)

**Launch day (block the whole day)**
- [ ] 12:01 am PT: confirm the launch is live and post the maker comment immediately
- [ ] Post on LinkedIn (https://www.linkedin.com/in/muhammadusman80/) with the GIF of the Navigation pane, linking to the PH page and asking for feedback
- [ ] Post on X/Bluesky/Mastodon with the same GIF
- [ ] Reply to **every** comment within 30-60 minutes with specific, non-templated answers
- [ ] Don't post Show HN on the same day; split the audiences (see `show-hn-v2.md`)
- [ ] Don't send mass DMs, and don't post in "upvote exchange" groups. PH detects vote rings.

**T+1 to T+7**
- [ ] Add the PH badge to the footer or About page if you finished in the top 5
- [ ] Turn the most common questions into FAQ entries on `/markdown-to-word`
- [ ] Thank commenters. Turn feature requests into GitHub issues and link them in your PH replies.
