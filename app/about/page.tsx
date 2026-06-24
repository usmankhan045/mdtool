import type { Metadata } from 'next';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'About MDTool',
  description: 'What MDTool is, how the conversions actually work, and the open-source libraries it runs on. No account, no file uploads, no tracking of your content.',
  alternates: {
    canonical: 'https://www.mdtool.dev/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-200 px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">About MDTool</h1>
            <p className="text-lg text-gray-600">
              Free, client-side conversion tools for Markdown, PDF, HTML, and Word.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-10 prose prose-gray">
          <h2>What MDTool is</h2>
          <p>
            MDTool is a small set of single-purpose conversion tools: Markdown to PDF, Markdown to HTML,
            Markdown to Word, HTML to Markdown, and Word to Markdown. There is no account system, no
            saved-document history, and no paywall — every tool is free to use without limits.
          </p>

          <h2>How conversion actually works</h2>
          <p>
            Every conversion runs entirely in your browser using JavaScript. When you paste text or upload
            a file, it is parsed and rendered locally on your device — it is never transmitted to an MDTool
            server. You can verify this yourself: open your browser&apos;s Network tab while converting and
            you&apos;ll see no outbound request carrying your document content.
          </p>
          <p>This is possible because each tool is built on well-established open-source libraries:</p>
          <ul>
            <li><strong>marked</strong> — Markdown parsing</li>
            <li><strong>highlight.js</strong> — syntax highlighting for code blocks</li>
            <li><strong>mermaid</strong> — diagram rendering</li>
            <li><strong>html2pdf.js</strong> — in-browser HTML-to-PDF generation</li>
            <li><strong>docx</strong> — generating Word (.docx) files</li>
            <li><strong>mammoth</strong> — reading Word (.docx) files</li>
            <li><strong>turndown</strong> — HTML-to-Markdown conversion</li>
          </ul>
          <p>
            None of these libraries require a server round-trip to do their job, which is why MDTool doesn&apos;t
            have one for the conversion step itself.
          </p>

          <h2>How MDTool is funded</h2>
          <p>
            MDTool is supported by non-intrusive display advertising rather than subscriptions or paid tiers.
            See the <a href="/privacy">Privacy Policy</a> for details on what that involves.
          </p>

          <h2>Questions or feedback</h2>
          <p>
            See the <a href="/contact">Contact</a> page to get in touch.
          </p>
        </section>
      </main>
    </>
  );
}
