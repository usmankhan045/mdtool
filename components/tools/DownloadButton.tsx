'use client';

import { useState } from 'react';
import { generatePdf, ThemeId } from '@/lib/pdf';

interface Props {
  htmlContent: string;
  theme: ThemeId;
  filename?: string;
}

export default function DownloadButton({ htmlContent, theme, filename }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!htmlContent.trim()) {
      alert('Please enter some Markdown first');
      return;
    }
    setLoading(true);
    try {
      await generatePdf(htmlContent, { theme, filename: filename || 'document.pdf' });
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading || !htmlContent.trim()}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
        loading || !htmlContent.trim()
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg'
      }`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF — Free
        </>
      )}
    </button>
  );
}
