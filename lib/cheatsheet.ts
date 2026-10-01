// Data source for the /markdown-cheat-sheet hub and its syntax spoke pages.
// Each topic renders as its own indexable URL targeting a long-tail syntax query
// ("markdown table", "markdown checklist", ...), with the hub as the cluster root.

export interface SyntaxSection {
  heading: string;
  body: string; // plain prose (no markdown)
  code?: string; // markdown source example
  note?: string; // GFM/compatibility note
  /** Optional comparison table (e.g. "where it works" platform support) */
  table?: { headers: string[]; rows: string[][] };
}

export interface GuideTopic {
  slug: string;
  /** H1 / link label */
  title: string;
  /** <title> tag (template appends "| MDTool") */
  metaTitle: string;
  metaDescription: string;
  /** Answer-first opening — the direct answer to the query, quotable by AI engines */
  answer: string;
  sections: SyntaxSection[];
  faqs: { q: string; a: string }[];
  /** Related converter that consumes this syntax */
  relatedTool: { href: string; label: string };
  /** Sibling spoke slugs to cross-link (falls back to the first topics when omitted) */
  related?: string[];
}

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    slug: 'headings',
    title: 'Markdown Headings',
    metaTitle: 'Markdown Headings — H1 to H6 Syntax',
    metaDescription:
      'How to write headings in Markdown: # for H1 through ###### for H6, plus the alternate ===/--- syntax, best practices, and common mistakes.',
    answer:
      'Create a heading in Markdown by starting a line with 1–6 hash characters (#) followed by a space. One # is an H1, two ## an H2, down to ###### for H6.',
    sections: [
      {
        heading: 'Basic heading syntax',
        body: 'Put the hashes at the very start of the line and leave one space before the text. Blank lines before and after the heading keep every parser happy.',
        code: '# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6',
      },
      {
        heading: 'Alternate syntax for H1 and H2',
        body: 'H1 and H2 can also be written by underlining the text with equals signs or hyphens. This "setext" style only exists for the first two levels.',
        code: 'Heading 1\n=========\n\nHeading 2\n---------',
      },
      {
        heading: 'Best practices',
        body: 'Use exactly one H1 per document, keep levels sequential (do not jump from H2 to H4), and always include the space after the hashes — "#Heading" without a space is not recognized by many parsers, including GitHub.',
        note: 'GitHub automatically generates anchor links from headings: "## My Section" becomes #my-section.',
      },
    ],
    faqs: [
      {
        q: 'Why is my Markdown heading not working?',
        a: 'The most common cause is a missing space after the hash characters. "#Title" is plain text in most parsers; "# Title" is a heading. Also check the heading starts at the beginning of the line.',
      },
      {
        q: 'How many heading levels does Markdown support?',
        a: 'Six levels, H1 through H6, written with one to six hash characters. Levels beyond six are not supported — a line starting with seven hashes renders as plain text.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
    related: ['horizontal-rules', 'links', 'escaping-characters'],
  },
  {
    slug: 'bold-and-italic',
    title: 'Bold and Italic in Markdown',
    metaTitle: 'How to Bold & Italic in Markdown (with Examples)',
    metaDescription:
      'How to make text bold, italic, or both in Markdown: **bold**, *italic*, ***bold italic***, when to use asterisks vs underscores, and mid-word emphasis rules.',
    answer:
      'Make text bold in Markdown by wrapping it in two asterisks (**bold**) and italic by wrapping it in one (*italic*). Three asterisks give you both: ***bold italic***.',
    sections: [
      {
        heading: 'Emphasis syntax',
        body: 'Asterisks and underscores are interchangeable for emphasis, but asterisks are the safer default: underscores inside words (like snake_case_names) are not treated as emphasis by GitHub Flavored Markdown, while asterisks are.',
        code: '*italic* or _italic_\n**bold** or __bold__\n***bold and italic***',
      },
      {
        heading: 'Emphasis inside words',
        body: 'To bold part of a word, you must use asterisks: "un**believ**able" works, "un__believ__able" does not in GFM.',
        code: 'un**believ**able',
      },
    ],
    faqs: [
      {
        q: 'Should I use asterisks or underscores for bold in Markdown?',
        a: 'Asterisks. They behave consistently across parsers and work mid-word, whereas underscores are ignored inside words by GitHub Flavored Markdown.',
      },
      {
        q: 'How do I underline text in Markdown?',
        a: 'Standard Markdown has no underline syntax. If your target output is HTML, embed the HTML tag directly: <u>underlined</u>. Most parsers, including GitHub, pass inline HTML through.',
      },
    ],
    relatedTool: { href: '/markdown-to-word', label: 'Markdown to Word Converter' },
    related: ['strikethrough', 'escaping-characters', 'headings'],
  },
  {
    slug: 'links',
    title: 'Markdown Links',
    metaTitle: 'Markdown Links: Hyperlink Syntax with Examples',
    metaDescription:
      'How to create links in Markdown: inline [text](url) syntax, titles, reference-style links, automatic links, and linking to page sections.',
    answer:
      'Create a link in Markdown with square brackets around the link text followed immediately by the URL in parentheses: [link text](https://example.com).',
    sections: [
      {
        heading: 'Inline links',
        body: 'The everyday form. An optional title in quotes after the URL becomes hover text.',
        code: '[MDTool](https://www.mdtool.dev)\n[MDTool](https://www.mdtool.dev "Free Markdown converter")',
      },
      {
        heading: 'Reference-style links',
        body: 'For documents that repeat the same URL, define it once at the bottom and reference it by label. This keeps paragraphs readable in the raw source.',
        code: 'See the [documentation][docs] for details.\n\n[docs]: https://www.mdtool.dev/markdown-cheat-sheet',
      },
      {
        heading: 'Automatic links and section anchors',
        body: 'GFM automatically links bare URLs like https://example.com. To link to a heading on the same page, use its generated anchor: lowercase, spaces replaced with hyphens.',
        code: '<https://example.com>\n[Jump to setup](#getting-started)',
      },
      {
        heading: 'URLs with spaces',
        body: 'A space ends the URL in an inline link, so "[Report](my report.pdf)" breaks. Either encode each space as %20, or wrap the whole destination in angle brackets, which CommonMark and GitHub allow precisely for this case.',
        code: '[Report](my%20report.pdf)\n[Report](<my report.pdf>)\n[Spec](<docs/Design Notes.md>)',
      },
      {
        heading: 'Linking to headings and anchors',
        body: 'GitHub builds a heading’s anchor by lowercasing the text, removing formatting, deleting punctuation, and replacing each space with a hyphen. When two headings produce the same anchor, the second gets -1, the third -2, and so on. To link to a heading in another file, add the anchor after the file path.',
        table: {
          headers: ['Heading', 'Anchor link'],
          rows: [
            ['## Getting Started', '#getting-started'],
            ['## What’s New in v2.0?', '#whats-new-in-v20'],
            ['## C++ & Rust', '#c--rust'],
            ['## **Bold** Heading', '#bold-heading'],
            ['A second "## Setup" heading', '#setup-1'],
          ],
        },
        code: '[Jump to the FAQ](#frequently-asked-questions)\n[Install steps](docs/setup.md#installation)',
      },
      {
        heading: 'Ampersands, parentheses and special characters in URLs',
        body: 'Query strings with & work as-is inside a Markdown link — you do not need to write &amp;. Parentheses are fine when balanced, which matters for Wikipedia-style URLs; an unbalanced one must be escaped with a backslash or encoded as %28 or %29. An unbalanced square bracket inside the link text needs escaping too.',
        code: '[Search](https://example.com/search?q=markdown&page=2)\n[Wiki](https://en.wikipedia.org/wiki/Mercury_(planet))\n[Odd URL](https://example.com/a%29b)\n[Read the \\[draft notes](notes.md)',
      },
      {
        heading: 'Collapsed and shortcut reference links',
        body: 'Reference links have two shorter forms. With empty brackets, or none at all, the link text doubles as the label. Labels are case-insensitive, and a definition can carry a title just like an inline link.',
        code: 'Convert files with [MDTool][] or read the [cheat sheet].\n\n[mdtool]: https://www.mdtool.dev "Free Markdown converter"\n[cheat sheet]: https://www.mdtool.dev/markdown-cheat-sheet',
      },
    ],
    faqs: [
      {
        q: 'How do I open a Markdown link in a new tab?',
        a: 'Pure Markdown has no syntax for that. Use inline HTML instead: <a href="https://example.com" target="_blank" rel="noopener">text</a>. Note that GitHub strips target attributes in READMEs.',
      },
      {
        q: 'How do I put a space in a Markdown link URL?',
        a: 'Replace each space with %20, or wrap the URL in angle brackets: [Report](<my report.pdf>). A plain space ends the URL and breaks the link.',
      },
      {
        q: 'How do I link to a heading in another Markdown file?',
        a: 'Add the heading’s anchor after the file path: [Install](docs/setup.md#installation). On GitHub the anchor is the heading text in lowercase, with punctuation removed and spaces turned into hyphens.',
      },
    ],
    relatedTool: { href: '/html-to-markdown', label: 'HTML to Markdown Converter' },
    related: ['images', 'escaping-characters', 'headings'],
  },
  {
    slug: 'images',
    title: 'Markdown Images',
    metaTitle: 'Markdown Images: How to Embed an Image (Examples)',
    metaDescription:
      'How to embed images in Markdown: ![alt](url) syntax, alt text, titles, linked images, and how to control image size with HTML.',
    answer:
      'Embed an image in Markdown with an exclamation mark, alt text in square brackets, and the image URL in parentheses: ![alt text](image.png).',
    sections: [
      {
        heading: 'Basic image syntax',
        body: 'The alt text describes the image for screen readers and shows when the image fails to load — never leave it empty.',
        code: '![Diagram of the conversion pipeline](/images/pipeline.png)\n![Logo](logo.svg "MDTool logo")',
      },
      {
        heading: 'Clickable images',
        body: 'Wrap the image syntax inside a link to make the image clickable.',
        code: '[![Build status](badge.svg)](https://github.com/usmankhan045/mdtool/actions)',
      },
      {
        heading: 'Resizing images',
        body: 'Markdown itself cannot set width or height. When your renderer allows inline HTML (GitHub does), use an img tag instead.',
        code: '<img src="screenshot.png" alt="Editor screenshot" width="480" />',
      },
      {
        heading: 'Image size by platform',
        body: 'Some editors add their own size syntax on top of Markdown. Obsidian takes a width after a pipe in the alt text or the embed, optionally with a height; GitLab accepts an attribute block after the image. These only work on their own platform — for anything shared, the HTML img tag with a width attribute is the portable choice. Set only the width so the height scales proportionally.',
        code: '<!-- Obsidian -->\n![Screenshot|300](screenshot.png)\n![[screenshot.png|300]]\n![[screenshot.png|640x480]]\n\n<!-- GitLab -->\n![Screenshot](screenshot.png){width=300}\n\n<!-- GitHub and everywhere HTML is allowed -->\n<img src="screenshot.png" alt="Screenshot" width="300">',
        note: 'GitHub strips the style attribute, so style="width: 300px" has no effect in a README — use the width attribute instead.',
      },
      {
        heading: 'Images inside tables',
        body: 'Inline images work in GFM table cells exactly like text. To keep a grid of screenshots or logos even, switch to img tags with a fixed width, since a table cell cannot hold Markdown size syntax.',
        code: '| Light theme | Dark theme |\n|-------------|------------|\n| ![Light](light.png) | ![Dark](dark.png) |\n| <img src="light.png" alt="Light" width="200"> | <img src="dark.png" alt="Dark" width="200"> |',
      },
      {
        heading: 'Linked images with a fixed size',
        body: 'The [![alt](src)](url) pattern above makes an image clickable but cannot resize it. When you need both, wrap an img tag in an anchor tag.',
        code: '<a href="https://www.mdtool.dev">\n  <img src="logo.png" alt="MDTool logo" width="120">\n</a>',
      },
      {
        heading: 'Local PNG files vs image URLs',
        body: 'A relative path such as images/diagram.png is resolved from the location of the Markdown file, which is what GitHub recommends for images stored in a repository; a path starting with / resolves from the repository root on GitHub. A full https:// URL works from anywhere. Paths on your own disk (C:\\Users\\… or /home/…) only work in local previews, and browser-based converters can only load images they can reach by URL. Encode spaces in file names, or wrap the path in angle brackets.',
        code: '![Same folder](diagram.png)\n![Subfolder](images/diagram.png)\n![From the repo root on GitHub](/docs/images/diagram.png)\n![Remote URL](https://example.com/diagram.png)\n![File name with spaces](<my diagram.png>)',
      },
    ],
    faqs: [
      {
        q: 'How do I resize an image in Markdown?',
        a: 'Standard Markdown has no size syntax. Use an inline HTML img tag with a width attribute — GitHub, GitLab, and most static site generators render it.',
      },
      {
        q: 'How do I resize an image in Obsidian?',
        a: 'Add a pipe and a width: ![[image.png|300]] for embedded files, or ![alt|300](url) for external images. Use 300x200 to set width and height together.',
      },
      {
        q: 'Why is my local image not showing?',
        a: 'Usually the path is wrong relative to the Markdown file, the file name contains spaces that are not encoded, or the image was never committed to the repository. Absolute paths on your own computer never work once the file is published or uploaded to an online converter.',
      },
      {
        q: 'Can I put an image in a Markdown table?',
        a: 'Yes. ![alt](src) works inside a table cell on GitHub and other GFM renderers. Use <img width="…"> in the cell if you need to control the size.',
      },
    ],
    relatedTool: { href: '/markdown-to-pdf', label: 'Markdown to PDF Converter' },
    related: ['links', 'tables', 'page-breaks'],
  },
  {
    slug: 'lists',
    title: 'Markdown Lists',
    metaTitle: 'Markdown Lists: Ordered, Unordered & Nested Examples',
    metaDescription:
      'How to write lists in Markdown: unordered lists with - or *, ordered lists with numbers, nesting with indentation, and mixing list types.',
    answer:
      'Create an unordered list in Markdown by starting lines with a hyphen, asterisk, or plus sign (- item). Create an ordered list by starting lines with a number and period (1. item).',
    sections: [
      {
        heading: 'Unordered lists',
        body: 'Hyphens, asterisks, and plus signs are equivalent; pick one and stay consistent within a list.',
        code: '- First item\n- Second item\n- Third item',
      },
      {
        heading: 'Ordered lists',
        body: 'The numbers do not have to be sequential — parsers renumber automatically. Writing "1." for every item is a common trick that keeps diffs clean when reordering.',
        code: '1. Install the CLI\n1. Run the converter\n1. Download the PDF',
      },
      {
        heading: 'Nested lists',
        body: 'Indent nested items so they align with the first character of the parent item text — 2 spaces for "-" lists, 3 for "1." lists. Four spaces always works in GFM.',
        code: '- Fruits\n  - Apples\n  - Oranges\n- Vegetables\n  1. Carrots\n  2. Peas',
      },
      {
        heading: 'Bullet list inside a numbered list',
        body: 'Steps with sub-points are the most common mix. Indent the bullets three spaces under a "1." item so they line up with the step text; for items 10 and above, indent four.',
        code: '1. Prepare the file\n   - Check the headings\n   - Fix broken tables\n2. Convert to PDF\n   - Pick a theme\n   - Choose A4 or Letter\n3. Share the result',
      },
      {
        heading: 'Starting the numbering at any number',
        body: 'The first number sets the start and the rest count up from it, so a list that begins with 5. renders 5, 6, 7 even if you wrote 1. for the following items. Up to nine digits are allowed. The flip side: a line that starts with a number and a period, like a year, becomes a list unless you escape the period.',
        code: '5. Fifth step\n1. Sixth step\n1. Seventh step\n\n2026\\. A year that is not a list item',
        note: 'In CommonMark, a numbered list that interrupts a paragraph without a blank line must start at 1. Leave a blank line before lists that start at another number.',
      },
      {
        heading: 'Lettered and roman-numeral lists (a, b, c)',
        body: 'Markdown has no syntax for lettered lists: "a." at the start of a line is plain text. Use an HTML ordered list with the type attribute, which GitHub allows: type="a" for a, b, c, type="A" for capitals, and type="i" for roman numerals. The start attribute sets the first value. On GitHub specifically, nested numbered lists are already styled as i, ii, iii at the second level and a, b, c at the third.',
        code: '<ol type="a">\n  <li>First option</li>\n  <li>Second option</li>\n</ol>\n\n<ol type="i" start="3">\n  <li>Starts at iii</li>\n</ol>',
      },
      {
        heading: 'Hyphen vs asterisk vs plus',
        body: 'All three bullet markers produce identical HTML. Hyphens are the most common choice and the default in formatters such as Prettier; asterisks are easy to confuse with emphasis in the source. Switching markers in the middle of a list starts a new list, which can add unexpected spacing, so keep one marker per list. A line of * * * or - - - is a horizontal rule, not three empty bullets.',
        code: '- Hyphen\n- Hyphen\n\n* Asterisk\n* Asterisk\n\n+ Plus\n+ Plus',
      },
    ],
    faqs: [
      {
        q: 'Why is my nested Markdown list not rendering?',
        a: 'Insufficient indentation. Nested items must be indented enough to align with the parent item content — when in doubt, use four spaces. Tabs mixed with spaces are another frequent culprit.',
      },
      {
        q: 'How do I add a paragraph inside a list item?',
        a: 'Leave a blank line and indent the paragraph to match the list item content (typically 2–4 spaces). The same works for code blocks inside list items.',
      },
      {
        q: 'How do I make a lettered list (a, b, c) in Markdown?',
        a: 'Markdown cannot do it natively. Use HTML: <ol type="a"> with <li> items. GitHub renders the type attribute; on GitHub, a numbered list nested two levels deep is also shown with letters automatically.',
      },
      {
        q: 'How do I start a numbered list at a number other than 1?',
        a: 'Begin the list with the number you want, such as "4.". The following items count up from there regardless of the numbers you type, as long as a blank line separates the list from any paragraph above it.',
      },
      {
        q: 'Should I use - or * for bullet points?',
        a: 'Either. They render identically, but hyphens are the more common convention and cannot be confused with italic or bold markers. Whatever you pick, use one marker throughout a list.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
    related: ['checkboxes', 'definition-lists', 'line-breaks'],
  },
  {
    slug: 'checkboxes',
    title: 'Markdown Checkboxes (Task Lists)',
    metaTitle: 'Markdown Checkbox: Task List Syntax with Examples',
    metaDescription:
      'How to create checkboxes in Markdown: - [ ] for unchecked, - [x] for checked task list items, where they work (GitHub, Obsidian), and common pitfalls.',
    answer:
      'Create a checkbox in Markdown with a list item followed by square brackets: "- [ ]" for an unchecked box and "- [x]" for a checked one. This is GitHub Flavored Markdown task list syntax.',
    sections: [
      {
        heading: 'Task list syntax',
        body: 'The space inside the empty brackets is required — "- []" without it will not render as a checkbox on GitHub.',
        code: '- [ ] Write the report\n- [x] Convert it to PDF\n- [ ] Send for review',
      },
      {
        heading: 'Where checkboxes work',
        body: 'Task lists are a GFM extension, not core Markdown. They render on GitHub (issues, PRs, READMEs), GitLab, Obsidian, Notion, and in MDTool converters — but not in strict CommonMark parsers.',
        note: 'On GitHub issues and PRs, checkboxes are interactive — clicking them updates the source. In READMEs they render as static checked/unchecked boxes.',
      },
      {
        heading: 'Why isn’t my checkbox rendering?',
        body: 'Work through four checks. First, the brackets need a space inside them: "[ ]", not "[]". Second, the brackets must follow a list marker and a space — "- [ ]", "* [ ]" and "1. [ ]" all work, but a bare "[ ]" at the start of a line is just text. Third, some parsers need a blank line between a paragraph and the list that follows it, so add one. Fourth, check that your platform supports task lists at all: VS Code’s built-in preview, Reddit, Discord and strict CommonMark parsers show the brackets literally.',
        code: '- [] Broken: no space inside the brackets\n-[ ] Broken: no space after the hyphen\n[ ] Broken: no list marker\n\nSome intro text.\n\n- [ ] Works: list marker, space, [ ], space\n* [ ] Works with asterisks too\n1. [ ] And in numbered lists',
      },
      {
        heading: 'Checkbox support by platform',
        body: 'Task lists are a GitHub Flavored Markdown extension, so support varies more than for core syntax.',
        table: {
          headers: ['Platform', 'Task lists', 'Note'],
          rows: [
            ['GitHub', 'Yes', 'Clickable in issues, PRs and comments; static in files'],
            ['GitLab', 'Yes', 'Adds [~] for inapplicable items and checkboxes in table cells'],
            ['Obsidian', 'Yes', 'Clickable; any character inside the brackets counts as done'],
            ['VS Code preview', 'Not built in', 'Add the Markdown Checkboxes extension'],
            ['Notion', 'Shortcut only', 'Typing [] then space creates a to-do block'],
            ['Jira, Confluence Cloud', 'Shortcut only', 'Typing [] in the editor creates an action item'],
            ['Reddit, Discord', 'No', 'Brackets display as text'],
          ],
        },
      },
      {
        heading: 'Checkboxes on one line or inside a table',
        body: 'GFM checkboxes only exist as list items, so you cannot put several on one line or inside a table cell on GitHub. Three workarounds: Unicode ballot boxes (☐ and ☑) or emoji, which display everywhere; HTML input elements, which work where raw HTML is allowed but are stripped by GitHub; and GitLab, which accepts [ ] or [x] as the only content of a table cell.',
        code: '| Task   | Done |\n|--------|:----:|\n| Draft  |  ☑   |\n| Review |  ☐   |\n\n<!-- Raw HTML renderers only (GitHub strips <input>) -->\n<input type="checkbox" checked disabled> Draft\n<input type="checkbox" disabled> Review',
      },
    ],
    faqs: [
      {
        q: 'Why is my Markdown checkbox not rendering?',
        a: 'Three usual causes: no space inside the empty brackets ("- []" instead of "- [ ]"), no space after the hyphen, or a parser that only supports core Markdown without the GFM task-list extension.',
      },
      {
        q: 'Do Markdown checkboxes convert to PDF and Word?',
        a: 'Yes — MDTool renders task list items as checked/unchecked boxes in both its PDF and Word converters.',
      },
      {
        q: 'Should I write [x] or [X] for a checked box?',
        a: 'Both work. The GFM spec accepts a lowercase or uppercase x, and GitHub writes a lowercase x when you tick a box in an issue, so [x] is the usual convention. Obsidian is looser and treats any character inside the brackets as checked.',
      },
      {
        q: 'How do I mark a task as N/A or partially done?',
        a: 'Standard Markdown has only checked and unchecked. GitLab adds [~] for inapplicable tasks, shown struck through and excluded from the count. Elsewhere, cross the item out with ~~strikethrough~~ or add a note such as "(N/A)" or "(in progress)" after the text.',
      },
    ],
    relatedTool: { href: '/markdown-to-pdf', label: 'Markdown to PDF Converter' },
    related: ['lists', 'strikethrough', 'tables'],
  },
  {
    slug: 'tables',
    title: 'Markdown Tables',
    metaTitle: 'Markdown Table — Syntax, Alignment & Examples',
    metaDescription:
      'How to create tables in Markdown: pipe and hyphen syntax, column alignment with colons, formatting inside cells, and why tables break in some converters.',
    answer:
      'Create a table in Markdown with pipes (|) separating columns and a row of hyphens under the header. Colons in the separator row control column alignment.',
    sections: [
      {
        heading: 'Basic table syntax',
        body: 'The separator row of hyphens is what makes it a table. Outer pipes are optional but make the source easier to read; column widths do not need to line up.',
        code: '| Tool | Output |\n|------|--------|\n| MDTool | PDF, HTML, Word |\n| Pandoc | Almost anything |',
      },
      {
        heading: 'Column alignment',
        body: 'Add colons to the separator row: left (:---), center (:---:), or right (---:).',
        code: '| Left | Center | Right |\n|:-----|:------:|------:|\n| a    |   b    |     c |',
      },
      {
        heading: 'What can go inside a cell',
        body: 'Inline formatting works: bold, italic, code, links, and images. Block elements do not — you cannot put lists, headings, or multi-line paragraphs in a Markdown table cell. Use <br> for a manual line break inside a cell.',
        note: 'Tables are a GFM extension. Strict CommonMark parsers render them as plain text — one of the most common reasons tables "break" after conversion.',
      },
    ],
    faqs: [
      {
        q: 'How do I merge cells in a Markdown table?',
        a: 'You cannot — Markdown tables have no colspan or rowspan. If you need merged cells, write the table in HTML instead; most renderers accept inline HTML tables.',
      },
      {
        q: 'How do I convert a Markdown table to HTML?',
        a: 'Paste the table into MDTool’s Markdown to HTML converter — GFM tables convert to real <table> markup with thead and tbody. Or build the table in the Markdown Table Generator and switch its output toggle to HTML.',
      },
      {
        q: 'Is there a tool that writes Markdown table syntax for me?',
        a: 'Yes — MDTool’s free Markdown Table Generator gives you a visual grid editor with per-column alignment and Excel/CSV paste import, and outputs the finished table as Markdown or HTML.',
      },
      {
        q: 'Why does my Markdown table break in PDF exports?',
        a: 'Usually the converter’s parser lacks the GFM table extension, or long unbreakable content overflows the fixed page width. MDTool’s PDF converter handles GFM tables natively.',
      },
    ],
    relatedTool: { href: '/markdown-table-generator', label: 'Markdown Table Generator' },
    related: ['escaping-characters', 'line-breaks', 'checkboxes'],
  },
  {
    slug: 'code-blocks',
    title: 'Markdown Code Blocks',
    metaTitle: 'Markdown Code Block — Fenced Code & Syntax Highlighting',
    metaDescription:
      'How to write code in Markdown: inline code with backticks, fenced code blocks with triple backticks, language tags for syntax highlighting, and escaping backticks.',
    answer:
      'Write inline code in Markdown by wrapping it in single backticks (`code`), and multi-line code blocks by fencing them with triple backticks (```) on their own lines. Add a language name after the opening fence for syntax highlighting.',
    sections: [
      {
        heading: 'Inline code and fenced blocks',
        body: 'The language tag after the opening fence (js, python, bash, ...) is what enables syntax highlighting in renderers that support it.',
        code: 'Use the `convert()` function.\n\n```js\nconst pdf = await convert(markdown, { theme: "github" });\n```',
      },
      {
        heading: 'Showing backticks inside code',
        body: 'To display a backtick inside inline code, wrap it with double backticks. To show a triple-backtick fence inside a block, fence the outer block with four backticks.',
        code: '`` `backtick` ``',
      },
      {
        heading: 'Indented code blocks',
        body: 'Lines indented by four spaces also form a code block in core Markdown, but fenced blocks are strongly preferred: they support language tags and cannot be triggered accidentally by indentation.',
      },
    ],
    faqs: [
      {
        q: 'Why does my code block lose highlighting when converting to PDF?',
        a: 'Many converters parse Markdown with one engine for preview and a different one for PDF generation, dropping the highlighter’s CSS classes in between. MDTool generates the PDF from the same rendered output as the preview, so highlighting survives.',
      },
      {
        q: 'Which languages can be syntax-highlighted?',
        a: 'That depends on the renderer. MDTool ships highlight.js with JavaScript, TypeScript, Python, Bash, CSS, HTML/XML, JSON, YAML, SQL, Rust, Go, and Dart registered.',
      },
    ],
    relatedTool: { href: '/markdown-to-pdf', label: 'Markdown to PDF Converter' },
    related: ['escaping-characters', 'collapsible-sections', 'page-breaks'],
  },
  {
    slug: 'blockquotes',
    title: 'Markdown Blockquotes',
    metaTitle: 'Markdown Blockquote — Quote Syntax',
    metaDescription:
      'How to write blockquotes in Markdown: the > prefix, multi-paragraph quotes, nested quotes, and GitHub alert callouts (NOTE, WARNING, TIP).',
    answer:
      'Create a blockquote in Markdown by starting the line with a greater-than sign and a space: "> quoted text". Repeat the > on each line, or on blank lines between paragraphs, to continue the quote.',
    sections: [
      {
        heading: 'Basic and multi-paragraph quotes',
        body: 'Blockquotes can contain any other Markdown: emphasis, lists, code blocks, even headings.',
        code: '> Simple quote.\n\n> First paragraph.\n>\n> Second paragraph with **bold**.',
      },
      {
        heading: 'Nested quotes',
        body: 'Stack the markers to nest one quote inside another — useful for quoting email threads.',
        code: '> Outer quote\n>> Nested reply',
      },
      {
        heading: 'GitHub alerts',
        body: 'On GitHub, special blockquote openers render as colored callout boxes. These are GitHub-specific and render as regular blockquotes elsewhere.',
        code: '> [!NOTE]\n> Useful information.\n\n> [!WARNING]\n> Critical content.',
        note: 'All five alert types, Obsidian’s foldable callouts and a fallback that works everywhere are covered in the callouts guide.',
      },
      {
        heading: 'Lists, code and headings inside a quote',
        body: 'Everything after the > marker is parsed as normal Markdown, so you can quote a whole section of a document. Prefix every line, including the lines of a fenced code block and the blank lines between elements.',
        code: '> ### Release notes\n>\n> - Faster PDF export\n> - New dark theme\n>\n> ```bash\n> npm install mdtool\n> ```',
      },
      {
        heading: 'Quotes with attribution',
        body: 'Markdown has no citation syntax. The common convention is a final line starting with an em dash, separated from the quote by a > line so it renders as its own paragraph. Where HTML is allowed, wrap the source in a <cite> tag for semantic markup.',
        code: '> Simplicity is prerequisite for reliability.\n>\n> — Edsger W. Dijkstra',
      },
      {
        heading: 'Lazy continuation lines',
        body: 'CommonMark lets you drop the > on continuation lines of a paragraph that is already inside a quote, so hard-wrapped text pasted from an email still stays quoted. It is convenient but fragile: a list marker or a blank line on an unprefixed line ends the quote. Prefixing every line is the safer habit.',
        code: '> This paragraph starts in a quote\nand this lazy line is still part of it.\n\nThis paragraph is outside the quote.',
      },
      {
        heading: 'Where blockquotes work',
        body: 'Blockquotes are core Markdown and render nearly everywhere, but a few apps attach a different meaning to the > key.',
        table: {
          headers: ['Platform', 'Syntax', 'Note'],
          rows: [
            ['GitHub, GitLab', '> text', 'Also used for alert callouts'],
            ['Obsidian', '> text', '> [!type] turns a quote into a callout'],
            ['VS Code preview', '> text', '—'],
            ['Notion', '" then space', 'Typing > then space creates a toggle, not a quote'],
            ['Reddit', '> text', 'Blank line needed to end the quote'],
            ['Discord', '> one line, >>> rest of message', 'No nesting'],
          ],
        },
      },
      {
        heading: 'Common pitfalls',
        body: 'A quote that will not end needs a truly blank line after it. A quote that swallows a code sample usually has the code indented four spaces after the >, which turns it into an indented code block. And a line that should start with a literal > (a shell prompt in prose, say) needs escaping as \\> so it is not read as a quote.',
      },
    ],
    faqs: [
      {
        q: 'How do I end a blockquote in Markdown?',
        a: 'Leave a completely blank line (no > marker). The next non-prefixed paragraph starts outside the quote.',
      },
      {
        q: 'How do I make a note or warning box in Markdown?',
        a: 'On GitHub and GitLab, start a blockquote with > [!NOTE] or > [!WARNING] on its own line. Obsidian supports the same idea with more types. Other renderers show it as a plain quote, so use > **Note:** text as a fallback.',
      },
      {
        q: 'Why does typing > in Notion create a toggle instead of a quote?',
        a: 'Notion maps > plus space to its toggle block. Type a double quote (") followed by a space to create a quote block.',
      },
      {
        q: 'How do I quote a message in Discord?',
        a: 'Start the line with > and a space for a single-line quote, or >>> and a space to quote everything after it in the message. Discord does not support nested quotes.',
      },
    ],
    relatedTool: { href: '/markdown-to-word', label: 'Markdown to Word Converter' },
    related: ['callouts', 'collapsible-sections', 'escaping-characters'],
  },
  {
    slug: 'strikethrough',
    title: 'Markdown Strikethrough',
    metaTitle: 'Markdown Strikethrough: How to Cross Out Text',
    metaDescription:
      'How to cross out text in Markdown: wrap it in double tildes (~~text~~). Where strikethrough works, single-tilde behavior, and converting it to other formats.',
    answer:
      'Cross out text in Markdown by wrapping it in double tildes: ~~struck through~~. Strikethrough is a GitHub Flavored Markdown extension supported by most modern renderers.',
    sections: [
      {
        heading: 'Strikethrough syntax',
        body: 'Double tildes are the portable form. The GFM spec also accepts single tildes, but many other parsers only recognize the pair, so always use two.',
        code: '~~This price is outdated.~~ New price: $0 — MDTool is free.',
      },
      {
        heading: 'Compatibility',
        body: 'Strikethrough is not part of core Markdown or CommonMark. It works on GitHub, GitLab, Discord, Obsidian, and in MDTool converters (PDF, HTML as <del>, and Word), but strict CommonMark parsers render the tildes literally.',
      },
      {
        heading: 'Where strikethrough works',
        body: 'Nearly every modern editor and chat app supports crossing out text, but a few use a single tilde or a toolbar shortcut instead of the double-tilde syntax.',
        table: {
          headers: ['Platform', 'Syntax', 'Note'],
          rows: [
            ['GitHub', '~~text~~ (or ~text~)', 'Renders as <del>'],
            ['GitLab', '~~text~~', '—'],
            ['Obsidian', '~~text~~', 'Also has a "Toggle strikethrough" command'],
            ['VS Code preview', '~~text~~', 'Double tildes only'],
            ['Notion', '~text~ while typing', 'Or Cmd/Ctrl+Shift+S'],
            ['Reddit, Discord', '~~text~~', '—'],
            ['Slack', '~text~', 'Uses single tildes'],
          ],
        },
      },
      {
        heading: 'HTML alternatives: <del> and <s>',
        body: 'Where inline HTML is allowed — including GitHub — you can write the tags directly. <del> marks content that was removed, such as an edit in a changelog, and is what ~~ produces. <s> marks text that is no longer accurate or relevant, like an old price. Both look the same; the difference is meaning for screen readers and search engines. Pair <del> with <ins> to show a replacement.',
        code: 'Deadline: <del>Friday</del> <ins>Monday</ins>\nPrice: <s>$49</s> Free',
      },
      {
        heading: 'Strikethrough in tables, links and lists',
        body: 'Tildes work inside table cells like any other inline formatting. To cross out a link, put the tildes outside the brackets so the whole link is struck; put them inside to strike only part of the link text. Struck-through list items are a common way to show finished or cancelled tasks.',
        code: '| Plan | Price |\n|------|-------|\n| Pro  | ~~$49~~ Free |\n\n~~[Old documentation](https://example.com/v1)~~\n[~~Old~~ New documentation](https://example.com/v2)\n\n- ~~Cancelled: print handouts~~',
      },
      {
        heading: 'Combining with bold, italic and code',
        body: 'Strikethrough nests with other emphasis. Put the tildes inside the asterisks or the other way round — both render. Inside inline code, tildes are shown literally, so wrap the code span instead.',
        code: '**~~bold and struck~~**\n*~~italic and struck~~*\n~~`deprecatedFunction()`~~',
      },
    ],
    faqs: [
      {
        q: 'What HTML does Markdown strikethrough produce?',
        a: 'GFM renders ~~text~~ as a <del> element, which is also what MDTool’s Markdown to HTML converter outputs.',
      },
      {
        q: 'Is there a keyboard shortcut for strikethrough?',
        a: 'Not in Markdown itself. VS Code has none built in; the Markdown All in One extension toggles strikethrough with Alt+S on Windows. Obsidian has a "Toggle strikethrough" command you can bind under Settings → Hotkeys. Notion uses Cmd/Ctrl+Shift+S.',
      },
      {
        q: 'Should I use one tilde or two?',
        a: 'Two. GitHub accepts ~one~ as well, but VS Code’s preview and many other parsers only recognize ~~two~~, and three or more tildes never strike text through.',
      },
      {
        q: 'Why are my tildes showing instead of a line through the text?',
        a: 'Either the renderer does not support the GFM strikethrough extension, there is a space just inside the tildes (~~ text ~~), or the text spans a blank line, which ends the formatting. Keep the tildes tight against the words and within one paragraph.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
    related: ['bold-and-italic', 'checkboxes', 'escaping-characters'],
  },
  {
    slug: 'line-breaks',
    title: 'Line Breaks in Markdown',
    metaTitle: 'Markdown Line Break & New Line — Syntax',
    metaDescription:
      'How to force a new line in Markdown: two trailing spaces, a backslash, or <br>. Why single newlines collapse into one paragraph and how renderers differ.',
    answer:
      'Force a line break in Markdown by ending the line with two spaces, or with a backslash, or by inserting the HTML tag <br>. A single newline alone does not break the line — it joins into the same paragraph.',
    sections: [
      {
        heading: 'The three ways to break a line',
        body: 'Two trailing spaces are the classic syntax but invisible in editors and often stripped by formatters; the backslash and <br> are explicit and survive reformatting.',
        code: 'Line one·· (two trailing spaces)\nLine two\\\nLine three<br>Line four',
      },
      {
        heading: 'Paragraphs vs line breaks',
        body: 'A blank line starts a new paragraph (with vertical spacing). A line break keeps the text in the same paragraph on a new line. Single newlines in the source are collapsed to a space in standard Markdown — although some renderers (Obsidian, many chat apps) treat every newline as a break.',
      },
      {
        heading: 'How each platform treats a single newline',
        body: 'The same file can look different depending on where it is rendered, because some platforms switch on "hard line breaks" and turn every newline into a <br>.',
        table: {
          headers: ['Platform', 'Single newline', 'Note'],
          rows: [
            ['GitHub .md files', 'Joined into one line', 'Standard GFM behavior'],
            ['GitHub issues, PRs, comments', 'Line break', 'Comments use hard line breaks'],
            ['Obsidian', 'Line break', 'Unless "Strict line breaks" is turned on'],
            ['VS Code preview', 'Joined', 'Setting markdown.preview.breaks changes it'],
            ['Discord', 'Line break', 'Every newline in a message is kept'],
            ['Notion', 'New block on Enter', 'Shift+Enter adds a line break inside a block'],
            ['MDTool converters', 'Line break', 'Single newlines are kept as breaks'],
          ],
        },
      },
      {
        heading: 'Line breaks inside a table cell',
        body: 'A table row must stay on one source line, so trailing spaces and backslash breaks cannot work there. Use the <br> tag inside the cell — GitHub, GitLab and most GFM renderers accept it.',
        code: '| Step | Details |\n|------|---------|\n| Install | Download the file<br>Run the installer |',
      },
      {
        heading: 'Line breaks inside list items',
        body: 'To start a new line within a single bullet without creating a new bullet, end the line with a backslash (or two spaces) and indent the next line to match the item text. For a full new paragraph inside the item, leave a blank line instead.',
        code: '- Name: MDTool\\\n  Type: Markdown converter\n- Second item\n\n  A separate paragraph in the second item.',
      },
      {
        heading: 'Adding extra blank space',
        body: 'Several blank lines in a row collapse into one paragraph gap, so pressing Enter repeatedly adds no space. To force extra vertical space, put <br> on its own line or a non-breaking space entity (&nbsp;) as a paragraph of its own. Use it sparingly: headings and paragraphs usually give enough rhythm, and extra space often looks odd in PDF exports.',
        code: 'First paragraph.\n\n&nbsp;\n\nParagraph after an extra gap.\n\n<br>\n<br>\n\nParagraph after more space.',
      },
      {
        heading: 'Which method to choose',
        body: 'Prefer the backslash: it is part of CommonMark and GFM, visible in the source, and survives editors and formatters that trim trailing whitespace (EditorConfig’s trim_trailing_whitespace setting, for example, silently deletes two-space breaks). Use <br> in table cells and HTML blocks. Use trailing spaces only when you must support an old parser that predates the backslash rule.',
      },
    ],
    faqs: [
      {
        q: 'Why does pressing Enter once not create a new line in Markdown?',
        a: 'Standard Markdown collapses single newlines into a space so that source files can be hard-wrapped. End the line with two spaces or a backslash to force the break.',
      },
      {
        q: 'How do I add a blank line or extra space in Markdown?',
        a: 'Extra empty lines are ignored. Put &nbsp; or <br> on its own line, surrounded by blank lines, to add visible vertical space.',
      },
      {
        q: 'How do I break a line inside a Markdown table cell?',
        a: 'Use the HTML tag <br> inside the cell, for example "Line one<br>Line two". Trailing spaces and backslashes do not work because each table row must be a single source line.',
      },
      {
        q: 'Does the backslash line break work on GitHub?',
        a: 'Yes. A backslash at the end of a line is a hard line break in CommonMark, and GitHub Flavored Markdown inherits it, so it works in READMEs, issues and comments.',
      },
    ],
    relatedTool: { href: '/word-to-markdown', label: 'Word to Markdown Converter' },
    related: ['tables', 'lists', 'horizontal-rules'],
  },
  {
    slug: 'definition-lists',
    title: 'Markdown Definition Lists',
    metaTitle: 'Markdown Definition List — Term & Description Syntax',
    metaDescription:
      'How to write definition lists in Markdown: the term-plus-colon syntax, which parsers support it (and that GitHub does not), plus portable alternatives.',
    answer:
      'Write a definition list in Markdown (where supported) by putting the term on one line and each definition on the next line prefixed with a colon and space. GitHub does not support this syntax — use bold terms with indented text as a portable fallback.',
    sections: [
      {
        heading: 'Definition list syntax',
        body: 'This is a Markdown Extra / PHP Markdown extension, supported by Pandoc, Python-Markdown, and some static site generators — but not by GitHub Flavored Markdown or CommonMark.',
        code: 'Markdown\n: A plain-text formatting syntax created in 2004.\n\nGFM\n: GitHub Flavored Markdown, GitHub’s superset of CommonMark.',
      },
      {
        heading: 'Portable alternative',
        body: 'For GitHub READMEs and maximum compatibility, fake it with bold terms — it renders acceptably everywhere.',
        code: '**Markdown**  \nA plain-text formatting syntax created in 2004.\n\n**GFM**  \nGitHub’s superset of CommonMark.',
      },
      {
        heading: 'HTML <dl> lists on GitHub',
        body: 'When you want a real definition list on GitHub, write it in HTML. GitHub’s sanitizer allows the <dl>, <dt> and <dd> tags, so the result is semantic markup that browsers indent automatically and screen readers announce as a list of terms.',
        code: '<dl>\n  <dt>Markdown</dt>\n  <dd>A plain-text formatting syntax created in 2004.</dd>\n  <dt>GFM</dt>\n  <dd>GitHub Flavored Markdown, a superset of CommonMark.</dd>\n</dl>',
      },
      {
        heading: 'Multiple terms and multiple definitions',
        body: 'In parsers that support the colon syntax, a term can have several definitions — one colon line each — and PHP Markdown Extra also lets several terms share one definition by stacking them. Pandoc additionally accepts a tilde as the marker, and lets a definition span several paragraphs when the extra paragraphs are indented.',
        code: 'Converter\n: A tool that changes a file from one format to another.\n: In MDTool, a page such as Markdown to PDF.\n\nPDF\nPortable Document Format\n: A fixed-layout file format for sharing documents.',
      },
      {
        heading: 'Which parsers support definition lists',
        body: 'Support depends entirely on the parser or its extensions, which is why definition lists are the least portable syntax on this cheat sheet.',
        table: {
          headers: ['Renderer', 'Colon syntax', 'Note'],
          rows: [
            ['Pandoc', 'Yes', 'definition_lists extension, on by default'],
            ['PHP Markdown Extra', 'Yes', 'Where the syntax comes from'],
            ['Hugo (Goldmark)', 'Yes', 'Enabled by default'],
            ['Jekyll (kramdown)', 'Yes', '—'],
            ['MkDocs, Python-Markdown', 'With def_list extension', 'Add it to markdown_extensions'],
            ['GitHub, GitLab', 'No', 'Use <dl> HTML or bold terms'],
            ['Obsidian, VS Code preview', 'No', 'Plugins can add it'],
          ],
        },
      },
      {
        heading: 'A table as a glossary',
        body: 'For a short glossary with one-line definitions, a two-column table is often clearer than any definition list, works on every GFM platform, and converts cleanly to PDF and Word. Switch to bold terms or <dl> when definitions run to several sentences, because long text in table cells becomes hard to read.',
        code: '| Term | Definition |\n|------|------------|\n| Markdown | Plain-text formatting syntax |\n| GFM | GitHub Flavored Markdown |\n| CommonMark | A strict Markdown specification |',
      },
    ],
    faqs: [
      {
        q: 'Do definition lists work on GitHub?',
        a: 'No. GitHub Flavored Markdown renders the colon syntax as plain text. Use bold terms followed by an indented or line-broken description, or inline HTML <dl>/<dt>/<dd> tags, which GitHub does allow.',
      },
      {
        q: 'How do I make a glossary in a GitHub README?',
        a: 'Use an HTML <dl> list with <dt> for each term and <dd> for its definition, or a two-column Markdown table for short definitions. Both render correctly on GitHub.',
      },
      {
        q: 'Does Obsidian support definition lists?',
        a: 'Not natively. The colon syntax shows as plain text in Obsidian. Use bold terms followed by a line break, or a community plugin that adds definition list rendering.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
    related: ['lists', 'tables', 'bold-and-italic'],
  },
  {
    slug: 'callouts',
    title: 'Markdown Callouts (Alerts & Admonitions)',
    metaTitle: 'Markdown Callouts: GitHub Alerts & Note Boxes',
    metaDescription:
      'Make callout boxes in Markdown: GitHub alerts like > [!NOTE] and > [!WARNING], Obsidian and GitLab callouts, and a fallback that works everywhere.',
    answer:
      'Create a callout in Markdown by starting a blockquote with an alert type in brackets: "> [!NOTE]" on the first line, then "> your text" on the lines below. GitHub supports five types: NOTE, TIP, IMPORTANT, WARNING and CAUTION. GitLab and Obsidian use the same pattern; everywhere else, fall back to a blockquote with a bold label.',
    sections: [
      {
        heading: 'GitHub alert syntax',
        body: 'Put the type keyword alone on the first line of the blockquote, in uppercase inside [! and ]. Every following line of the callout needs its own > prefix, including blank lines between paragraphs. GitHub renders each type as a colored box with its own icon and a title matching the type name.',
        code: '> [!NOTE]\n> Useful information users should know, even when skimming.\n\n> [!TIP]\n> Helpful advice for doing things better or more easily.\n\n> [!IMPORTANT]\n> Key information users need to achieve their goal.\n\n> [!WARNING]\n> Urgent info that needs immediate attention to avoid problems.\n\n> [!CAUTION]\n> Advises about risks or negative outcomes of certain actions.',
        note: 'GitHub’s own docs recommend no more than one or two alerts per article, and alerts cannot be nested inside other elements such as lists or other blockquotes.',
      },
      {
        heading: 'Which alert type to use',
        body: 'The five types form a rough scale of urgency. Pick the lowest level that fits — a README where everything is a WARNING trains readers to skip all of them.',
        table: {
          headers: ['Type', 'Color on GitHub', 'Use it for'],
          rows: [
            ['[!NOTE]', 'Blue', 'Background or side information worth knowing'],
            ['[!TIP]', 'Green', 'Optional shortcuts and better ways to do something'],
            ['[!IMPORTANT]', 'Purple', 'Information the reader needs to succeed'],
            ['[!WARNING]', 'Yellow', 'Problems the reader should act on right away'],
            ['[!CAUTION]', 'Red', 'Actions with risky or irreversible consequences'],
          ],
        },
      },
      {
        heading: 'Obsidian callouts',
        body: 'Obsidian uses the same opener but is case-insensitive and supports many more types: note, abstract, info, todo, tip, success, question, warning, failure, danger, bug, example and quote, plus aliases such as hint, caution, faq and error. Text after the brackets replaces the default title, and a + or - straight after the brackets makes the callout foldable (expanded or collapsed by default). Callouts can also be nested.',
        code: '> [!tip] Faster exports\n> Save your theme once and reuse it.\n\n> [!faq]- Why is this collapsed?\n> The minus sign hides the body until it is clicked.\n\n> [!question] Can callouts be nested?\n> > [!todo] Yes\n> > Add another level of > markers.',
      },
      {
        heading: 'GitLab alerts and custom titles',
        body: 'GitLab added the same five alert types in GitLab 17.10. Unlike GitHub, GitLab lets you override the title by writing text on the same line as the type. On GitHub, keep the marker alone on its line — extra text there stops the blockquote from becoming an alert.',
        code: '> [!warning] Data deletion\n> The following steps make your data unrecoverable.',
      },
      {
        heading: 'Portable fallback: a blockquote with a bold label',
        body: 'Renderers without alert support — VS Code’s built-in preview, Reddit, Discord and most PDF and Word converters — show "[!NOTE]" as literal text inside an ordinary quote. When a document has to look right everywhere, write the label yourself. It reads naturally on every platform and still stands out visually.',
        code: '> **Note:** The converter runs entirely in your browser.\n\n> **Warning:** Back up the file before running the script.',
      },
      {
        heading: 'Where callouts work',
        body: 'The [!TYPE] syntax is an extension built on top of blockquotes, so unsupported renderers degrade gracefully to a normal quote rather than breaking the page.',
        table: {
          headers: ['Platform', 'Callout syntax', 'What you get'],
          rows: [
            ['GitHub', '> [!NOTE] and the four other types', 'Colored alert box with icon'],
            ['GitLab (17.10+)', '> [!note], custom title allowed', 'Alert box'],
            ['Obsidian', '> [!note] plus 12 more types and aliases', 'Callout, optionally foldable'],
            ['VS Code preview', 'Not built in (extensions add it)', 'Plain blockquote showing [!NOTE]'],
            ['Notion', 'No Markdown syntax; use the /callout block', 'Callout block in the editor'],
            ['Reddit, Discord', 'Not supported', 'Plain quote'],
          ],
        },
      },
      {
        heading: 'Common pitfalls',
        body: 'Most broken callouts come from five mistakes: a continuation line without its > prefix (the callout ends early), a blank line without > (the quote splits in two), a missing exclamation mark ([NOTE] instead of [!NOTE]), a misspelled type such as [!WARN] or [!INFO] on GitHub, and placing the alert inside a list item, where GitHub ignores it.',
      },
    ],
    faqs: [
      {
        q: 'How do I make a warning box in Markdown?',
        a: 'On GitHub and GitLab, start a blockquote with "> [!WARNING]" on its own line and put the message on the next line, also prefixed with >. In Obsidian use "> [!warning]". Anywhere else, use "> **Warning:** your text" as a portable fallback.',
      },
      {
        q: 'What are the five GitHub alert types?',
        a: 'NOTE, TIP, IMPORTANT, WARNING and CAUTION. They must be written in square brackets with an exclamation mark, as the first line of a blockquote: > [!NOTE].',
      },
      {
        q: 'Can I change the title of a GitHub alert?',
        a: 'No. GitHub always shows the type name as the title. GitLab and Obsidian both accept custom titles written after the type on the same line, for example "> [!warning] Data deletion".',
      },
      {
        q: 'Why does my [!NOTE] show up as plain text?',
        a: 'The renderer does not support alerts (VS Code preview, Reddit and many converters do not), or the syntax is off: check the exclamation mark, the spelling of the type, and that [!NOTE] is alone on the first line of the quote.',
      },
      {
        q: 'How do I make a collapsible callout?',
        a: 'In Obsidian, add a minus sign after the type: "> [!note]- Title". GitHub alerts cannot collapse, so on GitHub use an HTML <details> and <summary> block instead — see the collapsible sections guide.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
    related: ['blockquotes', 'collapsible-sections', 'escaping-characters'],
  },
  {
    slug: 'collapsible-sections',
    title: 'Collapsible Sections in Markdown',
    metaTitle: 'Markdown Collapsible Section (Details & Summary)',
    metaDescription:
      'Make a collapsible section or dropdown in Markdown with <details> and <summary>: the blank-line rule, opening it by default, and where it renders.',
    answer:
      'Markdown has no native collapsible syntax, so use the HTML <details> and <summary> tags. The summary text becomes the clickable label, and everything else inside <details> stays hidden until the reader expands it. Leave a blank line after the summary line so Markdown inside the section renders. GitHub, GitLab and most HTML-friendly renderers support it.',
    sections: [
      {
        heading: 'Basic details and summary syntax',
        body: 'Wrap the hidden content in <details>, and put a <summary> element first to act as the label. Readers see only the label with a small arrow until they click it.',
        code: '<details>\n<summary>Click to expand</summary>\n\nHidden content goes here. **Markdown** works\nbecause of the blank line above.\n\n- Lists\n- Images\n- Code blocks\n\n</details>',
      },
      {
        heading: 'Why the blank line matters',
        body: 'Under CommonMark rules, an HTML block runs until the next blank line, and everything in it is passed through as raw HTML. Without a blank line after </summary>, the text that follows is still part of that HTML block, so **bold** and - list markers appear literally. The blank line ends the HTML block and switches the parser back to Markdown. Put another blank line before </details> for the same reason.',
        code: '<details>\n<summary>Broken</summary>\n**This stays literal**\n</details>\n\n<details>\n<summary>Fixed</summary>\n\n**This renders bold**\n\n</details>',
      },
      {
        heading: 'Open by default',
        body: 'Add the open attribute to show the content expanded when the page loads. Readers can still collapse it.',
        code: '<details open>\n<summary>Installation steps</summary>\n\n1. Download the file\n2. Run the installer\n\n</details>',
      },
      {
        heading: 'Code blocks and nested sections',
        body: 'Fenced code blocks work inside details as long as they are surrounded by blank lines. Sections can also be nested, which is handy for long changelogs or FAQ lists in a README. Do not indent the content by four spaces — indentation turns it into an indented code block.',
        code: '<details>\n<summary>Show the config</summary>\n\n```json\n{ "theme": "github", "pageSize": "a4" }\n```\n\n<details>\n<summary>Advanced options</summary>\n\nNested content.\n\n</details>\n\n</details>',
      },
      {
        heading: 'When to collapse content',
        body: 'Collapsible sections keep a README or issue scannable without deleting detail. Good candidates are long logs and stack traces in bug reports, full configuration files, optional platform-specific install steps, screenshots that support but do not drive the text, and the answers in an FAQ. Keep anything a reader needs on a first pass — the summary, the quick-start command, warnings — visible, because many readers never expand a section.',
        code: '<details>\n<summary>Full error log</summary>\n\n```text\nError: ENOENT: no such file or directory\n    at Object.openSync (node:fs:601:3)\n```\n\n</details>',
      },
      {
        heading: 'Where collapsible sections work',
        body: 'Support depends on whether the renderer allows raw HTML. Platforms that strip HTML need their own feature instead.',
        table: {
          headers: ['Platform', 'details/summary', 'Alternative'],
          rows: [
            ['GitHub', 'Yes: READMEs, issues, PRs, comments, wikis', '—'],
            ['GitLab', 'Yes, Markdown inside with blank lines', '—'],
            ['Obsidian', 'Renders, but Markdown inside HTML is not processed', 'Foldable callout: > [!note]-'],
            ['VS Code preview', 'Yes', '—'],
            ['Notion', 'No HTML', 'Toggle block: type > then space'],
            ['Reddit', 'No HTML', 'Spoiler: >!hidden text!<'],
            ['Discord', 'No HTML', 'Spoiler: ||hidden text||'],
            ['Hugo', 'Only with markup.goldmark.renderer.unsafe = true', '—'],
          ],
        },
      },
      {
        heading: 'Common pitfalls',
        body: 'Missing blank lines are the number one cause of broken dropdowns. Others: putting text before <summary> (the label must come first), using Markdown formatting inside the summary itself (it sits inside the HTML block, so use <b> or <code> tags there instead), and indenting the content, which creates a code block. Also remember that in PDF or print output there is nothing to click, so collapsible content is a web-only feature.',
      },
    ],
    faqs: [
      {
        q: 'How do I make a dropdown in Markdown?',
        a: 'Use HTML: <details><summary>Label</summary> followed by a blank line, your content, another blank line, and </details>. Markdown itself has no dropdown or toggle syntax.',
      },
      {
        q: 'How do I hide a section in a GitHub README?',
        a: 'Wrap it in <details> with a <summary> label. GitHub renders it as a collapsed section that readers can expand. To hide text completely, so it never displays, use an HTML comment instead: <!-- hidden -->.',
      },
      {
        q: 'Why isn’t Markdown rendering inside my details block?',
        a: 'You are missing the blank line after </summary> (and before </details>). Without it, the parser treats the content as raw HTML and shows the Markdown symbols literally.',
      },
      {
        q: 'Do collapsible sections work in Obsidian or Notion?',
        a: 'Obsidian displays details blocks but does not parse Markdown inside HTML, so a foldable callout ("> [!note]- Title") works better. Notion ignores HTML; type > followed by a space to create a toggle block instead.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
    related: ['callouts', 'code-blocks', 'escaping-characters'],
  },
  {
    slug: 'escaping-characters',
    title: 'Escaping Characters in Markdown',
    metaTitle: 'Markdown Escape Characters: Backslash & Brackets',
    metaDescription:
      'Escape characters in Markdown with a backslash: the full list of escapable characters, angle and square brackets, backticks in code, and pipes in tables.',
    answer:
      'Escape a character in Markdown by putting a backslash in front of it: \\* displays a literal asterisk instead of starting italics. In CommonMark and GitHub Flavored Markdown, any ASCII punctuation character can be backslash-escaped. Inside inline code and code blocks no escaping is needed, because everything there is already shown literally.',
    sections: [
      {
        heading: 'Backslash escapes',
        body: 'A backslash tells the parser to treat the next character as plain text. Use it whenever a character would otherwise trigger formatting: an asterisk around a word, a hash at the start of a line, or a number followed by a period that would start a list.',
        code: '\\*not italic\\*\n\\# Not a heading\n2026\\. A line that starts with a year\n\\[not a link\\](https://example.com)\n\\_\\_init\\_\\_.py',
      },
      {
        heading: 'Characters you can escape',
        body: 'CommonMark allows a backslash before any ASCII punctuation character: ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~. A backslash before anything else, such as a letter, is shown literally. These are the ones you will actually need:',
        table: {
          headers: ['Character', 'Write', 'Escape it when'],
          rows: [
            ['* asterisk', '\\*', 'Text would turn italic or bold, or a line starts a list'],
            ['_ underscore', '\\_', 'Underscores surround a word (_name_)'],
            ['# hash', '\\#', 'A line starts with # and should not be a heading'],
            ['- + list markers', '\\- \\+', 'A line starts with them followed by a space'],
            ['. after a number', '1\\.', 'A line starts with a number and period'],
            ['[ ] brackets', '\\[ \\]', 'Bracketed text is followed by (…) or matches a reference'],
            ['< > angle brackets', '\\< or &lt;', 'Text looks like an HTML tag'],
            ['` backtick', '\\`', 'A literal backtick appears in normal text'],
            ['| pipe', '\\|', 'Inside a table cell'],
            ['\\ backslash', '\\\\', 'You want the backslash itself to show'],
            ['~ tilde', '\\~', 'Paired tildes would strike text through'],
          ],
        },
      },
      {
        heading: 'Angle brackets: showing <> in Markdown',
        body: 'Markdown passes HTML through, so a < followed by letters looks like a tag. GitHub removes tags it does not recognize, which means List<String> can render as just "List". Escape the opening bracket, use the HTML entity &lt;, or put the text in inline code.',
        code: 'List\\<String\\>\nList&lt;String&gt;\n`List<String>`\n\\<br> shows the tag instead of breaking the line',
      },
      {
        heading: 'Square brackets that are not links',
        body: 'Brackets only become a link when followed by a URL in parentheses or when the text matches a reference definition, so [draft] on its own usually displays fine. Escape them when parentheses follow, or at the start of a list item where "[ ]" would turn into a checkbox.',
        code: '\\[1\\](see appendix) stays as text\n- \\[ \\] literal brackets, not a task list checkbox',
      },
      {
        heading: 'Backticks inside code',
        body: 'Backslash escapes do not work inside code spans — the backslash is shown as-is. To show a backtick inside inline code, wrap the code in two backticks with spaces inside. To show a fenced block inside a code block, use a longer fence on the outside.',
        code: '`` `backtick` ``\n\n````markdown\n```js\nconsole.log("fenced");\n```\n````',
      },
      {
        heading: 'Pipes in tables',
        body: 'A pipe inside a table cell ends the cell, even inside inline code. Escape it with a backslash; GitHub Flavored Markdown removes the backslash in the output, including within code spans.',
        code: '| Operator | Meaning |\n|----------|---------|\n| `a \\| b` | Bitwise OR |\n| \\|\\| | Logical OR |',
      },
      {
        heading: 'Where backslash escapes work',
        body: 'Escaping is part of core Markdown, so support is nearly universal. The exceptions are places that are not rendered as Markdown at all.',
        table: {
          headers: ['Platform', 'Backslash escapes', 'Note'],
          rows: [
            ['GitHub', 'Yes', 'Not applied in issue and pull request titles'],
            ['GitLab', 'Yes', '—'],
            ['Obsidian', 'Yes', 'Also needed for # tags you do not want tagged'],
            ['VS Code preview', 'Yes', '—'],
            ['Reddit', 'Yes', '—'],
            ['Discord', 'Yes', 'e.g. \\*\\*not bold\\*\\*'],
          ],
        },
      },
    ],
    faqs: [
      {
        q: 'How do I escape an asterisk in Markdown?',
        a: 'Put a backslash before it: \\*. For a whole word, escape both sides: \\*important\\* displays *important* with the asterisks visible.',
      },
      {
        q: 'How do I show angle brackets (<>) in Markdown?',
        a: 'Escape the opening bracket (\\<tag>), use the HTML entities &lt; and &gt;, or wrap the text in backticks so it renders as code. Otherwise renderers like GitHub may treat it as an HTML tag and hide it.',
      },
      {
        q: 'How do I write a literal backslash?',
        a: 'Escape it with another backslash: \\\\ displays a single \\. Inside inline code or a code block, a single backslash is shown as-is.',
      },
      {
        q: 'Why does my backslash show up inside code?',
        a: 'Backslash escapes do not work in code spans or code blocks — everything inside is literal, including the backslash. Remove it; inside code you never need to escape Markdown characters.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
    related: ['code-blocks', 'tables', 'links'],
  },
  {
    slug: 'horizontal-rules',
    title: 'Markdown Horizontal Rules (Dividers)',
    metaTitle: 'Markdown Horizontal Rule & Divider Line Syntax',
    metaDescription:
      'Add a horizontal rule or divider in Markdown with ---, *** or ___, avoid the pitfall that turns text above it into a heading, and see how it looks on GitHub.',
    answer:
      'Create a horizontal rule (a divider line) in Markdown by putting three or more hyphens (---), asterisks (***) or underscores (___) alone on a line. All three produce the same <hr> element. Leave a blank line above a --- rule, otherwise the line of text directly above it becomes a heading instead of being followed by a divider.',
    sections: [
      {
        heading: 'Horizontal rule syntax',
        body: 'You can use more than three characters and put spaces between them, and the line may be indented by up to three spaces. Nothing else may appear on the line, and the characters cannot be mixed: -*- is not a rule.',
        code: 'Text above.\n\n---\n\n***\n\n___\n\n- - -\n\n* * * * *',
      },
      {
        heading: 'The setext-heading pitfall',
        body: 'A line of hyphens directly under a line of text is the "setext" syntax for an H2 heading, and the CommonMark spec says the heading interpretation wins. That is why a paragraph suddenly turns big and bold when you add a divider under it. Add a blank line, or use *** which never creates a heading.',
        code: 'This line becomes an H2 heading\n---\n\nThis line stays a paragraph\n\n---',
      },
      {
        heading: 'Dividers on GitHub',
        body: 'GitHub renders a rule as a thin grey line. H1 and H2 headings already have a bottom border on GitHub, so a rule straight under one of them looks like a double line. Also avoid --- as the very first line of a file: GitHub, Jekyll, Hugo and most static site generators read a block opened by --- at the top of a file as YAML front matter.',
        note: 'GitHub strips style attributes, so you cannot change the color or thickness of a divider in a README.',
      },
      {
        heading: 'Styled dividers with HTML',
        body: 'Where raw HTML and inline styles are allowed (your own site, VS Code preview, HTML exports), an <hr> tag can be styled. On GitHub, only the plain line appears.',
        code: '<hr>\n\n<hr style="border: 0; border-top: 2px dashed #9ca3af;">',
      },
      {
        heading: 'When to use a divider',
        body: 'Use a rule for a change of topic that does not deserve a heading of its own: between a README’s badges and its body, before a footer or license note, between entries in a changelog or between letters in a single long note. If the new part has a name, a heading is better — it creates an anchor link and an entry in generated tables of contents, which a rule does not. In slide tools built on Markdown, such as Marp, a --- line separates slides.',
        code: '![Build](badge.svg) ![License](license.svg)\n\n---\n\nMDTool converts Markdown to PDF, HTML and Word.\n\n***\n\nReleased under the MIT License.',
      },
      {
        heading: 'Horizontal rules are not page breaks',
        body: 'A rule is a visual line, not a print instruction. When you convert Markdown to PDF, --- draws a line and the content continues on the same page. To force a new page, use a page break marker instead — see the page breaks guide.',
      },
      {
        heading: 'Where horizontal rules work',
        body: 'Thematic breaks are core Markdown, so almost every renderer supports them. Chat apps are the main exception.',
        table: {
          headers: ['Platform', 'Supported', 'Note'],
          rows: [
            ['GitHub', 'Yes', '--- at the top of a file is front matter'],
            ['GitLab', 'Yes', '---, *** or ___'],
            ['Obsidian', 'Yes', '--- at the top of a note starts Properties'],
            ['VS Code preview', 'Yes', '—'],
            ['Notion', 'Yes', 'Typing --- creates a divider block'],
            ['Reddit', 'Yes', 'Three or more -, * or _'],
            ['Discord', 'No', 'Shows the characters literally'],
          ],
        },
      },
    ],
    faqs: [
      {
        q: 'How do I add a divider line in Markdown?',
        a: 'Put three hyphens (---), asterisks (***) or underscores (___) on a line by themselves, with a blank line above and below. They all render as a horizontal rule.',
      },
      {
        q: 'Should I use ---, *** or ___?',
        a: 'They are identical in output. --- is the most common, but *** is the safest choice directly after text because it can never be read as a setext heading underline.',
      },
      {
        q: 'Why did my text turn into a heading when I added ---?',
        a: 'A line of hyphens directly under text is setext heading syntax for H2. Add a blank line between the text and the --- to get a divider instead.',
      },
      {
        q: 'Does a horizontal rule create a page break in PDF?',
        a: 'No, it only draws a line. Use a page break marker such as <div style="page-break-after: always;"></div> on its own line to start a new page in MDTool’s Markdown to PDF converter.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
    related: ['headings', 'page-breaks', 'line-breaks'],
  },
  {
    slug: 'page-breaks',
    title: 'Page Breaks in Markdown',
    metaTitle: 'Markdown Page Break: How to Add a New Page in PDF',
    metaDescription:
      'Add a page break in Markdown for PDF export with <!-- pagebreak -->, \\pagebreak, \\newpage or a page-break div, plus Pandoc, VS Code and Typora conventions.',
    answer:
      'Markdown has no native page break syntax, because it was designed for the screen rather than the printed page. To start a new page in a PDF, put a converter-specific marker on its own line — most commonly the HTML <div style="page-break-after: always;"></div>, which MDTool and HTML-to-PDF exporters honor. Pandoc users write \\newpage instead.',
    sections: [
      {
        heading: 'Page breaks in MDTool’s PDF converter',
        body: 'MDTool’s Markdown to PDF converter recognizes four markers. Put any one of them on its own line, with a blank line above and below, and the content after it starts on a new page. The first two are HTML, the third is an HTML comment, and the last two are LaTeX-style commands, so you can keep whichever convention your files already use.',
        code: 'End of chapter one.\n\n<div style="page-break-after: always;"></div>\n\n<div class="page-break"></div>\n\n<!-- pagebreak -->\n\n\\pagebreak\n\n\\newpage\n\n# Chapter two',
      },
      {
        heading: 'Pandoc: \\newpage and \\pagebreak',
        body: 'When Pandoc produces a PDF through LaTeX, raw TeX commands in the Markdown pass straight through to the LaTeX engine, so \\newpage or \\pagebreak on its own line starts a new page. Other output formats ignore raw LaTeX: HTML drops it, and Word (.docx) output has traditionally needed a page-break filter to turn it into a real Word page break.',
        code: 'Introduction ends here.\n\n\\newpage\n\n# Methods\n\n$ pandoc report.md -o report.pdf',
      },
      {
        heading: 'VS Code Markdown PDF, Typora and Obsidian',
        body: 'Desktop tools each have their own convention. The popular Markdown PDF extension for VS Code (yzane) uses a div with the class "page". Typora documents a div with both the old and the new CSS page-break properties, and can also start every H1 on a new page with a CSS rule. Obsidian has no built-in marker; users add a CSS snippet for print (for example turning --- into a page break) or install a page-break plugin.',
        code: '<!-- VS Code: Markdown PDF extension -->\n<div class="page"/>\n\n<!-- Typora -->\n<div style="page-break-after: always; break-after: page;"></div>',
      },
      {
        heading: 'Page break syntax by tool',
        body: 'Use this table to pick the marker for the tool that produces your PDF.',
        table: {
          headers: ['Tool', 'Page break marker', 'Output'],
          rows: [
            ['MDTool Markdown to PDF', 'Page-break div, class="page-break" div, <!-- pagebreak -->, \\pagebreak or \\newpage', 'PDF'],
            ['Pandoc (via LaTeX)', '\\newpage or \\pagebreak', 'PDF'],
            ['VS Code Markdown PDF', '<div class="page"/>', 'PDF'],
            ['Typora', '<div style="page-break-after: always; break-after: page;"></div>', 'PDF, print'],
            ['Obsidian', 'None built in: CSS snippet or plugin', 'PDF export'],
            ['GitHub, GitLab', 'No pages on the web', 'HTML markers are invisible; \\newpage shows as text'],
          ],
        },
      },
      {
        heading: 'Which marker should you use?',
        body: 'If the same file is also read on GitHub, prefer <!-- pagebreak --> or the page-break div: both are invisible on the web, while \\newpage and \\pagebreak appear as literal text there. If you convert only with Pandoc to LaTeX, \\newpage is the natural choice. The style="page-break-after: always;" div is the most portable, since any HTML-based PDF engine understands the CSS.',
      },
      {
        heading: 'Common pitfalls',
        body: 'A marker inside a code block or an indented line is treated as code and does nothing. A marker that shares a line with other text is usually ignored. A horizontal rule (---) only draws a line and never breaks the page. And a marker at the very end of the document, or two markers in a row, can leave an empty page behind.',
      },
    ],
    faqs: [
      {
        q: 'Does Markdown support page breaks?',
        a: 'Not natively. Page breaks come from the converter: HTML-based tools honor a div with page-break-after: always, Pandoc honors \\newpage for LaTeX/PDF output, and MDTool’s PDF converter accepts four markers including <!-- pagebreak -->.',
      },
      {
        q: 'How do I insert a new page in Markdown for PDF?',
        a: 'Put <div style="page-break-after: always;"></div> on its own line, with blank lines around it, where the new page should begin. Then convert with a tool that supports it, such as MDTool’s Markdown to PDF converter.',
      },
      {
        q: 'Why does \\newpage show up as text on GitHub?',
        a: 'GitHub renders Markdown for the web and has no concept of pages, so LaTeX commands are shown as plain text. Use <!-- pagebreak --> or the page-break div instead if the file is also viewed on GitHub — both are invisible there.',
      },
      {
        q: 'How do I add a Seitenumbruch (page break) in Markdown?',
        a: 'The same way as in English documents: Markdown itself has no Seitenumbruch syntax, so insert a converter marker such as <div style="page-break-after: always;"></div> or \\newpage on its own line before exporting to PDF.',
      },
    ],
    relatedTool: { href: '/markdown-to-pdf', label: 'Markdown to PDF Converter' },
    related: ['horizontal-rules', 'tables', 'code-blocks'],
  },
];

export function getGuideTopic(slug: string): GuideTopic | undefined {
  return GUIDE_TOPICS.find((t) => t.slug === slug);
}
