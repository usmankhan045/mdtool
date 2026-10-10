import Link from 'next/link';

const LINKS = [
  { href: '/markdown-editor', label: 'Markdown editor', description: 'Write and preview Markdown live.' },
  { href: '/markdown-to-pdf', label: 'Markdown to PDF', description: 'Export themes, code, and diagrams.' },
  { href: '/markdown-to-word', label: 'Markdown to Word', description: 'Create an editable .docx file.' },
  { href: '/word-to-markdown', label: 'Word to Markdown', description: 'Turn a .docx into GFM.' },
  { href: '/markdown-to-html', label: 'Markdown to HTML', description: 'Copy clean HTML for the web.' },
  { href: '/html-to-markdown', label: 'HTML to Markdown', description: 'Convert web markup into Markdown.' },
  { href: '/markdown-table-generator', label: 'Table generator', description: 'Build and copy aligned tables.' },
];

export default function ToolCrossLinks({ exclude = [] }: { exclude?: string[] }) {
  return (
    <section className="border-t border-zinc-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-zinc-800">Related Markdown tools</h2>
        <p className="mt-2 max-w-3xl text-zinc-600">
          Keep the same document workflow moving with another free, browser-based MDTool.
          Your content stays on your device while you work.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.filter((link) => !exclude.includes(link.href)).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400"
            >
              <span className="font-medium text-zinc-900">{link.label}</span>
              <span className="mt-1 block text-sm text-zinc-500">{link.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
