import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import JpgToPdfTool from '@/components/tools/jpg-to-pdf-tool';

export const metadata: Metadata = {
  title: 'JPG to PDF Converter Online – Free, Fast & Secure | PDFilio',
  description: 'Convert JPG and JPEG images to PDF online for free. Combine multiple images into one PDF, keep high quality, and download your PDF securely without registration.',
  keywords: ['jpg to pdf', 'jpg to pdf converter', 'jpeg to pdf', 'convert jpg to pdf', 'jpg to pdf online', 'free jpg to pdf'],
  alternates: { canonical: 'https://pdfilio.com/jpg-to-pdf' },
  openGraph: {
    title: 'JPG to PDF Converter Online – Free | PDFilio',
    description: 'Convert JPG and JPEG images to PDF online quickly and securely.',
    url: 'https://pdfilio.com/jpg-to-pdf',
    type: 'website',
  },
};

export default function JpgToPdfToolPage() {
  return (
    <>
      <JpgToPdfTool />
      <ToolLandingLayout
        toolName="JPG to PDF"
        toolSlug="jpg-to-pdf"
        description="Convert JPG and JPEG images into a professional PDF online. Combine multiple images, preserve image quality, and create a PDF in seconds."
        heroImage="/tool-images/jpg-to-pdf-hero.png"
        mainContent="JPG to PDF is a free online converter for turning photos, scans, screenshots, and other JPG or JPEG images into PDF documents. Upload one or multiple images, arrange them as needed, and create a single PDF without installing software."
        useCase="Use JPG to PDF when you need to turn scanned pages, receipts, photos, certificates, screenshots, or other images into a shareable PDF document. It is useful for students, offices, businesses, and anyone who needs an easy image-to-document workflow."
        features={['Convert JPG and JPEG images to PDF', 'Combine multiple images into one PDF', 'High-quality PDF output', 'Fast browser-based processing', 'No registration required', 'Works on desktop and mobile devices', 'Secure file handling']}
        benefits={['Create shareable PDF documents from images', 'Save time compared with manual document creation', 'Keep your images organized in one PDF', 'Easy workflow for scanned documents and photos', 'Use the tool from any modern browser']}
        testimonials={[
          {
            name: 'John D.',
            role: 'Professional',
            text: 'This tool makes converting image files into a PDF simple and quick.',
          },
        ]}
        faqs={[
          { q: 'Is JPG to PDF free?', a: 'Yes. PDFilio provides an online JPG to PDF converter that can be used without registration.' },
          { q: 'Can I convert multiple JPG images into one PDF?', a: 'Yes. You can combine multiple JPG or JPEG images into a single PDF document.' },
          { q: 'Can I convert JPEG to PDF?', a: 'Yes. JPEG and JPG are supported image formats for creating PDF documents.' },
          { q: 'Do I need to install software?', a: 'No. The converter works through a modern web browser, so you do not need desktop software.' },
          { q: 'Can I use JPG to PDF on my phone?', a: 'Yes. The tool is designed to work on modern mobile and desktop browsers.' },
          { q: 'Will my images stay high quality?', a: 'The converter is designed to produce clear PDF output while processing your uploaded images.' },
          { q: 'Can I convert screenshots to PDF?', a: 'Yes. Screenshots saved as JPG or JPEG images can be converted into PDF documents.' },
          { q: 'Can I turn scanned pages into a PDF?', a: 'Yes. Scan pages as JPG or JPEG images and combine them into a single PDF.' },
          { q: 'Do I need an account to convert JPG to PDF?', a: 'No registration is required for the basic JPG to PDF conversion workflow.' },
          { q: 'Is my uploaded data secure?', a: 'PDFilio is designed with secure file handling. Avoid uploading confidential files when your organization requires a specific document-processing policy.' },
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
        ]}
        primaryKeyword="jpg-to-pdf"
        secondaryKeywords={['JPG to PDF', 'jpg to pdf converter', 'JPEG to PDF', 'convert JPG to PDF', 'free JPG to PDF']}
      />
    </>
  );
}
