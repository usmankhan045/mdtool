// JSON-LD emitter for every page.
//
// Entity model (one linked @id graph):
//   - Organization  https://www.mdtool.dev/#organization
//   - WebSite       https://www.mdtool.dev/#website
//   - Person        https://www.mdtool.dev/about#person
// These three are emitted IN FULL exactly once per page, as a single @graph,
// by `type="organization"` (rendered from app/layout.tsx). Every other schema
// type references them by @id instead of repeating the whole block.

export const BASE_URL = 'https://www.mdtool.dev';
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const PERSON_ID = `${BASE_URL}/about#person`;

export const AUTHOR = {
  name: 'Muhammad Usman',
  url: `${BASE_URL}/about`,
  image: `${BASE_URL}/authors/muhammad-usman.jpg`,
  linkedin: 'https://www.linkedin.com/in/muhammadusman80/',
  github: 'https://github.com/usmankhan045',
  email: 'syncwithusman@gmail.com',
};

export const SITE_REPO = 'https://github.com/usmankhan045/mdtool';

// Screenshots used for WebApplication.screenshot when a page doesn't pass one.
export const DEFAULT_SCREENSHOTS: Record<string, string> = {
  '/markdown-to-pdf': `${BASE_URL}/screenshots/pdf-tool.png`,
  '/markdown-to-word': `${BASE_URL}/screenshots/word-tool.png`,
  '/markdown-to-html': `${BASE_URL}/screenshots/html-tool.png`,
  '/html-to-markdown': `${BASE_URL}/screenshots/html-to-md-tool.png`,
  '/word-to-markdown': `${BASE_URL}/screenshots/word-to-md-tool.png`,
  '/markdown-to-text': `${BASE_URL}/screenshots/text-tool.png`,
  '/markdown-table-generator': `${BASE_URL}/screenshots/table-tool.png`,
  '/es/markdown-to-pdf': `${BASE_URL}/screenshots/pdf-tool.png`,
  '/es/markdown-to-word': `${BASE_URL}/screenshots/word-tool.png`,
  '/es/word-to-markdown': `${BASE_URL}/screenshots/word-to-md-tool.png`,
  '/zh/markdown-to-word': `${BASE_URL}/screenshots/word-tool.png`,
};

type SchemaType =
  | 'tool'
  | 'blog'
  | 'techarticle'
  | 'faq'
  | 'organization'
  | 'breadcrumb'
  | 'website'
  | 'itemlist'
  | 'aboutpage'
  | 'blogindex';

interface Props {
  type: SchemaType;
  name?: string;
  url?: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  /** Absolute URL of a product screenshot (tool pages only). */
  screenshot?: string;
  /** Kept for backwards compatibility; authorship now resolves to the Person/Organization @id. */
  author?: string;
  faqs?: { q: string; a: string }[];
  breadcrumbs?: { name: string; url: string }[];
  featureList?: string[];
  /** BCP 47 language of the page content (default 'en'). */
  inLanguage?: string;
  items?: { name: string; url: string; description?: string; datePublished?: string; dateModified?: string }[];
}

const abs = (u: string) => (u.startsWith('http') ? u : u === '/' ? BASE_URL : `${BASE_URL}${u}`);

const ref = (id: string) => ({ '@id': id });

export const organizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'MDTool',
  alternateName: ['MD Tool', 'mdtool.dev'],
  description:
    'MDTool is a free, browser-based Markdown converter: Markdown to PDF, HTML, and Word — and back. All conversion runs client-side with no login, no uploads, and no watermarks.',
  disambiguatingDescription:
    'MDTool (mdtool.dev) is an online Markdown document converter. It is unrelated to the MonoDevelop mdtool command-line utility and to MDTools, the SolidWorks/Inventor manifold-design add-in.',
  url: BASE_URL,
  logo: { '@type': 'ImageObject', '@id': `${BASE_URL}/#logo`, url: `${BASE_URL}/logo.png`, width: 512, height: 512 },
  image: ref(`${BASE_URL}/#logo`),
  founder: ref(PERSON_ID),
  email: AUTHOR.email,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: AUTHOR.email,
    url: `${BASE_URL}/contact`,
    availableLanguage: ['English'],
  },
  knowsAbout: ['Markdown', 'GitHub Flavored Markdown', 'PDF generation', 'HTML conversion', 'DOCX / Word documents'],
  sameAs: [SITE_REPO],
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'MDTool',
  alternateName: 'MDTool Markdown Converter',
  url: BASE_URL,
  inLanguage: 'en',
  description: 'Free online Markdown converter: Markdown to PDF, HTML, Word, and back, all client-side.',
  publisher: ref(ORG_ID),
};

export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: AUTHOR.name,
  url: AUTHOR.url,
  image: { '@type': 'ImageObject', url: AUTHOR.image, width: 400, height: 400 },
  // Role as stated on /about ("a software developer who works on browser-based
  // document processing and web tooling").
  jobTitle: 'Software Developer',
  description:
    'Muhammad Usman builds and maintains every converter on MDTool and writes its guides based on the tools\' documented behavior and hands-on testing.',
  worksFor: ref(ORG_ID),
  email: AUTHOR.email,
  // How to hire him; mirrors the "Work with me" block on /about.
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'project inquiries',
    email: AUTHOR.email,
    url: `${BASE_URL}/about#work-with-me`,
  },
  sameAs: [AUTHOR.linkedin, AUTHOR.github],
  // Topics he works in; the technologies are the ones MDTool itself is built with.
  knowsAbout: [
    'Markdown',
    'Document conversion',
    'PDF generation',
    'AI automation',
    'Mobile app development',
    'Web development',
    'Next.js',
    'React',
    'TypeScript',
  ],
  // Services offered, as described in the "Work with me" section of /about.
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        provider: ref(PERSON_ID),
        areaServed: 'Worldwide',
        name: 'AI automations',
        description: 'AI agents and workflows, LLM integrations, and automation of repetitive business processes.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        provider: ref(PERSON_ID),
        areaServed: 'Worldwide',
        name: 'Mobile app development',
        description: 'Mobile apps for iOS and Android.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        provider: ref(PERSON_ID),
        areaServed: 'Worldwide',
        name: 'Websites and web apps',
        description: 'Websites and web applications, from marketing sites to custom browser-based tools.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        provider: ref(PERSON_ID),
        areaServed: 'Worldwide',
        name: 'Other IT services',
        description: 'Custom tools, system integrations, and ongoing maintenance of existing software.',
      },
    },
  ],
};

export default function StructuredData({
  type,
  name,
  url,
  description,
  datePublished,
  dateModified,
  image,
  screenshot,
  faqs,
  breadcrumbs,
  featureList,
  inLanguage,
  items,
}: Props) {
  const pageUrl = abs(url || '/');

  const article = (schemaType: 'BlogPosting' | 'TechArticle') => ({
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${pageUrl}#article`,
    headline: name,
    description,
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    isPartOf: ref(WEBSITE_ID),
    image: {
      '@type': 'ImageObject',
      url: abs(image || '/og-image.png'),
      // Post images vary in size (local 1200x685-857, Unsplash crops 1200x630), so
      // only the known OG image declares dimensions.
      ...(image ? {} : { width: 1200, height: 630 }),
    },
    inLanguage: inLanguage || 'en',
    datePublished,
    dateModified: dateModified || datePublished,
    author: ref(PERSON_ID),
    publisher: ref(ORG_ID),
  });

  const build = (): object => {
    switch (type) {
      case 'organization':
        // Full entity definitions, once per page (rendered from the root layout).
        return {
          '@context': 'https://schema.org',
          '@graph': [organizationNode, websiteNode, personNode],
        };

      case 'website':
        // The WebSite entity itself is already in the layout @graph; the homepage
        // gets a WebPage node that points at it rather than a second copy.
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${BASE_URL}/#webpage`,
          url: BASE_URL,
          name: name || 'MDTool — Free Online Markdown Converter',
          description: description || websiteNode.description,
          isPartOf: ref(WEBSITE_ID),
          about: ref(ORG_ID),
          inLanguage: 'en',
        };

      case 'aboutpage':
        return {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name,
          description,
          inLanguage: 'en',
          isPartOf: ref(WEBSITE_ID),
          mainEntity: ref(ORG_ID),
          about: ref(ORG_ID),
          author: ref(PERSON_ID),
          dateModified,
          breadcrumb: ref(`${pageUrl}#breadcrumb`),
        };

      case 'itemlist':
        return {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${BASE_URL}/#tools-list`,
          url: BASE_URL,
          name: name || 'MDTool Developer Tools',
          itemListElement: (items || []).map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            url: abs(item.url),
            description: item.description,
          })),
        };

      case 'breadcrumb': {
        const crumbs = breadcrumbs || [];
        const last = crumbs[crumbs.length - 1];
        const crumbPage = url ? pageUrl : last ? abs(last.url) : BASE_URL;
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          '@id': `${crumbPage}#breadcrumb`,
          itemListElement: crumbs.map(({ name: itemName, url: itemUrl }, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: itemName,
            // '/' resolves to the canonical homepage URL (no trailing slash)
            item: abs(itemUrl),
          })),
        };
      }

      case 'tool': {
        const shot = screenshot || (url ? DEFAULT_SCREENSHOTS[url] : undefined);
        return {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          '@id': `${pageUrl}#app`,
          name: name || 'MDTool Developer Tools',
          url: pageUrl,
          description: description || 'Free online developer tools: Markdown to PDF converter and more.',
          mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
          isPartOf: ref(WEBSITE_ID),
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Any',
          browserRequirements: 'Requires JavaScript',
          inLanguage: inLanguage || 'en',
          datePublished,
          dateModified: dateModified || '2026-06-24',
          author: ref(ORG_ID),
          publisher: ref(ORG_ID),
          ...(shot ? { screenshot: abs(shot) } : {}),
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          featureList: featureList || [
            'Markdown to PDF conversion',
            'GitHub Flavored Markdown support',
            'Code syntax highlighting',
            'Mermaid diagram support',
            'Multiple PDF themes',
            'Client-side processing, files never uploaded',
          ],
        };
      }

      case 'blog':
        return article('BlogPosting');

      case 'techarticle':
        return article('TechArticle');

      case 'blogindex':
        return {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': `${pageUrl}#blog`,
          url: pageUrl,
          name,
          description,
          inLanguage: 'en',
          isPartOf: ref(WEBSITE_ID),
          publisher: ref(ORG_ID),
          author: ref(PERSON_ID),
          blogPost: (items || []).map((item) => ({
            '@type': 'BlogPosting',
            '@id': `${abs(item.url)}#article`,
            headline: item.name,
            url: abs(item.url),
            datePublished: item.datePublished,
            dateModified: item.dateModified || item.datePublished,
            author: ref(PERSON_ID),
          })),
        };

      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          ...(url ? { '@id': `${pageUrl}#faq` } : {}),
          mainEntity: (faqs || []).map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        };
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(build()) }}
    />
  );
}
