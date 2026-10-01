import type { ReactNode } from 'react';
import { AUTHOR } from '@/components/seo/StructuredData';

const CONTACT_EMAIL = 'syncwithusman@gmail.com';
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=Project%20inquiry%20via%20MDTool`;

const iconProps = {
  className: 'h-6 w-6',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

const SERVICES: { title: string; description: string; examples: string[]; icon: ReactNode }[] = [
  {
    title: 'AI automations',
    description: 'Put AI to work on the repetitive parts of your business, wired into the tools you already use.',
    examples: [
      'AI agents and multi-step workflows',
      'LLM integrations in existing products',
      'Automating repetitive business processes',
    ],
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
  {
    title: 'Mobile apps',
    description: 'Apps for iOS and Android, from first version to store release.',
    examples: [
      'iOS and Android apps',
      'Connecting apps to APIs and backends',
      'Updates and improvements to existing apps',
    ],
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
    examples: [
      'Business and product websites',
      'Custom web applications and dashboards',
      'Browser-based tools like MDTool',
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M6.5 6.5h.01M9 6.5h.01" />
        <path d="M10 13l-2 2 2 2M14 13l2 2-2 2" />
      </svg>
    ),
  },
  {
    title: 'Other IT services',
    description: 'Smaller or ongoing technical work that doesn’t fit a neat category.',
    examples: [
      'Custom internal tools and scripts',
      'Integrations between systems and APIs',
      'Maintenance of existing software',
    ],
    icon: (
      <svg {...iconProps}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L4 16.7 7.3 20l5.3-5.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z" />
      </svg>
    ),
  },
];

const STEPS = [
  { title: 'Tell me about your project', text: 'Send a short email describing what you need and what you have so far.' },
  { title: 'Get a plan and estimate', text: 'I reply with questions, a proposed approach, and an estimate.' },
  { title: 'Build and launch', text: 'I build it, keep you updated along the way, and help you launch.' },
];

export default function WorkWithMe() {
  return (
    <section
      id="work-with-me"
      aria-labelledby="work-with-me-heading"
      className="scroll-mt-20 overflow-hidden rounded-2xl bg-gradient-to-br from-[#16314f] to-[#0f1e30] text-white shadow-lg"
    >
      <div className="px-5 py-10 sm:px-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">Work with me</p>
        <h2 id="work-with-me-heading" className="mt-2 text-2xl font-bold sm:text-3xl">
          Need something built? Work with Muhammad
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-blue-100/80">
          The person behind MDTool also builds custom software for businesses. If you need an AI automation,
          a mobile app, a website or web app, or help with another technical project, get in touch.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.title} className="rounded-xl bg-white p-5 text-gray-900 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {service.icon}
                </span>
                <h3 className="text-lg font-semibold">{service.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{service.description}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                {service.examples.map((example) => (
                  <li key={example} className="flex gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z" clipRule="evenodd" />
                    </svg>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-sm font-semibold uppercase tracking-widest text-blue-300">How it works</h3>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-blue-100/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={MAILTO}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            Email about a project
          </a>
          <a
            href={AUTHOR.linkedin}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Message on LinkedIn
          </a>
        </div>
        <p className="mt-4 text-sm text-blue-100/60">
          Or write directly to{' '}
          <a href={MAILTO} className="text-blue-200 underline-offset-2 hover:underline">{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </section>
  );
}
