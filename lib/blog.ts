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
  /** BCP 47 language of the post body (frontmatter `lang`, default 'en'). */
  lang: string;
}

/** Native names for non-English post languages, used on the /blog index. */
export const LANGUAGE_NAMES: Record<string, string> = {
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
  ru: 'Русский',
  'zh-Hans': '中文',
};

/** Open Graph locale for each post language. */
export const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
  pt: 'pt_BR',
  ru: 'ru_RU',
  'zh-Hans': 'zh_CN',
};

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Extracts "**Q: ...?**\n\n<answer>" pairs from a post's FAQ section so they
// can be exposed as FAQPage schema without duplicating the Q&A content in
// frontmatter. Localized posts use their own heading and question marker
// (e.g. "## Häufig gestellte Fragen" + "**F: ...**", "## 常见问题" + "**问：...**").
const FAQ_HEADING =
  /^##\s+(?:Frequently Asked Questions|Häufig gestellte Fragen|Perguntas frequentes|Questions fréquentes|Preguntas frecuentes|Часто задаваемые вопросы|常见问题)/im;
const FAQ_MARKER = '(?:Q|F|P|В|问)\\s*[:：]';

function extractFaqs(content: string): { q: string; a: string }[] {
  const faqSection = content.split(FAQ_HEADING)[1];
  if (!faqSection) return [];

  const stripMarkdown = (text: string) =>
    text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[`*_]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const faqPattern = new RegExp(`\\*\\*${FAQ_MARKER}\\s*(.+?)\\*\\*\\s*\\n+([\\s\\S]*?)(?=\\n\\*\\*${FAQ_MARKER}|$)`, 'g');
  const matches = [...faqSection.matchAll(faqPattern)];

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
        author: data.author || 'Muhammad Usman',
        faqs: extractFaqs(content),
        ctaTool: data.ctaTool,
        lang: data.lang || 'en',
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
    author: data.author || 'Muhammad Usman',
    faqs: extractFaqs(content),
    ctaTool: data.ctaTool,
    lang: data.lang || 'en',
  };
}

// ---------------------------------------------------------------------------
// Blog sections (used by the /blog index) and related-post selection.
// ---------------------------------------------------------------------------

export interface BlogSection {
  id: string;
  title: string;
  /** One-sentence intro shown under the H2; `toolLabel` is linked to `toolHref`. */
  intro: string;
  toolHref: string;
  toolLabel: string;
  slugKeywords: string[];
  tagKeywords: string[];
}

// Order matters: the first section whose slug keywords match wins, so the more
// specific reverse directions (HTML→Markdown, Word→Markdown) come before the
// generic HTML/Word buckets. "Markdown basics" is the catch-all.
export const BLOG_SECTIONS: BlogSection[] = [
  {
    id: 'markdown-basics',
    title: 'Markdown basics',
    intro: 'Creating, opening, and writing .md files, plus syntax references you can keep open while you work. For quick syntax lookups, see the',
    toolHref: '/markdown-cheat-sheet',
    toolLabel: 'Markdown cheat sheet',
    slugKeywords: ['cheat-sheet', 'how-to-create', 'how-to-open', 'in-vscode', 'md-file'],
    tagKeywords: [],
  },
  {
    id: 'html-to-markdown',
    title: 'HTML to Markdown',
    intro: 'Turning web pages, CMS exports, and messy WYSIWYG HTML into clean Markdown. Try it with the',
    toolHref: '/html-to-markdown',
    toolLabel: 'HTML to Markdown converter',
    slugKeywords: ['html-to-markdown'],
    tagKeywords: ['cms-migration'],
  },
  {
    id: 'word-to-markdown',
    title: 'Word to Markdown',
    intro: 'Moving .docx and Google Docs content into Markdown for GitHub, docs sites, and note apps. Try it with the',
    toolHref: '/word-to-markdown',
    toolLabel: 'Word to Markdown converter',
    slugKeywords: ['word-to-markdown', 'docx-to-markdown', 'docs-to-markdown'],
    tagKeywords: ['obsidian'],
  },
  {
    id: 'pdf',
    title: 'Markdown to PDF',
    intro: 'Getting code blocks, tables, and diagrams to survive the trip from Markdown to PDF. Try it with the',
    toolHref: '/markdown-to-pdf',
    toolLabel: 'Markdown to PDF converter',
    slugKeywords: ['pdf'],
    tagKeywords: ['pdf'],
  },
  {
    id: 'word',
    title: 'Markdown to Word',
    intro: 'Producing real, editable .docx files (and Google Docs) from Markdown. Try it with the',
    toolHref: '/markdown-to-word',
    toolLabel: 'Markdown to Word converter',
    slugKeywords: ['to-word', 'to-docx', 'to-google-docs'],
    tagKeywords: ['docx', 'word', 'google-docs'],
  },
  {
    id: 'html',
    title: 'Markdown to HTML',
    intro: 'Converting Markdown to HTML for websites, email templates, and publishing platforms. Try it with the',
    toolHref: '/markdown-to-html',
    toolLabel: 'Markdown to HTML converter',
    slugKeywords: ['to-html', 'to-confluence'],
    tagKeywords: ['html', 'email', 'static-site-generators'],
  },
  {
    id: 'tables',
    title: 'Tables & Excel',
    intro: 'Building Markdown tables by hand or from spreadsheet data. Try it with the',
    toolHref: '/markdown-table-generator',
    toolLabel: 'Markdown table generator',
    slugKeywords: ['table', 'excel', 'csv'],
    tagKeywords: ['tables', 'excel', 'google-sheets', 'csv'],
  },
];

/** Display order of sections on the /blog index. */
export const BLOG_SECTION_ORDER = ['pdf', 'word', 'html', 'html-to-markdown', 'word-to-markdown', 'tables', 'markdown-basics'];

const FALLBACK_SECTION_ID = 'markdown-basics';

export function getPostSectionId(post: Pick<BlogPost, 'slug' | 'tags'>): string {
  const bySlug = BLOG_SECTIONS.find((s) => s.slugKeywords.some((k) => post.slug.includes(k)));
  if (bySlug) return bySlug.id;
  const tags = post.tags.map((t) => t.toLowerCase());
  const byTag = BLOG_SECTIONS.find((s) => s.tagKeywords.some((k) => tags.includes(k)));
  return byTag ? byTag.id : FALLBACK_SECTION_ID;
}

export function getBlogSections(posts: BlogPost[] = getAllBlogPosts()): { section: BlogSection; posts: BlogPost[] }[] {
  // Topic sections list English posts; localized posts get their own block.
  posts = posts.filter((p) => p.lang === 'en');
  return BLOG_SECTION_ORDER.map((id) => BLOG_SECTIONS.find((s) => s.id === id)!)
    .map((section) => ({ section, posts: posts.filter((p) => getPostSectionId(p) === section.id) }))
    .filter((group) => group.posts.length > 0);
}

// Tags that nearly every post carries; they say nothing about topical overlap.
const GENERIC_TAGS = new Set(['markdown', 'developer-tools', 'guide']);

/**
 * Picks `count` related posts for `slug`.
 *
 * Slot 1 is always the post's successor in a fixed cyclic order (grouped by
 * section), which guarantees every post receives at least one inbound link
 * from a sibling. The remaining slots go to the highest tag-overlap posts
 * (same section breaks ties), falling back to the newest posts.
 */
/** Non-English posts grouped by language, in LANGUAGE_NAMES order. */
export function getLocalizedPostGroups(posts: BlogPost[] = getAllBlogPosts()): { lang: string; name: string; posts: BlogPost[] }[] {
  return Object.entries(LANGUAGE_NAMES)
    .map(([lang, name]) => ({ lang, name, posts: posts.filter((p) => p.lang === lang) }))
    .filter((g) => g.posts.length > 0);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const everything = getAllBlogPosts(); // newest first
  const current = everything.find((p) => p.slug === slug);
  if (!current) return [];
  // Recommend posts in the reader's language; localized posts top up with
  // English guides, English posts never recommend other languages.
  const all = everything.filter((p) => p.lang === current.lang);
  if (current.lang !== 'en') {
    const pool = [...all, ...everything.filter((p) => p.lang === 'en')].filter((p) => p.slug !== slug);
    const ranked = pool.sort((a, b) => {
      const aSame = a.lang === current.lang ? 1 : 0;
      const bSame = b.lang === current.lang ? 1 : 0;
      const aSec = getPostSectionId(a) === getPostSectionId(current) ? 1 : 0;
      const bSec = getPostSectionId(b) === getPostSectionId(current) ? 1 : 0;
      return bSame - aSame || bSec - aSec;
    });
    return ranked.slice(0, count);
  }
  if (all.length < 2) return [];

  const cycle = BLOG_SECTION_ORDER.flatMap((id) =>
    all.filter((p) => getPostSectionId(p) === id).sort((a, b) => a.slug.localeCompare(b.slug)),
  );
  const idx = cycle.findIndex((p) => p.slug === slug);
  const successor = cycle[(idx + 1) % cycle.length];

  const currentTags = new Set(current.tags.map((t) => t.toLowerCase()).filter((t) => !GENERIC_TAGS.has(t)));
  const currentSection = getPostSectionId(current);

  const scored = all
    .filter((p) => p.slug !== slug && p.slug !== successor.slug)
    .map((p, newestRank) => {
      const overlap = p.tags.map((t) => t.toLowerCase()).filter((t) => currentTags.has(t)).length;
      const sameSection = getPostSectionId(p) === currentSection ? 1 : 0;
      return { p, score: overlap * 2 + sameSection, newestRank };
    })
    .sort((a, b) => b.score - a.score || a.newestRank - b.newestRank)
    .map(({ p }) => p);

  return [successor, ...scored].slice(0, count);
}
