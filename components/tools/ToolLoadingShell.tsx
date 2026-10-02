/**
 * Static, server-rendered stand-in for the converters while their client
 * bundles (loaded with `ssr: false`) download. It mirrors each converter's
 * layout class for class (shared ./ui strings: workspace bar, 60px pane heads, 340/500px pane
 * bodies) so hydration swaps it out with zero layout shift, and it gives
 * crawlers real text: the tool name, a sample input and a rendered output.
 *
 * No hooks, no event handlers, no heavy imports: it ships as plain markup.
 */

import {
  WORKSPACE, WORKSPACE_BAR, SPLIT, PANE, PANE_HEAD, PANE_TITLE, META, BTN_PRIMARY, BTN_OUTLINE, BTN_GHOST, BTN_MAIN,
  SEG, SEG_ITEM, SEG_ON, SEG_OFF, FIELD_LABEL, ICON_UPLOAD, ICON_DOWNLOAD, TEXTAREA,
} from './ui';
import { ToolIcon, LiveBadge } from './UiParts';
import { PDF_SAMPLE_MARKDOWN, WORD_SAMPLE_MARKDOWN, HTML_SAMPLE_MARKDOWN, HTML_INPUT_SAMPLE } from './samples';

export type ToolShellVariant = 'md-to-pdf' | 'md-to-html' | 'md-to-word' | 'html-to-md' | 'word-to-md';

const SAMPLE_MARKDOWN_OUTPUT = `# Project Notes

Convert **HTML** into clean Markdown.

- Runs in your browser, nothing is uploaded
- Tables, task lists and code blocks

| Feature | Supported |
| ------- | --------- |
| GFM     | Yes       |`;

const SAMPLE_WORD_MARKDOWN_OUTPUT = `# Quarterly Report

Exported from **report.docx** with headings, lists and tables intact.

## Highlights

1. Revenue grew 12%
2. Two new product launches

| Region | Growth |
| ------ | ------ |
| EMEA   | 9%     |`;

const TOOL_LABELS: Record<ToolShellVariant, string> = {
  'md-to-pdf': 'Markdown → PDF',
  'md-to-html': 'Markdown → HTML',
  'md-to-word': 'Markdown → Word',
  'html-to-md': 'HTML → Markdown',
  'word-to-md': 'Word → Markdown',
};

// Same class strings as the real converters (./ui), so the swap is pixel-identical.
// Fixed (not min-) height so the sample content can never grow a pane past the real tool's size.
const BODY = 'w-full h-[340px] sm:h-[500px] overflow-hidden';
const PRE = 'm-0 p-4 font-mono text-[13px] leading-6 text-zinc-800 whitespace-pre-wrap';

function RenderedSample({ serif = false }: { serif?: boolean }) {
  return (
    <div className={`p-6 text-zinc-800 text-sm leading-relaxed ${serif ? 'font-serif' : ''}`}>
      <h2 className="text-2xl font-bold mb-3 pb-1 border-b border-zinc-200">Project Notes</h2>
      <p className="mb-3">
        Convert <strong>Markdown</strong> into a clean, shareable document.
      </p>
      <ul className="list-disc pl-5 mb-3 space-y-1">
        <li>Runs in your browser, nothing is uploaded</li>
        <li>Tables, task lists and code blocks</li>
      </ul>
      <table className="mb-3 border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-zinc-300 bg-zinc-50 px-3 py-1 text-left">Feature</th>
            <th className="border border-zinc-300 bg-zinc-50 px-3 py-1 text-left">Supported</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-zinc-300 px-3 py-1">GFM</td>
            <td className="border border-zinc-300 px-3 py-1">Yes</td>
          </tr>
        </tbody>
      </table>
      <pre className="m-0 rounded-md bg-zinc-100 p-3 font-mono text-xs">
        <code>console.log(&apos;Hello, MDTool&apos;);</code>
      </pre>
    </div>
  );
}

// Same word count formula as countWords() in lib/markdown, without importing marked.
const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

// The input is a read-only <textarea> with the editor's exact classes and text,
// so the client editor replacing it paints nothing larger (no late LCP).
function MarkdownInputPanel({ label, sample }: { label: string; sample: string }) {
  return (
    <div className={`${PANE} h-full`}>
      <div className={PANE_HEAD}>
        <span className={PANE_TITLE}>{label}</span>
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className={`${META} mr-1.5`}>{wordCount(sample)} words</span>
          <span className={BTN_OUTLINE}>
            <ToolIcon d={ICON_UPLOAD} />
            Upload .md
          </span>
          <span className={BTN_GHOST}>Clear</span>
        </div>
      </div>
      <textarea readOnly defaultValue={sample} className={TEXTAREA} spellCheck={false} aria-label={label} />
    </div>
  );
}

function PreviewPanel({ title, serif }: { title: string; serif?: boolean }) {
  return (
    <div className={PANE}>
      <div className={PANE_HEAD}>
        <span className={PANE_TITLE}>{title}</span>
        <LiveBadge />
      </div>
      <div className={BODY}>
        <RenderedSample serif={serif} />
      </div>
    </div>
  );
}

function MarkdownOutputPanel({ sample }: { sample: string }) {
  return (
    <div className={PANE}>
      <div className={PANE_HEAD}>
        <span className={PANE_TITLE}>Markdown Output</span>
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className={`${META} mr-1.5`}>{sample.length} chars</span>
          <span className={BTN_OUTLINE}>Copy</span>
          <span className={BTN_PRIMARY}>
            <ToolIcon d={ICON_DOWNLOAD} />
            Download .md
          </span>
        </div>
      </div>
      <div className={BODY}>
        <pre className={PRE}>{sample}</pre>
      </div>
    </div>
  );
}

function Segmented({ items, active = 0, label }: { items: string[]; active?: number; label?: string }) {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      {label && <span className={FIELD_LABEL}>{label}</span>}
      <div className={`${SEG} flex-wrap`}>
        {items.map((t, i) => (
          <span key={t} className={`${SEG_ITEM} ${i === active ? SEG_ON : SEG_OFF}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ToolLoadingShell({ variant }: { variant: ToolShellVariant }) {
  const label = TOOL_LABELS[variant];

  return (
    <div className={WORKSPACE} aria-busy="true" data-tool-shell={variant}>
      {variant === 'md-to-pdf' && (
        <>
          <div className={WORKSPACE_BAR}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Segmented label="Theme" items={['GitHub', 'Academic', 'Minimal', 'Dark']} />
              <Segmented label="Page" items={['A4', 'US Letter']} />
            </div>
            <span className={BTN_MAIN} aria-hidden>
              <ToolIcon d={ICON_DOWNLOAD} />
              Download PDF (Free)
            </span>
          </div>
          <div className={SPLIT}>
            <MarkdownInputPanel label={label} sample={PDF_SAMPLE_MARKDOWN} />
            <PreviewPanel title="PDF Preview" />
          </div>
        </>
      )}

      {variant === 'md-to-word' && (
        <>
          <div className={WORKSPACE_BAR}>
            <p className="text-[13px] text-zinc-500">
              Converts to a real, editable .docx file that opens in Word, Google Docs, and LibreOffice.
            </p>
            <span className={BTN_MAIN} aria-hidden>
              <ToolIcon d={ICON_DOWNLOAD} />
              Download Word (Free)
            </span>
          </div>
          <div className={SPLIT}>
            <MarkdownInputPanel label={label} sample={WORD_SAMPLE_MARKDOWN} />
            <PreviewPanel title="Word Preview" serif />
          </div>
        </>
      )}

      {variant === 'md-to-html' && (
        <div className={SPLIT}>
          <MarkdownInputPanel label={label} sample={HTML_SAMPLE_MARKDOWN} />
          <div className={PANE}>
            <div className={PANE_HEAD}>
              <Segmented items={['Preview', 'Code']} />
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="mr-1.5 flex items-center gap-1.5 text-xs text-zinc-500">Full document</span>
                <span className={BTN_OUTLINE}>Copy</span>
                <span className={BTN_PRIMARY}>
                  <ToolIcon d={ICON_DOWNLOAD} />
                  Download .html
                </span>
              </div>
            </div>
            <div className={BODY}>
              <RenderedSample />
            </div>
          </div>
        </div>
      )}

      {variant === 'html-to-md' && (
        <div className={SPLIT}>
          <div className={PANE}>
            <div className={PANE_HEAD}>
              <span className={PANE_TITLE}>{label}</span>
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className={`${META} mr-1.5`}>{HTML_INPUT_SAMPLE.length} chars</span>
                <span className={BTN_OUTLINE}>
                  <ToolIcon d={ICON_UPLOAD} />
                  Upload .html
                </span>
                <span className={BTN_GHOST}>Clear</span>
              </div>
            </div>
            <div className={BODY}>
              <pre className={PRE}>{HTML_INPUT_SAMPLE}</pre>
            </div>
          </div>
          <MarkdownOutputPanel sample={SAMPLE_MARKDOWN_OUTPUT} />
        </div>
      )}

      {variant === 'word-to-md' && (
        <div className={SPLIT}>
          <div className={PANE}>
            <div className={PANE_HEAD}>
              <span className={PANE_TITLE}>{label}</span>
            </div>
            <div className={`${BODY} flex flex-col p-4`}>
              <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50/60">
                <p className="text-sm text-zinc-500">Drag and drop a .docx file here</p>
                <span className={BTN_PRIMARY} aria-hidden>Choose .docx file</span>
              </div>
            </div>
          </div>
          <MarkdownOutputPanel sample={SAMPLE_WORD_MARKDOWN_OUTPUT} />
        </div>
      )}
    </div>
  );
}
