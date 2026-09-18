/** @type {import('next').NextConfig} */
const nextConfig = {
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
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
      { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:" },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    ],
  }],
  redirects: async () => [
    { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
    { source: '/robots', destination: '/robots.txt', permanent: true },
    { source: '/blog/rotate-pdf-pages-correct-orientation', destination: '/rotate-pdf', permanent: true },
    { source: '/blog/convert-pdf-to-word-editable', destination: '/pdf-to-word', permanent: true },
    { source: '/use-cases/sign-pdf-for-students', destination: '/use-cases', permanent: true },
    { source: '/use-cases/rotate-pdf-for-college', destination: '/rotate-pdf', permanent: true },
    // Legacy/alternate tool URLs -> current canonical routes
    { source: '/ppt-to-pdf', destination: '/powerpoint-to-pdf', permanent: true },
    { source: '/png-to-pdf', destination: '/image-to-pdf', permanent: true },
    { source: '/ocr-pdf', destination: '/ocr', permanent: true },
    { source: '/pdf-editor', destination: '/edit-pdf', permanent: true },

    // Canonical tool URLs live at the root. Redirect legacy /tools/:slug URLs.
    { source: '/tools/:slug', destination: '/:slug', permanent: true },

    // Collapse overlapping AI-PDF chat landing pages into the canonical tool.
    { source: '/ai-pdf-chat', destination: '/pdf-chat', permanent: true },
    { source: '/ai-chat-pdf', destination: '/pdf-chat', permanent: true },
    { source: '/ai-document-chat', destination: '/pdf-chat', permanent: true },

    // Consolidate duplicate PDF chat/search-intent landing pages.
    { source: '/chat-with-pdf', destination: '/pdf-chat', permanent: true },
    { source: '/chat-with-pdf-online', destination: '/pdf-chat', permanent: true },
    { source: '/chat-pdf-ai-online', destination: '/pdf-chat', permanent: true },
    { source: '/talk-to-pdf', destination: '/pdf-chat', permanent: true },
    { source: '/ask-ai-about-pdf', destination: '/pdf-chat', permanent: true },
    { source: '/free-ai-chat-pdf', destination: '/pdf-chat', permanent: true },
    { source: '/instant-ai-pdf-chat', destination: '/pdf-chat', permanent: true },
    { source: '/smart-ai-pdf-chat', destination: '/pdf-chat', permanent: true },

    // Consolidate duplicate PDF translation landing pages.
    { source: '/translate-pdf-with-ai', destination: '/translate-pdf-online', permanent: true },
    { source: '/translate-pdf-without-formatting-loss', destination: '/translate-pdf-online', permanent: true },
    { source: '/translate-scanned-pdf', destination: '/translate-pdf-online', permanent: true },
    { source: '/online-ai-pdf-translator', destination: '/translate-pdf-online', permanent: true },
    { source: '/free-ai-pdf-translator', destination: '/translate-pdf-online', permanent: true },
    { source: '/free-ai-translate-pdf', destination: '/translate-pdf-online', permanent: true },
    { source: '/smart-pdf-translator', destination: '/translate-pdf-online', permanent: true },

    // Consolidate duplicate PDF summarization landing pages.
    { source: '/pdf-summarizer-ai', destination: '/ai-summary', permanent: true },
    { source: '/pdf-summary-generator', destination: '/ai-summary', permanent: true },
    { source: '/pdf-text-summarizer', destination: '/ai-summary', permanent: true },
    { source: '/online-pdf-summarizer', destination: '/ai-summary', permanent: true },
    { source: '/free-ai-pdf-summarizer', destination: '/ai-summary', permanent: true },
    { source: '/instant-pdf-summary', destination: '/ai-summary', permanent: true },
    { source: '/smart-pdf-summary', destination: '/ai-summary', permanent: true },
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
