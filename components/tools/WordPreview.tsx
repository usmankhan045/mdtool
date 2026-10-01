'use client';

import { useMemo } from 'react';
import { DOCX_STYLES } from '@/lib/docx';
import { PANE, PANE_HEAD, PANE_TITLE, PANE_HEIGHT } from './ui';
import { LiveBadge } from './UiParts';

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
    <div className={`${PANE} h-full`}>
      <div className={PANE_HEAD}>
        <span className={PANE_TITLE}>Word Preview</span>
        <LiveBadge />
      </div>
      <iframe
        srcDoc={srcDoc}
        className={`flex-1 w-full border-0 ${PANE_HEIGHT}`}
        title="Word Preview"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
