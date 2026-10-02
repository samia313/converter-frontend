import type { Metadata } from 'next'
import ToolLandingLayout from '@/components/tool-landing-layout'

export const metadata: Metadata = {
  title: 'PDF Metadata Editor Online | Edit PDF Properties | PDFilio',
  description: 'Edit PDF metadata online, including title, author, subject, keywords, creator, and producer. Create a separate PDF with updated document properties.',
  keywords: ['PDF metadata editor', 'edit PDF metadata', 'PDF properties editor', 'PDF title editor', 'PDF author editor', 'edit PDF properties online'],
  alternates: { canonical: 'https://pdfilio.com/pdf-metadata-editor' },
  openGraph: {
    title: 'PDF Metadata Editor Online | PDFilio',
    description: 'Edit common PDF document properties online.',
    url: 'https://pdfilio.com/pdf-metadata-editor',
    type: 'website',
  },
}

export default function PdfMetadataEditorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'PDF Metadata Editor',
    description: 'Online tool for editing common PDF metadata and document properties.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
  }

  return (
    <ToolLandingLayout
      toolName="PDF Metadata Editor"
      toolSlug="pdf-metadata-editor"
      description="Edit common PDF properties such as title, author, subject, keywords, creator, and producer, then create a separate output PDF."
      mainContent={`PDF metadata contains document properties that help identify and organize a PDF. PDF Metadata Editor lets you update common metadata fields without intentionally changing the visible page content and layout.

## How to Edit PDF Metadata

Open a supported PDF, update fields such as title, author, subject, keywords, creator, or producer, and create a new PDF with the updated properties. Keep your original file if you need an unchanged source copy.

## Update PDF Properties for Organization

Correct outdated author information, add useful keywords, standardize document titles, or prepare a PDF for publishing and document management. Metadata can make files easier to identify and organize.

## Review Your PDF After Editing

Metadata editing is different from removing all hidden information from a PDF. Check the resulting file and do not treat standard metadata editing as a complete privacy or sanitization process.`}
      useCase={[
        'Edit PDF title and author',
        'Update PDF subject',
        'Add PDF keywords',
        'Correct document properties',
        'Prepare PDFs for publishing',
        'Standardize business documents',
        'Organize research PDFs',
        'Create a metadata-clean copy',
      ].join('\n')}
      features={[
        'Title and author metadata editing',
        'Subject and keyword fields',
        'Creator and producer fields',
        'Separate output PDF',
        'Browser-based workflow',
        'Original file preservation workflow',
        'Document property organization',
        'Metadata review guidance',
      ]}
      benefits={[
        'Correct outdated PDF properties',
        'Organize document information',
        'Add useful PDF keywords',
        'Prepare files for sharing or publishing',
        'Update metadata without rewriting visible content',
        'Keep an unchanged source copy available',
      ]}
      faqs={[
        { q: 'What is a PDF metadata editor?', a: 'A PDF metadata editor lets you update document properties such as title, author, subject, keywords, creator, and producer.' },
        { q: 'What PDF metadata can I edit?', a: 'The supported fields include title, author, subject, keywords, creator, and producer.' },
        { q: 'Does editing metadata change the visible PDF?', a: 'The metadata workflow is intended to update document properties rather than rewrite visible page text or layout.' },
        { q: 'Will my original PDF be changed?', a: 'The PDFilio metadata workflow creates a separate output PDF, so you can retain the original source file.' },
        { q: 'Can I remove PDF metadata?', a: 'Common metadata fields can be cleared by leaving supported fields blank. This is not the same as removing every type of hidden information.' },
        { q: 'Can I edit the PDF title and author?', a: 'Yes. Title and author are among the common metadata properties supported by the workflow.' },
        { q: 'Can I add keywords to a PDF?', a: 'Yes. You can add keywords to the supported PDF keywords field for document organization.' },
        { q: 'Can I edit PDF metadata on a phone?', a: 'The browser-based workflow can be used on supported mobile and desktop browsers.' },
        { q: 'Can encrypted PDFs be edited?', a: 'Encrypted or otherwise unsupported PDFs may not work with the metadata editing workflow.' },
        { q: 'Does metadata editing remove hidden information?', a: 'No. Standard metadata editing only changes the supported document properties. It should not be treated as a complete privacy scrubber.' },
        { q: 'Can I edit PDF properties without changing the content?', a: 'The purpose of the metadata workflow is to update document properties while leaving visible page content and layout unchanged.' },
        { q: 'Is PDF Metadata Editor free?', a: 'Current pricing, usage limits, and available features depend on the product configuration shown by PDFilio.' },
      ]}
      relatedTools={[
        { name: 'PDF Metadata', slug: 'pdf-metadata' },
        { name: 'Edit PDF', slug: 'edit-pdf' },
        { name: 'Protect PDF', slug: 'protect-pdf' },
        { name: 'Flatten PDF', slug: 'flatten-pdf' },
      ]}
      primaryKeyword="PDF metadata editor"
      secondaryKeywords={['edit PDF metadata', 'PDF properties editor', 'PDF title editor', 'PDF author editor', 'edit PDF properties online']}
      schema={schema}
    />
  )
}
