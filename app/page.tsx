import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'MDTool - Free Online Markdown Converter: MD to PDF, HTML & Word',
  description: 'MDTool is a free online Markdown converter. Turn Markdown into PDF, HTML, and Word (and back) right in your browser. No login, no uploads, no watermarks.',
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
  {
    href: '/markdown-table-generator',
    from: 'GRID',
    to: 'MD',
    icon: '⊞',
    title: 'Markdown Table Generator',
    description: 'Build tables in a visual grid: column alignment, Excel/CSV paste import, copy as Markdown or HTML.',
    badge: 'New',
  },
];

// The three formats Markdown fans out into - shown in the hero output stack.
const OUTPUTS = [
  { ext: 'PDF', label: 'document.pdf', tint: 'text-rose-300', dot: 'bg-rose-400' },
  { ext: 'HTML', label: 'index.html', tint: 'text-sky-300', dot: 'bg-sky-400' },
  { ext: 'DOCX', label: 'report.docx', tint: 'text-emerald-300', dot: 'bg-emerald-400' },
];

// Output-format colours, shared by the hero buttons and the output stack.
const FORMAT_DOT: Record<string, string> = {
  PDF: 'bg-rose-400',
  HTML: 'bg-sky-400',
  DOCX: 'bg-emerald-400',
  MD: 'bg-violet-400',
};

export default function HomePage() {
  return (
    <main className="bg-page">
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
      <section className="relative overflow-hidden bg-page text-zinc-950">
        {/* Graph-paper grid, edge fade and colour wash painted as one static
            background: no mask or blur layers, so scrolling stays cheap. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse 75% 65% at 50% 30%, transparent 30%, var(--color-page) 100%)',
              'radial-gradient(ellipse 30rem 11rem at 50% 36rem, rgba(59,130,246,0.12), transparent)',
              'linear-gradient(rgba(24,24,27,0.06) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(24,24,27,0.06) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
            backgroundPosition: 'center, center, center top, center top',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-14 md:pt-14 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 font-mono text-xs text-zinc-600 shadow-[0_1px_2px_rgba(24,24,27,0.05)]">
              <span className="text-blue-600">&lt;/&gt;</span>
              Markdown toolkit · runs in your browser
            </span>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Turn Markdown into{' '}
              <span className="relative whitespace-nowrap text-blue-600">
                PDF, HTML &amp; Word
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-blue-300"
                >
                  <path
                    className="md-draw"
                    d="M2 9 C 60 3, 140 3, 200 6 S 280 9, 298 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={1}
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-zinc-600 leading-relaxed">
              MDTool converts between Markdown, PDF, HTML, and Word right in your browser,
              with no login, no watermarks, and nothing ever uploaded to a server.
            </p>
          </div>

          {/* Signature: the "convert window" - raw Markdown → rendered output */}
          <div className="mt-10 mx-auto max-w-4xl rounded-2xl bg-white p-1.5 ring-1 ring-zinc-900/[0.06] shadow-[0_30px_60px_-24px_rgba(24,24,27,0.35)] [contain:paint]">
            <div className="rounded-xl bg-[#111215] text-white ring-1 ring-black/40">
              {/* window chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-zinc-500">mdtool: convert</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch">
                {/* Left: raw markdown, real text with syntax tokens */}
                <div className="p-5 font-mono text-[13px] leading-6 text-zinc-300">
                  <div className="mb-3 font-sans text-xs uppercase tracking-wider text-zinc-500">
                    README.md
                  </div>
                  <pre className="whitespace-pre-wrap">
                    <span className="text-sky-300"># Release Notes</span>{'\n\n'}
                    Ship <span className="text-amber-300">**Markdown**</span> anywhere.{'\n\n'}
                    <span className="text-zinc-500">- [x]</span> Tables, code &amp; Mermaid{'\n'}
                    <span className="text-zinc-500">- [ ]</span> No file uploads{'\n\n'}
                    <span className="text-emerald-300">`npx mdtool`</span>
                    <span className="md-caret ml-0.5 inline-block w-[7px] -translate-y-px bg-zinc-300 align-middle" style={{ height: '1.1em' }} />
                  </pre>
                </div>

                {/* Middle: the transform arrow */}
                <div className="flex items-center justify-center border-y md:border-x md:border-y-0 border-white/[0.06] px-4 py-3 md:py-0">
                  <div className="flex items-center gap-2 font-mono text-sm text-zinc-500">
                    <span className="hidden md:inline">convert</span>
                    <span className="md-arrow text-xl text-zinc-300 md:rotate-0 rotate-90">→</span>
                  </div>
                </div>

                {/* Right: rendered output stack */}
                <div className="p-5">
                  <div className="mb-3 font-sans text-xs uppercase tracking-wider text-zinc-500">
                    Output
                  </div>
                  <div className="space-y-2.5">
                    {OUTPUTS.map((out, i) => (
                      <div
                        key={out.ext}
                        className={`md-rise flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 ${out.tint}`}
                        style={{ animationDelay: `${0.15 * i + 0.2}s` }}
                      >
                        <span className="flex items-center gap-2.5 font-mono text-sm text-zinc-200">
                          <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${out.dot}`} />
                          {out.label}
                        </span>
                        <span className="font-mono text-xs font-semibold tracking-wide">{out.ext}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA: every converter as an identical button. The tool name stays in
              the link (screen-reader only) so the anchor text is unchanged. */}
          <div className="mt-10 mx-auto grid max-w-4xl grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                title={tool.title}
                className="group flex items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 shadow-[0_1px_0_rgba(24,24,27,0.04),0_2px_6px_-2px_rgba(24,24,27,0.08)] transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_1px_0_rgba(24,24,27,0.04),0_10px_20px_-8px_rgba(24,24,27,0.18)] active:translate-y-0 active:scale-[0.97]"
              >
                <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${FORMAT_DOT[tool.to]}`} />
                <span aria-hidden className="font-mono text-sm">
                  <span className="text-zinc-400">{tool.from}</span>
                  <span className="mx-1.5 inline-block text-zinc-300 transition-[transform,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:text-zinc-900">→</span>
                  <span className="font-semibold text-zinc-900">{tool.to}</span>
                </span>
                <span className="sr-only">{tool.title}</span>
              </Link>
            ))}
          </div>

          {/* trust strip - true facts, not decoration */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-zinc-500">
            <span>100% client-side</span>
            <span className="hidden sm:inline text-zinc-300">/</span>
            <a
              href="https://github.github.com/gfm/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-900 hover:decoration-zinc-500"
            >
              GitHub Flavored Markdown
            </a>
            <span className="hidden sm:inline text-zinc-300">/</span>
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
                  <span className="font-mono text-xs font-semibold text-gray-600 group-hover:text-blue-700 transition-colors">
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
      <section className="border-t border-gray-200/70 bg-page-soft px-4 py-16 md:py-20">
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
