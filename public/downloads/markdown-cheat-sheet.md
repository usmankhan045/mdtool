# Markdown Cheat Sheet

Compact reference for CommonMark and GitHub Flavored Markdown (GFM). Free from mdtool.dev.

## Text

| Element | Syntax |
|---|---|
| Headings 1 to 6 | `# H1` `## H2` ... `###### H6` |
| Bold | `**bold**` |
| Italic | `*italic*` or `_italic_` |
| Bold and italic | `***both***` |
| Strikethrough (GFM) | `~~deleted~~` |
| Inline code | `` `code` `` |
| Paragraph | Leave a blank line between blocks |
| Line break | End the line with two spaces, or use `<br>` |
| Escape a symbol | `\*not italic\*` |
| Hidden comment | `<!-- not rendered -->` |

## Lists, links and images

| Element | Syntax |
|---|---|
| Bulleted list | `- item` (indent to nest) |
| Numbered list | `1. item` |
| Task list (GFM) | `- [ ] to do` and `- [x] done` |
| Link | `[text](https://example.com "title")` |
| Reference link | `[text][id]` then `[id]: https://example.com` |
| Autolink | `<https://example.com>` |
| Heading link | `[Jump](#heading-text)` |
| Image | `![alt text](image.png)` |
| Blockquote | `> quote` (use `>>` to nest) |
| Horizontal rule | `---` on its own line |
| Footnote (GitHub) | `Text[^1]` then `[^1]: The note` |
| Alert (GitHub) | `> [!NOTE]` also TIP, IMPORTANT, WARNING, CAUTION |

## Code blocks

Fence with three backticks and add a language for syntax highlighting:

````
```python
def hello():
    print("Hello, Markdown")
```
````

Use a `mermaid` language tag to draw a diagram on GitHub and in MDTool.

## Tables (GFM)

```
| Left   | Center | Right |
|:-------|:------:|------:|
| a      |   b    |     c |
```

Colons in the separator row set alignment. Escape a pipe inside a cell as `\|`.
