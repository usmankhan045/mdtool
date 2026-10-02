// Starting text for each converter's input box. The server-rendered loading
// shell (ToolLoadingShell) shows the same text in an identical textarea, so
// when the client tool replaces it nothing larger gets painted. A different
// sample in the shell made the client editor the page's late LCP element.

export const PDF_SAMPLE_MARKDOWN = `# Welcome to MDTool

## Code Highlighting Example

\`\`\`javascript
const convert = async (markdown) => {
  const html = await parseMarkdown(markdown);
  await generatePdf(html, { theme: 'github' });
};
\`\`\`

## Table Example

| Feature | MDTool | Others |
|---------|---------|--------|
| Code highlighting | Yes | No |
| Mermaid diagrams | Yes | No |
| Client-side only | Yes | No |
| Free forever | Yes | No |

## Mermaid Diagram

\`\`\`mermaid
graph TD
    A[Markdown] --> B[Parse with marked.js]
    B --> C[Highlight code]
    C --> D[Render Mermaid]
    D --> E[Generate PDF]
\`\`\`

> Start typing or paste your own Markdown on the left!
`;

export const WORD_SAMPLE_MARKDOWN = `# Welcome to MDTool

## Headings and Text

MDTool converts your **Markdown** into a real, editable Word document, not a screenshot.

## Table Example

| Feature | MDTool | Others |
|---------|---------|--------|
| Editable .docx output | ✅ | ❌ |
| Tables preserved | ✅ | ❌ |
| Client-side only | ✅ | ❌ |
| Free forever | ✅ | ❌ |

> Start typing or paste your own Markdown on the left!
`;

export const HTML_SAMPLE_MARKDOWN = `# Welcome to MDTool

## Code Highlighting Example

\`\`\`javascript
const convert = (markdown) => {
  return parseMarkdown(markdown);
};
\`\`\`

## Table Example

| Feature | MDTool | Others |
|---------|---------|--------|
| Code highlighting | ✅ | ❌ |
| Clean HTML output | ✅ | ❌ |
| Client-side only | ✅ | ❌ |
| Free forever | ✅ | ❌ |

> Start typing or paste your own Markdown on the left!
`;

export const HTML_INPUT_SAMPLE = `<h1>Welcome to MDTool</h1>
<h2>Table Example</h2>
<table>
  <tr><th>Feature</th><th>Supported</th></tr>
  <tr><td>Tables</td><td>Yes</td></tr>
  <tr><td>Code blocks</td><td>Yes</td></tr>
</table>
<p>Start typing or paste your own HTML on the left, or <strong>drag and drop</strong> a .html file.</p>
<pre><code class="language-javascript">const hello = () => console.log('Hello world');</code></pre>
<blockquote>Quoted text converts to a Markdown blockquote.</blockquote>
`;
