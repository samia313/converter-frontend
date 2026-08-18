import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToJpgTool from '@/components/tools/pdf-to-jpg-tool';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter - Free Online | PDFilio',
  description: 'Convert PDF pages to high-quality JPG images online for free. Fast, secure, easy to use, and works on phones, tablets, and computers.',
  keywords: ['PDF to JPG', 'PDF to JPG converter', 'convert PDF to JPG', 'PDF pages to images', 'free PDF to JPG'],
  alternates: {
    canonical: 'https://pdfilio.com/pdf-to-jpg',
  },
  openGraph: {
    title: 'PDF to JPG Converter - Free Online | PDFilio',
    description: 'Convert PDF pages to high-quality JPG images online for free.',
    url: 'https://pdfilio.com/pdf-to-jpg',
    type: 'website',
  },
};

export default function PDFToJpgToolPage() {
  return (
    <>
      <PDFToJpgTool />
      <ToolLandingLayout
        toolName="PDF to JPG Converter"
        toolSlug="pdf-to-jpg"
        description="Convert PDF pages into high-quality JPG images in seconds. PDFilio is free, secure, browser-based, and requires no registration."
        heroImage="/tool-images/pdf-to-jpg-hero.png"
        mainContent={`PDF to JPG Converter turns PDF pages into JPG images that are easy to share, upload, preview, and use in other projects. It is useful when you need an image version of a document page instead of the original PDF format.

PDFilio is designed for quick online conversion while keeping the workflow simple. Upload your PDF, convert the pages, and download the JPG images without installing desktop software. The tool works directly in a modern web browser on computers, phones, and tablets.

Use PDF to JPG for presentations, document previews, social media uploads, image-based forms, screenshots, reports, and other workflows where JPG images are more convenient than PDF files.`}
        useCase={`Creating JPG images from PDF pages
Preparing PDF pages for presentations
Creating image previews of documents
Sharing document pages in image format
Using PDF pages in social media or design projects
Converting reports and forms into image files
Preparing document images for websites and uploads`}
        features={['Fast PDF to JPG conversion', 'High-quality image output', 'Simple browser-based workflow', 'No software installation required', 'Secure file processing', 'Works across desktop and mobile devices']}
        benefits={['Turn PDF pages into shareable images', 'Save time with an online converter', 'Use JPG files in design and presentation workflows', 'Access the tool from any modern browser', 'No registration required to start', 'Convenient for previews and image-based uploads']}
        testimonials={[
          {
            name: 'John D.',
            role: 'Professional',
            text: 'This tool makes converting PDF pages to images quick and simple. Very useful for my document workflow.',
          },
        ]}
        faqs={[
          {
            q: 'Is PDF to JPG free?',
            a: 'Yes. PDFilio provides a free online PDF to JPG conversion tool with no registration required to get started.',
          },
          {
            q: 'How do I convert a PDF to JPG?',
            a: 'Upload your PDF to the PDF to JPG tool, start the conversion, and download the resulting JPG images when processing is complete.',
          },
          {
            q: 'Will each PDF page become a JPG image?',
            a: 'The converter processes PDF pages into JPG image output, making individual document pages available in an image-friendly format.',
          },
          {
            q: 'Is my PDF secure?',
            a: 'PDFilio is designed to process files securely. Avoid uploading documents containing information you do not want processed by an online service.',
          },
          {
            q: 'Can I use PDF to JPG on my phone?',
            a: 'Yes. The tool is browser-based and can be used on supported smartphones and tablets as well as desktop computers.',
          },
          {
            q: 'Do I need to install software?',
            a: 'No. PDF to JPG works online in a modern web browser, so you do not need to install a desktop converter.',
          },
          {
            q: 'What can JPG images from a PDF be used for?',
            a: 'JPG output is useful for document previews, presentations, websites, design projects, sharing, and platforms that accept images instead of PDF files.',
          },
          {
            q: 'Does PDF to JPG reduce document quality?',
            a: 'The tool is designed to produce high-quality JPG images suitable for common sharing, presentation, and document workflows.',
          },
          {
            q: 'Can I convert a PDF without creating an account?',
            a: 'Yes. PDFilio is designed so you can start the conversion without creating an account.',
          },
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
        ]}
        primaryKeyword="PDF to JPG"
        secondaryKeywords={['PDF to JPG converter', 'convert PDF to JPG', 'free PDF to JPG', 'PDF pages to images']}
      />
    </>
  );
}
