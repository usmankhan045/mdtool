import type { ReactNode } from 'react';

// The About page's visual motif: a front card with a tilted card layered behind it
// (the same idea as the photo stack in the hero). On hover the back card fans out a
// little further. Only `transform` animates, the front card never moves, hover is
// pointer-only (Tailwind v4 gates `hover:` behind `(hover: hover)`), and motion is
// dropped entirely for prefers-reduced-motion.

const EASE = 'transition-transform duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none';

// Full class strings so Tailwind can see them.
const TILTS = {
  left: `[transform:translate(-7px,7px)_rotate(-2.5deg)] group-hover:[transform:translate(-11px,10px)_rotate(-4deg)]`,
  right: `[transform:translate(7px,7px)_rotate(2.5deg)] group-hover:[transform:translate(11px,10px)_rotate(4deg)]`,
} as const;

export type Tilt = keyof typeof TILTS;

export const BACKS = {
  lavender: 'bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-200',
  navy: 'bg-[#0f1e30]',
  gray: 'bg-gradient-to-br from-gray-100 to-gray-200',
  rose: 'bg-gradient-to-br from-rose-100 to-rose-200',
  blue: 'bg-gradient-to-br from-blue-100 to-blue-200',
  orange: 'bg-gradient-to-br from-orange-100 to-orange-200',
  slate: 'bg-gradient-to-br from-slate-100 to-slate-300',
  violet: 'bg-gradient-to-br from-violet-100 to-violet-200',
  indigo: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
  emerald: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
  sky: 'bg-gradient-to-br from-sky-100 to-sky-200',
  amber: 'bg-gradient-to-br from-amber-100 to-amber-200',
} as const;

export type Back = keyof typeof BACKS;

export const FRONT =
  'relative h-full rounded-2xl bg-white text-center ring-1 ring-gray-200/80 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_12px_28px_-18px_rgba(16,24,40,0.25)]';

export default function LayeredCard({
  children,
  back = 'lavender',
  tilt = 'right',
  className = '',
  frontClassName = FRONT,
}: {
  children: ReactNode;
  back?: Back;
  tilt?: Tilt;
  /** Classes for the outer wrapper (e.g. h-full, grid placement). */
  className?: string;
  /** Override the front card surface (e.g. a dark card). */
  frontClassName?: string;
}) {
  return (
    <div className={`group relative isolate ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 -z-10 rounded-2xl ${BACKS[back]} ${TILTS[tilt]} ${EASE}`} />
      <div className={frontClassName}>{children}</div>
    </div>
  );
}
