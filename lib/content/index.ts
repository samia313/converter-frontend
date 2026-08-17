/** Content index for real, indexable content only. */
import { blogPosts, getAllBlogUrls } from './blog-posts'
import { guides, getAllGuideUrls } from './guides'
import { comparisons, getAllComparisonUrls } from './comparisons'
import { useCases, getAllUseCaseUrls } from './use-cases'

export const corePages = [
  '/', '/compress-pdf', '/merge-pdf', '/split-pdf', '/convert-pdf-to-word',
  '/convert-pdf-to-excel', '/convert-pdf-to-ppt', '/remove-pdf-password',
  '/sign-pdf', '/rotate-pdf', '/extract-images-from-pdf', '/watermark-pdf',
  '/pdf-to-image', '/image-to-pdf', '/add-page-numbers', '/delete-pdf-pages',
  '/pdf-compressor', '/pricing', '/premium', '/about', '/contact', '/faq',
  '/terms', '/privacy', '/blog', '/guides', '/resources',
]

/** Only verified feature landing pages. */
export const featurePages = [
  'best-pdf-compressor', 'fastest-pdf-compressor', 'free-pdf-compressor',
  'secure-pdf-compressor', 'unlimited-pdf-compressor', 'online-pdf-compressor',
  'batch-pdf-compressor', 'high-quality-pdf-compressor', 'lossless-pdf-compressor',
  'best-pdf-merger', 'fastest-pdf-merger', 'secure-pdf-merger', 'batch-pdf-merger',
  'free-pdf-merger', 'online-pdf-merger', 'pdf-merger-with-reordering',
  'drag-and-drop-pdf-merger', 'best-pdf-splitter', 'batch-pdf-splitter',
  'free-pdf-splitter', 'online-pdf-splitter', 'fastest-pdf-converter',
  'free-pdf-converter', 'batch-pdf-converter', 'secure-pdf-converter',
  'best-pdf-converter', 'ai-powered-pdf-tools', 'pdf-tools-with-ocr',
  'pdf-tools-with-signature', 'pdf-tools-with-watermark',
].map((slug, i) => ({ url: `/features/${slug}`, slug, id: `feature-${String(i + 1).padStart(3, '0')}` }))

/** Tool-hub combinations are not generated until dedicated unique pages exist. */
export const toolHubPages: Array<{ url: string; slug: string; id: string }> = []

export function getAllFeatureUrls(): string[] { return featurePages.map((p) => p.url) }
export function getAllToolUrls(): string[] { return [] }

export function getAllUrls(): string[] {
  return Array.from(new Set([
    ...corePages, ...getAllFeatureUrls(), ...getAllBlogUrls(),
    ...getAllGuideUrls(), ...getAllComparisonUrls(), ...getAllUseCaseUrls(),
  ])).sort()
}

export function getUrlStats() {
  const allUrls = getAllUrls()
  const stats = { totalUrls: allUrls.length, corePages: corePages.length, blogPosts: blogPosts.length, guides: guides.length, comparisons: comparisons.length, useCases: useCases.length, featurePages: featurePages.length, toolHubPages: 0 }
  return { ...stats, breakdown: {
    corePercentage: ((stats.corePages / stats.totalUrls) * 100).toFixed(2),
    blogPercentage: ((stats.blogPosts / stats.totalUrls) * 100).toFixed(2),
    guidesPercentage: ((stats.guides / stats.totalUrls) * 100).toFixed(2),
    comparisonsPercentage: ((stats.comparisons / stats.totalUrls) * 100).toFixed(2),
    useCasesPercentage: ((stats.useCases / stats.totalUrls) * 100).toFixed(2),
    featuresPercentage: ((stats.featurePages / stats.totalUrls) * 100).toFixed(2),
    toolHubPercentage: '0.00',
  }}
}

export { blogPosts, guides, comparisons, useCases }
export { getAllBlogUrls } from './blog-posts'
export { getAllGuideUrls } from './guides'
export { getAllComparisonUrls } from './comparisons'
export { getAllUseCaseUrls } from './use-cases'
