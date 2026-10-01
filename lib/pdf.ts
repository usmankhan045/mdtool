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
// Pipeline (generatePdf):
//   1. DOM pre-pass on the parsed-Markdown HTML:
//      - Mermaid code blocks -> rendered SVG (vector), styles baked in
//      - <img> -> data URLs (remote images fetched; CORS failures become a note)
//      - hljs token classes -> inline colors per theme
//      - page-break markers -> pageBreak on the following block
//   2. html-to-pdfmake -> pdfmake content tree
//   3. tree post-pass: code blocks boxed with a background, diagram/image sizing
//   4. pdfmake -> Blob -> download
//
// IMPORTANT: pdfmake is browser-only and heavy — always dynamic-import it inside
// the function so SSR never touches it.

import { applyEmojiFont } from './emoji';
import { parseMarkdown } from './markdown';

export type ThemeId = 'github' | 'academic' | 'minimal' | 'dark';
export type PageSizeId = 'a4' | 'letter';

export interface PdfOptions {
  theme: ThemeId;
  filename?: string;
  pageSize?: PageSizeId;
}

// Log in dev so a failed export is diagnosable from the console.
const DEBUG =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';
const log = (...args: unknown[]) => DEBUG && console.log('[pdf]', ...args);

/* ------------------------------------------------------------------------- */
/* Page breaks (shared by the live preview and the PDF)                       */
/* ------------------------------------------------------------------------- */

// Canonical marker every supported syntax is normalised to. The preview styles it
// as a dashed "page break" rule; the PDF turns it into a real page break.
export const PAGE_BREAK_HTML = '<div class="page-break" aria-hidden="true"></div>';

// Markdown-level: a line that is only `\pagebreak`, `\newpage` or
// `<!-- pagebreak -->` (outside fenced code) becomes the canonical marker, padded
// with blank lines so marked treats it as its own HTML block.
export function preprocessPageBreaks(markdown: string): string {
  const lines = markdown.split('\n');
  let fence: { ch: string; len: number } | null = null;
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const f = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (f) {
      const ch = f[1][0];
      const len = f[1].length;
      if (!fence) fence = { ch, len };
      else if (ch === fence.ch && len >= fence.len && /^ {0,3}(`{3,}|~{3,})\s*$/.test(line)) fence = null;
      continue;
    }
    if (fence) continue;
    if (/^ {0,3}(\\(pagebreak|newpage)|<!--\s*page-?break\s*-->)\s*$/i.test(line)) {
      lines[i] = `\n${PAGE_BREAK_HTML}\n`;
      changed = true;
    }
  }
  return changed ? lines.join('\n') : markdown;
}

// HTML-level: normalise page-break markers that arrive as raw HTML.
export function normalizePageBreaksHtml(html: string): string {
  return html
    .replace(/<!--\s*page-?break\s*-->/gi, PAGE_BREAK_HTML)
    .replace(
      /<div\b[^>]*\bstyle\s*=\s*["'][^"']*(?:page-break-(?:after|before)|break-(?:after|before))\s*:\s*(?:always|page)[^"']*["'][^>]*>\s*<\/div>/gi,
      PAGE_BREAK_HTML
    )
    .replace(/<div\s+class\s*=\s*["']page-break["']\s*>\s*<\/div>/gi, PAGE_BREAK_HTML)
    .replace(/<p>\s*\\(?:pagebreak|newpage)\s*<\/p>/gi, PAGE_BREAK_HTML);
}

// Markdown -> HTML for the PDF tool (preview + download share this).
export function markdownToPdfHtml(markdown: string): string {
  return normalizePageBreaksHtml(parseMarkdown(preprocessPageBreaks(markdown)));
}

/* ------------------------------------------------------------------------- */
/* Themes                                                                     */
/* ------------------------------------------------------------------------- */

interface ThemeTokens {
  fontSize: number;
  lineHeight: number;
  color: string; // body text
  headingColor: string;
  link: string;
  thFill: string; // table header background
  tableBorder: string;
  codeColor: string; // inline code text
  codeBg: string; // code block / inline code background
  codeBorder: string;
  quoteColor: string;
  pageColor?: string; // full-page background (dark theme)
  h1Align?: 'center';
  mermaidTheme: 'default' | 'dark' | 'neutral';
  hljs: HljsPalette;
}

// hljs token class -> color (+ optional italic/bold). Lookup is by the first
// matching class on a <span class="hljs-…">.
type HljsPalette = Record<string, { color: string; italic?: boolean; bold?: boolean }>;

const pal = (
  p: { kw: string; title: string; str: string; num: string; built: string; com: string; name: string; subst: string; add: string; del: string; bullet: string }
): HljsPalette => ({
  'hljs-keyword': { color: p.kw },
  'hljs-doctag': { color: p.kw },
  'hljs-template-tag': { color: p.kw },
  'hljs-template-variable': { color: p.kw },
  'hljs-type': { color: p.kw },
  'hljs-title': { color: p.title },
  'hljs-attr': { color: p.num },
  'hljs-attribute': { color: p.num },
  'hljs-literal': { color: p.num },
  'hljs-meta': { color: p.num },
  'hljs-number': { color: p.num },
  'hljs-operator': { color: p.num },
  'hljs-variable': { color: p.num },
  'hljs-selector-attr': { color: p.num },
  'hljs-selector-class': { color: p.num },
  'hljs-selector-id': { color: p.num },
  'hljs-regexp': { color: p.str },
  'hljs-string': { color: p.str },
  'hljs-built_in': { color: p.built },
  'hljs-symbol': { color: p.built },
  'hljs-params': { color: p.subst },
  'hljs-comment': { color: p.com, italic: true },
  'hljs-code': { color: p.com },
  'hljs-formula': { color: p.com },
  'hljs-name': { color: p.name },
  'hljs-quote': { color: p.name },
  'hljs-selector-tag': { color: p.name },
  'hljs-selector-pseudo': { color: p.name },
  'hljs-tag': { color: p.subst },
  'hljs-subst': { color: p.subst },
  'hljs-section': { color: p.num, bold: true },
  'hljs-bullet': { color: p.bullet },
  'hljs-addition': { color: p.add },
  'hljs-deletion': { color: p.del },
  'hljs-strong': { color: p.subst, bold: true },
  'hljs-emphasis': { color: p.subst, italic: true },
});

const THEME_TOKENS: Record<ThemeId, ThemeTokens> = {
  github: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#24292e',
    headingColor: '#24292e',
    link: '#0969da',
    thFill: '#f6f8fa',
    tableBorder: '#d0d7de',
    codeColor: '#24292e',
    codeBg: '#f6f8fa',
    codeBorder: '#e1e4e8',
    quoteColor: '#6a737d',
    mermaidTheme: 'default',
    // github.css (highlight.js)
    hljs: pal({ kw: '#d73a49', title: '#6f42c1', str: '#032f62', num: '#005cc5', built: '#e36209', com: '#6a737d', name: '#22863a', subst: '#24292e', add: '#22863a', del: '#b31d28', bullet: '#735c0f' }),
  },
  academic: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#111111',
    headingColor: '#000000',
    link: '#1a4f8b',
    thFill: '#f0f0f0',
    tableBorder: '#999999',
    codeColor: '#333333',
    codeBg: '#f7f7f7',
    codeBorder: '#dddddd',
    quoteColor: '#555555',
    h1Align: 'center',
    mermaidTheme: 'neutral',
    // restrained, print-friendly palette
    hljs: pal({ kw: '#7f0055', title: '#1a237e', str: '#2a00ff', num: '#116644', built: '#7f0055', com: '#3f7f5f', name: '#117700', subst: '#111111', add: '#116644', del: '#aa1111', bullet: '#555555' }),
  },
  minimal: {
    fontSize: 11,
    lineHeight: 1.45,
    color: '#333333',
    headingColor: '#111111',
    link: '#2563eb',
    thFill: '#f0e0e0',
    tableBorder: '#dddddd',
    codeColor: '#444444',
    codeBg: '#f8f8f8',
    codeBorder: '#eeeeee',
    quoteColor: '#666666',
    mermaidTheme: 'default',
    // atom-one-light
    hljs: pal({ kw: '#a626a4', title: '#4078f2', str: '#50a14f', num: '#986801', built: '#c18401', com: '#a0a1a7', name: '#e45649', subst: '#383a42', add: '#50a14f', del: '#e45649', bullet: '#4078f2' }),
  },
  dark: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#e6edf3',
    headingColor: '#f0f6fc',
    link: '#58a6ff',
    thFill: '#161b22',
    tableBorder: '#30363d',
    codeColor: '#ff7b72',
    codeBg: '#161b22',
    codeBorder: '#30363d',
    quoteColor: '#8b949e',
    pageColor: '#0d1117',
    mermaidTheme: 'dark',
    // github-dark.css (highlight.js)
    hljs: pal({ kw: '#ff7b72', title: '#d2a8ff', str: '#a5d6ff', num: '#79c0ff', built: '#ffa657', com: '#8b949e', name: '#7ee787', subst: '#c9d1d9', add: '#aff5b4', del: '#ffdcd7', bullet: '#f2cc60' }),
  },
};

// Mermaid theme to use for a given PDF theme (the preview uses the same).
export function mermaidThemeFor(theme: ThemeId): 'default' | 'dark' | 'neutral' {
  return THEME_TOKENS[theme].mermaidTheme;
}

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
    code: { color: t.codeColor, fontSize: 9.5 },
    pre: { color: t.color, fontSize: 9, lineHeight: 1.25, margin: [0, 0, 0, 0], preserveLeadingSpaces: true },
    blockquote: { italics: true, color: t.quoteColor, margin: [10, 4, 0, 8] },
    li: { margin: [0, 2, 0, 2] },
    table: { marginBottom: 8 },
  };
}

// Page dimensions in PDF points.
const PAGE_DIMS: Record<PageSizeId, { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};
const PAGE_MARGINS: [number, number, number, number] = [42, 42, 42, 50];

/* ------------------------------------------------------------------------- */
/* DOM pre-pass                                                               */
/* ------------------------------------------------------------------------- */

// Characters the standard (AFM, WinAnsi) Courier font can draw. Code blocks that
// only use these get a real monospace font; anything else (CJK, arrows, box
// drawing…) stays in Roboto so nothing turns into garbage glyphs.
const COURIER_SAFE = /^[\t\n\r\x20-\x7e\u00a0-\u00ff]*$/;

function setPdfmakeData(el: Element, data: Record<string, unknown>) {
  let existing: Record<string, unknown> = {};
  const raw = el.getAttribute('data-pdfmake');
  if (raw) {
    try {
      existing = JSON.parse(raw);
    } catch {
      /* ignore */
    }
  }
  el.setAttribute('data-pdfmake', JSON.stringify({ ...existing, ...data }));
}

function appendStyle(el: Element, css: string) {
  const prev = el.getAttribute('style');
  el.setAttribute('style', prev ? `${prev.replace(/;?\s*$/, ';')}${css}` : css);
}

// hljs <span class="hljs-…"> -> inline color/italic/bold. Inline styles win over
// html-to-pdfmake's inherited tag defaults, so this is what colors the PDF code.
function colorizeCode(doc: Document, t: ThemeTokens) {
  let colored = 0;
  doc.querySelectorAll<HTMLElement>('span[class*="hljs-"]').forEach((span) => {
    const tok = Array.from(span.classList).find((c) => t.hljs[c]);
    if (!tok) return;
    const s = t.hljs[tok];
    appendStyle(span, `color:${s.color};${s.italic ? 'font-style:italic;' : ''}${s.bold ? 'font-weight:bold;' : ''}`);
    colored++;
  });
  return colored;
}

// Code font + per-block body color + inline-code background.
function prepareCode(doc: Document, t: ThemeTokens) {
  doc.querySelectorAll<HTMLElement>('code').forEach((code) => {
    const inPre = !!code.closest('pre');
    const text = code.textContent ?? '';
    // Long unbroken runs make pdfmake's line breaker pathologically slow; those
    // blocks keep Roboto + zero-width break points (see softenLongTokens).
    const mono = COURIER_SAFE.test(text) && !/\S{70,}/.test(text);
    if (mono) {
      setPdfmakeData(code, { font: 'Courier' });
      code.setAttribute('data-mono', '1');
    }
    if (inPre) appendStyle(code, `color:${t.color}`);
    else appendStyle(code, `background-color:${t.codeBg}`);
  });
}

// Mermaid fences -> vector SVG (or PNG when rasterize=true).
async function prepareMermaid(doc: Document, t: ThemeTokens, contentWidth: number, maxHeight: number, rasterize: boolean) {
  const blocks = Array.from(doc.querySelectorAll<HTMLElement>('code.language-mermaid'));
  if (blocks.length === 0) return 0;
  const { renderMermaidSvg, inlineSvgStyles, svgToPngDataUrl } = await import('./mermaid');
  let n = 0;
  for (const codeEl of blocks) {
    const source = codeEl.textContent?.trim() ?? '';
    if (!source) continue;
    const raw = await renderMermaidSvg(source, t.mermaidTheme);
    if (!raw) continue; // syntax error: keep the code block
    const inlined = inlineSvgStyles(raw);
    if (!inlined) continue;
    // Mermaid draws 16px labels; 0.6 pt/px makes them ~9.6pt, in proportion with
    // 11pt body text. Then fit within the content box.
    let w = inlined.width * 0.6;
    let h = inlined.height * 0.6;
    const scale = Math.min(1, contentWidth / w, maxHeight / h);
    w = Math.floor(w * scale);
    h = Math.floor(h * scale);

    const wrapper = doc.createElement('div');
    wrapper.className = 'mermaid-diagram';
    if (rasterize) {
      const png = await svgToPngDataUrl(inlined.svg, inlined.width, inlined.height, 3);
      const img = doc.createElement('img');
      img.setAttribute('src', png);
      setPdfmakeData(img, { width: w, height: h, alignment: 'center', margin: [0, 6, 0, 10] });
      wrapper.appendChild(img);
    } else {
      wrapper.innerHTML = inlined.svg;
      const svg = wrapper.querySelector('svg');
      if (svg) setPdfmakeData(svg, { width: w, height: h, alignment: 'center', margin: [0, 6, 0, 10] });
    }
    (codeEl.closest('pre') ?? codeEl).replaceWith(wrapper);
    n++;
  }
  return n;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image decode failed'));
    img.src = src;
  });
}

// Fetch every <img> into a PNG/JPEG data URL pdfmake can embed. Images that can't
// be fetched (CORS, 404, offline, file paths) are replaced by a short italic note
// instead of failing the whole export.
async function prepareImages(doc: Document, contentWidth: number) {
  const imgs = Array.from(doc.querySelectorAll<HTMLImageElement>('img'));
  let ok = 0;
  let failed = 0;
  await Promise.all(
    imgs.map(async (img) => {
      if (img.closest('.mermaid-diagram')) return;
      const src = img.getAttribute('src') || '';
      try {
        if (!src) throw new Error('no src');
        let dataUrl: string;
        if (/^data:image\/(png|jpe?g);/i.test(src)) {
          dataUrl = src;
        } else {
          let blob: Blob;
          if (src.startsWith('data:')) {
            blob = await (await fetch(src)).blob();
          } else {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 15000);
            try {
              const res = await fetch(new URL(src, window.location.href).href, { mode: 'cors', signal: ctrl.signal });
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              blob = await res.blob();
            } finally {
              clearTimeout(timer);
            }
          }
          dataUrl = await blobToDataUrl(blob);
          // pdfmake embeds PNG/JPEG only; anything else (SVG, GIF, WebP) is
          // converted to PNG via a canvas.
          if (!/^data:image\/(png|jpe?g);/i.test(dataUrl)) {
            const el = await loadImage(dataUrl);
            const w = el.naturalWidth || 600;
            const h = el.naturalHeight || 400;
            const canvas = document.createElement('canvas');
            const k = /svg/i.test(blob.type) ? 2 : 1;
            canvas.width = w * k;
            canvas.height = h * k;
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('no canvas');
            ctx.drawImage(el, 0, 0, w * k, h * k);
            dataUrl = canvas.toDataURL('image/png');
          }
        }
        const el = await loadImage(dataUrl);
        const natW = el.naturalWidth || 400;
        const natH = el.naturalHeight || 300;
        // Respect an explicit width attribute, else natural px -> pt; cap to page.
        const attrW = Number(img.getAttribute('width')) || 0;
        const svgScale = /svg/i.test(src.split('?')[0]) ? 0.5 : 1;
        let w = (attrW || natW * svgScale) * 0.75;
        w = Math.min(w, contentWidth);
        const h = w * (natH / natW);
        img.setAttribute('src', dataUrl);
        img.removeAttribute('width');
        img.removeAttribute('height');
        img.removeAttribute('style');
        setPdfmakeData(img, { width: Math.round(w), height: Math.round(h), margin: [0, 4, 0, 6] });
        ok++;
      } catch (err) {
        failed++;
        log('image skipped', src.slice(0, 120), err);
        const note = doc.createElement('em');
        note.textContent = `[image: ${img.getAttribute('alt') || src.split('/').pop() || 'unavailable'}]`;
        note.setAttribute('style', 'color:#888888');
        img.replaceWith(note);
      }
    })
  );
  return { ok, failed };
}

// GFM task-list checkboxes: html-to-pdfmake drops <input>, so draw them as
// monospace "[x]" / "[ ]" (Roboto/Courier have no ballot-box glyphs).
function prepareTaskLists(doc: Document) {
  let n = 0;
  doc.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((box) => {
    const mark = doc.createElement('span');
    mark.textContent = box.hasAttribute('checked') ? '[x] ' : '[ ] ';
    setPdfmakeData(mark, { font: 'Courier', bold: true });
    box.replaceWith(mark);
    n++;
  });
  return n;
}

// Page-break markers -> pageBreak:'before' on the next block. The block is wrapped
// in a <div> because html-to-pdfmake routes data-pdfmake on <table>/<hr> into the
// table object instead of the node.
function preparePageBreaks(doc: Document) {
  const markers = Array.from(
    doc.querySelectorAll<HTMLElement>('.page-break, [style*="page-break-after"], [style*="break-after"]')
  ).filter((el) => !el.closest('pre') && !el.closest('svg') && (el.textContent ?? '').trim() === '');
  let n = 0;
  for (const m of markers) {
    let next = m.nextElementSibling;
    // Skip consecutive markers (one break, not blank pages).
    while (next && next.classList.contains('page-break')) next = next.nextElementSibling;
    const hasContentBefore = !!m.previousElementSibling || (m.parentElement && m.parentElement !== doc.body);
    if (next && hasContentBefore) {
      const wrap = doc.createElement('div');
      next.replaceWith(wrap);
      wrap.appendChild(next);
      setPdfmakeData(wrap, { pageBreak: 'before' });
      n++;
    }
    m.remove();
  }
  return n;
}

// pdfmake never breaks a line in the middle of an unbroken run of characters, so
// long tokens (URLs, paths, identifiers like `x:topposts:reminder-apps`) force
// it into pathologically slow layout — minutes on a large doc. We insert a
// zero-width space after every long run of non-space characters so pdfmake has a
// legal break point. Only TEXT nodes are touched; SVG text and Courier code are
// skipped (Courier has no zero-width-space glyph).
function softenLongTokens(doc: Document) {
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = (node as Text).parentElement;
    if (parent && (parent.closest('svg') || parent.closest('[data-mono]'))) continue;
    textNodes.push(node as Text);
  }
  let injected = 0;
  for (const tn of textNodes) {
    const before = tn.nodeValue ?? '';
    const after = before.replace(/(\S{16})(?=\S)/g, (m) => {
      injected++;
      return m + '\u200B';
    });
    if (after !== before) tn.nodeValue = after;
  }
  return injected;
}

/* ------------------------------------------------------------------------- */
/* pdfmake tree post-pass                                                     */
/* ------------------------------------------------------------------------- */

/* eslint-disable @typescript-eslint/no-explicit-any */
type PdfNode = any;

// Walk the content tree, letting `fn` replace nodes.
function mapTree(node: PdfNode, fn: (n: PdfNode) => PdfNode): PdfNode {
  if (Array.isArray(node)) return node.map((c) => mapTree(c, fn));
  if (!node || typeof node !== 'object') return node;
  for (const key of ['stack', 'ul', 'ol', 'columns']) {
    if (Array.isArray(node[key])) node[key] = node[key].map((c: PdfNode) => mapTree(c, fn));
  }
  if (Array.isArray(node.text)) node.text = node.text.map((c: PdfNode) => mapTree(c, fn));
  if (node.table && Array.isArray(node.table.body)) {
    node.table.body = node.table.body.map((row: PdfNode[]) => row.map((c) => mapTree(c, fn)));
  }
  return fn(node);
}

// pdfmake doesn't reliably inherit `font` through several levels of nested inline
// text, so push Courier down to every leaf of a code element.
function propagateFont(node: PdfNode, font?: string): void {
  if (Array.isArray(node)) {
    node.forEach((c) => propagateFont(c, font));
    return;
  }
  if (!node || typeof node !== 'object') return;
  const f = node.font || font;
  if (f && !node.font) node.font = f;
  if (Array.isArray(node.text)) propagateFont(node.text, f);
  if (Array.isArray(node.stack)) propagateFont(node.stack, f);
}

// Markdown tables (+ heading tags): hairline borders in the theme color (pdfmake's default is
// heavy black, which also disappears on the dark theme).
function styleTables(content: PdfNode, t: ThemeTokens) {
  return mapTree(content, (node) => {
    // Tag headings so pageBreakBefore (below) can keep them with the next block.
    if (node && /^H[1-6]$/.test(node.nodeName || '')) node.headlineLevel = 1;
    if (node && node.nodeName === 'TABLE' && node.table && !node.layout) {
      node.layout = {
        hLineWidth: () => 0.6,
        vLineWidth: () => 0.6,
        hLineColor: () => t.tableBorder,
        vLineColor: () => t.tableBorder,
        paddingLeft: () => 6,
        paddingRight: () => 6,
      };
    }
    return node;
  });
}

// Code blocks -> single-cell table with a light background + hairline border.
function boxCodeBlocks(content: PdfNode, t: ThemeTokens) {
  let n = 0;
  const out = mapTree(content, (node) => {
    if (node && node.font === 'Courier') propagateFont(node);
    if (!node || node.nodeName !== 'PRE') return node;
    n++;
    const { pageBreak, ...pre } = node;
    return {
      table: { widths: ['*'], body: [[{ ...pre, margin: [0, 0, 0, 0] }]] },
      layout: {
        fillColor: () => t.codeBg,
        hLineWidth: () => 0.6,
        vLineWidth: () => 0.6,
        hLineColor: () => t.codeBorder,
        vLineColor: () => t.codeBorder,
        paddingLeft: () => 9,
        paddingRight: () => 9,
        paddingTop: () => 7,
        paddingBottom: () => 6,
      },
      margin: [0, 2, 0, 10],
      ...(pageBreak ? { pageBreak } : {}),
    };
  });
  return { content: out, boxed: n };
}

/* ------------------------------------------------------------------------- */
/* Entry point                                                                */
/* ------------------------------------------------------------------------- */

async function buildContent(
  htmlContent: string,
  t: ThemeTokens,
  sizeKey: PageSizeId,
  htmlToPdfmake: any,
  rasterizeDiagrams: boolean
) {
  const dims = PAGE_DIMS[sizeKey];
  const contentWidth = dims.width - PAGE_MARGINS[0] - PAGE_MARGINS[2];
  const contentHeight = dims.height - PAGE_MARGINS[1] - PAGE_MARGINS[3];

  const doc = new DOMParser().parseFromString(normalizePageBreaksHtml(htmlContent), 'text/html');
  const diagrams = await prepareMermaid(doc, t, contentWidth, contentHeight - 40, rasterizeDiagrams);
  const images = await prepareImages(doc, contentWidth);
  const breaks = preparePageBreaks(doc);
  const tasks = prepareTaskLists(doc);
  prepareCode(doc, t);
  const colored = colorizeCode(doc, t);
  const softened = softenLongTokens(doc);
  log('pre-pass', { diagrams, rasterizeDiagrams, images, breaks, tasks, colored, softened });

  const t0 = performance.now();
  const raw = htmlToPdfmake(doc.body.innerHTML, {
    window,
    defaultStyles: buildDefaultStyles(t),
    // We only ship Roboto (+ standard Courier for code), so drop font-family.
    ignoreStyles: ['font-family'],
    removeExtraBlanks: true,
  });
  log('html-to-pdfmake done', { ms: Math.round(performance.now() - t0) });

  // pdfmake/Roboto carries no emoji glyphs, so any emoji would render as a "tofu"
  // box. Strip emoji (and the whitespace they leave) so the PDF is clean.
  applyEmojiFont(raw);
  const { content, boxed } = boxCodeBlocks(styleTables(raw, t), t);
  log('code blocks boxed', boxed);
  return { content, diagrams };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// Chinese/Japanese text: Roboto has no CJK glyphs, so documents that contain CJK
// characters get Noto Sans SC (SIL OFL; subset to GB2312 + common Big5 + kana,
// files in /public/fonts). It is fetched only for those documents, so every
// other PDF is generated exactly as before. Characters outside the subset
// (e.g. Hangul or rare ideographs) still cannot be drawn.
const CJK_RE = /[\u2e80-\u2fdf\u3000-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/;
const CJK_FONT = 'NotoSansSC';
let cjkFontLoaded: Promise<void> | null = null;

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function loadCjkFont(pdfMake: any): Promise<void> {
  if (!cjkFontLoaded) {
    cjkFontLoaded = (async () => {
      const files = { normal: 'NotoSansSC-Regular.ttf', bold: 'NotoSansSC-Bold.ttf' };
      const [regular, bold] = await Promise.all(
        Object.values(files).map(async (name) => {
          const res = await fetch(`/fonts/${name}`);
          if (!res.ok) throw new Error(`CJK font ${name}: HTTP ${res.status}`);
          return arrayBufferToBase64(await res.arrayBuffer());
        })
      );
      pdfMake.addVirtualFileSystem({ [files.normal]: regular, [files.bold]: bold });
      // No italic CJK cut exists; italics fall back to the upright faces.
      pdfMake.addFonts({
        [CJK_FONT]: { normal: files.normal, bold: files.bold, italics: files.normal, bolditalics: files.bold },
      });
    })().catch((err) => {
      cjkFontLoaded = null; // allow a retry on the next export
      throw err;
    });
  }
  return cjkFontLoaded;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function generatePdf(
  htmlContent: string,
  options: PdfOptions
): Promise<void> {
  const { theme } = options;
  const sizeKey: PageSizeId = options.pageSize === 'letter' ? 'letter' : 'a4';
  const pageSize = sizeKey === 'letter' ? 'LETTER' : 'A4';
  const filename = options.filename || 'document.pdf';
  const t = THEME_TOKENS[theme];

  log('start (vector/pdfmake)', { theme, pageSize, htmlLength: htmlContent.length });

  // Dynamic import — keep pdfmake out of the SSR/bundle entry.
  const [pdfMakeMod, vfsMod, courierMod, htmlToPdfmakeMod] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
    // @ts-expect-error — no type declarations for the standard-font container
    import('pdfmake/build/standard-fonts/Courier'),
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
  // Standard PDF Courier (AFM metrics only, no embedded file) for code.
  const courier: any = (courierMod as any).default ?? courierMod;
  if (courier?.vfs && typeof pdfMake.addFontContainer === 'function') {
    pdfMake.addFontContainer(courier);
    // addFonts() merges, but make sure Roboto is still registered.
    if (!pdfMake.fonts?.Roboto) {
      pdfMake.addFonts({
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-MediumItalic.ttf',
        },
      });
    }
  }
  const htmlToPdfmake: any = (htmlToPdfmakeMod as any).default ?? htmlToPdfmakeMod;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  let baseFont = 'Roboto';
  if (CJK_RE.test(htmlContent) && typeof pdfMake.addFonts === 'function') {
    try {
      await loadCjkFont(pdfMake);
      baseFont = CJK_FONT;
      log('CJK text detected, using', CJK_FONT);
    } catch (err) {
      // Fall back to the old behaviour (CJK glyphs missing) rather than failing.
      log('CJK font load FAILED, falling back to Roboto', err);
    }
  }

  const dims = PAGE_DIMS[sizeKey];
  const makeDoc = (content: unknown) => ({
    pageSize,
    pageMargins: PAGE_MARGINS,
    defaultStyle: {
      font: baseFont,
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
    // Keep-with-next for headings: if a heading would be the last thing on a
    // page (e.g. its diagram/table moved to the next page), move it too.
    // pdfmake 0.3 passes an accessor object (not the 0.2 positional arrays).
    // A heading's own text leaves count as "following" nodes, so ignore nodes
    // that sit at the same vertical position as the heading.
    pageBreakBefore: (
      node: { headlineLevel?: number; startPosition?: { top: number } },
      api: {
        getFollowingNodesOnPage: () => { startPosition?: { top: number } }[];
        getNodesOnNextPage: () => unknown[];
      }
    ) => {
      if (node.headlineLevel !== 1) return false;
      const top = node.startPosition?.top ?? 0;
      // Already at the top of a page (e.g. right after a manual page break).
      // (headings carry up to 14pt of top margin)
      if (top <= PAGE_MARGINS[1] + 16) return false;
      if (api.getNodesOnNextPage().length === 0) return false;
      return api.getFollowingNodesOnPage().every((n) => (n.startPosition?.top ?? 0) <= top + 1);
    },
  });

  // pdfmake 0.3 getBlob() returns a Promise (the 0.2 callback is ignored).
  let blob: Blob;
  let built: Awaited<ReturnType<typeof buildContent>>;
  try {
    built = await buildContent(htmlContent, t, sizeKey, htmlToPdfmake, false);
  } catch (err) {
    log('content build FAILED', err);
    throw new Error(`Could not convert content to PDF: ${err instanceof Error ? err.message : String(err)}`);
  }
  const tBuild = performance.now();
  try {
    blob = await pdfMake.createPdf(makeDoc(built.content)).getBlob();
  } catch (err) {
    // A diagram SVG pdfmake can't draw is the most likely culprit — retry once
    // with diagrams rasterised to PNG before giving up.
    if (built.diagrams === 0) {
      log('createPdf FAILED', err);
      throw err instanceof Error ? err : new Error(String(err));
    }
    log('createPdf failed with vector diagrams, retrying rasterised', err);
    built = await buildContent(htmlContent, t, sizeKey, htmlToPdfmake, true);
    blob = await pdfMake.createPdf(makeDoc(built.content)).getBlob();
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
