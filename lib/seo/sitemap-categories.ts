import { guides as coreGuides } from '@/lib/content/how-to-guides'
import { additionalGuides } from '@/lib/content/additional-guides'
import { editorialBlogPosts } from '@/lib/content/editorial-blog-posts'

export const BASE_URL = 'https://pdfilio.com'

const corePages = ['/', '/tools', '/features', '/blog', '/ai-tools', '/comparisons', '/guides', '/use-cases', '/security', '/about', '/contact', '/pricing', '/faq', '/privacy', '/terms', '/cookies']
const pdfTools = ['merge-pdf','split-pdf','rotate-pdf','organize-pdf','remove-pages','crop-pdf','page-numbers','compress-pdf','flatten-pdf','extract-pages','pdf-metadata','pdf-metadata-editor','batch-conversion','qr-code-generator']
const converters = ['word-to-pdf','excel-to-pdf','powerpoint-to-pdf','jpg-to-pdf','html-to-pdf','image-to-pdf','pdf-to-word','pdf-to-excel','pdf-to-powerpoint','pdf-to-jpg','pdf-to-png']
const securityEditing = ['protect-pdf','password-protect-pdf','unlock-pdf','sign-pdf','edit-pdf','view-and-annotate','watermark-pdf','redact-pdf']
const ocrExtraction = ['ocr','ai-table-extraction']
const aiTools = ['ai-document-rewriter','ai-research-writing-assistant','ai-document-chat-tool','ai-research-assistant','ai-summary','pdf-chat','translate-pdf-online','ai-rewrite-pdf','ai-resume-builder','ai-contract-analyzer','ai-invoice','ai-cover-letter-generator','ai-business-proposal','ai-notes-generator','ai-quiz-generator']
const guides = [...coreGuides, ...additionalGuides].map((g) => ({ url: `/guides/${g.slug}`, lastModified: new Date(g.publishedAt) }))
const blog = editorialBlogPosts.map((p) => ({ url: `/blog/${p.slug}`, lastModified: new Date(p.updatedAt) }))

export const sitemapGroups = { core: corePages, 'pdf-tools': pdfTools, converters, 'security-editing': securityEditing, 'ocr-extraction': ocrExtraction, 'ai-tools': aiTools, guides, blog }

function escapeXml(value: string) {
  return value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&apos;")
}

export function sitemapXml(category: keyof typeof sitemapGroups) {
  const entries = sitemapGroups[category] as Array<string | { url: string; lastModified?: Date }>
  const urls = entries.map((entry) => {
    const path = typeof entry === 'string' ? entry : entry.url
    const lastModified = typeof entry === 'string' ? undefined : entry.lastModified
    return `  <url>\n    <loc>${escapeXml(`${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`)}</loc>\n${lastModified ? `    <lastmod>${lastModified.toISOString()}</lastmod>\n` : ''}  </url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
