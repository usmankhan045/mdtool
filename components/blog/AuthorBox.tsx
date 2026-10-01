import Image from 'next/image';
import Link from 'next/link';
import { AUTHOR } from '@/components/seo/StructuredData';
import { formatDate } from './formatDate';

interface Props {
  datePublished: string;
  dateModified?: string;
}

export default function AuthorBox({ datePublished, dateModified }: Props) {
  const updated = dateModified || datePublished;

  return (
    <aside
      aria-label="About the author"
      className="mt-12 flex flex-col sm:flex-row gap-5 p-6 bg-white rounded-xl border border-zinc-200"
    >
      <Image
        src="/authors/muhammad-usman.jpg"
        alt="Muhammad Usman, creator of MDTool"
        width={80}
        height={80}
        className="w-20 h-20 rounded-full object-cover shrink-0"
      />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Written by</p>
        <p className="text-lg font-semibold text-zinc-900">
          <Link href="/about#author" className="hover:font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">
            {AUTHOR.name}
          </Link>
        </p>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          Muhammad Usman is a software developer who builds and maintains every converter on MDTool. He writes
          each guide himself, based on the tools&apos; documented behavior and hands-on testing.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <a href={AUTHOR.linkedin} target="_blank" rel="me noopener" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">
            LinkedIn
          </a>
          <a href={AUTHOR.github} target="_blank" rel="me noopener" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">
            GitHub
          </a>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Published <time dateTime={datePublished}>{formatDate(datePublished)}</time>
          {' · '}
          Updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </div>
    </aside>
  );
}
