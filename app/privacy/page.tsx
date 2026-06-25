import type { Metadata } from 'next';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MDTool handles your data: your documents never leave your browser, what cookies are used for advertising and analytics, and your choices.',
  alternates: {
    canonical: 'https://www.mdtool.dev/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-white border-b border-gray-200 px-4 py-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-500">Last updated: June 24, 2026</p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-10 prose prose-gray">
          <h2>Your documents</h2>
          <p>
            MDTool&apos;s conversion tools (Markdown to PDF, Markdown to HTML, Markdown to Word, HTML to
            Markdown, Word to Markdown) run entirely in your browser. The text or file you paste or upload
            is processed locally on your device using JavaScript and is never uploaded to, or stored on, an
            MDTool server. We have no record of, and no access to, the content you convert.
          </p>

          <h2>Information we do collect</h2>
          <p>MDTool does not require an account, so we don&apos;t collect names, emails, or passwords to use the tools. We do use:</p>
          <ul>
            <li>
              <strong>Analytics (Google Analytics):</strong> standard, aggregated usage data, such as pages visited,
              approximate location (country/city level), and device/browser type, to understand how the site is
              used. This does not include the content of anything you convert.
            </li>
            <li>
              <strong>Advertising (Google AdSense):</strong> MDTool is, or may in the future be, supported by
              display ads served through Google AdSense. Google and its partners may use cookies and similar
              technologies to serve and measure ads, which can include personalized advertising based on your
              browsing activity. You can opt out of personalized advertising via{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>{' '}
              or industry tools like the{' '}
              <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">DAA opt-out page</a>.
            </li>
          </ul>

          <h2>Cookies</h2>
          <p>
            Cookies on MDTool come from the analytics and advertising providers above, not from MDTool
            itself. You can block or delete cookies in your browser settings at any time; doing so does not
            affect the core conversion functionality, since it doesn&apos;t depend on cookies.
          </p>

          <h2>Third parties</h2>
          <p>
            MDTool does not sell or share the limited data described above with anyone other than the
            analytics and advertising providers (Google) needed to run those services.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If this policy changes, the &quot;Last updated&quot; date above will change accordingly. Material
            changes will be reflected directly on this page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent via the <a href="/contact">Contact</a> page.
          </p>
        </section>
      </main>
    </>
  );
}
