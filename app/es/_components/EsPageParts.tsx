import type { ReactNode } from 'react';
import StructuredData from '@/components/seo/StructuredData';

export interface EsFaqItem {
  q: string;
  a: ReactNode;
  /** Plain-text answer for the FAQPage schema (falls back to `a` when it is a string). */
  text?: string;
}

/**
 * Spanish FAQ block. The shared FaqSection hardcodes an English heading, so the /es pages
 * render their own: native <details> elements (no client JS) plus the same FAQPage schema.
 */
export function EsFaq({ items }: { items: EsFaqItem[] }) {
  const schemaFaqs = items.map(({ q, a, text }) => ({ q, a: typeof a === 'string' ? a : text ?? '' }));
  return (
    <div>
      <StructuredData type="faq" faqs={schemaFaqs} />
      <h2 className="text-2xl font-semibold text-zinc-800 mb-6">Preguntas frecuentes</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} open={i === 0} className="group border border-zinc-200 rounded-lg overflow-hidden bg-white">
            <summary className="cursor-pointer list-none px-5 py-4 flex justify-between items-center hover:bg-zinc-50 transition-colors">
              <span className="font-medium text-zinc-800 pr-4">{item.q}</span>
              <svg className="w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 py-4 bg-zinc-50 border-t border-zinc-200">
              <p className="text-zinc-700 leading-relaxed">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function UiLanguageNote({ className = 'text-sm text-zinc-600 mb-2' }: { className?: string }) {
  return (
    <p className={className}>
      La interfaz de la herramienta está en inglés; la conversión funciona igual.
    </p>
  );
}

export function RelatedLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <section className="bg-page-soft border-t border-zinc-200/70 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-zinc-700 mb-4">También te puede servir:</h2>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm"
            >
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export const tableHead = 'text-left px-3 py-2 font-semibold text-zinc-700';
export const codeClass = 'text-sm bg-zinc-100 px-1 py-0.5 rounded';
