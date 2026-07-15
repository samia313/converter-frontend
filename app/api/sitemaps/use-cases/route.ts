import { NextResponse } from 'next/server'
import { getAllUseCaseUrls } from '@/lib/content'

const SITE_URL = 'https://pdfilio.com'

export async function GET() {
  try {
    const useCaseUrls = getAllUseCaseUrls()

    const useCasesSitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${useCaseUrls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

    console.log(`[SITEMAP] Generated use-cases sitemap with ${useCaseUrls.length} URLs`)

    return new NextResponse(useCasesSitemapXML, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('[SITEMAP] Error generating use-cases sitemap:', error)
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 })
  }
}
