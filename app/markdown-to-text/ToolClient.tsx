'use client';

import dynamic from 'next/dynamic';

// Static copy of the converter's default sample and its real output, so the server-rendered
// fallback shows crawlers (and no-JS visitors) what the tool does. Keep in sync with
// SAMPLE_MARKDOWN in components/tools/MarkdownToTextClient.tsx.
const FALLBACK_INPUT = `# Release Notes

Version **2.4** adds *faster exports* and a new [settings page](https://example.com/settings).

## What changed

- Exports are 2x faster
- Tables keep their columns
  - Nested items stay indented
1. Open the app
2. Click **Export**

> Tip: press \`Ctrl+S\` to save.

| Plan | Price |
|------|-------|
| Free | $0 |
| Team | $8 |

![Screenshot of the export dialog](export.png)`;

const FALLBACK_OUTPUT = `Release Notes

Version 2.4 adds faster exports and a new settings page (https://example.com/settings).

What changed

- Exports are 2x faster
- Tables keep their columns
  - Nested items stay indented

1. Open the app
2. Click Export

Tip: press Ctrl+S to save.

Plan\tPrice
Free\t$0
Team\t$8

Screenshot of the export dialog`;

function StaticPreview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[560px]">
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-3 py-2 bg-zinc-50 border-b border-zinc-200 text-sm font-medium text-zinc-600 min-h-[60px] flex items-center">
          Markdown Input
        </div>
        <pre className="flex-1 p-4 font-mono text-sm text-zinc-800 whitespace-pre-wrap overflow-hidden">{FALLBACK_INPUT}</pre>
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-3 py-2 bg-zinc-50 border-b border-zinc-200 text-sm font-medium text-zinc-600 min-h-[60px] flex items-center">
          Plain Text Output
        </div>
        <pre className="flex-1 p-4 font-mono text-sm text-zinc-800 whitespace-pre-wrap overflow-hidden">{FALLBACK_OUTPUT}</pre>
      </div>
    </div>
  );
}

// ssr:false keeps the conversion code out of the server build; the static preview above
// reserves the converter's space (no layout shift) and gives crawlers real content.
const ToolClientDynamic = dynamic(() => import('@/components/tools/MarkdownToTextClient'), {
  ssr: false,
  loading: StaticPreview,
});

export default ToolClientDynamic;
