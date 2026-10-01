import { LIVE, LIVE_DOT } from './ui';

// Tiny presentational pieces shared by the converters and their loading shells.
// No hooks, so the server-rendered shells can use them too.

export function ToolIcon({ d, className = 'h-3.5 w-3.5' }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
  );
}

export function LiveBadge() {
  return (
    <span className={LIVE}>
      <span className={LIVE_DOT} />
      Live
    </span>
  );
}
