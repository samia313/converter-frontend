import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Prevent www redirect for API routes - they should work on both domains
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // API routes should not be redirected
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Handle www redirect only for non-API routes
  if (hostname.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = hostname.replace('www.', '');
    return NextResponse.redirect(url, { status: 308 });
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on specific paths
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
