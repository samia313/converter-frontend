import type { Metadata } from 'next'
import UnifiedToolsGrid from '@/components/unified-tools-grid'

export const metadata: Metadata = {
  title: 'PDF Tools – Free Online PDF Tools',
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
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Popular PDF workflows</h2>
          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Choose a focused PDF workflow for common document tasks, from conversion and OCR to file-size reduction and page management.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a href="/pdf-to-word" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Convert PDF to Word</a>
            <a href="/pdf-to-excel" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Convert PDF to Excel</a>
            <a href="/word-to-pdf" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Convert Word to PDF</a>
            <a href="/ocr" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Extract text with OCR</a>
            <a href="/compress-pdf" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Compress PDF files</a>
            <a href="/merge-pdf" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Merge PDF files</a>
            <a href="/split-pdf" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Split PDF files</a>
            <a href="/jpg-to-pdf" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Convert JPG to PDF</a>
            <a href="/pdf-to-jpg" className="rounded-lg border border-gray-200 bg-white p-4 font-semibold text-gray-900 hover:border-gray-400">Convert PDF to JPG</a>
          </div>
        </div>
      </section>
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">PDF tools by task</h2>
          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Start with the workflow that matches your document goal, then use the related guide for step-by-step help.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div><h3 className="font-bold text-gray-900">Convert and export</h3><p className="mt-2 text-sm leading-6 text-gray-600">Turn PDFs into editable Office or image files, or create PDFs from common formats.</p><div className="mt-3 space-y-2 text-sm"><a href="/pdf-to-word" className="block font-semibold text-gray-900 hover:underline">PDF to Word</a><a href="/pdf-to-excel" className="block font-semibold text-gray-900 hover:underline">PDF to Excel</a><a href="/word-to-pdf" className="block font-semibold text-gray-900 hover:underline">Word to PDF</a><a href="/jpg-to-pdf" className="block font-semibold text-gray-900 hover:underline">JPG to PDF</a></div></div>
            <div><h3 className="font-bold text-gray-900">Organize and reduce</h3><p className="mt-2 text-sm leading-6 text-gray-600">Manage pages, combine documents, split files, or reduce file size before sharing.</p><div className="mt-3 space-y-2 text-sm"><a href="/merge-pdf" className="block font-semibold text-gray-900 hover:underline">Merge PDF</a><a href="/split-pdf" className="block font-semibold text-gray-900 hover:underline">Split PDF</a><a href="/compress-pdf" className="block font-semibold text-gray-900 hover:underline">Compress PDF</a><a href="/organize-pdf" className="block font-semibold text-gray-900 hover:underline">Organize PDF</a></div></div>
            <div><h3 className="font-bold text-gray-900">Extract and work with text</h3><p className="mt-2 text-sm leading-6 text-gray-600">Make scanned documents searchable or continue working with extracted document content.</p><div className="mt-3 space-y-2 text-sm"><a href="/ocr" className="block font-semibold text-gray-900 hover:underline">OCR PDF</a><a href="/ai-summary" className="block font-semibold text-gray-900 hover:underline">AI PDF Summary</a><a href="/translate-pdf-online" className="block font-semibold text-gray-900 hover:underline">Translate PDF</a><a href="/ai-document-chat-tool" className="block font-semibold text-gray-900 hover:underline">Chat with a document</a></div></div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-900">Need instructions?</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">Browse PDFilio&apos;s how-to guides for practical instructions and workflow tips.</p>
            <a href="/guides" className="mt-3 inline-block font-semibold text-gray-900 hover:underline">Browse all PDF how-to guides →</a>
          </div>
        </div>
      </section>
    </main>
  )
}
