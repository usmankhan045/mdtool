interface Props {
  type: 'tool' | 'blog' | 'faq';
  name?: string;
  url?: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  faqs?: { q: string; a: string }[];
}

export default function StructuredData({ type, name, url, description, datePublished, dateModified, faqs }: Props) {
  const baseUrl = 'https://devmark.tools';

  const schemas: Record<string, object> = {
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
