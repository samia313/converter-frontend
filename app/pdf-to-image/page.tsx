import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'PDF to Image - Convert PDF Pages to Images | PDFilio',
  description: 'Convert PDF pages to JPG, PNG, or other image formats instantly. Extract individual pages as images. Perfect for sharing, editing, and archiving. Free and secure.',
  keywords: ['PDF to image', 'PDF to JPG', 'PDF to PNG', 'convert PDF pages to images'],
};

export default function PDFToImagePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to Image',
    description: 'Convert PDF pages to image files',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '1720',
    },
  };

  return (
    <ToolLandingLayout
      toolName="PDF to Image"
      toolSlug="pdf-to-image"
      description="Convert PDF pages to images instantly. Download as JPG, PNG, or other formats. Extract individual pages or convert entire documents. Perfect for sharing, editing, and web use."
      heroImage="/tool-images/pdf-to-image-hero.png"
      mainContent={`PDF to Image converts your PDF pages into high-quality image files instantly. Perfect for sharing PDF content on social media, editing pages in image editors, or creating visual previews.

Convert individual PDF pages or entire documents to JPG, PNG, or other image formats. Choose quality and resolution settings to match your needs. Perfect for web use, email sharing, or print preparation.

Our conversion process is fast and secure. Your files are processed instantly and deleted automatically. No registration required, no watermarks, completely free.`}
      useCase={`Converting PDF pages for social media sharing
Creating image previews of PDF documents
Editing PDF pages in photo editors
Preparing documents for web display
Archiving documents as image files
Creating thumbnails from PDF pages
Extracting specific pages as images for presentations`}
      features={[
        'Convert to JPG, PNG, or WebP',
        'Convert all pages or select individual pages',
        'High-quality image output',
        'Adjustable resolution and quality',
        'Preserve text and graphics',
        'Batch convert multiple PDFs',
        'Download all at once',
        'Works on all devices',
      ]}
      benefits={[
        'Share PDF content easily',
        'Edit pages in image editors',
        'Perfect for social media',
        'Universal image formats',
        'Easy web integration',
        'Better preview capabilities',
        'Flexible editing options',
        'Professional image quality',
      ]}
      testimonials={[
        {
          name: 'Michelle D.',
          role: 'Content Creator',
          text: 'PDF to Image is essential for my workflow. Converting PDF pages to images for social media is instant and the quality is excellent.',
        },
        {
          name: 'Patrick L.',
          role: 'Designer',
          text: 'Perfect tool for converting PDF documents to images for editing in Photoshop. Quality is impressive and process is fast.',
        },
        {
          name: 'Amanda S.',
          role: 'Blogger',
          text: 'Using PDF to Image daily to create visual content. Easy to use and produces perfect results every time.',
        },
      ]}
      relatedTools={[
        { name: 'Image to PDF', slug: 'image-to-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
      ]}
      faqs={[
        {
          q: 'How do I convert PDF pages to images?',
          a: 'Upload your PDF, choose image format (JPG, PNG, etc.), select which pages to convert (all or specific), choose quality, and download. Done in seconds!',
        },
        {
          q: 'Can I convert only specific PDF pages?',
          a: 'Yes! Select individual pages, page ranges, or all pages. Convert exactly the pages you need.',
        },
        {
          q: 'What image formats are available?',
          a: 'Convert to JPG, PNG, WebP, and other formats. Choose the format that best fits your needs.',
        },
        {
          q: 'Can I adjust image quality?',
          a: 'Yes! Choose quality settings from high-quality to compressed. Balance between file size and image quality.',
        },
        {
          q: 'What about resolution settings?',
          a: 'Set custom DPI (resolution). Higher DPI means larger files but better quality. Choose based on your use case.',
        },
        {
          q: 'Can I batch convert multiple PDFs?',
          a: 'Yes! Upload multiple PDFs and convert all at once. Download all image files together.',
        },
        {
          q: 'How fast is the conversion?',
          a: 'Most conversions complete in seconds. Larger files or high-resolution conversions may take a bit longer.',
        },
        {
          q: 'Will text and graphics be clear in the images?',
          a: 'Yes! All text, graphics, and formatting are preserved. Images will look exactly like the PDF pages.',
        },
        {
          q: 'Is my PDF secure during conversion?',
          a: 'Completely secure. Your PDF is encrypted, processed, and automatically deleted within 24 hours. Never shared or stored.',
        },
        {
          q: 'Can I use converted images for commercial purposes?',
          a: 'Yes! Your converted images are yours to use freely. Use them for any purpose you like.',
        },
        {
          q: 'Works on mobile devices?',
          a: 'Absolutely! Convert PDFs to images on phones, tablets, or computers. Works perfectly on all devices.',
        },
        {
          q: 'Is there a cost?',
          a: '100% free! Unlimited conversions, no registration, no hidden fees. Convert as many PDFs as you need.',
        },
      ]}
      primaryKeyword="PDF to image"
      secondaryKeywords={['convert PDF to image', 'PDF to JPG', 'PDF to PNG', 'extract PDF as image']}
    />
  );
}
