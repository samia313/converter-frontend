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
    features: ['Preserve original formatting and layout','Support for scanned PDFs','Maintain tables and images','Fast processing','Secure processing','Works across modern browsers'],
    benefits: ['Edit PDF content in Word','Save time with automatic conversion','Compatible with Microsoft Office','Works on desktop and mobile browsers','Privacy-focused processing'],
    steps: ['Upload your PDF file','Click Convert','Download your Word document','Edit the document in Word'],
    faqs: [
      { q: 'Is my PDF safe when converting?', a: 'PDFilio is designed with privacy-focused document processing. Review the Privacy Policy for current data-handling details.' },
      { q: 'Can I convert scanned PDFs?', a: 'Scanned PDFs may require OCR. Availability depends on the selected conversion workflow.' },
      { q: 'Does conversion preserve formatting?', a: 'The converter aims to preserve the source layout, fonts, tables, and images as closely as the source allows.' },
      { q: 'Do I need to install software?', a: 'No desktop installation is required; the tool runs in a modern web browser.' },
      { q: 'How long does conversion take?', a: 'Processing time depends on file size, complexity, and current server load.' },
    ],
    metaDescription: 'Convert PDF to Word online with PDFilio. Turn PDF files into editable Word documents while keeping the original layout as closely as possible.',
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter - Convert DOCX to PDF Online',
    description: 'Convert Word documents to PDF online for easy sharing, printing, and consistent formatting.',
    features: ['Convert DOC and DOCX files','Preserve document structure','Browser-based workflow','Fast processing','Mobile-friendly interface','Privacy-focused processing'],
    benefits: ['Create shareable PDF files','Keep formatting consistent across devices','Prepare documents for printing','No desktop software required'],
    steps: ['Upload your Word document','Start the conversion','Wait for processing to finish','Download your PDF'],
    faqs: [
      { q: 'Can I convert DOCX to PDF online?', a: 'Yes. Upload a supported Word document and use the conversion workflow.' },
      { q: 'Will my Word formatting be preserved?', a: 'The converter aims to preserve the source document structure and formatting as closely as the source allows.' },
      { q: 'Do I need Microsoft Word installed?', a: 'No. The conversion workflow runs in your web browser.' },
      { q: 'Can I use the tool on mobile?', a: 'The page is designed to work in modern mobile browsers.' },
    ],
    metaDescription: 'Convert DOC or DOCX to PDF online with PDFilio. Create shareable PDF documents from Word files in your browser.',
  },
  'merge-pdf': {
    title: 'Merge PDF - Combine PDF Files Online',
    description: 'Combine multiple PDF files into one organized document with a simple browser-based workflow.',
    features: ['Combine multiple PDF files','Organize files before merging','Browser-based processing','Simple workflow','Mobile-friendly interface','Privacy-focused processing'],
    benefits: ['Create one complete document','Reduce file clutter','Prepare documents for sharing','Keep related pages together'],
    steps: ['Select the PDF files','Arrange them in the desired order','Start merging','Download the combined PDF'],
    faqs: [
      { q: 'Can I combine multiple PDFs?', a: 'Yes. Select the PDF files you want to combine and arrange them before starting the merge.' },
      { q: 'Can I control the order?', a: 'The workflow is designed to let you organize selected files before merging.' },
      { q: 'Does merging change the original files?', a: 'The merge creates a new combined document; your original local files are not edited by the browser interface.' },
      { q: 'Can I merge PDFs on my phone?', a: 'You can use the tool from a modern mobile browser.' },
    ],
    metaDescription: 'Merge PDF files online with PDFilio. Combine multiple PDFs into one organized document quickly from your browser.',
  },
  'split-pdf': {
    title: 'Split PDF - Separate PDF Pages Online',
    description: 'Split PDF documents into separate pages or sections using an easy online workflow.',
    features: ['Separate PDF pages','Choose page ranges','Create smaller documents','Browser-based workflow','Simple interface','Mobile-friendly'],
    benefits: ['Extract only the pages you need','Create focused documents','Reduce unnecessary pages','Prepare files for sharing'],
    steps: ['Upload the PDF','Choose pages or ranges','Start splitting','Download the resulting PDF files'],
    faqs: [
      { q: 'Can I split a PDF by page range?', a: 'The workflow supports selecting pages or ranges according to the available conversion controls.' },
      { q: 'Will the original PDF be changed?', a: 'The split workflow creates output files rather than editing your original local file.' },
      { q: 'Can I split a large PDF?', a: 'Processing depends on the file size and current service limits.' },
    ],
    metaDescription: 'Split PDF pages online with PDFilio. Separate a PDF into pages or sections and create smaller documents.',
  },
  'compress-pdf': {
    title: 'Compress PDF - Reduce PDF File Size Online',
    description: 'Reduce PDF file size online while aiming to keep documents readable and useful.',
    features: ['Reduce PDF file size','Browser-based workflow','Simple compression process','Mobile-friendly interface','Fast processing','Privacy-focused processing'],
    benefits: ['Make PDFs easier to upload','Save storage space','Share smaller documents','Prepare files for email and web uploads'],
    steps: ['Upload your PDF','Choose the available compression option','Start compression','Download the smaller PDF'],
    faqs: [
      { q: 'How much can a PDF be compressed?', a: 'The reduction depends on the original PDF, embedded images, fonts, and other content.' },
      { q: 'Will compression reduce quality?', a: 'Compression can involve trade-offs between file size and quality; results depend on the source document and selected settings.' },
      { q: 'Can I compress a PDF on mobile?', a: 'Yes, the workflow can be accessed through a modern mobile browser.' },
    ],
    metaDescription: 'Compress PDF online with PDFilio to reduce file size for sharing, uploads, storage, and email.',
  },
  'ocr-pdf': {
    title: 'OCR PDF - Extract Text from Scanned PDF Files',
    description: 'Use OCR workflows to turn text in scanned PDF documents into searchable or usable text when supported.',
    features: ['Recognize text in scanned documents','Create searchable text workflows','Browser-based processing','Useful for document archives','Simple upload workflow','Privacy-focused processing'],
    benefits: ['Make scanned documents easier to search','Reuse text from scans','Improve document accessibility','Reduce manual transcription'],
    steps: ['Upload the scanned PDF','Start OCR processing','Review the recognized text or output','Download the result when available'],
    faqs: [
      { q: 'What is OCR?', a: 'OCR, or optical character recognition, identifies text within images or scanned documents so it can be processed as text.' },
      { q: 'Does OCR work on every scan?', a: 'Results depend on scan quality, language, fonts, layout, and document complexity.' },
      { q: 'Can OCR make a PDF searchable?', a: 'OCR can add a text recognition layer when the selected workflow supports searchable output.' },
    ],
    metaDescription: 'OCR scanned PDFs online with PDFilio. Extract recognizable text from scanned documents and make document workflows easier.',
  },
  'pdf-editor': {
    title: 'PDF Editor - Edit and Annotate PDF Online',
    description: 'Edit and annotate PDF documents online using practical browser-based document tools.',
    features: ['Edit supported PDF content','Annotate documents','Browser-based workflow','Simple interface','Mobile-friendly design','Privacy-focused processing'],
    benefits: ['Make quick document changes','Add useful annotations','Prepare PDFs for sharing','Work without desktop installation'],
    steps: ['Upload your PDF','Choose an editing or annotation action','Apply your changes','Export or download the result'],
    faqs: [
      { q: 'Can I edit PDF files online?', a: 'PDFilio provides browser-based PDF editing workflows for supported document operations.' },
      { q: 'Do I need to install an editor?', a: 'No desktop installation is required for the web workflow.' },
      { q: 'Are all PDF elements editable?', a: 'Editability depends on the PDF structure and the specific editing operation supported by the tool.' },
    ],
    metaDescription: 'Edit PDF files online with PDFilio. Make supported changes and annotations in your browser without desktop software.',
  },
  'protect-pdf': {
    title: 'Protect PDF - Secure PDF Files Online',
    description: 'Protect PDF documents using available password and security options in a browser-based workflow.',
    features: ['Apply supported PDF security options','Password-based protection where supported','Browser-based workflow','Simple interface','Mobile-friendly','Clear privacy information'],
    benefits: ['Add a layer of document protection','Prepare files for controlled sharing','Reduce accidental access','Manage PDF security from a browser'],
    steps: ['Upload the PDF','Choose the available protection option','Set the required security details','Create and download the protected PDF'],
    faqs: [
      { q: 'Can I password protect a PDF?', a: 'Use the available protection workflow to apply supported PDF password and security settings.' },
      { q: 'Should I keep a copy of my password?', a: 'Yes. Keep passwords in a secure place because protected files may not be recoverable if credentials are lost.' },
      { q: 'Can I protect a PDF on mobile?', a: 'The web workflow is designed for modern desktop and mobile browsers.' },
    ],
    metaDescription: 'Protect PDF files online with PDFilio. Apply supported password and security options to help control document access.',
  },
  'unlock-pdf': {
    title: 'Unlock PDF - Remove PDF Restrictions When Authorized',
    description: 'Unlock PDF documents when you have the required password or authorization to remove their restrictions.',
    features: ['Process authorized PDF files','Browser-based workflow','Simple upload process','Clear security-focused guidance','Mobile-friendly interface','Privacy-focused processing'],
    benefits: ['Work with PDFs you are authorized to modify','Remove supported restrictions','Prepare documents for further editing','Avoid unnecessary desktop software'],
    steps: ['Upload the authorized PDF','Provide required credentials if requested','Start the unlock workflow','Download the resulting PDF'],
    faqs: [
      { q: 'Can I unlock a PDF without authorization?', a: 'You should only remove PDF protections when you have the right or authorization to do so.' },
      { q: 'What if the PDF requires a password?', a: 'Provide the required password when the workflow requests it; the tool should not be used to bypass access controls you are not authorized to bypass.' },
      { q: 'Will unlocking change the document?', a: 'The resulting file can differ internally depending on the protection method and processing workflow.' },
    ],
    metaDescription: 'Unlock authorized PDF files online with PDFilio. Remove supported PDF restrictions when you have the required credentials or permission.',
  },
  'rotate-pdf': {
    title: 'Rotate PDF - Rotate PDF Pages Online',
    description: 'Rotate PDF pages to the correct orientation using a simple online browser workflow.',
    features: ['Rotate PDF pages','Correct page orientation','Browser-based processing','Simple workflow','Mobile-friendly interface','Fast document handling'],
    benefits: ['Fix sideways or upside-down pages','Prepare documents for reading','Improve print orientation','Create cleaner document sets'],
    steps: ['Upload the PDF','Choose the page rotation','Apply the rotation','Download the corrected PDF'],
    faqs: [
      { q: 'Can I rotate individual PDF pages?', a: 'Page-level rotation depends on the controls available in the current tool workflow.' },
      { q: 'Will rotating pages reduce quality?', a: 'Rotation normally changes page orientation rather than intentionally reducing content quality, although output processing can vary.' },
      { q: 'Can I rotate PDFs on my phone?', a: 'Yes, you can access the tool from a modern mobile browser.' },
    ],
    metaDescription: 'Rotate PDF pages online with PDFilio. Fix sideways or upside-down pages and create a correctly oriented PDF.',
  },
} as const

type ToolSlug = keyof typeof toolData
export function generateStaticParams() { return Object.keys(toolData).map((slug) => ({ slug })) }
export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = toolData[params.slug as ToolSlug]
  if (!tool) return { title: 'Tool Not Found | PDFilio', robots: { index: false, follow: false } }
  return { title: tool.title, description: tool.metaDescription, keywords: seoKeywords.toolLinks[params.slug as keyof typeof seoKeywords.toolLinks]?.keywords, alternates: { canonical: `https://pdfilio.com/tools/${params.slug}` }, openGraph: { title: tool.title, description: tool.metaDescription, url: `https://pdfilio.com/tools/${params.slug}`, type: 'website' } }
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = toolData[params.slug as ToolSlug]
  if (!tool) notFound()
  const relatedTools = getRelatedTools(params.slug)
  return <main className="min-h-screen bg-white">
    <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"><div className="max-w-4xl mx-auto"><Link href="/tools" className="text-red-400 hover:text-red-300 text-sm font-semibold flex items-center gap-2 mb-6">All PDF Tools <ChevronRight className="w-4 h-4" /></Link><h1 className="text-4xl sm:text-5xl font-black mb-4">{tool.title}</h1><p className="text-xl text-gray-300">{tool.description}</p></div></section>
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
