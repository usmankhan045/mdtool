'use client';

import { useCallback, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';
import HtmlEditor from './HtmlEditor';
import MarkdownOutputPanel from './MarkdownOutputPanel';
import { convertHtmlToMarkdown } from '@/lib/htmlToMarkdown';
import { WORKSPACE, SPLIT } from './ui';
import { HTML_INPUT_SAMPLE } from './samples';

export default function HtmlToMarkdownClient() {
  const [html, setHtml] = useState(HTML_INPUT_SAMPLE);

  const deferredHtml = useDebouncedValue(html);
  const markdown = convertHtmlToMarkdown(deferredHtml);

  const handleHtmlChange = useCallback((val: string) => {
    setHtml(val);
  }, []);

  return (
    <div className={WORKSPACE}>
      <div className={SPLIT}>
        <HtmlEditor value={html} onChange={handleHtmlChange} charCount={html.length} />
        <MarkdownOutputPanel markdown={markdown} filename="document.md" charCount={markdown.length} />
      </div>
    </div>
  );
}
