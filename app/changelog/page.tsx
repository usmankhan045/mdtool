import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Recent MDTool improvements, converter updates, performance work, and browser compatibility changes.',
  alternates: { canonical: 'https://www.mdtool.dev/changelog' },
};

const RELEASES = [
  {
    date: 'October 2, 2026',
    title: 'Faster converter interactions',
    details: 'Typing and download interactions were optimized on the converter pages. Preview rebuilding is debounced and PDF or Word generation gives the browser time to display progress feedback.',
  },
  {
    date: 'October 2, 2026',
    title: 'Improved mobile loading performance',
    details: 'The converter loading shells now match the hydrated editor more closely, and image/font loading was adjusted to reduce late Largest Contentful Paint on slower devices.',
  },
  {
    date: 'October 2, 2026',
    title: 'Safer links from AI answers',
    details: 'URLs containing typographic dash characters in converter paths are redirected to the correct plain-hyphen URL instead of returning a 404.',
  },
  {
    date: 'October 1, 2026',
    title: 'Open-source project updates',
    details: 'The repository now includes an MIT license, clearer setup documentation, refreshed tool screenshots, and a consistent interface across the seven tools.',
  },
];

export default function ChangelogPage() {
  return (
    <>
      <StructuredData
        type="techarticle"
        name="MDTool Changelog"
        url="/changelog"
        description={metadata.description as string}
        datePublished="2026-10-01"
        dateModified="2026-10-02"
      />
      <StructuredData type="breadcrumb" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Changelog', url: '/changelog' }]} />
      <main className="min-h-screen bg-page">
        <section className="hero-grid text-zinc-950">
          <div className="mx-auto max-w-3xl px-4 pb-12 pt-10">
            <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">MDTool Changelog</h1>
            <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
              Product updates, performance improvements, and converter changes from the team behind MDTool.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-10">
          <div className="space-y-8">
            {RELEASES.map((release) => (
              <article key={`${release.date}-${release.title}`} className="border-l-2 border-zinc-200 pl-5">
                <h2 className="mt-1 text-xl font-semibold text-zinc-900">{release.title}</h2>
                <p className="mt-2 leading-relaxed text-zinc-700">{release.details}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
            MDTool is open source. See the implementation history on{' '}
            <a href="https://github.com/usmankhan045/mdtool/commits/main" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
              GitHub
            </a>{' '}
            or <Link href="/about" className="font-medium underline underline-offset-4">learn about the project</Link>.
          </p>
        </section>
      </main>
    </>
  );
}
