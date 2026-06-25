'use client';

import { useRef, useState } from 'react';

interface Props {
  fileName: string | null;
  fileSize: number | null;
  loading?: boolean;
  error?: string | null;
  onFileSelected: (file: File) => void;
  onClear: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isDocxFile(file: File): boolean {
  return file.name.toLowerCase().endsWith('.docx');
}

export default function DocxUploadPanel({ fileName, fileSize, loading, error, onFileSelected, onClear }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!isDocxFile(file)) {
      alert('Please upload a .docx file (legacy .doc files are not supported).');
      return;
    }
    onFileSelected(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <span className="text-sm font-medium text-gray-600">Word Document</span>
        {fileName && (
          <button
            onClick={onClear}
            className="text-sm px-3.5 min-h-[44px] bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"
          >
            Remove
          </button>
        )}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`flex-1 flex flex-col items-center justify-center gap-3 border-x border-b border-gray-200 rounded-b-lg min-h-[340px] sm:min-h-[500px] transition-colors ${
          dragOver ? 'bg-blue-50 border-blue-300' : 'bg-white'
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-sm text-gray-500">Converting {fileName}...</p>
          </>
        ) : fileName ? (
          <>
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m-7 5h8a2 2 0 002-2V7.414a1 1 0 00-.293-.707l-4.414-4.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium text-gray-800">{fileName}</p>
            {fileSize !== null && <p className="text-xs text-gray-400">{formatSize(fileSize)}</p>}
          </>
        ) : (
          <>
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="text-sm text-gray-500">Drag and drop a .docx file here</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 min-h-[44px] bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-md shadow-sm transition-all"
            >
              Choose .docx file
            </button>
          </>
        )}
        {error && <p className="text-xs text-red-500 max-w-xs text-center">{error}</p>}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".docx"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}
