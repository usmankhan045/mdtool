import { marked, type Token, type Tokens } from 'marked';
import { downloadBlob } from './download';

interface InlineMarks {
  bold?: boolean;
  italics?: boolean;
  strike?: boolean;
  code?: boolean;
}

const CODE_FONT = 'Courier New';
const ORDERED_LIST_REF = 'mdtool-ordered-list';

// CSS approximation of the generated .docx's look — used by WordPreview.tsx
// for the live preview iframe. The real export below does not use HTML/CSS
// at all; this is purely a visual stand-in.
export const DOCX_STYLES = `
  body { font-family: Calibri, Carlito, Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #000; }
  h1 { font-size: 20pt; font-weight: bold; margin: 12pt 0 6pt; }
  h2 { font-size: 16pt; font-weight: bold; margin: 10pt 0 6pt; }
  h3 { font-size: 13pt; font-weight: bold; margin: 8pt 0 4pt; }
  h4 { font-size: 11.5pt; font-weight: bold; margin: 8pt 0 4pt; }
  p { margin: 0 0 8pt; }
  code { font-family: 'Courier New', monospace; font-size: 10pt; background: #f0f0f0; padding: 1px 3px; }
  pre { font-family: 'Courier New', monospace; font-size: 10pt; background: #f0f0f0; padding: 8pt; white-space: pre-wrap; }
  pre code { background: transparent; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 8pt 0; }
  th, td { border: 1px solid #999999; padding: 4pt 8pt; text-align: left; }
  th { background: #e8e8e8; font-weight: bold; }
  blockquote { border-left: 3px solid #cccccc; margin: 0 0 8pt 0; padding-left: 12pt; color: #555555; }
  a { color: #0563c1; text-decoration: underline; }
  img { max-width: 100%; }
  ul, ol { margin: 0 0 8pt; padding-left: 24pt; }
`;

// Builds a genuine OOXML (.docx) document from Markdown source via marked's
// token AST — NOT from rendered HTML. Libraries that wrap HTML in a Word
// "altChunk"/MHTML shim (e.g. html-docx-js) produce files where the visible
// content lives outside <w:body>, so any reader other than Word itself
// (Google Docs, LibreOffice, mammoth.js, etc.) sees a blank document.
export async function generateDocx(markdown: string, filename = 'document.docx'): Promise<void> {
  const docx = await import('docx');
  const tokens = marked.lexer(markdown);
  const children = tokensToDocxElements(tokens, docx);

  const doc = new docx.Document({
    numbering: {
      config: [
        {
          reference: ORDERED_LIST_REF,
          levels: [
            {
              level: 0,
              format: docx.LevelFormat.DECIMAL,
              text: '%1.',
              alignment: docx.AlignmentType.START,
              style: { paragraph: { indent: { left: 360, hanging: 260 } } },
            },
          ],
        },
      ],
    },
    sections: [{ children }],
  });

  const blob = await docx.Packer.toBlob(doc);
  downloadBlob(blob, filename);
}

type DocxModule = typeof import('docx');

function tokensToDocxElements(tokens: Token[], docx: DocxModule): (InstanceType<DocxModule['Paragraph']> | InstanceType<DocxModule['Table']>)[] {
  const elements: (InstanceType<DocxModule['Paragraph']> | InstanceType<DocxModule['Table']>)[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'heading': {
        const t = token as Tokens.Heading;
        const levels = [
          docx.HeadingLevel.HEADING_1,
          docx.HeadingLevel.HEADING_2,
          docx.HeadingLevel.HEADING_3,
          docx.HeadingLevel.HEADING_4,
          docx.HeadingLevel.HEADING_5,
          docx.HeadingLevel.HEADING_6,
        ];
        elements.push(
          new docx.Paragraph({
            heading: levels[Math.min(t.depth - 1, 5)],
            children: inlineToRuns(t.tokens, {}, docx),
          })
        );
        break;
      }
      case 'paragraph': {
        const t = token as Tokens.Paragraph;
        elements.push(new docx.Paragraph({ children: inlineToRuns(t.tokens, {}, docx) }));
        break;
      }
      case 'list': {
        const t = token as Tokens.List;
        t.items.forEach((item, index) => {
          elements.push(
            new docx.Paragraph({
              children: inlineToRuns(item.tokens, {}, docx),
              ...(t.ordered
                ? { numbering: { reference: ORDERED_LIST_REF, level: 0 } }
                : { bullet: { level: 0 } }),
            })
          );
          void index;
        });
        break;
      }
      case 'blockquote': {
        const t = token as Tokens.Blockquote;
        for (const inner of t.tokens) {
          if (inner.type === 'paragraph') {
            elements.push(
              new docx.Paragraph({
                children: inlineToRuns((inner as Tokens.Paragraph).tokens, { italics: true }, docx),
                indent: { left: 360 },
                border: { left: { style: docx.BorderStyle.SINGLE, size: 12, color: 'CCCCCC', space: 8 } },
              })
            );
          }
        }
        break;
      }
      case 'code': {
        const t = token as Tokens.Code;
        const lines = t.text.split('\n');
        lines.forEach((line) => {
          elements.push(
            new docx.Paragraph({
              children: [new docx.TextRun({ text: line || ' ', font: CODE_FONT, size: 19 })],
              shading: { type: docx.ShadingType.SOLID, color: 'F0F0F0', fill: 'F0F0F0' },
              spacing: { before: 0, after: 0 },
            })
          );
        });
        break;
      }
      case 'table': {
        const t = token as Tokens.Table;
        const headerRow = new docx.TableRow({
          tableHeader: true,
          children: t.header.map(
            (cell) =>
              new docx.TableCell({
                shading: { fill: 'E8E8E8' },
                children: [new docx.Paragraph({ children: inlineToRuns(cell.tokens, { bold: true }, docx) })],
              })
          ),
        });
        const bodyRows = t.rows.map(
          (row) =>
            new docx.TableRow({
              children: row.map(
                (cell) =>
                  new docx.TableCell({
                    children: [new docx.Paragraph({ children: inlineToRuns(cell.tokens, {}, docx) })],
                  })
              ),
            })
        );
        elements.push(
          new docx.Table({
            rows: [headerRow, ...bodyRows],
            width: { size: 100, type: docx.WidthType.PERCENTAGE },
          })
        );
        break;
      }
      case 'hr': {
        elements.push(
          new docx.Paragraph({
            border: { bottom: { style: docx.BorderStyle.SINGLE, size: 6, color: 'CCCCCC' } },
          })
        );
        break;
      }
      case 'space':
        break;
      default:
        break;
    }
  }

  return elements;
}

function inlineToRuns(
  tokens: Token[] | undefined,
  marks: InlineMarks,
  docx: DocxModule
): (InstanceType<DocxModule['TextRun']> | InstanceType<DocxModule['ExternalHyperlink']>)[] {
  if (!tokens) return [];
  const runs: (InstanceType<DocxModule['TextRun']> | InstanceType<DocxModule['ExternalHyperlink']>)[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'text':
      case 'escape': {
        const t = token as Tokens.Text;
        if ('tokens' in t && t.tokens && t.tokens.length) {
          runs.push(...inlineToRuns(t.tokens, marks, docx));
        } else {
          runs.push(makeRun(t.text, marks, docx));
        }
        break;
      }
      case 'strong':
        runs.push(...inlineToRuns((token as Tokens.Strong).tokens, { ...marks, bold: true }, docx));
        break;
      case 'em':
        runs.push(...inlineToRuns((token as Tokens.Em).tokens, { ...marks, italics: true }, docx));
        break;
      case 'del':
        runs.push(...inlineToRuns((token as Tokens.Del).tokens, { ...marks, strike: true }, docx));
        break;
      case 'codespan':
        runs.push(makeRun((token as Tokens.Codespan).text, { ...marks, code: true }, docx));
        break;
      case 'link': {
        const t = token as Tokens.Link;
        runs.push(
          new docx.ExternalHyperlink({
            link: t.href,
            children: [makeRun(t.text, marks, docx, true)],
          })
        );
        break;
      }
      case 'br':
        runs.push(new docx.TextRun({ text: '', break: 1 }));
        break;
      default:
        if ('text' in token && typeof token.text === 'string') {
          runs.push(makeRun(token.text, marks, docx));
        }
    }
  }

  return runs;
}

function makeRun(text: string, marks: InlineMarks, docx: DocxModule, isLink = false): InstanceType<DocxModule['TextRun']> {
  return new docx.TextRun({
    text,
    bold: marks.bold,
    italics: marks.italics,
    strike: marks.strike,
    font: marks.code ? CODE_FONT : undefined,
    size: marks.code ? 21 : undefined,
    color: isLink ? '0563C1' : undefined,
    underline: isLink ? {} : undefined,
  });
}
