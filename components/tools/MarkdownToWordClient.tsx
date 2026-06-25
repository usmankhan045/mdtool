'use client';

import { useCallback, useDeferredValue, useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import WordPreview from './WordPreview';
import DownloadWordButton from './DownloadWordButton';
import { parseMarkdown, countWords } from '@/lib/markdown';

const SAMPLE_MARKDOWN = `# Welcome to MDTool

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

export default function MarkdownToWordClient() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);

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
        <p className="text-sm text-gray-500">Converts to a real, editable .docx file that opens in Word, Google Docs, and LibreOffice.</p>
        <DownloadWordButton markdown={markdown} filename="document.docx" />
      </div>

      {/* Two-Column Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <MarkdownEditor value={markdown} onChange={handleMarkdownChange} wordCount={wordCount} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <WordPreview htmlContent={htmlContent} />
        </div>
      </div>
    </div>
  );
}
