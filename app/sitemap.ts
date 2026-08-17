import type { MetadataRoute } from 'next'
import { getAllGuideUrls, getAllComparisonUrls, getAllUseCaseUrls } from '@/lib/content'

const BASE_URL = 'https://pdfilio.com'

const staticPages = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/features', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/vs', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/use-cases', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
]

// Verified production tool routes. These are the real tool pages and avoid
// duplicating the SEO-only /tools/[slug] landing routes in the sitemap.
const toolPages = [
  'merge-pdf', 'split-pdf', 'rotate-pdf', 'remove-pages', 'crop-pdf', 'page-numbers',
  'compress-pdf',
  'word-to-pdf', 'excel-to-pdf', 'powerpoint-to-pdf', 'jpg-to-pdf', 'html-to-pdf', 'image-to-pdf',
  'pdf-to-word', 'pdf-to-excel', 'pdf-to-powerpoint', 'pdf-to-jpg', 'pdf-to-png',
  'ocr', 'ai-summary', 'pdf-chat', 'watermark-pdf', 'redact-pdf', 'protect-pdf',
  'unlock-pdf', 'sign-pdf', 'edit-pdf',
].map((slug) => ({ path: `/${slug}`, priority: 0.9, changeFrequency: 'monthly' as const }))

function uniqueEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    const staticEntries: MetadataRoute.Sitemap = [...staticPages, ...toolPages].map((page) => ({
      url: `${BASE_URL}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))

    const guideEntries: MetadataRoute.Sitemap = getAllGuideUrls().map((url) => ({
      url: `${BASE_URL}${url}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    const comparisonEntries: MetadataRoute.Sitemap = getAllComparisonUrls().map((url) => ({
      url: `${BASE_URL}${url}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    }))

    const useCaseEntries: MetadataRoute.Sitemap = getAllUseCaseUrls().map((url) => ({
      url: `${BASE_URL}${url}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    }))

    return uniqueEntries([...staticEntries, ...guideEntries, ...comparisonEntries, ...useCaseEntries])
  } catch (error) {
    console.error('[SITEMAP] Error generating sitemap:', error)
    return [...staticPages, ...toolPages].map((page) => ({
      url: `${BASE_URL}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  }
}
