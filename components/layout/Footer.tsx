import Link from 'next/link';

const TOOL_LINKS = [
  { href: '/markdown-to-pdf', label: 'Markdown to PDF' },
  { href: '/markdown-to-html', label: 'Markdown to HTML' },
];

const BLOG_LINKS = [
  { href: '/blog/markdown-to-pdf-code-blocks', label: 'MD to PDF: Code Formatting Guide' },
  { href: '/blog/best-markdown-to-pdf-converter', label: 'Best MD to PDF Converters' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-lg mb-3">
            <span className="text-blue-400">&lt;/&gt;</span>
            <span>DevMark</span>
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
                <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
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
                <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 px-4 py-4 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-600">
        <span>© {new Date().getFullYear()} DevMark. Free to use, forever.</span>
        <span>No login required · No watermarks · Files never uploaded</span>
      </div>
    </footer>
  );
}
