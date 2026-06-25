import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';
import ConversionDiagram from '@/components/ui/ConversionDiagram';

export const metadata: Metadata = {
  title: 'Word to Markdown Converter — Free, No Login, No Upload',
  description: 'Convert .docx Word documents to clean Markdown instantly in your browser. Headings, tables, lists, bold, italic, and links convert automatically. Free, no signup, no file size limit.',
  keywords: ['word to markdown', 'docx to markdown', 'docx to md', 'convert word to markdown', 'word markdown converter'],
  openGraph: {
    title: 'Free Word to Markdown Converter — MDTool',
    description: 'Convert .docx Word documents to clean Markdown instantly. Headings, tables, and lists convert automatically. 100% free, no login, runs in your browser.',
    url: 'https://www.mdtool.dev/word-to-markdown',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/word-to-markdown',
  },
};

const FAQ_ITEMS = [
  {
    q: 'What file formats are supported?',
    a: (
      <>
        Modern .docx files (Word 2007 and later, the{' '}
        <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-376/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          ECMA-376 Office Open XML
        </a>{' '}
        standard). Legacy .doc files (Word 97–2003 binary format) are not supported — open the file in Word and use File → Save As → .docx first.
      </>
    ),
    text: 'Modern .docx files (Word 2007 and later, the ECMA-376 Office Open XML standard) are supported. Legacy .doc files are not — save as .docx first.',
  },
  {
    q: 'Is my Word document uploaded to a server?',
    a: 'No. The entire conversion runs as JavaScript in your browser. Your file is never sent to a server, stored, or logged. You can verify this by disconnecting from the internet and trying a conversion — it works offline.',
    text: 'No. Conversion runs entirely in your browser using JavaScript. Your file is never uploaded, stored, or sent to a server.',
  },
  {
    q: 'What formatting gets preserved?',
    a: 'Heading styles (Heading 1 → # through Heading 6 → ######), bold and italic text, bullet and numbered lists, hyperlinks, and simple tables convert cleanly. These are all structural elements that Word stores explicitly in the file\'s XML.',
    text: 'Heading styles, bold, italic, bullet and numbered lists, hyperlinks, and simple tables all convert cleanly.',
  },
  {
    q: 'What happens to images in the Word document?',
    a: 'Embedded images are not extracted in the current version — the converter outputs text content and structure only. Plan to re-add images manually after conversion. For image-heavy documents, Pandoc with the --extract-media flag is the better tool.',
    text: 'Embedded images are not extracted. Only text content and structure convert. Re-add images manually after conversion, or use Pandoc with --extract-media for image-heavy documents.',
  },
  {
    q: 'Does it handle tracked changes and comments?',
    a: 'No. Tracked changes (accepted or rejected edits) and comments are stripped during conversion — only the current accepted text is included in the Markdown output. Accept or reject all tracked changes in Word before converting if you need to control which version is exported.',
    text: 'No. Tracked changes and comments are stripped. Only the current accepted text appears in the Markdown output. Accept or reject changes in Word before converting.',
  },
  {
    q: 'What flavor of Markdown is the output?',
    a: (
      <>
        GitHub Flavored Markdown (GFM). The converter uses{' '}
        <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          turndown
        </a>{' '}
        with the GFM plugin, so tables render as pipe tables, code blocks use fenced syntax (``` triple backticks), and lists use the dash-space (- item) format that renders correctly on GitHub, GitLab, Obsidian, and most static site generators.
      </>
    ),
    text: 'GitHub Flavored Markdown (GFM). Pipe tables, fenced code blocks, and dash-space list syntax — compatible with GitHub, GitLab, Obsidian, Jekyll, and Hugo.',
  },
  {
    q: 'Can I use it for large documents?',
    a: 'Yes. Because conversion happens in your browser rather than on a server, there is no file size cap or page count limit. In practice, very large files (100+ pages) may take a few seconds longer to process, but there is no hard ceiling.',
    text: 'Yes. Client-side processing means no file size cap or page count limit. Very large documents may take a few extra seconds to process.',
  },
  {
    q: 'What about Word tables with merged cells?',
    a: 'GFM pipe tables do not support merged cells (colspan or rowspan). Tables with merged cells are simplified — merged cells are split out so the table structure is preserved, but the merge itself is lost. For complex tables, you may need to rebuild the structure manually or use an HTML table fallback.',
    text: 'GFM tables cannot represent merged cells. Tables with merges are simplified to flat pipe tables. Rebuild complex merged-cell tables manually if needed.',
  },
  {
    q: 'Can I edit the Markdown before downloading?',
    a: 'The output panel is currently read-only. Copy the result and paste it into any text editor or Markdown editor to make changes, or download the .md file and edit it locally.',
    text: 'The output panel is read-only. Copy the result into a text editor, or download the .md file and edit it locally.',
  },
  {
    q: 'Can I convert multiple Word files at once?',
    a: 'Not in the current version — the tool processes one .docx file at a time. For batch conversion of many files, Pandoc\'s command-line interface supports converting an entire directory of .docx files in a single shell command.',
    text: 'Not currently — one file at a time. For batch conversion of many files, Pandoc supports converting a whole directory via command line.',
  },
];

export default function WordToMarkdownPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Word to Markdown Converter"
        url="/word-to-markdown"
        description="Convert .docx Word documents to clean Markdown instantly in your browser. Headings, tables, lists, bold, italic, and links convert automatically. Free, no signup, no file size limit."
        datePublished="2025-01-01"
        dateModified="2026-06-25"
        featureList={[
          'Word (.docx) to GitHub Flavored Markdown conversion',
          'Headings (H1–H6), bold, italic, lists, tables, and links preserved',
          'Drag-and-drop file upload',
          'Client-side processing — files never uploaded to a server',
          'No file size limit, no account required',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Word to Markdown Converter', url: '/word-to-markdown' },
        ]}
      />
      <StructuredData
        type="faq"
        faqs={FAQ_ITEMS.map(item => ({ q: item.q, a: item.text }))}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero — title over the live converter */}
        <section className="bg-gradient-to-b from-[#16314f] to-[#0f1e30] text-white">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Free Word to Markdown Converter
            </h1>
            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mb-3 leading-relaxed">
              Drag and drop a .docx file and get clean, plain-text GitHub Flavored Markdown back. No upload,
              no watermark.
            </p>
            <p className="text-xs text-blue-200/50">Updated June 25, 2026</p>
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
              <strong>Word to Markdown conversion</strong> reads the structural styles in your .docx file —
              Heading 1, Heading 2, bullet lists, tables, bold, italic — and outputs clean, plain-text Markdown.
              MDTool converts Word to Markdown entirely in your browser using{' '}
              <a href="https://github.com/mwilliamson/mammoth.js" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mammoth.js</a>{' '}
              to extract the document structure and{' '}
              <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">turndown</a>{' '}
              to render it as GitHub Flavored Markdown — free, with no login and no file size limit.
            </p>
            <ConversionDiagram from="Word (.docx)" to="Markdown (.md)" />
          </div>
        </section>

        {/* Ad Slot — Between tool and content */}
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        {/* How to Convert — Main Content Section */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Convert Word to Markdown</h2>
          <p className="text-gray-700 mb-4 max-w-3xl leading-relaxed">
            Drop a .docx file onto the left panel and MDTool reads the document&apos;s XML structure —
            named heading styles, list formatting, table grids — and converts them to Markdown syntax
            in seconds, entirely inside your browser tab.
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 max-w-3xl mb-6">
            <li>
              <strong>Drag and drop</strong> your .docx file onto the left panel, or click{' '}
              <strong>Choose .docx file</strong> to browse your computer
            </li>
            <li>
              MDTool reads the file using{' '}
              <a href="https://github.com/mwilliamson/mammoth.js" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mammoth.js</a>{' '}
              — it extracts the Word document&apos;s structural XML and maps named styles to HTML elements
            </li>
            <li>
              <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">turndown</a>{' '}
              with the GFM plugin then converts the intermediate HTML to GitHub Flavored Markdown
            </li>
            <li>
              The Markdown output appears in the right panel — click <strong>Copy</strong> to copy it
              to your clipboard, or <strong>Download .md</strong> to save it as a file
            </li>
          </ol>

          {/* What Gets Converted */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">What Gets Converted</h3>
          <p className="text-gray-700 mb-3 max-w-3xl leading-relaxed">
            mammoth.js maps Word&apos;s named paragraph styles to Markdown elements. These are the formatting
            types that Word explicitly marks in the file&apos;s XML — not visual appearance, but structural intent.
          </p>
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden mb-6 max-w-3xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Word element</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Markdown output</th>
                <th className="text-left px-3 py-2 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2 font-medium">Heading 1 – Heading 6 styles</td>
                <td className="px-3 py-2 font-mono text-sm"># through ######</td>
                <td className="px-3 py-2 text-green-700">✅ Preserved</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-3 py-2 font-medium">Bold and italic text</td>
                <td className="px-3 py-2 font-mono text-sm">**bold** / *italic*</td>
                <td className="px-3 py-2 text-green-700">✅ Preserved</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2 font-medium">Bullet lists</td>
                <td className="px-3 py-2 font-mono text-sm">- item</td>
                <td className="px-3 py-2 text-green-700">✅ Preserved</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-3 py-2 font-medium">Numbered lists</td>
                <td className="px-3 py-2 font-mono text-sm">1. item</td>
                <td className="px-3 py-2 text-green-700">✅ Preserved</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2 font-medium">Hyperlinks</td>
                <td className="px-3 py-2 font-mono text-sm">[text](url)</td>
                <td className="px-3 py-2 text-green-700">✅ Preserved</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-3 py-2 font-medium">Simple tables</td>
                <td className="px-3 py-2 font-mono text-sm">| col | col |</td>
                <td className="px-3 py-2 text-green-700">✅ Converted to pipe tables</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2 font-medium">Manually formatted text (no named style)</td>
                <td className="px-3 py-2">Treated as body text</td>
                <td className="px-3 py-2 text-amber-700">⚠️ Loses formatting</td>
              </tr>
              <tr className="border-t border-gray-200 bg-gray-50">
                <td className="px-3 py-2 font-medium">Embedded images</td>
                <td className="px-3 py-2">Not included</td>
                <td className="px-3 py-2 text-red-600">❌ Not extracted</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-3 py-2 font-medium">Tracked changes, comments</td>
                <td className="px-3 py-2">Stripped</td>
                <td className="px-3 py-2 text-red-600">❌ Not included</td>
              </tr>
            </tbody>
          </table>

          {/* What Does Not Convert Cleanly */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">What Does Not Convert Cleanly</h3>
          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl mb-6">
            <p>
              Some Word features have no Markdown equivalent and are stripped or simplified during conversion.
              Knowing these in advance saves cleanup time:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>Embedded images</strong> — Not extracted. Images disappear from the output because
                mammoth.js does not base64-encode or reference embedded media by default. Re-add images
                manually after conversion. If preserving images matters, use Pandoc with{' '}
                <code className="text-sm bg-gray-100 px-1 rounded">--extract-media</code> instead.
              </li>
              <li>
                <strong>Tracked changes and comments</strong> — Word&apos;s revision markup and comment
                annotations are not surfaced in the output. Only the accepted (current) version of the
                text is included. Accept or reject all changes in Word before converting.
              </li>
              <li>
                <strong>Complex table merges</strong> — GFM pipe tables have no support for{' '}
                <code className="text-sm bg-gray-100 px-1 rounded">colspan</code> or{' '}
                <code className="text-sm bg-gray-100 px-1 rounded">rowspan</code>. Merged cells are
                split into individual cells. Rebuild merged-cell tables manually or use an HTML table fallback.
              </li>
              <li>
                <strong>Manual formatting without named styles</strong> — Text made bigger or bolder by
                hand — rather than through a Word heading style — is stored in the XML as plain body text
                with font overrides. mammoth.js correctly treats it as body text, not a heading, because
                Word itself doesn&apos;t classify it structurally. Apply named heading styles in Word before converting.
              </li>
              <li>
                <strong>Font colors, custom fonts, and underlines</strong> — These are presentational
                properties with no Markdown equivalent and are dropped silently.
              </li>
            </ul>
          </div>

          {/* Why Convert Word to Markdown */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Convert Word to Markdown</h3>
          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl mb-6">
            <p>
              Markdown is the plain-text format that most developer tools, documentation platforms, and
              publishing systems natively understand. Word&apos;s .docx format is a binary XML archive —
              useful for page-layout editing, but awkward when content needs to move into a
              version-controlled workflow or a platform that expects plain text.
            </p>
            <p>
              Scale makes this concrete:{' '}
              <a href="https://github.blog/news-insights/octoverse/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                GitHub&apos;s 2025 Octoverse report
              </a>{' '}
              counted 630 million repositories on the platform, with 230+ new repositories
              created every minute. Every repository that includes documentation files expects
              Markdown, not .docx — and the same is true for static site generators, Obsidian
              vaults, and every major docs-as-code platform.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>GitHub and GitLab</strong> — README files, wiki pages, and documentation in
                repositories use Markdown (specifically GFM). A .docx file cannot be committed as
                a rendered README. Convert to .md first.
              </li>
              <li>
                <strong>Obsidian</strong> — Obsidian vaults store notes as plain .md files. Word documents
                cannot be opened directly in Obsidian — convert first, then drop the .md into your vault.
                See{' '}
                <a href="/blog/word-to-markdown-obsidian" className="text-blue-600 hover:underline">
                  converting Word documents for Obsidian
                </a>.
              </li>
              <li>
                <strong>Static site generators (Jekyll, Hugo, Eleventy, Astro)</strong> — These tools
                render pages from Markdown source files. Content written in Word needs a clean .md
                conversion before it can be published through a static site pipeline.
              </li>
              <li>
                <strong>Docs-as-code platforms (MkDocs, Docusaurus)</strong> — Documentation sites
                that live alongside source code in a Git repository expect Markdown source. Converting
                a Word-based doc library to Markdown enables version control and pull-request review
                workflows for documentation.
              </li>
              <li>
                <strong>Notion, Ghost, and Hashnode</strong> — These publishing tools support Markdown
                import or paste. A converted .md file pastes cleanly with headings and formatting intact,
                without reformatting everything from scratch.
              </li>
            </ul>
          </div>

          {/* Is It Free */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Is MDTool Free?</h3>
          <div className="space-y-3 text-gray-700 leading-relaxed max-w-3xl">
            <p>
              Yes — free to use, no account required, and no file size limit. MDTool is a client-side
              converter: the conversion logic runs as JavaScript in your browser tab. Your .docx file is
              never uploaded to a server, which means there is no infrastructure cost per conversion and
              therefore no reason to charge for it or cap file sizes.
            </p>
            <p>
              The two libraries powering the conversion —{' '}
              <a href="https://github.com/mwilliamson/mammoth.js" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mammoth.js</a>{' '}
              and{' '}
              <a href="https://github.com/mixmark-io/turndown" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">turndown</a>{' '}
              — are open-source MIT-licensed projects. You can verify the behavior, inspect the source,
              or use the libraries directly in your own projects. MDTool bundles them into a drag-and-drop
              interface so you don&apos;t need Node.js or a command line to get a quick conversion done.
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
              <a href="/markdown-to-word" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to Word →
              </a>
              <a href="/html-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                HTML to Markdown →
              </a>
              <a href="/markdown-to-pdf" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown to PDF →
              </a>
              <a href="/blog/markdown-cheatsheet" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                Markdown Syntax Cheatsheet →
              </a>
              <a href="/blog/docx-to-markdown" className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                DOCX to Markdown Guide →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
