'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { countWords } from '@/lib/markdown';
import { markdownToText } from '@/lib/markdownToText';
import { downloadTextFile, copyToClipboard } from '@/lib/download';

export const SAMPLE_MARKDOWN = `# Release Notes

Version **2.4** adds *faster exports* and a new [settings page](https://example.com/settings).

## What changed

- Exports are 2x faster
- Tables keep their columns
  - Nested items stay indented
1. Open the app
2. Click **Export**

> Tip: press \`Ctrl+S\` to save.

| Plan | Price |
|------|-------|
| Free | $0 |
| Team | $8 |

![Screenshot of the export dialog](export.png)
`;

function countChars(text: string): number {
  return text.length;
}

export default function MarkdownToTextClient() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [listMarkers, setListMarkers] = useState(true);
  const [linkUrls, setLinkUrls] = useState(true);
  const [joinLines, setJoinLines] = useState(false);
  const [copied, setCopied] = useState(false);

  const deferredMarkdown = useDeferredValue(markdown);
  const plainText = useMemo(
    () => markdownToText(deferredMarkdown, { listMarkers, linkUrls, joinLines }),
    [deferredMarkdown, listMarkers, linkUrls, joinLines],
  );
  const wordCount = countWords(markdown);
  const outputWords = useMemo(() => (plainText.trim() ? plainText.trim().split(/\s+/).length : 0), [plainText]);

  const handleMarkdownChange = useCallback((val: string) => {
    setMarkdown(val);
  }, []);

  const handleCopy = async () => {
    const ok = await copyToClipboard(plainText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDownload = () => {
    if (!plainText.trim()) return;
    downloadTextFile(plainText, 'document.txt', 'text/plain;charset=utf-8');
  };

  const toggles: { label: string; checked: boolean; onChange: (v: boolean) => void; title: string }[] = [
    { label: 'List bullets', checked: listMarkers, onChange: setListMarkers, title: 'Keep "- " and "1. " in front of list items' },
    { label: 'Link URLs', checked: linkUrls, onChange: setLinkUrls, title: 'Write links as "text (url)" instead of just the link text' },
    { label: 'Join wrapped lines', checked: joinLines, onChange: setJoinLines, title: 'Merge soft-wrapped lines inside a paragraph into one line' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <MarkdownEditor value={markdown} onChange={handleMarkdownChange} wordCount={wordCount} />
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-3 py-2 bg-zinc-50 border-b border-zinc-200 rounded-t-lg gap-2 flex-wrap">
              <span className="text-sm font-medium text-zinc-600">Plain Text Output</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">
                  {outputWords} words · {countChars(plainText)} chars
                </span>
                <button
                  onClick={handleCopy}
                  disabled={!plainText.trim()}
                  className="text-xs px-3 min-h-[44px] bg-white border border-zinc-300 rounded hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!plainText.trim()}
                  className="flex items-center gap-1.5 text-sm font-semibold px-3.5 min-h-[44px] bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white rounded-md shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download .txt
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap px-3 py-1.5 border-b border-zinc-200 bg-white">
              {toggles.map((t) => (
                <label key={t.label} title={t.title} className="flex items-center gap-1.5 text-xs text-zinc-600 cursor-pointer select-none min-h-[32px]">
                  <input
                    type="checkbox"
                    checked={t.checked}
                    onChange={(e) => t.onChange(e.target.checked)}
                    className="accent-zinc-900"
                  />
                  {t.label}
                </label>
              ))}
            </div>
            <textarea
              value={plainText}
              readOnly
              placeholder="Your plain text will appear here as you type..."
              aria-label="Plain text output"
              className="flex-1 w-full p-4 font-mono text-sm text-zinc-800 bg-white resize-none outline-none border-x border-b border-zinc-200 rounded-b-lg min-h-[340px] sm:min-h-[452px]"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
