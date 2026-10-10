import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Choose an MDTool',
  description: 'Choose a free MDTool converter, editor, or table generator.',
  alternates: { canonical: 'https://www.mdtool.dev/tools' },
};

const TOOLS = [
  {
    href: '/markdown-editor',
    badge: 'EDIT',
    title: 'Markdown Editor',
    description: 'Write Markdown with a live preview.',
    tone: 'bg-blue-50 text-blue-700 ring-blue-200',
  },
  {
    href: '/markdown-to-pdf',
    badge: 'PDF',
    title: 'Markdown to PDF',
    description: 'Create a polished PDF with themes, code, and diagrams.',
    tone: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
  {
    href: '/markdown-to-word',
    badge: 'DOCX',
    title: 'Markdown to Word',
    description: 'Create an editable Word document.',
    tone: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  {
    href: '/markdown-to-html',
    badge: 'HTML',
    title: 'Markdown to HTML',
    description: 'Convert Markdown into clean HTML.',
    tone: 'bg-orange-50 text-orange-700 ring-orange-200',
  },
  {
    href: '/markdown-to-text',
    badge: 'TXT',
    title: 'Markdown to Plain Text',
    description: 'Remove Markdown syntax and keep readable text.',
    tone: 'bg-zinc-100 text-zinc-700 ring-zinc-200',
  },
  {
    href: '/html-to-markdown',
    badge: 'MD',
    title: 'HTML to Markdown',
    description: 'Turn web markup into clean Markdown.',
    tone: 'bg-violet-50 text-violet-700 ring-violet-200',
  },
  {
    href: '/word-to-markdown',
    badge: 'MD',
    title: 'Word to Markdown',
    description: 'Convert a DOCX file into Markdown.',
    tone: 'bg-violet-50 text-violet-700 ring-violet-200',
  },
  {
    href: '/markdown-table-generator',
    badge: 'TABLE',
    title: 'Markdown Table Generator',
    description: 'Build and copy aligned Markdown tables.',
    tone: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-page px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">
          Choose a tool
        </h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(24,24,27,0.04)] transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-[0_12px_24px_-16px_rgba(24,24,27,0.3)]"
            >
              <span className={`inline-flex min-w-14 items-center justify-center rounded-md px-2 py-1 font-mono text-[10px] font-bold tracking-wide ring-1 ring-inset ${tool.tone}`}>
                {tool.badge}
              </span>
              <h2 className="mt-4 text-lg font-bold text-zinc-950 group-hover:text-zinc-700">{tool.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">{tool.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-zinc-900">Open tool →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
