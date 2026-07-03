export async function GET() {
  const baseUrl = 'https://pdfilio.com';

  const mainPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/security', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/developers', priority: '0.8', changefreq: 'weekly' },
    { path: '/privacy-policy', priority: '0.7', changefreq: 'monthly' },
    { path: '/terms', priority: '0.7', changefreq: 'monthly' },
  ];

  const toolPages = [
    'pdf-to-word',
    'word-to-pdf',
    'excel-to-pdf',
    'ppt-to-pdf',
    'jpg-to-pdf',
    'png-to-pdf',
    'merge-pdf',
    'split-pdf',
    'compress-pdf',
    'rotate-pdf',
    'unlock-pdf',
    'protect-pdf',
    'pdf-editor',
    'ocr-pdf',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${mainPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
  ${toolPages
    .map(
      (tool) => `
  <url>
    <loc>${baseUrl}/${tool}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
