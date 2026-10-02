import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Word to PDF Online | Convert DOCX to PDF | PDFilio',
  description: 'Convert Word to PDF online and turn supported DOC and DOCX files into shareable PDF documents. Prepare resumes, reports, proposals, and other documents for submission or printing.',
  keywords: ['Word to PDF online','convert Word to PDF','DOCX to PDF','DOC to PDF','Word PDF converter','Word document to PDF','convert DOCX to PDF'],
  alternates: { canonical: 'https://pdfilio.com/word-to-pdf-online' },
  openGraph: { title: 'Word to PDF Online | Convert DOCX to PDF | PDFilio', description: 'Convert supported Word DOC and DOCX files into PDF documents online.', url: 'https://pdfilio.com/word-to-pdf-online', type: 'website' },
}

export default function WordToPdfOnlinePage() {
  const schema = { '@context':'https://schema.org', '@type':'SoftwareApplication', name:'Word to PDF Online', description:'Online workflow for converting supported Word documents into PDF files.', applicationCategory:'UtilitiesApplication', operatingSystem:'Web' }
  return <ToolLandingLayout
    toolName="Word to PDF Online" toolSlug="word-to-pdf" heroImage="/tool-images/word-to-pdf-hero.png"
    description="Convert supported Word DOC and DOCX files into PDF documents online for sharing, printing, submitting, and archiving."
    mainContent={`Word to PDF conversion turns a supported Word document into a PDF that is easier to share, print, submit, and distribute. It is useful for resumes, reports, proposals, contracts, forms, and other finalized documents.

## Convert Word to PDF Online

Upload a supported DOC or DOCX file, start the conversion, download the PDF, and review the result. The appearance of the PDF can depend on fonts, images, tables, page breaks, headers, footers, and other source-document formatting.

## DOCX to PDF Conversion

DOCX is a common Word document format. When converting DOCX to PDF, review page layout, text wrapping, tables, images, and pagination before sending an important document.

## Convert Word to PDF for Printing and Submission

PDF is often useful when a document needs to be shared or printed consistently across devices. Review the generated file before submitting applications, reports, proposals, or formal documents.

## Word to PDF Formatting

Exact visual preservation is not guaranteed for every source file. Keep the original Word document and compare the generated PDF when precise formatting, pagination, or document content matters.

## Review Before Sharing

Check names, dates, numbers, tables, images, page breaks, headers, footers, and other important information in the final PDF before distributing it.`}
    useCase={['Convert resumes to PDF','Prepare business reports','Create PDF proposals','Prepare contracts for sharing','Convert Word documents for printing','Submit documents in PDF format','Archive finalized Word documents','Share documents across devices'].join('\n')}
    features={['DOC and DOCX to PDF conversion','PDF document output','Browser-based workflow','Support for common Word documents','Desktop and mobile browser access','Downloadable PDF output','Simple upload and conversion process','Related PDF document tools']}
    benefits={['Create a shareable PDF from Word','Prepare documents for printing and submission','Reduce manual format-conversion work','Keep finalized documents in a common distribution format','Move Word files into PDF workflows','Make document sharing easier']}
    howitworks={'1. Open Word to PDF Online and upload a supported DOC or DOCX file.\n2. Start the conversion.\n3. Download the PDF and review its layout, content, tables, images, and page breaks before sharing.'}
    faqs={[
      { q:'How do I convert Word to PDF online?', a:'Upload a supported DOC or DOCX file to PDFilio, start the conversion, then download and review the generated PDF.' },
      { q:'Can I convert DOCX to PDF?', a:'Yes. Supported DOCX files can be converted into PDF documents through the Word to PDF workflow.' },
      { q:'Can I convert DOC to PDF?', a:'Yes, when DOC is listed as a supported input in the current uploader.' },
      { q:'Will Word formatting be preserved in PDF?', a:'The conversion aims to reproduce the source document, but exact preservation is not guaranteed for every file. Fonts, tables, images, and page layout can affect the result.' },
      { q:'Can I convert a resume to PDF?', a:'Yes. Converting a supported resume to PDF is a common use case for job applications and submissions.' },
      { q:'Can I convert a Word report to PDF?', a:'Yes. Supported Word reports can be converted to PDF for sharing, printing, review, or archiving.' },
      { q:'Can I convert Word documents with tables?', a:'Yes, supported documents with tables can be processed, but complex tables should be visually reviewed after conversion.' },
      { q:'Can I convert Word to PDF on my phone?', a:'The browser-based workflow can be accessed from supported phones, tablets, and desktop browsers.' },
      { q:'Do I need Microsoft Word installed?', a:'No separate Microsoft Word installation is required to use the online conversion workflow, provided the file is supported.' },
      { q:'How long does Word to PDF conversion take?', a:'Processing time depends on file size, page count, document complexity, and current system resources.' },
      { q:'Can I edit the PDF after converting Word to PDF?', a:'PDF is mainly used as a distribution format. For substantial future edits, keep the original Word document.' },
      { q:'Is Word to PDF free?', a:'Current usage limits and availability are determined by the product configuration shown in the PDFilio Word to PDF interface.' },
    ]}
    relatedTools={[{name:'PDF to Word',slug:'pdf-to-word'},{name:'Excel to PDF',slug:'excel-to-pdf'},{name:'Compress PDF',slug:'compress-pdf'},{name:'Merge PDF',slug:'merge-pdf'},{name:'PDF to JPG',slug:'pdf-to-jpg'}]}
    primaryKeyword="Word to PDF online"
    secondaryKeywords={['convert Word to PDF','DOCX to PDF','DOC to PDF','Word PDF converter','Word document to PDF','convert DOCX to PDF']}
    schema={schema}
  />
}