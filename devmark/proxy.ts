import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Vercel preview/branch deployments (*.vercel.app) must never be indexed —
// only www.mdtool.dev is the canonical, indexable host.
export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const response = NextResponse.next();

  if (host.includes('vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
