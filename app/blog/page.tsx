import type { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Developer Blog',
  description: 'Guides and tutorials for working with Markdown, PDF conversion, and developer tools. Tips, workflows, and best practices.',
  alternates: {
    canonical: 'https://www.mdtool.dev/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Developer Guides &amp; Tutorials
          </h1>
          <p className="text-lg text-gray-600">
            Guides for working with Markdown, PDF conversion, and developer tools
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-16">No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
