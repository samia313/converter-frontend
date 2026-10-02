import { NextResponse } from 'next/server'
import { guides as coreGuides } from '@/lib/content/how-to-guides'
import { additionalGuides } from '@/lib/content/additional-guides'
import { editorialBlogPosts } from '@/lib/content/editorial-blog-posts'

const BASE_URL = 'https://pdfilio.com'

const corePages = ['/', '/tools', '/features', '/blog', '/ai-tools', '/comparisons', '/guides', '/use-cases', '/security', '/about', '/contact', '/privacy', '/terms', '/cookies']
const pdfTools = ['merge-pdf','merge-pdf-files','merge-pdf-online','split-pdf','split-pdf-files','split-pdf-online','rotate-pdf','rotate-pdf-files','rotate-pages','organize-pdf','remove-pages','remove-pages-online','crop-pdf','crop-pdf-online','page-numbers','page-numbers-online','compress-pdf','compress-pdf-online','compress-pdf-files','flatten-pdf','extract-pages','pdf-metadata','pdf-metadata-editor','batch-conversion','qr-code-generator']
const conversionTools = ['word-to-pdf','word-to-pdf-online','word-document-to-pdf','excel-to-pdf','excel-spreadsheet-to-pdf','powerpoint-to-pdf','powerpoint-presentation-to-pdf','jpg-to-pdf','jpg-images-to-pdf','html-to-pdf','html-file-to-pdf','image-to-pdf','images-to-pdf','pdf-to-word','pdf-to-word-online','pdf-file-to-word','pdf-to-excel','pdf-file-to-excel','pdf-to-powerpoint','pdf-file-to-powerpoint','pdf-to-jpg','pdf-file-to-jpg','pdf-to-png','pdf-file-to-png']
const securityEditingTools = ['protect-pdf','protect-pdf-online','password-protect-pdf','unlock-pdf','unlock-pdf-online','sign-pdf','sign-pdf-online','edit-pdf','edit-pdf-online','view-and-annotate','watermark-pdf','watermark-pdf-online','redact-pdf','redact-pdf-online']
const ocrExtractionTools = ['ocr','ocr-online','ocr-pdf-online','ai-table-extraction']
const aiTools = ['ai-document-rewriter','ai-research-writing-assistant','ai-document-chat-tool','ai-research-assistant','ai-summary','pdf-chat','translate-pdf-online','ai-rewrite-pdf','ai-resume-builder','ai-contract-analyzer','ai-invoice','ai-cover-letter-generator','ai-business-proposal','ai-notes-generator','ai-quiz-generator']

const guides = [...coreGuides, ...additionalGuides].map((guide) => ({ url: `/guides/${guide.slug}`, lastModified: new Date(guide.publishedAt) }))
const blog = editorialBlogPosts.map((post) => ({ url: `/blog/${post.slug}`, lastModified: new Date(post.updatedAt) }))

const groups: Record<string, Array<string | { url: string; lastModified?: Date }>> = {
  core: corePages, 'pdf-tools': pdfTools, converters: conversionTools, 'security-editing': securityEditingTools,
  'ocr-extraction': ocrExtractionTools, 'ai-tools': aiTools, guides, blog,
}

function xmlEscape(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')
}

function toXml(entries: Array<string | { url: string; lastModified?: Date }>) {
  const urls = entries.map((entry) => {
    const path = typeof entry === 'string' ? entry : entry.url
    const lastModified = typeof entry === 'string' ? undefined : entry.lastModified
    return `  <url>
    <loc>${xmlEscape(`${BASE_URL}${path}`)}</loc>
${lastModified ? `    <lastmod>${lastModified.toISOString()}</lastmod>\n` : ''}  </url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export async function GET(request: Request, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const entries = groups[category]
  if (!entries) return new NextResponse('Not Found', { status: 404 })
  return new NextResponse(toXml(entries), {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  })
}
