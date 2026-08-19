import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import PDFToExcelTool from '@/components/tools/pdf-to-excel-tool';

export const metadata: Metadata = {
  title: 'PDF to Excel Converter Online – Extract PDF Tables to XLSX | PDFilio',
  description: 'Convert supported PDF tables and data into editable Excel spreadsheets online. Extract tables from reports, invoices, statements, and research PDFs.',
  keywords: ['PDF to Excel', 'PDF to XLSX', 'convert PDF to Excel', 'PDF table to Excel', 'extract PDF data', 'PDF to spreadsheet', 'PDF Excel converter'],
  alternates: { canonical: 'https://pdfilio.com/pdf-to-excel' },
  openGraph: {
    title: 'PDF to Excel Converter Online | PDFilio',
    description: 'Extract supported PDF tables and data into editable Excel spreadsheets.',
    url: 'https://pdfilio.com/pdf-to-excel',
    type: 'website',
  },
};

export default function PDFToExcelPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to Excel',
    description: 'Convert supported PDF tables and data to Excel spreadsheets.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <PDFToExcelTool />
      <ToolLandingLayout
        toolName="PDF to Excel"
        toolSlug="pdf-to-excel"
        description="Convert supported PDF tables and structured data into editable Excel spreadsheets for analysis, reporting, accounting, and data workflows."
        heroImage="/tool-images/pdf-to-excel-hero.png"
        mainContent={`PDF to Excel helps turn supported PDF tables and structured information into editable Excel spreadsheets. It is useful when data is locked inside reports, invoices, financial statements, research papers, or other PDF documents and you need to analyze or edit it in a spreadsheet.

Digital PDFs with clear table structure are generally easier to extract than scanned or heavily formatted documents. For scanned PDFs, OCR may be needed first. Complex layouts, merged cells, unusual fonts, images, and poor document quality can affect the resulting spreadsheet, so important financial or business data should always be reviewed after conversion.

Typical workflow: upload a supported PDF, let the converter process the document, review the extracted spreadsheet, and download the resulting XLSX file.`}
        useCase={[
          'Converting financial reports into spreadsheets',
          'Extracting invoice and billing tables',
          'Preparing research tables for analysis',
          'Moving report data into Excel',
          'Working with structured business data',
          'Reviewing transaction and statement tables',
          'Preparing spreadsheet-based reports',
          'Reducing manual data-entry work',
        ].join('\n')}
        features={[
          'PDF table extraction',
          'Excel XLSX output',
          'Support for multiple tables in supported PDFs',
          'Editable spreadsheet data',
          'Structured data extraction',
          'Browser-based conversion',
          'Useful for reports and invoices',
          'Mobile and desktop browser support',
        ]}
        benefits={[
          'Reduce repetitive manual data entry',
          'Move PDF table data into an editable spreadsheet',
          'Make extracted data easier to sort and analyze',
          'Speed up report and invoice workflows',
          'Create a useful starting point for spreadsheet analysis',
          'Keep PDF conversion and spreadsheet preparation in one workflow',
        ]}
        testimonials={[]}
        relatedTools={[
          { name: 'Excel to PDF', slug: 'excel-to-pdf' },
          { name: 'PDF to Word', slug: 'pdf-to-word' },
          { name: 'AI OCR', slug: 'ai-ocr' },
          { name: 'Merge PDF', slug: 'merge-pdf' },
          { name: 'Compress PDF', slug: 'compress-pdf' },
        ]}
        faqs={[
          { q: 'What is PDF to Excel?', a: 'PDF to Excel converts supported PDF tables and structured data into an editable Excel spreadsheet, usually in XLSX format.' },
          { q: 'Can I convert a PDF to XLSX?', a: 'Yes. Supported PDF data can be converted into an editable XLSX spreadsheet.' },
          { q: 'Can I extract tables from a PDF?', a: 'Yes. The tool is designed to extract supported table structures and place the resulting data into a spreadsheet.' },
          { q: 'Does PDF to Excel work with scanned PDFs?', a: 'Scanned PDFs may require OCR because their tables are stored as images rather than selectable text. Results depend on scan quality and layout.' },
          { q: 'Can I convert multiple tables from one PDF?', a: 'Supported PDFs containing multiple tables can be processed, although the resulting spreadsheet structure can vary with the document layout.' },
          { q: 'Will formatting be preserved exactly?', a: 'Not necessarily. Spreadsheet output depends on the original PDF structure, tables, fonts, merged cells, and other layout characteristics.' },
          { q: 'How accurate is PDF table extraction?', a: 'Accuracy varies by document quality and table complexity. Always review important extracted figures, formulas, totals, and financial data against the original PDF.' },
          { q: 'Can I convert invoices to Excel?', a: 'Yes. Invoice tables are a common use case when the PDF contains readable, structured data.' },
          { q: 'Can I convert financial statements to Excel?', a: 'Yes, supported financial statements can be converted for further spreadsheet analysis, but important financial figures should be verified after conversion.' },
          { q: 'Can I convert research tables to Excel?', a: 'Yes. Research tables in supported digital PDFs can be useful candidates for spreadsheet extraction.' },
          { q: 'Can I use PDF to Excel on my phone?', a: 'Yes. The browser-based workflow can be accessed from supported mobile devices as well as desktop computers.' },
          { q: 'Is PDF to Excel free?', a: 'PDFilio provides the online tool; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
          { q: 'What if my PDF contains a password?', a: 'Password-protected files may need to be unlocked with the appropriate authorization before their contents can be processed.' },
        ]}
        primaryKeyword="PDF to Excel"
        secondaryKeywords={['PDF to XLSX', 'convert PDF to Excel', 'PDF table to Excel', 'extract PDF data', 'PDF to spreadsheet', 'PDF Excel converter']}
        schema={schema}
      />
    </>
  );
}
