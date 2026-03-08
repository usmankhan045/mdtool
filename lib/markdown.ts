import { marked, Renderer } from 'marked';
import hljs from 'highlight.js/lib/core';

// Register only the languages we need — keeps bundle size small
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml'; // covers html
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import sql from 'highlight.js/lib/languages/sql';
import rust from 'highlight.js/lib/languages/rust';
import go from 'highlight.js/lib/languages/go';
import dart from 'highlight.js/lib/languages/dart';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('go', go);
hljs.registerLanguage('dart', dart);

// Custom renderer: syntax-highlight code blocks via highlight.js
const renderer = new Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }): string {
  const resolvedLang = lang && hljs.getLanguage(lang) ? lang : undefined;
  const highlighted = resolvedLang
    ? hljs.highlight(text, { language: resolvedLang }).value
    : hljs.highlightAuto(text).value;
  // Always preserve the original lang as a CSS class (e.g. language-mermaid)
  // so renderMermaidBlocks() can find those blocks by class name.
  const langClass = lang ? ` language-${lang}` : '';
  return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>\n`;
};

marked.use({
  renderer,
  gfm: true,    // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
});

export function parseMarkdown(markdown: string): string {
  return marked(markdown) as string;
}

export function countWords(markdown: string): number {
  return markdown.trim().split(/\s+/).filter(Boolean).length;
}
