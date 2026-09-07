import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import CompressPDFTool from '@/components/tools/compress-pdf-tool';

export const metadata: Metadata = {
  title: 'Compress PDF to 2MB or Smaller – Reduce PDF Size Online | PDFilio',
  description: 'Compress PDF files online and reduce PDF size for email, WhatsApp, uploads, and storage. Work toward a 2MB target and check the resulting quality and file size.',
  keywords: [
    'compress PDF to 2MB',
    'compress PDF under 2MB',
    'compress PDF for email',
    'how to make PDF smaller for email',
    'reduce PDF size',
    'compress PDF online',
    'PDF compressor',
  ],
  alternates: { canonical: 'https://pdfilio.com/compress-pdf' },
  openGraph: {
    title: 'Compress PDF to 2MB or Smaller – Reduce PDF Size Online | PDFilio',
    description: 'Reduce PDF size for email, uploads, WhatsApp and online forms while checking the final quality.',
    url: 'https://pdfilio.com/compress-pdf',
    type: 'website',
  },
};

export default function CompressPDFPage() {
  return (
    <>
      <CompressPDFTool />
      <ToolLandingLayout
        toolName="Compress PDF Online"
        toolSlug="compress-pdf"
        description="Reduce PDF file size for email, WhatsApp, online forms, uploads, storage, and sharing. Choose a compression level and check the final file size and quality."
        heroImage="/tool-images/compress-pdf-hero.png"
        mainContent={`Compress PDF online when a document is too large to email, upload, store, or share.

## Compress PDF to 2MB

If an upload form requires a PDF around 2MB, start with a stronger available compression setting and check the resulting file size. There is no universal compression ratio: scanned and image-heavy PDFs may remain larger than text-heavy PDFs.

## Compress PDF for Email

Email attachment limits vary by provider. Reduce the PDF, download the result, and open it before sending. If the file is still too large, remove unnecessary pages, reduce oversized source images, or split the document when the destination permits multiple files.

## How to Make a PDF Smaller for Email

A practical workflow is to keep the original, compress a copy, compare the new file size, and inspect text, images, tables, signatures, and links. Use the smallest version that remains readable and fit for its purpose.

## Reduce PDF Size Without Losing Too Much Quality

Higher compression can reduce image quality. Use the lightest compression that meets your upload or sharing requirement, then verify important pages before replacing the original.

## Why Is My PDF So Large?

Large photographs, scanned pages, embedded fonts, graphics, attachments, and other document resources can increase PDF size. Removing unnecessary content at the source can sometimes produce a better result than repeated compression.

## Is There a Guaranteed 2MB Result?

No. PDF compression depends on the source document and the available compression settings. PDFilio reports the actual output size after processing so you can check whether it meets your target.`}
        useCase={[
          'Reducing PDF email attachment size',
          'Meeting website and application upload limits',
          'Preparing PDFs for WhatsApp and mobile sharing',
          'Saving document storage space',
          'Reducing PDFs before cloud uploads',
          'Creating smaller copies for everyday document sharing',
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
          { q: 'How can I compress a PDF to 2MB?', a: 'Upload the PDF, choose a stronger available compression setting, process it, and check the resulting size. A 2MB result cannot be guaranteed for every source PDF.' },
          { q: 'Can I compress a PDF for email?', a: 'Yes. Compress the PDF, check the final size against your email provider limit, and open the result to verify readability before sending.' },
          { q: 'How do I make a PDF smaller for email?', a: 'Use PDF compression first. If the file remains too large, remove unnecessary pages or oversized source images, or split the document when appropriate.' },
          { q: 'Will compressing a PDF reduce quality?', a: 'It can. Higher compression may reduce image quality, so review important pages after processing.' },
          { q: 'Can I compress a PDF on my phone?', a: 'Yes. The browser-based workflow can be used from supported modern phones, tablets, and desktop browsers.' },
          { q: 'What makes a PDF file so large?', a: 'High-resolution images, scans, embedded fonts, graphics, attachments, and other resources can increase file size.' },
          { q: 'How do I know how much smaller my PDF became?', a: 'After processing, PDFilio reports the original size, compressed size, and resulting reduction.' },
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
        secondaryKeywords={['compress PDF to 2MB', 'compress PDF under 2MB', 'compress PDF for email', 'how to make PDF smaller for email', 'reduce PDF size']}
      />
    </>
  );
}
