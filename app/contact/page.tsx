import type { Metadata } from 'next';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the MDTool team — bug reports, feature requests, and general questions.',
  alternates: {
    canonical: 'https://www.mdtool.dev/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-200 px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Contact</h1>
            <p className="text-lg text-gray-600">Bug reports, feature requests, or general questions.</p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-10 prose prose-gray">
          <p>
            The fastest way to reach the MDTool team is by email:{' '}
            <a href="mailto:hello@mdtool.dev">hello@mdtool.dev</a>
          </p>
          <p>When reporting a bug, it helps to include:</p>
          <ul>
            <li>Which tool you were using (e.g. Markdown to PDF)</li>
            <li>Your browser and operating system</li>
            <li>A small sample of the Markdown/HTML/Word content that caused the problem, if you&apos;re able to share it</li>
          </ul>
          <p>
            See also the <a href="/about">About</a> page for how MDTool works, and the{' '}
            <a href="/privacy">Privacy Policy</a> for how data is handled.
          </p>
        </section>
      </main>
    </>
  );
}
