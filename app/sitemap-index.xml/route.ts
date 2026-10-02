import { NextResponse } from 'next/server'

const BASE_URL = 'https://pdfilio.com'
const categories = [
  'core',
  'pdf-tools',
  'converters',
  'security-editing',
  'ocr-extraction',
  'ai-tools',
  'guides',
  'blog',
]

export async function GET() {
  const sitemaps = categories.map((category) => `  <sitemap><loc>${BASE_URL}/sitemaps/${category}.xml</loc></sitemap>`).join('\n')

  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>
`, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
