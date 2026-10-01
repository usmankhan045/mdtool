'use client';

import dynamic from 'next/dynamic';

const THEMES = ['GitHub', 'Academic', 'Minimal', 'Dark'];

const SAMPLE = `# Try It Here

Paste your **Markdown** and download a PDF instantly.

| Feature | Supported |
|---------|----------|
| Code highlighting | ✅ |
| Tables | ✅ |`;

/**
 * Static, server-rendered stand-in for the embedded converter. It mirrors
 * EmbeddedTool's markup (header, theme row, two h-52 panels, footer CTA) so the
 * swap on hydration causes no layout shift, and crawlers see real text.
 */
function EmbeddedToolShell() {
  return (
    <div className="my-8 rounded-xl border border-blue-100 bg-blue-50/30 overflow-hidden shadow-sm" aria-busy="true">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-blue-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Try it: Markdown to PDF</span>
          <span className="text-xs text-gray-400 hidden sm:inline">Live converter</span>
        </div>
        <a href="/markdown-to-pdf" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          Full Tool →
        </a>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-100 flex-wrap" aria-hidden>
        <span className="text-xs text-gray-500 mr-1">Theme:</span>
        {THEMES.map((t, i) => (
          <span
            key={t}
            className={`px-3 py-2 rounded-full text-xs font-medium border ${
              i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            {t}
          </span>
        ))}
        <div className="ml-auto">
          <span className="flex items-center gap-1.5 text-white px-3 py-2 text-xs font-medium rounded-md bg-blue-600">
            ↓ PDF
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="bg-white">
          <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Markdown</span>
            <span className="text-xs text-gray-400 px-2 py-2 -my-2" aria-hidden>Clear</span>
          </div>
          <pre className="m-0 w-full h-52 overflow-hidden p-3 font-mono text-xs text-gray-800 whitespace-pre-wrap">{SAMPLE}</pre>
        </div>
        <div className="bg-white">
          <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Preview</span>
            <span className="text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              Live
            </span>
          </div>
          <div className="w-full h-52 overflow-hidden p-4 text-sm text-gray-800 leading-relaxed">
            <h3 className="text-xl font-bold mb-2">Try It Here</h3>
            <p className="mb-2">
              Paste your <strong>Markdown</strong> and download a PDF instantly.
            </p>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-50 px-2 py-1 text-left">Feature</th>
                  <th className="border border-gray-300 bg-gray-50 px-2 py-1 text-left">Supported</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">Code highlighting</td>
                  <td className="border border-gray-300 px-2 py-1">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-2 py-1">Tables</td>
                  <td className="border border-gray-300 px-2 py-1">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="px-4 py-2.5 bg-blue-600 text-center">
        <a href="/markdown-to-pdf" className="text-white text-xs font-medium hover:underline">
          Need more features? Open the full tool for themes, Mermaid diagrams, and file upload →
        </a>
      </div>
    </div>
  );
}

/**
 * Client wrapper that defers the live converter (and its heavy marked +
 * highlight.js dependencies, ~150KB) out of the blog page's initial bundle.
 */
const EmbeddedTool = dynamic(() => import('./EmbeddedTool'), {
  ssr: false,
  loading: () => <EmbeddedToolShell />,
});

export default function EmbeddedToolLazy() {
  return <EmbeddedTool />;
}
