// IMPORTANT: mermaid is NEVER imported at the top level.
// It uses browser APIs (SVG, DOM) and will crash on the server.
// Always use dynamic import inside each function.

type MermaidApi = typeof import('mermaid').default;

let mermaidPromise: Promise<MermaidApi> | null = null;

// One shared, lazily-initialised mermaid instance.
//
// htmlLabels:false makes mermaid draw labels as real SVG <text> instead of HTML
// inside <foreignObject>. foreignObject can't be drawn by pdfmake's SVG renderer,
// so this is what lets the SAME SVG appear in the live preview and, as vector
// graphics, in the PDF.
async function getMermaid(): Promise<MermaidApi> {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((mod) => {
      const mermaid = mod.default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose', // needed to render diagrams inside iframes / srcdoc
        fontFamily: 'Helvetica, Arial, sans-serif',
        htmlLabels: false,
        flowchart: { htmlLabels: false },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}

export async function initMermaid(): Promise<void> {
  await getMermaid();
}

export type MermaidTheme = 'default' | 'dark' | 'neutral';

const svgCache = new Map<string, string>();
let renderSeq = 0;

// Render one diagram source to an SVG string (cached by theme + source).
// Returns null when the diagram has a syntax error.
export async function renderMermaidSvg(
  source: string,
  theme: MermaidTheme = 'default'
): Promise<string | null> {
  const key = `${theme}\u0000${source}`;
  const cached = svgCache.get(key);
  if (cached) return cached;
  const mermaid = await getMermaid();
  const id = `mmd-${Date.now().toString(36)}-${renderSeq++}`;
  // Per-diagram theme via an init directive (unless the author set their own).
  const withTheme = /^\s*%%\{/.test(source)
    ? source
    : `%%{init: {"theme": "${theme}"}}%%\n${source}`;
  try {
    const { svg } = await mermaid.render(id, withTheme);
    if (svgCache.size > 50) svgCache.clear();
    svgCache.set(key, svg);
    return svg;
  } catch (err) {
    console.error('Mermaid render failed:', err);
    // mermaid leaves an error element behind in <body>; clean it up.
    document.getElementById(id)?.remove();
    document.getElementById(`d${id}`)?.remove();
    return null;
  }
}

// marked outputs mermaid fences as <pre><code class="language-mermaid">.
function mermaidBlocks(root: ParentNode): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('code.language-mermaid'));
}

// In-place: replace every mermaid code block inside `container` with its SVG.
// Failed diagrams keep the original code block.
export async function renderMermaidBlocks(
  container: HTMLElement | Document,
  theme: MermaidTheme = 'default'
): Promise<number> {
  const blocks = mermaidBlocks(container);
  let rendered = 0;
  for (const codeEl of blocks) {
    const source = codeEl.textContent?.trim() ?? '';
    if (!source) continue;
    const svg = await renderMermaidSvg(source, theme);
    if (!svg) continue;
    const ownerDoc = codeEl.ownerDocument;
    const wrapper = ownerDoc.createElement('div');
    wrapper.className = 'mermaid-diagram';
    wrapper.innerHTML = svg;
    const pre = codeEl.closest('pre') ?? codeEl;
    pre.replaceWith(wrapper);
    rendered++;
  }
  return rendered;
}

// String → string variant for the live preview: returns the HTML with every
// mermaid block replaced by its rendered SVG.
export async function renderMermaidInHtml(
  html: string,
  theme: MermaidTheme = 'default'
): Promise<string> {
  if (!html.includes('language-mermaid')) return html;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const n = await renderMermaidBlocks(doc, theme);
  return n > 0 ? doc.body.innerHTML : html;
}

// Presentation properties copied from computed CSS onto SVG attributes. Mermaid
// styles its diagrams with a <style> block + classes, which pdfmake's SVG renderer
// (svg-to-pdfkit) ignores — so for the PDF we bake the computed values in.
const SVG_PROPS = [
  'fill',
  'fill-opacity',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'stroke-dasharray',
  'stroke-linecap',
  'stroke-linejoin',
  'opacity',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'text-anchor',
  'dominant-baseline',
];

const SKIP_TAGS = new Set(['style', 'title', 'desc', 'script', 'defs', 'svg']);

// Make a mermaid SVG self-contained for pdfmake: resolve CSS into attributes,
// drop <style>, and give the root numeric width/height from its viewBox.
// Must run in a browser (needs layout to compute styles).
export function inlineSvgStyles(svgMarkup: string): { svg: string; width: number; height: number } | null {
  const host = document.createElement('div');
  host.style.cssText = 'position:absolute;left:-10000px;top:0;width:1200px;visibility:hidden;';
  host.innerHTML = svgMarkup;
  document.body.appendChild(host);
  try {
    const svg = host.querySelector('svg');
    if (!svg) return null;
    // Two passes: snapshot every computed style FIRST, then rewrite. Removing a
    // class early would break descendant selectors (e.g. `text.actor > tspan`).
    const all = Array.from(svg.querySelectorAll<SVGElement>('*')).filter(
      (el) => !SKIP_TAGS.has(el.tagName.toLowerCase())
    );
    const snapshots = all.map((el) => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none') return null;
      const props: [string, string][] = [];
      for (const prop of SVG_PROPS) {
        const v = cs.getPropertyValue(prop);
        if (!v || v === 'normal' || v === 'auto') continue;
        props.push([prop, v]);
      }
      return props;
    });
    all.forEach((el, i) => {
      const props = snapshots[i];
      if (!props) {
        el.remove();
        return;
      }
      for (const [prop, v] of props) el.setAttribute(prop, v);
      el.removeAttribute('class');
      el.removeAttribute('style');
    });
    svg.querySelectorAll('style').forEach((s) => s.remove());
    // svg-to-pdfkit paints <tspan> runs with the parent <text>'s fill/stroke, but
    // mermaid often colors the tspan (e.g. `text.actor > tspan { fill: black }`
    // while `text.actor` itself is the box color). Hoist the tspan paint up.
    svg.querySelectorAll('text').forEach((text) => {
      const span = text.querySelector('tspan');
      if (!span) return;
      for (const prop of ['fill', 'stroke', 'stroke-width', 'font-weight', 'font-style']) {
        const v = span.getAttribute(prop);
        if (v) text.setAttribute(prop, v);
      }
    });

    const vb = (svg.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
    let width = vb.length === 4 ? vb[2] : 0;
    let height = vb.length === 4 ? vb[3] : 0;
    if (!width || !height) {
      const box = svg.getBoundingClientRect();
      width = box.width;
      height = box.height;
    }
    if (!width || !height) return null;
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.removeAttribute('style');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return { svg: svg.outerHTML, width, height };
  } finally {
    host.remove();
  }
}

// Rasterise an SVG to a PNG data URL (fallback when vector embedding fails).
export function svgToPngDataUrl(svgMarkup: string, width: number, height: number, scale = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(width * scale);
        canvas.height = Math.ceil(height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('no 2d context');
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      } catch (e) {
        reject(e);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('SVG rasterisation failed'));
    };
    img.src = url;
  });
}
