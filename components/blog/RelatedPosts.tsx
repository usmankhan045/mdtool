import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

export default function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-guides" className="mt-12">
      <h2 id="related-guides" className="text-xl font-bold text-zinc-900 mb-4">
        Related guides
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block h-full p-4 bg-white rounded-lg border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all"
            >
              <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-900 leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
