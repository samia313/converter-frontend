import type { MetadataRoute } from 'next'
import { guides as coreGuides } from '@/lib/content/how-to-guides'
import { additionalGuides } from '@/lib/content/additional-guides'
import { editorialBlogPosts } from '@/lib/content/editorial-blog-posts'

const BASE_URL = 'https://pdfilio.com'
const guides = [...coreGuides, ...additionalGuides]

/**
 * Only canonical, index-worthy URLs belong in the XML sitemap.
 * Search-intent variants (for example *-online, *-files, *-file-to-*)
 * should not be submitted as separate sitemap targets unless they are
 * intentionally maintained as distinct canonical landing pages.
 */
const staticPages = [
  ['/', 1.0, 'weekly'],
  ['/tools', 0.9, 'weekly'],
  ['/features', 0.8, 'monthly'],
  ['/blog', 0.85, 'weekly'],
  ['/ai-tools', 0.8, 'weekly'],
  ['/comparisons', 0.75, 'monthly'],
  ['/guides', 0.8, 'weekly'],
  ['/use-cases', 0.8, 'monthly'],
  ['/security', 0.7, 'monthly'],
  ['/about', 0.5, 'monthly'],
  ['/contact', 0.5, 'monthly'],
  ['/privacy', 0.3, 'yearly'],
  ['/terms', 0.3, 'yearly'],
  ['/cookies', 0.3, 'yearly'],
] as const

const canonicalToolSlugs = [
  'merge-pdf',
  'split-pdf',
  'compress-pdf',
  'rotate-pdf',
  'view-and-annotate',
  'organize-pdf',
  'remove-pages',
  'crop-pdf',
  'page-numbers',
  'word-to-pdf',
  'excel-to-pdf',
  'powerpoint-to-pdf',
  'jpg-to-pdf',
  'html-to-pdf',
  'image-to-pdf',
  'pdf-to-word',
  'pdf-to-excel',
  'pdf-to-powerpoint',
  'pdf-to-jpg',
  'pdf-to-png',
  'ocr',
  'edit-pdf',
  'ai-summary',
  'translate-pdf-online',
  'pdf-chat',
  'ai-rewrite-pdf',
  'ai-resume-builder',
  'ai-contract-analyzer',
  'ai-invoice',
  'ai-cover-letter-generator',
  'ai-business-proposal',
  'ai-notes-generator',
  'ai-quiz-generator',
  'ai-table-extraction',
  'pdf-metadata-editor',
  'batch-conversion',
  'qr-code-generator',
  'password-protect-pdf',
  'watermark-pdf',
  'redact-pdf',
  'protect-pdf',
  'unlock-pdf',
  'sign-pdf',
  'flatten-pdf',
  'extract-pages',
].map((slug) => ({ path: `/${slug}`, priority: 0.9, changeFrequency: 'monthly' as const }))

const canonicalAiPages = [
  'ai-document-rewriter',
  'ai-research-writing-assistant',
  'ai-document-chat-tool',
  'ai-research-assistant',
  'ai-academic-research-assistant',
  'ai-dissertation-assistant',
  'ai-document-research-assistant',
  'ai-journal-research-assistant',
  'ai-thesis-research-assistant',
  'ai-research-analysis-tool',
  'ai-study-research-assistant',
  'ai-pdf-reader',
  'pdf-abstract-generator',
].map((slug) => ({ path: `/${slug}`, priority: 0.8, changeFrequency: 'monthly' as const }))

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

function isValidSitemapUrl(url: string): boolean {
  const path = new URL(url).pathname

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
  const entries: MetadataRoute.Sitemap = [
    ...staticPages.map(([path, priority, changeFrequency]) => ({
      url: `${BASE_URL}${path}`,
      priority,
      changeFrequency,
    })),
    ...canonicalToolSlugs.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
    })),
    ...canonicalAiPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
    })),
    ...longTailGuides.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
      lastModified: page.lastModified,
    })),
    ...editorialBlogPages.map((page) => ({
      url: `${BASE_URL}${page.path}`,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
      lastModified: page.lastModified,
    })),
  ]

  return uniqueEntries(entries.filter((entry) => isValidSitemapUrl(entry.url)))
}
