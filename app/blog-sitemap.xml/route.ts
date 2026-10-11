import { editorialBlogPosts } from '@/lib/content/editorial-blog-posts'

const BASE_URL = 'https://pdfilio.com'

export const revalidate = 3600

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const urls = editorialBlogPosts.map((post) => {
    const loc = escapeXml(`${BASE_URL}/blog/${post.slug}`)
    const lastmod = new Date(post.updatedAt).toISOString()

    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${post.featured ? '0.8' : '0.7'}</priority>\n  </url>`
  })

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
