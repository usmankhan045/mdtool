# GitHub repo polish: usmankhan045/mdtool

Current state (GitHub API, 2026-10-01): public, 0 stars, **no description**, **no topics**, homepage set to https://www.mdtool.dev/, **no LICENSE**, a README is present, and a stray file named `B` sits in the repo root.

GitHub is the #2 result for the "mdtool" brand query, and LLMs read repo descriptions and topics directly. This page is the cheapest entity fix you can make.

## 1. Description (About → ⚙️). 238 characters, under the 350 limit

```
MDTool (mdtool.dev) – free, client-side Markdown converter: Markdown to Word (.docx with real Heading styles), PDF (Mermaid, vector text) and HTML, plus Word/HTML to Markdown. Runs in the browser, no uploads. Not MonoDevelop's mdtool CLI.
```

Website field: `https://www.mdtool.dev`

## 2. Topics (exactly 15; lowercase, hyphenated)

```
markdown
markdown-converter
markdown-to-word
markdown-to-docx
markdown-to-pdf
markdown-to-html
docx-to-markdown
html-to-markdown
markdown-editor
markdown-cheatsheet
document-converter
mermaid
client-side
privacy-first
nextjs
```

## 3. Other repo settings
- [ ] **Add a LICENSE** (Add file → Create new file → name it `LICENSE` → "Choose a license template"). MIT is the common choice for this kind of tool; it's your decision. This unblocks OpenAlternative, a "Yes" to "open source" on Product Hunt, and the license field in Wikidata.
- [ ] Delete the stray `B` file from the root.
- [ ] Settings → General → **Social preview**: upload a 1280 × 640 image (the Navigation-pane hero from `product-hunt.md`). It's used when the repo link is shared on HN, Reddit and X.
- [ ] About sidebar: uncheck "Packages" and "Deployments" if unused, so the sidebar stays clean.
- [ ] Turn on **Discussions** (optional) and pin an "Ideas / feature requests" thread. Link to it from the Product Hunt and Show HN comments.
- [ ] Pin `mdtool` on your GitHub profile, and add one line to your profile README: `Building [MDTool](https://www.mdtool.dev), a free, private Markdown → Word/PDF/HTML converter.`
- [ ] Add a `CONTRIBUTING.md` with 5 lines ("issues welcome; run `npm i && npm run dev`"). Some list maintainers look for it.

## 4. README hero (replace everything above `## The Tools` in README.md)

Keep the existing tools table and everything below it. The current hero has no disambiguation line and no screenshot.

```markdown
<div align="center">

<img src="public/icon-512.png" alt="MDTool logo" width="88" height="88">

# MDTool: Free Online Markdown Converter

### Markdown → **Word** (real heading styles) · **PDF** (Mermaid diagrams) · **HTML**, and back, 100% in your browser

**[Open mdtool.dev →](https://www.mdtool.dev)**

No signup · No watermarks · No uploads: your documents never leave your device

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.mdtool.dev&label=mdtool.dev)](https://www.mdtool.dev)
[![License](https://img.shields.io/github/license/usmankhan045/mdtool)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/usmankhan045/mdtool?style=flat)](https://github.com/usmankhan045/mdtool/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/usmankhan045/mdtool)](https://github.com/usmankhan045/mdtool/commits/main)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![100% Client-Side](https://img.shields.io/badge/conversion-100%25%20client--side-brightgreen)](https://www.mdtool.dev/about)

<img src="docs/readme/markdown-to-word-navigation-pane.png" alt="Markdown converted to Word: headings appear in Word's Navigation pane" width="820">

</div>

> **Disambiguation:** MDTool (mdtool.dev) is a web-based Markdown converter, not MonoDevelop's `mdtool` CLI and not SolidWorks MDTools.

**Why MDTool?** Most Markdown → Word converters turn `#` headings into big bold text. MDTool maps them to Word's built-in **Heading 1–6** styles, so the Navigation pane, automatic table of contents and company templates work as soon as you open the file. Built and maintained by [Muhammad Usman](https://www.linkedin.com/in/muhammadusman80/).

---
```

Notes:
- `public/icon-512.png` and `docs/readme/markdown-to-word-navigation-pane.png` are placeholders. Point them at real files; the repo has `app/icon.svg`, which you can reference as `app/icon.svg` instead.
- Add the License badge only after the LICENSE exists. Otherwise it shows "not specified".
- Once the repo has a Product Hunt launch, add:
  `[![MDTool on Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=POST_ID&theme=light)](https://www.producthunt.com/posts/mdtool)`. Copy the exact snippet from your PH dashboard; it gives you the real `post_id`.

## 5. Badges you can also put on mdtool.dev's About page

```markdown
[![GitHub stars](https://img.shields.io/github/stars/usmankhan045/mdtool?style=social)](https://github.com/usmankhan045/mdtool)
```
A visible "Star on GitHub" link on the About and tool pages is the cheapest way to move the repo off 0 stars, which several directories and list maintainers check.
