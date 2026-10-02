'use client';

import { useCallback, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';
import MarkdownEditor from './MarkdownEditor';
import HtmlOutputPanel from './HtmlOutputPanel';
import { parseMarkdown, countWords } from '@/lib/markdown';
import { WORKSPACE, SPLIT } from './ui';

const SAMPLE_MARKDOWN = `# Welcome to MDTool

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

export default function MarkdownToHtmlClient() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);

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
