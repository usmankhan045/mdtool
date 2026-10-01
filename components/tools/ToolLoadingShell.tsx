/**
 * Static, server-rendered stand-in for the converters while their client
 * bundles (loaded with `ssr: false`) download. It mirrors each converter's
 * layout class for class (controls bar, 60px panel toolbars, 340/500px panel
 * bodies) so hydration swaps it out with zero layout shift, and it gives
 * crawlers real text: the tool name, a sample input and a rendered output.
 *
 * No hooks, no event handlers, no heavy imports: it ships as plain markup.
 */

export type ToolShellVariant = 'md-to-pdf' | 'md-to-html' | 'md-to-word' | 'html-to-md' | 'word-to-md';

const SAMPLE_MARKDOWN = `# Project Notes

Convert **Markdown** into a clean, shareable document.

- Runs in your browser, nothing is uploaded
- Tables, task lists and code blocks

| Feature | Supported |
| ------- | --------- |
| GFM     | Yes       |

\`\`\`js
console.log('Hello, MDTool');
\`\`\``;

const SAMPLE_HTML = `<h1>Project Notes</h1>
<p>Convert <strong>HTML</strong> into clean Markdown.</p>
<ul>
  <li>Runs in your browser, nothing is uploaded</li>
  <li>Tables, task lists and code blocks</li>
</ul>
<table>
  <tr><th>Feature</th><th>Supported</th></tr>
  <tr><td>GFM</td><td>Yes</td></tr>
</table>`;

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

const PANEL = 'bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden';
const TOOLBAR = 'flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg';
// Fixed (not min-) height so the sample content can never grow the panel past the real tool's size.
const BODY = 'w-full h-[340px] sm:h-[500px] overflow-hidden bg-white border-x border-b border-gray-200 rounded-b-lg';
const PRE = 'm-0 p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap';
const BTN_PRIMARY =
  'flex items-center gap-1.5 text-sm font-semibold px-3.5 min-h-[44px] bg-blue-600 text-white rounded-md shadow-sm';
const BTN_SECONDARY = 'flex items-center text-sm px-3.5 min-h-[44px] bg-white border border-gray-300 rounded-md text-gray-600';
const BTN_SMALL = 'flex items-center text-xs px-3 min-h-[44px] bg-white border border-gray-300 rounded text-gray-600';

function ToolbarLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium text-gray-600">{children}</span>;
}

function LiveBadge() {
  return (
    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
      <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
      Live
    </span>
  );
}

function RenderedSample({ serif = false }: { serif?: boolean }) {
  return (
    <div className={`p-6 text-gray-800 text-sm leading-relaxed ${serif ? 'font-serif' : ''}`}>
      <h2 className="text-2xl font-bold mb-3 pb-1 border-b border-gray-200">Project Notes</h2>
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
            <th className="border border-gray-300 bg-gray-50 px-3 py-1 text-left">Feature</th>
            <th className="border border-gray-300 bg-gray-50 px-3 py-1 text-left">Supported</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-3 py-1">GFM</td>
            <td className="border border-gray-300 px-3 py-1">Yes</td>
          </tr>
        </tbody>
      </table>
      <pre className="m-0 rounded-md bg-gray-100 p-3 font-mono text-xs">
        <code>console.log(&apos;Hello, MDTool&apos;);</code>
      </pre>
    </div>
  );
}

function MarkdownInputPanel({ label }: { label: string }) {
  return (
    <div className={PANEL}>
      <div className="flex flex-col h-full">
        <div className={TOOLBAR}>
          <ToolbarLabel>{label}</ToolbarLabel>
          <div className="flex items-center gap-3" aria-hidden>
            <span className="text-xs text-gray-400">40 words</span>
            <span className={BTN_PRIMARY}>Upload .md</span>
            <span className={BTN_SECONDARY}>Clear</span>
          </div>
        </div>
        <div className={BODY}>
          <pre className={PRE}>{SAMPLE_MARKDOWN}</pre>
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({ title, serif }: { title: string; serif?: boolean }) {
  return (
    <div className={PANEL}>
      <div className="flex flex-col h-full">
        <div className={TOOLBAR}>
          <ToolbarLabel>{title}</ToolbarLabel>
          <LiveBadge />
        </div>
        <div className={BODY}>
          <RenderedSample serif={serif} />
        </div>
      </div>
    </div>
  );
}

function MarkdownOutputPanel({ sample }: { sample: string }) {
  return (
    <div className={PANEL}>
      <div className="flex flex-col h-full">
        <div className={TOOLBAR}>
          <ToolbarLabel>Markdown Output</ToolbarLabel>
          <div className="flex items-center gap-2" aria-hidden>
            <span className="text-xs text-gray-400">{sample.length} chars</span>
            <span className={BTN_SMALL}>Copy</span>
            <span className={BTN_PRIMARY}>Download .md</span>
          </div>
        </div>
        <div className={BODY}>
          <pre className={PRE}>{sample}</pre>
        </div>
      </div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{children}</div>;
}

const CONTROLS_BAR =
  'flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm';
const BIG_DOWNLOAD = 'flex items-center gap-1.5 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-md bg-blue-600';

export default function ToolLoadingShell({ variant }: { variant: ToolShellVariant }) {
  const label = TOOL_LABELS[variant];

  return (
    <div className="space-y-4" aria-busy="true" data-tool-shell={variant}>
      {variant === 'md-to-pdf' && (
        <>
          <div className={CONTROLS_BAR}>
            <div className="flex items-center gap-2 flex-wrap" aria-hidden>
              <span className="text-sm font-medium text-gray-600 mr-1">Theme:</span>
              {['GitHub', 'Academic', 'Minimal', 'Dark'].map((t, i) => (
                <span
                  key={t}
                  className={`px-3.5 min-h-[44px] flex items-center rounded-full text-sm font-medium border ${
                    i === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <span className={BIG_DOWNLOAD} aria-hidden>Download PDF (Free)</span>
          </div>
          <Grid>
            <MarkdownInputPanel label={label} />
            <PreviewPanel title="PDF Preview" />
          </Grid>
        </>
      )}

      {variant === 'md-to-word' && (
        <>
          <div className={CONTROLS_BAR}>
            <p className="text-sm text-gray-500">
              Converts to a real, editable .docx file that opens in Word, Google Docs, and LibreOffice.
            </p>
            <span className={BIG_DOWNLOAD} aria-hidden>Download Word (Free)</span>
          </div>
          <Grid>
            <MarkdownInputPanel label={label} />
            <PreviewPanel title="Word Preview" serif />
          </Grid>
        </>
      )}

      {variant === 'md-to-html' && (
        <Grid>
          <MarkdownInputPanel label={label} />
          <div className={PANEL}>
            <div className="flex flex-col h-full">
              <div className={`${TOOLBAR} gap-2 flex-wrap`}>
                <div className="flex items-center gap-1" aria-hidden>
                  <span className="flex items-center text-xs px-3 min-h-[44px] rounded-md font-medium bg-blue-600 text-white">Preview</span>
                  <span className="flex items-center text-xs px-3 min-h-[44px] rounded-md font-medium bg-white text-gray-600 border border-gray-300">Code</span>
                </div>
                <div className="flex items-center gap-2" aria-hidden>
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">Full document</span>
                  <span className={BTN_SMALL}>Copy</span>
                  <span className={BTN_PRIMARY}>Download .html</span>
                </div>
              </div>
              <div className={BODY}>
                <RenderedSample />
              </div>
            </div>
          </div>
        </Grid>
      )}

      {variant === 'html-to-md' && (
        <Grid>
          <div className={PANEL}>
            <div className="flex flex-col h-full">
              <div className={TOOLBAR}>
                <ToolbarLabel>{label}</ToolbarLabel>
                <div className="flex items-center gap-2" aria-hidden>
                  <span className="text-xs text-gray-400">{SAMPLE_HTML.length} chars</span>
                  <span className={BTN_PRIMARY}>Upload .html</span>
                  <span className={BTN_SECONDARY}>Clear</span>
                </div>
              </div>
              <div className={BODY}>
                <pre className={PRE}>{SAMPLE_HTML}</pre>
              </div>
            </div>
          </div>
          <MarkdownOutputPanel sample={SAMPLE_MARKDOWN_OUTPUT} />
        </Grid>
      )}

      {variant === 'word-to-md' && (
        <Grid>
          <div className={PANEL}>
            <div className="flex flex-col h-full">
              <div className={TOOLBAR}>
                <ToolbarLabel>{label}</ToolbarLabel>
                {/* Real toolbar has no button until a file is chosen; keep the 60px row height. */}
                <span className="min-h-[44px]" aria-hidden />
              </div>
              <div className={`${BODY} flex flex-col items-center justify-center gap-3`}>
                <p className="text-sm text-gray-500">Drag and drop a .docx file here</p>
                <span className={BTN_PRIMARY} aria-hidden>Choose .docx file</span>
              </div>
            </div>
          </div>
          <MarkdownOutputPanel sample={SAMPLE_WORD_MARKDOWN_OUTPUT} />
        </Grid>
      )}
    </div>
  );
}
