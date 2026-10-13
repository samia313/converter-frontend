import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import WordToPDFTool from '@/components/tools/word-to-pdf-tool';

export const metadata: Metadata = {
  title: { absolute: 'Word to PDF Converter Free Online | DOCX to PDF | PDFilio' },
  description: 'Convert Word and DOCX to PDF free online. Turn documents into shareable PDFs for resumes, reports, forms, and applications. Review before downloading.',
  keywords: ['Word to PDF', 'Word to PDF converter', 'convert Word to PDF', 'DOC to PDF', 'DOCX to PDF', 'Word document to PDF', 'Word to PDF online'],
  alternates: { canonical: 'https://pdfilio.com/word-to-pdf' },
  openGraph: {
    title: 'Word to PDF Converter Free Online | DOCX to PDF | PDFilio',
    description: 'Convert Word and DOCX to PDF free online. Turn documents into shareable PDFs for resumes, reports, forms, and applications. Review before downloading.',
    url: 'https://pdfilio.com/word-to-pdf',
    type: 'website',
    images: [{ url: 'https://pdfilio.com/tool-images/word-to-pdf-hero.png', alt: 'Convert Word documents to PDF with PDFilio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word to PDF Converter Free Online | DOCX to PDF | PDFilio',
    description: 'Convert Word to PDF free online with PDFilio. Turn DOC and DOCX files into shareable PDFs, then review before downloading.',
    images: ['https://pdfilio.com/tool-images/word-to-pdf-hero.png'],
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
        mainContent={`Use the Word to PDF converter to turn a supported Microsoft Word document into a PDF you can share, print, submit, or archive. PDF is useful when recipients need to view a document without editing the original Word file. Common examples include resumes, job applications, reports, proposals, letters, forms, and contracts.

To convert Word to PDF online, choose a supported DOC or DOCX file in the uploader, start the conversion, then open the generated PDF and check it before downloading. If you have several documents, convert each supported file using the tool's available workflow and keep the original Word files as editable backups.

Word-to-PDF conversion may change details in complex source documents. Fonts that are unavailable, large or anchored images, tables, columns, headers, footers, page breaks, and unusual page sizes can affect layout or pagination. For important documents, compare the PDF with the original Word file and check every page, especially signatures, totals, tables, and page numbering.

DOC and DOCX are different Word file formats, and the formats available for conversion are determined by the current uploader. Select only a file type the tool marks as supported. Processing time and upload limits depend on the current tool configuration.`}
        useCase={[
          'Convert a resume to PDF before submitting a job application',
          'Share a business proposal or report in a consistent document format',
          'Prepare letters and forms for printing',
          'Send a read-ready copy of a contract for review',
          'Create PDF copies of finalized Word documents for archiving',
          'Prepare documents for portals that request PDF uploads',
          'Share project documents with clients or colleagues',
          'Keep the original DOC or DOCX file available for future edits',
        ].join('\\n')}
        features={[
          'Convert supported DOC and DOCX files to PDF',
          'Create a PDF copy for sharing and printing',
          'Review the generated file before download',
          'Browser-based conversion workflow',
          'Access from supported desktop and mobile browsers',
          'Useful for resumes, reports, letters, and proposals',
          'Keep the source Word document as an editable backup',
          'Links to related document conversion tools',
        ]}
        benefits={[
          'Share a document in a widely used viewing and printing format',
          'Prepare resumes and reports for PDF-only submission portals',
          'Reduce the need for recipients to edit the source document',
          'Keep a separate editable Word original for later changes',
          'Review page layout before distributing important documents',
          'Move documents into common PDF-based workflows',
        ]}
        testimonials={[]}
        faqs={[
          { q: 'How do I convert Word to PDF online?', a: 'Open the Word to PDF tool, choose a supported DOC or DOCX file, start conversion, then review and download the generated PDF.' },
          { q: 'Can I convert DOCX to PDF?', a: 'Yes, when DOCX is accepted by the current uploader. Select the supported DOCX file and run the conversion.' },
          { q: 'Can I convert DOC to PDF?', a: 'Use the DOC format if it is listed as supported by the uploader. If the tool does not accept your DOC file, save or export it as DOCX using a compatible editor and try again.' },
          { q: 'Will Word formatting be preserved exactly?', a: 'Exact formatting cannot be guaranteed for every file. Fonts, tables, images, columns, headers, footers, and page breaks can affect the result, so review the PDF before sharing it.' },
          { q: 'Can I convert a resume to PDF?', a: 'Yes, if the resume is in a supported Word format. Check page breaks, contact details, and formatting in the generated PDF before submitting it.' },
          { q: 'Can I convert a report or proposal to PDF?', a: 'Supported DOC or DOCX reports and proposals can be converted. Review tables, charts, page numbering, and other layout details afterward.' },
          { q: 'Can I convert a contract to PDF?', a: 'A supported Word contract can be converted to PDF. Carefully review all clauses, names, dates, page order, and signature areas before using or distributing the result.' },
          { q: 'Can Word documents with tables be converted?', a: 'Supported documents containing tables can be processed, but wide or complex tables may wrap or paginate differently. Check each table in the resulting PDF.' },
          { q: 'Can I use the Word to PDF converter on my phone?', a: 'You can open the browser-based tool on supported phones, tablets, and desktop browsers. The available file picker and upload limits depend on your device and the current tool configuration.' },
          { q: 'Do I need Microsoft Word installed?', a: 'You do not need to open the document in Microsoft Word to use the online workflow, provided the file is in a format the uploader accepts.' },
          { q: 'How long does Word to PDF conversion take?', a: 'Processing time depends on file size, document complexity, page count, and current system resources.' },
          { q: 'Is Word to PDF free?', a: 'Check the current tool interface for any usage limits, account requirements, or availability conditions; these can depend on the product configuration.' },
          { q: 'Can I edit the PDF after conversion?', a: 'PDFs are commonly used for sharing and viewing. Keep the original Word document if you expect to make substantial text or layout changes later.' },
        ]}
        relatedTools={[
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'Excel to PDF', slug: 'excel-to-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
          { name: 'PDF to PNG', slug: 'pdf-to-png' },
        ]}
        primaryKeyword="Word to PDF"
        secondaryKeywords={['Word to PDF converter', 'convert Word to PDF', 'convert Word to PDF free', 'DOC to PDF', 'DOCX to PDF', 'Word document to PDF', 'Word to PDF online']}
      />
    </>
  );
}
