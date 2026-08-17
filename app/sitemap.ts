import type { MetadataRoute } from 'next'
import { getAllGuideUrls, getAllComparisonUrls, getAllUseCaseUrls } from '@/lib/content'
import { blogPosts } from '@/lib/content/blog-posts-1000'
import { chatPdfBlogPosts } from '@/lib/content/blog-posts-200-chat-pdf'

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
    // Do not emit artificial "last modified" dates. Google gets a more
    // trustworthy freshness signal when lastModified is based on real content changes.
    const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))

    const blogEntries: MetadataRoute.Sitemap = [...blogPosts, ...chatPdfBlogPosts]
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        ...(post.updatedAt ? { lastModified: new Date(post.updatedAt) } : {}),
        changeFrequency: 'weekly' as const,
        priority: post.featured ? 0.85 : 0.75,
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

    return uniqueEntries([
      ...staticEntries,
      ...blogEntries,
      ...guideEntries,
      ...comparisonEntries,
      ...useCaseEntries,
    ])
  } catch (error) {
    console.error('[SITEMAP] Error generating sitemap:', error)
    return staticPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  }
}
