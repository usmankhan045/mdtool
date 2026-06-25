import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  tags: string[];
  readingTime: string;
  content: string;
  image: string;
  imageAlt: string;
  author: string;
  faqs: { q: string; a: string }[];
  ctaTool?: { href: string; label: string; description: string };
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Extracts "**Q: ...?**\n\n<answer>" pairs from a post's "Frequently Asked
// Questions" section so they can be exposed as FAQPage schema without
// duplicating the Q&A content in frontmatter.
function extractFaqs(content: string): { q: string; a: string }[] {
  const faqSection = content.split(/^##\s+Frequently Asked Questions/im)[1];
  if (!faqSection) return [];

  const stripMarkdown = (text: string) =>
    text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[`*_]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const matches = [...faqSection.matchAll(/\*\*Q:\s*(.+?)\*\*\s*\n+([\s\S]*?)(?=\n\*\*Q:|$)/g)];

  return matches
    .map(([, q, a]) => ({ q: stripMarkdown(q), a: stripMarkdown(a) }))
    .filter((faq) => faq.q && faq.a);
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      const wordCount = content.split(/\s+/).length;
      const readingTime = `${Math.ceil(wordCount / 200)} min read`;

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        datePublished: data.datePublished || new Date().toISOString().split('T')[0],
        dateModified: data.dateModified,
        tags: data.tags || [],
        readingTime,
        content,
        image: data.image || `/blog/${slug}.jpg`,
        imageAlt: data.imageAlt || data.title || slug,
        author: data.author || 'MDTool Editorial Team',
        faqs: extractFaqs(content),
        ctaTool: data.ctaTool,
      };
    })
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const wordCount = content.split(/\s+/).length;

  return {
    slug,
    title: data.title,
    description: data.description || '',
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    tags: data.tags || [],
    readingTime: `${Math.ceil(wordCount / 200)} min read`,
    content,
    image: data.image || `/blog/${slug}.jpg`,
    imageAlt: data.imageAlt || data.title || slug,
    author: data.author || 'MDTool Editorial Team',
    faqs: extractFaqs(content),
    ctaTool: data.ctaTool,
  };
}
