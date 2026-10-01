import type { Metadata } from 'next';
import Link from 'next/link';
import TableGeneratorClient from '@/components/tools/TableGeneratorClient';
import FaqSection from '@/components/seo/FaqSection';
import StructuredData from '@/components/seo/StructuredData';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Markdown Table Generator: Free, Copy & Paste',
  description:
    'Generate Markdown tables visually: edit cells in a grid, set alignment, paste data from Excel or Google Sheets, and copy clean GFM or HTML table code.',
  keywords: ['markdown table generator', 'markdown table', 'table to markdown', 'markdown table maker', 'excel to markdown table', 'markdown table to html'],
  openGraph: {
    title: 'Free Markdown Table Generator | MDTool',
    description: 'Build Markdown tables in a visual grid editor. Paste from Excel/Sheets, align columns, copy GFM or HTML output. Free, no login.',
    url: 'https://www.mdtool.dev/markdown-table-generator',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.mdtool.dev/markdown-table-generator',
  },
};

const FAQ_ITEMS = [
  {
    q: 'How do I create a Markdown table without typing pipes by hand?',
    a: 'Use the grid editor above: set your rows and columns, type into the cells, and copy the generated Markdown. The pipe characters, separator row, and alignment colons are written for you, with columns padded so the raw source stays readable.',
    text: 'Use the grid editor above: set your rows and columns, type into the cells, and copy the generated Markdown. The pipes, separator row, and alignment colons are written for you.',
  },
  {
    q: 'Can I paste a table from Excel or Google Sheets?',
    a: 'Yes. Click "Paste from Excel / CSV", paste the copied cells, and the grid fills automatically. Excel and Sheets copy cells as tab-separated text, which the importer detects; plain CSV works too.',
    text: 'Yes. Click "Paste from Excel / CSV", paste the copied cells, and the grid fills automatically. Excel and Sheets copy cells as tab-separated text, which the importer detects; plain CSV works too.',
  },
  {
    q: 'How do I align columns in a Markdown table?',
    a: 'Click the alignment button above any column to cycle left → center → right. In the generated syntax, alignment is encoded with colons in the separator row: :--- is left, :---: is center, and ---: is right.',
    text: 'Click the alignment button above any column to cycle left, center, right. In the syntax, alignment is encoded with colons in the separator row: :--- left, :---: center, ---: right.',
  },
  {
    q: 'Can I convert a Markdown table to an HTML table?',
    a: 'Yes. Switch the output toggle to HTML and the same table is rendered as clean <table> markup with thead, tbody, and per-column text-align styles, ready to paste into a page or CMS.',
    text: 'Yes. Switch the output toggle to HTML and the same table is rendered as clean table markup with thead, tbody, and per-column text-align styles.',
  },
  {
    q: 'Do Markdown tables work on GitHub?',
    a: 'Yes. Tables are part of GitHub Flavored Markdown (GFM) and render in READMEs, issues, pull requests, and wikis. They are not part of core Markdown, so very strict CommonMark parsers may not render them.',
    text: 'Yes. Tables are part of GitHub Flavored Markdown and render in READMEs, issues, pull requests, and wikis.',
  },
  {
    q: 'Can I merge cells or use multiple lines in a cell?',
    a: 'Markdown tables have no colspan/rowspan, so cells cannot be merged. Use the HTML output if you need that and edit the markup. For a line break inside a cell, the generator converts newlines to <br>, which GitHub renders correctly.',
    text: 'Markdown tables have no colspan/rowspan, so cells cannot be merged. For a line break inside a cell, the generator converts newlines to <br>, which GitHub renders correctly.',
  },
  {
    q: 'Is my table data uploaded anywhere?',
    a: 'No. The generator runs entirely in your browser. Nothing you type or paste is sent to a server.',
    text: 'No. The generator runs entirely in your browser. Nothing you type or paste is sent to a server.',
  },
];

export default function MarkdownTableGeneratorPage() {
  return (
    <>
      <StructuredData
        type="tool"
        name="Markdown Table Generator"
        url="/markdown-table-generator"
        description="Generate Markdown tables in a visual grid editor: column alignment, Excel/CSV import, and copyable GFM or HTML output. Runs entirely in the browser."
        datePublished="2026-07-03"
        dateModified="2026-07-03"
        featureList={[
          'Visual grid editor for Markdown tables',
          'Per-column alignment (left, center, right)',
          'Paste import from Excel, Google Sheets, or CSV',
          'GitHub Flavored Markdown output with padded columns',
          'HTML table output (thead/tbody with alignment)',
          'Copy to clipboard',
          'Client-side processing, data never uploaded',
        ]}
      />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Markdown Table Generator', url: '/markdown-table-generator' },
        ]}
      />

      <main className="min-h-screen bg-page">
        {/* Hero - title over the live tool */}
        <section className="hero-grid text-zinc-950">
          <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Free Online Markdown Table Generator
            </h1>
            <p className="text-base md:text-lg text-zinc-600 max-w-2xl mb-3 leading-relaxed">
              Build tables in a visual grid, no hand-typed pipes. Set column alignment, paste data
              straight from Excel or Google Sheets, and copy clean Markdown or HTML.
            </p>
            <p className="text-xs text-zinc-500">Updated July 3, 2026</p>
          </div>
        </section>

        {/* The tool */}
        <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
          <TableGeneratorClient />
        </section>

        {/* About */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-base text-zinc-700 leading-relaxed max-w-3xl">
            <strong>A Markdown table generator</strong> writes the pipe-and-hyphen table syntax for you:
            you edit cells in a familiar grid, and the tool produces a GitHub Flavored Markdown table
            with aligned columns, escaped pipe characters, and a correct separator row. That matters
            because table syntax is the most error-prone part of Markdown: a missing pipe or a
            malformed separator row silently turns the whole table into plain text. Everything runs in
            your browser; nothing you type or paste is uploaded.
          </p>
        </section>

        {/* Ad Slot */}
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot slotId="tool-below" format="horizontal" />
        </div>

        {/* How-to */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">How Do You Generate a Markdown Table?</h2>
          <ol className="list-decimal list-inside space-y-2 text-zinc-700">
            <li>Set the size with <strong>+ Row</strong> / <strong>+ Column</strong>, or click <strong>Paste from Excel / CSV</strong> to import existing data</li>
            <li>Type your content into the grid cells (the first row is the header)</li>
            <li>Click the alignment buttons (⇤ ↔ ⇥) above any column to align it left, center, or right</li>
            <li>Choose <strong>Markdown</strong> or <strong>HTML</strong> output and click <strong>Copy</strong></li>
          </ol>
        </section>

        {/* Substance: Excel workflow */}
        <section className="max-w-6xl mx-auto px-4 py-8 border-t border-zinc-100">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-4">How Do You Convert an Excel Table to Markdown?</h2>
          <div className="space-y-4 text-zinc-700 leading-relaxed max-w-3xl">
            <p>
              Select the cells in Excel or Google Sheets, copy them, click <strong>Paste from Excel / CSV</strong>{' '}
              above, and paste. Spreadsheets copy cells as tab-separated text, so each tab becomes a column
              boundary and each line a row. The first row is treated as the header. The importer also accepts
              comma-separated (CSV) data when no tabs are present.
            </p>
            <p>
              This is usually the fastest route from spreadsheet to README: no add-ins, no export step, and
              because the conversion happens in your browser, the data in your spreadsheet never leaves your
              machine. For whole documents rather than tables, the{' '}
              <Link href="/word-to-markdown" className="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900">Word to Markdown converter</Link>{' '}
              handles .docx files the same private way.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <FaqSection items={FAQ_ITEMS} />
        </section>

        {/* Related */}
        <section className="bg-page-soft border-t border-zinc-200/70 px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold text-zinc-700 mb-4">You might also need:</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/markdown-cheat-sheet/tables" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown Table Syntax Guide →
              </Link>
              <Link href="/blog/markdown-table-pdf" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Why Tables Break in PDF Exports →
              </Link>
              <Link href="/blog/excel-to-markdown-table" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Excel to Markdown Table Guide →
              </Link>
              <Link href="/markdown-to-html" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Markdown to HTML Converter →
              </Link>
              <Link href="/markdown-cheat-sheet" className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-700 shadow-[0_1px_0_rgba(24,24,27,0.04)] transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-950 active:scale-[0.97] text-sm">
                Full Markdown Cheat Sheet →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
