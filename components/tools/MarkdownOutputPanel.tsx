'use client';

import { useState } from 'react';
import { downloadTextFile, copyToClipboard } from '@/lib/download';
import { PANE, PANE_HEAD, PANE_TITLE, META, TEXTAREA, BTN_PRIMARY, BTN_OUTLINE, ICON_DOWNLOAD } from './ui';
import { ToolIcon } from './UiParts';

interface Props {
  markdown: string;
  filename?: string;
  charCount: number;
  loading?: boolean;
}

export default function MarkdownOutputPanel({ markdown, filename = 'document.md', charCount, loading }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(markdown);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDownload = () => {
    if (!markdown.trim()) return;
    downloadTextFile(markdown, filename, 'text/markdown;charset=utf-8');
  };

  return (
    <div className={`${PANE} h-full`}>
      <div className={PANE_HEAD}>
        <span className={PANE_TITLE}>Markdown Output</span>
        <div className="flex items-center gap-1.5">
          <span className={`${META} mr-1.5`}>{charCount} chars</span>
          <button onClick={handleCopy} disabled={!markdown.trim()} className={BTN_OUTLINE}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={handleDownload} disabled={!markdown.trim()} className={BTN_PRIMARY}>
            <ToolIcon d={ICON_DOWNLOAD} />
            Download .md
          </button>
        </div>
      </div>

      <textarea
        value={loading ? 'Converting...' : markdown}
        readOnly
        placeholder="Your converted Markdown will appear here..."
        className={TEXTAREA}
        spellCheck={false}
      />
    </div>
  );
}
