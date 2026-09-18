import type { Metadata } from 'next'
import UnifiedToolsGrid from '@/components/unified-tools-grid'

export const metadata: Metadata = {
  title: 'PDF Tools – Free Online PDF Tools | PDFilio',
  description:
    'Explore PDFilio PDF tools for merging, splitting, compressing, converting, editing, OCR, signing, and managing PDF files online.',
  alternates: {
    canonical: 'https://pdfilio.com/tools',
  },
  openGraph: {
    title: 'PDF Tools – Free Online PDF Tools | PDFilio',
    description:
      'Explore PDFilio PDF tools for everyday PDF conversion, editing, organization, OCR, and document management.',
    url: 'https://pdfilio.com/tools',
    type: 'website',
  },
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">Home</a>
            <span className="mx-2">/</span>
            <span aria-current="page">PDF Tools</span>
          </nav>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            PDF Tools
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
            Use PDFilio&apos;s online PDF tools to merge, split, compress, convert,
            edit, OCR, sign, protect, and manage documents from your browser.
          </p>
        </div>
      </section>
      <UnifiedToolsGrid />
    </main>
  )
}
