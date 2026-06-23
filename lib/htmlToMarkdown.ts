import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'inlined',
});

turndownService.use(gfm);

// turndown-plugin-gfm's table cell rule doesn't unwrap <p> tags inside
// <td>/<th> (common in Word/Google Docs HTML), so the default paragraph
// rule's blank-line padding leaks literal newlines into table cells,
// producing invalid GFM tables. Strip that padding for cell content only.
turndownService.addRule('tableCellParagraph', {
  filter: (node) =>
    node.nodeName === 'P' && !!node.parentNode && (node.parentNode.nodeName === 'TD' || node.parentNode.nodeName === 'TH'),
  replacement: (content) => content,
});

// Default turndown code-block rule drops the language. Preserve it as a
// fenced-code info string (e.g. <pre><code class="language-js"> -> ```js)
turndownService.addRule('fencedCodeBlockWithLang', {
  filter: (node) => node.nodeName === 'PRE' && !!node.firstChild && node.firstChild.nodeName === 'CODE',
  replacement: (_content, node) => {
    const codeEl = node.firstChild as HTMLElement;
    const className = codeEl.getAttribute('class') || '';
    const match = className.match(/language-(\S+)/);
    const lang = match ? match[1] : '';
    const code = codeEl.textContent || '';
    return `\n\`\`\`${lang}\n${code.replace(/\n$/, '')}\n\`\`\`\n`;
  },
});

export function convertHtmlToMarkdown(html: string): string {
  if (!html.trim()) return '';
  return turndownService.turndown(html).trim() + '\n';
}
