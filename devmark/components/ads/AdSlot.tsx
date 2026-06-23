'use client';

import { useEffect, useRef } from 'react';

interface Props {
  slotId: string;
  format: 'horizontal' | 'vertical' | 'square';
  className?: string;
  adSlotNumber?: string;
}

const SLOT_CONFIG = {
  horizontal: { style: { display: 'block', minHeight: '90px' }, format: 'auto', fullWidthResponsive: true },
  vertical:   { style: { display: 'block', width: '300px', height: '600px' }, format: '', fullWidthResponsive: false },
  square:     { style: { display: 'block', minHeight: '250px' }, format: 'rectangle', fullWidthResponsive: false },
};

declare global {
  interface Window { adsbygoogle: unknown[] }
}

export default function AdSlot({ slotId, format, className = '', adSlotNumber }: Props) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const config = SLOT_CONFIG[format];
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  const placeholderHeight = format === 'vertical' ? '600px' : format === 'square' ? '250px' : '90px';

  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`my-4 p-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded text-center text-xs text-gray-400 flex items-center justify-center ${className}`}
        style={{ minHeight: placeholderHeight }}
      >
        Ad Slot: {slotId} ({format})
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (initialized.current || !adsenseId || !adSlotNumber) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [adsenseId, adSlotNumber]);

  // No real AdSense publisher/slot ID configured yet — render nothing rather than
  // ship a non-functional placeholder ad unit to production.
  if (!adsenseId || !adSlotNumber) return null;

  return (
    <div className={`my-4 overflow-hidden ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={config.style as React.CSSProperties}
        data-ad-client={adsenseId}
        data-ad-slot={adSlotNumber}
        data-ad-format={config.format || undefined}
        data-full-width-responsive={config.fullWidthResponsive ? 'true' : undefined}
      />
    </div>
  );
}
