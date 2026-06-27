// PDF generation via pdfmake — a TRUE vector PDF engine.
//
// Why pdfmake (not html2canvas/html2pdf): html2canvas rasterises the page into
// an image, which makes long documents blurry, drops heading word-spacing, and
// produces huge non-selectable files. pdfmake draws REAL text into the PDF, so
// output is crisp at any zoom, selectable/searchable, small, and downloads in
// one click with no browser print "watermark" (header/footer).
//
// Tradeoff: styling is a clean, consistent rebuild per theme (fonts, sizes,
// colors, tables, code) rather than a pixel-copy of the CSS themes.
//
// IMPORTANT: pdfmake is browser-only and heavy — always dynamic-import it inside
// the function so SSR never touches it.

import { applyEmojiFont } from './emoji';

export type ThemeId = 'github' | 'academic' | 'minimal' | 'dark';

export interface PdfOptions {
  theme: ThemeId;
  filename?: string;
  pageSize?: 'a4' | 'letter';
}

// Log in dev so a failed export is diagnosable from the console.
const DEBUG =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';
const log = (...args: unknown[]) => DEBUG && console.log('[pdf]', ...args);

interface ThemeTokens {
  fontSize: number;
  lineHeight: number;
  color: string; // body text
  headingColor: string;
  link: string;
  thFill: string; // table header background
  codeColor: string;
  quoteColor: string;
  pageColor?: string; // full-page background (dark theme)
  h1Align?: 'center';
}

const THEME_TOKENS: Record<ThemeId, ThemeTokens> = {
  github: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#24292e',
    headingColor: '#24292e',
    link: '#0969da',
    thFill: '#f6f8fa',
    codeColor: '#6f42c1',
    quoteColor: '#6a737d',
  },
  academic: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#111111',
    headingColor: '#000000',
    link: '#1a4f8b',
    thFill: '#f0f0f0',
    codeColor: '#333333',
    quoteColor: '#555555',
    h1Align: 'center',
  },
  minimal: {
    fontSize: 11,
    lineHeight: 1.45,
    color: '#333333',
    headingColor: '#111111',
    link: '#2563eb',
    thFill: '#f0e0e0',
    codeColor: '#444444',
    quoteColor: '#666666',
  },
  dark: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#e6edf3',
    headingColor: '#f0f6fc',
    link: '#58a6ff',
    thFill: '#161b22',
    codeColor: '#ff7b72',
    quoteColor: '#8b949e',
    pageColor: '#0d1117',
  },
};

// Per-tag style overrides handed to html-to-pdfmake. Tight, explicit heading
// margins + sizes keep the hierarchy clear and consistent across themes.
function buildDefaultStyles(t: ThemeTokens) {
  // NOTE: every value here is fed through JSON.parse(JSON.stringify(value)) by
  // html-to-pdfmake, so an `undefined` value throws "undefined is not valid
  // JSON". Never include a key whose value may be undefined — spread it in only
  // when set (see h1's alignment below).
  return {
    h1: { fontSize: 25, bold: true, color: t.headingColor, margin: [0, 14, 0, 8], ...(t.h1Align ? { alignment: t.h1Align } : {}) },
    h2: { fontSize: 19, bold: true, color: t.headingColor, margin: [0, 14, 0, 6] },
    h3: { fontSize: 15, bold: true, color: t.headingColor, margin: [0, 12, 0, 4] },
    h4: { fontSize: 13, bold: true, color: t.headingColor, margin: [0, 10, 0, 4] },
    h5: { fontSize: 12, bold: true, color: t.headingColor, margin: [0, 8, 0, 4] },
    h6: { fontSize: 11, bold: true, color: t.color, margin: [0, 8, 0, 4] },
    p: { margin: [0, 0, 0, 8] },
    a: { color: t.link, decoration: 'underline' },
    th: { bold: true, fillColor: t.thFill, color: t.color, margin: [0, 3, 0, 3] },
    td: { margin: [0, 3, 0, 3] },
    code: { color: t.codeColor, fontSize: 10 },
    pre: { color: t.color, fontSize: 9.5, margin: [0, 4, 0, 8], preserveLeadingSpaces: true },
    blockquote: { italics: true, color: t.quoteColor, margin: [10, 4, 0, 8] },
    li: { margin: [0, 2, 0, 2] },
    table: { marginBottom: 8 },
  };
}

// Page dimensions in PDF points, for the dark-theme full-page background.
const PAGE_DIMS = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

// pdfmake never breaks a line in the middle of an unbroken run of characters, so
// long tokens (URLs, paths, identifiers like `x:topposts:reminder-apps`) force
// it into pathologically slow layout — minutes on a large doc. We insert a
// zero-width space after every long run of non-space characters so pdfmake has a
// legal break point. We only touch TEXT nodes (never tag markup) by parsing the
// HTML, so attributes/structure are untouched.
function softenHtmlLongTokens(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);
  let injected = 0;
  for (const tn of textNodes) {
    const before = tn.nodeValue ?? '';
    const after = before.replace(/(\S{16})(?=\S)/g, (m) => {
      injected++;
      return m + '​';
    });
    if (after !== before) tn.nodeValue = after;
  }
  log('softened long tokens', { breakpointsInjected: injected });
  return doc.body.innerHTML;
}

export async function generatePdf(
  htmlContent: string,
  options: PdfOptions
): Promise<void> {
  const { theme } = options;
  const sizeKey = options.pageSize || 'a4';
  const pageSize = sizeKey === 'letter' ? 'LETTER' : 'A4';
  const filename = options.filename || 'document.pdf';
  const t = THEME_TOKENS[theme];

  log('start (vector/pdfmake)', { theme, pageSize, htmlLength: htmlContent.length });

  // Dynamic import — keep pdfmake out of the SSR/bundle entry.
  const [pdfMakeMod, vfsMod, htmlToPdfmakeMod] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
    import('html-to-pdfmake'),
  ]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const pdfMake: any = (pdfMakeMod as any).default ?? pdfMakeMod;
  const vfsRaw: any = vfsMod as any;
  // vfs_fonts exports the font file-map directly (module.exports = vfs); under
  // ESM interop it lands on `.default`.
  const vfs = vfsRaw.default ?? vfsRaw.vfs ?? vfsRaw;
  // pdfmake 0.3 registers fonts via addVirtualFileSystem() — assigning
  // `pdfMake.vfs` (the 0.2 API) is ignored, so Roboto-Regular.ttf isn't found.
  if (typeof pdfMake.addVirtualFileSystem === 'function') {
    pdfMake.addVirtualFileSystem(vfs);
  } else {
    pdfMake.vfs = vfs;
  }
  const htmlToPdfmake: any = (htmlToPdfmakeMod as any).default ?? htmlToPdfmakeMod;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const softened = softenHtmlLongTokens(htmlContent);

  let content;
  try {
    const t0 = performance.now();
    content = htmlToPdfmake(softened, {
      window,
      defaultStyles: buildDefaultStyles(t),
      // We only ship Roboto, so drop any font-family the HTML carries.
      ignoreStyles: ['font-family'],
      removeExtraBlanks: true,
    });
    log('html-to-pdfmake done', {
      ms: Math.round(performance.now() - t0),
      blocks: Array.isArray(content) ? content.length : 'n/a',
    });
  } catch (err) {
    log('html-to-pdfmake FAILED', err);
    throw new Error(`Could not convert content to PDF: ${err instanceof Error ? err.message : String(err)}`);
  }

  // pdfmake/Roboto carries no emoji glyphs, so any emoji would render as a "tofu"
  // box. Strip emoji (and the whitespace they leave) so the PDF is clean — no box,
  // no orphaned gap.
  applyEmojiFont(content);

  const dims = PAGE_DIMS[sizeKey];
  const docDefinition = {
    pageSize,
    pageMargins: [42, 42, 42, 50] as [number, number, number, number],
    defaultStyle: {
      font: 'Roboto',
      fontSize: t.fontSize,
      lineHeight: t.lineHeight,
      color: t.color,
    },
    // Full-bleed page background for the dark theme.
    background: t.pageColor
      ? () => ({
          canvas: [
            { type: 'rect', x: 0, y: 0, w: dims.width, h: dims.height, color: t.pageColor },
          ],
        })
      : undefined,
    content,
  };

  log('building pdf…');
  const tBuild = performance.now();
  // pdfmake 0.3 changed getBlob/download to ASYNC methods that RETURN a Promise
  // — the 0.2-era callback argument is silently ignored (which is why both
  // `.download(name, cb)` and `.getBlob(cb)` left the button hanging: the
  // callback never fired). We await the returned Promise and trigger the
  // download ourselves, so the loading state clears exactly when it completes.
  // Still one click, no print dialog, no watermark.
  let blob: Blob;
  try {
    blob = await pdfMake.createPdf(docDefinition).getBlob();
  } catch (err) {
    log('createPdf FAILED', err);
    throw err instanceof Error ? err : new Error(String(err));
  }
  log('pdf built', { ms: Math.round(performance.now() - tBuild), bytes: blob.size });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  log('done — downloaded', filename);
}
