'use client';

import { useCallback, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';
import MarkdownEditor from './MarkdownEditor';
import HtmlOutputPanel from './HtmlOutputPanel';
import { parseMarkdown, countWords } from '@/lib/markdown';
import { WORKSPACE, SPLIT } from './ui';
import { HTML_SAMPLE_MARKDOWN } from './samples';

export default function MarkdownToHtmlClient() {
  const [markdown, setMarkdown] = useState(HTML_SAMPLE_MARKDOWN);

  const deferredMarkdown = useDebouncedValue(markdown);
  const htmlContent = parseMarkdown(deferredMarkdown);
  const wordCount = countWords(markdown);

  const handleMarkdownChange = useCallback((val: string) => {
    setMarkdown(val);
  }, []);

  return (
    <div className={WORKSPACE}>
      <div className={SPLIT}>
        <MarkdownEditor value={markdown} onChange={handleMarkdownChange} wordCount={wordCount} />
        <HtmlOutputPanel htmlContent={htmlContent} filename="document.html" />
      </div>
    </div>
  );
}
