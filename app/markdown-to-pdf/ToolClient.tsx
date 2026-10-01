'use client';

import dynamic from 'next/dynamic';
import ToolLoadingShell from '@/components/tools/ToolLoadingShell';

// ssr:false keeps the heavy conversion libs out of the server build. The loading
// fallback IS server-rendered: a static shell with the tool name, a sample input
// and a rendered sample output, laid out with the converter's exact classes so
// crawlers see real content and hydration causes no layout shift (CLS 0).
const ToolClientDynamic = dynamic(() => import('@/components/tools/ToolClient'), {
  ssr: false,
  loading: () => <ToolLoadingShell variant="md-to-pdf" />,
});

export default ToolClientDynamic;
