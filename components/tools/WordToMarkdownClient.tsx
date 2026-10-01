'use client';

import { useCallback, useState } from 'react';
import DocxUploadPanel from './DocxUploadPanel';
import MarkdownOutputPanel from './MarkdownOutputPanel';
import { convertDocxToMarkdown } from '@/lib/wordToMarkdown';
import { WORKSPACE, SPLIT } from './ui';

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
    <div className={WORKSPACE}>
      <div className={SPLIT}>
        <DocxUploadPanel
          fileName={fileName}
          fileSize={fileSize}
          loading={loading}
          error={error}
          onFileSelected={handleFileSelected}
          onClear={handleClear}
        />
        <MarkdownOutputPanel
          markdown={markdown}
          filename={outputFilename}
          charCount={markdown.length}
          loading={loading}
        />
      </div>
    </div>
  );
}
