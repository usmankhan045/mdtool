import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';

export const metadata: Metadata = {
  title: 'Word to Markdown Converter — Free & No Login',
  description: 'Convert .docx Word documents to clean Markdown instantly in your browser. Supports headings, tables, lists, and formatting. Free, no signup, no limits.',
  keywords: ['word to markdown', 'docx to markdown', 'docx to md', 'convert word to markdown', 'word markdown converter'],
  openGraph: {
    title: 'Free Word to Markdown Converter — MDTool',
    description: 'Convert .docx Word documents to clean Markdown instantly. Supports headings, tables, and lists. 100% free, no login.',
    url: 'https://www.mdtool.dev/word-to-markdown',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/word-to-markdown',
  },
};

const FAQ_ITEMS = [
  {
    q: 'What file formats are supported?',
    a: (
      <>
        Modern .docx files (Word 2007 and later, the{' '}
        <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-376/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Office Open XML
        </a>{' '}
        format). Legacy .doc files (Word 97-2003 binary format) are not supported — save the file as .docx first if you have an older file.
      </>
    ),
    text: 'Modern .docx files are supported. Legacy .doc files (Word 97-2003 binary format) are not supported — save the file as .docx first.',
  },
  {
    q: 'Is my Word document uploaded to a server?',
    a: 'No. The file is read and converted entirely in your browser using JavaScript. It never leaves your device.',
    text: 'No. The file is read and converted entirely in your browser using JavaScript. It never leaves your device.',
  },
  {
    q: 'Are headings, tables, and lists preserved?',
    a: 'Yes. Heading styles, bold/italic text, bullet and numbered lists, and tables are converted to their Markdown equivalents.',
    text: 'Yes. Heading styles, bold/italic text, bullet and numbered lists, and tables are converted to their Markdown equivalents.',
  },
  {
    q: 'What happens to images in the Word document?',
    a: 'Embedded images are not extracted in the current version — only text content and structure are converted. We recommend re-adding images manually after conversion.',
    text: 'Embedded images are not extracted in the current version — only text content and structure are converted.',
  },
  {
    q: 'Can I edit the Markdown before downloading?',
    a: 'The output panel is currently read-only. Copy the result and paste it into your editor of choice to make further edits, or download the .md file directly.',
    text: 'The output panel is read-only. Copy the result into your editor of choice, or download the .md file directly.',
  },
];

export default function WordToMarkdownPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Word to Markdown Converter"
        url="/word-to-markdown"
        description="Convert .docx Word documents to clean Markdown instantly in your browser. Supports headings, tables, and lists."
        dateModified="2026-06-24"
        featureList={[
          'Word (.docx) to Markdown conversion',
          'Headings, tables, and lists preserved',
          'Drag-and-drop file upload',
          'Client-side processing — files never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Word to Markdown Converter', url: '/word-to-markdown' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero / Header */}
        <section className="bg-white border-b border-gray-200 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Free Word to Markdown Converter
            </h1>
            <p className="text-xs text-gray-400 mb-3">Updated June 24, 2026</p>
            <p className="text-base text-gray-700 max-w-2xl mb-3 leading-relaxed">
              <strong>Word to Markdown conversion</strong> reads the structural styles in a .docx file —
              Heading 1, Heading 2, bullet lists, tables — and re-expresses them as plain Markdown syntax.
              MDTool converts Word to Markdown entirely in your browser: upload a .docx file and get clean,
              version-control-friendly Markdown back, free, with no signup and no file size limit.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mb-4">
              Headings, tables, and lists convert automatically. No login, no watermark.
            </p>
            <ConversionDiagram from="Word (.docx)" to="Markdown" />
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Convert Word to Markdown</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click <strong>Choose .docx file</strong> or drag and drop your Word document onto the left panel</li>
            <li>Wait a moment while MDTool reads and converts the document</li>
            <li>Click <strong>Copy</strong> or <strong>Download .md</strong> to grab your Markdown output</li>
          </ol>
        </section>

        {/* Format-specific substance */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Gets Lost When Converting from Word</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              A Word document carries a lot of information that has no Markdown equivalent: tracked changes,
              comments, footnotes, custom font colors, and direct character formatting that was applied by
              hand rather than through a named style. Converting to Markdown means deciding which of that to
              keep.
            </p>
            <p>
              MDTool&apos;s converter, built on{' '}
              <a href="https://github.com/mwilliamson/mammoth.js" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mammoth</a>,
              focuses on structural styles rather than manual formatting: a paragraph styled as &ldquo;Heading 1&rdquo; or
              &ldquo;Heading 2&rdquo; in Word becomes a Markdown heading, list-formatted paragraphs become
              bullet or numbered Markdown lists, and table grids become Markdown tables. Text that was just
              made bigger or bold by hand — without using an actual Word heading style — won&apos;t be
              recognized as a heading, because Word itself doesn&apos;t mark it as one structurally.
            </p>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Word element</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Markdown output</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Heading 1 / Heading 2 styles</td>
                  <td className="px-3 py-2">✅ #, ##</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Bullet / numbered lists, tables</td>
                  <td className="px-3 py-2">✅ Markdown lists / pipe tables</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Bold / italic text</td>
                  <td className="px-3 py-2">✅ **bold** / *italic*</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Manual formatting (no named style)</td>
                  <td className="px-3 py-2">❌ Treated as plain text</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Embedded images, comments, tracked changes</td>
                  <td className="px-3 py-2">❌ Not extracted</td>
                </tr>
              </tbody>
            </table>
            <p>
              Embedded images aren&apos;t extracted in the current version, so an image-heavy document will
              convert with its text and structure intact but its images missing — plan to re-add those
              manually after conversion, or keep working from the original .docx for documents where the
              images matter as much as the text.
            </p>
            <p>
              This style-based approach is also why pasted-in text from another source sometimes converts
              unevenly: if someone copied a paragraph from a PDF or web page into the Word document without
              reapplying a heading style, Word stores it as plain body text with manual formatting on top,
              and the converter — correctly, by Word&apos;s own structural rules — treats it as a normal
              paragraph rather than guessing that it was meant to be a heading.
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
              <a href="/markdown-to-word" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to Word →
              </a>
              <a href="/html-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                HTML to Markdown →
              </a>
              <a href="/markdown-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to PDF →
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
