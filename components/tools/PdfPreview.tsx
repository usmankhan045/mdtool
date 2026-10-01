'use client';

import { useEffect, useMemo, useState } from 'react';
import { ThemeId, mermaidThemeFor } from '@/lib/pdf';
import { PANE, PANE_HEAD, PANE_TITLE, PANE_HEIGHT } from './ui';
import { LiveBadge } from './UiParts';

// Minimal inline CSS for each theme (preview only - not the full PDF CSS)
const PREVIEW_STYLES: Record<ThemeId, string> = {
  github: 'font-family: -apple-system, sans-serif; color: #24292e; line-height: 1.6;',
  academic: 'font-family: Georgia, serif; color: #000; line-height: 1.8;',
  minimal: 'font-family: Helvetica Neue, sans-serif; color: #333; line-height: 1.7;',
  dark: 'font-family: -apple-system, sans-serif; color: #e6edf3; background: #0d1117; line-height: 1.6;',
};

const HLJS_CSS: Record<ThemeId, string> = {
  github: 'github.min.css',
  academic: 'github.min.css',
  minimal: 'atom-one-light.min.css',
  dark: 'github-dark.min.css',
};

interface Props {
  htmlContent: string;
  theme: ThemeId;
}

export default function PdfPreview({ htmlContent, theme }: Props) {
  // HTML with Mermaid blocks swapped for rendered SVG (same renderer the PDF uses).
  const [rendered, setRendered] = useState<{ src: string; theme: ThemeId; html: string } | null>(null);

  useEffect(() => {
    if (!htmlContent.includes('language-mermaid')) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const { renderMermaidInHtml } = await import('@/lib/mermaid');
        const html = await renderMermaidInHtml(htmlContent, mermaidThemeFor(theme));
        if (!cancelled) setRendered({ src: htmlContent, theme, html });
      } catch (err) {
        console.error('Mermaid preview failed:', err);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [htmlContent, theme]);

  // Show the rendered version once it matches the current input; until then the
  // raw HTML (mermaid source as code) is shown.
  const bodyHtml =
    rendered && rendered.src === htmlContent && rendered.theme === theme ? rendered.html : htmlContent;

  const dark = theme === 'dark';
  const srcDoc = useMemo(() => `
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${HLJS_CSS[theme]}">
        <style>
          body { margin: 24px; padding: 0; ${PREVIEW_STYLES[theme]} }
          pre { background: ${dark ? '#161b22' : '#f6f8fa'}; border: 1px solid ${dark ? '#30363d' : '#e1e4e8'}; padding: 12px; border-radius: 6px; overflow-x: auto; }
          pre code.hljs { background: transparent; padding: 0; }
          code { font-family: 'SFMono-Regular', Consolas, 'Courier New', monospace; font-size: 13px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid ${dark ? '#30363d' : '#dfe2e5'}; padding: 6px 12px; }
          th { background: ${dark ? '#161b22' : '#f6f8fa'}; }
          img { max-width: 100%; }
          blockquote { border-left: 4px solid #dfe2e5; margin-left: 0; padding-left: 16px; color: #6a737d; }
          .mermaid-diagram { text-align: center; margin: 12px 0 16px; }
          .mermaid-diagram svg { max-width: 100%; height: auto; }
          .page-break { position: relative; height: 0; margin: 28px 0; border-top: 1px dashed ${dark ? '#484f58' : '#c4c9d0'}; }
          .page-break::after { content: 'page break'; position: absolute; left: 50%; top: -0.7em; transform: translateX(-50%);
            padding: 0 8px; font: 11px/1.4 -apple-system, sans-serif; letter-spacing: .04em; text-transform: uppercase;
            color: ${dark ? '#8b949e' : '#9aa1a9'}; background: ${dark ? '#0d1117' : '#fff'}; }
        </style>
      </head>
      <body>${bodyHtml || '<p style="color:#9ca3af;font-style:italic;">Your preview will appear here as you type...</p>'}</body>
    </html>
  `, [bodyHtml, theme, dark]);

  return (
    <div className={`${PANE} h-full`}>
      <div className={PANE_HEAD}>
        <span className={PANE_TITLE}>PDF Preview</span>
        <LiveBadge />
      </div>
      <iframe
        srcDoc={srcDoc}
        className={`flex-1 w-full border-0 ${PANE_HEIGHT}`}
        title="PDF Preview"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
