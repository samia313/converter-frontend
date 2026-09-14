import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import { Shield, Lock, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PDFilio Security & Privacy – Secure PDF Processing',
  description: 'Learn how PDFilio handles document processing, privacy and security, including browser-based and server-side processing and our security practices.',
  alternates: { canonical: 'https://pdfilio.com/security' },
}

const securityFeatures = [
  { icon: Lock, title: 'Secure Processing', description: 'PDFilio uses browser-based and server-side processing depending on the tool. The applicable processing flow varies by feature.', details: ['Tool-specific processing', 'Secure HTTPS website connection', 'Processing designed around the requested task'] },
  { icon: FileText, title: 'Temporary Document Processing', description: 'Uploaded documents are processed to provide the requested result. PDFilio is not intended to operate as a permanent document-storage service.', details: ['Temporary processing where applicable', 'No permanent document-storage service', 'Keep your own backup of important files'] },
  { icon: Shield, title: 'Privacy-Conscious Processing', description: 'We do not use uploaded documents for unrelated purposes. Processing practices depend on the tool you choose.', details: ['Tool-specific data handling', 'Privacy policy explains applicable processing', 'Do not upload files you are not authorized to process'] },
  { icon: CheckCircle, title: 'AI Processing Transparency', description: 'Selected AI features may use third-party AI or infrastructure providers when required to provide the requested feature. Not every PDF tool uses AI.', details: ['AI processing is feature-specific', 'Third-party processing may apply to AI features', 'Review the Privacy Policy before using AI features'] },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6"><Shield className="w-16 h-16 text-red-600" aria-hidden="true" /></div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">PDFilio Security & Privacy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We aim to make PDF processing simple and privacy-conscious. Processing methods and retention practices can vary by tool.</p>
          </div>
        </section>
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => { const Icon = feature.icon; return (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4"><div className="bg-red-100 p-3 rounded-lg"><Icon className="w-8 h-8 text-red-600" aria-hidden="true" /></div><div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h2><p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">{feature.details.map((detail, idx) => <li key={idx} className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />{detail}</li>)}</ul>
                </div></div>
              </div>
            )})}
          </div>
        </section>
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto"><h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Security Approach</h2>
            <div className="prose prose-gray max-w-none text-gray-700 space-y-5">
              <p>PDFilio provides browser-based and server-side document processing depending on the tool. Because different tools use different processing architectures, we do not promise one universal retention period or processing method for every feature.</p>
              <p>We use reasonable technical and organizational measures appropriate to the service. No website, network transmission, or storage system can be guaranteed to be completely secure.</p>
              <p>We do not claim certifications such as ISO 27001 or SOC 2 Type II unless and until the applicable certification can be verified. We also avoid making unsupported claims about encryption, deletion times, or regulatory compliance.</p>
              <p>For full details of information that may be processed, analytics, advertising, AI features, retention practices, service providers, and applicable privacy rights, review our <Link href="/privacy" className="text-red-600 hover:text-red-700 underline font-medium">Privacy Policy</Link>.</p>
            </div>
          </div>
        </section>
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions about security or privacy?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Contact PDFilio if you have a question about document processing, privacy practices, or a privacy request.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4"><Link href="/contact" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">Contact PDFilio</Link><Link href="/privacy" className="inline-block border border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">Read Privacy Policy</Link></div>
        </section>
      </main>
    </div>
  )
}
