'use client';

import dynamic from 'next/dynamic';

const ToolClientDynamic = dynamic(() => import('@/components/tools/MarkdownToHtmlClient'), { ssr: false });

export default ToolClientDynamic;
