'use client';

import { useCallback, useDeferredValue, useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import HtmlOutputPanel from './HtmlOutputPanel';
import { parseMarkdown, countWords } from '@/lib/markdown';

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

  const deferredMarkdown = useDeferredValue(markdown);
  const htmlContent = parseMarkdown(deferredMarkdown);
  const wordCount = countWords(markdown);

  const handleMarkdownChange = useCallback((val: string) => {
    setMarkdown(val);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <MarkdownEditor value={markdown} onChange={handleMarkdownChange} wordCount={wordCount} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <HtmlOutputPanel htmlContent={htmlContent} filename="document.html" />
        </div>
      </div>
    </div>
  );
}
