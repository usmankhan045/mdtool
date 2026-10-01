'use client';

import { useRef } from 'react';
import { PANE, PANE_HEAD, PANE_TITLE, META, TEXTAREA, BTN_OUTLINE, BTN_GHOST, ICON_UPLOAD } from './ui';
import { ToolIcon } from './UiParts';

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
    <div className={`${PANE} h-full`}>
      {/* Toolbar */}
      <div className={PANE_HEAD}>
        <span className={PANE_TITLE}>Markdown Input</span>
        <div className="flex items-center gap-1.5">
          <span className={`${META} mr-1.5`}>{wordCount} words</span>
          <button onClick={() => fileInputRef.current?.click()} className={BTN_OUTLINE}>
            <ToolIcon d={ICON_UPLOAD} />
            Upload .md
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
        placeholder={`# Paste your Markdown here...\n\nOr drag and drop a .md file.\n\n## Features supported:\n- GitHub Flavored Markdown\n- Code syntax highlighting\n- Tables, images, blockquotes\n- Mermaid diagrams\n\n\`\`\`javascript\nconst greeting = 'Hello World';\nconsole.log(greeting);\n\`\`\``}
        className={TEXTAREA}
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
