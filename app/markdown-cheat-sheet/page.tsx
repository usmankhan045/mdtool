import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';
import { GUIDE_TOPICS } from '@/lib/cheatsheet';

export const metadata: Metadata = {
  title: 'Markdown Cheat Sheet with Examples (Copy & Paste, 2026)',
  description:
    'Every Markdown syntax with a copyable example: headings, bold, links, images, lists, checkboxes, tables, code blocks and GitHub Flavored Markdown, on one page.',
  alternates: { canonical: 'https://www.mdtool.dev/markdown-cheat-sheet' },
  openGraph: {
    title: 'Markdown Cheat Sheet with Examples',
    description:
      'Quick reference for all Markdown syntax, from headings to GFM tables and task lists, with copyable examples.',
    url: 'https://www.mdtool.dev/markdown-cheat-sheet',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

// One-line quick reference - the "above the fold" answer for the cheat-sheet query.
const QUICK_REF: { element: string; syntax: string; slug?: string }[] = [
  { element: 'Heading', syntax: '# H1  ## H2  ### H3', slug: 'headings' },
  { element: 'Bold', syntax: '**bold text**', slug: 'bold-and-italic' },
  { element: 'Italic', syntax: '*italic text*', slug: 'bold-and-italic' },
  { element: 'Bold + italic', syntax: '***both***', slug: 'bold-and-italic' },
  { element: 'Strikethrough', syntax: '~~crossed out~~', slug: 'strikethrough' },
  { element: 'Link', syntax: '[text](https://url.com)', slug: 'links' },
  { element: 'Image', syntax: '![alt text](image.png)', slug: 'images' },
  { element: 'Unordered list', syntax: '- item', slug: 'lists' },
  { element: 'Ordered list', syntax: '1. item', slug: 'lists' },
  { element: 'Checkbox (task)', syntax: '- [ ] todo  - [x] done', slug: 'checkboxes' },
  { element: 'Blockquote', syntax: '> quoted text', slug: 'blockquotes' },
  { element: 'Inline code', syntax: '`code`', slug: 'code-blocks' },
  { element: 'Code block', syntax: '```js … ```', slug: 'code-blocks' },
  { element: 'Table', syntax: '| A | B |  |---|---|', slug: 'tables' },
  { element: 'Line break', syntax: 'two trailing spaces or \\', slug: 'line-breaks' },
  { element: 'Horizontal rule', syntax: '---' },
  { element: 'Definition list', syntax: 'Term  : definition', slug: 'definition-lists' },
  { element: 'Footnote (GFM)', syntax: 'text[^1]  [^1]: note' },
  { element: 'Escape character', syntax: '\\* literal asterisk' },
];

const FAQS = [
  {
    q: 'What is Markdown?',
    a: 'Markdown is a plain-text formatting syntax created by John Gruber in 2004. Symbols like # and ** mark up structure (headings, bold, lists), and a renderer converts the text into HTML, PDF, or Word documents.',
  },
  {
    q: 'What is the difference between Markdown and GitHub Flavored Markdown (GFM)?',
    a: 'GFM is GitHub’s superset of CommonMark. It adds tables, task-list checkboxes, strikethrough, autolinks, and fenced code blocks with syntax highlighting: the elements most developers consider "normal Markdown" today.',
  },
  {
    q: 'What file extension do Markdown files use?',
    a: 'The standard extension is .md (also .markdown). A Markdown file is plain text, so any text editor can open it.',
  },
  {
    q: 'How do I convert a Markdown file to PDF or Word?',
    a: 'Paste the Markdown into a converter like MDTool’s Markdown to PDF or Markdown to Word tool. Both run free in the browser with no signup, and preserve tables, checkboxes, and code blocks.',
  },
];

export default function MarkdownCheatSheetPage() {
  return (
    <>
      <StructuredData
        type="techarticle"
        name="Markdown Cheat Sheet with Examples"
        url="/markdown-cheat-sheet"
        description="The complete Markdown cheat sheet: every syntax element with copyable examples, plus GitHub Flavored Markdown extensions."
        datePublished="2026-06-24"
        dateModified="2026-10-01"
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown Cheat Sheet', url: '/markdown-cheat-sheet' },
        ]}
      />
      <StructuredData type="faq" faqs={FAQS} />

      <main className="min-h-screen bg-page">
        <section className="hero-grid text-zinc-950">
          <div className="max-w-5xl mx-auto px-4 pt-10 pb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Markdown Cheat Sheet with Examples</h1>
            <p className="text-base md:text-lg text-zinc-600 max-w-2xl leading-relaxed">
              Every Markdown syntax element on one page (core Markdown plus the GitHub Flavored
              Markdown extensions), with a dedicated deep-dive guide for each element.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Updated <time dateTime="2026-10-01">October 1, 2026</time></p>
          </div>
        </section>

        {/* Quick reference table - the answer-first artifact */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">Quick Reference</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-zinc-100 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Element</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Syntax</th>
                  <th className="px-4 py-3 font-semibold text-zinc-700">Guide</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_REF.map((row, i) => (
                  <tr key={row.element} className={`border-t border-zinc-100 ${i % 2 ? 'bg-zinc-50' : ''}`}>
                    <td className="px-4 py-2.5 font-medium text-zinc-800 whitespace-nowrap">{row.element}</td>
                    <td className="px-4 py-2.5">
                      <code className="font-mono text-[13px] text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded">{row.syntax}</code>
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      {row.slug ? (
                        <Link href={`/markdown-cheat-sheet/${row.slug}`} className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">
                          Details →
                        </Link>
                      ) : (
                        <span className="text-zinc-300">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Per-element guides */}
        <section className="max-w-5xl mx-auto px-4 pb-4">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">Syntax Guides</h2>
          <p className="text-zinc-600 mb-6 max-w-3xl">
            Each guide covers the exact syntax, a rendered example, GitHub Flavored Markdown
            behavior, and the mistakes that most often break rendering.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDE_TOPICS.map((topic) => (
              <Link
                key={topic.slug}
                href={`/markdown-cheat-sheet/${topic.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-md"
              >
                <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-900 transition-colors">
                  {topic.title}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed line-clamp-3">{topic.answer}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-lg border border-zinc-200 bg-white p-5">
                <h3 className="font-medium text-zinc-900 mb-2">{faq.q}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Converters CTA */}
        <section className="bg-page-soft border-t border-zinc-200/70 px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold text-zinc-700 mb-4">Put the syntax to work:</h2>
            <div className="flex flex-wrap gap-3">
              <a href="/markdown-to-pdf" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown to PDF →
              </a>
              <a href="/markdown-to-html" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown to HTML →
              </a>
              <a href="/markdown-to-word" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown to Word →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
