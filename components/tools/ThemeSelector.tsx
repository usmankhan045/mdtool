'use client';

import { ThemeId, PageSizeId } from '@/lib/pdf';

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
          className={`px-3.5 min-h-[44px] flex items-center rounded-full text-sm font-medium transition-all border ${
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

const PAGE_SIZES: { id: PageSizeId; label: string }[] = [
  { id: 'a4', label: 'A4' },
  { id: 'letter', label: 'US Letter' },
];

interface PageSizeProps {
  selected: PageSizeId;
  onSelect: (id: PageSizeId) => void;
}

// Paper size for the generated PDF (A4 = 210 x 297 mm, US Letter = 8.5 x 11 in).
export function PageSizeSelector({ selected, onSelect }: PageSizeProps) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
      <span>Page:</span>
      <select
        aria-label="Page size"
        value={selected}
        onChange={(e) => onSelect(e.target.value as PageSizeId)}
        className="min-h-[44px] rounded-full border border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:border-blue-400 focus:border-blue-500 focus:outline-none"
      >
        {PAGE_SIZES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}
