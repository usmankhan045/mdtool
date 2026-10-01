import { MetadataRoute } from 'next';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getAllBlogPosts } from '@/lib/blog';
import { GUIDE_TOPICS } from '@/lib/cheatsheet';

const BASE_URL = 'https://www.mdtool.dev';
const ROOT = process.cwd();

// Used when git history is unavailable for a file (uncommitted file, no .git
// in the build environment, or a shallow clone that doesn't reach the file's
// last real change). Never new Date(): that would stamp a false "just changed"
// signal on every build.
const FALLBACK_LAST_MODIFIED = new Date('2026-10-01T00:00:00Z');

// In a shallow clone, `git log -1 -- <file>` reports the shallow boundary
// commit for any file not touched since, which is a misleadingly recent date.
// Treat those boundary commits as "unknown" and use the fallback instead.
function readShallowBoundaries(): Set<string> {
  try {
    const shallowFile = path.join(ROOT, '.git', 'shallow');
    if (!fs.existsSync(shallowFile)) return new Set();
    return new Set(fs.readFileSync(shallowFile, 'utf-8').split('\n').map((l) => l.trim()).filter(Boolean));
  } catch {
    return new Set();
  }
}

const shallowBoundaries = readShallowBoundaries();
const lastModCache = new Map<string, Date>();

/** Date of the last commit touching any of `files` (paths relative to the repo root). */
function gitLastModified(...files: string[]): Date {
  const key = files.join('\0');
  const cached = lastModCache.get(key);
  if (cached) return cached;

  let result = FALLBACK_LAST_MODIFIED;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%H %cI', '--', ...files], {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
    }).trim();
    const [hash, iso] = out.split(' ');
    if (hash && iso && !shallowBoundaries.has(hash)) {
      const date = new Date(iso);
      if (!Number.isNaN(date.getTime())) result = date;
    }
  } catch {
    // git missing or not a repository: keep the fallback.
  }

  lastModCache.set(key, result);
  return result;
}

/** True when the route's page file exists, so the sitemap never lists a 404. */
function routeExists(routeDir: string): boolean {
  return fs.existsSync(path.join(ROOT, 'app', routeDir, 'page.tsx'));
}

// Static routes and the source files whose commits count as a content change.
const STATIC_ROUTES: { route: string; files: string[] }[] = [
  { route: '', files: ['app/page.tsx'] },
  { route: '/markdown-to-pdf', files: ['app/markdown-to-pdf/page.tsx'] },
  { route: '/markdown-to-html', files: ['app/markdown-to-html/page.tsx'] },
  { route: '/markdown-to-word', files: ['app/markdown-to-word/page.tsx'] },
  { route: '/html-to-markdown', files: ['app/html-to-markdown/page.tsx'] },
  { route: '/word-to-markdown', files: ['app/word-to-markdown/page.tsx'] },
  { route: '/markdown-table-generator', files: ['app/markdown-table-generator/page.tsx'] },
  { route: '/markdown-cheat-sheet', files: ['app/markdown-cheat-sheet/page.tsx', 'lib/cheatsheet.ts'] },
  { route: '/blog', files: ['app/blog/page.tsx', 'content/blog'] },
  { route: '/about', files: ['app/about/page.tsx'] },
  { route: '/privacy', files: ['app/privacy/page.tsx'] },
  { route: '/contact', files: ['app/contact/page.tsx'] },
];

// Routes still being built; each is listed only once its page.tsx exists.
const OPTIONAL_ROUTES = ['/markdown-to-text', '/es/markdown-to-word', '/es/word-to-markdown', '/es/markdown-to-pdf', '/zh/markdown-to-word'];

// Language versions of the same page. Each member lists all versions (itself
// included) as xhtml:link hreflang alternates, matching the pages' <head>.
const LANGUAGE_GROUPS: Record<string, string>[] = [
  { en: '/markdown-to-word', es: '/es/markdown-to-word', 'zh-Hans': '/zh/markdown-to-word' },
  { en: '/word-to-markdown', es: '/es/word-to-markdown' },
  { en: '/markdown-to-pdf', es: '/es/markdown-to-pdf' },
];

function alternatesFor(route: string): MetadataRoute.Sitemap[number]['alternates'] | undefined {
  const group = LANGUAGE_GROUPS.find((g) => Object.values(g).includes(route));
  if (!group) return undefined;
  const languages: Record<string, string> = {};
  for (const [lang, r] of Object.entries(group)) {
    if (r === route || routeExists(r.slice(1))) languages[lang] = `${BASE_URL}${r}`;
  }
  if (Object.keys(languages).length < 2) return undefined;
  languages['x-default'] = `${BASE_URL}${group.en}`;
  return { languages };
}

const abs = (u: string) => (u.startsWith('http') ? u : `${BASE_URL}${u}`);

// Next.js writes <image:loc> values into the XML verbatim, so an "&" in a query
// string (e.g. Unsplash ?fm=jpg&q=80) would make the whole sitemap malformed.
const xmlSafe = (u: string) => u.replace(/&(?!amp;)/g, '&amp;');

// Images that are actually rendered (<img>) on each static page. Google's image
// sitemap only counts images visible on the page, so schema-only screenshots and
// OG images are deliberately left out.
const PAGE_IMAGES: Record<string, string[]> = {
  '/about': ['/authors/muhammad-usman.jpg'],
  '/markdown-to-pdf': ['/screenshots/pdf-themes.png', '/screenshots/pdf-output-mermaid.png'],
};

function imagesFor(route: string): string[] | undefined {
  const list = PAGE_IMAGES[route] ?? [];
  const unique = [...new Set(list.map(abs))].filter((u) => !u.startsWith(BASE_URL) || fs.existsSync(path.join(ROOT, 'public', u.slice(BASE_URL.length))));
  return unique.length ? unique.map(xmlSafe) : undefined;
}

// Downloadable files worth indexing on their own (Google indexes PDFs).
const DOWNLOADS = ['/downloads/markdown-cheat-sheet.pdf'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    ...STATIC_ROUTES,
    ...OPTIONAL_ROUTES.filter((route) => routeExists(route.slice(1))).map((route) => ({
      route,
      files: [`app${route}`],
    })),
  ]
    .filter(({ route }) => route === '' || routeExists(route.slice(1)))
    .map(({ route, files }) => {
      const alternates = alternatesFor(route);
      const images = imagesFor(route);
      return {
        url: `${BASE_URL}${route}`,
        lastModified: gitLastModified(...files),
        ...(alternates ? { alternates } : {}),
        ...(images ? { images } : {}),
      };
    });

  const cheatSheetLastModified = gitLastModified('lib/cheatsheet.ts');
  const guidePages: MetadataRoute.Sitemap = GUIDE_TOPICS.map((topic) => ({
    url: `${BASE_URL}/markdown-cheat-sheet/${topic.slug}`,
    lastModified: cheatSheetLastModified,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.datePublished),
    ...(post.image ? { images: [xmlSafe(abs(post.image))] } : {}),
  }));

  const downloadPages: MetadataRoute.Sitemap = DOWNLOADS.filter((file) =>
    fs.existsSync(path.join(ROOT, 'public', file))
  ).map((file) => ({
    url: `${BASE_URL}${file}`,
    lastModified: gitLastModified(`public${file}`),
  }));

  return [...staticPages, ...guidePages, ...blogPages, ...downloadPages];
}
