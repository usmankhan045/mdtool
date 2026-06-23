'use client';

import dynamic from 'next/dynamic';

const ToolClientDynamic = dynamic(() => import('@/components/tools/WordToMarkdownClient'), { ssr: false });

export default ToolClientDynamic;
