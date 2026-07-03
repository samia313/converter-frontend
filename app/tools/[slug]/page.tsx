'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { getRelatedTools, seoKeywords } from '@/lib/seo-keywords'
import { ChevronRight, Check, Shield, Zap, Lock } from 'lucide-react'

interface ToolPageProps {
  params: {
    slug: string
  }
}

const toolData: Record<string, {
  title: string
  description: string
  category: string
  features: string[]
  benefits: string[]
  steps: string[]
  faqs: Array<{ q: string; a: string }>
  metaDescription: string
  keywords: string[]
}> = {
  'pdf-to-word': {
    title: 'PDF to Word Converter - Convert PDF to Editable Word Documents',
    description: 'Convert PDF files to editable Word documents online. Preserve formatting, maintain quality, and process documents securely. No installation required.',
    category: 'Conversion',
    features: [
      'Preserve original formatting and layout',
      'Support for scanned PDFs',
      'Maintain tables and images',
      'Fast processing (under 2 minutes)',
      'Secure encryption during processing',
      'No file size limitations',
    ],
    benefits: [
      'Edit PDF content easily in Word',
      'Save time with automatic formatting',
      'Compatible with Microsoft Office',
      'Works on all devices and browsers',
      'Enterprise-grade security',
      'Privacy-focused with auto-delete',
    ],
    steps: [
      'Upload your PDF file',
      'Click Convert button',
      'Download your Word document',
      'Start editing in Microsoft Word',
    ],
    faqs: [
      {
        q: 'Is my PDF safe when converting?',
        a: 'Yes, all files are encrypted and automatically deleted after 24 hours. We use enterprise-grade security.',
      },
      {
        q: 'Can I convert scanned PDFs?',
        a: 'Yes! Our AI-powered OCR technology converts scanned images to editable text.',
      },
      {
        q: 'Does conversion preserve formatting?',
        a: 'Absolutely. We maintain fonts, colors, tables, images, and layout exactly as in the original PDF.',
      },
      {
        q: 'Are there file size limits?',
        a: 'No limits! Convert files of any size for free.',
      },
      {
        q: 'How long does conversion take?',
        a: 'Most files convert within seconds to 2 minutes depending on file size.',
      },
    ],
    metaDescription: 'Convert PDF to Word online for free. Preserve formatting and edit PDFs easily. No sign-up required. Fast, secure, and reliable.',
    keywords: [
      'PDF to Word',
      'Convert PDF to Word',
      'PDF to Doc',
      'PDF to Docx',
      'Extract PDF to Word',
      'Best PDF to Word converter',
    ],
  },
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = toolData[params.slug] || toolData['pdf-to-word']
  const relatedTools = getRelatedTools(params.slug)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-red-400 hover:text-red-300 text-sm font-semibold flex items-center gap-2">
              Back to Home <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{tool.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{tool.description}</p>
          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-white transition-colors">
            Open {tool.category} Tool
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tool.features.map((feature, i) => (
              <div key={i} className="flex gap-4">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tool.benefits.map((benefit, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="font-semibold text-gray-900">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8">How to Use</h2>
          <div className="space-y-4">
            {tool.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-700 pt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {tool.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-black mb-8">Related Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2 text-red-600">{tool.name}</h3>
                  <p className="text-gray-700 text-sm">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Trust Section */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-black mb-6">Why Trust PDFilio?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Enterprise Security</h3>
                <p className="text-sm text-gray-600">AES-256 encryption for all files</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Lightning Fast</h3>
                <p className="text-sm text-gray-600">Process files in seconds</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Lock className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Privacy First</h3>
                <p className="text-sm text-gray-600">Auto-delete after 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Ready to Convert Your PDFs?</h2>
          <p className="text-lg mb-8">Start converting PDFs for free. No sign-up required.</p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </section>
    </main>
  )
}
