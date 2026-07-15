/**
 * Sitemap Generator - Creates XML sitemap for all 2500 URLs
 */

import { getAllUrls, getUrlStats } from './content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfilio.com'

export interface SitemapEntry {
  loc: string
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

/**
 * Generate sitemap entries with appropriate change frequency and priority
 */
export function generateSitemapEntries(): SitemapEntry[] {
  const allUrls = getAllUrls()
  const today = new Date().toISOString().split('T')[0]

  return allUrls.map((url) => {
    let changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly'
    let priority = 0.5

    // Higher priority for core pages
    if (url === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (url.match(/^\/(compress-pdf|merge-pdf|split-pdf|convert-pdf)/)) {
      priority = 0.9
      changefreq = 'weekly'
    }
    // Blog posts - moderate priority
    else if (url.startsWith('/blog/')) {
      priority = 0.7
      changefreq = 'monthly'
    }
    // Guides - good priority
    else if (url.startsWith('/guides/')) {
      priority = 0.8
      changefreq = 'monthly'
    }
    // Comparisons - moderate priority
    else if (url.startsWith('/vs/')) {
      priority = 0.6
      changefreq = 'yearly'
    }
    // Use cases - moderate priority
    else if (url.startsWith('/use-cases/')) {
      priority = 0.6
      changefreq = 'monthly'
    }
    // Features - good priority
    else if (url.startsWith('/features/')) {
      priority = 0.7
      changefreq = 'monthly'
    }
    // Tool hub - moderate priority
    else if (url.startsWith('/tools/')) {
      priority = 0.6
      changefreq = 'monthly'
    }
    // Static pages
    else if (url.match(/^\/(pricing|premium|about|contact|faq|privacy|terms)/)) {
      priority = 0.8
      changefreq = 'monthly'
    }

    return {
      loc: `${SITE_URL}${url}`,
      lastmod: today,
      changefreq,
      priority,
    }
  })
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXML(): string {
  const entries = generateSitemapEntries()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return xml
}

/**
 * Generate sitemap index for large sitemaps (splits into multiple files)
 */
export function generateSitemapIndex(): string {
  const entries = generateSitemapEntries()
  const entriesPerSitemap = 50000 // Google's limit

  const sitemapCount = Math.ceil(entries.length / entriesPerSitemap)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: sitemapCount })
  .map(
    (_, i) => `  <sitemap>
    <loc>${SITE_URL}/sitemap-${i + 1}.xml</loc>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`

  return xml
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-index.xml

# Crawl delay (in seconds)
Crawl-delay: 1

# Disallow private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Allow specific bot access
User-agent: Googlebot
Allow: /
Crawl-delay: 0.5

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1
`
}

/**
 * Get all URLs as a simple array
 */
export function getAllSitemapUrls(): string[] {
  return getAllUrls().map((url) => `${SITE_URL}${url}`)
}

/**
 * Export statistics about the sitemap
 */
export function getSitemapStats() {
  const stats = getUrlStats()
  const entries = generateSitemapEntries()

  return {
    ...stats,
    totalEntries: entries.length,
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
  }
}

/**
 * Generate JSON format for APIs
 */
export function generateSitemapJSON() {
  const entries = generateSitemapEntries()

  return {
    urlset: {
      $: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      },
      url: entries.map((entry) => ({
        loc: [entry.loc],
        lastmod: [entry.lastmod],
        changefreq: [entry.changefreq],
        priority: [entry.priority],
      })),
    },
  }
}

/**
 * Generate CSV format for analysis
 */
export function generateSitemapCSV(): string {
  const entries = generateSitemapEntries()

  const header = 'URL,Last Modified,Change Frequency,Priority\n'
  const rows = entries
    .map((entry) => `"${entry.loc}","${entry.lastmod}","${entry.changefreq}","${entry.priority}"`)
    .join('\n')

  return header + rows
}
