// Canonical URL management for SEO

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfilio.com';

export function getCanonicalUrl(pathname: string): string {
  // Remove trailing slashes except for root
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  return `${SITE_URL}${cleanPath}`;
}

// Canonical metadata for Next.js
export function getCanonicalMetadata(pathname: string) {
  return {
    alternates: {
      canonical: getCanonicalUrl(pathname),
    },
  };
}

// Tool-specific canonical URLs
export const toolCanonicalUrls = {
  'pdf-to-word': '/tools/pdf-to-word',
  'word-to-pdf': '/tools/word-to-pdf',
  'excel-to-pdf': '/tools/excel-to-pdf',
  'ppt-to-pdf': '/tools/ppt-to-pdf',
  'jpg-to-pdf': '/tools/jpg-to-pdf',
  'png-to-pdf': '/tools/png-to-pdf',
  'merge-pdf': '/tools/merge-pdf',
  'split-pdf': '/tools/split-pdf',
  'compress-pdf': '/tools/compress-pdf',
  'rotate-pdf': '/tools/rotate-pdf',
  'unlock-pdf': '/tools/unlock-pdf',
  'protect-pdf': '/tools/protect-pdf',
  'pdf-editor': '/tools/pdf-editor',
  'ocr-pdf': '/tools/ocr-pdf',
  'image-compressor': '/tools/image-compressor',
  'image-converter': '/tools/image-converter',
  'password-generator': '/tools/password-generator',
  'file-converter': '/tools/file-converter',
  'zip-extractor': '/tools/zip-extractor',
  'video-converter': '/tools/video-converter',
  'audio-converter': '/tools/audio-converter',
} as const;

// Page-specific canonical URLs
export const pageCanonicalUrls = {
  home: '/',
  blog: '/blog',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy-policy',
  terms: '/terms',
  security: '/security',
  support: '/support',
  api: '/api',
} as const;

// Prevent duplicate content by enforcing lowercase URLs
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url, SITE_URL);
    // Convert to lowercase for consistency
    const normalized = urlObj.toString().toLowerCase();
    // Remove trailing slash except for root
    if (normalized.endsWith('/') && normalized !== `${SITE_URL}/`) {
      return normalized.slice(0, -1);
    }
    return normalized;
  } catch {
    return url.toLowerCase();
  }
}

// SEO best practices for URLs
export const URL_BEST_PRACTICES = {
  // Use hyphens not underscores
  preferHyphens: true,

  // Keep URLs short and descriptive
  maxLength: 75,

  // Use lowercase
  lowercase: true,

  // Avoid special characters
  specialCharactersAllowed: ['-', '_'],

  // Use HTTPS
  protocol: 'https',

  // Avoid session IDs in URLs
  noSessionIds: true,

  // Use static URLs when possible
  preferStatic: true,
};
