'use client';

import { useMemo, useState } from 'react';
import { toMarkdownTable, toHtmlTable, parsePastedData, type ColAlign, type TableData } from '@/lib/tableGenerator';
import { WORKSPACE, WORKSPACE_BAR, SPLIT, PANE, PANE_HEAD, PANE_TITLE, META, BTN_PRIMARY, BTN_OUTLINE, BTN_GHOST, SEG, SEG_ITEM, SEG_ON, SEG_OFF } from './ui';

const MAX_DIM = 30;

const DEFAULT: TableData = {
  header: ['Feature', 'MDTool', 'Others'],
  rows: [
    ['Free forever', 'Yes', 'Sometimes'],
    ['Client-side only', 'Yes', 'Rarely'],
    ['Copy as Markdown or HTML', 'Yes', 'No'],
  ],
  aligns: ['left', 'left', 'left'],
};

const ALIGN_CYCLE: Record<ColAlign, ColAlign> = { left: 'center', center: 'right', right: 'left' };
const ALIGN_ICON: Record<ColAlign, string> = { left: '⇤', center: '↔', right: '⇥' };

export default function TableGeneratorClient() {
  const [table, setTable] = useState<TableData>(DEFAULT);
  const [output, setOutput] = useState<'markdown' | 'html'>('markdown');
  const [copied, setCopied] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');

  const code = useMemo(
    () => (output === 'markdown' ? toMarkdownTable(table) : toHtmlTable(table)),
    [table, output],
  );

  const setCell = (r: number, c: number, value: string) => {
    setTable((t) => {
      if (r === -1) {
        const header = [...t.header];
        header[c] = value;
        return { ...t, header };
      }
      const rows = t.rows.map((row, i) => (i === r ? row.map((cell, j) => (j === c ? value : cell)) : row));
      return { ...t, rows };
    });
  };

  const addRow = () => setTable((t) => ({ ...t, rows: [...t.rows, Array(t.header.length).fill('')] }));
  const removeRow = () => setTable((t) => (t.rows.length > 1 ? { ...t, rows: t.rows.slice(0, -1) } : t));
  const addCol = () =>
    setTable((t) =>
      t.header.length >= MAX_DIM
        ? t
        : {
            header: [...t.header, `Column ${t.header.length + 1}`],
            rows: t.rows.map((row) => [...row, '']),
            aligns: [...t.aligns, 'left'],
          },
    );
  const removeCol = () =>
    setTable((t) =>
      t.header.length <= 1
        ? t
        : {
            header: t.header.slice(0, -1),
            rows: t.rows.map((row) => row.slice(0, -1)),
            aligns: t.aligns.slice(0, -1),
          },
    );

  const cycleAlign = (c: number) =>
    setTable((t) => ({ ...t, aligns: t.aligns.map((a, i) => (i === c ? ALIGN_CYCLE[a] : a)) }));

  const clearTable = () =>
    setTable((t) => ({ ...t, rows: t.rows.map((row) => row.map(() => '')), header: t.header.map((_, i) => `Column ${i + 1}`) }));

  const handleImport = () => {
    const parsed = parsePastedData(importText);
    if (!parsed) return;
    setTable({
      header: parsed.header.slice(0, MAX_DIM),
      rows: parsed.rows.slice(0, 200).map((r) => r.slice(0, MAX_DIM)),
      aligns: parsed.header.slice(0, MAX_DIM).map(() => 'left'),
    });
    setShowImport(false);
    setImportText('');
  };

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const inputClass =
    'w-full min-w-[7rem] px-2.5 py-2 text-sm border border-zinc-200 rounded-md bg-white transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10';

  return (
    <div className={WORKSPACE}>
      {/* Controls */}
      <div className={`${WORKSPACE_BAR} sm:flex-wrap sm:justify-start`}>
        <div className="flex flex-wrap items-center gap-2">
        <button onClick={addRow} className={BTN_OUTLINE}>+ Row</button>
        <button onClick={removeRow} className={BTN_OUTLINE}>− Row</button>
        <button onClick={addCol} className={BTN_OUTLINE}>+ Column</button>
        <button onClick={removeCol} className={BTN_OUTLINE}>− Column</button>
        <span className="mx-1 hidden h-5 w-px bg-zinc-200 sm:inline-block" aria-hidden />
        <button onClick={() => setShowImport(!showImport)} className={BTN_OUTLINE}>
          Paste from Excel / CSV
        </button>
        <button onClick={clearTable} className={`${BTN_GHOST} hover:text-red-600`}>Clear</button>
        </div>
        <span className={`${META} sm:ml-auto`}>
          {table.rows.length} × {table.header.length} · click ⇤↔⇥ to align columns
        </span>
      </div>

      {/* Import panel */}
      {showImport && (
        <div className="border-b border-zinc-100 bg-zinc-50/40 p-4">
          <p className="text-sm text-zinc-600 mb-2">
            Paste cells copied from Excel or Google Sheets (tab-separated), or CSV data, and the grid fills automatically.
          </p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={'Name\tRole\nAda\tEngineer\nGrace\tAdmiral'}
            rows={5}
            className="w-full font-mono text-[13px] bg-white border border-zinc-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
          />
          <button onClick={handleImport} className={`${BTN_PRIMARY} mt-3`}>
            Import into grid
          </button>
        </div>
      )}

      <div className={SPLIT}>
        {/* Grid editor */}
        <div className={PANE}>
          <div className={PANE_HEAD}>
            <span className={PANE_TITLE}>Table editor</span>
          </div>
          <div className="p-3 overflow-x-auto">
            <table className="border-separate border-spacing-1">
              <thead>
                <tr>
                  {table.header.map((_, c) => (
                    <th key={c} className="text-center">
                      <button
                        onClick={() => cycleAlign(c)}
                        title={`Alignment: ${table.aligns[c]} (click to change)`}
                        className="mb-1 rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-600 transition-[border-color,color,transform] duration-150 hover:border-zinc-400 hover:text-zinc-900 active:scale-[0.97]"
                      >
                        {ALIGN_ICON[table.aligns[c]]} {table.aligns[c]}
                      </button>
                    </th>
                  ))}
                </tr>
                <tr>
                  {table.header.map((cell, c) => (
                    <th key={c}>
                      <input value={cell} onChange={(e) => setCell(-1, c, e.target.value)} className={`${inputClass} font-semibold`} aria-label={`Header ${c + 1}`} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>
                        <input value={cell} onChange={(e) => setCell(r, c, e.target.value)} className={inputClass} aria-label={`Row ${r + 1}, column ${c + 1}`} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Output */}
        <div className={PANE}>
          <div className={PANE_HEAD}>
            <span className={`${PANE_TITLE} mr-auto`}>Output</span>
            <div className={SEG}>
              <button onClick={() => setOutput('markdown')} className={`${SEG_ITEM} ${output === 'markdown' ? SEG_ON : SEG_OFF}`}>
                Markdown
              </button>
              <button onClick={() => setOutput('html')} className={`${SEG_ITEM} ${output === 'html' ? SEG_ON : SEG_OFF}`}>
                HTML
              </button>
            </div>
            <button onClick={copy} className={BTN_PRIMARY}>
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
          <pre className="flex-1 p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-zinc-800 min-h-[16rem]">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
