// IMPORTANT: Never import html2pdf at the top level — SSR will crash
// Always use dynamic import inside the function

export type ThemeId = 'github' | 'academic' | 'minimal' | 'dark';

export interface PdfOptions {
  theme: ThemeId;
  filename?: string;
  pageSize?: 'a4' | 'letter';
}

// Theme CSS strings (loaded client-side only)
const THEMES: Record<ThemeId, string> = {
  github: `
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 16px; line-height: 1.6; color: #24292e; max-width: 900px; margin: 0 auto; padding: 32px; }
    h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
    code { background: #f6f8fa; border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; font-family: 'SFMono-Regular', Consolas, monospace; }
    pre { background: #f6f8fa; border-radius: 6px; padding: 16px; overflow: auto; }
    pre code { background: transparent; padding: 0; }
    table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    th, td { border: 1px solid #dfe2e5; padding: 6px 13px; }
    th { background: #f6f8fa; font-weight: 600; }
    tr:nth-child(even) { background: #f6f8fa; }
    blockquote { border-left: 4px solid #dfe2e5; color: #6a737d; margin: 0; padding: 0 16px; }
    img { max-width: 100%; }
    .hljs { background: #f6f8fa; }
  `,
  academic: `
    body { font-family: 'Georgia', serif; font-size: 12pt; line-height: 1.8; color: #000; max-width: 800px; margin: 0 auto; padding: 48px; }
    h1 { font-size: 18pt; text-align: center; margin-bottom: 8px; }
    h2 { font-size: 14pt; margin-top: 24px; }
    h3 { font-size: 12pt; margin-top: 16px; }
    code { font-family: 'Courier New', monospace; font-size: 10pt; background: #f5f5f5; padding: 1px 4px; }
    pre { background: #f5f5f5; border: 1px solid #ddd; padding: 12px; font-size: 10pt; }
    pre code { background: transparent; padding: 0; }
    table { border-collapse: collapse; width: 100%; font-size: 11pt; }
    th, td { border: 1px solid #000; padding: 4px 8px; }
    th { font-weight: bold; text-align: center; }
    blockquote { border-left: 3px solid #000; margin-left: 24px; padding-left: 12px; font-style: italic; }
    p { text-align: justify; }
  `,
  minimal: `
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #333; max-width: 720px; margin: 0 auto; padding: 40px; }
    h1 { font-size: 28px; font-weight: 700; color: #111; margin-top: 32px; }
    h2 { font-size: 22px; font-weight: 600; color: #222; margin-top: 24px; }
    h3 { font-size: 18px; font-weight: 600; color: #333; }
    code { font-family: 'Fira Code', monospace; font-size: 13px; background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
    pre { background: #f8f8f8; padding: 20px; border-radius: 8px; }
    pre code { background: transparent; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { border-bottom: 2px solid #333; padding: 8px; text-align: left; }
    td { border-bottom: 1px solid #e0e0e0; padding: 8px; }
    blockquote { border-left: 3px solid #ccc; padding-left: 16px; color: #666; margin-left: 0; }
  `,
  dark: `
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; line-height: 1.6; color: #e6edf3; background: #0d1117; max-width: 900px; margin: 0 auto; padding: 32px; }
    h1, h2, h3, h4 { color: #f0f6fc; }
    h1 { border-bottom: 1px solid #30363d; padding-bottom: 8px; }
    h2 { border-bottom: 1px solid #30363d; padding-bottom: 6px; }
    code { background: #161b22; color: #ff7b72; border-radius: 3px; padding: 2px 6px; font-family: 'SFMono-Regular', monospace; }
    pre { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 16px; }
    pre code { background: transparent; color: #e6edf3; padding: 0; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #30363d; padding: 8px 12px; }
    th { background: #161b22; }
    tr:nth-child(even) { background: #161b22; }
    blockquote { border-left: 4px solid #3b82f6; padding-left: 16px; color: #8b949e; margin: 0; }
    a { color: #58a6ff; }
  `,
};

export async function generatePdf(
  htmlContent: string,
  options: PdfOptions
): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;

  const hljsCss = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">`;

  const styledHtml = `
    <html>
      <head>
        <meta charset="UTF-8">
        ${options.theme !== 'dark' ? hljsCss : ''}
        <style>${THEMES[options.theme]}</style>
      </head>
      <body>${htmlContent}</body>
    </html>
  `;

  const element = document.createElement('div');
  element.innerHTML = styledHtml;
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);

  const config = {
    margin: [10, 15, 10, 15] as [number, number, number, number],
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
    await html2pdf().set(config).from(element.querySelector('body')!).save();
  } finally {
    document.body.removeChild(element);
  }
}
