import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StructuredData from '@/components/seo/StructuredData';
import { GUIDE_TOPICS, getGuideTopic, type GuideTopic } from '@/lib/cheatsheet';


// Spokes launched 2026-07-03; the five below were added 2026-10-01, when every
// spoke was also revised (new sections, FAQs and related links).
const FIRST_PUBLISHED = '2026-07-03';
const CONTENT_UPDATED = '2026-10-01';
const NEW_TOPICS = new Set(['callouts', 'collapsible-sections', 'escaping-characters', 'horizontal-rules', 'page-breaks']);

export function generateStaticParams() {
  return GUIDE_TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getGuideTopic(slug);
  if (!topic) return {};
  return {
    title: topic.metaTitle,
    description: topic.metaDescription,
    alternates: { canonical: `https://www.mdtool.dev/markdown-cheat-sheet/${slug}` },
    openGraph: {
      title: `${topic.title} | MDTool Markdown Cheat Sheet`,
      description: topic.metaDescription,
      url: `https://www.mdtool.dev/markdown-cheat-sheet/${slug}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  };
}

export default async function GuideTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = getGuideTopic(slug);
  if (!topic) notFound();

  const curated = (topic.related ?? [])
    .map((s) => getGuideTopic(s))
    .filter((t): t is GuideTopic => t !== undefined && t.slug !== slug);
  const related = curated.length > 0 ? curated : GUIDE_TOPICS.filter((t) => t.slug !== slug).slice(0, 4);

  return (
    <>
      <StructuredData
        type="techarticle"
        name={topic.metaTitle}
        url={`/markdown-cheat-sheet/${slug}`}
        description={topic.metaDescription}
        datePublished={NEW_TOPICS.has(topic.slug) ? CONTENT_UPDATED : FIRST_PUBLISHED}
        dateModified={CONTENT_UPDATED}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown Cheat Sheet', url: '/markdown-cheat-sheet' },
          { name: topic.title, url: `/markdown-cheat-sheet/${slug}` },
        ]}
      />
      <StructuredData type="faq" faqs={topic.faqs} />

      <main className="min-h-screen bg-page">
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="max-w-3xl mx-auto px-4 pt-10 pb-12">
            <nav className="text-xs text-blue-200/60 mb-3">
              <Link href="/markdown-cheat-sheet" className="hover:text-blue-200">Markdown Cheat Sheet</Link>
              <span className="mx-1.5">/</span>
              <span>{topic.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{topic.title}</h1>
            <p className="text-xs text-blue-200/60 mb-3">
              Updated <time dateTime={CONTENT_UPDATED}>October 1, 2026</time>
            </p>
            {/* Answer-first: the direct, self-contained answer to the query */}
            <p className="text-base md:text-lg text-blue-100/85 leading-relaxed">{topic.answer}</p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 py-10">
          {topic.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{section.body}</p>
              {section.table && (
                <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        {section.table.headers.map((h) => (
                          <th key={h} scope="col" className="px-4 py-2.5 font-semibold border-b border-gray-200">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {section.table.rows.map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 align-top">
                          {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'font-medium text-gray-900 whitespace-nowrap' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.code && (
                <pre className="rounded-xl bg-[#0f1e30] text-blue-50 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
                  <code>{section.code}</code>
                </pre>
              )}
              {section.note && (
                <p className="mt-3 rounded-lg border-l-4 border-blue-400 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                  {section.note}
                </p>
              )}
            </section>
          ))}

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {topic.faqs.map((faq) => (
                <div key={faq.q} className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="font-medium text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tool CTA */}
          <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h2 className="font-semibold text-blue-900 mb-2 text-base">Try it live</h2>
            <p className="text-blue-800 text-sm mb-4">
              Paste this syntax into the free {topic.relatedTool.label.toLowerCase()} and see the rendered
              output instantly. No signup, and everything runs in your browser.
            </p>
            <a
              href={topic.relatedTool.href}
              className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Open {topic.relatedTool.label} →
            </a>
          </div>

          {/* Related topics */}
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">More Markdown syntax:</h2>
            <div className="flex flex-wrap gap-3">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/markdown-cheat-sheet/${t.slug}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm"
                >
                  {t.title} →
                </Link>
              ))}
              <Link
                href="/markdown-cheat-sheet"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm"
              >
                Full Cheat Sheet →
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
