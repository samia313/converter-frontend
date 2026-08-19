import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToWordTool from '@/components/tools/pdf-to-word-tool';

export const metadata: Metadata = {
  title: 'PDF to Word Converter Online – Convert PDF to DOCX | PDFilio',
  description: 'Convert supported PDF documents to editable Word DOCX files online. Extract text and content from reports, forms, and business documents in your browser.',
  keywords: ['PDF to Word', 'convert PDF to Word', 'PDF to DOCX', 'PDF to DOC', 'PDF Word converter', 'PDF to editable Word', 'PDF to Word online'],
  alternates: { canonical: 'https://pdfilio.com/pdf-to-word' },
  openGraph: {
    title: 'PDF to Word Converter Online | PDFilio',
    description: 'Convert supported PDFs into editable Word documents online.',
    url: 'https://pdfilio.com/pdf-to-word',
    type: 'website',
  },
};

export default function PDFToWordPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to Word Converter',
    description: 'Convert supported PDF documents to editable Word files.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <PDFToWordTool />
      <ToolLandingLayout
        toolName="PDF to Word Converter"
        toolSlug="pdf-to-word"
        description="Convert supported PDF documents into editable Word files for editing, reuse, document preparation, and business workflows."
        heroImage="/tool-images/pdf-to-word-hero.png"
        mainContent={`PDF to Word Converter helps turn supported PDF documents into editable Word files. It is useful when you need to edit text, reuse content, update a report, or move information from a PDF into a Word document.

Digital PDFs with clear text generally provide better conversion results than scanned or unusually complex files. Tables, columns, images, fonts, forms, and other layout elements can affect the final Word document, so important documents should be reviewed after conversion.

For scanned PDFs, OCR may be needed to recognize image-based text before or during document processing, depending on the current PDFilio workflow. The practical goal is an editable Word starting point rather than a guarantee of pixel-perfect reproduction for every PDF.`}
        useCase={[
          'Editing PDF reports in Word',
          'Updating business documents',
          'Repurposing PDF content',
          'Working with PDF forms and templates',
          'Editing text from invoices and reports',
          'Preparing documents for collaboration',
          'Moving PDF content into Word-based workflows',
          'Creating editable versions of supported PDFs',
        ].join('\n')}
        testimonials={[]}
        features={[
          'PDF to editable Word conversion',
          'DOCX document output',
          'Text and content extraction',
          'Support for common PDF layouts',
          'Browser-based conversion',
          'No software installation required',
          'Useful on desktop and mobile browsers',
          'Workflow for supported scanned documents',
        ]}
        benefits={[
          'Edit PDF content more easily in Word',
          'Reduce manual copying and retyping',
          'Reuse document content for new work',
          'Prepare PDFs for collaborative editing',
          'Move supported document text into familiar Word workflows',
          'Create an editable starting point for document updates',
        ]}
        faqs={[
          { q: 'Can I convert PDF to Word online?', a: 'Yes. PDFilio provides a browser-based workflow for converting supported PDF documents into editable Word files.' },
          { q: 'Can I convert PDF to DOCX?', a: 'Yes. Supported PDFs can be converted into Word-compatible DOCX documents.' },
          { q: 'Can I convert PDF to DOC?', a: 'The current output format depends on the PDFilio tool interface and supported conversion workflow. Use the available download format shown by the converter.' },
          { q: 'Will formatting be preserved exactly?', a: 'Not necessarily. Conversion quality depends on the PDF structure, fonts, tables, columns, images, and other layout elements.' },
          { q: 'Can I edit the converted Word file?', a: 'Yes. The purpose of the conversion is to create an editable Word document from supported PDF content.' },
          { q: 'Does PDF to Word work with scanned PDFs?', a: 'Scanned PDFs may require OCR because their text is stored as page images. Results depend on scan quality and recognition accuracy.' },
          { q: 'Can I convert PDFs with tables?', a: 'Supported PDFs containing tables can be converted, but complex tables or unusual layouts may require manual cleanup in Word.' },
          { q: 'Can I convert a PDF report to Word?', a: 'Yes. Reports are a common use case when the PDF contains readable, structured text.' },
          { q: 'Can I convert invoices to Word?', a: 'Supported invoices can be converted, although the final layout may vary depending on the invoice design and PDF structure.' },
          { q: 'Can I use PDF to Word on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported phones and tablets as well as desktop computers.' },
          { q: 'How long does PDF to Word conversion take?', a: 'Processing time depends on file size, page count, document complexity, and current system resources.' },
          { q: 'Is PDF to Word free?', a: 'PDFilio provides the online converter; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
          { q: 'What should I do if the converted document needs cleanup?', a: 'Review headings, tables, spacing, images, fonts, and page breaks in Word. Complex PDF layouts can require manual formatting adjustments after conversion.' },
        ]}
        relatedTools={[
          { name: 'Word to PDF', slug: 'word-to-pdf' },
          { name: 'PDF to Excel', slug: 'pdf-to-excel' },
          { name: 'AI OCR', slug: 'ai-ocr' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
        ]}
        primaryKeyword="PDF to Word"
        secondaryKeywords={['convert PDF to Word', 'PDF to DOCX', 'PDF to DOC', 'PDF Word converter', 'PDF to editable Word', 'PDF to Word online']}
        schema={schema}
      />
    </>
  );
}
