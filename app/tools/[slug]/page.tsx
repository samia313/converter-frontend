import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRelatedTools, seoKeywords } from '@/lib/seo-keywords'
import { ChevronRight, Check, Shield, Zap, Lock } from 'lucide-react'

interface ToolPageProps { params: { slug: string } }

const toolData = {
  'pdf-to-word': {
    title: 'PDF to Word Converter - Convert PDF to Editable Word Documents',
    description: 'Convert PDF files to editable Word documents online. Preserve formatting and process documents securely.',
    category: 'Conversion',
    features: ['Preserve original formatting and layout', 'Support for scanned PDFs', 'Maintain tables and images', 'Fast processing', 'Secure processing', 'Works across modern browsers'],
    benefits: ['Edit PDF content in Word', 'Save time with automatic conversion', 'Compatible with Microsoft Office', 'Works on desktop and mobile browsers', 'Privacy-focused processing'],
    steps: ['Upload your PDF file', 'Click Convert', 'Download your Word document', 'Edit the document in Word'],
    faqs: [
      { q: 'Is my PDF safe when converting?', a: 'PDFilio is designed with privacy-focused document processing. Review our Privacy Policy for current data-handling details.' },
      { q: 'Can I convert scanned PDFs?', a: 'Scanned PDFs may require OCR. Availability depends on the selected conversion workflow.' },
      { q: 'Does conversion preserve formatting?', a: 'The converter aims to preserve the source layout, fonts, tables, and images as closely as the source allows.' },
      { q: 'Do I need to install software?', a: 'No desktop installation is required; the tool runs in a modern web browser.' },
      { q: 'How long does conversion take?', a: 'Processing time depends on file size, complexity, and current server load.' },
    ],
    metaDescription: 'Convert PDF to Word online with PDFilio. Turn PDF files into editable Word documents while keeping the original layout as closely as possible.',
  },
} as const

type ToolSlug = keyof typeof toolData

export function generateStaticParams() { return Object.keys(toolData).map((slug) => ({ slug })) }

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = toolData[params.slug as ToolSlug]
  if (!tool) return { title: 'Tool Not Found | PDFilio', robots: { index: false, follow: false } }
  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: { canonical: `https://pdfilio.com/tools/${params.slug}` },
    openGraph: { title: tool.title, description: tool.metaDescription, url: `https://pdfilio.com/tools/${params.slug}`, type: 'website' },
  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = toolData[params.slug as ToolSlug]
  if (!tool) notFound()
  const relatedTools = getRelatedTools(params.slug)

  return <main className="min-h-screen bg-white">
    <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="text-red-400 hover:text-red-300 text-sm font-semibold flex items-center gap-2 mb-6">All PDF Tools <ChevronRight className="w-4 h-4" /></Link>
        <h1 className="text-4xl sm:text-5xl font-black mb-4">{tool.title}</h1>
        <p className="text-xl text-gray-300">{tool.description}</p>
      </div>
    </section>
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-16"><h2 className="text-3xl font-black mb-8">Key Features</h2><div className="grid md:grid-cols-2 gap-6">{tool.features.map((feature) => <div key={feature} className="flex gap-4"><Check className="w-6 h-6 text-green-600 flex-shrink-0" /><p className="text-gray-700">{feature}</p></div>)}</div></div>
      <div className="mb-16"><h2 className="text-3xl font-black mb-8">Benefits</h2><div className="grid md:grid-cols-2 gap-6">{tool.benefits.map((benefit) => <div key={benefit} className="bg-blue-50 p-4 rounded-lg border border-blue-200"><p className="font-semibold text-gray-900">{benefit}</p></div>)}</div></div>
      <div className="mb-16"><h2 className="text-3xl font-black mb-8">How to Use</h2><div className="space-y-4">{tool.steps.map((step, i) => <div key={step} className="flex gap-4"><div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">{i + 1}</div><p className="text-gray-700 pt-2">{step}</p></div>)}</div></div>
      <div className="mb-16"><h2 className="text-3xl font-black mb-8">Frequently Asked Questions</h2><div className="space-y-6">{tool.faqs.map((faq) => <div key={faq.q}><h3 className="font-bold text-lg mb-2 text-gray-900">{faq.q}</h3><p className="text-gray-700">{faq.a}</p></div>)}</div></div>
      {relatedTools.length > 0 && <div className="mb-16"><h2 className="text-3xl font-black mb-8">Related Tools</h2><div className="grid md:grid-cols-2 gap-6">{relatedTools.map((related) => <Link key={related.slug} href={`/tools/${related.slug}`} className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"><h3 className="font-bold text-lg mb-2 text-red-600">{related.name}</h3><p className="text-gray-700 text-sm">{related.description}</p></Link>)}</div></div>}
      <div className="bg-gray-50 p-8 rounded-lg"><h2 className="text-2xl font-black mb-6">Why PDFilio?</h2><div className="grid md:grid-cols-3 gap-6"><div className="flex gap-4"><Shield className="w-6 h-6 text-green-600 flex-shrink-0" /><div><h3 className="font-bold mb-1">Privacy Focused</h3><p className="text-sm text-gray-600">Clear information about document handling.</p></div></div><div className="flex gap-4"><Zap className="w-6 h-6 text-blue-600 flex-shrink-0" /><div><h3 className="font-bold mb-1">Easy to Use</h3><p className="text-sm text-gray-600">Simple browser-based document workflows.</p></div></div><div className="flex gap-4"><Lock className="w-6 h-6 text-purple-600 flex-shrink-0" /><div><h3 className="font-bold mb-1">Document Tools</h3><p className="text-sm text-gray-600">Practical tools for everyday PDF tasks.</p></div></div></div></div>
    </section>
  </main>
}
