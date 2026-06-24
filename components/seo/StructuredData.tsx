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
  const baseUrl = 'https://www.mdtool.dev';

  const schemas: Record<string, object> = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'MDTool',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'MDTool',
      url: baseUrl,
      description: description || 'Free online developer tools — Markdown to PDF, HTML, Word, and back, all client-side.',
      publisher: { '@type': 'Organization', name: 'MDTool', url: baseUrl, logo: `${baseUrl}/logo.png` },
    },
    itemlist: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
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
        item: itemUrl.startsWith('http') ? itemUrl : `${baseUrl}${itemUrl}`,
      })),
    },
    tool: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: name || 'MDTool — Developer Tools',
      url: `${baseUrl}${url || ''}`,
      description: description || 'Free online developer tools — Markdown to PDF converter and more.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
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
        'Client-side processing — files never uploaded',
      ],
    },
    blog: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: name,
      url: `${baseUrl}${url || ''}`,
      image: image ? `${baseUrl}${image}` : `${baseUrl}/og-image.png`,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Organization',
        name: author || 'MDTool Editorial Team',
        url: baseUrl,
        description: 'The MDTool team builds and maintains every converter on this site and writes guides based on its own tools\' documented behavior and public feature comparisons.',
      },
      publisher: {
        '@type': 'Organization',
        name: 'MDTool',
        logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png`, width: 512, height: 512 },
      },
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
