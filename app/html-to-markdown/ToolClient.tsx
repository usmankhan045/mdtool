'use client';

import dynamic from 'next/dynamic';

const ToolClientDynamic = dynamic(() => import('@/components/tools/HtmlToMarkdownClient'), { ssr: false });

export default ToolClientDynamic;
