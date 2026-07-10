import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import SplitPDFTool from '@/components/tools/split-pdf-tool';

export const metadata: Metadata = {
  title: 'Split PDF - Divide PDFs into Separate Pages | PDFilio',
  description: 'Split PDF files into individual pages or custom ranges. Extract specific pages from large PDFs instantly. Free, secure, and no registration required.',
  keywords: ['split PDF', 'divide PDF', 'extract PDF pages', 'PDF splitter'],
};

export default function SplitPDFPage() {
  return (
    <>
      <SplitPDFTool />
      <ToolLandingLayout
      toolName="Split PDF"
      toolSlug="split-pdf"
      description="Divide your PDF files into individual pages or extract specific page ranges. Perfect for organizing documents, extracting sections, and managing large PDF files with precision."
      heroImage="/tool-images/split-pdf-hero.png"
      mainContent={`Split PDF is the easiest way to divide your PDF documents into separate pages or extract specific ranges. Whether you need to isolate individual pages from a multi-page document or organize large PDFs into manageable sections, our tool handles everything instantly without compromising quality.

Our Split PDF tool is designed for professionals who work with large documents, students managing research papers, and anyone who needs to reorganize PDF files. With support for custom page ranges and batch processing, you can split files exactly the way you need.

The splitting process is completely secure - your files are processed on our servers and automatically deleted after conversion. No registration required, no ads, no tracking. Split as many PDFs as you want, completely free.`}
      useCase={`Students extracting specific chapters from textbooks or research papers
Business professionals isolating relevant documents from large reports
Publishers and editors organizing multi-part publications
Legal professionals extracting specific pages from contracts
IT professionals managing technical documentation
Content creators organizing multi-file publications`}
      features={[
        'Split into individual pages instantly',
        'Extract custom page ranges',
        'Batch split multiple PDFs',
        'Preserve formatting and quality',
        'No file size limits',
        'Works on all devices',
        'Automatic page detection',
        'Download instantly',
      ]}
      benefits={[
        'Organize large documents efficiently',
        'Extract only needed pages',
        'Share individual sections easily',
        'Manage document workflows',
        'Reduce file sizes',
        'Improve document accessibility',
        'Save time on manual splitting',
        'Maintain document integrity',
      ]}
      testimonials={[
        {
          name: 'Sarah M.',
          role: 'Legal Professional',
          text: 'Split PDF saved me hours of manual work. I can now extract specific contract pages in seconds instead of minutes. Highly recommended for law firms.',
        },
        {
          name: 'Ahmed K.',
          role: 'Student',
          text: 'Perfect for extracting chapters from PDF textbooks. The tool preserves all formatting perfectly. No quality loss whatsoever.',
        },
        {
          name: 'Lisa Chen',
          role: 'Content Manager',
          text: 'Using Split PDF daily for document organization. Fast, reliable, and completely free. Exactly what we needed.',
        },
      ]}
      relatedTools={[
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Rotate PDF', slug: 'rotate-pdf' },
      ]}
      faqs={[
        {
          q: 'How do I split a PDF into individual pages?',
          a: 'Upload your PDF file, select which pages you want to extract (individual pages or page ranges), click Split, and download your new PDF files. The process takes just seconds.',
        },
        {
          q: 'Can I extract multiple page ranges from one PDF?',
          a: 'Yes! You can select multiple non-consecutive pages or ranges from your PDF. Simply specify the pages you want to keep, and we will extract them into a new PDF file.',
        },
        {
          q: 'What happens to my uploaded PDF files?',
          a: 'Your files are processed on our secure servers and automatically deleted after 24 hours. We never store your files, share them with third parties, or use them for any purpose other than processing.',
        },
        {
          q: 'Is there a limit on file size or number of pages?',
          a: 'No! You can split PDFs of any size. We support documents with hundreds of pages and large file sizes. Upload and split as many files as you need.',
        },
        {
          q: 'Will splitting a PDF reduce quality or lose formatting?',
          a: 'No. Split PDF preserves 100% of the original formatting, fonts, images, and quality. Your extracted pages will look identical to the original.',
        },
        {
          q: 'Can I split PDF on my mobile phone?',
          a: 'Absolutely! Split PDF works perfectly on phones, tablets, and desktops. All processing happens in your browser, so no special software is needed.',
        },
        {
          q: 'Do I need to sign up or download anything?',
          a: 'No sign-up, no downloads, no installation required. Just visit PDFilio, upload your file, select your pages, and download your split PDF. Completely free.',
        },
        {
          q: 'Can I undo or restore pages after splitting?',
          a: 'The original PDF remains unchanged on your device. Each split creates a new file. You can always re-upload the original to split differently.',
        },
        {
          q: 'What file formats can I split?',
          a: 'Split PDF works with standard PDF files (.pdf). If you need to split other formats like Word or Excel, use our format conversion tools first.',
        },
        {
          q: 'Is Split PDF free or do I need to pay?',
          a: 'Split PDF is 100% free. No hidden fees, no watermarks, no premium versions. Split unlimited PDFs for free, forever.',
        },
        {
          q: 'How fast is the PDF splitting process?',
          a: 'Most PDFs split in under 5 seconds. Large files may take a bit longer, but typically complete within 30 seconds.',
        },
        {
          q: 'Can I keep the original PDF and download only extracted pages?',
          a: 'Yes! When you split a PDF, you get only the selected pages as a new file. Your original PDF remains untouched on your device.',
        },
      ]}
      primaryKeyword="split PDF"
      secondaryKeywords={['divide PDF', 'extract PDF pages', 'PDF splitter', 'separate PDF pages']}
      />
    </>
  );
}
