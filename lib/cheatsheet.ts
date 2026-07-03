// Data source for the /markdown-cheat-sheet hub and its syntax spoke pages.
// Each topic renders as its own indexable URL targeting a long-tail syntax query
// ("markdown table", "markdown checklist", ...), with the hub as the cluster root.

export interface SyntaxSection {
  heading: string;
  body: string; // plain prose (no markdown)
  code?: string; // markdown source example
  note?: string; // GFM/compatibility note
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
  },
  {
    slug: 'bold-and-italic',
    title: 'Bold and Italic in Markdown',
    metaTitle: 'Markdown Bold & Italic — Emphasis Syntax',
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
  },
  {
    slug: 'links',
    title: 'Markdown Links',
    metaTitle: 'Markdown Links — Hyperlink Syntax',
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
    ],
    faqs: [
      {
        q: 'How do I open a Markdown link in a new tab?',
        a: 'Pure Markdown has no syntax for that. Use inline HTML instead: <a href="https://example.com" target="_blank" rel="noopener">text</a>. Note that GitHub strips target attributes in READMEs.',
      },
    ],
    relatedTool: { href: '/html-to-markdown', label: 'HTML to Markdown Converter' },
  },
  {
    slug: 'images',
    title: 'Markdown Images',
    metaTitle: 'Markdown Images — Image Embed Syntax',
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
    ],
    faqs: [
      {
        q: 'How do I resize an image in Markdown?',
        a: 'Standard Markdown has no size syntax. Use an inline HTML img tag with a width attribute — GitHub, GitLab, and most static site generators render it.',
      },
    ],
    relatedTool: { href: '/markdown-to-pdf', label: 'Markdown to PDF Converter' },
  },
  {
    slug: 'lists',
    title: 'Markdown Lists',
    metaTitle: 'Markdown Lists — Ordered, Unordered & Nested',
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
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
  },
  {
    slug: 'checkboxes',
    title: 'Markdown Checkboxes (Task Lists)',
    metaTitle: 'Markdown Checkbox — Task List Syntax',
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
    ],
    relatedTool: { href: '/markdown-to-pdf', label: 'Markdown to PDF Converter' },
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
      },
    ],
    faqs: [
      {
        q: 'How do I end a blockquote in Markdown?',
        a: 'Leave a completely blank line (no > marker). The next non-prefixed paragraph starts outside the quote.',
      },
    ],
    relatedTool: { href: '/markdown-to-word', label: 'Markdown to Word Converter' },
  },
  {
    slug: 'strikethrough',
    title: 'Markdown Strikethrough',
    metaTitle: 'Markdown Strikethrough — Cross Out Text',
    metaDescription:
      'How to cross out text in Markdown: wrap it in double tildes (~~text~~). Where strikethrough works, single-tilde behavior, and converting it to other formats.',
    answer:
      'Cross out text in Markdown by wrapping it in double tildes: ~~struck through~~. Strikethrough is a GitHub Flavored Markdown extension supported by most modern renderers.',
    sections: [
      {
        heading: 'Strikethrough syntax',
        body: 'Double tildes are the portable form. Some parsers also accept single tildes, but GitHub’s spec requires the pair, so always use two.',
        code: '~~This price is outdated.~~ New price: $0 — MDTool is free.',
      },
      {
        heading: 'Compatibility',
        body: 'Strikethrough is not part of core Markdown or CommonMark. It works on GitHub, GitLab, Discord, Obsidian, and in MDTool converters (PDF, HTML as <del>, and Word), but strict CommonMark parsers render the tildes literally.',
      },
    ],
    faqs: [
      {
        q: 'What HTML does Markdown strikethrough produce?',
        a: 'GFM renders ~~text~~ as a <del> element, which is also what MDTool’s Markdown to HTML converter outputs.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
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
    ],
    faqs: [
      {
        q: 'Why does pressing Enter once not create a new line in Markdown?',
        a: 'Standard Markdown collapses single newlines into a space so that source files can be hard-wrapped. End the line with two spaces or a backslash to force the break.',
      },
    ],
    relatedTool: { href: '/word-to-markdown', label: 'Word to Markdown Converter' },
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
    ],
    faqs: [
      {
        q: 'Do definition lists work on GitHub?',
        a: 'No. GitHub Flavored Markdown renders the colon syntax as plain text. Use bold terms followed by an indented or line-broken description, or inline HTML <dl>/<dt>/<dd> tags, which GitHub does allow.',
      },
    ],
    relatedTool: { href: '/markdown-to-html', label: 'Markdown to HTML Converter' },
  },
];

export function getGuideTopic(slug: string): GuideTopic | undefined {
  return GUIDE_TOPICS.find((t) => t.slug === slug);
}
