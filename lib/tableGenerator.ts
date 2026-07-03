// Pure logic for the Markdown Table Generator — grid state in, GFM/HTML out.

export type ColAlign = 'left' | 'center' | 'right';

export interface TableData {
  header: string[];
  rows: string[][];
  aligns: ColAlign[];
}

/** Escape pipes so cell content can't break the table structure. */
function escapeCell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\n/g, '<br>').trim();
}

function separatorFor(align: ColAlign, width: number): string {
  const dashes = Math.max(3, width);
  if (align === 'center') return `:${'-'.repeat(dashes - 2)}:`;
  if (align === 'right') return `${'-'.repeat(dashes - 1)}:`;
  return '-'.repeat(dashes);
}

/** Render a pretty-padded GitHub Flavored Markdown table. */
export function toMarkdownTable({ header, rows, aligns }: TableData): string {
  const cols = header.length;
  const cells = [header, ...rows].map((row) =>
    Array.from({ length: cols }, (_, c) => escapeCell(row[c] ?? '')),
  );

  const widths = Array.from({ length: cols }, (_, c) =>
    Math.max(3, ...cells.map((row) => row[c].length)),
  );

  const pad = (text: string, c: number) => {
    const total = widths[c] - text.length;
    if (aligns[c] === 'right') return ' '.repeat(total) + text;
    if (aligns[c] === 'center') {
      const left = Math.floor(total / 2);
      return ' '.repeat(left) + text + ' '.repeat(total - left);
    }
    return text + ' '.repeat(total);
  };

  const line = (row: string[]) => `| ${row.map((cell, c) => pad(cell, c)).join(' | ')} |`;
  const separator = `| ${widths.map((w, c) => separatorFor(aligns[c] ?? 'left', w)).join(' | ')} |`;

  return [line(cells[0]), separator, ...cells.slice(1).map(line)].join('\n');
}

/** Render the same table as clean HTML (thead/tbody with align styles). */
export function toHtmlTable({ header, rows, aligns }: TableData): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const style = (c: number) => (aligns[c] && aligns[c] !== 'left' ? ` style="text-align:${aligns[c]}"` : '');

  const ths = header.map((h, c) => `      <th${style(c)}>${esc(h)}</th>`).join('\n');
  const trs = rows
    .map(
      (row) =>
        `    <tr>\n${header.map((_, c) => `      <td${style(c)}>${esc(row[c] ?? '')}</td>`).join('\n')}\n    </tr>`,
    )
    .join('\n');

  return `<table>\n  <thead>\n    <tr>\n${ths}\n    </tr>\n  </thead>\n  <tbody>\n${trs}\n  </tbody>\n</table>`;
}

/** Split one CSV line respecting double-quoted values ("Portland, OR" stays one cell). */
function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else if (ch === '"' && current === '') {
      inQuotes = true;
    } else if (ch === ',') {
      cells.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  cells.push(current);
  return cells;
}

/**
 * Parse text pasted from Excel / Google Sheets (tab-separated) or CSV into
 * grid data. Tabs win if present on the first line; otherwise commas with
 * standard double-quote escaping.
 */
export function parsePastedData(text: string): { header: string[]; rows: string[][] } | null {
  const lines = text.replace(/\r\n?/g, '\n').split('\n').filter((l) => l.trim().length > 0);
  if (lines.length === 0) return null;

  const useTabs = lines[0].includes('\t');
  const split = (line: string) =>
    (useTabs ? line.split('\t') : splitCsvLine(line)).map((cell) => cell.trim());

  const header = split(lines[0]);
  if (header.length < 2 && lines.length < 2) return null;

  const rows = lines.slice(1).map((line) => {
    const cells = split(line);
    // normalize row length to header length
    return Array.from({ length: header.length }, (_, c) => cells[c] ?? '');
  });

  return { header, rows: rows.length ? rows : [Array(header.length).fill('')] };
}
