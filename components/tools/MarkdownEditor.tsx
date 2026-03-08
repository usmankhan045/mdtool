'use client';

import { useRef } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  wordCount: number;
}

export default function MarkdownEditor({ value, onChange, wordCount }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown') && !file.name.endsWith('.txt')) {
      alert('Please upload a .md, .markdown, or .txt file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => onChange(event.target?.result as string);
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
        <span className="text-sm font-medium text-gray-600">Markdown Input</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{wordCount} words</span>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-md shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload .md
          </button>
          <button
            onClick={() => onChange('')}
            className="text-xs px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-600"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        placeholder={`# Paste your Markdown here...\n\nOr drag and drop a .md file.\n\n## Features supported:\n- GitHub Flavored Markdown\n- Code syntax highlighting\n- Tables, images, blockquotes\n- Mermaid diagrams\n\n\`\`\`javascript\nconst greeting = 'Hello World';\nconsole.log(greeting);\n\`\`\``}
        className="flex-1 w-full p-4 font-mono text-sm text-gray-800 bg-white resize-none outline-none border-x border-b border-gray-200 rounded-b-lg min-h-[500px]"
        spellCheck={false}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
