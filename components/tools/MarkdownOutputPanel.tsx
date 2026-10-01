'use client';

import { useState } from 'react';
import { downloadTextFile, copyToClipboard } from '@/lib/download';

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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-50 border-b border-zinc-200 rounded-t-lg">
        <span className="text-sm font-medium text-zinc-600">Markdown Output</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">{charCount} chars</span>
          <button
            onClick={handleCopy}
            disabled={!markdown.trim()}
            className="text-xs px-3 min-h-[44px] bg-white border border-zinc-300 rounded hover:bg-zinc-50 text-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            disabled={!markdown.trim()}
            className="flex items-center gap-1.5 text-sm font-semibold px-3.5 min-h-[44px] bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white rounded-md shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download .md
          </button>
        </div>
      </div>

      <textarea
        value={loading ? 'Converting...' : markdown}
        readOnly
        placeholder="Your converted Markdown will appear here..."
        className="flex-1 w-full p-4 font-mono text-sm text-zinc-800 bg-white resize-none outline-none border-x border-b border-zinc-200 rounded-b-lg min-h-[340px] sm:min-h-[500px]"
        spellCheck={false}
      />
    </div>
  );
}
