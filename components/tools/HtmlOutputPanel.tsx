'use client';

import { useMemo, useState } from 'react';
import { downloadTextFile, copyToClipboard } from '@/lib/download';

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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab('preview')}
            className={`text-xs px-3 min-h-[44px] rounded-md font-medium ${tab === 'preview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab('code')}
            className={`text-xs px-3 min-h-[44px] rounded-md font-medium ${tab === 'code' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-300'}`}
          >
            Code
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={fullDocument}
              onChange={(e) => setFullDocument(e.target.checked)}
              className="accent-blue-600"
            />
            Full document
          </label>
          <button
            onClick={handleCopy}
            disabled={!htmlContent.trim()}
            className="text-xs px-3 min-h-[44px] bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            disabled={!htmlContent.trim()}
            className="flex items-center gap-1.5 text-sm font-semibold px-3.5 min-h-[44px] bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-md shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download .html
          </button>
        </div>
      </div>

      {tab === 'preview' ? (
        <iframe
          srcDoc={htmlContent.trim() ? fullHtml : '<p style="color:#9ca3af;font-style:italic;font-family:sans-serif;margin:24px;">Your preview will appear here as you type...</p>'}
          className="flex-1 w-full min-h-[500px] border-0 bg-white rounded-b-lg border-x border-b border-gray-200"
          title="HTML Preview"
          sandbox="allow-same-origin"
        />
      ) : (
        <textarea
          value={outputCode}
          readOnly
          className="flex-1 w-full p-4 font-mono text-sm text-gray-800 bg-white resize-none outline-none border-x border-b border-gray-200 rounded-b-lg min-h-[500px]"
          spellCheck={false}
        />
      )}
    </div>
  );
}
