type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: AnalyticsParams) => void;
  }
}

function getPagePath(): string {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const sanitizedParams = Object.fromEntries(
    Object.entries({ ...params, page_path: getPagePath() }).filter(([, value]) => value !== undefined),
  );
  window.gtag('event', eventName, sanitizedParams);
}

export function trackToolAction(
  action: string,
  format: string,
  params: AnalyticsParams = {},
): void {
  trackEvent(`tool_${action}`, {
    tool_format: format,
    ...params,
  });
}
