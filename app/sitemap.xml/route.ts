import { blogPosts } from '@/lib/content/blog-posts-1000';
import { guides, getAllGuideSlugs } from '@/lib/content/how-to-guides';
import { comparisons, getAllComparisonSlugs } from '@/lib/content/comparisons';
import { featurePages, getAllFeatureSlugs } from '@/lib/content/features';
import { useCases, getAllUseCaseSlugs } from '@/lib/content/use-cases';

export async function GET() {
  const baseUrl = 'https://pdfilio.com';

  const mainPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/guides', priority: '0.9', changefreq: 'weekly' },
    { path: '/comparisons', priority: '0.9', changefreq: 'weekly' },
    { path: '/features', priority: '0.9', changefreq: 'weekly' },
    { path: '/use-cases', priority: '0.9', changefreq: 'weekly' },
    { path: '/tools', priority: '0.95', changefreq: 'weekly' },
    { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/security', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/developers', priority: '0.7', changefreq: 'weekly' },
    { path: '/privacy-policy', priority: '0.6', changefreq: 'monthly' },
    { path: '/terms', priority: '0.6', changefreq: 'monthly' },
  ];

  const toolPages = [
    'pdf-to-word', 'word-to-pdf', 'excel-to-pdf', 'ppt-to-pdf', 'jpg-to-pdf', 'png-to-pdf',
    'merge-pdf', 'split-pdf', 'compress-pdf', 'rotate-pdf', 'unlock-pdf', 'protect-pdf',
    'pdf-editor', 'ocr-pdf', 'pdf-signature', 'pdf-watermark', 'pdf-annotation', 'pdf-form'
  ];

  const blogSlugs = blogPosts.map(p => p.slug);
  const guideSlugs = getAllGuideSlugs();
  const comparisonSlugs = getAllComparisonSlugs();
  const featureSlugs = getAllFeatureSlugs();
  const useCaseSlugs = getAllUseCaseSlugs();

  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- Main Pages -->
  ${mainPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}

  <!-- Tool Pages -->
  ${toolPages
    .map(
      (tool) => `
  <url>
    <loc>${baseUrl}/${tool}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')}

  <!-- Blog Posts (${blogSlugs.length} pages) -->
  ${blogSlugs
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}

  <!-- How-To Guides (${guideSlugs.length} pages) -->
  ${guideSlugs
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/guides/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
    )
    .join('')}

  <!-- Comparisons (${comparisonSlugs.length} pages) -->
  ${comparisonSlugs
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/vs/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}

  <!-- Features (${featureSlugs.length} pages) -->
  ${featureSlugs
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/features/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>`
    )
    .join('')}

  <!-- Use Cases (${useCaseSlugs.length} pages) -->
  ${useCaseSlugs
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/use-cases/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
