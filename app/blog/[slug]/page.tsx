import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getBlogPost, getAllBlogPosts, getRelatedPosts, OG_LOCALES } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import StructuredData from '@/components/seo/StructuredData';
import AuthorBox from '@/components/blog/AuthorBox';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { formatDate } from '@/components/blog/formatDate';
import AdSlot from '@/components/ads/AdSlot';
import EmbeddedTool from '@/components/tools/EmbeddedToolLazy';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://www.mdtool.dev/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://www.mdtool.dev/blog/${slug}`,
      siteName: 'MDTool',
      locale: OG_LOCALES[post.lang] || 'en_US',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

const mdxComponents = {
  EmbeddedTool,
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: string }) => (
    <div className={`my-4 p-4 rounded-lg border-l-4 ${
      type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
      type === 'success' ? 'bg-green-50 border-green-400' :
      'bg-zinc-100 border-zinc-400'
    }`}>
      {children}
    </div>
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const updated = post.dateModified || post.datePublished;
  const related = getRelatedPosts(slug, 3);

  return (
    <>
      <StructuredData
        type="blog"
        name={post.title}
        url={`/blog/${slug}`}
        description={post.description}
        datePublished={post.datePublished}
        dateModified={post.dateModified}
        image={post.image}
        author={post.author}
        inLanguage={post.lang}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />
      {post.faqs.length > 0 && <StructuredData type="faq" url={`/blog/${slug}`} faqs={post.faqs} />}

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Post Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500 mb-3">
            <span>
              Updated <time dateTime={updated}>{formatDate(updated)}</time>
            </span>
            <span>·</span>
            <span>{post.readingTime}</span>
            <span>·</span>
            <span>
              By <a href="/about#author" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">{post.author}</a>
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{post.title}</h1>
          <p className="text-xl text-zinc-600">{post.description}</p>
        </header>

        {/* Hero Image */}
        <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        {/* Ad Slot - Top of article */}
        <AdSlot slotId="blog-top" format="horizontal" />

        {/* Article Content */}
        <article lang={post.lang} className="prose prose-zinc max-w-none mt-8">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        </article>

        <AuthorBox datePublished={post.datePublished} dateModified={post.dateModified} />

        {/* Ad Slot - End of article */}
        <div className="mt-8">
          <AdSlot slotId="blog-bottom" format="horizontal" />
        </div>

        {/* CTA */}
        {(() => {
          const cta = post.ctaTool ?? {
            href: '/markdown-to-pdf',
            label: 'Open Markdown to PDF Converter →',
            description: 'Convert your Markdown to a perfect PDF right now. No signup, no watermark.',
          };
          return (
            <div className="mt-10 p-6 bg-zinc-100 rounded-xl border border-zinc-100">
              <h3 className="font-semibold text-zinc-900 mb-2">Try it yourself, free</h3>
              <p className="text-zinc-700 text-sm mb-4">{cta.description}</p>
              <a href={cta.href} className="inline-block px-5 py-2.5 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors">
                {cta.label}
              </a>
            </div>
          );
        })()}

        <RelatedPosts posts={related} />
      </main>
    </>
  );
}
