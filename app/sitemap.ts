import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';

// Bump this manually whenever a tool page's content actually changes —
// do NOT use new Date() here, it stamps a false "just changed" signal on
// every build instead of reflecting real edits.
const TOOL_PAGES_LAST_UPDATED = new Date('2026-06-24');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mdtool.dev';
  const posts = getAllBlogPosts();

  const toolPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/markdown-to-pdf`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/markdown-to-html`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/markdown-to-word`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/html-to-markdown`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/word-to-markdown`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/contact`, lastModified: TOOL_PAGES_LAST_UPDATED, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...toolPages, ...blogPages];
}
