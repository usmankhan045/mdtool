'use client';

import { useCallback, useDeferredValue, useState } from 'react';
import HtmlEditor from './HtmlEditor';
import MarkdownOutputPanel from './MarkdownOutputPanel';
import { convertHtmlToMarkdown } from '@/lib/htmlToMarkdown';
import { WORKSPACE, SPLIT } from './ui';

const SAMPLE_HTML = `<h1>Welcome to MDTool</h1>
<h2>Table Example</h2>
<table>
  <tr><th>Feature</th><th>Supported</th></tr>
  <tr><td>Tables</td><td>Yes</td></tr>
  <tr><td>Code blocks</td><td>Yes</td></tr>
</table>
<p>Start typing or paste your own HTML on the left, or <strong>drag and drop</strong> a .html file.</p>
<pre><code class="language-javascript">const hello = () => console.log('Hello world');</code></pre>
<blockquote>Quoted text converts to a Markdown blockquote.</blockquote>
`;

export default function HtmlToMarkdownClient() {
  const [html, setHtml] = useState(SAMPLE_HTML);

  const deferredHtml = useDeferredValue(html);
  const markdown = convertHtmlToMarkdown(deferredHtml);

  const handleHtmlChange = useCallback((val: string) => {
    setHtml(val);
  }, []);

  return (
    <div className={WORKSPACE}>
      <div className={SPLIT}>
        <HtmlEditor value={html} onChange={handleHtmlChange} charCount={html.length} />
        <MarkdownOutputPanel markdown={markdown} filename="document.md" charCount={markdown.length} />
      </div>
    </div>
  );
}
