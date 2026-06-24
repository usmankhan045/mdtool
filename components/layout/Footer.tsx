import Link from 'next/link';

const TOOL_LINKS = [
  { href: '/markdown-to-pdf', label: 'Markdown to PDF' },
  { href: '/markdown-to-html', label: 'Markdown to HTML' },
  { href: '/markdown-to-word', label: 'Markdown to Word' },
  { href: '/html-to-markdown', label: 'HTML to Markdown' },
  { href: '/word-to-markdown', label: 'Word to Markdown' },
];

const BLOG_LINKS = [
  { href: '/blog/markdown-to-pdf-code-blocks', label: 'MD to PDF: Code Formatting Guide' },
  { href: '/blog/markdown-table-pdf', label: 'MD Tables in PDF Exports' },
  { href: '/blog/best-markdown-to-pdf-converter', label: 'Best MD to PDF Converters' },
  { href: '/blog/github-readme-to-pdf', label: 'GitHub README to PDF' },
  { href: '/blog/markdown-cheatsheet', label: 'Markdown Cheatsheet' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-lg mb-3">
            <span className="text-blue-400">&lt;/&gt;</span>
            <span>MDTool</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Free developer tools for Markdown, PDF conversion, and more.
            All processing is client-side — your files never leave your device.
          </p>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Tools</h3>
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

        {/* Blog */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Guides</h3>
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

      <div className="border-t border-gray-800 px-4 py-4 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
        <span>© {new Date().getFullYear()} MDTool. Free to use, forever.</span>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
        </div>
        <span>No login required · No watermarks · Files never uploaded</span>
      </div>
    </footer>
  );
}
