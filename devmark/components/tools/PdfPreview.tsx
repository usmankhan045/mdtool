'use client';

import { useMemo } from 'react';
import { ThemeId } from '@/lib/pdf';

// Minimal inline CSS for each theme (preview only — not the full PDF CSS)
const PREVIEW_STYLES: Record<ThemeId, string> = {
  github: 'font-family: -apple-system, sans-serif; color: #24292e; line-height: 1.6;',
  academic: 'font-family: Georgia, serif; color: #000; line-height: 1.8;',
  minimal: 'font-family: Helvetica Neue, sans-serif; color: #333; line-height: 1.7;',
  dark: 'font-family: -apple-system, sans-serif; color: #e6edf3; background: #0d1117; line-height: 1.6;',
};

interface Props {
  htmlContent: string;
  theme: ThemeId;
}

export default function PdfPreview({ htmlContent, theme }: Props) {
  const srcDoc = useMemo(() => `
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
        <style>
          body { margin: 24px; padding: 0; ${PREVIEW_STYLES[theme]} }
          pre { background: #f6f8fa; padding: 12px; border-radius: 6px; overflow-x: auto; }
          code { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #dfe2e5; padding: 6px 12px; }
          th { background: #f6f8fa; }
          img { max-width: 100%; }
          blockquote { border-left: 4px solid #dfe2e5; margin-left: 0; padding-left: 16px; color: #6a737d; }
        </style>
      </head>
      <body>${htmlContent || '<p style="color:#9ca3af;font-style:italic;">Your preview will appear here as you type...</p>'}</body>
    </html>
  `, [htmlContent, theme]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <span className="text-sm font-medium text-gray-600">PDF Preview</span>
        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
          Live
        </span>
      </div>
      <iframe
        srcDoc={srcDoc}
        className="flex-1 w-full min-h-[500px] border-0"
        title="PDF Preview"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
