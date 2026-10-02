import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'Batch PDF Conversion Online | Convert Multiple Files at Once | PDFilio',
  description: 'Batch PDF conversion landing page for converting multiple supported documents in one workflow. Save time when you have many files to process.',
  keywords: ['batch PDF conversion', 'batch converter', 'convert multiple PDF files', 'bulk PDF conversion', 'batch file conversion', 'convert multiple files online'],
  alternates: { canonical: 'https://pdfilio.com/batch-conversion' },
  openGraph: { title: 'Batch PDF Conversion Online | Convert Multiple Files | PDFilio', description: 'Process multiple supported document conversions in a batch workflow.', url: 'https://pdfilio.com/batch-conversion', type: 'website' },
}

export default function BatchConversionPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Batch PDF Conversion', description: 'Online batch conversion workflow for processing multiple supported document files.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web' }
  return (
    <ToolLandingLayout
      toolName="Batch PDF Conversion"
      toolSlug="tools"
      heroImage="/tool-images/batch-conversion-hero.png"
      description="Process multiple supported document conversions in a streamlined batch workflow instead of handling every file as a separate task."
      mainContent={`Batch PDF conversion is useful when you have a group of documents that need the same or related conversion workflow. Instead of repeating the same steps for every file, a batch workflow can help organize multiple files for processing.

## Convert Multiple Files More Efficiently

Batch conversion is designed around multi-file workflows. Select the supported files you need to process, choose the appropriate conversion workflow where available, and review the resulting files before using or sharing them.

## Useful for Repetitive Document Work

Batch processing can be helpful for office documents, project files, scanned documents, reports, images, and other supported file collections. The exact input and output formats depend on the conversion workflow available for the selected files.

## Review Batch Conversion Results

Conversion results can vary by source format, document structure, fonts, tables, images, and other content. Review the output files before relying on them for important work or distribution.`}
      useCase={'Convert multiple documents in a repetitive workflow\nProcess groups of supported files\nPrepare document collections for a project\nConvert office documents in batches\nProcess multiple PDFs or supported source files\nPrepare files for sharing or archiving\nReduce repetitive manual conversion steps\nOrganize larger document conversion jobs'}
      features={['Multi-file workflow', 'Batch-oriented document processing', 'Support for selected conversion formats', 'Streamlined repetitive workflows', 'Browser-based workflow', 'Output review guidance', 'Related PDF conversion tools', 'Separate file handling workflow']}
      benefits={['Reduce repetitive conversion steps', 'Work with groups of supported files', 'Keep document processing organized', 'Prepare multiple files for downstream workflows', 'Review outputs before sharing', 'Move between related PDF conversion tools']}
      howitworks={'1. Open the PDFilio tools area and choose the supported conversion workflow for your files.\n2. Select the files you need to process and use the available batch or multi-file options when supported.\n3. Review the generated files, filenames, formatting, and content before downloading or sharing them.'}
      faqs={[
        { q: 'What is batch PDF conversion?', a: 'Batch PDF conversion means processing multiple supported files as part of one organized conversion workflow rather than repeating the process manually for each file.' },
        { q: 'Can I convert multiple PDF files at once?', a: 'Multiple-file processing depends on the specific PDFilio conversion workflow and supported input format. Check the selected tool for its current file and usage options.' },
        { q: 'What file formats are supported?', a: 'Supported formats depend on the conversion tool you choose. PDFilio provides separate workflows for PDF, Office, image, and other supported document formats.' },
        { q: 'Is batch conversion useful for office documents?', a: 'Yes. Batch-style workflows can be useful when you have several supported Word, Excel, PowerPoint, or other documents that require repetitive conversion.' },
        { q: 'Can I batch convert PDFs to Word?', a: 'Use the PDF to Word workflow and check its current multi-file support and limits before processing a group of PDFs.' },
        { q: 'Can I batch convert images to PDF?', a: 'Image-to-PDF processing depends on the supported input and available multi-file options in the current PDFilio workflow.' },
        { q: 'Will formatting stay exactly the same?', a: 'Conversion fidelity depends on the source document and target format. Always review important files for text, tables, images, fonts, page breaks, and layout.' },
        { q: 'Can batch conversion save time?', a: 'Processing multiple files through an organized workflow can reduce repetitive manual steps when the selected tool supports multi-file processing.' },
        { q: 'Can I use batch conversion on mobile?', a: 'PDFilio tools are browser-based, but the available file-selection and processing experience can vary by device, browser, and file size.' },
        { q: 'Are there file or usage limits?', a: 'Limits can vary by tool and product configuration. Check the selected conversion workflow for the current limits before processing files.' },
        { q: 'Should I review files after batch conversion?', a: 'Yes. Review the generated files before sharing or relying on them, especially for business, academic, legal, or other important documents.' },
        { q: 'Where can I find the available PDF conversion tools?', a: 'Browse the PDFilio tools area to choose the conversion workflow that matches your input and output formats.' },
      ]}
      relatedTools={[{ name: 'PDF to Word', slug: 'pdf-to-word' }, { name: 'PDF to Excel', slug: 'pdf-to-excel' }, { name: 'Word to PDF', slug: 'word-to-pdf' }, { name: 'Excel to PDF', slug: 'excel-to-pdf' }, { name: 'PDF to JPG', slug: 'pdf-to-jpg' }, { name: 'JPG to PDF', slug: 'jpg-to-pdf' }]}
      primaryKeyword="batch PDF conversion"
      secondaryKeywords={['batch converter', 'convert multiple PDF files', 'bulk PDF conversion', 'batch file conversion', 'convert multiple files online']}
      schema={schema}
    />
  )
}