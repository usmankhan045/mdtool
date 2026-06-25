import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';

export const metadata: Metadata = {
  title: 'Free Markdown to Word Converter: Real .docx, No Signup',
  description: 'Convert Markdown to a real, editable .docx document free, with no signup. Opens in Word, Google Docs, and LibreOffice. Try it now.',
  keywords: ['markdown to word', 'md to word', 'markdown to docx', 'convert markdown to word', 'markdown word converter'],
  openGraph: {
    title: 'Free Markdown to Word Converter: Real .docx, No Signup',
    description: 'Convert Markdown to an editable .docx file instantly. Opens in Word, Google Docs, and LibreOffice. 100% free, no login.',
    url: 'https://www.mdtool.dev/markdown-to-word',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/markdown-to-word',
  },
};

const FAQ_ITEMS = [
  {
    q: 'Will the output be a real, editable Word document?',
    a: (
      <>
        Yes. MDTool generates a genuine .docx file (the{' '}
        <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-376/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Office Open XML
        </a>{' '}
        standard), not a PDF or an image. You can open and edit it in Microsoft Word, Google Docs, or LibreOffice Writer.
      </>
    ),
    text: 'Yes. MDTool generates a genuine .docx file (Office Open XML), editable in Microsoft Word, Google Docs, or LibreOffice Writer.',
  },
  {
    q: 'Does it support tables in Word?',
    a: 'Yes. Markdown tables convert to native Word table grids: real rows and columns you can resize, restyle, and edit directly in Word, not an image or plain-text approximation.',
    text: 'Yes. Markdown tables convert to native Word table grids you can resize, restyle, and edit directly in Word.',
  },
  {
    q: 'Can I open it in Google Docs?',
    a: 'Yes. Because the output is a standard .docx file rather than a proprietary format, Google Docs opens it directly. Just upload it to Drive or use File → Open, no special import step needed.',
    text: 'Yes. The output is a standard .docx file, so Google Docs opens it directly with no special import step.',
  },
  {
    q: 'What Markdown elements are supported?',
    a: 'Headings (H1 to H6), bold, italic, strikethrough, links, ordered and unordered lists, tables, fenced code blocks, and blockquotes all convert to their native Word equivalents. Mermaid diagrams and embedded images are not yet supported in the Word export.',
    text: 'Headings (H1 to H6), bold, italic, strikethrough, links, lists, tables, fenced code blocks, and blockquotes all convert to native Word equivalents.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'No hard limit. Conversion happens entirely in your browser rather than on a server, so the only practical ceiling is your own device’s memory for extremely large files. There’s no upload cap to hit.',
    text: 'No hard limit. Conversion runs entirely in your browser, so there’s no server-side upload cap.',
  },
  {
    q: 'Does it handle code blocks?',
    a: 'Yes. Fenced code blocks convert to a monospace Word paragraph style with preserved line breaks and indentation. Per-token syntax-highlighting colors don’t carry over, since Word has no equivalent concept for them.',
    text: 'Yes. Fenced code blocks convert to a monospace Word style with preserved line breaks and indentation.',
  },
  {
    q: 'Is my Markdown uploaded to a server?',
    a: 'No. The .docx file is generated entirely client-side in your browser. Your content never leaves your device.',
    text: 'No. The .docx file is generated entirely client-side in your browser. Your content never leaves your device.',
  },
  {
    q: 'Does it support Mermaid diagrams or images like the PDF converter?',
    a: 'Word documents render fonts and basic layout very differently from PDFs. Mermaid diagrams and embedded images are not yet supported in the Word export. Use the Markdown to PDF tool if you need diagrams.',
    text: 'Mermaid diagrams and embedded images are not yet supported in the Word export. Use the Markdown to PDF tool if you need diagrams.',
  },
  {
    q: 'Can I convert a GitHub README to Word?',
    a: 'Yes. Copy the raw content of your README.md from GitHub, paste it into the editor on the left, and click Download Word.',
    text: 'Yes. Copy the raw content of your README.md from GitHub, paste it into the editor, and click Download Word.',
  },
  {
    q: 'Is this really free, with no signup or watermark?',
    a: 'Yes. There’s no account, no trial period, and no watermark on the downloaded file. Since the .docx is built in your browser rather than on a paid server pipeline, there’s no usage-based cost to recover, which is why the tool can stay free with no catch.',
    text: 'Yes: no account, no trial period, and no watermark, since conversion runs client-side with no server cost to recover.',
  },
];

export default function MarkdownToWordPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Markdown to Word Converter"
        url="/markdown-to-word"
        description="Convert Markdown to a real, editable .docx Word document instantly in your browser. Supports headings, tables, lists, and code blocks."
        dateModified="2026-06-24"
        featureList={[
          'Markdown to editable .docx conversion',
          'Tables, lists, and headings preserved',
          'Opens in Word, Google Docs, and LibreOffice',
          'Live Word-style preview',
          'Client-side processing, files never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown to Word Converter', url: '/markdown-to-word' },
        ]}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero — title over the live converter */}
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Free Markdown to Word Converter: Real .docx, No Signup
            </h1>
            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mb-3 leading-relaxed">
              Turn Markdown into a real, editable .docx that opens in Word, Google Docs, and LibreOffice.
              No login, no watermark, no limits.
            </p>
            <p className="text-xs text-blue-200/50">Updated June 24, 2026</p>
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
              <strong>Markdown to Word conversion</strong> turns Markdown syntax into a real, editable .docx
              file: headings become Word heading styles, lists become native bullet or numbered lists, and
              tables become Word table grids. MDTool generates the .docx entirely in your browser, with no
              upload step, so the file opens directly in Microsoft Word, Google Docs, or LibreOffice Writer,
              free, with no signup.
            </p>
            <ConversionDiagram from="Markdown" to="Word (.docx)" />
          </div>
        </section>

        {/* Ad Slot — Between tool and FAQ */}
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        {/* SEO Content */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Convert Markdown to Word Free</h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl mb-4">
            Converting Markdown to Word takes four steps and no account: paste your content, watch the
            preview, and download a real .docx file with nothing held back behind a signup screen.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Paste your Markdown text in the left panel, or click <strong>Upload .md</strong> to load a file, no account required</li>
            <li>See the live Word-style preview update in real-time on the right as you type</li>
            <li>Click <strong>Download Word, Free</strong> to save your .docx file, with no paywall or watermark</li>
            <li>Open it directly in Microsoft Word, Google Docs, or LibreOffice Writer</li>
          </ol>
        </section>

        {/* What You Get */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">What You Get With This Converter</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What Gets Preserved in the .docx</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
              <p>
                MDTool&apos;s Word export is built on the{' '}
                <a href="https://docx.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">docx</a>{' '}
                library, which maps Markdown structure to native Office Open XML elements rather than
                approximating formatting with plain text. Headings (H1 through H6) become real Word heading
                styles, not just bold text. Bold, italic, strikethrough, and links become native character
                formatting, ordered and unordered lists become native Word lists, tables become native table
                grids, and blockquotes and fenced code blocks get their own paragraph styles.
              </p>
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden my-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Markdown element</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Word output</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-3 py-2 font-medium">Headings (H1 to H6)</td>
                    <td className="px-3 py-2">✅ Native Word heading styles</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-3 py-2 font-medium">Bold, italic, strikethrough</td>
                    <td className="px-3 py-2">✅ Native character formatting</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-3 py-2 font-medium">Links</td>
                    <td className="px-3 py-2">✅ Native clickable hyperlinks</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-3 py-2 font-medium">Ordered &amp; unordered lists</td>
                    <td className="px-3 py-2">✅ Native Word lists</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-3 py-2 font-medium">Tables</td>
                    <td className="px-3 py-2">✅ Native Word table grids</td>
                  </tr>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="px-3 py-2 font-medium">Fenced code blocks, blockquotes</td>
                    <td className="px-3 py-2">✅ Dedicated paragraph styles</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="px-3 py-2 font-medium">Mermaid diagrams, embedded images</td>
                    <td className="px-3 py-2">❌ Not yet supported (use Markdown to PDF)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Compatible With Google Docs and LibreOffice</h3>
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              Yes, explicitly. The download is a standard .docx file built on the Office Open XML
              specification, not a proprietary MDTool format, so it opens the same way any other .docx would:
              directly in Microsoft Word, uploaded into Google Docs, or opened in LibreOffice Writer, with
              heading styles, lists, and tables intact in all three.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Who Is This For</h3>
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              <strong>Technical writers</strong> drafting in Markdown who need a polished .docx for a
              non-technical reviewer or client. <strong>Developers documenting APIs</strong> who write specs
              and READMEs in Markdown but have to hand off a Word version to a product or compliance team.{' '}
              <strong>Students</strong> who draft reports and assignments in a plain-text editor and need to
              submit a .docx file to a portal that only accepts Word documents. In each case the underlying
              need is the same: write in Markdown, ship in Word, without learning a new tool or paying for one.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Is It Really Free</h3>
            <p className="text-gray-700 leading-relaxed max-w-3xl">
              Yes, with no catch. The .docx file is generated entirely client-side, in your browser, so there&apos;s
              no server doing the conversion, which is also why there&apos;s no usage-based cost to recover
              through a paywall or watermark. There&apos;s no account to create, no email to hand over, and no
              trial period that reverts to paid after a few conversions. The output file is identical whether
              you convert once or a hundred times, and it never carries a watermark, footer branding, or
              locked-preview restriction the way many &quot;free trial&quot; converters do.
            </p>
          </div>
        </section>

        {/* Format-specific substance */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Mermaid Diagrams Aren&apos;t in the Word Export Yet</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              HTML and PDF can both embed a diagram as a vector image directly in the page: an inline{' '}
              <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">&lt;svg&gt;</code> for HTML, or a captured
              vector layer for PDF. The Word format (.docx, technically Office Open XML) doesn&apos;t work that
              way. An image in a Word document has to exist as a separate embedded file with its own
              relationship entry in the document&apos;s XML structure, a meaningfully different code path
              than rendering a diagram onto a canvas, which is why it isn&apos;t wired into the table above yet.
            </p>
            <p>
              If your document needs the diagrams to render, use the{' '}
              <a href="/markdown-to-pdf" className="text-blue-600 hover:underline">Markdown to PDF converter</a> instead,
              which renders Mermaid directly in the browser before generating the file. In practice this
              trade-off rarely matters for the documents people actually send through a Word converter:
              contracts, reports, proposals, and meeting notes are almost entirely headings, body text, and
              tables, exactly what the Office Open XML pipeline handles natively. Diagrams tend to show up in
              technical READMEs and developer docs, which are also exactly the documents most likely to end up
              as a PDF or web page rather than a .docx file, so the PDF export is the better fit for that case
              anyway.
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
              <a href="/markdown-to-html" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to HTML →
              </a>
              <a href="/word-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Word to Markdown →
              </a>
              <a href="/blog/markdown-cheatsheet" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown Syntax Cheatsheet →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
