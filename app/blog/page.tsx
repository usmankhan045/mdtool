import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts, getBlogSections, getLocalizedPostGroups } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import StructuredData from '@/components/seo/StructuredData';

const TITLE = 'Markdown Conversion Guides & Tutorials';
const DESCRIPTION =
  'Step-by-step guides for converting Markdown to PDF, Word and HTML, and HTML or Word back to Markdown, written by the developer who builds MDTool.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.mdtool.dev/blog',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.mdtool.dev/blog',
    type: 'website',
    siteName: 'MDTool',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const groups = getBlogSections(posts);
  const localized = getLocalizedPostGroups(posts);

  return (
    <>
      <StructuredData
        type="blogindex"
        name={TITLE}
        url="/blog"
        description={DESCRIPTION}
        items={posts.map((p) => ({
          name: p.title,
          url: `/blog/${p.slug}`,
          datePublished: p.datePublished,
          dateModified: p.dateModified,
        }))}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-200 px-4 py-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{TITLE}</h1>
            <p className="text-lg text-gray-600">
              Practical, tested walkthroughs for each MDTool converter, grouped by what you&apos;re converting.
            </p>
            {groups.length > 1 && (
              <nav aria-label="Guide sections" className="mt-5 flex flex-wrap gap-2">
                {groups.map(({ section }) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm px-3 py-1 rounded-full border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                  >
                    {section.title}
                  </a>
                ))}
                {localized.length > 0 && (
                  <a
                    href="#other-languages"
                    className="text-sm px-3 py-1 rounded-full border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                  >
                    Other languages
                  </a>
                )}
              </nav>
            )}
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-16">No posts yet. Check back soon.</p>
          ) : (
            groups.map(({ section, posts: sectionPosts }) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="mb-14 scroll-mt-20">
                <h2 id={`${section.id}-heading`} className="text-2xl font-bold text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {section.intro}{' '}
                  <Link href={section.toolHref} className="text-blue-600 hover:underline">
                    {section.toolLabel}
                  </Link>
                  .
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sectionPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            ))
          )}

          {localized.length > 0 && (
            <section id="other-languages" aria-labelledby="other-languages-heading" className="mb-14 scroll-mt-20">
              <h2 id="other-languages-heading" className="text-2xl font-bold text-gray-900 mb-2">
                Guides in other languages
              </h2>
              <p className="text-gray-600 mb-6">
                Markdown conversion guides written in German, Portuguese, French, Chinese and more. The tools themselves
                work the same in any language; there are also Spanish versions of the{' '}
                <Link href="/es/markdown-to-word" className="text-blue-600 hover:underline">Word</Link>,{' '}
                <Link href="/es/markdown-to-pdf" className="text-blue-600 hover:underline">PDF</Link> and{' '}
                <Link href="/es/word-to-markdown" className="text-blue-600 hover:underline">Word to Markdown</Link> converters, and a{' '}
                <Link href="/zh/markdown-to-word" lang="zh-Hans" className="text-blue-600 hover:underline">中文版 Markdown 转 Word</Link> converter.
              </p>
              {localized.map(({ lang, name, posts: langPosts }) => (
                <div key={lang} lang={lang} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{name}</h3>
                  <ul className="space-y-2">
                    {langPosts.map((post) => (
                      <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline font-medium">
                          {post.title}
                        </Link>
                        <span className="text-gray-500 text-sm"> · {post.description.split('. ')[0]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>
    </>
  );
}
