import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';
import { GUIDE_TOPICS } from '@/lib/cheatsheet';

export const metadata: Metadata = {
  title: 'Markdown Guide: Syntax, Examples & Tools',
  description:
    'Learn Markdown from the basics through GitHub Flavored Markdown. Browse syntax examples for headings, links, images, lists, tables, code, and more.',
  alternates: { canonical: 'https://www.mdtool.dev/markdown-guide' },
  openGraph: {
    title: 'Markdown Guide: Syntax, Examples & Tools | MDTool',
    description:
      'Learn Markdown syntax with practical examples, a complete cheat sheet, and free browser-based Markdown tools.',
    url: 'https://www.mdtool.dev/markdown-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export default function MarkdownGuidePage() {
  return (
    <>
      <StructuredData
        type="techarticle"
        name="Markdown Guide"
        url="/markdown-guide"
        description="A practical guide to Markdown and GitHub Flavored Markdown syntax with examples and links to free conversion tools."
        datePublished="2026-10-10"
        dateModified="2026-10-10"
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown Guide', url: '/markdown-guide' },
        ]}
      />

      <main className="min-h-screen bg-page">
        <section className="hero-grid text-zinc-950">
          <div className="mx-auto max-w-4xl px-4 pb-12 pt-10">
            <h1 className="mx-auto mb-3 text-center text-3xl font-bold tracking-tight md:text-4xl">Markdown Guide</h1>
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-zinc-600 md:text-lg">
              Markdown is a plain-text way to add structure and formatting to documents. Start with the
              essentials below, then use the detailed syntax guides or the complete cheat sheet for a
              copyable reference.
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              Covers core Markdown and GitHub Flavored Markdown (GFM)
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-4 py-10">
          <section className="mb-12">
            <h2 className="mb-3 text-2xl font-semibold text-zinc-900">Start with the Markdown basics</h2>
            <p className="mb-6 leading-relaxed text-zinc-700">
              A Markdown document is plain text that uses a small set of punctuation rules for headings,
              emphasis, links, images, lists, and code. GitHub Flavored Markdown adds tables, task lists,
              strikethrough, and fenced code blocks. The examples below show the syntax you can paste into
              the <Link href="/markdown-editor" className="font-medium underline underline-offset-4">online Markdown editor</Link>.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['# Heading', '## Section heading', 'headings'],
                ['**Bold** and *italic*', 'Use emphasis for important text.', 'bold-and-italic'],
                ['[Link text](https://example.com)', 'Link to another page or resource.', 'links'],
                ['- Item', 'Create ordered and unordered lists.', 'lists'],
                ['| A | B |', 'Use GFM tables for structured data.', 'tables'],
                ['```js', 'Use fenced blocks for code examples.', 'code-blocks'],
              ].map(([syntax, explanation, slug]) => (
                <Link key={slug} href={`/markdown-cheat-sheet/${slug}`} className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400">
                  <code className="block overflow-x-auto whitespace-nowrap font-mono text-sm text-zinc-900">{syntax}</code>
                  <span className="mt-2 block text-sm text-zinc-600">{explanation}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-3 text-2xl font-semibold text-zinc-900">Detailed Markdown syntax guides</h2>
            <p className="mb-6 leading-relaxed text-zinc-700">
              Each guide explains the syntax, shows a rendered example, and covers common compatibility
              mistakes. Use the full cheat sheet when you need a quick lookup.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDE_TOPICS.map((topic) => (
                <Link key={topic.slug} href={`/markdown-cheat-sheet/${topic.slug}`} className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800 hover:border-zinc-400">
                  {topic.title} →
                </Link>
              ))}
            </div>
            <Link href="/markdown-cheat-sheet" className="mt-6 inline-flex rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white hover:bg-zinc-800">
              Open the complete Markdown cheat sheet →
            </Link>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-zinc-900">Markdown tools</h2>
            <p className="mb-6 leading-relaxed text-zinc-700">
              When your Markdown is ready, convert it without uploading your document. MDTool processes
              conversions in your browser and does not require an account.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['/markdown-to-html', 'Markdown to HTML', 'Generate clean HTML for websites, CMSs, and email templates.'],
                ['/markdown-to-pdf', 'Markdown to PDF', 'Create selectable PDFs with themes, tables, code, and Mermaid.'],
                ['/markdown-to-word', 'Markdown to Word', 'Create an editable DOCX with native headings and tables.'],
                ['/markdown-table-generator', 'Markdown table generator', 'Build GFM tables visually or paste spreadsheet data.'],
              ].map(([href, label, description]) => (
                <Link key={href} href={href} className="rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-400">
                  <h3 className="font-semibold text-zinc-900">{label} →</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{description}</p>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
