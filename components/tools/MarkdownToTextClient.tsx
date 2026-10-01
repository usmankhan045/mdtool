'use client';

import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import { countWords } from '@/lib/markdown';
import { markdownToText } from '@/lib/markdownToText';
import { downloadTextFile, copyToClipboard } from '@/lib/download';
import { WORKSPACE, SPLIT, PANE, PANE_HEAD, PANE_TITLE, META, TEXTAREA, BTN_PRIMARY, BTN_OUTLINE, ICON_DOWNLOAD } from './ui';
import { ToolIcon } from './UiParts';

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
    <div className={WORKSPACE}>
      <div className={SPLIT}>
        <MarkdownEditor value={markdown} onChange={handleMarkdownChange} wordCount={wordCount} />
        <div className={PANE}>
            <div className={PANE_HEAD}>
              <span className={PANE_TITLE}>Plain Text Output</span>
              <div className="flex items-center gap-1.5">
                <span className={`${META} mr-1.5`}>
                  {outputWords} words · {countChars(plainText)} chars
                </span>
                <button onClick={handleCopy} disabled={!plainText.trim()} className={BTN_OUTLINE}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={handleDownload} disabled={!plainText.trim()} className={BTN_PRIMARY}>
                  <ToolIcon d={ICON_DOWNLOAD} />
                  Download .txt
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-wrap px-4 py-1.5 border-b border-zinc-100">
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
              className={`${TEXTAREA.replace('sm:min-h-[500px]', 'sm:min-h-[452px]')}`}
              spellCheck={false}
            />
        </div>
      </div>
    </div>
  );
}
