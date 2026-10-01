import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StructuredData, { AUTHOR, SITE_REPO } from '@/components/seo/StructuredData';
import WorkWithMe from '@/components/about/WorkWithMe';
import LayeredCard from '@/components/about/LayeredCard';

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

// Each tool gets a format badge and its own colour (full class strings so Tailwind can see them).
const TOOLS = [
  { href: '/markdown-to-pdf', title: 'Markdown to PDF', text: 'Highlighted code, tables and Mermaid diagrams', badge: 'PDF', tone: 'bg-rose-50 text-rose-700 ring-rose-100' },
  { href: '/markdown-to-word', title: 'Markdown to Word', text: 'Editable .docx for Word and Google Docs', badge: 'DOCX', tone: 'bg-blue-50 text-blue-700 ring-blue-100' },
  { href: '/markdown-to-html', title: 'Markdown to HTML', text: 'Clean HTML for websites, CMSs and email', badge: 'HTML', tone: 'bg-orange-50 text-orange-700 ring-orange-100' },
  { href: '/markdown-to-text', title: 'Markdown to Plain Text', text: 'Strip the syntax, keep the readable text', badge: 'TXT', tone: 'bg-slate-100 text-slate-700 ring-slate-200' },
  { href: '/html-to-markdown', title: 'HTML to Markdown', text: 'GitHub Flavored Markdown, tables included', badge: 'MD', tone: 'bg-violet-50 text-violet-700 ring-violet-100' },
  { href: '/word-to-markdown', title: 'Word to Markdown', text: 'Convert .docx documents to clean Markdown', badge: 'MD', tone: 'bg-indigo-50 text-indigo-700 ring-indigo-100' },
  { href: '/markdown-table-generator', title: 'Markdown Table Generator', text: 'Build tables in a grid or paste from Excel', badge: 'TABLE', tone: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
];

// Shown alongside the tools as the 8th card so the grid fills evenly; it's a
// reference page, not a converter, so it isn't counted in the "free tools" fact.
const GUIDE = {
  href: '/markdown-cheat-sheet',
  title: 'Markdown Cheat Sheet',
  text: 'Every syntax element with copyable examples',
  badge: 'GUIDE',
  tone: 'bg-sky-50 text-sky-700 ring-sky-100',
};

const FACTS = [
  { value: '100%', label: 'of conversion runs in your browser' },
  { value: '0', label: 'files uploaded, accounts or paywalls' },
  { value: String(TOOLS.length), label: 'free tools, no usage limits' },
];

const LIBRARIES = [
  { name: 'marked', role: 'Markdown parsing' },
  { name: 'highlight.js', role: 'Code highlighting' },
  { name: 'mermaid', role: 'Diagrams' },
  { name: 'pdfmake', role: 'Vector PDF output (+ html-to-pdfmake)' },
  { name: 'docx', role: 'Word output' },
  { name: 'mammoth', role: 'Word input' },
  { name: 'turndown', role: 'HTML to Markdown (+ GFM plugin)' },
];

const link = 'font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition-colors hover:decoration-blue-600';
const pressable = 'transition-transform duration-150 ease-out active:scale-[0.97]';
const rise = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties;

function SectionHeader({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold text-blue-600">{eyebrow}</p>
      <h2 id={id} className="mt-2 scroll-mt-24 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-[17px] leading-8 text-gray-600">{intro}</p>}
    </div>
  );
}

function Check() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" clipRule="evenodd" />
    </svg>
  );
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
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

      <main className="overflow-x-clip bg-page">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Intro: the person first */}
          <section id="author" aria-labelledby="about-heading" className="scroll-mt-24 pb-16 pt-12 sm:pb-20 sm:pt-20">
            <nav aria-label="Breadcrumb" className="about-rise text-sm text-gray-500">
              <Link href="/" className="transition-colors hover:text-gray-900">Home</Link>
              <span className="mx-2 text-gray-300" aria-hidden="true">/</span>
              <span className="text-gray-900">About</span>
            </nav>

            <div className="mt-12 grid items-center gap-14 md:grid-cols-[auto_1fr] md:gap-16 lg:gap-20">
              {/* Photo with two tilted cards layered behind it; they fan out a little on hover. */}
              <div className="about-rise mx-auto md:mx-0" style={rise(40)}>
                <div className="group relative h-[300px] w-[260px] sm:h-[380px] sm:w-[330px]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[28px] bg-[#0f1e30] shadow-xl shadow-slate-900/20 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [transform:translate(18px,-10px)_rotate(6deg)] group-hover:[transform:translate(30px,-16px)_rotate(9deg)] motion-reduce:transition-none"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-200 shadow-lg shadow-slate-900/10 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [transform:translate(-16px,-8px)_rotate(-5deg)] group-hover:[transform:translate(-28px,-14px)_rotate(-8deg)] motion-reduce:transition-none"
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-[24px] shadow-2xl shadow-slate-900/30 ring-1 ring-black/5">
                    <Image
                      src="/authors/muhammad-usman-800.jpg"
                      alt="Muhammad Usman, creator of MDTool"
                      fill
                      priority
                      sizes="(min-width: 640px) 330px, 260px"
                      className="object-cover object-[50%_30%]"
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-2xl">
                <h1
                  id="about-heading"
                  className="about-rise text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
                  style={rise(40)}
                >
                  Hi, I&apos;m Muhammad Usman.
                  <span className="block text-gray-400">I build MDTool.</span>
                </h1>
                <p className="about-rise mt-4 text-lg font-medium text-gray-500" style={rise(60)}>
                  Software developer &middot; Agentic AI, mobile &amp; web development
                </p>
                <p className="about-rise mt-6 text-lg leading-8 text-gray-600" style={rise(90)}>
                  I work on browser-based document processing and web tooling.
                  I write every converter and every guide on this site, and the recommendations in the blog are
                  based on the tools&apos; documented behavior and hands-on testing.
                </p>
                <p className="about-rise mt-4 text-lg leading-8 text-gray-600" style={rise(120)}>
                  MDTool is an independent, solo-maintained project. That&apos;s also why it can stay free: there
                  is no team, no office, and no server infrastructure processing your files.
                </p>

                <div className="about-rise mt-8 flex flex-wrap items-center gap-3" style={rise(160)}>
                  <a
                    href="#work-with-me"
                    className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gray-800 to-gray-950 px-6 py-3 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_20px_-8px_rgba(17,24,39,0.6)] ring-1 ring-gray-950 hover:from-gray-700 hover:to-gray-900 ${pressable}`}
                  >
                    Work with me
                    <span aria-hidden="true">&darr;</span>
                  </a>
                  <a
                    href={`mailto:${AUTHOR.email}?subject=Project%20inquiry%20via%20MDTool`}
                    className={`inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-5 font-semibold text-gray-900 shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-inset ring-gray-200 transition-colors hover:bg-gray-50 hover:ring-gray-300 ${pressable}`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
                      </svg>
                    </span>
                    Email me
                  </a>
                  <a
                    href={AUTHOR.linkedin}
                    target="_blank"
                    rel="me noopener"
                    aria-label="Muhammad Usman on LinkedIn"
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-inset ring-gray-200 transition-colors hover:text-[#0a66c2] hover:ring-gray-300 ${pressable}`}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  </a>
                  <a
                    href={AUTHOR.github}
                    target="_blank"
                    rel="me noopener"
                    aria-label="Muhammad Usman on GitHub"
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-600 shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-inset ring-gray-200 transition-colors hover:text-gray-900 hover:ring-gray-300 ${pressable}`}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </section>


          {/* What MDTool is */}
          <section aria-labelledby="what-mdtool-is" className="border-t border-gray-200/80 py-16 sm:py-24">
            <SectionHeader
              id="what-mdtool-is"
              eyebrow="The tools"
              title="What MDTool is"
              intro="A small set of single-purpose conversion tools. There is no account system, no saved-document history, and no paywall. Every tool is free to use without limits."
            />

            {/* Quick facts: a single strip, no cards */}
            <dl className="mt-10 grid grid-cols-3 divide-x divide-gray-200 border-y border-gray-200/80 py-6">
              {FACTS.map((fact) => (
                <div key={fact.label} className="px-3 text-center sm:px-6">
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="block text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">{fact.value}</span>
                    <span className="mt-1 block text-xs leading-5 text-gray-500 sm:text-sm">{fact.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* All tools in one layered card, as a two-column list of rows */}
            <LayeredCard back="lavender" tilt="right" className="mt-12">
              <ul className="grid gap-1 p-3 text-left sm:p-4 md:grid-cols-2 md:gap-x-4">
                {[...TOOLS, GUIDE].map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className="group/row flex items-center gap-4 rounded-xl px-3 py-3.5 transition-colors duration-150 hover:bg-gray-50"
                    >
                      <span className={`w-16 shrink-0 rounded-lg py-1 text-center font-mono text-[11px] font-semibold tracking-wide ring-1 ring-inset ${tool.tone}`}>
                        {tool.badge}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-gray-900">{tool.title}</span>
                        <span className="block text-sm leading-5 text-gray-500">{tool.text}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-gray-300 transition-[color,transform] duration-200 ease-out group-hover/row:translate-x-0.5 group-hover/row:text-gray-900 motion-reduce:transition-none"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </LayeredCard>
          </section>

          {/* How conversion works */}
          <section aria-labelledby="how-conversion-works" className="border-t border-gray-200/80 py-16 sm:py-24">
            <SectionHeader id="how-conversion-works" eyebrow="Privacy" title="How conversion actually works" />
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <LayeredCard back="navy" tilt="left">
                <div className="p-7 sm:p-8">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white shadow-md shadow-gray-900/20">
                    <Icon>
                      <rect x="5" y="11" width="14" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </Icon>
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-gray-900">Your files stay on your device</h3>
                  <p className="mt-2 text-[15px] leading-7 text-gray-600">
                    Every conversion runs entirely in your browser using JavaScript. When you paste text or upload a
                    file, it is parsed and rendered locally on your device. It is never transmitted to an MDTool server.
                  </p>
                </div>
              </LayeredCard>
              <LayeredCard back="lavender" tilt="right">
                <div className="p-7 sm:p-8">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30">
                    <Icon>
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="m20 20-4.4-4.4" />
                    </Icon>
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-gray-900">Verify it yourself</h3>
                  <p className="mt-2 text-[15px] leading-7 text-gray-600">
                    Open your browser&apos;s Network tab while converting, and you&apos;ll see no outbound request
                    carrying your document content.
                  </p>
                </div>
              </LayeredCard>
            </div>
          </section>

          {/* How it's built */}
          <section aria-labelledby="how-its-built" className="border-t border-gray-200/80 py-16 sm:py-24">
            <SectionHeader
              id="how-its-built"
              eyebrow="Transparency"
              title="How MDTool is built and tested"
              intro="Parsing, rendering, and file generation all happen on your device; there is no conversion server and no upload step. Each tool is built on well-established open-source libraries, none of which needs a server round-trip to do its job."
            />

            <LayeredCard back="lavender" tilt="right" className="mt-12">
              <div className="grid gap-10 p-7 text-left sm:p-10 md:grid-cols-2 md:gap-14">
                <div>
                  <h3 className="font-semibold text-gray-900">Open-source libraries</h3>
                  <ul className="mt-5 space-y-3">
                    {LIBRARIES.map((lib) => (
                      <li key={lib.name} className="flex gap-3 text-[15px] leading-6">
                        <Check />
                        <span>
                          <code className="font-mono text-sm font-semibold text-gray-900">{lib.name}</code>
                          <span className="text-gray-500"> &middot; {lib.role}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:border-l md:border-gray-200/80 md:pl-14">
                  <h3 className="font-semibold text-gray-900">How it&apos;s built and tested</h3>
                  <ul className="mt-5 space-y-4 text-[15px] leading-6 text-gray-600">
                    <li className="flex gap-3">
                      <Check />
                      <span>
                        These are the dependencies listed in the project&apos;s package.json, and the site&apos;s code
                        and change history are public on{' '}
                        <a href={SITE_REPO} target="_blank" rel="noopener noreferrer" className={link}>GitHub</a>.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Check />
                      <span>
                        The guides are based on each tool&apos;s documented behavior and hands-on testing of the
                        converters.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Check />
                      <span>
                        The facts on this page were last checked against the code on{' '}
                        <time dateTime={LAST_REVIEWED} className="font-medium text-gray-900">{LAST_REVIEWED_LABEL}</time>.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </LayeredCard>
          </section>

          <WorkWithMe />

          {/* Closing note: funding + contact, one quiet line (no cards) */}
          <p className="border-t border-gray-200/80 py-12 text-center text-sm leading-7 text-gray-500">
            MDTool is funded by non-intrusive display advertising, not subscriptions or paid tiers (
            <Link href="/privacy" className={link}>Privacy Policy</Link>). Questions, bugs or ideas?{' '}
            <Link href="/contact" className={link}>Get in touch</Link>.
          </p>
        </div>
      </main>
    </>
  );
}
