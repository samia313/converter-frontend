import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import CompressPDFTool from '@/components/tools/compress-pdf-tool';

export const metadata: Metadata = {
  title: 'Compress PDF Online - Reduce File Size Free | PDFilio',
  description: 'Compress PDF files online and reduce file size with selectable quality levels. Free PDF compressor.',
  keywords: 'compress PDF, reduce PDF size, compress PDF online, free PDF compressor',
  alternates: {
    canonical: 'https://pdfilio.com/compress-pdf',
  },
};

export default function CompressPDFPage() {
  return (
    <>
      <CompressPDFTool />
      <ToolLandingLayout
        toolName="Compress PDF"
        toolSlug="compress-pdf"
        description="Reduce PDF file size with selectable compression quality levels. Upload a PDF, choose a quality setting, and download the compressed result."
        heroImage="/tool-images/compress-pdf-hero.png"
        mainContent={`Compress PDF lets you reduce the size of a PDF while choosing the compression quality that fits your needs. It can help when you need a smaller document for sharing, uploading, storage, or transfer.

Choose from high, medium, or low compression quality. The tool processes your PDF and reports the original size, compressed size, and resulting reduction before you download the file.

Processing is performed through PDFilio's PDF conversion service. If a file cannot be processed, the tool reports an error so you can try another PDF or a smaller file.`}
        useCase={`Reducing attachment size for email
Meeting file upload size limits
Saving storage space
Preparing documents for sharing
Making PDF transfers more convenient
Reducing PDF size before uploading to a website`}
        features={[
          'High, medium, and low quality levels',
          'Shows original and compressed file sizes',
          'Reports the resulting size reduction',
          'Download the compressed PDF',
          'Compress another PDF without leaving the page',
          'PDF-only file validation',
        ]}
        benefits={[
          'Reduce storage space',
          'Email smaller files',
          'Faster file transfers',
          'Share documents more easily',
          'Save bandwidth',
          'Choose the quality level you need',
        ]}
        faqs={[
          {
            q: 'How much can I compress a PDF?',
            a: 'The reduction depends on the PDF content and the selected quality level. The tool shows the actual reduction after processing.',
          },
          {
            q: 'Will quality be affected?',
            a: 'Compression can affect file size and visual quality differently depending on the selected setting. High quality prioritizes preserving quality, while low quality prioritizes a smaller file.',
          },
          {
            q: 'Can I compress to a specific file size such as 100KB or 200KB?',
            a: 'The current tool provides quality-level choices rather than a guaranteed target file-size setting.',
          },
          {
            q: 'What is the maximum file size?',
            a: 'Very large files may take longer to process or may fail due to processing limits. If a file cannot be processed, try a smaller PDF.',
          },
          {
            q: 'How do I choose compression quality?',
            a: 'Select High for stronger quality preservation, Medium for a balance, or Low when reducing file size is the priority.',
          },
          {
            q: 'Can I compress a PDF on my phone?',
            a: 'Yes. The Compress PDF page is designed to work on modern phones, tablets, and desktop browsers without requiring separate software.',
          },
          {
            q: 'Do I need to install an app or create an account?',
            a: 'No. You can use the web tool directly from your browser. No desktop application is required for PDF compression.',
          },
          {
            q: 'How do I know how much the PDF was reduced?',
            a: 'After processing, the tool reports the original file size, compressed file size, and resulting reduction so you can compare the result before downloading.',
          },
          {
            q: 'Can I compress another PDF after downloading one?',
            a: 'Yes. You can process another PDF from the same page without navigating away from the Compress PDF tool.',
          },
        ]}
        relatedTools={[
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Rotate PDF', slug: 'rotate-pdf' },
        ]}
        primaryKeyword="compress PDF"
        secondaryKeywords={['reduce PDF size', 'compress PDF online', 'shrink PDF']}
      />
    </>
  );
}
