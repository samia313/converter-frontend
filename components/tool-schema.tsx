// Tool-specific schema markup for rich results

interface ToolSchemaProps {
  toolId: string;
  toolName: string;
  description: string;
  keywords: string[];
}

export function ToolSchema({ toolId, toolName, description, keywords }: ToolSchemaProps) {
  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    applicationCategory: 'Utility',
    description: description,
    url: `https://pdfilio.com/tools/${toolId}`,
    image: 'https://pdfilio.com/og-image.png',
    operatingSystem: 'Web',
    inLanguage: 'en',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'PDFilio',
      url: 'https://pdfilio.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '5000',
    },
    datePublished: new Date().toISOString(),
    isAccessibleForFree: true,
    permissionRequired: 'NotRequired',
    keywords: keywords.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
    />
  );
}

// Breadcrumb schema for better navigation in SERPs
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
    position: number;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

// Article schema for blog posts
interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  keywords: string[];
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  keywords,
}: ArticleSchemaProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PDFilio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pdfilio.com/logo.png',
      },
    },
    keywords: keywords.join(', '),
    inLanguage: 'en',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

// Product schema for premium features
interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: string;
  priceCurrency: string;
  availability: string;
  ratingValue: number;
  ratingCount: number;
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  priceCurrency,
  availability,
  ratingValue,
  ratingCount,
}: ProductSchemaProps) {
  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: name,
    image: image,
    description: description,
    brand: {
      '@type': 'Brand',
      name: 'PDFilio',
    },
    offers: {
      '@type': 'Offer',
      url: 'https://pdfilio.com/pricing',
      priceCurrency: priceCurrency,
      price: price,
      availability: availability,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toString(),
      ratingCount: ratingCount.toString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}

// Video schema for tool demos
interface VideoSchemaProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
}

export function VideoSchema({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
}: VideoSchemaProps) {
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: thumbnailUrl,
    uploadDate: uploadDate,
    duration: duration,
    creator: {
      '@type': 'Organization',
      name: 'PDFilio',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
    />
  );
}
