import { NextResponse } from 'next/server'
import { sitemapXml } from '@/lib/seo/sitemap-categories'

export async function GET() {
  return new NextResponse(sitemapXml('converters'), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
