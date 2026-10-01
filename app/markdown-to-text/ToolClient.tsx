'use client';

import dynamic from 'next/dynamic';
import { WORKSPACE, SPLIT, PANE, PANE_HEAD, PANE_TITLE } from '@/components/tools/ui';

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
    <div className={WORKSPACE}>
      <div className={`${SPLIT} lg:h-[560px]`}>
        <div className={`${PANE} overflow-hidden`}>
          <div className={PANE_HEAD}>
            <span className={PANE_TITLE}>Markdown Input</span>
          </div>
          <pre className="flex-1 p-4 font-mono text-[13px] leading-6 text-zinc-800 whitespace-pre-wrap overflow-hidden">{FALLBACK_INPUT}</pre>
        </div>
        <div className={`${PANE} overflow-hidden`}>
          <div className={PANE_HEAD}>
            <span className={PANE_TITLE}>Plain Text Output</span>
          </div>
          <pre className="flex-1 p-4 font-mono text-[13px] leading-6 text-zinc-800 whitespace-pre-wrap overflow-hidden">{FALLBACK_OUTPUT}</pre>
        </div>
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
