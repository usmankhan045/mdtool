'use client';

import { ThemeId, PageSizeId } from '@/lib/pdf';
import { SEG, SEG_ITEM, SEG_ON, SEG_OFF, FIELD_LABEL } from './ui';

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
    <div className="flex items-center gap-2">
      <span className={FIELD_LABEL}>Theme</span>
      <div role="radiogroup" aria-label="PDF theme" className={`${SEG} flex-wrap`}>
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            role="radio"
            aria-checked={selected === theme.id}
            onClick={() => onSelect(theme.id)}
            title={theme.description}
            className={`${SEG_ITEM} ${selected === theme.id ? SEG_ON : SEG_OFF}`}
          >
            {theme.label}
          </button>
        ))}
      </div>
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
    <div className="flex items-center gap-2">
      <span className={FIELD_LABEL}>Page</span>
      <div role="radiogroup" aria-label="Page size" className={SEG}>
        {PAGE_SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={selected === s.id}
            onClick={() => onSelect(s.id)}
            className={`${SEG_ITEM} ${selected === s.id ? SEG_ON : SEG_OFF}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
