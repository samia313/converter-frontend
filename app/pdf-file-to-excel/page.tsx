import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'Convert PDF File to Excel Online | PDF to XLSX | PDFilio',
  description: 'Convert PDF files to Excel online. Turn supported PDF tables and structured data into editable XLSX spreadsheets for analysis, reporting, accounting, and data workflows.',
  keywords: [
    'convert PDF file to Excel',
    'PDF file to Excel online',
    'PDF document to Excel',
    'PDF to XLSX online',
    'turn PDF into Excel',
    'PDF spreadsheet converter',
    'PDF table to Excel',
  ],
  alternates: { canonical: 'https://pdfilio.com/pdf-file-to-excel' },
  openGraph: {
    title: 'Convert PDF File to Excel Online | PDF to XLSX | PDFilio',
    description: 'Turn supported PDF tables and structured data into editable Excel spreadsheets online.',
    url: 'https://pdfilio.com/pdf-file-to-excel',
    type: 'website',
  },
};

export default function PDFFileToExcelPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Convert PDF File to Excel',
    description: 'Convert supported PDF tables and structured data into Excel XLSX spreadsheets.',
    applicationCategory: 'Utility',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <ToolLandingLayout
      toolName="PDF File to Excel"
      toolSlug="pdf-to-excel"
      description="Convert supported PDF files into editable Excel spreadsheets for reports, invoices, statements, research tables, accounting, and data analysis."
      heroImage="/tool-images/pdf-to-excel-hero.png"
      mainContent={`Convert PDF files to Excel when important tables or structured data need to be edited, sorted, filtered, or analyzed in a spreadsheet. PDFilio's PDF to Excel workflow is designed for supported PDFs containing readable tables and structured information.

Digital PDFs with clear table structures are generally easier to extract than scanned or heavily formatted documents. Scanned PDFs may require OCR first, while merged cells, unusual layouts, images, and low-quality source documents can affect the resulting spreadsheet. Always compare important figures and totals with the original PDF.

Typical workflow: upload a supported PDF, process the file, review the extracted spreadsheet, and download the resulting XLSX document.`}
      useCase={[
        'Converting PDF reports into Excel spreadsheets',
        'Extracting invoice and billing tables',
        'Moving financial statement data into Excel',
        'Preparing research tables for analysis',
        'Turning business reports into editable spreadsheets',
        'Working with transaction and statement tables',
        'Preparing spreadsheet-based reports',
        'Reducing repetitive manual data entry',
      ].join('\n')}
      features={[
        'PDF table and structured-data extraction',
        'Excel XLSX output',
        'Editable spreadsheet data',
        'Support for supported tables in a PDF',
        'Browser-based conversion workflow',
        'Useful for reports, invoices, and statements',
        'Mobile and desktop browser support',
        'Review-ready spreadsheet output',
      ]}
      benefits={[
        'Move PDF table data into an editable spreadsheet',
        'Reduce repetitive manual data entry',
        'Make extracted data easier to sort and analyze',
        'Speed up report and invoice workflows',
        'Create a useful starting point for spreadsheet analysis',
        'Keep PDF conversion and spreadsheet preparation in one workflow',
      ]}
      testimonials={[]}
      relatedTools={[
        { name: 'PDF to Excel', slug: 'pdf-to-excel' },
        { name: 'Excel to PDF', slug: 'excel-to-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'OCR PDF', slug: 'ocr' },
        { name: 'AI Table Extraction', slug: 'ai-table-extraction' },
      ]}
      faqs={[
        { q: 'How do I convert a PDF file to Excel?', a: 'Upload a supported PDF to PDFilio, process it with the PDF to Excel workflow, review the extracted spreadsheet, and download the XLSX result.' },
        { q: 'Can I convert a PDF file to XLSX?', a: 'Yes. Supported PDF tables and structured data can be converted into an editable XLSX spreadsheet.' },
        { q: 'Can I convert PDF tables to Excel?', a: 'Yes. The workflow is designed to extract supported table structures and place the resulting data into a spreadsheet.' },
        { q: 'Does PDF to Excel work with scanned PDFs?', a: 'Scanned PDFs may require OCR because their contents are stored as images. Results depend on scan quality, table structure, and document layout.' },
        { q: 'Will the Excel formatting match the PDF exactly?', a: 'Not necessarily. Spreadsheet output can vary based on the PDF structure, merged cells, fonts, table layout, and other formatting characteristics.' },
        { q: 'Can I convert invoices from PDF to Excel?', a: 'Yes. Invoices containing readable, structured tables are a common use case for PDF-to-Excel conversion.' },
        { q: 'Can I convert financial statements from PDF to Excel?', a: 'Supported financial statements can be converted for spreadsheet analysis, but important figures, totals, and account data should be checked against the original.' },
        { q: 'Can I convert research tables from PDF to Excel?', a: 'Yes. Tables in supported digital research PDFs can be extracted for further spreadsheet-based review and analysis.' },
        { q: 'How accurate is PDF to Excel conversion?', a: 'Accuracy depends on the source PDF, table complexity, text quality, and layout. Review important extracted values against the original document.' },
        { q: 'Can I use PDF to Excel on a phone?', a: 'Yes. The browser-based workflow can be accessed from supported mobile devices as well as desktop computers.' },
        { q: 'Is PDF to Excel free?', a: 'PDFilio provides the online tool; current usage limits, account requirements, and availability are determined by the product configuration shown in the tool interface.' },
        { q: 'What if my PDF is password protected?', a: 'Password-protected files may need to be unlocked with appropriate authorization before their contents can be processed.' },
      ]}
      primaryKeyword="convert PDF file to Excel"
      secondaryKeywords={[
        'PDF file to Excel online',
        'PDF to XLSX online',
        'PDF document to Excel',
        'turn PDF into Excel',
        'PDF spreadsheet converter',
        'PDF table to Excel',
      ]}
      schema={schema}
    />
  );
}
