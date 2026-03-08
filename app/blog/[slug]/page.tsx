import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import EmbeddedTool from '@/components/tools/EmbeddedTool';

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
    alternates: { canonical: `https://devmark.tools/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  };
}

const mdxComponents = {
  EmbeddedTool,
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: string }) => (
    <div className={`my-4 p-4 rounded-lg border-l-4 ${
      type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
      type === 'success' ? 'bg-green-50 border-green-400' :
      'bg-blue-50 border-blue-400'
    }`}>
      {children}
    </div>
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <StructuredData
        type="blog"
        name={post.title}
        url={`/blog/${slug}`}
        description={post.description}
        datePublished={post.datePublished}
        dateModified={post.dateModified}
      />

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <time dateTime={post.datePublished}>{post.datePublished}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600">{post.description}</p>
        </header>

        {/* Ad Slot — Top of article */}
        <AdSlot slotId="blog-top" format="horizontal" />

        {/* Article Content */}
        <article className="prose prose-gray max-w-none mt-8">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* Ad Slot — End of article */}
        <div className="mt-8">
          <AdSlot slotId="blog-bottom" format="horizontal" />
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">Try it yourself — free</h3>
          <p className="text-blue-800 text-sm mb-4">Convert your Markdown to a perfect PDF right now. No signup, no watermark.</p>
          <a href="/markdown-to-pdf" className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Open Markdown to PDF Converter →
          </a>
        </div>
      </main>
    </>
  );
}
