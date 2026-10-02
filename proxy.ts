import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Vercel preview/branch deployments (*.vercel.app) must never be indexed -
// only www.mdtool.dev is the canonical, indexable host.
// AI answers (Copilot, ChatGPT) sometimes print our links with typographic
// dashes, e.g. /markdown‑to‑word with U+2011 non-breaking hyphens. Those
// URLs 404'd for real visitors, so 301 them to the plain-hyphen path.
const FANCY_DASH = /[\u2010-\u2015\u2212]/;

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';

  let path = request.nextUrl.pathname;
  try {
    path = decodeURIComponent(path);
  } catch {
    // malformed escape sequence: leave the path as it is
  }
  if (FANCY_DASH.test(path)) {
    const url = request.nextUrl.clone();
    url.pathname = path.replace(new RegExp(FANCY_DASH.source, 'g'), '-');
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();

  if (host.includes('vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
