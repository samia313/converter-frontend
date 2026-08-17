import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import { FileText, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About PDFilio | Online PDF Tools',
  description: 'Learn about PDFilio, an online toolkit for practical PDF and document workflows.',
  alternates: { canonical: 'https://pdfilio.com/about' },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="text-5xl font-black text-gray-900">About PDFilio</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-600">
            PDFilio is an online toolkit built to make common PDF and document tasks easier, faster, and more accessible.
          </p>
        </section>
        <section className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-7">
            <FileText className="mb-4 h-10 w-10 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Practical PDF tools</h2>
            <p className="mt-3 text-gray-600">Tools for everyday document conversion, organization, compression, editing, and other PDF workflows.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-7">
            <ShieldCheck className="mb-4 h-10 w-10 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Privacy focused</h2>
            <p className="mt-3 text-gray-600">We aim to provide clear information about document processing, data handling, and service privacy.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-7">
            <Sparkles className="mb-4 h-10 w-10 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">AI-assisted workflows</h2>
            <p className="mt-3 text-gray-600">Selected PDFilio features use AI to help users understand and work with documents more efficiently.</p>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900">Our approach</h2>
          <p className="mt-5 text-lg leading-8 text-gray-600">
            We focus on useful tools, straightforward interfaces, reliable processing, and helpful guidance. PDFilio is continuously improved based on product testing and user needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/privacy" className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white">Privacy Policy <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900">Contact Us <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </div>
  )
}
