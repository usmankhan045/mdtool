import type { ReactNode } from 'react';
import { AUTHOR } from '@/components/seo/StructuredData';
import LayeredCard, { type Back } from '@/components/about/LayeredCard';

const CONTACT_EMAIL = 'syncwithusman@gmail.com';
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=Project%20inquiry%20via%20MDTool`;

const iconProps = {
  className: 'h-5 w-5',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

// Each service gets its own colour so the four cards are easy to tell apart.
type Theme = { back: Back; wash: string; edge: string; tile: string; tag: string; hover: string };

// Full class strings per colour (Tailwind only generates classes it can see verbatim).
const THEMES: Record<string, Theme> = {
  blue: {
    back: 'blue',
    wash: 'from-blue-50',
    edge: 'via-blue-400/50',
    tile: 'from-blue-500 to-blue-600 shadow-blue-500/30',
    tag: 'bg-blue-50 text-blue-700 ring-blue-100',
    hover: 'hover:ring-blue-200',
  },
  violet: {
    back: 'violet',
    wash: 'from-violet-50',
    edge: 'via-violet-400/50',
    tile: 'from-violet-500 to-violet-600 shadow-violet-500/30',
    tag: 'bg-violet-50 text-violet-700 ring-violet-100',
    hover: 'hover:ring-violet-200',
  },
  emerald: {
    back: 'emerald',
    wash: 'from-emerald-50',
    edge: 'via-emerald-400/50',
    tile: 'from-emerald-500 to-emerald-600 shadow-emerald-500/30',
    tag: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    hover: 'hover:ring-emerald-200',
  },
  amber: {
    back: 'amber',
    wash: 'from-amber-50',
    edge: 'via-amber-400/60',
    tile: 'from-amber-400 to-amber-500 shadow-amber-500/30',
    tag: 'bg-amber-50 text-amber-800 ring-amber-100',
    hover: 'hover:ring-amber-200',
  },
};

const SERVICES: { title: string; description: string; tags: string[]; theme: Theme; icon: ReactNode }[] = [
  {
    title: 'AI automations',
    description: 'Put AI to work on the repetitive parts of your business, wired into the tools you already use.',
    tags: ['Workflow automation', 'LLM integrations', 'Business processes'],
    theme: THEMES.blue,
    icon: (
      <svg {...iconProps}>
        <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Mobile apps',
    description: 'Apps for iOS and Android, from the first version to the store release.',
    tags: ['iOS & Android', 'API integration', 'App updates'],
    theme: THEMES.violet,
    icon: (
      <svg {...iconProps}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
      </svg>
    ),
  },
  {
    title: 'Websites & web apps',
    description: 'Fast, maintainable websites and browser-based applications.',
    tags: ['Business sites', 'Dashboards', 'Browser tools'],
    theme: THEMES.emerald,
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M6.5 6.5h.01M9 6.5h.01" />
        <path d="M10 13l-2 2 2 2M14 13l2 2-2 2" />
      </svg>
    ),
  },
  {
    title: 'AI Agents',
    description: 'Custom AI agents that plan, use your tools and data, and complete multi-step tasks on their own.',
    tags: ['Custom agents', 'Tool & API calling', 'Multi-step tasks'],
    theme: THEMES.amber,
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="7" width="14" height="12" rx="3" />
        <path d="M12 7V4M9 4h6" />
        <circle cx="9.5" cy="12.5" r="1" />
        <circle cx="14.5" cy="12.5" r="1" />
        <path d="M9.5 16h5M3 12v3M21 12v3" />
      </svg>
    ),
  },
];

const STEPS = [
  { title: 'Tell me about your project', text: 'A short email with what you need and what you have so far.' },
  { title: 'Get a plan and estimate', text: 'I reply with questions, a proposed approach, and an estimate.' },
  { title: 'Build and launch', text: 'I build it, keep you updated, and help you launch.' },
];

// Press feedback: a subtle scale on :active so buttons feel like they heard you.
const pressable = 'transition-transform duration-150 ease-out active:scale-[0.97]';
export default function WorkWithMe() {
  return (
    <section id="work-with-me" aria-labelledby="work-with-me-heading" className="scroll-mt-24 border-t border-gray-200/80 py-16 sm:py-20">
      {/* Header: pitch on the left, the action on the right */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Open to new projects
          </p>
          <h2 id="work-with-me-heading" className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Need something built?
          </h2>
          <p className="mt-4 text-[17px] leading-8 text-gray-600">
            Besides MDTool, I build custom software for businesses: AI automations and AI agents, mobile apps,
            and websites.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href={MAILTO}
            className={`group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-b from-gray-800 to-gray-950 py-2 pl-2 pr-5 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_20px_-8px_rgba(17,24,39,0.6)] ring-1 ring-gray-950 hover:from-gray-700 hover:to-gray-900 ${pressable}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-inset ring-white/15">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
              </svg>
            </span>
            Email about a project
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5 motion-reduce:transition-none"
            >
              &rarr;
            </span>
          </a>
          <a
            href={AUTHOR.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-white py-2 pl-2 pr-5 font-semibold text-gray-900 shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-inset ring-gray-200 transition-colors hover:bg-gray-50 hover:ring-gray-300 ${pressable}`}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a66c2] text-white shadow-sm shadow-[#0a66c2]/30">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </span>
            Message on LinkedIn
            <span
              aria-hidden="true"
              className="text-gray-400 transition-transform duration-200 ease-out group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:text-gray-600 motion-reduce:transition-none"
            >
              &#8599;
            </span>
          </a>
        </div>
      </div>

      {/* Services: each card sits on a tilted card in its own colour (the page motif) */}
      <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {SERVICES.map((service, i) => (
          <li key={service.title}>
            <LayeredCard back={service.theme.back} tilt={i % 2 ? 'right' : 'left'} className="h-full">
              <div className="relative isolate h-full overflow-hidden rounded-2xl p-6 sm:p-7">
                {/* colour wash fading down from the top, plus a hairline highlight on the top edge */}
                <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b to-transparent ${service.theme.wash}`} />
                <div aria-hidden="true" className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${service.theme.edge}`} />
                <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg ${service.theme.tile}`}>
                  {service.icon}
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-gray-900">{service.title}</h3>
                <p className="mt-1.5 text-[15px] leading-6 text-gray-600">{service.description}</p>
                <ul className="mt-5 flex flex-wrap justify-center gap-1.5" aria-label={`${service.title} examples`}>
                  {service.tags.map((tag) => (
                    <li key={tag} className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${service.theme.tag}`}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </LayeredCard>
          </li>
        ))}
      </ul>

      {/* Process: three compact step cards */}
      <h3 className="mt-16 text-sm font-medium text-gray-500">How it works</h3>
      <ol className="mt-6 grid gap-8 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <LayeredCard back={i === 1 ? 'navy' : 'lavender'} tilt={i % 2 ? 'right' : 'left'} className="h-full">
              <div className="p-5">
                <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold tabular-nums text-white shadow-md shadow-gray-900/20">
                  {i + 1}
                </span>
                <p className="mt-4 font-medium text-gray-900">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-gray-600">{step.text}</p>
              </div>
            </LayeredCard>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-sm text-gray-500">
        Prefer plain email? Write to{' '}
        <a
          href={MAILTO}
          className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </section>
  );
}
