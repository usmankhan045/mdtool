import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'HTML to Markdown Converter — Free & No Login',
  description: 'Convert HTML to clean Markdown instantly in your browser. Supports tables, code blocks, links, and lists (GFM). Free, no signup.',
  keywords: ['html to markdown', 'html to md', 'convert html to markdown', 'html markdown converter'],
  openGraph: {
    title: 'Free HTML to Markdown Converter — MDTool',
    description: 'Convert HTML to clean Markdown instantly. Supports tables, code blocks, and GFM. 100% free, no login.',
    url: 'https://www.mdtool.dev/html-to-markdown',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/html-to-markdown',
  },
};

const FAQ_ITEMS = [
  {
    q: 'Does it support tables, code blocks, and lists?',
    a: 'Yes. The converter uses GitHub Flavored Markdown rules, so HTML tables, fenced code blocks (with the language preserved from a class like "language-js"), ordered/unordered lists, and strikethrough text all convert correctly.',
    text: 'Yes. The converter uses GitHub Flavored Markdown rules, so HTML tables, fenced code blocks, lists, and strikethrough text all convert correctly.',
  },
  {
    q: 'Can I upload an .html file instead of pasting?',
    a: 'Yes. Click "Upload .html" or drag and drop a .html or .htm file directly onto the input panel.',
    text: 'Yes. Click Upload .html or drag and drop a .html or .htm file directly onto the input panel.',
  },
  {
    q: 'Is my HTML sent to a server?',
    a: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
    text: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
  },
  {
    q: 'What happens to inline styles and scripts?',
    a: 'Markdown has no concept of inline CSS or scripts, so style attributes, <script> tags, and other non-content markup are dropped — only the semantic structure (headings, text, links, images, tables, code) is preserved.',
    text: 'Style attributes, script tags, and other non-content markup are dropped — only the semantic structure is preserved.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
    text: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
  },
];

export default function HtmlToMarkdownPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="HTML to Markdown Converter"
        url="/html-to-markdown"
        description="Convert HTML to clean Markdown instantly in your browser. Supports tables, code blocks, links, and lists (GFM)."
        featureList={[
          'HTML to Markdown conversion',
          'GitHub Flavored Markdown output',
          'Code block language preservation',
          'File upload and drag-and-drop',
          'Client-side processing — files never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'HTML to Markdown Converter', url: '/html-to-markdown' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero / Header */}
        <section className="bg-white border-b border-gray-200 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Free HTML to Markdown Converter
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Paste HTML or upload a .html file. Get clean Markdown instantly — no login, no watermark, no limits. Supports tables, code blocks, and GitHub Flavored Markdown.
            </p>
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Convert HTML to Markdown</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Paste your HTML in the left panel, or click <strong>Upload .html</strong> to load a file</li>
            <li>The Markdown output updates live on the right as you type</li>
            <li>Click <strong>Copy</strong> or <strong>Download .md</strong> to grab your output</li>
          </ol>
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
              <a href="/markdown-to-html" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to HTML →
              </a>
              <a href="/word-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Word to Markdown →
              </a>
              <a href="/markdown-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to PDF →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
