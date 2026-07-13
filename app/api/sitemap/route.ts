/**
 * Sitemap API Route - Serves sitemap.xml
 */

import { NextResponse } from 'next/server'
import { generateSitemapXML } from '@/lib/sitemap'

export async function GET() {
  try {
    const xml = generateSitemapXML()

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    })
  } catch (error) {
    console.error('[v0] Sitemap generation error:', error)
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 })
  }
}
