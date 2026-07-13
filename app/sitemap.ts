import { MetadataRoute } from 'next'
import {
  getAllBlogUrls,
  getAllGuideUrls,
  getAllComparisonUrls,
  getAllUseCaseUrls,
  getAllFeatureUrls,
  getAllToolUrls,
} from '@/lib/content'

const BASE_URL = 'https://pdfilio.com'

// Core static pages
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' as const },
  { path: '/tools', priority: 0.9, changefreq: 'daily' as const },
  { path: '/features', priority: 0.9, changefreq: 'weekly' as const },
  { path: '/pricing', priority: 0.9, changefreq: 'weekly' as const },
  { path: '/blog', priority: 0.8, changefreq: 'daily' as const },
  { path: '/guides', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/vs', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/use-cases', priority: 0.8, changefreq: 'weekly' as const },
  { path: '/about', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/privacy', priority: 0.5, changefreq: 'yearly' as const },
  { path: '/terms', priority: 0.5, changefreq: 'yearly' as const },
  { path: '/faq', priority: 0.7, changefreq: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Get all dynamic URLs
    const blogUrls = getAllBlogUrls()
    const guideUrls = getAllGuideUrls()
    const comparisonUrls = getAllComparisonUrls()
    const useCaseUrls = getAllUseCaseUrls()
    const featureUrls = getAllFeatureUrls()
    const toolUrls = getAllToolUrls()

    // Create static entries
    const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changefreq,
      priority: page.priority,
    }))

    // Blog entries (1000 pages)
    const blogEntries: MetadataRoute.Sitemap = blogUrls.map((url) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Guide entries (150 pages)
    const guideEntries: MetadataRoute.Sitemap = guideUrls.map((url) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Comparison entries (150 pages)
    const comparisonEntries: MetadataRoute.Sitemap = comparisonUrls.map((url) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(Date.now() - Math.random() * 45 * 24 * 60 * 60 * 1000),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Use case entries (500 pages)
    const useCaseEntries: MetadataRoute.Sitemap = useCaseUrls.map((url) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Feature entries (150 pages)
    const featureEntries: MetadataRoute.Sitemap = featureUrls.map((url) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Tool hub entries (400+ pages)
    const toolEntries: MetadataRoute.Sitemap = toolUrls.map((url) => ({
      url: `${BASE_URL}${url}`,
      lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))

    // Combine all entries
    const allEntries = [
      ...staticEntries,
      ...blogEntries,
      ...guideEntries,
      ...comparisonEntries,
      ...useCaseEntries,
      ...featureEntries,
      ...toolEntries,
    ]

    console.log(`[SITEMAP] Generated sitemap with ${allEntries.length} URLs`)

    return allEntries
  } catch (error) {
    console.error('[SITEMAP] Error generating sitemap:', error)
    // Return at minimum static pages
    return staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changefreq,
      priority: page.priority,
    }))
  }
}
