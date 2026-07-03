interface Props {
  type: 'tool' | 'blog' | 'faq' | 'organization' | 'breadcrumb' | 'website' | 'itemlist';
  name?: string;
  url?: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  author?: string;
  faqs?: { q: string; a: string }[];
  breadcrumbs?: { name: string; url: string }[];
  featureList?: string[];
  items?: { name: string; url: string; description?: string }[];
}

export default function StructuredData({ type, name, url, description, datePublished, dateModified, image, author, faqs, breadcrumbs, featureList, items }: Props) {
  const toolDateModified = dateModified || '2026-06-24';
  const baseUrl = 'https://www.mdtool.dev';

  const schemas: Record<string, object> = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'MDTool',
      alternateName: ['MD Tool', 'mdtool.dev'],
      description:
        'MDTool is a free, browser-based Markdown converter: Markdown to PDF, HTML, and Word — and back. All conversion runs client-side with no login, no uploads, and no watermarks.',
      disambiguatingDescription:
        'MDTool (mdtool.dev) is an online Markdown document converter. It is unrelated to the MonoDevelop mdtool command-line utility and to MDTools, the SolidWorks/Inventor manifold-design add-in.',
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png`, width: 512, height: 512 },
      founder: {
        '@type': 'Person',
        name: 'Muhammad Usman',
        url: `${baseUrl}/about`,
        sameAs: ['https://github.com/usmankhan045'],
      },
      knowsAbout: ['Markdown', 'GitHub Flavored Markdown', 'PDF generation', 'HTML conversion', 'DOCX / Word documents'],
      sameAs: ['https://github.com/usmankhan045/mdtool'],
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'MDTool',
      alternateName: 'MDTool Markdown Converter',
      url: baseUrl,
      inLanguage: 'en',
      description: description || 'Free online Markdown converter: Markdown to PDF, HTML, Word, and back, all client-side.',
      publisher: { '@id': `${baseUrl}/#organization` },
    },
    itemlist: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${baseUrl}/#tools-list`,
      url: baseUrl,
      name: name || 'MDTool Developer Tools',
      itemListElement: (items || []).map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
        description: item.description,
      })),
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: (breadcrumbs || []).map(({ name: itemName, url: itemUrl }, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: itemName,
        // '/' must resolve to the canonical homepage URL (no trailing slash)
        item: itemUrl.startsWith('http') ? itemUrl : itemUrl === '/' ? baseUrl : `${baseUrl}${itemUrl}`,
      })),
    },
    tool: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: name || 'MDTool Developer Tools',
      url: `${baseUrl}${url || ''}`,
      description: description || 'Free online developer tools: Markdown to PDF converter and more.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      datePublished,
      dateModified: toolDateModified,
      author: {
        '@type': 'Organization',
        name: author || 'MDTool',
        url: baseUrl,
      },
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
    },
    blog: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: name,
      description,
      url: `${baseUrl}${url || ''}`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}${url || ''}` },
      image: {
        '@type': 'ImageObject',
        url: image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/og-image.png`,
        width: 1200,
        height: 800,
      },
      inLanguage: 'en',
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: author || 'Muhammad Usman',
        url: `${baseUrl}/about`,
        sameAs: ['https://github.com/usmankhan045'],
        description:
          'Muhammad Usman builds and maintains every converter on MDTool and writes its guides based on the tools\' documented behavior and hands-on testing.',
      },
      publisher: { '@id': `${baseUrl}/#organization` },
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (faqs || []).map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[type]) }}
    />
  );
}
