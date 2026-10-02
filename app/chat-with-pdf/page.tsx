import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, MessageCircle, Search, Sparkles } from 'lucide-react'

const SITE_URL = 'https://pdfilio.com'
const LANDING_URL = `${SITE_URL}/chat-with-pdf`

export const metadata: Metadata = {
  title: 'Chat with PDF Online | Ask Questions About PDF with AI',
  description: 'Chat with a PDF online using AI. Upload a supported PDF, ask questions, find information, and explore document content with PDFilio.',
  keywords: ['chat with PDF', 'chat with PDF online', 'AI chat with PDF', 'talk to a PDF', 'ask questions about PDF', 'PDF AI chat', 'PDF chatbot'],
  alternates: { canonical: LANDING_URL },
  openGraph: {
    type: 'website',
    url: LANDING_URL,
    title: 'Chat with PDF Online | Ask Questions About PDF with AI',
    description: 'Upload a supported PDF and ask questions about its content with PDFilio AI PDF Chat.',
    siteName: 'PDFilio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat with PDF Online | PDFilio',
    description: 'Ask questions about supported PDF documents and explore their content with AI.',
  },
}

const faqs = [
  ['What does chat with PDF mean?', 'Chat with PDF means interacting with a supported PDF by asking natural-language questions about its content instead of manually searching every page.'],
  ['Can I chat with a PDF online?', 'Yes. PDFilio provides an online PDF Chat workflow where you can add a supported PDF and ask questions about its content.'],
  ['Can I ask questions about a PDF?', 'Yes. You can ask focused questions about information contained in a supported PDF and continue with follow-up questions.'],
  ['Can Chat with PDF summarize a document?', 'You can ask questions that help you understand a document. PDFilio also provides dedicated AI document summarization tools for summary-focused workflows.'],
  ['Is Chat with PDF useful for research papers?', 'It can help you locate information, understand sections, and formulate follow-up questions while reviewing supported research papers. Important findings should still be checked against the original paper.'],
  ['Can I use Chat with PDF for business documents?', 'Yes. It can be useful for exploring supported reports, manuals, policies, proposals, and other workplace PDFs.'],
  ['Are AI answers always accurate?', 'No. AI-generated answers can contain errors or omit context. Verify important legal, financial, medical, academic, contractual, or business information against the original PDF.'],
  ['What PDFs are supported?', 'Support depends on PDFilio’s current processing workflow. Results can vary with file quality, text extraction, scanned pages, and document complexity.'],
]

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDFilio Chat with PDF',
  url: LANDING_URL,
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  description: 'Online AI-assisted PDF chat workflow for asking questions and exploring supported PDF documents.',
  isPartOf: { '@type': 'WebSite', name: 'PDFilio', url: SITE_URL },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'PDF Tools', item: `${SITE_URL}/tools` },
    { '@type': 'ListItem', position: 3, name: 'Chat with PDF', item: LANDING_URL },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function ChatWithPdfLandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav aria-label="Breadcrumb" className="border-b border-slate-100 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 text-sm text-slate-600">
          <Link href="/">Home</Link><span aria-hidden="true">/</span>
          <Link href="/tools">PDF Tools</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-slate-900">Chat with PDF</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" /> AI PDF Chat
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">Chat with PDF Online</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              Ask questions about a supported PDF, find information faster, and explore document content through a natural-language AI chat workflow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/pdf-chat" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3 font-bold text-white hover:bg-red-700">
                Chat with Your PDF <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-7 py-3 font-semibold text-white hover:bg-white/10">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            [FileText, 'Upload a supported PDF', 'Start with the document you want to explore.'],
            [MessageCircle, 'Ask natural-language questions', 'Ask focused questions instead of searching page by page.'],
            [Search, 'Find and understand information', 'Use answers as a starting point for deeper document review.'],
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <Icon className="h-7 w-7 text-red-600" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">{title as string}</h2>
              <p className="mt-2 leading-7 text-slate-600">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black sm:text-4xl">Chat with a PDF instead of searching every page</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
            <p>Long PDFs can contain the exact information you need, but finding it manually can take time. PDFilio’s Chat with PDF workflow lets you ask questions about supported PDF documents in ordinary language and continue with follow-up questions.</p>
            <p>Use it to explore research papers, study material, business reports, manuals, proposals, policies, and other supported documents. Ask for explanations, locate relevant information, and build an initial understanding before returning to the original source for detailed review.</p>
            <p>AI output should be treated as an assistance layer, not a replacement for the source document. For important legal, financial, medical, academic, contractual, or business information, verify the answer against the original PDF.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-black sm:text-4xl">How to Chat with a PDF</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ['1', 'Open PDF Chat', 'Open the PDFilio PDF Chat tool and prepare your supported PDF.'],
              ['2', 'Add your PDF', 'Upload or provide the supported document through the available workflow.'],
              ['3', 'Ask and review', 'Ask questions, use follow-ups, and check important answers against the source PDF.'],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-2xl border border-slate-200 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-black text-white">{number}</span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/pdf-chat" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-7 py-4 font-bold text-white hover:bg-red-700">Open PDF Chat <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-4 py-12 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black sm:text-4xl">Useful for many PDF workflows</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['Research papers and academic reading','Study notes and course material','Business reports and proposals','Policies, manuals, and procedures','Long documents and information lookup','Initial document review and question preparation'].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" /><span className="leading-7 text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black sm:text-4xl">Chat with PDF FAQs</h2>
          <div className="mt-8 space-y-4">
            {faqs.map(([q, a]) => (
              <details key={q} className="rounded-2xl border border-slate-200 bg-white p-5">
                <summary className="cursor-pointer list-none font-bold text-slate-900">{q}</summary>
                <p className="mt-3 leading-7 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-black sm:text-4xl">Related PDF tools</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['/ai-document-summarizer', 'AI Document Summarizer'],
              ['/ai-chat-scanned-pdf', 'Chat with Scanned PDF'],
              ['/ocr', 'PDF OCR'],
              ['/pdf-to-word', 'PDF to Word'],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-xl border border-slate-200 bg-white p-5 font-bold hover:border-slate-400">{label} <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" /></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-600 px-4 py-14 text-center text-white sm:px-6">
        <h2 className="text-3xl font-black sm:text-4xl">Ready to chat with your PDF?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-red-100">Open PDFilio PDF Chat and start exploring a supported document with questions and follow-ups.</p>
        <Link href="/pdf-chat" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-red-600 hover:bg-slate-50">Start Chat with PDF <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  )
}
