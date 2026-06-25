import type { Metadata } from 'next';
import Link from 'next/link';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';

export const metadata: Metadata = {
  title: 'HTML to Markdown Converter — Paste, Upload, GFM | MDTool',
  description: 'Paste or upload .html and get clean, GFM Markdown instantly — entirely in your browser, nothing sent to a server. Free, no signup, no file limit.',
  keywords: ['html to markdown', 'convert html to markdown', 'html to md', 'html to github flavored markdown', 'html markdown converter'],
  openGraph: {
    title: 'Free HTML to Markdown Converter — Paste or Upload, GFM Output',
    description: 'Convert HTML to clean Markdown instantly. Paste or upload, supports tables, code blocks, and GFM. 100% free, no login.',
    url: 'https://www.mdtool.dev/html-to-markdown',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/html-to-markdown',
  },
};

const FAQ_ITEMS = [
  {
    q: 'Does it output GitHub Flavored Markdown (GFM)?',
    a: (
      <>
        Yes. MDTool uses{' '}
        <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          turndown
        </a>{' '}
        with the{' '}
        <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          GitHub Flavored Markdown
        </a>{' '}
        plugin, so the output follows GFM conventions — pipe tables, fenced code blocks, task lists, and
        strikethrough all use the syntax GitHub, GitLab, and most static site generators expect.
      </>
    ),
    text: 'Yes. MDTool uses turndown with the GitHub Flavored Markdown plugin, so output follows GFM conventions — pipe tables, fenced code blocks, task lists, and strikethrough.',
  },
  {
    q: 'What happens to inline CSS and styling?',
    a: 'Inline style attributes are dropped. Markdown has no equivalent for CSS — colors, fonts, and custom spacing applied via style="..." simply have no Markdown syntax to map to, so they’re removed along with the rest of the presentation layer.',
    text: 'Inline style attributes are dropped. Markdown has no equivalent for CSS, so colors, fonts, and custom spacing applied via style attributes are removed.',
  },
  {
    q: 'Can I upload an .html file instead of pasting?',
    a: 'Yes. Click "Upload .html" or drag and drop a .html or .htm file directly onto the input panel — no need to open the file and copy its contents manually.',
    text: 'Yes. Click Upload .html or drag and drop a .html or .htm file directly onto the input panel.',
  },
  {
    q: 'Does it handle nested lists correctly?',
    a: 'Yes. A <ul> or <ol> nested inside another list item converts to a properly indented Markdown sublist, following CommonMark’s whitespace-based nesting rules rather than flattening to one level.',
    text: 'Yes. Nested HTML lists convert to properly indented Markdown sublists following CommonMark’s nesting rules.',
  },
  {
    q: 'What about onclick handlers and other JavaScript attributes?',
    a: 'They’re dropped entirely. onclick, onload, and other event-handler attributes are behavior, not content — Markdown has no mechanism to represent executable JavaScript, so they’re stripped along with <script> tags during conversion.',
    text: 'Dropped entirely. Event-handler attributes like onclick are behavior, not content, and have no Markdown equivalent, so they’re stripped along with script tags.',
  },
  {
    q: 'Is my HTML sent to a server?',
    a: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device — there’s no upload step, even when you use the file-upload option.',
    text: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
    text: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
  },
  {
    q: 'Does it support tables and code blocks?',
    a: 'Yes. HTML tables convert to GFM pipe tables, and <pre><code> blocks convert to fenced code blocks with the language tag preserved when the source has a class like "language-js" on the <code> element.',
    text: 'Yes. HTML tables convert to GFM pipe tables, and pre/code blocks convert to fenced code blocks with the language tag preserved when present.',
  },
  {
    q: 'What happens to images and links?',
    a: '<img> tags convert to Markdown image syntax with the src and alt text preserved, and <a> tags convert to Markdown links with the href and link text intact.',
    text: 'Image tags convert to Markdown image syntax with src and alt preserved; link tags convert to Markdown links with href and text intact.',
  },
  {
    q: 'How often is this tool updated?',
    a: 'This page was last updated June 24, 2026. The underlying conversion engine (turndown + the GFM plugin) is a stable, widely used library, so updates here are mostly about expanding the supporting documentation rather than changing how conversion works.',
    text: 'This page was last updated June 24, 2026.',
  },
];

export default function HtmlToMarkdownPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="HTML to Markdown Converter"
        url="/html-to-markdown"
        description="Convert HTML to clean Markdown instantly in your browser. Paste or upload, with GFM tables, code blocks, links, and lists."
        datePublished="2026-06-24"
        dateModified="2026-06-24"
        featureList={[
          'HTML to Markdown conversion',
          'GitHub Flavored Markdown (GFM) output',
          'Code block language preservation',
          'Paste or file upload (drag-and-drop)',
          'Client-side processing — nothing sent to a server',
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
              Free HTML to Markdown Converter — Paste or Upload, GFM Output
            </h1>
            <p className="text-xs text-gray-400 mb-3">Updated June 24, 2026</p>
            <p className="text-base text-gray-700 max-w-2xl mb-3 leading-relaxed">
              <strong>HTML to Markdown conversion</strong> strips HTML down to its semantic structure —
              headings, links, tables, lists, and code — and re-expresses it as plain Markdown text. MDTool
              converts HTML to Markdown entirely in your browser: paste HTML directly or upload a .html file,
              and get clean GitHub Flavored Markdown (GFM) back, powered by the{' '}
              <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">turndown</a>{' '}
              library. Free, no signup, no file size limit.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mb-4">
              Supports GFM tables, fenced code blocks with language tags, nested lists, links, and images.
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
          <p className="text-gray-700 mb-3 leading-relaxed">There are two ways to get your HTML into the converter — paste it directly, or upload a file:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li><strong>Paste:</strong> Copy your HTML and paste it directly into the left panel</li>
            <li><strong>Or upload:</strong> Click <strong>Upload .html</strong>, or drag and drop a .html or .htm file, to load it from disk instead</li>
            <li>The Markdown output updates live on the right as soon as you paste or the file loads</li>
            <li>Click <strong>Copy</strong> to copy the Markdown to your clipboard, or <strong>Download .md</strong> to save it as a file</li>
          </ol>
        </section>

        {/* Format-specific substance */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">What Should You Know Before Converting HTML to Markdown?</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Why Convert HTML Back to Markdown?</h3>
            <p>
              The most common trigger is content migration: pulling pages out of a CMS or documentation
              platform that only exports HTML — Confluence, WordPress, or a Word-generated export — into a
              Markdown-based destination like a README, a static site, or an Obsidian vault. The second most
              common case is HTML copied directly from a rendered webpage (View Source or Inspect Element)
              that needs to become readable, portable text instead of markup.
            </p>
            <p>
              A third case is developer workflows: cleaning up HTML snippets for a GitHub README, a docs site
              built on Markdown, or a changelog, where the source content started as HTML but the destination
              format is Markdown. In all three cases, the underlying need is the same — keep the structure
              (headings, links, tables, code), drop everything that&apos;s presentation rather than content.
            </p>
          </div>

          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">What Does MDTool Preserve When Converting?</h3>
            <p>
              MDTool&apos;s converter is built on{' '}
              <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">turndown</a>{' '}
              with the GFM plugin, following{' '}
              <a href="https://commonmark.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CommonMark</a>{' '}
              + GitHub Flavored Markdown conventions. Semantic tags map directly to their Markdown equivalents:
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
                  <td className="px-3 py-2 font-medium">&lt;a&gt;, &lt;img&gt;</td>
                  <td className="px-3 py-2">✅ Markdown links and image syntax</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">&lt;h1&gt;–&lt;h6&gt;, &lt;ul&gt;/&lt;ol&gt; (incl. nested)</td>
                  <td className="px-3 py-2">✅ # headings, indented Markdown lists</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">What Gets Stripped From the HTML?</h3>
            <p>
              HTML can express things Markdown simply has no syntax for — presentation applied through CSS
              classes rather than semantic tags, inline{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">style</code> attributes,{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;span&gt;</code> wrappers used purely
              for color, and executable markup like event-handler attributes. Markdown supports roughly 15
              formatting constructs against HTML&apos;s 100+ element types, so this is a deliberate, lossy
              design choice — not a bug.
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
                  <td className="px-3 py-2 font-medium">Inline style, color-only &lt;span&gt;</td>
                  <td className="px-3 py-2">❌ Dropped — no Markdown equivalent</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">&lt;script&gt;, &lt;style&gt;</td>
                  <td className="px-3 py-2">❌ Dropped — non-content markup</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">onclick and other event-handler attributes</td>
                  <td className="px-3 py-2">❌ Dropped — behavior, not content</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">colspan/rowspan, nested tables</td>
                  <td className="px-3 py-2">❌ Flattened — GFM tables can&apos;t represent merged cells</td>
                </tr>
              </tbody>
            </table>
            <p>
              The result favors a clean, portable Markdown file over pixel-perfect fidelity to the original
              page — which is usually what you want when the destination is a README, a wiki, or another
              Markdown-based tool rather than a visual reproduction of the source HTML.
            </p>
          </div>

          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Is MDTool&apos;s HTML to Markdown Converter Free?</h3>
            <p>
              Yes, and it stays free for a structural reason, not a promotional one: conversion runs entirely
              as JavaScript in your browser. There&apos;s no server processing each submitted file, no backend
              infrastructure to pay for per conversion, and no API usage to meter — so there&apos;s nothing to
              recoup with a paywall, a usage cap, or a signup wall. Some competing tools that process HTML on
              a server do incur that cost, which is part of why they sometimes gate features (file size,
              conversion count, batch processing) behind an account. MDTool&apos;s no-signup, no-limit model
              is a direct consequence of where the conversion actually happens — not a temporary offer.
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
              <Link href="/markdown-to-html" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to HTML →
              </Link>
              <Link href="/word-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Word to Markdown →
              </Link>
              <Link href="/markdown-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to PDF →
              </Link>
              <Link href="/blog/markdown-cheatsheet" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown Syntax Cheatsheet →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
