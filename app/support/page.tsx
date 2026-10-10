import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'MDTool Support and Frequently Asked Questions',
  description:
    'Get help with MDTool Markdown converters, PDF and Word exports, browser privacy, supported file formats, and common conversion issues.',
  alternates: { canonical: 'https://www.mdtool.dev/support' },
};

const FAQS = [
  {
    q: 'Are my files uploaded?',
    a: 'No. MDTool processes documents in your browser. The text and files you convert are not sent to or stored on an MDTool server.',
  },
  {
    q: 'Which file types are supported?',
    a: 'Markdown tools accept Markdown text and .md files. Word to Markdown accepts modern .docx files. Legacy .doc files are not supported by the browser converter.',
  },
  {
    q: 'Why does a conversion look different from the preview?',
    a: 'PDF and DOCX have their own layout rules. Check the format-specific support notes on the converter page, especially for images, merged tables, emoji, and advanced Markdown extensions.',
  },
  {
    q: 'Where can I report a bug or request a feature?',
    a: 'Email the MDTool maintainer from the contact page or open an issue in the public GitHub repository with a reproducible example that does not contain private document content.',
  },
];

export default function SupportPage() {
  return (
    <>
      <StructuredData
        type="faq"
        faqs={FAQS}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Support', url: '/support' },
        ]}
      />
      <main className="min-h-screen bg-page">
        <section className="hero-grid border-b border-zinc-200/70 px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 md:text-4xl">MDTool Support</h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Find answers about Markdown conversion, browser-only processing, PDF and Word exports,
              and the formats MDTool can handle.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-10">
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <article key={faq.q} className="rounded-xl border border-zinc-200 bg-white p-5">
                <h2 className="font-semibold text-zinc-900">{faq.q}</h2>
                <p className="mt-2 leading-relaxed text-zinc-600">{faq.a}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-zinc-700">
            <p>
              Need a converter-specific answer? Start with the{' '}
              <Link className="font-medium underline underline-offset-4" href="/markdown-guide">
                Markdown guide
              </Link>{' '}
              or open the{' '}
              <Link className="font-medium underline underline-offset-4" href="/contact">
                contact page
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
