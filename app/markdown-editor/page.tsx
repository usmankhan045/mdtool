import type { Metadata } from 'next';
import Link from 'next/link';
import ToolClient from './ToolClient';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Online Markdown Editor with Live Preview',
  description:
    'Write and preview Markdown online, then copy or download clean HTML. Free, private, and processed entirely in your browser with no signup or upload.',
  keywords: ['markdown editor', 'online markdown editor', 'markdown live preview', 'edit markdown online'],
  openGraph: {
    title: 'Online Markdown Editor with Live Preview | MDTool',
    description:
      'Write and preview Markdown online, then copy or download clean HTML. Private, free, and browser-based.',
    url: 'https://www.mdtool.dev/markdown-editor',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.mdtool.dev/markdown-editor' },
};

export default function MarkdownEditorPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Online Markdown Editor"
        url="/markdown-editor"
        description="Write, preview, and convert Markdown entirely in your browser with a live HTML preview and no file upload."
        featureList={[
          'Live Markdown preview',
          'Upload or drag and drop .md files',
          'GitHub Flavored Markdown support',
          'Copy or download HTML output',
          'Client-side processing, files never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown Editor', url: '/markdown-editor' },
        ]}
      />

      <main className="min-h-screen bg-page">
        <section className="hero-grid text-zinc-950">
          <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
            <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Online Markdown Editor with Live Preview
            </h1>
            <p className="mb-3 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
              Write or paste Markdown on the left and see clean, rendered HTML on the right. Upload a
              <code className="mx-1 rounded bg-zinc-100 px-1.5 py-0.5 text-sm">.md</code> file,
              copy the output, or download it without sending your document to a server.
            </p>
            <p className="text-xs text-zinc-500">Free to use · no signup · no uploads</p>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4">
          <ToolClient />
        </section>

        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-3 text-2xl font-semibold text-zinc-900">What can you do in this Markdown editor?</h2>
          <p className="leading-relaxed text-zinc-700">
            MDTool&apos;s online Markdown editor gives you a distraction-free writing area with a live preview.
            It supports GitHub Flavored Markdown features such as headings, links, lists, tables, task lists,
            blockquotes, and fenced code blocks. The conversion runs in your browser, so the text you edit is
            not uploaded or stored by MDTool.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ['Markdown to PDF', '/markdown-to-pdf', 'Export themes, code blocks, tables, and Mermaid diagrams.'],
              ['Markdown to Word', '/markdown-to-word', 'Create a real editable .docx file for Word and Google Docs.'],
              ['Markdown to HTML', '/markdown-to-html', 'Choose a snippet or a complete HTML document.'],
              ['Markdown cheat sheet', '/markdown-cheat-sheet', 'Look up syntax with copyable examples.'],
            ].map(([label, href, description]) => (
              <Link key={href} href={href} className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400">
                <h3 className="font-semibold text-zinc-900">{label} →</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
