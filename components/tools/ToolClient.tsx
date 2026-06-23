'use client';

import { useState, useCallback, useDeferredValue } from 'react';
import MarkdownEditor from './MarkdownEditor';
import PdfPreview from './PdfPreview';
import ThemeSelector from './ThemeSelector';
import DownloadButton from './DownloadButton';
import { parseMarkdown, countWords } from '@/lib/markdown';
import { ThemeId } from '@/lib/pdf';

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
| Code highlighting | ✅ | ❌ |
| Mermaid diagrams | ✅ | ❌ |
| Client-side only | ✅ | ❌ |
| Free forever | ✅ | ❌ |

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

  // Defer HTML computation so typing feels instant
  const deferredMarkdown = useDeferredValue(markdown);
  const htmlContent = parseMarkdown(deferredMarkdown);
  const wordCount = countWords(markdown);

  const handleMarkdownChange = useCallback((val: string) => {
    setMarkdown(val);
  }, []);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <ThemeSelector selected={theme} onSelect={setTheme} />
        <DownloadButton htmlContent={htmlContent} theme={theme} filename="document.pdf" />
      </div>

      {/* Two-Column Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <MarkdownEditor
            value={markdown}
            onChange={handleMarkdownChange}
            wordCount={wordCount}
          />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <PdfPreview htmlContent={htmlContent} theme={theme} />
        </div>
      </div>
    </div>
  );
}
