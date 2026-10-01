// The MDTool mark: a hand-drawn Markdown # on a slightly tilted page.
// Same drawing as app/icon.svg (the browser tab icon).
export default function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#18181b" />
      <g transform="rotate(-8 16 17)">
        <path d="M10 5.5h9l5.5 5.5v15a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2z" fill="#f7f6f2" />
        <path d="M19 5.5v4a1.5 1.5 0 0 0 1.5 1.5h4z" fill="#d4d4d8" />
        <g fill="none" stroke="#2563eb" strokeWidth="2.3" strokeLinecap="round" transform="translate(0 -1.2)">
          <path d="M13.9 13.4c-.2 3.1-.5 6.1-1 9.2" />
          <path d="M18.4 13.1c-.1 3.2-.4 6.3-.9 9.4" />
          <path d="M11.1 16.5c2.9-.4 5.9-.5 8.9-.3" />
          <path d="M10.6 20.3c3-.4 6-.4 9-.2" />
        </g>
      </g>
    </svg>
  );
}
