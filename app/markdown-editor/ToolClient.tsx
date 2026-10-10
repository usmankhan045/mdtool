'use client';

import dynamic from 'next/dynamic';
import ToolLoadingShell from '@/components/tools/ToolLoadingShell';

const MarkdownEditorClient = dynamic(() => import('@/components/tools/MarkdownToHtmlClient'), {
  ssr: false,
  loading: () => <ToolLoadingShell variant="md-to-html" />,
});

export default MarkdownEditorClient;
