interface Props {
  type: 'tool' | 'blog' | 'faq' | 'organization' | 'breadcrumb';
  name?: string;
  url?: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  faqs?: { q: string; a: string }[];
  breadcrumbs?: { name: string; url: string }[];
}

export default function StructuredData({ type, name, url, description, datePublished, dateModified, faqs, breadcrumbs }: Props) {
  const baseUrl = 'https://www.mdtool.dev';

  const schemas: Record<string, object> = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'DevMark',
      url: baseUrl,
      logo: `${baseUrl}/favicon.ico`,
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
      name: name || 'DevMark — Developer Tools',
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
      featureList: [
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
      datePublished,
      dateModified: dateModified || datePublished,
      author: { '@type': 'Organization', name: 'DevMark' },
      publisher: {
        '@type': 'Organization',
        name: 'DevMark',
        logo: { '@type': 'ImageObject', url: `${baseUrl}/favicon.ico` },
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
