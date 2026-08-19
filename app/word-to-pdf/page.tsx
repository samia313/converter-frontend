import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import WordToPDFTool from '@/components/tools/word-to-pdf-tool';

export const metadata: Metadata = {
  title: 'Word to PDF Converter Online – Convert DOC & DOCX to PDF | PDFilio',
  description: 'Convert supported Word DOC and DOCX documents to PDF online. Create shareable PDF files from resumes, reports, proposals, contracts, and business documents.',
  keywords: ['Word to PDF', 'Word to PDF converter', 'convert Word to PDF', 'DOC to PDF', 'DOCX to PDF', 'Word document to PDF', 'Word to PDF online'],
  alternates: { canonical: 'https://pdfilio.com/word-to-pdf' },
  openGraph: {
    title: 'Word to PDF Converter Online | PDFilio',
    description: 'Convert supported DOC and DOCX documents into PDF files for sharing, printing, and document workflows.',
    url: 'https://pdfilio.com/word-to-pdf',
    type: 'website',
  },
};

export default function WordToPDFPage() {
  return (
    <>
      <WordToPDFTool />
      <ToolLandingLayout
        toolName="Word to PDF Converter"
        toolSlug="word-to-pdf"
        description="Convert supported Word DOC and DOCX documents into PDF files for sharing, printing, archiving, and professional document workflows."
        heroImage="/tool-images/word-to-pdf-hero.png"
        mainContent={`Word to PDF Converter helps turn supported Word documents into PDF files. PDF is commonly used when you want a stable document format for sharing, printing, submitting applications, distributing reports, or archiving a finished document.

The final appearance can depend on the source document, fonts, images, tables, page layout, and conversion engine. Review the generated PDF before sending or publishing important documents, especially when exact pagination or complex formatting matters.

Typical workflow: upload a supported DOC or DOCX file, start the conversion, review the resulting PDF, and download it for your next document workflow. Availability of specific input formats and processing limits depends on the current tool configuration.`}
        useCase={[
          'Converting resumes for job applications',
          'Preparing business proposals and reports',
          'Sharing contracts and formal documents',
          'Creating PDFs for printing',
          'Preparing documents for email and uploads',
          'Archiving finalized Word documents',
          'Sharing documents with clients or teams',
          'Creating PDF copies for submission workflows',
        ].join('\n')}
        features={[
          'DOC and DOCX to PDF conversion',
          'PDF document output',
          'Browser-based workflow',
          'Useful for common Word documents',
          'Desktop and supported mobile browser access',
          'Downloadable PDF output',
          'Simple upload and conversion process',
          'Related PDF document tools',
        ]}
        benefits={[
          'Create a widely shareable PDF version of a Word document',
          'Prepare documents for printing and submission',
          'Reduce manual file-format conversion work',
          'Keep finalized documents in a common distribution format',
          'Move Word documents into PDF-based workflows',
          'Make document sharing easier across devices',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I convert Word to PDF online?', a: 'Upload a supported DOC or DOCX document, start the Word-to-PDF conversion, review the generated PDF, and download the result.' },
          { q: 'Can I convert DOCX to PDF?', a: 'Yes. Supported DOCX documents can be converted into PDF files through the Word to PDF workflow.' },
          { q: 'Can I convert DOC to PDF?', a: 'Yes, if the current uploader accepts DOC files. Follow the input formats shown by the tool interface.' },
          { q: 'Will Word formatting be preserved exactly?', a: 'Exact preservation is not guaranteed for every document. Fonts, tables, images, page breaks, headers, footers, and complex layouts can affect the final PDF.' },
          { q: 'Can I convert a resume to PDF?', a: 'Yes. Converting a resume to PDF is a common way to create a shareable version for applications and submissions.' },
          { q: 'Can I convert a business report to PDF?', a: 'Yes. Supported Word reports can be converted to PDF for sharing, printing, review, or archiving.' },
          { q: 'Can I convert contracts to PDF?', a: 'Supported Word contracts can be converted to PDF. Review the generated file carefully before signing or distributing it.' },
          { q: 'Can I convert Word documents with tables?', a: 'Yes, supported documents containing tables can be processed, but complex tables may need visual review after conversion.' },
          { q: 'Can I use Word to PDF on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
          { q: 'Do I need to install Microsoft Word?', a: 'No Microsoft Word installation is required to use the online conversion workflow, provided your file is in a supported format.' },
          { q: 'How long does Word to PDF conversion take?', a: 'Processing time depends on document size, page count, complexity, and current system resources.' },
          { q: 'Is Word to PDF free?', a: 'PDFilio provides the online converter; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
          { q: 'Can I edit the PDF after conversion?', a: 'A PDF is primarily a distribution format. If you need to make substantial edits, keeping the original Word document is usually the better option.' },
        ]}
        relatedTools={[
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Excel to PDF', slug: 'excel-to-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
        ]}
        primaryKeyword="Word to PDF"
        secondaryKeywords={['Word to PDF converter', 'convert Word to PDF', 'DOC to PDF', 'DOCX to PDF', 'Word document to PDF', 'Word to PDF online']}
      />
    </>
  );
}
