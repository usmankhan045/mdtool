import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter — Free & No Login',
  description: 'Convert Markdown to clean HTML instantly in your browser. Supports GFM, syntax-highlighted code, tables, and images. Copy or download the HTML. Free, no signup.',
  keywords: ['markdown to html', 'md to html', 'convert markdown to html', 'markdown html converter', 'markdown renderer'],
  openGraph: {
    title: 'Free Markdown to HTML Converter — MDTool',
    description: 'Convert Markdown to clean, ready-to-use HTML. Live preview, code highlighting, copy or download. 100% free, no login.',
    url: 'https://www.mdtool.dev/markdown-to-html',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/markdown-to-html',
  },
};

const FAQ_ITEMS = [
  {
    q: 'Can I convert GitHub Flavored Markdown (GFM) to HTML?',
    a: (
      <>
        Yes. MDTool fully supports{' '}
        <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          GitHub Flavored Markdown
        </a>{' '}
        including tables, task lists, strikethrough, fenced code blocks with syntax highlighting, and autolinks.
      </>
    ),
    text: 'Yes. MDTool fully supports GitHub Flavored Markdown including tables, task lists, strikethrough, fenced code blocks with syntax highlighting, and autolinks.',
  },
  {
    q: 'Does the output include syntax highlighting for code blocks?',
    a: (
      <>
        Yes. Code blocks are rendered with{' '}
        <a href="https://highlightjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          highlight.js
        </a>{' '}
        CSS classes baked in. Include a highlight.js stylesheet on your page (or use the &quot;Full document&quot; download, which links one automatically) to see colors.
      </>
    ),
    text: 'Yes. Code blocks are rendered with highlight.js CSS classes baked in. Include a highlight.js stylesheet on your page to see colors.',
  },
  {
    q: 'Is my Markdown sent to a server?',
    a: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
    text: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
  },
  {
    q: 'What is the difference between "Full document" and snippet output?',
    a: 'Full document wraps the converted HTML in a complete <html>/<head>/<body> structure with basic styling — ready to save as a standalone .html file. Turning it off gives you just the HTML fragment, ideal for pasting into an existing page, CMS, or email template.',
    text: 'Full document wraps the converted HTML in a complete html/head/body structure with basic styling. Turning it off gives you just the HTML fragment, ideal for pasting into an existing page or CMS.',
  },
  {
    q: 'Can I copy the HTML instead of downloading it?',
    a: 'Yes. Click "Copy" in the output panel to copy the current HTML (snippet or full document) straight to your clipboard.',
    text: 'Yes. Click Copy in the output panel to copy the current HTML straight to your clipboard.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
    text: 'No file size limit. Since all processing runs locally in your browser, conversion speed depends on your device rather than any server restriction.',
  },
  {
    q: 'Can I use the HTML output in an email template?',
    a: 'Yes — use the snippet output (Full document turned off) and paste it into your email tool’s HTML/code view. Most email clients strip <head> tags anyway, so the snippet is the right format here, not the full document.',
    text: 'Yes - use the snippet output (Full document turned off) and paste it into your email tool’s HTML/code view. Most email clients strip head tags anyway, so the snippet is the right format here.',
  },
  {
    q: 'Does converting a Mermaid code block render it as a diagram?',
    a: (
      <>
        No. A <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">```mermaid</code> block is
        preserved as a labeled code block showing the raw syntax, not rendered into a visual
        diagram. For actual Mermaid diagram rendering, use the{' '}
        <a href="/markdown-to-pdf" className="text-blue-600 hover:underline">Markdown to PDF converter</a>{' '}
        instead.
      </>
    ),
    text: 'No. A mermaid code block is preserved as a labeled code block showing the raw syntax, not rendered into a visual diagram. For actual Mermaid diagram rendering, use the Markdown to PDF converter instead.',
  },
  {
    q: 'Are nested lists and blockquotes supported?',
    a: 'Yes. Nested bullet and numbered lists convert to properly nested <ul>/<ol> markup, and blockquotes (including blockquotes containing other Markdown elements) convert to <blockquote> with the inner formatting preserved.',
    text: 'Yes. Nested bullet and numbered lists convert to properly nested ul/ol markup, and blockquotes convert to blockquote with the inner formatting preserved.',
  },
  {
    q: 'Can I edit the HTML after MDTool generates it?',
    a: 'Yes. Switch to the Code tab, copy the HTML, and edit it anywhere you like — a text editor, your CMS’s code view, or a code editor. MDTool doesn’t lock the output or require you to come back to make changes.',
    text: 'Yes. Switch to the Code tab, copy the HTML, and edit it anywhere you like - a text editor, your CMS’s code view, or a code editor.',
  },
];

export default function MarkdownToHtmlPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Markdown to HTML Converter"
        url="/markdown-to-html"
        description="Convert Markdown to clean HTML instantly in your browser. Supports GitHub Flavored Markdown, code blocks with syntax highlighting, tables, and images."
        dateModified="2026-06-24"
        featureList={[
          'Markdown to HTML conversion',
          'GitHub Flavored Markdown support',
          'Code syntax highlighting',
          'Snippet or full-document HTML output',
          'Copy to clipboard',
          'Client-side processing — files never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown to HTML Converter', url: '/markdown-to-html' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero / Header */}
        <section className="bg-white border-b border-gray-200 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Free Markdown to HTML Converter
            </h1>
            <p className="text-xs text-gray-400 mb-3">Updated June 24, 2026</p>
            <p className="text-base text-gray-700 max-w-2xl mb-3 leading-relaxed">
              <strong>Markdown to HTML conversion</strong> is the process of transforming Markdown syntax —
              headings, lists, tables, bold/italic text, and fenced code blocks — into standard HTML markup
              that any browser renders natively. MDTool converts Markdown to HTML entirely in your browser:
              paste or drop a .md file and get clean, semantic HTML — a pasteable snippet or a full
              standalone document — free, with no signup and no file size limit.
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mb-4">
              Live preview, code highlighting, and one-click copy or download.
            </p>
            <ConversionDiagram from="Markdown" to="HTML" />
          </div>
        </section>

        {/* Main Tool — Client Component */}
        <section className="max-w-6xl mx-auto px-4 py-6">
          <ToolClient />
        </section>

        {/* Ad Slot — Between tool and FAQ */}
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        {/* SEO Content */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Convert Markdown to HTML Free</h2>
          <p className="text-gray-700 leading-relaxed mb-3 max-w-3xl">
            Converting Markdown to HTML with MDTool takes four steps and no account — paste your
            content, watch the live preview, choose your output format, then copy or download.
            The whole process runs in your browser, so it works the same whether you&apos;re
            converting one file or fifty.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Paste your Markdown text into the left panel, or click <strong>Upload .md</strong> to
              load a file directly from your computer — there&apos;s no size limit, so a full
              README or a multi-page doc converts just as easily as a short snippet</li>
            <li>Watch the live HTML preview update in real time on the right as you type. Headings,
              lists, tables, and fenced code blocks render exactly as they will in the final
              output, so you can catch formatting issues before exporting anything</li>
            <li>Switch to the <strong>Code</strong> tab to view the raw HTML markup, then toggle{' '}
              <strong>Full document</strong> on or off depending on where the HTML is going: on
              for a standalone <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">.html</code> file,
              off for a pasteable snippet you&apos;ll drop into an existing page or CMS</li>
            <li>Click <strong>Copy</strong> to grab the HTML straight to your clipboard, or{' '}
              <strong>Download .html</strong> to save it as a file — either way, the conversion
              is final, with no processing queue or wait time</li>
          </ol>
        </section>

        {/* Format-specific substance */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Snippet vs. Full Document: Which Should You Use?</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              MDTool gives you two different HTML outputs because they solve different problems. A{' '}
              <strong>snippet</strong> is the bare HTML fragment — just the headings, paragraphs, lists, and
              code blocks, with no <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;html&gt;</code>,{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;head&gt;</code>, or{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;body&gt;</code> wrapper. That&apos;s what
              you want when pasting into an existing page, a CMS editor, or an email template that already
              defines its own styles — wrapping the fragment in another document structure would just create
              nested tags the browser has to clean up.
            </p>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Aspect</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Snippet</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Full Document</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Wrapper</td>
                  <td className="px-3 py-2">None — bare HTML fragment</td>
                  <td className="px-3 py-2">Complete &lt;html&gt;/&lt;head&gt;/&lt;body&gt;</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Styling</td>
                  <td className="px-3 py-2">Inherits the host page&apos;s CSS</td>
                  <td className="px-3 py-2">Basic styles + highlight.js stylesheet included</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Best for</td>
                  <td className="px-3 py-2">CMS, existing page, email template</td>
                  <td className="px-3 py-2">Standalone .html file, hosting as-is</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Output action</td>
                  <td className="px-3 py-2">Copy to clipboard</td>
                  <td className="px-3 py-2">Download .html</td>
                </tr>
              </tbody>
            </table>
            <p>
              A <strong>full document</strong> wraps the same content in a complete, valid HTML file with a{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;!DOCTYPE html&gt;</code>, basic
              readable styling, and a stylesheet link so syntax-highlighted code actually shows color when you
              open the file directly. Use this when you want a standalone <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">.html</code> file
              you can host as-is, attach as a deliverable, or open straight in a browser without any other
              setup.
            </p>
            <p>
              Either way, the conversion follows{' '}
              <a href="https://commonmark.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CommonMark</a>{' '}
              and GitHub Flavored Markdown semantics: headings map to{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;h1&gt;</code>–<code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;h6&gt;</code>, fenced
              code blocks map to <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;pre&gt;&lt;code&gt;</code> with
              a language class, and tables map to real <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;table&gt;</code> markup
              rather than styled <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;div&gt;</code>s — so the
              output stays usable by screen readers and other tools that expect semantic HTML.
            </p>
            <p>
              That semantic mapping matters most for accessibility. A screen reader announces{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;table&gt;</code> markup with row and column
              context, and lets a user jump between headings by level — neither is possible if a converter
              outputs visually similar but semantically empty <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;div&gt;</code> grids
              and bold paragraphs instead. Because MDTool emits real heading tags and real table elements, the
              HTML you export is just as navigable with assistive technology as it is readable visually —
              whether you paste the snippet into a CMS or host the full document as-is.
            </p>
          </div>
        </section>

        {/* What's Preserved + Free/Privacy substance */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">What MDTool Preserves in HTML Output</h3>
          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              <strong>GFM tables</strong> convert to real <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;table&gt;</code> markup
              with <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;thead&gt;</code> and{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;tbody&gt;</code>, not styled divs.{' '}
              <strong>Fenced code blocks</strong> get syntax highlighting via{' '}
              <a href="https://highlightjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">highlight.js</a>,
              with JavaScript, TypeScript, Python, Bash, CSS, HTML, JSON, YAML, SQL, Rust, Go, and Dart
              recognized by name (other languages fall back to automatic detection).{' '}
              <strong>Images</strong> carry over as standard <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;img&gt;</code> tags
              with whatever path you wrote in the Markdown — relative or absolute — unchanged.
            </p>
            <p>
              <strong>Mermaid code blocks</strong> (<code className="text-sm bg-gray-100 px-1 py-0.5 rounded">```mermaid</code>) are
              preserved as a labeled code block showing the raw diagram syntax — they are not
              rendered into a visual diagram in this converter. If you need the actual diagram
              rendered into the output, use the{' '}
              <a href="/markdown-to-pdf" className="text-blue-600 hover:underline">Markdown to PDF converter</a>,
              which renders Mermaid blocks before export.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Is This Converter Free?</h3>
          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              Yes — MDTool is free with no account, no premium tier, and no usage cap. There&apos;s
              no paywall hiding the Full document export, no watermark on the HTML you download,
              and no limit on how many times you can convert. That&apos;s possible because nothing
              you paste is ever uploaded: the conversion runs entirely in your browser&apos;s
              JavaScript engine, using the same{' '}
              <a href="https://marked.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">marked</a>{' '}
              parser whether you convert one line or a 10,000-word document, so there&apos;s no
              server-side cost that would require a subscription to cover.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <FaqSection items={FAQ_ITEMS} />
        </section>

        {/* Related Tools */}
        <section className="bg-white border-t border-gray-100 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">You might also need:</h2>
            <div className="flex flex-wrap gap-3">
              <a href="/markdown-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to PDF →
              </a>
              <a href="/markdown-to-word" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to Word →
              </a>
              <a href="/html-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                HTML to Markdown →
              </a>
              <a href="/blog/markdown-cheatsheet" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown Syntax Cheatsheet →
              </a>
              <a href="/blog/markdown-to-html-guide" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Complete Conversion Guide →
              </a>
              <a href="/blog/markdown-to-html-email" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to HTML for Email →
              </a>
              <a href="/blog/markdown-to-html-static-site" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to HTML for Static Sites →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
