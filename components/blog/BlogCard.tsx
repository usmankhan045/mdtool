import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface Props {
  post: BlogPost;
}

export default function BlogCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
    >
      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
        {post.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
        {post.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <time dateTime={post.datePublished}>{post.datePublished}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
    </Link>
  );
}
