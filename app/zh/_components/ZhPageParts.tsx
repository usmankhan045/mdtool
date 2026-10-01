import type { ReactNode } from 'react';
import StructuredData from '@/components/seo/StructuredData';

export interface ZhFaqItem {
  q: string;
  a: ReactNode;
  /** Plain-text answer for the FAQPage schema (falls back to `a` when it is a string). */
  text?: string;
}

/**
 * Simplified Chinese FAQ block. The shared FaqSection hardcodes an English heading, so the /zh pages
 * render their own: native <details> elements (no client JS) plus the same FAQPage schema.
 */
export function ZhFaq({ items }: { items: ZhFaqItem[] }) {
  const schemaFaqs = items.map(({ q, a, text }) => ({ q, a: typeof a === 'string' ? a : text ?? '' }));
  return (
    <div>
      <StructuredData type="faq" faqs={schemaFaqs} />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">常见问题</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} open={i === 0} className="group border border-gray-200 rounded-lg overflow-hidden bg-white">
            <summary className="cursor-pointer list-none px-5 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-800 pr-4">{item.q}</span>
              <svg className="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function UiLanguageNote({ className = 'text-sm text-blue-100/70 mb-2' }: { className?: string }) {
  return <p className={className}>工具界面为英文，转换功能完全相同。</p>;
}

export function RelatedLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <section className="bg-page-soft border-t border-gray-200/70 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">相关工具与文章：</h2>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export const tableHead = 'text-left px-3 py-2 font-semibold text-gray-700';
export const codeClass = 'text-sm bg-gray-100 px-1 py-0.5 rounded';
