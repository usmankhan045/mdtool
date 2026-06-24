import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';

export const metadata: Metadata = {
  title: 'Markdown to Word Converter — Free & No Login',
  description: 'Convert Markdown to a real, editable .docx Word document instantly in your browser. Supports headings, tables, lists, and code blocks. Free, no signup.',
  keywords: ['markdown to word', 'md to word', 'markdown to docx', 'convert markdown to word', 'markdown word converter'],
  openGraph: {
    title: 'Free Markdown to Word Converter — MDTool',
    description: 'Convert Markdown to an editable .docx file instantly. Opens in Word, Google Docs, and LibreOffice. 100% free, no login.',
    url: 'https://www.mdtool.dev/markdown-to-word',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/markdown-to-word',
  },
};

const FAQ_ITEMS = [
  {
    q: 'Will the output be a real, editable Word document?',
    a: (
      <>
        Yes. MDTool generates a genuine .docx file (the{' '}
        <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-376/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Office Open XML
        </a>{' '}
        standard) — not a PDF or an image. You can open and edit it in Microsoft Word, Google Docs, or LibreOffice Writer.
      </>
    ),
    text: 'Yes. MDTool generates a genuine .docx file (Office Open XML), editable in Microsoft Word, Google Docs, or LibreOffice Writer.',
  },
  {
    q: 'Are tables and headings preserved?',
    a: 'Yes. Headings, bold/italic text, bullet and numbered lists, tables, blockquotes, and code blocks are all converted to their native Word equivalents.',
    text: 'Yes. Headings, bold/italic text, bullet and numbered lists, tables, blockquotes, and code blocks are all converted to their native Word equivalents.',
  },
  {
    q: 'Is my Markdown uploaded to a server?',
    a: 'No. The .docx file is generated entirely client-side in your browser. Your content never leaves your device.',
    text: 'No. The .docx file is generated entirely client-side in your browser. Your content never leaves your device.',
  },
  {
    q: 'Does it support Mermaid diagrams or images like the PDF converter?',
    a: 'Word documents render fonts and basic layout very differently from PDFs — Mermaid diagrams and embedded images are not yet supported in the Word export. Use the Markdown to PDF tool if you need diagrams.',
    text: 'Mermaid diagrams and embedded images are not yet supported in the Word export. Use the Markdown to PDF tool if you need diagrams.',
  },
  {
    q: 'Can I convert a GitHub README to Word?',
    a: 'Yes. Copy the raw content of your README.md from GitHub, paste it into the editor on the left, and click Download Word.',
    text: 'Yes. Copy the raw content of your README.md from GitHub, paste it into the editor, and click Download Word.',
  },
];

export default function MarkdownToWordPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Markdown to Word Converter"
        url="/markdown-to-word"
        description="Convert Markdown to a real, editable .docx Word document instantly in your browser. Supports headings, tables, lists, and code blocks."
        dateModified="2026-06-24"
        featureList={[
          'Markdown to editable .docx conversion',
          'Tables, lists, and headings preserved',
          'Opens in Word, Google Docs, and LibreOffice',
          'Live Word-style preview',
          'Client-side processing — files never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown to Word Converter', url: '/markdown-to-word' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero / Header */}
        <section className="bg-white border-b border-gray-200 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Free Markdown to Word Converter
            </h1>
            <p className="text-xs text-gray-400 mb-3">Updated June 24, 2026</p>
            <p className="text-base text-gray-700 max-w-2xl mb-3 leading-relaxed">
              <strong>Markdown to Word conversion</strong> turns Markdown syntax into a real, editable .docx
              file — headings become Word heading styles, lists become native bullet or numbered lists, and
              tables become Word table grids. MDTool generates the .docx entirely in your browser, with no
              upload step, so the file opens directly in Microsoft Word, Google Docs, or LibreOffice Writer —
              free, with no signup.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mb-4">
              Opens in Word, Google Docs, and LibreOffice. No login, no watermark, no limits.
            </p>
            <ConversionDiagram from="Markdown" to="Word (.docx)" />
          </div>
        </section>

        {/* Main Tool — Client Component */}
        <section className="max-w-6xl mx-auto px-4 py-6">
          <ToolClient />
        </section>

        {/* Ad Slot — Between tool and FAQ */}
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        {/* SEO Content */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Convert Markdown to Word</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Paste your Markdown text in the left panel, or click <strong>Upload .md</strong> to load a file</li>
            <li>See the live Word-style preview update in real-time on the right</li>
            <li>Click <strong>Download Word — Free</strong> to save your .docx file</li>
            <li>Open it directly in Microsoft Word, Google Docs, or LibreOffice Writer</li>
          </ol>
        </section>

        {/* Format-specific substance */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Mermaid Diagrams Aren&apos;t in the Word Export Yet</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              HTML and PDF can both embed a diagram as a vector image directly in the page — an inline{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;svg&gt;</code> for HTML, or a captured
              vector layer for PDF. The Word format (.docx, technically Office Open XML) doesn&apos;t work that
              way. An image in a Word document has to exist as a separate embedded file with its own
              relationship entry in the document&apos;s XML structure — a meaningfully different code path
              than rendering a diagram onto a canvas.
            </p>
            <p>
              MDTool&apos;s Word export, built on the{' '}
              <a href="https://docx.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">docx</a>{' '}
              library, is focused on getting text structure right first: heading levels, bold/italic runs,
              bullet and numbered lists, and tables all map cleanly to their native Word equivalents. Mermaid
              diagrams and embedded images aren&apos;t wired into that pipeline yet. If your document needs the
              diagrams to render, use the{' '}
              <a href="/markdown-to-pdf" className="text-blue-600 hover:underline">Markdown to PDF converter</a> instead,
              which renders Mermaid directly in the browser before generating the file.
            </p>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Markdown element</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Word output</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Headings (#, ##)</td>
                  <td className="px-3 py-2">✅ Native Word heading styles</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Lists, tables, blockquotes</td>
                  <td className="px-3 py-2">✅ Native Word lists/tables</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Bold, italic, code spans</td>
                  <td className="px-3 py-2">✅ Native character formatting</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Mermaid diagrams</td>
                  <td className="px-3 py-2">❌ Not yet supported — use Markdown to PDF</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Embedded images</td>
                  <td className="px-3 py-2">❌ Not yet supported</td>
                </tr>
              </tbody>
            </table>
            <p>
              In practice this trade-off rarely matters for the documents people actually send through a Word
              converter: contracts, reports, proposals, and meeting notes are almost entirely headings, body
              text, and tables — exactly what the Office Open XML pipeline handles natively. Diagrams tend to
              show up in technical READMEs and developer docs, which are also exactly the documents most
              likely to end up as a PDF or web page rather than a .docx file, so the PDF export is the better
              fit for that case anyway.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <FaqSection items={FAQ_ITEMS} />
        </section>

        {/* Related Tools */}
        <section className="bg-white border-t border-gray-100 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">You might also need:</h2>
            <div className="flex flex-wrap gap-3">
              <a href="/markdown-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to PDF →
              </a>
              <a href="/markdown-to-html" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to HTML →
              </a>
              <a href="/word-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Word to Markdown →
              </a>
              <a href="/blog/markdown-cheatsheet" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown Syntax Cheatsheet →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
