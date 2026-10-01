// Shared look for every converter workspace. The real tools and their
// server-rendered loading shells both use these strings, so the shell and the
// hydrated tool always have identical dimensions (no layout shift).

// One card holds the whole tool: an optional top bar, then the split panes.
export const WORKSPACE =
  'overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_0_rgba(24,24,27,0.03),0_16px_40px_-20px_rgba(24,24,27,0.2)]';
export const WORKSPACE_BAR =
  'flex flex-col gap-3 border-b border-zinc-200/70 bg-zinc-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between';
export const SPLIT = 'grid grid-cols-1 divide-y divide-zinc-100 lg:grid-cols-2 lg:divide-x lg:divide-y-0';

export const PANE = 'flex min-w-0 flex-col';
export const PANE_HEAD =
  'flex min-h-[60px] flex-wrap items-center justify-between gap-2 border-b border-zinc-100 px-4 py-2.5';
export const PANE_TITLE = 'text-sm font-semibold text-zinc-900';
export const META = 'font-mono text-[11px] tabular-nums text-zinc-400';
export const PANE_HEIGHT = 'min-h-[340px] sm:min-h-[500px]';
export const TEXTAREA = `flex-1 w-full resize-none bg-transparent p-4 font-mono text-[13px] leading-6 text-zinc-800 outline-none placeholder:text-zinc-400 ${PANE_HEIGHT}`;

const PRESS =
  'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40';
const BTN = `inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-medium max-sm:h-11 ${PRESS}`;
export const BTN_PRIMARY = `${BTN} bg-zinc-900 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(24,24,27,0.25),0_4px_12px_-4px_rgba(24,24,27,0.35)] hover:bg-zinc-800`;
export const BTN_OUTLINE = `${BTN} border border-zinc-300 bg-white font-semibold text-zinc-900 shadow-[0_1px_2px_rgba(24,24,27,0.06)] hover:border-zinc-400 hover:bg-zinc-50`;
export const BTN_GHOST = `${BTN} border border-transparent text-zinc-600 hover:border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900`;
// The main download action in a workspace bar: same shape, a touch larger.
export const BTN_MAIN = `${BTN_PRIMARY} h-11 px-5 max-sm:w-full`;

// Segmented control (themes, page size, preview/code, markdown/html).
export const SEG = 'inline-flex items-center gap-0.5 rounded-xl border border-zinc-200 bg-white p-1 shadow-[0_1px_2px_rgba(24,24,27,0.05)]';
export const SEG_ITEM =
  'inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] max-sm:h-10';
export const SEG_ON = 'bg-zinc-900 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(24,24,27,0.25)]';
export const SEG_OFF = 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900';
export const FIELD_LABEL = 'text-xs font-medium uppercase tracking-wider text-zinc-500';

export const LIVE = 'inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500';
export const LIVE_DOT = 'h-1.5 w-1.5 rounded-full bg-emerald-500';

export const ICON_UPLOAD = 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12';
export const ICON_DOWNLOAD = 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4';
