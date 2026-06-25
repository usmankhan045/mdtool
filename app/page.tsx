import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'MDTool: Free Developer Tools',
  description: 'Free online developer tools. Convert Markdown to PDF, Markdown to HTML, and more. Fast, client-side, no login required.',
  alternates: { canonical: 'https://www.mdtool.dev' },
};

const TOOLS = [
  {
    href: '/markdown-to-pdf',
    from: 'MD',
    to: 'PDF',
    icon: '📄',
    title: 'Markdown to PDF',
    description: 'Convert .md files to beautifully formatted PDFs. Supports code highlighting, tables, Mermaid diagrams, and 4 themes.',
    badge: 'Most Popular',
  },
  {
    href: '/markdown-to-html',
    from: 'MD',
    to: 'HTML',
    icon: '🌐',
    title: 'Markdown to HTML',
    description: 'Convert Markdown to clean, ready-to-use HTML. Perfect for embedding in websites or email templates.',
    badge: null,
  },
  {
    href: '/markdown-to-word',
    from: 'MD',
    to: 'DOCX',
    icon: '📝',
    title: 'Markdown to Word',
    description: 'Convert Markdown to a real, editable .docx file. Opens in Word, Google Docs, and LibreOffice.',
    badge: null,
  },
  {
    href: '/html-to-markdown',
    from: 'HTML',
    to: 'MD',
    icon: '🔄',
    title: 'HTML to Markdown',
    description: 'Convert HTML to clean Markdown. Supports tables, code blocks, and GitHub Flavored Markdown.',
    badge: null,
  },
  {
    href: '/word-to-markdown',
    from: 'DOCX',
    to: 'MD',
    icon: '📋',
    title: 'Word to Markdown',
    description: 'Convert .docx Word documents to clean Markdown. Headings, tables, and lists convert automatically.',
    badge: null,
  },
];

// The three formats Markdown fans out into — shown in the hero output stack.
const OUTPUTS = [
  { ext: 'PDF', label: 'document.pdf', tint: 'text-rose-300 border-rose-400/30 bg-rose-400/10' },
  { ext: 'HTML', label: 'index.html', tint: 'text-sky-300 border-sky-400/30 bg-sky-400/10' },
  { ext: 'DOCX', label: 'report.docx', tint: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10' },
];

export default function HomePage() {
  return (
    <main className="bg-gray-50">
      <StructuredData
        type="website"
        description="Free online developer tools: Markdown to PDF, HTML, Word, and back, all client-side."
      />
      <StructuredData
        type="itemlist"
        name="MDTool Developer Tools"
        items={TOOLS.map((tool) => ({ name: tool.title, url: tool.href, description: tool.description }))}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0b1622] text-white">
        {/* faint grid + glow, sets the "editor" mood without shouting */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl"
        />

        <div className="relative max-w-6xl mx-auto px-4 pt-8 pb-10 md:pt-12 md:pb-14">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3.5 py-1.5 font-mono text-xs text-blue-200">
              <span className="text-blue-300">&lt;/&gt;</span>
              Markdown toolkit · runs in your browser
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Turn Markdown into{' '}
              <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                PDF, HTML &amp; Word
              </span>
            </h1>

            <p className="mt-3 text-base md:text-lg text-blue-100/80 leading-relaxed">
              MDTool converts between Markdown, PDF, HTML, and Word right in your browser,
              with no login, no watermarks, and nothing ever uploaded to a server.
            </p>
          </div>

          {/* Signature: the "convert window" — raw Markdown → rendered output */}
          <div className="mt-7 mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#0f1e30] shadow-2xl shadow-blue-950/50">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-xs text-blue-200/60">mdtool: convert</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch">
              {/* Left: raw markdown, real text with syntax tokens */}
              <div className="p-5 font-mono text-[13px] leading-6 text-blue-100/90">
                <div className="mb-3 font-sans text-xs uppercase tracking-wider text-blue-200/50">
                  README.md
                </div>
                <pre className="whitespace-pre-wrap">
                  <span className="text-sky-300"># Release Notes</span>{'\n\n'}
                  Ship <span className="text-amber-300">**Markdown**</span> anywhere.{'\n\n'}
                  <span className="text-blue-300/70">- [x]</span> Tables, code &amp; Mermaid{'\n'}
                  <span className="text-blue-300/70">- [ ]</span> No file uploads{'\n\n'}
                  <span className="text-emerald-300">`npx mdtool`</span>
                  <span className="md-caret ml-0.5 inline-block w-[7px] -translate-y-px bg-blue-300/90 align-middle" style={{ height: '1.1em' }} />
                </pre>
              </div>

              {/* Middle: the transform arrow */}
              <div className="flex items-center justify-center border-y md:border-x md:border-y-0 border-white/10 px-4 py-3 md:py-0">
                <div className="flex items-center gap-2 font-mono text-sm text-blue-300">
                  <span className="hidden md:inline">convert</span>
                  <span className="md-arrow text-xl text-sky-300 md:rotate-0 rotate-90">→</span>
                </div>
              </div>

              {/* Right: rendered output stack — fixes the cut-off output card */}
              <div className="p-5">
                <div className="mb-3 font-sans text-xs uppercase tracking-wider text-blue-200/50">
                  Output
                </div>
                <div className="space-y-2.5">
                  {OUTPUTS.map((out, i) => (
                    <div
                      key={out.ext}
                      className={`md-rise flex items-center justify-between rounded-lg border px-3.5 py-2.5 ${out.tint}`}
                      style={{ animationDelay: `${0.15 * i + 0.2}s` }}
                    >
                      <span className="font-mono text-sm text-blue-50/90">{out.label}</span>
                      <span className="font-mono text-xs font-semibold tracking-wide">{out.ext}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA: every converter, primary first */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/markdown-to-pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/40 transition-colors hover:bg-blue-500"
            >
              <span className="font-mono text-sm text-blue-200">MD → PDF</span>
              Markdown to PDF →
            </Link>
            {TOOLS.slice(1).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 font-medium text-blue-50 transition-colors hover:border-blue-400/50 hover:bg-white/10"
              >
                <span className="font-mono text-sm text-blue-300">{tool.from} → {tool.to}</span>
              </Link>
            ))}
          </div>

          {/* trust strip — true facts, not decoration */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-blue-200/50">
            <span>100% client-side</span>
            <span className="hidden sm:inline text-white/15">•</span>
            <a
              href="https://github.github.com/gfm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors"
            >
              GitHub Flavored Markdown
            </a>
            <span className="hidden sm:inline text-white/15">•</span>
            <span>No login required</span>
          </div>
        </div>
      </section>

      {/* ── Converters ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All converters</h2>
          <p className="mt-2 text-gray-500">Five tools, both directions. Pick one and start.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-2xl">{tool.icon}</span>
                {tool.badge ? (
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {tool.badge}
                  </span>
                ) : (
                  <span className="font-mono text-xs font-semibold text-gray-400 group-hover:text-blue-500 transition-colors">
                    {tool.from} → {tool.to}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">{tool.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600">
                Open tool
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Why MDTool ─────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-white px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why MDTool?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔒', title: 'Private by default', desc: 'Files never leave your device. Every conversion runs 100% client-side in your browser.' },
              { icon: '⚡', title: 'Instant results', desc: 'No server round-trips. Conversion happens in milliseconds: paste, convert, download.' },
              { icon: '🆓', title: 'Free forever', desc: 'No paywalls, no watermarks, no signup. Open a tool and start converting right away.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="mb-3 text-2xl">{item.icon}</div>
                <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
