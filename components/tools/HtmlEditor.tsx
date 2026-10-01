'use client';

import { useRef } from 'react';
import { PANE, PANE_HEAD, PANE_TITLE, META, TEXTAREA, BTN_OUTLINE, BTN_GHOST, ICON_UPLOAD } from './ui';
import { ToolIcon } from './UiParts';

interface Props {
  value: string;
  onChange: (val: string) => void;
  charCount: number;
}

export default function HtmlEditor({ value, onChange, charCount }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.html') && !file.name.endsWith('.htm') && !file.name.endsWith('.txt')) {
      alert('Please upload a .html or .htm file');
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
    <div className={`${PANE} h-full`}>
      {/* Toolbar */}
      <div className={PANE_HEAD}>
        <span className={PANE_TITLE}>HTML Input</span>
        <div className="flex items-center gap-1.5">
          <span className={`${META} mr-1.5`}>{charCount} chars</span>
          <button onClick={() => fileInputRef.current?.click()} className={BTN_OUTLINE}>
            <ToolIcon d={ICON_UPLOAD} />
            Upload .html
          </button>
          <button onClick={() => onChange('')} className={BTN_GHOST}>
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
        placeholder={`<h1>Paste your HTML here...</h1>\n\nOr drag and drop a .html file.\n\n<p>Supports tables, lists, links, images, code blocks, and blockquotes.</p>`}
        className={TEXTAREA}
        spellCheck={false}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".html,.htm,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
