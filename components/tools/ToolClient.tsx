'use client';

import { useState, useCallback } from 'react';
import { useDebouncedValue } from './useDebouncedValue';
import MarkdownEditor from './MarkdownEditor';
import PdfPreview from './PdfPreview';
import ThemeSelector, { PageSizeSelector } from './ThemeSelector';
import DownloadButton from './DownloadButton';
import { countWords } from '@/lib/markdown';
import { markdownToPdfHtml, ThemeId, PageSizeId } from '@/lib/pdf';
import { WORKSPACE, WORKSPACE_BAR, SPLIT } from './ui';
import { PDF_SAMPLE_MARKDOWN } from './samples';

export default function ToolClient() {
  const [markdown, setMarkdown] = useState(PDF_SAMPLE_MARKDOWN);
  const [theme, setTheme] = useState<ThemeId>('github');
  const [pageSize, setPageSize] = useState<PageSizeId>('a4');

  // Rebuild the preview once typing pauses, not on every keystroke
  const deferredMarkdown = useDebouncedValue(markdown);
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
        <DownloadButton markdown={markdown} theme={theme} pageSize={pageSize} filename="document.pdf" />
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
