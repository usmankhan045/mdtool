import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog';

interface Props {
  post: BlogPost;
}

export default function BlogCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl border border-zinc-200 overflow-hidden hover:border-zinc-300 hover:shadow-md transition-all"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-zinc-100 text-zinc-900 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-zinc-900 transition-colors leading-snug">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-1">
          {post.description.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? post.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-zinc-400">
          <time dateTime={post.datePublished}>{post.datePublished}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
