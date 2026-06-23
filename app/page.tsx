import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MDTool — Free Developer Tools',
  description: 'Free online developer tools. Convert Markdown to PDF, Markdown to HTML, and more. Fast, client-side, no login required.',
  alternates: { canonical: 'https://www.mdtool.dev' },
};

const TOOLS = [
  {
    href: '/markdown-to-pdf',
    icon: '📄',
    title: 'Markdown to PDF',
    description: 'Convert .md files to beautifully formatted PDFs. Supports code highlighting, tables, Mermaid diagrams, and 4 themes.',
    badge: 'Most Popular',
  },
  {
    href: '/markdown-to-html',
    icon: '🌐',
    title: 'Markdown to HTML',
    description: 'Convert Markdown to clean, ready-to-use HTML. Perfect for embedding in websites or email templates.',
    badge: null,
  },
  {
    href: '/markdown-to-word',
    icon: '📝',
    title: 'Markdown to Word',
    description: 'Convert Markdown to a real, editable .docx file. Opens in Word, Google Docs, and LibreOffice.',
    badge: null,
  },
  {
    href: '/html-to-markdown',
    icon: '🔄',
    title: 'HTML to Markdown',
    description: 'Convert HTML to clean Markdown. Supports tables, code blocks, and GitHub Flavored Markdown.',
    badge: null,
  },
  {
    href: '/word-to-markdown',
    icon: '📋',
    title: 'Word to Markdown',
    description: 'Convert .docx Word documents to clean Markdown. Headings, tables, and lists convert automatically.',
    badge: null,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200 px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Developer Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Fast, client-side tools for developers. No login, no watermarks, no file uploads — everything runs in your browser.
          </p>
          <Link
            href="/markdown-to-pdf"
            className="inline-block px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg"
          >
            Try Markdown to PDF →
          </Link>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">All Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{tool.icon}</span>
                {tool.badge && (
                  <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                    {tool.badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {tool.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why MDTool */}
      <section className="bg-white border-t border-gray-100 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why MDTool?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🔒', title: 'Private by Default', desc: 'Files never leave your device. All processing is 100% client-side.' },
              { icon: '⚡', title: 'Instant Results', desc: 'No server round-trips. Conversion happens in milliseconds in your browser.' },
              { icon: '🆓', title: 'Free Forever', desc: 'No paywalls, no watermarks, no signup required. Just use it.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-gray-50">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
