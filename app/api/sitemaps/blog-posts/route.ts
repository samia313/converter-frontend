import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/content/blog-posts-1000';
import { chatPdfBlogPosts } from '@/lib/content/blog-posts-200-chat-pdf';

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'xml';

  // Combine all blog posts
  const allBlogPosts = [...blogPosts, ...chatPdfBlogPosts];

  if (format === 'json') {
    return NextResponse.json({
      posts: allBlogPosts.map((post) => ({
        url: `https://pdfilio.com/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly',
        priority: post.featured ? 0.85 : 0.8,
        title: post.title,
        description: post.description,
        category: post.category,
        tool: post.tool,
      })),
      total: allBlogPosts.length,
      generated: new Date().toISOString(),
    });
  }

  // Generate XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allBlogPosts
  .map(
    (post) => `
  <url>
    <loc>https://pdfilio.com/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${post.featured ? 0.85 : 0.8}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
