'use client';

import { useCallback, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';
import MarkdownEditor from './MarkdownEditor';
import WordPreview from './WordPreview';
import DownloadWordButton from './DownloadWordButton';
import { parseMarkdown, countWords } from '@/lib/markdown';
import { WORKSPACE, WORKSPACE_BAR, SPLIT } from './ui';
import { WORD_SAMPLE_MARKDOWN } from './samples';

export default function MarkdownToWordClient() {
  const [markdown, setMarkdown] = useState(WORD_SAMPLE_MARKDOWN);

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
