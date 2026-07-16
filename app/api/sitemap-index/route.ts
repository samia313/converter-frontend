import { NextResponse } from 'next/server'

const SITE_URL = 'https://pdfilio.com'

/**
 * Generate complete sitemap index with all category sitemaps
 * This combines all 1200+ blog posts, guides, comparisons, use cases, and tools
 */
export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  // All sitemaps categorized
  const sitemaps = [
    // Main sitemaps
    {
      loc: `${SITE_URL}/sitemap.xml`,
      lastmod: today,
      description: 'Main sitemap with all core pages and 1200+ blog posts'
    },
    {
      loc: `${SITE_URL}/blog-sitemap.xml`,
      lastmod: today,
      description: 'Blog posts sitemap (1200 posts)'
    },
    {
      loc: `${SITE_URL}/tools-sitemap.xml`,
      lastmod: today,
      description: 'PDF tools and features sitemap'
    },
    // Category sitemaps
    {
      loc: `${SITE_URL}/api/sitemaps/blog`,
      lastmod: today,
      description: 'All blog posts (1200 URLs)'
    },
    {
      loc: `${SITE_URL}/api/sitemaps/guides`,
      lastmod: today,
      description: 'Guide pages (150+ URLs)'
    },
    {
      loc: `${SITE_URL}/api/sitemaps/comparisons`,
      lastmod: today,
      description: 'Comparison pages (150+ URLs)'
    },
    {
      loc: `${SITE_URL}/api/sitemaps/use-cases`,
      lastmod: today,
      description: 'Use case pages (500+ URLs)'
    },
    {
      loc: `${SITE_URL}/api/sitemaps/tools`,
      lastmod: today,
      description: 'Tools and features (100+ URLs)'
    },
    {
      loc: `${SITE_URL}/api/sitemaps/pages`,
      lastmod: today,
      description: 'Static pages (20+ URLs)'
    },
    // Mobile sitemap
    {
      loc: `${SITE_URL}/api/sitemaps/mobile`,
      lastmod: today,
      description: 'Mobile-friendly URLs'
    },
  ]

  // Generate XML sitemap index
  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sitemap) => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`

  return new NextResponse(sitemapIndexXML, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
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
