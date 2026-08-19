import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import CompressPDFTool from '@/components/tools/compress-pdf-tool';

export const metadata: Metadata = {
  title: 'Compress PDF Online – Reduce PDF File Size | PDFilio',
  description: 'Compress supported PDF files online and reduce their size for email, uploads, sharing, and storage. Choose a quality level and download the result.',
  keywords: ['compress PDF', 'compress PDF online', 'reduce PDF size', 'shrink PDF', 'PDF compressor', 'reduce PDF file size', 'compress PDF free'],
  alternates: { canonical: 'https://pdfilio.com/compress-pdf' },
  openGraph: {
    title: 'Compress PDF Online – Reduce PDF File Size | PDFilio',
    description: 'Reduce the size of supported PDFs with selectable compression quality levels.',
    url: 'https://pdfilio.com/compress-pdf',
    type: 'website',
  },
};

export default function CompressPDFPage() {
  return (
    <>
      <CompressPDFTool />
      <ToolLandingLayout
        toolName="Compress PDF"
        toolSlug="compress-pdf"
        description="Reduce the file size of supported PDFs with selectable compression quality levels for easier sharing, uploading, storage, and transfer."
        heroImage="/tool-images/compress-pdf-hero.png"
        mainContent={`Compress PDF helps reduce the size of supported PDF documents while letting you choose a quality level that fits your needs. Smaller PDFs can be easier to email, upload to websites, store, or transfer between devices.

The available compression levels balance file-size reduction and document quality differently. High quality prioritizes quality preservation, Medium provides a balance, and Low prioritizes a smaller output. The actual reduction depends on the PDF's images, fonts, embedded content, page structure, and other characteristics.

After processing, PDFilio reports the original size, compressed size, and resulting reduction. Review the output before using it for important documents, especially when image quality or print quality matters.`}
        useCase={[
          'Reducing PDF email attachment size',
          'Meeting website upload limits',
          'Saving document storage space',
          'Preparing PDFs for online sharing',
          'Making document transfers easier',
          'Reducing PDF size before cloud uploads',
          'Creating smaller copies for mobile sharing',
          'Optimizing PDFs for practical everyday use',
        ].join('\n')}
        features={[
          'High, medium, and low compression levels',
          'Original and compressed size comparison',
          'Reports actual size reduction',
          'Downloadable compressed PDF',
          'PDF file validation',
          'Browser-based workflow',
          'Mobile and desktop browser support',
          'Process another PDF from the same page',
        ]}
        benefits={[
          'Reduce PDF storage requirements',
          'Send smaller email attachments',
          'Make uploads more convenient',
          'Speed up practical file transfers',
          'Share documents more easily',
          'Choose the quality-versus-size balance you need',
        ]}
        faqs={[
          { q: 'How much can I compress a PDF?', a: 'The amount of reduction depends on the PDF content and selected quality level. The tool reports the actual result after processing.' },
          { q: 'Will compressing a PDF reduce quality?', a: 'Compression can affect visual quality depending on the selected setting and the original PDF. Higher quality generally prioritizes preservation, while lower quality prioritizes a smaller file.' },
          { q: 'Can I compress a PDF to exactly 100KB or 200KB?', a: 'The current tool uses selectable quality levels rather than guaranteeing a specific target file size.' },
          { q: 'What is the maximum PDF file size?', a: 'Very large files may take longer to process or may exceed current processing limits. Follow the uploader requirements shown by the tool.' },
          { q: 'Which compression level should I choose?', a: 'Choose High when quality preservation matters most, Medium for a balance, or Low when reducing file size is the priority.' },
          { q: 'Can I compress a PDF on my phone?', a: 'Yes. The browser-based tool can be used from supported modern phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install software?', a: 'No separate desktop application is required for the browser-based PDF compression workflow.' },
          { q: 'How do I know how much smaller my PDF became?', a: 'After processing, the tool reports the original size, compressed size, and resulting reduction.' },
          { q: 'Can I compress another PDF after one conversion?', a: 'Yes. The page supports processing another PDF without needing to leave the compression workflow.' },
          { q: 'Does compression work on image-heavy PDFs?', a: 'It can reduce image-heavy PDFs, but the amount of reduction and resulting visual quality depend on the embedded images and selected compression level.' },
          { q: 'Can I compress a scanned PDF?', a: 'Yes, supported scanned PDFs can be processed. Because scans often contain images, the resulting size reduction can vary significantly.' },
          { q: 'Will links and document features always remain unchanged?', a: 'Not every PDF feature is guaranteed to remain identical after processing. Review important documents and interactive features in the output before relying on them.' },
          { q: 'Is Compress PDF free?', a: 'PDFilio provides the online compression tool; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
        ]}
        relatedTools={[
          { name: 'Split PDF', slug: 'split-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'PDF to Excel', slug: 'pdf-to-excel' },
          { name: 'Rotate PDF', slug: 'rotate-pdf' },
        ]}
        primaryKeyword="compress PDF"
        secondaryKeywords={['compress PDF online', 'reduce PDF size', 'shrink PDF', 'PDF compressor', 'reduce PDF file size', 'compress PDF free']}
      />
    </>
  );
}
