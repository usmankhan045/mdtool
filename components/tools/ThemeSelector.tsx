'use client';

import { ThemeId } from '@/lib/pdf';

const THEMES: { id: ThemeId; label: string; description: string }[] = [
  { id: 'github', label: 'GitHub', description: 'Clean developer style' },
  { id: 'academic', label: 'Academic', description: 'Formal / research papers' },
  { id: 'minimal', label: 'Minimal', description: 'Modern and clean' },
  { id: 'dark', label: 'Dark', description: 'Dark background' },
];

interface Props {
  selected: ThemeId;
  onSelect: (id: ThemeId) => void;
}

export default function ThemeSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-600 mr-1">Theme:</span>
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          title={theme.description}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
            selected === theme.id
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
}
