'use client';

import { useState, useCallback, useDeferredValue } from 'react';
import Link from 'next/link';
import MarkdownEditor from './MarkdownEditor';
import PdfPreview from './PdfPreview';
import ThemeSelector from './ThemeSelector';
import DownloadButton from './DownloadButton';
import { parseMarkdown, countWords } from '@/lib/markdown';
import { ThemeId } from '@/lib/pdf';

const SAMPLE_MARKDOWN = `# Hello, DevMark!

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('World'));
\`\`\`
`;

export default function EmbeddedTool() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [theme, setTheme] = useState<ThemeId>('github');

  const deferredMarkdown = useDeferredValue(markdown);
  const htmlContent = parseMarkdown(deferredMarkdown);
  const wordCount = countWords(markdown);

  const handleMarkdownChange = useCallback((val: string) => {
    setMarkdown(val);
  }, []);

  return (
    <div className="my-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">Markdown to PDF</span>
          <ThemeSelector selected={theme} onSelect={setTheme} />
        </div>
        <div className="flex items-center gap-3">
          <DownloadButton htmlContent={htmlContent} theme={theme} filename="document.pdf" />
          <Link
            href="/markdown-to-pdf"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap"
          >
            Full Tool →
          </Link>
        </div>
      </div>

      {/* Two-panel layout at fixed height */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ height: '400px' }}>
        <div className="overflow-hidden border-r border-gray-200 flex flex-col">
          <div className="overflow-y-auto flex-1 min-h-0">
            <MarkdownEditor
              value={markdown}
              onChange={handleMarkdownChange}
              wordCount={wordCount}
            />
          </div>
        </div>
        <div className="overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1 min-h-0">
            <PdfPreview htmlContent={htmlContent} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
