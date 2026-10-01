'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Converters live in the "Tools" menu. The panel is always rendered (only hidden
// visually), so every tool link stays in the HTML on every page for crawlers.
const TOOLS = [
  { href: '/markdown-to-pdf', label: 'Markdown to PDF', badge: 'PDF', tone: 'bg-rose-50 text-rose-700 ring-rose-100', dark: 'bg-rose-500/15 text-rose-300 ring-rose-400/25' },
  { href: '/markdown-to-word', label: 'Markdown to Word', badge: 'DOCX', tone: 'bg-blue-50 text-blue-700 ring-blue-100', dark: 'bg-blue-500/15 text-blue-300 ring-blue-400/25' },
  { href: '/markdown-to-html', label: 'Markdown to HTML', badge: 'HTML', tone: 'bg-orange-50 text-orange-700 ring-orange-100', dark: 'bg-orange-500/15 text-orange-300 ring-orange-400/25' },
  { href: '/markdown-to-text', label: 'Markdown to Plain Text', badge: 'TXT', tone: 'bg-slate-100 text-slate-700 ring-slate-200', dark: 'bg-slate-400/15 text-slate-300 ring-slate-300/25' },
  { href: '/html-to-markdown', label: 'HTML to Markdown', badge: 'MD', tone: 'bg-violet-50 text-violet-700 ring-violet-100', dark: 'bg-violet-500/15 text-violet-300 ring-violet-400/25' },
  { href: '/word-to-markdown', label: 'Word to Markdown', badge: 'MD', tone: 'bg-indigo-50 text-indigo-700 ring-indigo-100', dark: 'bg-indigo-500/15 text-indigo-300 ring-indigo-400/25' },
  { href: '/markdown-table-generator', label: 'Table Generator', badge: 'TABLE', tone: 'bg-emerald-50 text-emerald-700 ring-emerald-100', dark: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/25' },
];

const HOME = { href: '/', label: 'Home' };

const LINKS = [
  { href: '/markdown-cheat-sheet', label: 'Cheat Sheet' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

// The band behind the floating pill matches the top of each page, so the pill
// sits on the hero instead of on a stray white strip.
function bandColor(pathname: string): string {
  const darkHero = [
    '/markdown-to-pdf', '/markdown-to-word', '/markdown-to-html', '/markdown-to-text',
    '/html-to-markdown', '/word-to-markdown', '/markdown-table-generator', '/markdown-cheat-sheet',
    '/es/', '/zh/',
  ];
  return darkHero.some((p) => pathname === p || pathname.startsWith(p.endsWith('/') ? p : `${p}/`))
    ? 'bg-[#16314f]'
    : 'bg-page';
}

const pressable = 'transition-transform duration-150 ease-out active:scale-[0.97]';

export default function Header() {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mouse users get hover-to-open; a short close delay lets the cursor cross the
  // gap between the trigger and the panel. Touch/pen keep click-to-toggle.
  const openOnHover = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setToolsOpen(true);
  };
  const closeOnLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    closeTimer.current = setTimeout(() => setToolsOpen(false), 150);
  };

  // Close menus on navigation (reset during render when the route changes).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setToolsOpen(false);
    setMobileOpen(false);
  }

  // Once the page scrolls, drop the band so the pill floats over the content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape and outside clicks close the Tools menu.
  useEffect(() => {
    if (!toolsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setToolsOpen(false);
    const onClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [toolsOpen]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const toolActive = TOOLS.some((t) => pathname === t.href);
  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 px-3 py-3 transition-colors duration-200 sm:px-4 ${scrolled ? 'bg-transparent' : bandColor(pathname)}`}
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="flex h-14 items-center justify-between gap-4 rounded-full bg-white pl-5 pr-2 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.35)] ring-1 ring-gray-900/5">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-bold text-gray-900">
            <span className="text-blue-600">&lt;/&gt;</span>
            MDTool
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <Link href={HOME.href} className={linkClass(pathname === HOME.href)}>
              {HOME.label}
            </Link>

            <div ref={toolsRef} className="relative" onPointerEnter={openOnHover} onPointerLeave={closeOnLeave}>
              <button
                type="button"
                aria-expanded={toolsOpen}
                aria-controls="tools-menu"
                onClick={() => setToolsOpen((o) => !o)}
                className={`inline-flex items-center gap-1 ${linkClass(toolActive || toolsOpen)}`}
              >
                Tools
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ease-out ${toolsOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.2 7.2a.75.75 0 0 1 1.06 0L10 10.94l3.74-3.74a.75.75 0 1 1 1.06 1.06l-4.27 4.27a.75.75 0 0 1-1.06 0L5.2 8.26a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Always in the DOM (crawlable); shown with a quick scale + fade from the trigger. */}
              <div
                id="tools-menu"
                className={`absolute left-1/2 top-full z-50 mt-3 w-[34rem] before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-[''] -translate-x-1/2 origin-top rounded-2xl bg-[#0f1e30] p-2 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.55)] ring-1 ring-white/10 transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
                  toolsOpen ? 'visible scale-100 opacity-100' : 'invisible scale-[0.97] opacity-0'
                }`}
              >
                <ul className="grid grid-cols-2 gap-1">
                  {TOOLS.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.07] hover:text-white ${
                          pathname === tool.href ? 'bg-white/[0.07] text-white' : 'text-blue-100/80'
                        }`}
                      >
                        <span className={`w-14 shrink-0 rounded-md py-0.5 text-center font-mono text-[10px] font-semibold ring-1 ring-inset ${tool.dark}`}>
                          {tool.badge}
                        </span>
                        {tool.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(pathname === link.href || pathname.startsWith(`${link.href}/`))}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/markdown-to-pdf"
              className={`hidden rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 sm:inline-flex ${pressable}`}
            >
              Start converting
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 lg:hidden ${pressable}`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu: a card under the pill */}
        <div
          id="mobile-menu"
          className={`absolute inset-x-0 top-full mt-2 origin-top rounded-3xl bg-[#0f1e30] p-3 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.55)] ring-1 ring-white/10 transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none lg:hidden ${
            mobileOpen ? 'visible scale-100 opacity-100' : 'invisible scale-[0.97] opacity-0'
          }`}
        >
          <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wider text-blue-200/50">Tools</p>
          <ul className="grid gap-0.5 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <li key={tool.href}>
                <Link href={tool.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-blue-100/80 transition-colors hover:bg-white/[0.07] hover:text-white">
                  <span className={`w-14 shrink-0 rounded-md py-0.5 text-center font-mono text-[10px] font-semibold ring-1 ring-inset ${tool.dark}`}>
                    {tool.badge}
                  </span>
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-1 border-t border-white/10 pt-2">
            {[HOME, ...LINKS].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href ? 'bg-white/10 text-white' : 'text-blue-100/80 hover:bg-white/[0.07] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/markdown-to-pdf"
            className={`mt-3 flex justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 sm:hidden ${pressable}`}
          >
            Start converting
          </Link>
        </div>
      </div>
    </header>
  );
}
