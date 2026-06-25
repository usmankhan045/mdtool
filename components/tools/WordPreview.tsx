'use client';

import { useMemo } from 'react';
import { DOCX_STYLES } from '@/lib/docx';

interface Props {
  htmlContent: string;
}

export default function WordPreview({ htmlContent }: Props) {
  const srcDoc = useMemo(() => `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          html, body { background: #e9ebee; margin: 0; padding: 24px 0; }
          .page { background: #ffffff; max-width: 700px; margin: 0 12px; padding: 56px 64px; box-shadow: 0 1px 4px rgba(0,0,0,0.15); min-height: 800px; }
          @media (min-width: 740px) { .page { margin: 0 auto; } }
          @media (max-width: 640px) { .page { padding: 28px 20px; min-height: 600px; } }
          ${DOCX_STYLES}
        </style>
      </head>
      <body>
        <div class="page">${htmlContent || '<p style="color:#9ca3af;font-style:italic;">Your Word preview will appear here as you type...</p>'}</div>
      </body>
    </html>
  `, [htmlContent]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <span className="text-sm font-medium text-gray-600">Word Preview</span>
        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
          Live
        </span>
      </div>
      <iframe
        srcDoc={srcDoc}
        className="flex-1 w-full min-h-[340px] sm:min-h-[500px] border-0"
        title="Word Preview"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
