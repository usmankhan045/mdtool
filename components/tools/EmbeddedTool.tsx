'use client';

import { useState, useDeferredValue } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { parseMarkdown } from '@/lib/markdown';
import { ThemeId } from '@/lib/pdf';

const DownloadButton = dynamic(() => import('./DownloadButton'), { ssr: false });

const SAMPLE = `# Try It Here\n\nPaste your **Markdown** and download a PDF instantly.\n\n\`\`\`javascript\nconst greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet('World'));\n\`\`\`\n\n| Feature | Supported |\n|---------|----------|\n| Code highlighting | ✅ |\n| Tables | ✅ |\n| Mermaid diagrams | ✅ |`;

const THEMES: { id: ThemeId; label: string }[] = [
  { id: 'github', label: 'GitHub' },
  { id: 'academic', label: 'Academic' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'dark', label: 'Dark' },
];

export default function EmbeddedTool() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [theme, setTheme] = useState<ThemeId>('github');
  const deferredMd = useDeferredValue(markdown);
  const html = parseMarkdown(deferredMd);

  const srcDoc = `<html><head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <style>
      body { font-family: -apple-system, sans-serif; font-size: 14px; line-height: 1.6;
             color: #24292e; margin: 16px; padding: 0; }
      pre { background: #f6f8fa; padding: 12px; border-radius: 6px; overflow-x: auto; }
      code { font-family: monospace; font-size: 12px; }
      pre code { background: transparent; }
      table { border-collapse: collapse; width: 100%; font-size: 13px; }
      th, td { border: 1px solid #dfe2e5; padding: 5px 10px; }
      th { background: #f6f8fa; }
      h1 { font-size: 1.4em; margin-top: 0; }
      h2 { font-size: 1.2em; }
      blockquote { border-left: 3px solid #dfe2e5; margin-left: 0; padding-left: 12px; color: #6a737d; }
      img { max-width: 100%; }
    </style>
  </head><body>${html}</body></html>`;

  return (
    <div className="my-8 rounded-xl border border-blue-100 bg-blue-50/30 overflow-hidden shadow-sm">

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-blue-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Try it: Markdown to PDF</span>
          <span className="text-xs text-gray-400 hidden sm:inline">Live converter</span>
        </div>
        <Link
          href="/markdown-to-pdf"
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          Full Tool →
        </Link>
      </div>

      {/* Theme pills + download */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-100 flex-wrap">
        <span className="text-xs text-gray-500 mr-1">Theme:</span>
        {THEMES.map(t => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-colors border ${
              theme === t.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="ml-auto">
          <DownloadButton htmlContent={html} theme={theme} filename="document.pdf" size="compact" />
        </div>
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">

        {/* Editor */}
        <div className="bg-white">
          <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Markdown</span>
            <button
              onClick={() => setMarkdown('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-2 -my-2"
            >
              Clear
            </button>
          </div>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            className="w-full h-52 p-3 font-mono text-xs text-gray-800 resize-none outline-none"
            spellCheck={false}
            placeholder="Paste your Markdown here..."
          />
        </div>

        {/* Preview */}
        <div className="bg-white">
          <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Preview</span>
            <span className="text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              Live
            </span>
          </div>
          <iframe
            srcDoc={srcDoc}
            className="w-full h-52 border-0"
            title="PDF Preview"
            sandbox="allow-same-origin"
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-2.5 bg-blue-600 text-center">
        <Link href="/markdown-to-pdf" className="text-white text-xs font-medium hover:underline">
          Need more features? Open the full tool for themes, Mermaid diagrams, and file upload →
        </Link>
      </div>
    </div>
  );
}
