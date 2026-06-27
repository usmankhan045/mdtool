// IMPORTANT: Never import html2pdf at the top level — SSR will crash
// Always use dynamic import inside the function

export type ThemeId = 'github' | 'academic' | 'minimal' | 'dark';

export interface PdfOptions {
  theme: ThemeId;
  filename?: string;
  pageSize?: 'a4' | 'letter';
}

// Theme CSS strings (loaded client-side only)
// All selectors are scoped to .pdf-container to prevent leaking into the page
const THEMES: Record<ThemeId, string> = {
  github: `
    .pdf-container { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; line-height: 1.6; color: #24292e; padding: 32px; }
    .pdf-container h1, .pdf-container h2, .pdf-container h3, .pdf-container h4, .pdf-container h5, .pdf-container h6 { line-height: 1.25; font-weight: 600; margin: 24px 0 16px; }
    .pdf-container h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    .pdf-container h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    .pdf-container h3 { font-size: 1.25em; }
    .pdf-container h4 { font-size: 1em; }
    .pdf-container h5 { font-size: 0.875em; }
    .pdf-container h6 { font-size: 0.85em; color: #6a737d; }
    .pdf-container p { margin: 0 0 16px; }
    .pdf-container code { background: #f6f8fa; border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; font-family: 'SFMono-Regular', Consolas, monospace; }
    .pdf-container pre { background: #f6f8fa; border-radius: 6px; padding: 16px; overflow: auto; }
    .pdf-container pre code { background: transparent; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    .pdf-container th, .pdf-container td { border: 1px solid #dfe2e5; padding: 6px 13px; line-height: 1.4; vertical-align: top; }
    .pdf-container th { background: #f6f8fa; font-weight: 600; }
    .pdf-container tr:nth-child(even) { background: #f6f8fa; }
    .pdf-container blockquote { border-left: 4px solid #dfe2e5; color: #6a737d; margin: 0; padding: 0 16px; }
    .pdf-container img { max-width: 100%; }
    .pdf-container .hljs { background: #f6f8fa; }
  `,
  academic: `
    .pdf-container { font-family: Georgia, serif; font-size: 12pt; line-height: 1.8; color: #000; padding: 40px; }
    .pdf-container h1, .pdf-container h2, .pdf-container h3, .pdf-container h4, .pdf-container h5, .pdf-container h6 { line-height: 1.25; font-weight: bold; }
    .pdf-container h1 { font-size: 18pt; text-align: center; margin: 0 0 8px; }
    .pdf-container h2 { font-size: 14pt; margin: 20px 0 10px; }
    .pdf-container h3 { font-size: 12pt; margin: 16px 0 8px; }
    .pdf-container h4 { font-size: 12pt; font-style: italic; margin: 14px 0 6px; }
    .pdf-container h5, .pdf-container h6 { font-size: 11pt; margin: 12px 0 6px; }
    .pdf-container p { margin: 0 0 12px; }
    .pdf-container code { font-family: 'Courier New', monospace; font-size: 10pt; background: #f5f5f5; padding: 1px 4px; }
    .pdf-container pre { background: #f5f5f5; padding: 12px; border: 1px solid #ddd; }
    .pdf-container pre code { background: transparent; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    .pdf-container th, .pdf-container td { border: 1px solid #333; padding: 8px; text-align: left; line-height: 1.4; vertical-align: top; }
    .pdf-container th { background: #f0f0f0; }
    .pdf-container blockquote { border-left: 3px solid #ccc; padding-left: 16px; color: #555; margin-left: 0; }
  `,
  minimal: `
    .pdf-container { font-family: 'Helvetica Neue', Helvetica, sans-serif; font-size: 15px; line-height: 1.7; color: #333; padding: 28px; }
    .pdf-container h1, .pdf-container h2, .pdf-container h3, .pdf-container h4, .pdf-container h5, .pdf-container h6 { line-height: 1.25; font-weight: 600; margin: 24px 0 12px; }
    .pdf-container h1 { font-size: 1.8em; margin-top: 20px; }
    .pdf-container h2 { font-size: 1.4em; }
    .pdf-container h3 { font-size: 1.2em; }
    .pdf-container h4 { font-size: 1.05em; }
    .pdf-container h5 { font-size: 1em; }
    .pdf-container h6 { font-size: 0.9em; color: #666; }
    .pdf-container p { margin: 0 0 14px; }
    .pdf-container code { font-family: 'SFMono-Regular', monospace; font-size: 85%; background: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; }
    .pdf-container pre { background: #f8f8f8; padding: 20px; border-radius: 8px; }
    .pdf-container pre code { background: transparent; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; }
    .pdf-container th, .pdf-container td { border-bottom: 2px solid #333; padding: 8px; text-align: left; line-height: 1.4; vertical-align: top; }
    .pdf-container th { background: #f0e0e0; }
    .pdf-container blockquote { border-left: 3px solid #ccc; padding-left: 16px; color: #666; margin-left: 0; }
  `,
  dark: `
    .pdf-container { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; line-height: 1.6; color: #e6edf3; background: #0d1117; padding: 32px; }
    .pdf-container h1, .pdf-container h2, .pdf-container h3, .pdf-container h4, .pdf-container h5, .pdf-container h6 { color: #f0f6fc; line-height: 1.25; font-weight: 600; margin: 24px 0 16px; }
    .pdf-container h1 { font-size: 2em; border-bottom: 1px solid #30363d; padding-bottom: 8px; }
    .pdf-container h2 { font-size: 1.5em; border-bottom: 1px solid #30363d; padding-bottom: 6px; }
    .pdf-container h3 { font-size: 1.25em; }
    .pdf-container h4 { font-size: 1em; }
    .pdf-container h5 { font-size: 0.875em; }
    .pdf-container h6 { font-size: 0.85em; color: #8b949e; }
    .pdf-container p { margin: 0 0 16px; }
    .pdf-container code { background: #161b22; color: #ff7b72; border-radius: 3px; padding: 2px 6px; font-family: 'SFMono-Regular', monospace; }
    .pdf-container pre { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 16px; }
    .pdf-container pre code { background: transparent; color: #e6edf3; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; }
    .pdf-container th, .pdf-container td { border: 1px solid #30363d; padding: 8px 12px; line-height: 1.4; vertical-align: top; }
    .pdf-container th { background: #161b22; }
    .pdf-container tr:nth-child(even) { background: #161b22; }
    .pdf-container blockquote { border-left: 4px solid #3b82f6; padding-left: 16px; color: #8b949e; margin: 0; }
    .pdf-container a { color: #58a6ff; }
  `,
};

// Highlight.js GitHub theme CSS — inlined so we don't need a network request
// This avoids the race condition where html2canvas captures before the
// external <link> stylesheet has finished loading.
const HLJS_GITHUB_CSS = `
.hljs{color:#24292e;background:#f6f8fa}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background:#f0fff4}.hljs-deletion{color:#b31d28;background:#ffeef0}
`;

// Highlight.js Dark theme CSS — inlined for dark theme
const HLJS_DARK_CSS = `
.hljs{color:#abb2bf;background:#282c34}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#e6c07b}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
`;


// Log everything in dev so a failed export is diagnosable from the console.
const DEBUG =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';
const log = (...args: unknown[]) => DEBUG && console.log('[pdf]', ...args);

// Sample a rendered canvas to detect a blank/uniform result (the classic
// html2canvas "empty PDF" symptom). Returns whether every sampled pixel is the
// same colour — true means the canvas painted nothing meaningful.
function inspectCanvas(canvas: HTMLCanvasElement) {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');
  if (!ctx || !width || !height) {
    return { width, height, uniform: true, sampled: 0, reason: 'no-context-or-zero-size' };
  }
  const data = ctx.getImageData(0, 0, width, height).data;
  // Stride by a prime so we sweep the whole bitmap without scanning every pixel.
  const stride = 4 * 9973;
  let sampled = 0;
  let uniform = true;
  let first = -1;
  for (let i = 0; i < data.length; i += stride) {
    const key = (data[i] << 24) | (data[i + 1] << 16) | (data[i + 2] << 8) | data[i + 3];
    if (first === -1) first = key;
    else if (key !== first) uniform = false;
    sampled++;
  }
  return { width, height, uniform, sampled, reason: uniform ? 'all-pixels-identical' : 'ok' };
}

export async function generatePdf(
  htmlContent: string,
  options: PdfOptions
): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;
  log('start', { theme: options.theme, pageSize: options.pageSize, htmlLength: htmlContent.length });

  // Inject theme CSS into <head> so selectors work correctly on the content element
  const styleEl = document.createElement('style');
  styleEl.id = 'pdf-theme-style';
  styleEl.textContent = THEMES[options.theme];
  document.head.appendChild(styleEl);

  // Inject highlight.js CSS — inlined to avoid race conditions with external stylesheets.
  // Previously a <link> to cdnjs was appended but html2canvas would capture the element
  // BEFORE the network request for the stylesheet completed, producing an empty/unstyled PDF.
  const hljsStyle = document.createElement('style');
  hljsStyle.id = 'pdf-hljs-style';
  hljsStyle.textContent = options.theme === 'dark' ? HLJS_DARK_CSS : HLJS_GITHUB_CSS;
  document.head.appendChild(hljsStyle);

  // Render from a REAL, laid-out element. html2pdf.js v0.14+ clones the element
  // we pass (deepCloneBasic) and renders the CLONE in its own overlay — but
  // html2canvas is unreliable when the source element is detached from the
  // document: it can measure a height of 0 and emit a COMPLETELY BLANK PDF.
  // So we DO attach the element, inside a visually-hidden HOST wrapper.
  //
  // Critical: the offscreen/hidden styles live on the HOST, never on the
  // .pdf-container element itself. If they were on the element, the clone would
  // inherit `left:-9999px` / opacity and render offscreen — blank again. The
  // host is 0×0 with overflow:hidden, so the content lays out at full height
  // (the child's width is fixed and its height is unconstrained) but is never
  // painted on screen, so the user sees no flash.
  const MARGIN_MM = 15;
  const MM_TO_PX = 96 / 25.4;
  // html2pdf.js's container is always forced to `pageSize.inner.width` (the
  // printable area, i.e. page width minus margins) regardless of any
  // width/windowWidth option, and it never sets overflow:hidden. If our
  // content element is wider than that — e.g. sized to the FULL page width
  // instead of the margin-adjusted printable width — it overflows the
  // container box and html2canvas's capture (bound to the container) crops
  // off whatever sticks out, cutting content off on the right.
  const PAGE_WIDTH_MM: Record<'a4' | 'letter', number> = { a4: 210, letter: 215.9 };
  const pageWidthMm = PAGE_WIDTH_MM[options.pageSize || 'a4'];
  const contentWidthPx = Math.floor((pageWidthMm - MARGIN_MM * 2) * MM_TO_PX);

  const host = document.createElement('div');
  host.style.cssText =
    'position:fixed; top:0; left:0; width:0; height:0; overflow:hidden; opacity:0; z-index:-1; pointer-events:none;';

  const element = document.createElement('div');
  element.className = 'pdf-container';
  element.innerHTML = htmlContent;
  element.style.width = `${contentWidthPx}px`;

  host.appendChild(element);
  document.body.appendChild(host);

  // After layout, the element must have real, non-zero dimensions — a zero
  // height here is the upstream cause of a blank PDF.
  const rect = element.getBoundingClientRect();
  log('element laid out', {
    contentWidthPx,
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
    scrollHeight: element.scrollHeight,
    rectWidth: Math.round(rect.width),
    rectHeight: Math.round(rect.height),
    childNodes: element.childNodes.length,
  });
  if (element.offsetHeight === 0 || element.offsetWidth === 0) {
    log('WARNING: element has zero size before render — output will be blank');
  }

  const config = {
    margin: [MARGIN_MM, MARGIN_MM, MARGIN_MM, MARGIN_MM] as [number, number, number, number],
    filename: options.filename || 'document.pdf',
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: DEBUG,
    },
    jsPDF: {
      unit: 'mm',
      format: options.pageSize || 'a4',
      orientation: 'portrait' as const,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    // Run the pipeline in steps so we can inspect the intermediate canvas
    // instead of blindly saving whatever (possibly blank) result comes out.
    const worker = html2pdf().set(config).from(element);

    log('rendering canvas…');
    await worker.toCanvas();
    const canvas = (await worker.get('canvas')) as HTMLCanvasElement | undefined;

    if (!canvas) {
      throw new Error('html2canvas produced no canvas (worker.get("canvas") was empty)');
    }
    const report = inspectCanvas(canvas);
    log('canvas rendered', report);
    if (report.uniform) {
      throw new Error(
        `PDF render is blank — canvas ${report.width}×${report.height}, every sampled pixel identical (${report.reason}). ` +
        `element ${element.offsetWidth}×${element.offsetHeight}.`
      );
    }

    log('building pdf + saving…');
    await worker.save();
    log('done — saved', config.filename);
  } catch (err) {
    log('FAILED', err);
    throw err;
  } finally {
    document.body.removeChild(host);
    document.head.removeChild(styleEl);
    document.head.removeChild(hljsStyle);
  }
}