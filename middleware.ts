import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Don't redirect - just serve the app normally on both domains
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
