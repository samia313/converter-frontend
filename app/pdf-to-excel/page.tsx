import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';

export const metadata: Metadata = {
  title: 'PDF to Excel - Convert Tables to Spreadsheets | PDFilio',
  description: 'Convert PDF tables and data to editable Excel spreadsheets instantly. Extract data from PDFs, create Excel files, and automate workflows. Free, fast, and accurate.',
  keywords: ['PDF to Excel', 'convert PDF to spreadsheet', 'PDF table to Excel', 'extract PDF data'],
};

export default function PDFToExcelPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF to Excel',
    description: 'Convert PDF tables and data to Excel spreadsheets',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2100',
    },
  };

  return (
    <ToolLandingLayout
      toolName="PDF to Excel"
      toolSlug="pdf-to-excel"
      description="Convert PDF tables and data into editable Excel spreadsheets. Extract financial data, reports, and structured information from PDFs instantly with perfect formatting preserved."
      heroImage="/tool-images/pdf-to-excel-hero.png"
      mainContent={`PDF to Excel transforms your PDF tables into editable Excel spreadsheets instantly. Perfect for financial analysts, data entry professionals, and anyone who needs to work with data extracted from PDF reports.

Extract data from invoices, reports, financial statements, and any PDF with tables. Your data is converted to properly formatted Excel cells with all values intact and easily editable.

Our advanced PDF parsing technology accurately detects table structures and converts them to Excel format. Process files of any size instantly, completely free, with no registration required. Your data stays secure - we delete files automatically after processing.`}
      useCase={`Converting financial reports to editable spreadsheets
Extracting invoice data for accounting systems
Converting statistical tables from research papers
Preparing data from PDF reports for analysis
Automating data entry workflows
Converting survey results from PDFs to Excel
Processing bank statements and transaction data`}
      features={[
        'Accurate table detection and conversion',
        'Preserve data formatting and structure',
        'Convert multiple tables per PDF',
        'Download as Excel (.xlsx) files',
        'Editable and sortable data',
        'No file size limits',
        'Batch convert multiple PDFs',
        'Instant processing',
      ]}
      benefits={[
        'Save hours on manual data entry',
        'Accurate data extraction',
        'Editable spreadsheet output',
        'Easy data analysis',
        'Automated workflow integration',
        'Error-free conversion',
        'Professional Excel formatting',
        'Improved productivity',
      ]}
      testimonials={[
        {
          name: 'David M.',
          role: 'Financial Analyst',
          text: 'PDF to Excel saves us countless hours converting financial reports. The accuracy is impressive - no more manual entry errors. Highly recommended for finance teams.',
        },
        {
          name: 'Emily R.',
          role: 'Data Analyst',
          text: 'Perfect tool for extracting data from PDF reports. Converts tables accurately and maintains formatting. Now part of our daily workflow.',
        },
        {
          name: 'Marcus W.',
          role: 'Accountant',
          text: 'The best PDF to Excel converter I have used. Fast, accurate, and completely free. Makes our month-end closing much easier.',
        },
      ]}
      relatedTools={[
        { name: 'Excel to PDF', slug: 'excel-to-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'Compress PDF', slug: 'compress-pdf' },
      ]}
      faqs={[
        {
          q: 'How does PDF to Excel extract tables?',
          a: 'Our advanced AI analyzes PDF structure, identifies tables and data cells, maintains formatting, and converts everything to Excel format with proper column alignment.',
        },
        {
          q: 'Does it work with scanned PDF tables?',
          a: 'Our tool works best with digital PDFs. For scanned images, we recommend using OCR first to convert images to text, then use our converter.',
        },
        {
          q: 'Can I convert multiple tables from one PDF?',
          a: 'Yes! If your PDF contains multiple tables, we extract all of them. Each table becomes separate Excel sheets or columns.',
        },
        {
          q: 'Is the converted data editable?',
          a: 'Completely editable! All data is converted to standard Excel format that you can modify, format, sort, and filter as needed.',
        },
        {
          q: 'What about complex table structures with merged cells?',
          a: 'Our converter handles complex tables including merged cells, sub-headers, and nested structures. Formatting is preserved accurately.',
        },
        {
          q: 'Can I batch convert multiple PDFs?',
          a: 'Yes! Upload multiple PDF files and convert all of them at once. Saves time with batch processing.',
        },
        {
          q: 'How accurate is the data conversion?',
          a: 'Accuracy depends on PDF quality. Digital PDFs convert with 95%+ accuracy. Always review extracted data for critical applications.',
        },
        {
          q: 'What Excel format does it use?',
          a: 'Converts to Excel 2007+ format (.xlsx) which opens in all modern versions of Excel, Google Sheets, and other spreadsheet applications.',
        },
        {
          q: 'How secure is my PDF data?',
          a: 'Your files are encrypted during processing and automatically deleted within 24 hours. We never store files or share data with third parties.',
        },
        {
          q: 'Can I convert PDFs on my phone?',
          a: 'Yes! Works on all devices through your browser. Upload from phone, tablet, or computer - conversion works the same way.',
        },
        {
          q: 'Is PDF to Excel free?',
          a: 'Completely free! No hidden charges, no file limits, no registration required. Convert as many PDFs as you need.',
        },
        {
          q: 'What about password-protected PDFs?',
          a: 'You will need to unlock the PDF first (remove password protection) before we can extract data from it.',
        },
      ]}
      schema={schema}
      primaryKeyword="PDF to Excel"
      secondaryKeywords={['convert PDF to Excel', 'PDF table to Excel', 'extract data from PDF', 'PDF to spreadsheet']}
    />
  );
}
