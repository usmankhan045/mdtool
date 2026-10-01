import fs from 'fs';
import path from 'path';
import { GUIDE_TOPICS } from '@/lib/cheatsheet';
import { getAllBlogPosts } from '@/lib/blog';

// Rendered once at build time: llms.txt + the cheat sheet + every guide as plain text.
export const dynamic = 'force-static';

const BASE_URL = 'https://www.mdtool.dev';
const RULE = '\n\n' + '='.repeat(72) + '\n\n';

// MDX bodies are Markdown plus a few React components (<EmbeddedTool />, <Callout>).
// Drop the component tags but keep any text they wrap.
function mdxToMarkdown(body: string): string {
  return body
    .split(/(^```[\s\S]*?^```)/m) // odd indices are fenced code blocks: leave them untouched
    .map((chunk, i) =>
      i % 2 === 1
        ? chunk
        : chunk
            .replace(/^\s*(import|export)\s.*$/gm, '')
            .replace(/<[A-Z][A-Za-z0-9]*\b[^>]*\/>/g, '')
            .replace(/<\/?[A-Z][A-Za-z0-9]*\b[^>]*>/g, ''),
    )
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function renderCheatSheet(): string {
  const parts = [`# Markdown Cheat Sheet\n\nURL: ${BASE_URL}/markdown-cheat-sheet`];
  for (const topic of GUIDE_TOPICS) {
    const lines: string[] = [];
    lines.push(`## ${topic.title}`);
    lines.push(`URL: ${BASE_URL}/markdown-cheat-sheet/${topic.slug}`);
    lines.push('');
    lines.push(topic.answer);
    for (const section of topic.sections) {
      lines.push('');
      lines.push(`### ${section.heading}`);
      lines.push('');
      lines.push(section.body);
      if (section.code) {
        lines.push('');
        lines.push('```markdown');
        lines.push(section.code);
        lines.push('```');
      }
      if (section.note) {
        lines.push('');
        lines.push(`Note: ${section.note}`);
      }
    }
    if (topic.faqs.length > 0) {
      lines.push('');
      lines.push('### FAQ');
      for (const { q, a } of topic.faqs) {
        lines.push('');
        lines.push(`Q: ${q}`);
        lines.push(`A: ${a}`);
      }
    }
    lines.push('');
    lines.push(`Related tool: ${topic.relatedTool.label} (${BASE_URL}${topic.relatedTool.href})`);
    parts.push(lines.join('\n'));
  }
  return parts.join('\n\n');
}

function renderGuides(): string {
  const posts = getAllBlogPosts();
  const parts = ['# Guides'];
  for (const post of posts) {
    parts.push(
      [
        `## ${post.title}`,
        `URL: ${BASE_URL}/blog/${post.slug}`,
        `Author: ${post.author}`,
        `Published: ${post.datePublished}${post.dateModified ? ` · Updated: ${post.dateModified}` : ''}`,
        '',
        mdxToMarkdown(post.content),
      ].join('\n'),
    );
  }
  return parts.join(RULE);
}

export function GET() {
  const llmsTxtPath = path.join(process.cwd(), 'public', 'llms.txt');
  const llmsTxt = fs.existsSync(llmsTxtPath) ? fs.readFileSync(llmsTxtPath, 'utf-8').trim() : '# MDTool';

  const body = [llmsTxt, renderCheatSheet(), renderGuides()].join(RULE) + '\n';

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
