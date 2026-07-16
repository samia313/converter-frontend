import { NextResponse } from 'next/server'

const SITE_URL = 'https://pdfilio.com'

// All static pages
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/tools', priority: 0.9, changefreq: 'daily' },
  { path: '/features', priority: 0.9, changefreq: 'weekly' },
  { path: '/pricing', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.85, changefreq: 'daily' },
  { path: '/guides', priority: 0.8, changefreq: 'weekly' },
  { path: '/vs', priority: 0.8, changefreq: 'weekly' },
  { path: '/use-cases', priority: 0.8, changefreq: 'weekly' },
  { path: '/about', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.5, changefreq: 'yearly' },
  { path: '/terms', priority: 0.5, changefreq: 'yearly' },
  { path: '/demo', priority: 0.7, changefreq: 'weekly' },
  { path: '/affiliate', priority: 0.6, changefreq: 'monthly' },
  { path: '/roadmap', priority: 0.6, changefreq: 'monthly' },
]

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0]

    const pagesSitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

    console.log(`[SITEMAP] Generated pages sitemap with ${staticPages.length} URLs`)

    return new NextResponse(pagesSitemapXML, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    })
  } catch (error) {
    console.error('[SITEMAP] Error generating pages sitemap:', error)
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 })
  }
}
