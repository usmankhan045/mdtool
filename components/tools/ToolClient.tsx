'use client';

import { useState, useCallback, useDeferredValue } from 'react';
import MarkdownEditor from './MarkdownEditor';
import PdfPreview from './PdfPreview';
import ThemeSelector, { PageSizeSelector } from './ThemeSelector';
import DownloadButton from './DownloadButton';
import { countWords } from '@/lib/markdown';
import { markdownToPdfHtml, ThemeId, PageSizeId } from '@/lib/pdf';
import { WORKSPACE, WORKSPACE_BAR, SPLIT } from './ui';

const SAMPLE_MARKDOWN = `# Welcome to MDTool

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

export default function ToolClient() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [theme, setTheme] = useState<ThemeId>('github');
  const [pageSize, setPageSize] = useState<PageSizeId>('a4');

  // Defer HTML computation so typing feels instant
  const deferredMarkdown = useDeferredValue(markdown);
  const htmlContent = markdownToPdfHtml(deferredMarkdown);
  const wordCount = countWords(markdown);

  const handleMarkdownChange = useCallback((val: string) => {
    setMarkdown(val);
  }, []);

  return (
    <div className={WORKSPACE}>
      {/* Controls Bar */}
      <div className={WORKSPACE_BAR}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <ThemeSelector selected={theme} onSelect={setTheme} />
          <PageSizeSelector selected={pageSize} onSelect={setPageSize} />
        </div>
        <DownloadButton htmlContent={htmlContent} theme={theme} pageSize={pageSize} filename="document.pdf" />
      </div>

      {/* Two-Column Editor */}
      <div className={SPLIT}>
        <MarkdownEditor
          value={markdown}
          onChange={handleMarkdownChange}
          wordCount={wordCount}
        />
        <PdfPreview htmlContent={htmlContent} theme={theme} />
      </div>
    </div>
  );
}
