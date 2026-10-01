import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Markdown to PDF Converter (MD to PDF), Free',
  description: 'Convert MD to PDF in your browser: 4 themes, A4 or Letter, rendered Mermaid diagrams, highlighted code and page breaks. Free, no signup, no watermark.',
  keywords: ['markdown to pdf', 'md to pdf', 'convert markdown to pdf', 'markdown pdf converter', 'github readme to pdf'],
  openGraph: {
    title: 'Free Markdown to PDF Converter (MD to PDF)',
    description: 'Convert Markdown to a vector PDF with highlighted code, Mermaid diagrams, tables and page breaks. Free, no login, nothing uploaded.',
    url: 'https://www.mdtool.dev/markdown-to-pdf',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/markdown-to-pdf',
    languages: {
      en: 'https://www.mdtool.dev/markdown-to-pdf',
      es: 'https://www.mdtool.dev/es/markdown-to-pdf',
      'x-default': 'https://www.mdtool.dev/markdown-to-pdf',
    },
  },
};

const FAQ_ITEMS = [
  {
    q: 'Can I convert GitHub Flavored Markdown (GFM) to PDF?',
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
    q: 'Does the converted PDF support syntax highlighting in code blocks?',
    a: (
      <>
        Yes. Code blocks are automatically syntax-highlighted using{' '}
        <a href="https://highlightjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          highlight.js
        </a>
        , which supports over 190 programming languages including JavaScript, Python, TypeScript, Rust, Go, and more.
      </>
    ),
    text: 'Yes. Code blocks are automatically syntax-highlighted using highlight.js, which supports over 190 programming languages including JavaScript, Python, TypeScript, Rust, Go, and more.',
  },
  {
    q: 'Is my Markdown file stored on your servers?',
    a: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device and is never sent to any server.',
    text: 'No. All conversion happens entirely in your browser using JavaScript. Your content never leaves your device and is never sent to any server.',
  },
  {
    q: 'Does it support Mermaid diagrams?',
    a: (
      <>
        Yes.{' '}
        <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Mermaid diagrams
        </a>{' '}
        in your Markdown (```mermaid blocks) are rendered and included in the PDF export.
      </>
    ),
    text: 'Yes. Mermaid diagrams in your Markdown (```mermaid blocks) are rendered and included in the PDF export.',
  },
  {
    q: 'Can I choose A4 or US Letter page size?',
    a: 'Yes. Pick A4 (the default) or US Letter from the Page menu next to the theme buttons before you download.',
    text: 'Yes. Pick A4 (the default) or US Letter from the Page menu next to the theme buttons before you download.',
  },
  {
    q: 'How do I add a page break in a Markdown PDF?',
    a: (
      <>
        Put <code>&lt;!-- pagebreak --&gt;</code> on its own line where the new page should start. MDTool also accepts{' '}
        <code>\pagebreak</code>, <code>\newpage</code>, <code>&lt;div class=&quot;page-break&quot;&gt;&lt;/div&gt;</code> and{' '}
        <code>&lt;div style=&quot;page-break-after: always;&quot;&gt;&lt;/div&gt;</code>. The preview shows a dashed line where each break falls. See the{' '}
        <a href="/markdown-cheat-sheet/page-breaks" className="text-blue-600 hover:underline">page break guide</a>.
      </>
    ),
    text: 'Put <!-- pagebreak --> on its own line where the new page should start. MDTool also accepts \\pagebreak, \\newpage, <div class=\"page-break\"></div> and <div style=\"page-break-after: always;\"></div>. The preview shows a dashed line where each break falls. See the page break guide.',
  },
  {
    q: 'Can I convert Markdown with Chinese or Japanese text to PDF?',
    a: 'Yes. When your document contains Chinese characters or Japanese kana, MDTool loads the Noto Sans SC font (about 6.5 MB, downloaded once and then cached) so the text, bold headings and tables render correctly and stay selectable. It covers all GB2312 characters plus common Traditional characters; very rare characters and Korean Hangul are not included yet. Documents without CJK text never download the font.',
    text: 'Yes. When your document contains Chinese characters or Japanese kana, MDTool loads the Noto Sans SC font (about 6.5 MB, downloaded once and then cached) so the text, bold headings and tables render correctly and stay selectable. It covers all GB2312 characters plus common Traditional characters; very rare characters and Korean Hangul are not included yet. Documents without CJK text never download the font.',
  },
  {
    q: 'Do emoji show up in the PDF?',
    a: 'No. The PDF uses an embedded font without emoji glyphs, so emoji are left out rather than printed as empty boxes. They still appear in the live preview. Use words or symbols such as [x] if the PDF needs them.',
    text: 'No. The PDF uses an embedded font without emoji glyphs, so emoji are left out rather than printed as empty boxes. They still appear in the live preview. Use words or symbols such as [x] if the PDF needs them.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'There is no upload limit because nothing is uploaded. Conversion runs locally in your browser, so very long documents are limited only by your device\'s memory and take a few seconds longer.',
    text: 'There is no upload limit because nothing is uploaded. Conversion runs locally in your browser, so very long documents are limited only by your device\'s memory and take a few seconds longer.',
  },
  {
    q: 'What PDF themes are available?',
    a: 'MDTool offers four themes: GitHub (developer-friendly), Academic (for papers and reports), Minimal (clean and modern), and Dark (dark background).',
    text: 'MDTool offers four themes: GitHub (developer-friendly), Academic (for papers and reports), Minimal (clean and modern), and Dark (dark background).',
  },
  {
    q: 'Can I convert a .md file with images?',
    a: 'Yes, for images referenced by a full URL. MDTool fetches each image in your browser and embeds it in the PDF, scaled to fit the page; SVG, GIF and WebP are converted to PNG. The image host must allow cross-origin requests (GitHub raw URLs do). Relative paths like ./img.png point to files on your disk that a web page cannot read, so replace them with full URLs. An image that cannot be fetched is replaced by a short [image: alt text] note instead of breaking the export.',
    text: 'Yes, for images referenced by a full URL. MDTool fetches each image in your browser and embeds it in the PDF, scaled to fit the page; SVG, GIF and WebP are converted to PNG. The image host must allow cross-origin requests (GitHub raw URLs do). Relative paths like ./img.png point to files on your disk that a web page cannot read, so replace them with full URLs. An image that cannot be fetched is replaced by a short [image: alt text] note instead of breaking the export.',
  },
  {
    q: 'How do I convert an entire GitHub README to PDF?',
    a: 'Copy the raw content of your README.md from GitHub (click "Raw" button), paste it into the editor on the left, choose a theme, and click Download PDF.',
    text: 'Copy the raw content of your README.md from GitHub (click "Raw" button), paste it into the editor on the left, choose a theme, and click Download PDF.',
  },
];

export default function MarkdownToPdfPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Markdown to PDF Converter"
        url="/markdown-to-pdf"
        description="Convert Markdown to PDF instantly in your browser. Supports GitHub Flavored Markdown, code blocks with syntax highlighting, tables, images, and Mermaid diagrams."
        datePublished="2026-06-23"
        dateModified="2026-10-01"
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown to PDF Converter', url: '/markdown-to-pdf' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero — title over the live converter */}
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Free Online Markdown to PDF Converter
            </h1>
            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mb-3 leading-relaxed">
              Paste or upload Markdown and download a paginated PDF, with code highlighting, tables, and
              Mermaid diagrams included. No login, no watermark.
            </p>
            <p className="text-xs text-blue-200/50">Updated October 1, 2026</p>
          </div>
        </section>

        {/* The tool — lifted into the hero band so it's the first thing you reach */}
        <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
          <ToolClient />
        </section>

        {/* About this converter */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <p className="text-base text-gray-700 leading-relaxed max-w-2xl flex-1">
              <strong>Markdown to PDF conversion</strong> renders Markdown, including headings, tables, syntax-highlighted
              code, and Mermaid diagrams, into a paginated PDF document ready to print, email, or archive.
              MDTool generates the PDF entirely in your browser as a vector document with selectable text,
              so your file is never uploaded. Choose one of four themes and A4 or US Letter. It is free, with no
              signup and no watermark.
            </p>
            <ConversionDiagram from="Markdown" to="PDF" />
          </div>
        </section>

        {/* Ad Slot — Between tool and FAQ */}
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        {/* SEO Content */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How Do You Convert Markdown to PDF?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Paste your Markdown text in the left panel, or click <strong>Upload .md</strong> to load a file</li>
            <li>Choose a PDF theme: GitHub, Academic, Minimal, or Dark</li>
            <li>See the live preview update in real-time on the right</li>
            <li>Click <strong>Download PDF, Free</strong> to save your file</li>
          </ol>
        </section>

        {/* What gets preserved — answer-first, quotable */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Gets Preserved in the PDF?</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              MDTool turns each Markdown element into a native part of the PDF rather than a screenshot of the
              page, so text stays selectable and searchable and the file stays small. This is what each element
              becomes, including the limits:
            </p>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Markdown element</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">In the PDF</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Headings, paragraphs, bold, italic, links</td>
                  <td className="px-3 py-2">✅ Real, selectable text</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Fenced code blocks</td>
                  <td className="px-3 py-2">✅ Syntax-highlighted per theme, monospace, shaded box</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Mermaid diagrams</td>
                  <td className="px-3 py-2">✅ Rendered as vector graphics (flowchart, sequence, class, state, pie, gantt)</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Tables (GFM)</td>
                  <td className="px-3 py-2">✅ Header fill and thin borders</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Strikethrough, blockquotes, lists</td>
                  <td className="px-3 py-2">✅ Kept</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Task lists</td>
                  <td className="px-3 py-2">⚠️ Shown as [x] and [ ] text, not drawn checkboxes</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Images by full URL</td>
                  <td className="px-3 py-2">✅ Embedded when the host allows cross-origin requests</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Images by relative path (./img.png)</td>
                  <td className="px-3 py-2">❌ A browser cannot read local files; use full URLs</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Page breaks</td>
                  <td className="px-3 py-2">✅ &lt;!-- pagebreak --&gt;, \pagebreak, \newpage and page-break divs</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Chinese and Japanese text</td>
                  <td className="px-3 py-2">✅ Rendered with Noto Sans SC, loaded only for documents that need it</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Emoji</td>
                  <td className="px-3 py-2">❌ Left out of the PDF (no emoji glyphs in the embedded font)</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Footnotes ([^1]), math</td>
                  <td className="px-3 py-2">❌ Not rendered; shown as plain text</td>
                </tr>
              </tbody>
            </table>
          </div>
          <figure className="mt-8 max-w-5xl">
            <Image
              src="/screenshots/pdf-themes.png"
              alt="Page one of the same Markdown document exported to PDF in the GitHub, Academic, Minimal and Dark themes"
              width={1880}
              height={694}
              className="w-full h-auto rounded-lg border border-gray-200"
            />
            <figcaption className="text-sm text-gray-500 mt-2">
              The same document exported in all four themes. In Academic and Minimal the diagram moves to page two
              together with its heading.
            </figcaption>
          </figure>
        </section>

        {/* Themes + page setup */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Which Theme and Page Size Should You Use?</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Theme</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">GitHub</td>
                  <td className="px-3 py-2">READMEs and developer documentation</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Academic</td>
                  <td className="px-3 py-2">Papers, reports and formal write-ups (centered title)</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-3 py-2 font-medium">Minimal</td>
                  <td className="px-3 py-2">Clean, modern general-purpose documents</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-3 py-2 font-medium">Dark</td>
                  <td className="px-3 py-2">Dark-background reading and screen sharing</td>
                </tr>
              </tbody>
            </table>
            <p>
              Choose <strong>A4</strong> for most of the world and <strong>US Letter</strong> for the United States and
              Canada; the Page menu sits next to the theme buttons. To start a new page at a specific point, put 
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;!-- pagebreak --&gt;</code> on its own line.
              Headings are kept on the same page as the block that follows them, so a heading never ends up alone at
              the bottom of a page.
            </p>
          </div>
        </section>

        {/* How Mermaid + highlighting survive */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Do Some Markdown to PDF Converters Lose Formatting?</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              Mermaid diagrams and syntax highlighting are the two things most converters drop, and for the same
              reason: neither exists in the Markdown itself. A 
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">```mermaid</code> block is text until something
              draws it, and code colors are classes that a PDF engine ignores unless they are turned into real colors.
              A converter that skips either step prints the diagram as raw text and the code in one flat color.
            </p>
            <p>
              MDTool draws each Mermaid diagram as an SVG in your browser before the PDF is built and places it in the
              document as vector graphics, so labels stay sharp and selectable. Code is highlighted with 
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">highlight.js</code> and every token color is
              written into the PDF using a palette matched to the theme. The PDF itself is generated by 
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">pdfmake</code>, a vector engine, instead of
              capturing an image of the page. The preview and the PDF come from the same parsed document, so diagrams,
              code colors and page breaks land in the same places; fonts differ slightly because the PDF embeds its
              own.
            </p>
            <figure className="mt-4">
              <Image
                src="/screenshots/pdf-output-mermaid.png"
                alt="A PDF page exported by MDTool showing a Mermaid sequence diagram, pie chart and class diagram rendered as vector graphics"
                width={910}
                height={1187}
                className="w-full max-w-md h-auto rounded-lg border border-gray-200"
              />
              <figcaption className="text-sm text-gray-500 mt-2">
                Sequence, pie and class diagrams in an exported PDF page.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Direct answers */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Is This Markdown to PDF Converter Really Free?</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Yes. The PDF is generated on your own device, so there is no server cost to recover with a paywall,
            a daily limit or a watermark. There is no account, no email and no trial. Because nothing is uploaded,
            it also works for confidential documents: you can confirm it in your browser&apos;s Network tab, which
            shows no request carrying your Markdown when you click Download.
          </p>
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
              <a href="/markdown-to-html" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to HTML →
              </a>
              <a href="/blog/github-readme-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                GitHub README to PDF Guide →
              </a>
              <a href="/blog/best-markdown-to-pdf-converter" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Best Markdown to PDF Converters Compared →
              </a>
              <a href="/markdown-cheat-sheet" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown Syntax Cheatsheet →
              </a>
              <a href="/blog/markdown-to-pdf-code-blocks" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Fix Code Blocks in PDF Exports →
              </a>
              <a href="/blog/markdown-table-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Why Markdown Tables Break in PDFs →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
