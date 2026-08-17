import type { MetadataRoute } from 'next'

const BASE_URL = 'https://pdfilio.com'

const staticPages = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/features', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/vs', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/use-cases', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
]

// Verified production tool routes. Only real tool pages are included here.
const toolPages = [
  'merge-pdf', 'split-pdf', 'rotate-pdf', 'remove-pages', 'crop-pdf', 'page-numbers',
  'compress-pdf',
  'word-to-pdf', 'excel-to-pdf', 'powerpoint-to-pdf', 'jpg-to-pdf', 'html-to-pdf', 'image-to-pdf',
  'pdf-to-word', 'pdf-to-excel', 'pdf-to-powerpoint', 'pdf-to-jpg', 'pdf-to-png',
  'ocr', 'ai-summary', 'pdf-chat', 'watermark-pdf', 'redact-pdf', 'protect-pdf',
  'unlock-pdf', 'sign-pdf', 'edit-pdf',
].map((slug) => ({ path: `/${slug}`, priority: 0.9, changeFrequency: 'monthly' as const }))

// Programmatically generated comparison/use-case URL sets are intentionally
// excluded until each page has unique, human-reviewed content. This keeps the
// sitemap focused on genuinely index-worthy URLs instead of thin templates.

function uniqueEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [...staticPages, ...toolPages].map((page) => ({
    url: `${BASE_URL}${page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  return uniqueEntries(entries)
}
