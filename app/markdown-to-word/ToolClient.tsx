'use client';

import dynamic from 'next/dynamic';

const ToolClientDynamic = dynamic(() => import('@/components/tools/MarkdownToWordClient'), { ssr: false });

export default ToolClientDynamic;
