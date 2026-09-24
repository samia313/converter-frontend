import type { MetadataRoute } from 'next'
import { guides as coreGuides } from '@/lib/content/how-to-guides'
import { additionalGuides } from '@/lib/content/additional-guides'
import { editorialBlogPosts } from '@/lib/content/editorial-blog-posts'

const BASE_URL = 'https://pdfilio.com'
const guides = [...coreGuides, ...additionalGuides]

const staticPages = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/features', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/ai-tools', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/comparisons', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/use-cases', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/security', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
]

const aiPages = [
  // Only canonical, indexable AI landing pages belong in the sitemap.
  'ai-document-rewriter',
  'ai-research-writing-assistant',
  'ai-document-chat-tool',
  'ai-research-assistant',
].map((slug) => ({ path: `/${slug}`, priority: 0.8, changeFrequency: 'monthly' as const }))

const toolPages = [
  'merge-pdf','split-pdf','rotate-pdf','organize-pdf','remove-pages','crop-pdf','page-numbers','compress-pdf',
  'word-to-pdf','excel-to-pdf','powerpoint-to-pdf','jpg-to-pdf','html-to-pdf','image-to-pdf',
  'pdf-to-word','pdf-to-excel','pdf-to-powerpoint','pdf-to-jpg','pdf-to-png','pdf-to-image','ocr','ai-summary','translate-pdf-online',
  'pdf-chat','flatten-pdf','extract-pages','watermark-pdf','redact-pdf','protect-pdf','unlock-pdf','sign-pdf','edit-pdf','pdf-metadata',
].map((slug) => ({ path: `/${slug}`, priority: 0.9, changeFrequency: 'monthly' as const }))

const longTailGuides = guides.map((guide) => ({
  path: `/guides/${guide.slug}`,
  priority: 0.75,
  changeFrequency: 'monthly' as const,
  lastModified: new Date(guide.publishedAt),
}))

const editorialBlogPages = editorialBlogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  priority: post.featured ? 0.8 : 0.7,
  changeFrequency: 'monthly' as const,
  lastModified: new Date(post.updatedAt),
}))

function uniqueEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}

function isCanonicalSitemapUrl(url: string): boolean {
  const path = new URL(url).pathname
  // Legacy/redirected/private utility routes must never enter the XML sitemap.
  return !(
    path === '/vs' ||
    path.startsWith('/vs/') ||
    path === '/sitemap' ||
    path === '/sitemap-page' ||
    path === '/robots' ||
    path.startsWith('/tools/')
  )
}

export default function sitemap(): MetadataRoute.Sitemap {
  return uniqueEntries([
    ...staticPages.map((page) => ({ url: `${BASE_URL}${page.path}`, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...toolPages.map((page) => ({ url: `${BASE_URL}${page.path}`, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...aiPages.map((page) => ({ url: `${BASE_URL}${page.path}`, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...longTailGuides.map((page) => ({ url: `${BASE_URL}${page.path}`, changeFrequency: page.changeFrequency, priority: page.priority, lastModified: page.lastModified })),
    ...editorialBlogPages.map((page) => ({ url: `${BASE_URL}${page.path}`, changeFrequency: page.changeFrequency, priority: page.priority, lastModified: page.lastModified })),
  ].filter((entry) => isCanonicalSitemapUrl(entry.url)))
}
