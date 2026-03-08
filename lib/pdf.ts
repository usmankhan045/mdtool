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
    .pdf-container h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; }
    .pdf-container h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    .pdf-container code { background: #f6f8fa; border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; font-family: 'SFMono-Regular', Consolas, monospace; }
    .pdf-container pre { background: #f6f8fa; border-radius: 6px; padding: 16px; overflow: auto; }
    .pdf-container pre code { background: transparent; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    .pdf-container th, .pdf-container td { border: 1px solid #dfe2e5; padding: 6px 13px; }
    .pdf-container th { background: #f6f8fa; font-weight: 600; }
    .pdf-container tr:nth-child(even) { background: #f6f8fa; }
    .pdf-container blockquote { border-left: 4px solid #dfe2e5; color: #6a737d; margin: 0; padding: 0 16px; }
    .pdf-container img { max-width: 100%; }
    .pdf-container .hljs { background: #f6f8fa; }
  `,
  academic: `
    .pdf-container { font-family: Georgia, serif; font-size: 12pt; line-height: 1.8; color: #000; padding: 40px; }
    .pdf-container h1 { font-size: 18pt; text-align: center; margin-bottom: 8px; }
    .pdf-container h2 { font-size: 14pt; margin-top: 20px; }
    .pdf-container code { font-family: 'Courier New', monospace; font-size: 10pt; background: #f5f5f5; padding: 1px 4px; }
    .pdf-container pre { background: #f5f5f5; padding: 12px; border: 1px solid #ddd; }
    .pdf-container pre code { background: transparent; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    .pdf-container th, .pdf-container td { border: 1px solid #333; padding: 8px; text-align: left; }
    .pdf-container th { background: #f0f0f0; }
    .pdf-container blockquote { border-left: 3px solid #ccc; padding-left: 16px; color: #555; margin-left: 0; }
  `,
  minimal: `
    .pdf-container { font-family: 'Helvetica Neue', Helvetica, sans-serif; font-size: 15px; line-height: 1.7; color: #333; padding: 28px; }
    .pdf-container h1 { font-size: 1.8em; font-weight: 600; margin-top: 20px; }
    .pdf-container h2 { font-size: 1.4em; font-weight: 600; }
    .pdf-container code { font-family: 'SFMono-Regular', monospace; font-size: 85%; background: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; }
    .pdf-container pre { background: #f8f8f8; padding: 20px; border-radius: 8px; }
    .pdf-container pre code { background: transparent; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; }
    .pdf-container th, .pdf-container td { border-bottom: 2px solid #333; padding: 8px; text-align: left; }
    .pdf-container th { background: #f0e0e0; }
    .pdf-container blockquote { border-left: 3px solid #ccc; padding-left: 16px; color: #666; margin-left: 0; }
  `,
  dark: `
    .pdf-container { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; line-height: 1.6; color: #e6edf3; background: #0d1117; padding: 32px; }
    .pdf-container h1, .pdf-container h2, .pdf-container h3, .pdf-container h4 { color: #f0f6fc; }
    .pdf-container h1 { border-bottom: 1px solid #30363d; padding-bottom: 8px; }
    .pdf-container h2 { border-bottom: 1px solid #30363d; padding-bottom: 6px; }
    .pdf-container code { background: #161b22; color: #ff7b72; border-radius: 3px; padding: 2px 6px; font-family: 'SFMono-Regular', monospace; }
    .pdf-container pre { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 16px; }
    .pdf-container pre code { background: transparent; color: #e6edf3; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; }
    .pdf-container th, .pdf-container td { border: 1px solid #30363d; padding: 8px 12px; }
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


export async function generatePdf(
  htmlContent: string,
  options: PdfOptions
): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;

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

  // Create the content element but do NOT append it to the document with
  // offscreen positioning. html2pdf.js v0.14+ uses deepCloneBasic() to clone
  // the source element and renders the CLONE inside its own overlay container
  // (position:absolute; left:0; top:0). If the source element carries an inline
  // style like `left:-9999px`, that style is copied to the clone, which then
  // renders 9999px off to the left inside the overlay — outside html2canvas's
  // capture area — producing a completely blank PDF.
  //
  // Fix: pass a plain element with no offscreen positioning. html2pdf.js creates
  // its own hidden overlay (opacity:0) so the user never sees the content flash.
  const element = document.createElement('div');
  element.className = 'pdf-container';
  element.innerHTML = htmlContent;
  element.style.width = '794px';

  const config = {
    margin: [15, 15, 15, 15] as [number, number, number, number],
    filename: options.filename || 'document.pdf',
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: {
      unit: 'mm',
      format: options.pageSize || 'a4',
      orientation: 'portrait' as const,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await html2pdf().set(config).from(element).save();
  } finally {
    document.head.removeChild(styleEl);
    document.head.removeChild(hljsStyle);
  }
}