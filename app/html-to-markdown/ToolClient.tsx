'use client';

import dynamic from 'next/dynamic';

// ssr:false keeps the heavy conversion libs out of the server build; the fixed-height
// skeleton reserves the converter's space so hydration causes no layout shift (CLS).
const ToolClientDynamic = dynamic(() => import('@/components/tools/HtmlToMarkdownClient'), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse" aria-hidden />
  ),
});

export default ToolClientDynamic;
