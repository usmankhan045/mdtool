import Link from 'next/link';

const TOOL_LINKS = [
  { href: '/markdown-to-pdf', label: 'Markdown to PDF' },
  { href: '/markdown-to-word', label: 'Markdown to Word' },
  { href: '/markdown-to-html', label: 'Markdown to HTML' },
  { href: '/markdown-to-text', label: 'Markdown to Plain Text' },
  { href: '/html-to-markdown', label: 'HTML to Markdown' },
  { href: '/word-to-markdown', label: 'Word to Markdown' },
  { href: '/markdown-table-generator', label: 'Table Generator' },
];

// Sitewide links to the syntax guides that still need crawling/indexing, so
// search engines discover and prioritise them. The rest live on the hub.
const SYNTAX_LINKS = [
  { href: '/markdown-cheat-sheet/checkboxes', label: 'Checkboxes' },
  { href: '/markdown-cheat-sheet/tables', label: 'Tables' },
  { href: '/markdown-cheat-sheet/strikethrough', label: 'Strikethrough' },
  { href: '/markdown-cheat-sheet/blockquotes', label: 'Blockquotes' },
  { href: '/markdown-cheat-sheet/line-breaks', label: 'Line breaks' },
  { href: '/markdown-cheat-sheet/definition-lists', label: 'Definition lists' },
  { href: '/markdown-cheat-sheet', label: 'Full cheat sheet →', more: true },
];

const GUIDE_LINKS = [
  { href: '/blog/github-readme-to-pdf', label: 'GitHub README to PDF' },
  { href: '/blog/best-markdown-to-pdf-converter', label: 'Best Markdown to PDF tools' },
  { href: '/blog/markdown-to-pdf-code-blocks', label: 'Code blocks in PDF' },
  { href: '/blog/markdown-table-pdf', label: 'Tables in PDF exports' },
  { href: '/blog', label: 'All guides →', more: true },
];

const BOTTOM_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/contact', label: 'Contact' },
];

function Column({ title, links }: { title: string; links: { href: string; label: string; more?: boolean }[] }) {
  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-sm transition-colors hover:text-white ${link.more ? 'font-medium text-blue-300' : 'text-gray-400'}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-14">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr] lg:gap-8">
          {/* Brand + the person behind it */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-white">
              <span className="text-blue-400">&lt;/&gt;</span>
              MDTool
            </Link>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Private, in-browser Markdown converters. Your files never leave your device.
            </p>

            <Link
              href="/about#author"
              className="mt-6 block rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.07]"
            >
              <span className="block text-sm font-semibold text-white">Muhammad Usman</span>
              <span className="block text-xs text-gray-400">AI, app &amp; web developer</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-8">
            <Column title="Tools" links={TOOL_LINKS} />
            <Column title="Markdown syntax" links={SYNTAX_LINKS} />
            <Column title="Guides" links={GUIDE_LINKS} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} MDTool. Free to use, no login, no watermarks.</span>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {BOTTOM_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/usmankhan045/mdtool"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
