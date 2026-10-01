import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import StructuredData, { AUTHOR, SITE_REPO } from '@/components/seo/StructuredData';
import WorkWithMe from '@/components/about/WorkWithMe';

// Date this page's factual claims (libraries, client-side behavior) were last checked against the codebase.
const LAST_REVIEWED = '2026-10-01';
const LAST_REVIEWED_LABEL = 'October 1, 2026';

export const metadata: Metadata = {
  title: { absolute: 'About MDTool' },
  description: 'What MDTool is, how the conversions actually work, and the open-source libraries it runs on. No account, no file uploads, no tracking of your content.',
  alternates: {
    canonical: 'https://www.mdtool.dev/about',
  },
};

const TOOLS = [
  { href: '/markdown-to-pdf', title: 'Markdown to PDF', text: 'Formatted PDFs with code highlighting, tables, and Mermaid diagrams.' },
  { href: '/markdown-to-html', title: 'Markdown to HTML', text: 'Clean HTML for websites, CMSs, and email templates.' },
  { href: '/markdown-to-word', title: 'Markdown to Word', text: 'Real, editable .docx files for Word, Google Docs, and LibreOffice.' },
  { href: '/html-to-markdown', title: 'HTML to Markdown', text: 'Turn HTML into GitHub Flavored Markdown, tables included.' },
  { href: '/word-to-markdown', title: 'Word to Markdown', text: 'Convert .docx documents to clean Markdown.' },
  { href: '/markdown-to-text', title: 'Markdown to Plain Text', text: 'Strip Markdown syntax and keep the readable text.' },
  { href: '/markdown-table-generator', title: 'Markdown Table Generator', text: 'Build tables in a visual grid or paste from Excel and CSV.' },
];

const LIBRARIES = [
  { name: 'marked', role: 'Markdown parsing' },
  { name: 'highlight.js', role: 'syntax highlighting for code blocks' },
  { name: 'mermaid', role: 'diagram rendering' },
  { name: 'pdfmake + html-to-pdfmake', role: 'in-browser vector PDF generation with selectable, searchable text' },
  { name: 'docx', role: 'generating Word (.docx) files' },
  { name: 'mammoth', role: 'reading Word (.docx) files' },
  { name: 'turndown', role: 'HTML-to-Markdown conversion' },
];

const FACT_CHIPS = ['Runs 100% in your browser', 'No signup, no watermark', `${TOOLS.length} free tools`];

const linkClass = 'font-medium text-blue-600 underline-offset-2 hover:underline';

function SectionHeading({ id, eyebrow, children }: { id?: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">{eyebrow}</p>}
      <h2 id={id} className="mt-1 scroll-mt-20 text-2xl font-bold text-gray-900 md:text-3xl">
        {children}
      </h2>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <StructuredData
        type="aboutpage"
        name="About MDTool"
        url="/about"
        description="What MDTool is, how the conversions actually work, and the open-source libraries it runs on."
        dateModified={LAST_REVIEWED}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 md:pb-16 md:pt-14">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-blue-200/60">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-blue-100">About</span>
            </nav>
            <h1 className="text-3xl font-bold md:text-5xl">About MDTool</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100/80 md:text-lg">
              Free, client-side conversion tools for Markdown, PDF, HTML, and Word. Your documents are
              converted privately in your browser and never uploaded.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {FACT_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-blue-50"
                >
                  <svg className="h-4 w-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" clipRule="evenodd" />
                  </svg>
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 md:py-16">
          {/* What MDTool is */}
          <section aria-labelledby="what-mdtool-is">
            <SectionHeading id="what-mdtool-is" eyebrow="The tools">What MDTool is</SectionHeading>
            <p className="max-w-3xl leading-relaxed text-gray-700">
              MDTool is a small set of single-purpose conversion tools: Markdown to PDF, Markdown to HTML,
              Markdown to Word, HTML to Markdown, Word to Markdown, Markdown to plain text, and a Markdown table
              generator. There is no account system, no saved-document history, and no paywall. Every tool is
              free to use without limits.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <span className="flex items-center justify-between gap-2 font-semibold text-gray-900">
                    {tool.title}
                    <span className="text-blue-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
                  </span>
                  <span className="mt-1.5 text-sm leading-relaxed text-gray-600">{tool.text}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* How conversion works */}
          <section aria-labelledby="how-conversion-works" className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionHeading id="how-conversion-works" eyebrow="Privacy by design">How conversion actually works</SectionHeading>
              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  Every conversion runs entirely in your browser using JavaScript. When you paste text or upload
                  a file, it is parsed and rendered locally on your device. It is never transmitted to an MDTool
                  server.
                </p>
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                  <strong>Verify it yourself:</strong> open your browser&apos;s Network tab while converting and
                  you&apos;ll see no outbound request carrying your document content.
                </div>
                <p>
                  This is possible because each tool is built on well-established open-source libraries. None of
                  them require a server round-trip to do their job, which is why MDTool doesn&apos;t have one for
                  the conversion step itself.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Open-source libraries</h3>
                <ul className="mt-3 divide-y divide-gray-100">
                  {LIBRARIES.map((lib) => (
                    <li key={lib.name} className="py-2.5 text-sm">
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[13px] font-semibold text-gray-900">
                        {lib.name}
                      </code>
                      <span className="mt-1 block text-gray-600">{lib.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Author */}
          <section aria-labelledby="author">
            <SectionHeading id="author" eyebrow="The maker">Who runs MDTool</SectionHeading>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6 text-center lg:col-span-1">
                <Image
                  src="/authors/muhammad-usman.jpg"
                  alt="Muhammad Usman, creator of MDTool"
                  width={128}
                  height={128}
                  className="mx-auto h-32 w-32 rounded-full object-cover ring-4 ring-blue-50"
                />
                <p className="mt-4 text-lg font-semibold text-gray-900">{AUTHOR.name}</p>
                <p className="text-sm text-gray-600">Software developer</p>
                <p className="text-sm text-gray-600">Creator and maintainer of MDTool</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <a
                    href={AUTHOR.linkedin}
                    target="_blank"
                    rel="me noopener"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href={AUTHOR.github}
                    target="_blank"
                    rel="me noopener"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href={SITE_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-300 hover:text-blue-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3M13.5 6l-3 12" />
                    </svg>
                    MDTool source
                  </a>
                </div>
              </div>
              <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 leading-relaxed text-gray-700 lg:col-span-2">
                <p>
                  MDTool is built and maintained by <strong>Muhammad Usman</strong>, a software developer who works
                  on browser-based document processing and web tooling. He writes every converter and every guide
                  on this site, and the recommendations in the blog are based on the tools&apos; documented behavior
                  and hands-on testing. You can see the project&apos;s source and history on{' '}
                  <a href={SITE_REPO} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>.
                </p>
                <p>
                  MDTool is an independent, solo-maintained project. That&apos;s also why it can stay free: there is
                  no team, no office, and no server infrastructure processing your files.
                </p>
                <p className="border-t border-gray-100 pt-4 text-sm text-gray-600">
                  Muhammad also takes on client projects: AI automations, mobile apps, websites and web apps.{' '}
                  <a href="#work-with-me" className={linkClass}>See how to work with him &darr;</a>
                </p>
              </div>
            </div>
          </section>

          {/* How it's built */}
          <section aria-labelledby="how-its-built">
            <SectionHeading id="how-its-built" eyebrow="Transparency">How MDTool is built and tested</SectionHeading>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="font-semibold text-gray-900">Client-side conversion</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  Every converter on MDTool runs in your browser. Parsing, rendering, and file generation all happen
                  on your device; there is no conversion server and no upload step.
                </p>
              </li>
              <li className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="font-semibold text-gray-900">Libraries</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  marked (Markdown parsing), highlight.js (code highlighting), mermaid (diagrams), pdfmake with
                  html-to-pdfmake (PDF output), docx (Word output), mammoth (Word input), and turndown with
                  turndown-plugin-gfm (HTML to Markdown). These are the dependencies listed in the project&apos;s
                  package.json.
                </p>
              </li>
              <li className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="font-semibold text-gray-900">Testing</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  The guides on this site are based on each tool&apos;s documented behavior and hands-on testing of
                  the converters, as described above. You can check the client-side claim yourself in your
                  browser&apos;s Network tab while a conversion runs.
                </p>
              </li>
              <li className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="font-semibold text-gray-900">Source</p>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  The site&apos;s code and change history are public on{' '}
                  <a href={SITE_REPO} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>.
                </p>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Last reviewed: <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED_LABEL}</time>
            </p>
          </section>

          {/* Work with me */}
          <WorkWithMe />

          {/* Disambiguation, funding, contact */}
          <div className="grid gap-6 md:grid-cols-3">
            <section aria-labelledby="not-to-be-confused" className="rounded-xl border border-gray-200 bg-white p-6 md:col-span-3">
              <h2 id="not-to-be-confused" className="text-xl font-bold text-gray-900">Not to be confused with</h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                The name &ldquo;mdtool&rdquo; is also used by two unrelated pieces of software: the{' '}
                <strong>MonoDevelop command-line tool</strong> (<code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">mdtool</code>,
                for building MonoDevelop projects) and <strong>MDTools</strong>, a SolidWorks/Inventor add-in for
                manifold design. MDTool (mdtool.dev) is neither of those. It is a browser-based{' '}
                <strong>Markdown converter</strong> for turning Markdown into PDF, HTML, and Word documents, and back.
              </p>
            </section>
            <section aria-labelledby="funding" className="rounded-xl border border-gray-200 bg-white p-6 md:col-span-2">
              <h2 id="funding" className="text-xl font-bold text-gray-900">How MDTool is funded</h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                MDTool is supported by non-intrusive display advertising rather than subscriptions or paid tiers.
                See the <Link href="/privacy" className={linkClass}>Privacy Policy</Link> for details on what that
                involves.
              </p>
            </section>
            <section aria-labelledby="feedback" className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 id="feedback" className="text-xl font-bold text-gray-900">Questions or feedback</h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                See the <Link href="/contact" className={linkClass}>Contact</Link> page to get in touch.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
