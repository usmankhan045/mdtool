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
    .pdf-container { font-family: 'Georgia', serif; font-size: 12pt; line-height: 1.8; color: #000; padding: 48px; }
    .pdf-container h1 { font-size: 18pt; text-align: center; margin-bottom: 8px; }
    .pdf-container h2 { font-size: 14pt; margin-top: 24px; }
    .pdf-container h3 { font-size: 12pt; margin-top: 16px; }
    .pdf-container code { font-family: 'Courier New', monospace; font-size: 10pt; background: #f5f5f5; padding: 1px 4px; }
    .pdf-container pre { background: #f5f5f5; border: 1px solid #ddd; padding: 12px; font-size: 10pt; }
    .pdf-container pre code { background: transparent; padding: 0; }
    .pdf-container table { border-collapse: collapse; width: 100%; font-size: 11pt; }
    .pdf-container th, .pdf-container td { border: 1px solid #000; padding: 4px 8px; }
    .pdf-container th { font-weight: bold; text-align: center; }
    .pdf-container blockquote { border-left: 3px solid #000; margin-left: 24px; padding-left: 12px; font-style: italic; }
    .pdf-container p { text-align: justify; }
  `,
  minimal: `
    .pdf-container { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #333; padding: 40px; }
    .pdf-container h1 { font-size: 28px; font-weight: 700; color: #111; margin-top: 32px; }
    .pdf-container h2 { font-size: 22px; font-weight: 600; color: #222; margin-top: 24px; }
    .pdf-container h3 { font-size: 18px; font-weight: 600; color: #333; }
    .pdf-container code { font-family: 'Fira Code', monospace; font-size: 13px; background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
    .pdf-container pre { background: #f8f8f8; padding: 20px; border-radius: 8px; }
    .pdf-container pre code { background: transparent; padding: 0; }
    .pdf-container table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .pdf-container th { border-bottom: 2px solid #333; padding: 8px; text-align: left; }
    .pdf-container td { border-bottom: 1px solid #e0e0e0; padding: 8px; }
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

  // Inject highlight.js CSS for light themes
  let hljsLink: HTMLLinkElement | null = null;
  if (options.theme !== 'dark') {
    hljsLink = document.createElement('link');
    hljsLink.rel = 'stylesheet';
    hljsLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    hljsLink.id = 'pdf-hljs-style';
    document.head.appendChild(hljsLink);
  }

  // Content element — no wrapping html/body tags (browsers strip them from innerHTML)
  const element = document.createElement('div');
  element.className = 'pdf-container';
  element.innerHTML = htmlContent;
  element.style.cssText = 'position:absolute;left:-9999px;top:0;width:794px;background:white;';
  document.body.appendChild(element);

  const config = {
    margin: [15, 15, 15, 15] as [number, number, number, number],
    filename: options.filename || 'document.pdf',
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      width: 794,
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
    document.body.removeChild(element);
    document.head.removeChild(styleEl);
    if (hljsLink) document.head.removeChild(hljsLink);
  }
}
