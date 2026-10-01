import Link from 'next/link';

const TOOL_LINKS = [
  { href: '/markdown-to-pdf', label: 'Markdown to PDF' },
  { href: '/markdown-to-html', label: 'Markdown to HTML' },
  { href: '/markdown-to-word', label: 'Markdown to Word' },
  { href: '/html-to-markdown', label: 'HTML to Markdown' },
  { href: '/word-to-markdown', label: 'Word to Markdown' },
  { href: '/markdown-table-generator', label: 'Markdown Table Generator' },
  { href: '/markdown-to-text', label: 'Markdown to Plain Text' },
];

// Sitewide links to syntax guides so crawlers discover and prioritise them
const SYNTAX_LINKS = [
  { href: '/markdown-cheat-sheet/bold-and-italic', label: 'Bold & Italic' },
  { href: '/markdown-cheat-sheet/links', label: 'Links' },
  { href: '/markdown-cheat-sheet/checkboxes', label: 'Checkboxes' },
  { href: '/markdown-cheat-sheet/tables', label: 'Tables' },
  { href: '/markdown-cheat-sheet/strikethrough', label: 'Strikethrough' },
  { href: '/markdown-cheat-sheet/blockquotes', label: 'Blockquotes' },
  { href: '/markdown-cheat-sheet/line-breaks', label: 'Line Breaks' },
  { href: '/markdown-cheat-sheet/definition-lists', label: 'Definition Lists' },
];

const BLOG_LINKS = [
  { href: '/blog/markdown-to-pdf-code-blocks', label: 'MD to PDF: Code Formatting Guide' },
  { href: '/blog/markdown-table-pdf', label: 'MD Tables in PDF Exports' },
  { href: '/blog/best-markdown-to-pdf-converter', label: 'Best MD to PDF Converters' },
  { href: '/blog/github-readme-to-pdf', label: 'GitHub README to PDF' },
  { href: '/markdown-cheat-sheet', label: 'Markdown Cheatsheet' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-lg mb-3">
            <span className="text-blue-400">&lt;/&gt;</span>
            <span>MDTool</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Free developer tools for Markdown, PDF conversion, and more.
            All processing is client-side. Your files never leave your device.
          </p>
          <Link
            href="/about#work-with-me"
            className="mt-4 inline-block text-sm leading-relaxed text-blue-400 hover:text-blue-300 transition-colors"
          >
            Built by Muhammad Usman. Available for AI automation, app and web projects &rarr;
          </Link>
        </div>

        {/* Tools */}
        <div>
          <h2 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Tools</h2>
          <ul className="space-y-2">
            {TOOL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors inline-block py-1">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Syntax guides */}
        <div>
          <h2 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Markdown Syntax</h2>
          <ul className="space-y-2">
            {SYNTAX_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors inline-block py-1">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog */}
        <div>
          <h2 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Guides</h2>
          <ul className="space-y-2">
            {BLOG_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors inline-block py-1">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 px-4 py-4 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
        <span>© {new Date().getFullYear()} MDTool. Free to use, forever.</span>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          <Link href="/about#work-with-me" className="hover:text-blue-400 transition-colors">Hire me</Link>
          <a href="https://github.com/usmankhan045/mdtool" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
        </div>
        <span>No login required · No watermarks · Files never uploaded</span>
      </div>
    </footer>
  );
}
