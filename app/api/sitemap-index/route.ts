import { NextResponse } from 'next/server'

const CANONICAL_SITEMAP_INDEX = 'https://pdfilio.com/sitemap-index.xml'

/**
 * Keep the legacy sitemap URL available, but direct crawlers to the canonical
 * sitemap index. This prevents the old, oversized sitemap index from competing
 * with the current canonical sitemap structure.
 */
export async function GET() {
  return NextResponse.redirect(CANONICAL_SITEMAP_INDEX, 308)
}

/**
 * Also provide JSON version for reference
 */
export async function POST() {
  const today = new Date().toISOString().split('T')[0]

  const sitemaps = [
    {
      name: 'Main Sitemap',
      url: `${SITE_URL}/sitemap.xml`,
      type: 'primary',
      description: 'Main sitemap with all core pages and 1200+ blog posts',
      lastModified: today,
      urls: '2000+',
    },
    {
      name: 'Blog Posts',
      url: `${SITE_URL}/api/sitemaps/blog`,
      type: 'category',
      description: 'All 1200 blog posts (Chat with PDF + existing posts)',
      lastModified: today,
      urls: '1200',
    },
    {
      name: 'Guides',
      url: `${SITE_URL}/api/sitemaps/guides`,
      type: 'category',
      description: 'How-to guides and tutorials',
      lastModified: today,
      urls: '150+',
    },
    {
      name: 'Comparisons',
      url: `${SITE_URL}/api/sitemaps/comparisons`,
      type: 'category',
      description: 'Tool comparisons and reviews',
      lastModified: today,
      urls: '150+',
    },
    {
      name: 'Use Cases',
      url: `${SITE_URL}/api/sitemaps/use-cases`,
      type: 'category',
      description: 'Industry-specific use cases',
      lastModified: today,
      urls: '500+',
    },
    {
      name: 'Tools & Features',
      url: `${SITE_URL}/api/sitemaps/tools`,
      type: 'category',
      description: 'PDF tools and features',
      lastModified: today,
      urls: '100+',
    },
    {
      name: 'Static Pages',
      url: `${SITE_URL}/api/sitemaps/pages`,
      type: 'category',
      description: 'Core website pages',
      lastModified: today,
      urls: '20+',
    },
  ]

  return NextResponse.json(
    {
      status: 'success',
      message: 'Complete sitemap index for all website content',
      totalSitemaps: sitemaps.length,
      estimatedTotalUrls: '2500+',
      lastUpdated: today,
      instructions: {
        googleSearchConsole: 'Add to GSC: https://pdfilio.com/api/sitemap-index',
        bingWebmasterTools: 'Add to Bing: https://pdfilio.com/api/sitemap-index',
        googleAnalytics: 'Use sitemap.xml in GA4 Search Console integration',
        robots_txt: 'Already configured in /robots.txt with Sitemap directives',
      },
      sitemaps,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  )
}
