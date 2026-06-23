'use client';

import { useCallback, useState } from 'react';
import DocxUploadPanel from './DocxUploadPanel';
import MarkdownOutputPanel from './MarkdownOutputPanel';
import { convertDocxToMarkdown } from '@/lib/wordToMarkdown';

export default function WordToMarkdownClient() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = useCallback(async (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setError(null);
    setMarkdown('');
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const md = await convertDocxToMarkdown(arrayBuffer);
      setMarkdown(md);
    } catch (err) {
      console.error('Word to Markdown conversion failed:', err);
      setError('Could not read this file. Make sure it is a valid .docx document.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setFileName(null);
    setFileSize(null);
    setMarkdown('');
    setError(null);
  }, []);

  const outputFilename = fileName ? fileName.replace(/\.docx$/i, '.md') : 'document.md';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <DocxUploadPanel
            fileName={fileName}
            fileSize={fileSize}
            loading={loading}
            error={error}
            onFileSelected={handleFileSelected}
            onClear={handleClear}
          />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <MarkdownOutputPanel
            markdown={markdown}
            filename={outputFilename}
            charCount={markdown.length}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
