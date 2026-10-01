'use client';

import { useState } from 'react';
import { generatePdf, ThemeId, PageSizeId } from '@/lib/pdf';
import { BTN_MAIN } from './ui';

interface Props {
  htmlContent: string;
  theme: ThemeId;
  filename?: string;
  size?: 'default' | 'compact';
  pageSize?: PageSizeId;
}

export default function DownloadButton({ htmlContent, theme, filename, size = 'default', pageSize = 'a4' }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!htmlContent.trim()) {
      alert('Please enter some Markdown first');
      return;
    }
    setLoading(true);
    try {
      await generatePdf(htmlContent, { theme, pageSize, filename: filename || 'document.pdf' });
    } catch (err) {
      console.error('PDF generation failed:', err);
      const detail = err instanceof Error ? err.message : String(err);
      alert(`PDF generation failed:\n\n${detail}`);
    } finally {
      setLoading(false);
    }
  };

  const className = size === 'compact'
    ? `flex items-center gap-1.5 text-white transition-all px-3 py-2 text-xs font-medium rounded-md ${
        loading || !htmlContent.trim() ? 'bg-zinc-300 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-800 active:scale-95'
      }`
    : BTN_MAIN;

  return (
    <button
      onClick={handleDownload}
      disabled={loading || !htmlContent.trim()}
      className={className}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {size === 'compact' ? '...' : 'Generating PDF...'}
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {size === 'compact' ? '↓ PDF' : 'Download PDF (Free)'}
        </>
      )}
    </button>
  );
}
