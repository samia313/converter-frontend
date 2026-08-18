/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance & SEO Optimizations
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },

  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  headers: async () => [{
    source: '/:path*',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'X-Robots-Tag', value: 'index, follow' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:" },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    ],
  }],

  // Redirect legacy URLs that are still receiving traffic to the current canonical pages.
  redirects: async () => [
    { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
    { source: '/robots', destination: '/robots.txt', permanent: true },
    { source: '/blog/rotate-pdf-pages-correct-orientation', destination: '/rotate-pdf', permanent: true },
    { source: '/blog/convert-pdf-to-word-editable', destination: '/pdf-to-word', permanent: true },
    { source: '/use-cases/sign-pdf-for-students', destination: '/use-cases', permanent: true },
  ],

  rewrites: async () => ({ beforeFiles: [], afterFiles: [], fallback: [] }),
  turbopack: {},
  experimental: { esmExternals: true, optimizePackageImports: ['lucide-react', 'framer-motion'] },
  env: { NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfilio.com' },
  trailingSlash: false,
  reactStrictMode: true,
  onDemandEntries: { maxInactiveAge: 25 * 1000, pagesBufferLength: 5 },
  generateEtags: true,
};

module.exports = nextConfig;
