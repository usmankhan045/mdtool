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
      <span className="text-sm font-medium text-zinc-600 mr-1">Theme:</span>
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          title={theme.description}
          className={`px-3.5 min-h-[44px] flex items-center rounded-full text-sm font-medium transition-all border ${
            selected === theme.id
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm'
              : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-400 hover:text-zinc-900'
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
    <div className="flex items-center gap-2 text-sm font-medium text-zinc-600">
      <span>Page:</span>
      {/* Two options only, so a segmented toggle instead of a native select. */}
      <div role="radiogroup" aria-label="Page size" className="flex min-h-[44px] items-center rounded-full border border-zinc-300 bg-zinc-100 p-1">
        {PAGE_SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={selected === s.id}
            onClick={() => onSelect(s.id)}
            className={`flex h-full min-h-[34px] items-center rounded-full px-3.5 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
              selected === s.id
                ? 'bg-white text-zinc-900 shadow-[0_1px_2px_rgba(24,24,27,0.12),0_0_0_1px_rgba(24,24,27,0.06)]'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
