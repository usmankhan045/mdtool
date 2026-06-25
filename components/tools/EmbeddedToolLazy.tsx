'use client';

import dynamic from 'next/dynamic';

/**
 * Client wrapper that defers the live converter (and its heavy marked +
 * highlight.js dependencies, ~150KB) out of the blog page's initial bundle.
 * The widget hydrates after first paint; until then a sized skeleton holds
 * its place so there's no layout shift.
 */
const EmbeddedTool = dynamic(() => import('./EmbeddedTool'), {
  ssr: false,
  loading: () => (
    <div className="my-8 h-80 rounded-xl border border-blue-100 bg-blue-50/30 animate-pulse" aria-hidden />
  ),
});

export default function EmbeddedToolLazy() {
  return <EmbeddedTool />;
}
