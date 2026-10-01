'use client';

import { useState, type ReactNode } from 'react';
import StructuredData from './StructuredData';

interface FaqItem { q: string; a: ReactNode; text?: string; }

export default function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // FAQPage text must match what readers see: use the visible answer whenever it's
  // a plain string; `text` is only the plain-text twin of a JSX answer.
  const schemaFaqs = items.map(({ q, a, text }) => ({ q, a: typeof a === 'string' ? a : text ?? '' }));

  return (
    <div>
      <StructuredData type="faq" faqs={schemaFaqs} />
      <h2 className="text-2xl font-semibold text-zinc-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-zinc-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
              aria-controls={`faq-answer-${i}`}
              className="w-full text-left px-5 py-4 flex justify-between items-center bg-white hover:bg-zinc-50 transition-colors"
            >
              <span className="font-medium text-zinc-800 pr-4">{item.q}</span>
              <svg
                className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div id={`faq-answer-${i}`} className={`px-5 py-4 bg-zinc-50 border-t border-zinc-200 ${openIndex === i ? '' : 'hidden'}`}>
              <p className="text-zinc-700 leading-relaxed">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
