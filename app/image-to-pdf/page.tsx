import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Image to PDF - Convert Images to PDF | PDFilio',
  description: 'Convert JPG, PNG, and other images to PDF instantly. Merge multiple images into one PDF. Perfect for scanning, photo albums, and document creation. Free and secure.',
  keywords: ['image to PDF', 'JPG to PDF', 'PNG to PDF', 'convert image to PDF'],
};

export default function ImageToPDFPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Image to PDF',
    description: 'Convert images and photos to PDF documents',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1950',
    },
  };

  return (
    <ToolLandingLayout
      toolName="Image to PDF"
      toolSlug="image-to-pdf"
      description="Convert images to PDF instantly. Support for JPG, PNG, and all major image formats. Merge multiple images into one PDF document. Perfect for document scanning and photo organization."
      heroImage="/tool-images/image-to-pdf-hero.png"
      mainContent={`Image to PDF converts your photos and images into professional PDF documents instantly. Perfect for digitizing documents, creating photo albums, and combining multiple images into a single file.

Supports JPG, PNG, GIF, BMP, TIFF, and all major image formats. Merge multiple images into organized PDF pages or create individual PDFs for each image. Perfect quality and fast processing.

Your images are processed securely and deleted automatically. No registration required, no watermarks, completely free. Convert single images or batch process dozens at once.`}
      useCase={`Digitizing paper documents with camera photos
Creating photo albums and galleries
Scanning receipts and invoices
Organizing document pages into one PDF
Creating presentations from images
Archiving photos as PDF files
Converting whiteboard notes to documents`}
      features={[
        'Support for JPG, PNG, GIF, BMP, TIFF',
        'Merge multiple images into one PDF',
        'Preserve image quality perfectly',
        'Auto-detect image orientation',
        'Custom page sizes',
        'Batch convert multiple files',
        'Instant processing',
        'Compress while converting',
      ]}
      benefits={[
        'Create professional documents from photos',
        'Digitize paper documents easily',
        'Merge scattered images quickly',
        'Universal PDF format',
        'Easy sharing and printing',
        'Organized document storage',
        'Perfect for archiving',
        'Mobile-friendly scanning',
      ]}
      testimonials={[
        {
          name: 'Alex T.',
          role: 'Photographer',
          text: 'Image to PDF is perfect for creating photo albums. Converts my images beautifully and merges them effortlessly. Highly recommended for photographers.',
        },
        {
          name: 'Nina K.',
          role: 'Student',
          text: 'Using Image to PDF to scan notes with my phone camera. The quality is amazing and combining multiple pages into one PDF is super easy.',
        },
        {
          name: 'Carlos M.',
          role: 'Small Business Owner',
          text: 'Perfect for digitizing receipts and documents. Fast, free, and always reliable. Now part of our document management process.',
        },
      ]}
      relatedTools={[
        { name: 'PDF to Image', slug: 'pdf-to-image' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
      ]}
      faqs={[
        {
          q: 'How do I convert images to PDF?',
          a: 'Upload your image files (JPG, PNG, etc.), arrange them in order, choose page settings, click Convert, and download your PDF. Simple and fast!',
        },
        {
          q: 'Can I merge multiple images into one PDF?',
          a: 'Yes! Upload multiple images, arrange them in the order you want, and they will be combined into a single PDF with each image on its own page.',
        },
        {
          q: 'What image formats are supported?',
          a: 'Supports JPG, PNG, GIF, BMP, TIFF, WebP, and most other common image formats.',
        },
        {
          q: 'Will my image quality be reduced?',
          a: 'No! Your images are preserved at original quality. The PDF maintains the full resolution and clarity of your source images.',
        },
        {
          q: 'Can I arrange images in any order?',
          a: 'Yes! Drag and drop to reorder images before converting. Arrange them exactly how you want them in the final PDF.',
        },
        {
          q: 'What about scanned document images?',
          a: 'Perfect for scanned documents! Whether from phone camera or scanner, images convert beautifully to PDF with crisp quality.',
        },
        {
          q: 'Can I set custom page sizes?',
          a: 'Yes! Choose from standard sizes (A4, Letter, etc.) or set custom dimensions to fit your images perfectly.',
        },
        {
          q: 'How many images can I convert at once?',
          a: 'No limit! Convert single images or batch process hundreds. Upload as many as you need.',
        },
        {
          q: 'Is image data secure?',
          a: 'Completely secure! Files are encrypted during processing and automatically deleted within 24 hours. Never shared or stored.',
        },
        {
          q: 'Can I compress while converting?',
          a: 'Yes! Choose compression level to balance quality and file size. Create smaller files while maintaining good quality.',
        },
        {
          q: 'Works on phones and tablets?',
          a: 'Absolutely! Use Image to PDF on any device. Perfect for converting phone photos to PDF documents on the go.',
        },
        {
          q: 'Is Image to PDF free?',
          a: 'Completely free! No registration, no hidden fees, no limits. Convert unlimited images to PDF for free.',
        },
      ]}
      primaryKeyword="image to PDF"
      secondaryKeywords={['convert image to PDF', 'JPG to PDF', 'PNG to PDF', 'merge images into PDF']}
    />
  );
}
