// Advanced SEO Utilities for PDFilio

// 1. Meta Tags Generator
export interface MetaTagsConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  author?: string;
  canonicalUrl?: string;
}

export function generateMetaTags(config: MetaTagsConfig) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    openGraph: {
      title: config.title,
      description: config.description,
      image: config.ogImage || 'https://pdfilio.com/og-image.png',
      type: config.ogType || 'website',
      url: config.canonicalUrl || 'https://pdfilio.com',
    },
    twitter: {
      card: config.twitterCard || 'summary_large_image',
      title: config.title,
      description: config.description,
      creator: '@PDFilio',
    },
    authors: config.author ? [{ name: config.author }] : undefined,
    alternates: {
      canonical: config.canonicalUrl || 'https://pdfilio.com',
    },
  };
}

// 2. Sitemap Entry Manager
export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapEntry(entry: SitemapEntry): string {
  return `
    <url>
      <loc>${entry.url}</loc>
      ${entry.lastModified ? `<lastmod>${entry.lastModified.toISOString()}</lastmod>` : ''}
      ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
      ${entry.priority !== undefined ? `<priority>${entry.priority}</priority>` : '<priority>0.8</priority>'}
    </url>
  `.trim();
}

// 3. Robots Meta Tags
export interface RobotsMetaConfig {
  index?: boolean;
  follow?: boolean;
  nocache?: boolean;
  noimageindex?: boolean;
  'max-snippet'?: number;
  'max-image-preview'?: 'none' | 'standard' | 'large';
  'max-video-preview'?: number;
}

export function generateRobotsMeta(config: RobotsMetaConfig): string {
  const parts: string[] = [];

  if (config.index !== false) parts.push('index');
  else parts.push('noindex');

  if (config.follow !== false) parts.push('follow');
  else parts.push('nofollow');

  if (config.nocache) parts.push('nocache');
  if (config.noimageindex) parts.push('noimageindex');

  if (config['max-snippet'] !== undefined) {
    parts.push(`max-snippet:${config['max-snippet']}`);
  }
  if (config['max-image-preview'] !== undefined) {
    parts.push(`max-image-preview:${config['max-image-preview']}`);
  }
  if (config['max-video-preview'] !== undefined) {
    parts.push(`max-video-preview:${config['max-video-preview']}`);
  }

  return parts.join(', ');
}

// 4. JSON-LD Helper
export function jsonLd<T extends Record<string, any>>(data: T): string {
  return JSON.stringify(data);
}

// 5. SEO-Friendly URL Slug Generator
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// 6. Reading Time Calculator
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// 7. Meta Description Optimizer
export interface MetaDescriptionConfig {
  maxLength?: number;
  minLength?: number;
}

export function optimizeMetaDescription(
  description: string,
  config: MetaDescriptionConfig = {},
): string {
  const { maxLength = 160, minLength = 120 } = config;

  if (description.length <= maxLength) {
    return description;
  }

  // Truncate at word boundary
  let truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > minLength) {
    truncated = truncated.substring(0, lastSpace);
  }

  return truncated + '...';
}

// 8. Keyword Density Calculator
export function calculateKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordCount = words.filter((w) => w === keyword.toLowerCase()).length;
  return (keywordCount / words.length) * 100;
}

// 9. Internal Link Helper
export interface InternalLink {
  text: string;
  url: string;
  title?: string;
  target?: '_blank' | '_self';
}

export function generateInternalLink(link: InternalLink): string {
  return `<a href="${link.url}" title="${link.title || link.text}" target="${link.target || '_self'}">${link.text}</a>`;
}

// 10. Structured Data Validator
export function validateStructuredData(data: Record<string, any>): boolean {
  // Basic validation
  return (
    data['@context'] &&
    data['@type'] &&
    (typeof data['@context'] === 'string' || typeof data['@context'] === 'object')
  );
}

// 11. Image Optimization Metadata
export interface ImageMetadata {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export function generateImageMarkup(image: ImageMetadata): string {
  return `<img src="${image.src}" alt="${image.alt}" ${image.title ? `title="${image.title}"` : ''} ${image.width ? `width="${image.width}"` : ''} ${image.height ? `height="${image.height}"` : ''} loading="${image.loading || 'lazy'}" />`;
}

// 12. SEO Checklist
export const SEO_CHECKLIST = {
  onPage: [
    'Unique, descriptive title tag (50-60 chars)',
    'Meta description (150-160 chars)',
    'H1 tag (only one per page)',
    'Keywords in H2, H3 tags',
    'Internal links (8-15 per page)',
    'Image alt text',
    'Mobile-friendly design',
    'Page speed optimization',
    'Structured data markup',
    'Canonical tags',
  ],
  technical: [
    'XML sitemaps',
    'Robots.txt',
    'Core Web Vitals optimization',
    'HTTPS enabled',
    'Mobile viewport',
    'Open Graph tags',
    'Twitter cards',
    'Social sharing optimized',
    'Security headers',
    'Proper redirects',
  ],
  content: [
    '2000+ word articles',
    'Natural keyword placement',
    'Unique content',
    'Regular updates',
    'Engaging headlines',
    'Clear structure',
    'Links to authority sources',
    'Call-to-action',
    'Video content',
    'User engagement',
  ],
};
