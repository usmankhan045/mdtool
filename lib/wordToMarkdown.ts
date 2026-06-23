import { convertHtmlToMarkdown } from './htmlToMarkdown';

export async function convertDocxToMarkdown(arrayBuffer: ArrayBuffer): Promise<string> {
  const mammoth = await import('mammoth');
  const result = await mammoth.convertToHtml({ arrayBuffer });
  return convertHtmlToMarkdown(result.value);
}
