'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

type ContactDestination = 'email' | 'github' | 'linkedin';

function getDestination(href: string): ContactDestination | null {
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('github.com')) return 'github';
  if (href.includes('linkedin.com')) return 'linkedin';
  return null;
}

export default function ContactLinkTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;

      const destination = getDestination(link.href);
      if (!destination) return;

      trackEvent('contact_link_click', {
        contact_destination: destination,
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
