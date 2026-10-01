import type { Metadata } from 'next';
import Link from 'next/link';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';

export const metadata: Metadata = {
  title: 'Markdown to Plain Text: Strip Markdown Online',
  description: 'Convert Markdown to clean plain text in your browser. Removes #, ** and link syntax while keeping paragraphs, lists and table rows. Copy or download .txt. Free.',
  keywords: ['markdown to text', 'markdown to plain text', 'strip markdown', 'remove markdown formatting', 'md to txt'],
  openGraph: {
    title: 'Free Markdown to Plain Text Converter | MDTool',
    description: 'Strip Markdown formatting and get clean, readable plain text. Keeps paragraphs, lists and table rows. 100% free, no login, runs in your browser.',
    url: 'https://www.mdtool.dev/markdown-to-text',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/markdown-to-text',
  },
};

const code = 'text-sm bg-zinc-100 px-1 py-0.5 rounded';

const FAQ_ITEMS = [
  {
    q: 'How do I remove Markdown formatting from text?',
    a: 'Paste the Markdown into the left panel. The right panel instantly shows the same content with every formatting marker removed: no #, **, _, backticks or link brackets. Click Copy to put the plain text on your clipboard, or Download .txt to save it as a file.',
    text: 'Paste the Markdown into the left panel. The right panel instantly shows the content with every formatting marker removed. Click Copy or Download .txt.',
  },
  {
    q: 'What happens to links when Markdown is converted to plain text?',
    a: 'By default a link like [docs](https://example.com) becomes "docs (https://example.com)", so the URL is not lost. Turn off the Link URLs toggle to keep only the link text. Bare URLs and email addresses are kept as they are.',
    text: 'By default a Markdown link becomes "text (url)" so the URL is not lost. Turn off the Link URLs toggle to keep only the link text.',
  },
  {
    q: 'Can I clean up ChatGPT or other AI output that is full of asterisks and pound signs?',
    a: 'Yes. ChatGPT, Claude, Gemini and most other assistants answer in Markdown, which shows up as stray ** and ### when pasted into an app that does not render it. Paste the response here and copy the plain-text version: headings, bold text and lists come out clean.',
    text: 'Yes. AI assistants answer in Markdown, which shows up as stray ** and ### in apps that do not render it. Paste the response here and copy the plain-text version.',
  },
  {
    q: 'Are tables kept when converting Markdown to plain text?',
    a: 'Yes. Each table row becomes one line with cells separated by tab characters, and the |---| separator row is dropped. Tab-separated rows paste straight into Excel or Google Sheets as real columns.',
    text: 'Yes. Each table row becomes one line with tab-separated cells, which pastes into Excel or Google Sheets as real columns.',
  },
  {
    q: 'Does the converter keep line breaks and paragraphs?',
    a: 'Yes. Paragraphs stay separated by a blank line and hard line breaks are kept. If your Markdown is hard-wrapped at 80 characters, turn on Join wrapped lines to merge each paragraph into a single line, which is what most email clients and web forms expect.',
    text: 'Yes. Paragraphs stay separated by a blank line. Turn on Join wrapped lines to merge hard-wrapped paragraphs into single lines.',
  },
  {
    q: 'Is my text uploaded to a server?',
    a: 'No. The conversion runs entirely in your browser with JavaScript. Your Markdown is never sent, stored or logged, and the tool keeps working if you go offline after the page loads.',
    text: 'No. The conversion runs entirely in your browser. Your Markdown is never sent, stored or logged.',
  },
];

const ELEMENT_ROWS: [string, string, string][] = [
  ['Headings', '## Setup', 'Setup'],
  ['Bold, italic, strikethrough', '**fast** and _easy_', 'fast and easy'],
  ['Links', '[docs](https://x.dev)', 'docs (https://x.dev), or docs with Link URLs off'],
  ['Images', '![Logo](logo.png)', 'Logo (the alt text)'],
  ['Bullet lists', '- item', '- item, or item with List bullets off'],
  ['Numbered lists', '1. step', '1. step, or step with List bullets off'],
  ['Task lists', '- [x] done', '- [x] done'],
  ['Inline code', '`npm install`', 'npm install'],
  ['Fenced code blocks', '```js … ```', 'The code itself, without the fences'],
  ['Blockquotes', '> Note', 'Note'],
  ['Tables', '| a | b |', 'a⇥b (one tab-separated line per row)'],
  ['Horizontal rules', '---', 'Removed'],
  ['Raw HTML and entities', '<b>Hi</b> &amp;', 'Hi &'],
  ['Footnotes', 'text[^1] … [^1]: note', 'text[1] … [1] note'],
  ['YAML front matter', '--- title: x --- (at the top)', 'Removed'],
];

export default function MarkdownToTextPage() {
  return (
    <>
      <StructuredData
        type="tool"
        datePublished="2026-10-01"
        dateModified="2026-10-01"
        name="Markdown to Plain Text Converter"
        url="/markdown-to-text"
        description="Convert Markdown to clean plain text in your browser. Strips headings, emphasis, link syntax and code fences while keeping paragraphs, lists and table rows."
        featureList={[
          'Markdown to plain text conversion',
          'Keeps paragraph breaks, list items and table rows',
          'Links as "text (url)" or text only',
          'Optional list bullets and line joining',
          'Tables as tab-separated rows',
          'HTML tags stripped and entities decoded',
          'Copy to clipboard or download .txt',
          'Client-side processing, text never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown to Plain Text Converter', url: '/markdown-to-text' },
        ]}
      />

      <main className="min-h-screen bg-page">
        {/* Hero - title over the live converter */}
        <section className="hero-grid text-zinc-950">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Markdown to Plain Text Converter
            </h1>
            <p className="text-base md:text-lg text-zinc-600 max-w-2xl mb-3 leading-relaxed">
              Strip the #, ** and [link](url) syntax out of any Markdown and get clean, readable text you can
              paste anywhere. Copy it or download a .txt file.
            </p>
            <p className="text-xs text-zinc-500">Published October 1, 2026 · Built and maintained by MDTool</p>
          </div>
        </section>

        {/* The tool */}
        <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
          <ToolClient />
        </section>

        {/* Answer-first summary */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <p className="text-base text-zinc-700 leading-relaxed max-w-2xl flex-1">
              <strong>Converting Markdown to plain text</strong> removes the formatting syntax (# headings,
              **bold**, link brackets, code fences) and keeps only the words. MDTool does it in your browser:
              paragraphs stay separated, lists become simple lines, links keep their URL in parentheses, and
              tables become tab-separated rows. It is free, with no signup.
            </p>
            <ConversionDiagram from="Markdown" to="Plain text" />
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        {/* How to */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">How to Strip Markdown Formatting</h2>
          <ol className="list-decimal list-inside space-y-2 text-zinc-700 max-w-3xl">
            <li>Paste your Markdown into the left panel, or click <strong>Upload .md</strong> to load a .md,
              .markdown or .txt file. You can also drag a file onto the editor</li>
            <li>Read the plain-text result on the right. It updates as you type, with a live word and
              character count</li>
            <li>Adjust the toggles: <strong>List bullets</strong> keeps or drops the &quot;- &quot; and
              &quot;1. &quot; prefixes, <strong>Link URLs</strong> keeps or drops the URL after each link,
              and <strong>Join wrapped lines</strong> merges hard-wrapped paragraphs into single lines</li>
            <li>Click <strong>Copy</strong> to put the text on your clipboard, or <strong>Download .txt</strong> to
              save it as a UTF-8 text file</li>
          </ol>
        </section>

        {/* Element mapping */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-zinc-100">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">What Happens to Each Markdown Element</h2>
          <p className="text-zinc-700 leading-relaxed max-w-3xl mb-4">
            The converter parses your Markdown with{' '}
            <a href="https://marked.js.org/" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">marked</a>{' '}
            (CommonMark plus GitHub Flavored Markdown) and walks the parsed structure, so it removes syntax by
            meaning rather than by blindly deleting symbols. An asterisk in <code className={code}>2 * 3</code> or
            inside a code block survives; an asterisk that marks bold text does not.
          </p>
          <div className="overflow-x-auto max-w-4xl">
            <table className="w-full text-sm border border-zinc-200 rounded-lg overflow-hidden">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-zinc-700">Markdown element</th>
                  <th className="text-left px-3 py-2 font-semibold text-zinc-700">Example</th>
                  <th className="text-left px-3 py-2 font-semibold text-zinc-700">Plain-text output</th>
                </tr>
              </thead>
              <tbody>
                {ELEMENT_ROWS.map(([element, example, output], i) => (
                  <tr key={element} className={`border-t border-zinc-200${i % 2 === 1 ? ' bg-zinc-50' : ''}`}>
                    <td className="px-3 py-2 font-medium">{element}</td>
                    <td className="px-3 py-2 font-mono text-xs">{example}</td>
                    <td className="px-3 py-2">{output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-zinc-700 leading-relaxed max-w-3xl mt-4">
            Code is treated as literal text: content inside backticks or a fenced block is copied exactly,
            including characters like <code className={code}>&amp;amp;</code> that would be decoded anywhere
            else. YAML front matter at the top of the file is dropped, since it is metadata rather than
            readable content.
          </p>
        </section>

        {/* Use cases */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-zinc-100">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">When You Need Plain Text Instead of Markdown</h2>
          <div className="space-y-4 text-zinc-700 leading-relaxed max-w-3xl">
            <p>
              <strong>Email, SMS and web forms.</strong> Most email composers, text messages, support-ticket
              forms and job applications show Markdown literally, so a line like{' '}
              <code className={code}>**Important:** see [the guide](https://…)</code> arrives full of symbols.
              Converting first gives the reader &quot;Important: see the guide (https://…)&quot;. Turn on{' '}
              <strong>Join wrapped lines</strong> if the source was wrapped at a fixed width, so the text reflows
              in narrow windows.
            </p>
            <p>
              <strong>Cleaning ChatGPT and other LLM output.</strong> AI assistants format answers in Markdown.
              Pasted into Word, Slack, a CMS field or a spreadsheet that doesn&apos;t render it, the response
              fills up with <code className={code}>###</code> and <code className={code}>**</code>. Paste the answer
              here, copy the plain version, and the structure (paragraphs, list items) survives while the
              symbols go.
            </p>
            <p>
              <strong>Accurate word and character counts.</strong> Counting words on raw Markdown inflates the
              total with URLs, image paths and syntax. The output panel shows the word and character count of
              the plain text itself, which is what limits on meta descriptions, app-store listings, abstracts
              and social posts are measured against.
            </p>
            <p>
              <strong>Feeding text to other tools.</strong> Text-to-speech engines, translation tools, search
              indexes and older systems that expect a .txt file all work better without markup. Download the
              .txt and pass it on.
            </p>
            <p>
              Need formatting kept instead? Use the{' '}
              <a href="/markdown-to-html" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">Markdown to HTML converter</a>{' '}
              for rich text you can paste into a web editor, or{' '}
              <a href="/markdown-to-word" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">Markdown to Word</a> for an
              editable .docx.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <FaqSection items={FAQ_ITEMS} />
        </section>

        {/* Related Tools */}
        <section className="bg-page-soft border-t border-zinc-200/70 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold text-zinc-700 mb-4">You might also need:</h2>
            <div className="flex flex-wrap gap-3">
              <a href="/markdown-to-html" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown to HTML →
              </a>
              <a href="/markdown-to-word" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown to Word →
              </a>
              <a href="/markdown-to-pdf" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown to PDF →
              </a>
              <a href="/html-to-markdown" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                HTML to Markdown →
              </a>
              <Link href="/markdown-cheat-sheet" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown Syntax Cheatsheet →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
