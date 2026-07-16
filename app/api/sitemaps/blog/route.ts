import { NextResponse } from 'next/server'
import { blogPosts } from '@/lib/content/blog-posts-1000'
import { chatPdfBlogPosts } from '@/lib/content/blog-posts-200-chat-pdf'

const SITE_URL = 'https://pdfilio.com'

export async function GET() {
  try {
    // Combine all blog posts
    const allBlogPosts = [...blogPosts, ...chatPdfBlogPosts]

    // Generate XML sitemap
    const blogSitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allBlogPosts
  .map((post) => {
    const priority = post.featured ? 0.85 : 0.8
    return `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

    console.log(`[SITEMAP] Generated blog sitemap with ${allBlogPosts.length} URLs`)

    return new NextResponse(blogSitemapXML, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('[SITEMAP] Error generating blog sitemap:', error)
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 })
  }
}
