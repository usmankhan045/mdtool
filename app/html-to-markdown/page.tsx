import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';

export const metadata: Metadata = {
  title: 'HTML to Markdown Converter — Free & No Login',
  description: 'Convert HTML to clean Markdown instantly in your browser. Supports tables, code blocks, links, and lists (GFM). Free, no signup, no file size limit.',
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
    a: (
      <>
        Yes. The converter uses{' '}
        <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          GitHub Flavored Markdown
        </a>{' '}
        rules, so HTML tables, fenced code blocks (with the language preserved from a class like
        &quot;language-js&quot;), ordered/unordered lists, and strikethrough text all convert correctly.
      </>
    ),
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
        dateModified="2026-06-24"
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
            <p className="text-xs text-gray-400 mb-3">Updated June 24, 2026</p>
            <p className="text-base text-gray-700 max-w-2xl mb-3 leading-relaxed">
              <strong>HTML to Markdown conversion</strong> is the process of stripping HTML down to its
              semantic structure — headings, links, tables, lists, and code — and re-expressing it as plain
              Markdown text. MDTool converts HTML to Markdown entirely in your browser using GitHub Flavored
              Markdown rules: paste HTML or upload a .html file and get clean, portable Markdown back, free,
              with no signup and no file size limit.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mb-4">
              Supports tables, code blocks, and GitHub Flavored Markdown.
            </p>
            <ConversionDiagram from="HTML" to="Markdown" />
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

        {/* Format-specific substance */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How Ambiguous HTML Gets Resolved</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              HTML can express things Markdown simply has no syntax for — presentation applied through CSS
              classes rather than semantic tags, deeply nested tables, inline{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">style</code> attributes,{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;span&gt;</code> wrappers used purely for
              color. Converting that to Markdown means making consistent decisions about what to keep and what
              to drop.
            </p>
            <p>
              MDTool&apos;s converter is built on{' '}
              <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">turndown</a>{' '}
              with the GFM plugin, and it follows{' '}
              <a href="https://commonmark.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CommonMark</a>{' '}
              + GitHub Flavored Markdown conventions: semantic tags like{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;strong&gt;</code>,{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;em&gt;</code>, and{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;table&gt;</code> map directly to their
              Markdown equivalents, while presentation-only markup — inline styles, color-only{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;span&gt;</code>s, custom CSS classes —
              is dropped, since Markdown has no equivalent to preserve it in. Nested lists are indented per the
              CommonMark spec. A table nested inside another table&apos;s cell — something standard Markdown
              tables can&apos;t represent — gets flattened to its text content rather than silently corrupting
              the output.
            </p>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">HTML element</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Markdown output</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">&lt;strong&gt;, &lt;em&gt;</td>
                  <td className="px-3 py-2">✅ **bold**, *italic*</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">&lt;table&gt;</td>
                  <td className="px-3 py-2">✅ GFM pipe table</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">&lt;pre&gt;&lt;code class=&quot;language-js&quot;&gt;</td>
                  <td className="px-3 py-2">✅ Fenced code block, language preserved</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Inline style, color-only &lt;span&gt;</td>
                  <td className="px-3 py-2">❌ Dropped — no Markdown equivalent</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">&lt;script&gt;, &lt;style&gt;</td>
                  <td className="px-3 py-2">❌ Dropped — non-content markup</td>
                </tr>
              </tbody>
            </table>
            <p>
              The result favors a clean, portable Markdown file over pixel-perfect fidelity to the original
              page — which is usually what you want when the destination is a README, a wiki, or another
              Markdown-based tool rather than a visual reproduction of the source HTML.
            </p>
            <p>
              This matters most when migrating content out of a CMS or documentation platform that exports
              bloated HTML — Word-generated HTML, Confluence pages, and WYSIWYG editor output are notorious
              for wrapping every paragraph in inline styles and redundant <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;span&gt;</code> tags.
              Run that through MDTool and you get the same paragraphs, headings, and tables back as plain,
              version-control-friendly Markdown, stripped of the formatting cruft that made the original
              difficult to diff or edit by hand.
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
              <a href="/markdown-to-html" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to HTML →
              </a>
              <a href="/word-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Word to Markdown →
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
