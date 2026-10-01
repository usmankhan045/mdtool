'use client';

import { useMemo, useState } from 'react';
import { downloadTextFile, copyToClipboard } from '@/lib/download';
import { PANE, PANE_HEAD, PANE_HEIGHT, TEXTAREA, BTN_PRIMARY, BTN_OUTLINE, SEG, SEG_ITEM, SEG_ON, SEG_OFF, ICON_DOWNLOAD } from './ui';
import { ToolIcon } from './UiParts';

interface Props {
  htmlContent: string;
  filename?: string;
}

const PREVIEW_CSS = `
  body { margin: 24px; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #24292e; line-height: 1.6; }
  pre { background: #f6f8fa; padding: 12px; border-radius: 6px; overflow-x: auto; }
  code { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #dfe2e5; padding: 6px 12px; }
  th { background: #f6f8fa; }
  img { max-width: 100%; }
  blockquote { border-left: 4px solid #dfe2e5; margin-left: 0; padding-left: 16px; color: #6a737d; }
`;

function wrapFullDocument(htmlContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<style>${PREVIEW_CSS}</style>
</head>
<body>
${htmlContent}
</body>
</html>
`;
}

export default function HtmlOutputPanel({ htmlContent, filename = 'document.html' }: Props) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [fullDocument, setFullDocument] = useState(true);
  const [copied, setCopied] = useState(false);

  const fullHtml = useMemo(() => wrapFullDocument(htmlContent), [htmlContent]);
  const outputCode = fullDocument ? fullHtml : htmlContent;

  const handleCopy = async () => {
    const ok = await copyToClipboard(outputCode);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleDownload = () => {
    if (!htmlContent.trim()) return;
    downloadTextFile(outputCode, filename, 'text/html;charset=utf-8');
  };

  return (
    <div className={`${PANE} h-full`}>
      <div className={PANE_HEAD}>
        <div className={SEG}>
          <button onClick={() => setTab('preview')} className={`${SEG_ITEM} ${tab === 'preview' ? SEG_ON : SEG_OFF}`}>
            Preview
          </button>
          <button onClick={() => setTab('code')} className={`${SEG_ITEM} ${tab === 'code' ? SEG_ON : SEG_OFF}`}>
            Code
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <label className="mr-1.5 flex items-center gap-1.5 text-xs text-zinc-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={fullDocument}
              onChange={(e) => setFullDocument(e.target.checked)}
              className="accent-zinc-900"
            />
            Full document
          </label>
          <button onClick={handleCopy} disabled={!htmlContent.trim()} className={BTN_OUTLINE}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={handleDownload} disabled={!htmlContent.trim()} className={BTN_PRIMARY}>
            <ToolIcon d={ICON_DOWNLOAD} />
            Download .html
          </button>
        </div>
      </div>

      {tab === 'preview' ? (
        <iframe
          srcDoc={htmlContent.trim() ? fullHtml : '<p style="color:#9ca3af;font-style:italic;font-family:sans-serif;margin:24px;">Your preview will appear here as you type...</p>'}
          className={`flex-1 w-full border-0 bg-white ${PANE_HEIGHT}`}
          title="HTML Preview"
          sandbox="allow-same-origin"
        />
      ) : (
        <textarea
          value={outputCode}
          readOnly
          className={TEXTAREA}
          spellCheck={false}
        />
      )}
    </div>
  );
}
