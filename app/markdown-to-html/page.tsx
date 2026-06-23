import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter — Free & No Login',
  description: 'Convert Markdown to clean HTML instantly in your browser. Supports GFM, syntax-highlighted code, tables, and images. Copy or download the HTML. Free, no signup.',
  keywords: ['markdown to html', 'md to html', 'convert markdown to html', 'markdown html converter', 'markdown renderer'],
  openGraph: {
    title: 'Free Markdown to HTML Converter — MDTool',
    description: 'Convert Markdown to clean, ready-to-use HTML. Live preview, code highlighting, copy or download. 100% free, no login.',
    url: 'https://www.mdtool.dev/markdown-to-html',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/markdown-to-html',
  },
};

const FAQ_ITEMS = [
  {
    q: 'Can I convert GitHub Flavored Markdown (GFM) to HTML?',
    a: 'Yes. MDTool fully supports GitHub Flavored Markdown including tables, task lists, strikethrough, fenced code blocks with syntax highlighting, and autolinks.',
    text: 'Yes. MDTool fully supports GitHub Flavored Markdown including tables, task lists, strikethrough, fenced code blocks with syntax highlighting, and autolinks.',
  },
  {
    q: 'Does the output include syntax highlighting for code blocks?',
    a: 'Yes. Code blocks are rendered with highlight.js CSS classes baked in. Include a highlight.js stylesheet on your page (or use the "Full document" download, which links one automatically) to see colors.',
    text: 'Yes. Code blocks are rendered with highlight.js CSS classes baked in. Include a highlight.js stylesheet on your page to see colors.',
  },
  {
    q: 'Is my Markdown sent to a server?',
    a: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
    text: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
  },
  {
    q: 'What is the difference between "Full document" and snippet output?',
    a: 'Full document wraps the converted HTML in a complete <html>/<head>/<body> structure with basic styling — ready to save as a standalone .html file. Turning it off gives you just the HTML fragment, ideal for pasting into an existing page, CMS, or email template.',
    text: 'Full document wraps the converted HTML in a complete html/head/body structure with basic styling. Turning it off gives you just the HTML fragment, ideal for pasting into an existing page or CMS.',
  },
  {
    q: 'Can I copy the HTML instead of downloading it?',
    a: 'Yes. Click "Copy" in the output panel to copy the current HTML (snippet or full document) straight to your clipboard.',
    text: 'Yes. Click Copy in the output panel to copy the current HTML straight to your clipboard.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
    text: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
  },
];

export default function MarkdownToHtmlPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Markdown to HTML Converter"
        url="/markdown-to-html"
        description="Convert Markdown to clean HTML instantly in your browser. Supports GitHub Flavored Markdown, code blocks with syntax highlighting, tables, and images."
        featureList={[
          'Markdown to HTML conversion',
          'GitHub Flavored Markdown support',
          'Code syntax highlighting',
          'Snippet or full-document HTML output',
          'Copy to clipboard',
          'Client-side processing — files never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown to HTML Converter', url: '/markdown-to-html' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero / Header */}
        <section className="bg-white border-b border-gray-200 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Free Markdown to HTML Converter
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Paste Markdown or upload a .md file. Get clean, ready-to-use HTML instantly — no login, no watermark, no limits. Live preview, code highlighting, and one-click copy or download.
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Convert Markdown to HTML</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Paste your Markdown text in the left panel, or click <strong>Upload .md</strong> to load a file</li>
            <li>Watch the live HTML preview update in real-time on the right</li>
            <li>Switch to the <strong>Code</strong> tab to view the raw HTML, and toggle <strong>Full document</strong> for a standalone file vs. a pasteable snippet</li>
            <li>Click <strong>Copy</strong> or <strong>Download .html</strong> to grab your output</li>
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
              <a href="/markdown-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to PDF →
              </a>
              <a href="/markdown-to-word" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to Word →
              </a>
              <a href="/html-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                HTML to Markdown →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
