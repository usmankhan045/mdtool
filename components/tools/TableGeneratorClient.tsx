'use client';

import { useMemo, useState } from 'react';
import { toMarkdownTable, toHtmlTable, parsePastedData, type ColAlign, type TableData } from '@/lib/tableGenerator';

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
    'w-full min-w-[7rem] px-2 py-1.5 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-zinc-400 bg-white';

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4 flex flex-wrap items-center gap-2">
        <button onClick={addRow} className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 transition-colors">+ Row</button>
        <button onClick={removeRow} className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 transition-colors">− Row</button>
        <button onClick={addCol} className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 transition-colors">+ Column</button>
        <button onClick={removeCol} className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 transition-colors">− Column</button>
        <span className="mx-1 hidden sm:inline text-zinc-200">|</span>
        <button onClick={() => setShowImport(!showImport)} className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 transition-colors">
          Paste from Excel / CSV
        </button>
        <button onClick={clearTable} className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 hover:border-red-400 hover:text-red-500 transition-colors">Clear</button>
        <span className="ml-auto text-xs text-zinc-400">
          {table.rows.length} × {table.header.length} · click ⇤↔⇥ to align columns
        </span>
      </div>

      {/* Import panel */}
      {showImport && (
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-4">
          <p className="text-sm text-zinc-600 mb-2">
            Paste cells copied from Excel or Google Sheets (tab-separated), or CSV data, and the grid fills automatically.
          </p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={'Name\tRole\nAda\tEngineer\nGrace\tAdmiral'}
            rows={5}
            className="w-full font-mono text-sm border border-zinc-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
          <button onClick={handleImport} className="mt-2 px-4 py-2 bg-zinc-900 text-white text-sm rounded-lg font-medium hover:bg-zinc-800 transition-colors">
            Import into grid
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Grid editor */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-zinc-100 text-xs font-medium uppercase tracking-wider text-zinc-400">
            Table editor
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
                        className="mb-1 px-2 py-0.5 text-xs rounded border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 transition-colors"
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
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-100 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400 mr-auto">Output</span>
            <button
              onClick={() => setOutput('markdown')}
              className={`px-3 py-1 text-xs rounded-lg border transition-colors ${output === 'markdown' ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'}`}
            >
              Markdown
            </button>
            <button
              onClick={() => setOutput('html')}
              className={`px-3 py-1 text-xs rounded-lg border transition-colors ${output === 'html' ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'}`}
            >
              HTML
            </button>
            <button onClick={copy} className="px-3 py-1 text-xs rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-zinc-800 bg-zinc-50 min-h-[16rem]">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
