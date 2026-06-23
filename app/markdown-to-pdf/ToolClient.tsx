'use client';

import dynamic from 'next/dynamic';

const ToolClientDynamic = dynamic(() => import('@/components/tools/ToolClient'), { ssr: false });

export default ToolClientDynamic;
