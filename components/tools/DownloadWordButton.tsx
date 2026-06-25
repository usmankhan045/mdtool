'use client';

import { useState } from 'react';
import { generateDocx } from '@/lib/docx';

interface Props {
  markdown: string;
  filename?: string;
}

export default function DownloadWordButton({ markdown, filename }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!markdown.trim()) {
      alert('Please enter some Markdown first');
      return;
    }
    setLoading(true);
    try {
      await generateDocx(markdown, filename || 'document.docx');
    } catch (err) {
      console.error('Word document generation failed:', err);
      alert('Word document generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading || !markdown.trim()}
      className={`flex items-center gap-1.5 text-white transition-all px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg ${
        loading || !markdown.trim()
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
      }`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Generating Word doc...
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Word (Free)
        </>
      )}
    </button>
  );
}
