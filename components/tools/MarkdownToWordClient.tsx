'use client';

import { useCallback, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';
import MarkdownEditor from './MarkdownEditor';
import WordPreview from './WordPreview';
import DownloadWordButton from './DownloadWordButton';
import { parseMarkdown, countWords } from '@/lib/markdown';
import { WORKSPACE, WORKSPACE_BAR, SPLIT } from './ui';

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

  const deferredMarkdown = useDebouncedValue(markdown);
  const htmlContent = parseMarkdown(deferredMarkdown);
  const wordCount = countWords(markdown);

  const handleMarkdownChange = useCallback((val: string) => {
    setMarkdown(val);
  }, []);

  return (
    <div className={WORKSPACE}>
      {/* Controls Bar */}
      <div className={WORKSPACE_BAR}>
        <p className="text-[13px] text-zinc-500">Converts to a real, editable .docx file that opens in Word, Google Docs, and LibreOffice.</p>
        <DownloadWordButton markdown={markdown} filename="document.docx" />
      </div>

      {/* Two-Column Editor */}
      <div className={SPLIT}>
        <MarkdownEditor value={markdown} onChange={handleMarkdownChange} wordCount={wordCount} />
        <WordPreview htmlContent={htmlContent} />
      </div>
    </div>
  );
}
