import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Markdown to PDF Converter — Free & No Login',
  description: 'Convert Markdown to PDF instantly in your browser. Supports GFM, syntax-highlighted code, tables, images, and Mermaid diagrams. Free, no signup.',
  keywords: ['markdown to pdf', 'md to pdf', 'convert markdown to pdf', 'markdown pdf converter', 'github readme to pdf'],
  openGraph: {
    title: 'Free Markdown to PDF Converter — DevMark',
    description: 'Convert Markdown to PDF instantly. Supports code highlighting, tables, Mermaid diagrams. 100% free, no login.',
    url: 'https://www.mdtool.dev/markdown-to-pdf',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/markdown-to-pdf',
  },
};

const FAQ_ITEMS = [
  {
    q: 'Can I convert GitHub Flavored Markdown (GFM) to PDF?',
    a: (
      <>
        Yes. DevMark fully supports{' '}
        <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          GitHub Flavored Markdown
        </a>{' '}
        including tables, task lists, strikethrough, fenced code blocks with syntax highlighting, and autolinks.
      </>
    ),
    text: 'Yes. DevMark fully supports GitHub Flavored Markdown including tables, task lists, strikethrough, fenced code blocks with syntax highlighting, and autolinks.',
  },
  {
    q: 'Does the converted PDF support syntax highlighting in code blocks?',
    a: (
      <>
        Yes. Code blocks are automatically syntax-highlighted using{' '}
        <a href="https://highlightjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          highlight.js
        </a>
        , which supports over 190 programming languages including JavaScript, Python, TypeScript, Rust, Go, and more.
      </>
    ),
    text: 'Yes. Code blocks are automatically syntax-highlighted using highlight.js, which supports over 190 programming languages including JavaScript, Python, TypeScript, Rust, Go, and more.',
  },
  {
    q: 'Is my Markdown file stored on your servers?',
    a: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device and is never sent to any server.',
    text: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device and is never sent to any server.',
  },
  {
    q: 'Does it support Mermaid diagrams?',
    a: (
      <>
        Yes.{' '}
        <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Mermaid diagrams
        </a>{' '}
        in your Markdown (```mermaid blocks) are rendered and included in the PDF export.
      </>
    ),
    text: 'Yes. Mermaid diagrams in your Markdown (```mermaid blocks) are rendered and included in the PDF export.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
    text: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
  },
  {
    q: 'What PDF themes are available?',
    a: 'DevMark offers four themes: GitHub (developer-friendly), Academic (for papers and reports), Minimal (clean and modern), and Dark (dark background).',
    text: 'DevMark offers four themes: GitHub (developer-friendly), Academic (for papers and reports), Minimal (clean and modern), and Dark (dark background).',
  },
  {
    q: 'Can I convert a .md file with images?',
    a: 'Yes. You can upload .md files containing both local images and remote image URLs. Remote images are fetched and embedded in the PDF.',
    text: 'Yes. You can upload .md files containing both local images and remote image URLs. Remote images are fetched and embedded in the PDF.',
  },
  {
    q: 'How do I convert an entire GitHub README to PDF?',
    a: 'Copy the raw content of your README.md from GitHub (click "Raw" button), paste it into the editor on the left, choose a theme, and click Download PDF.',
    text: 'Copy the raw content of your README.md from GitHub (click "Raw" button), paste it into the editor on the left, choose a theme, and click Download PDF.',
  },
];

export default function MarkdownToPdfPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Markdown to PDF Converter"
        url="/markdown-to-pdf"
        description="Convert Markdown to PDF instantly in your browser. Supports GitHub Flavored Markdown, code blocks with syntax highlighting, tables, images, and Mermaid diagrams."
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown to PDF Converter', url: '/markdown-to-pdf' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero / Header */}
        <section className="bg-white border-b border-gray-200 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Free Markdown to PDF Converter
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Paste Markdown or upload a .md file. Get a perfect PDF instantly — no login, no watermark, no limits. Supports code highlighting, tables, and Mermaid diagrams.
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Convert Markdown to PDF</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Paste your Markdown text in the left panel, or click <strong>Upload .md</strong> to load a file</li>
            <li>Choose a PDF theme: GitHub, Academic, Minimal, or Dark</li>
            <li>See the live preview update in real-time on the right</li>
            <li>Click <strong>Download PDF — Free</strong> to save your file</li>
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
              <a href="/blog/github-readme-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                GitHub README to PDF Guide →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
