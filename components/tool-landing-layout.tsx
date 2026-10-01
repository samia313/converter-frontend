'use client';

import { ChevronRight, Star, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { getRelatedTools } from '@/lib/seo-keywords';

interface ToolLandingLayoutProps {
  toolName: string;
  toolSlug: string;
  description: string;
  features: string[];
  benefits: string[];
  faqs: Array<{ q: string; a: string }>;
  relatedTools: Array<{ name: string; slug: string }>;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroImage?: string;
  useCase?: string;
  mainContent?: string;
  howitworks?: string;
  testimonials?: Array<{ name: string; text: string; role?: string }>;
  schema?: Record<string, any>;
}

function getRelatedToolAnchor(name: string, slug: string): string {
  const anchors: Record<string, string> = {
    'pdf-to-word': 'Convert PDF to Word',
    'word-to-pdf': 'Convert Word to PDF',
    'pdf-to-excel': 'Convert PDF to Excel',
    'excel-to-pdf': 'Convert Excel to PDF',
    'pdf-to-powerpoint': 'Convert PDF to PowerPoint',
    'powerpoint-to-pdf': 'Convert PowerPoint to PDF',
    'pdf-to-jpg': 'Convert PDF to JPG',
    'pdf-to-png': 'Convert PDF to PNG',
    'pdf-to-image': 'Convert PDF to images',
    'jpg-to-pdf': 'Convert JPG to PDF',
    'image-to-pdf': 'Convert images to PDF',
    'compress-pdf': 'Compress PDF files',
    'merge-pdf': 'Merge PDF files',
    'split-pdf': 'Split PDF files',
    'rotate-pdf': 'Rotate PDF pages',
    'organize-pdf': 'Organize PDF pages',
    'remove-pages': 'Remove PDF pages',
    'crop-pdf': 'Crop PDF pages',
    'ocr': 'Extract text with OCR',
    'edit-pdf': 'Edit PDF online',
    'protect-pdf': 'Protect PDF with a password',
    'unlock-pdf': 'Unlock a PDF',
    'sign-pdf': 'Sign a PDF',
    'watermark-pdf': 'Add a PDF watermark',
    'redact-pdf': 'Redact PDF content',
    'page-numbers': 'Add PDF page numbers',
  };
  return anchors[slug] ?? name;
}

type WorkflowLink = { href: string; label: string; context: string };

type GuideLink = { href: string; label: string; context: string };

const guideLinksBySlug: Record<string, GuideLink[]> = {
  'compress-pdf': [
    { href: '/guides/how-to-compress-pdf', label: 'How to Compress PDF Files', context: 'Step-by-step guidance for reducing PDF size and checking the output quality.' },
    { href: '/guides/how-to-compress-pdf-under-2mb', label: 'How to Compress PDF to 2MB', context: 'Practical steps for working toward a 2MB upload target without promising a fixed compression ratio.' },
    { href: '/guides/how-to-reduce-pdf-size-for-upload', label: 'How to Reduce PDF Size for Uploads', context: 'Prepare a smaller PDF for forms, portals, applications, and other upload limits.' },
  ],
  'merge-pdf': [
    { href: '/guides/how-to-merge-pdf', label: 'How to Merge PDF Files', context: 'Learn how to combine PDFs in the required order and verify the final document.' },
    { href: '/guides/how-to-merge-pdf-for-submission', label: 'How to Merge PDFs for Submission', context: 'Plan document order and check the final PDF before an online submission.' },
    { href: '/guides/how-to-combine-scanned-pdfs', label: 'How to Combine Scanned PDFs', context: 'Combine scanned documents and check page order, readability, and file size.' },
  ],
  'split-pdf': [
    { href: '/guides/how-to-split-pdf', label: 'How to Split a PDF', context: 'Learn how to divide a PDF into separate files for sharing and organization.' },
    { href: '/guides/how-to-split-pdf-by-page-range', label: 'How to Split a PDF by Page Range', context: 'Extract a specific page range while avoiding common page-number mistakes.' },
    { href: '/guides/how-to-extract-pages-from-pdf', label: 'How to Extract Pages from a PDF', context: 'Create a smaller PDF containing only the pages you need.' },
  ],
  'pdf-to-word': [
    { href: '/guides/how-to-convert-pdf-to-word', label: 'How to Convert PDF to Word', context: 'Convert a supported PDF to an editable DOCX and review the result.' },
    { href: '/guides/how-to-convert-pdf-to-word-without-losing-formatting', label: 'How to Convert PDF to Word Without Losing Formatting', context: 'Review tables, images, fonts, page breaks, and other layout details after conversion.' },
    { href: '/guides/convert-scanned-pdf-to-word', label: 'How to Convert a Scanned PDF to Word', context: 'Understand when OCR is needed before creating an editable Word document.' },
  ],
  'ocr': [
    { href: '/guides/pdf-ocr-guide', label: 'How to OCR a PDF and Extract Text', context: 'Learn how OCR works on scans and how to verify recognized text.' },
    { href: '/guides/convert-scanned-pdf-to-word', label: 'How to Convert a Scanned PDF to Word', context: 'Use OCR as part of a scan-to-editable-document workflow.' },
  ],
  'jpg-to-pdf': [
    { href: '/guides/how-to-check-pdf-before-upload', label: 'How to Check a PDF Before Uploading', context: 'Review file size, page order, readability, and completeness before submission.' },
  ],
  'remove-pages': [
    { href: '/guides/remove-pdf-pages-before-submission', label: 'How to Remove Unwanted PDF Pages', context: 'Prepare a cleaner submission by removing pages that are not required.' },
    { href: '/guides/how-to-extract-pages-from-pdf', label: 'How to Extract Pages from a PDF', context: 'Create a smaller PDF when only selected pages need to be shared.' },
  ],
};

const workflowLinksBySlug: Record<string, WorkflowLink[]> = {
  'pdf-to-word': [
    { href: '/ocr', label: 'Extract text with OCR', context: 'For scanned or image-only PDFs, OCR can help turn visible text into machine-readable content first.' },
    { href: '/compress-pdf', label: 'Compress PDF files', context: 'Reduce a large source PDF before sharing or uploading it when file size is a concern.' },
    { href: '/merge-pdf', label: 'Merge PDF files', context: 'Combine supporting PDFs into one document before starting your Word workflow.' },
  ],
  'pdf-to-excel': [
    { href: '/ocr', label: 'Extract text with OCR', context: 'Scanned tables may need OCR before text and data can be recognized.' },
    { href: '/pdf-to-word', label: 'Convert PDF to Word', context: 'Use Word when the content needs document-style editing rather than spreadsheet analysis.' },
    { href: '/compress-pdf', label: 'Compress PDF files', context: 'Create a smaller source file when upload or sharing limits matter.' },
  ],
  'word-to-pdf': [
    { href: '/compress-pdf', label: 'Compress PDF files', context: 'Reduce the generated PDF size when you need a smaller file for email or uploads.' },
    { href: '/merge-pdf', label: 'Merge PDF files', context: 'Combine the converted document with other PDFs into one submission or packet.' },
    { href: '/sign-pdf', label: 'Sign a PDF', context: 'Continue to a PDF signing workflow when the finished document needs a signature.' },
  ],
  'compress-pdf': [
    { href: '/pdf-to-word', label: 'Convert PDF to Word', context: 'Move supported PDF content into an editable DOCX workflow after reviewing the compressed file.' },
    { href: '/merge-pdf', label: 'Merge PDF files', context: 'Combine related documents before or after compression when you need one PDF package.' },
    { href: '/split-pdf', label: 'Split PDF files', context: 'Separate large documents into smaller PDF parts when only certain pages need to be shared.' },
  ],
  'merge-pdf': [
    { href: '/compress-pdf', label: 'Compress PDF files', context: 'Reduce the size of a combined PDF before sharing or uploading it.' },
    { href: '/split-pdf', label: 'Split PDF files', context: 'Separate selected pages later when different recipients need different sections.' },
    { href: '/pdf-to-word', label: 'Convert PDF to Word', context: 'Turn supported combined PDF content into an editable Word document when needed.' },
  ],
  'split-pdf': [
    { href: '/merge-pdf', label: 'Merge PDF files', context: 'Recombine selected PDF parts into a new document when your workflow requires it.' },
    { href: '/compress-pdf', label: 'Compress PDF files', context: 'Reduce the size of the resulting PDF parts for easier sharing and uploads.' },
    { href: '/pdf-to-word', label: 'Convert PDF to Word', context: 'Convert a selected text-based PDF part into an editable DOCX workflow.' },
  ],
  'ocr': [
    { href: '/pdf-to-word', label: 'Convert PDF to Word', context: 'Use the Word workflow when recognized text needs document-style editing.' },
    { href: '/pdf-to-excel', label: 'Convert PDF to Excel', context: 'Use Excel when recognized table data needs spreadsheet analysis.' },
    { href: '/compress-pdf', label: 'Compress PDF files', context: 'Reduce a PDF size before processing or sharing when the source file is large.' },
  ],
  'jpg-to-pdf': [
    { href: '/merge-pdf', label: 'Merge PDF files', context: 'Combine image-created PDFs or other supporting documents into one file.' },
    { href: '/compress-pdf', label: 'Compress PDF files', context: 'Reduce the resulting PDF size when photos or scans create a large document.' },
    { href: '/pdf-to-jpg', label: 'Convert PDF to JPG', context: 'Convert PDF pages back to JPG images when individual image files are needed.' },
  ],
  'pdf-to-jpg': [
    { href: '/pdf-to-png', label: 'Convert PDF to PNG', context: 'Use PNG output when your workflow calls for PNG image files instead of JPG.' },
    { href: '/compress-pdf', label: 'Compress PDF files', context: 'Reduce the source PDF size before conversion when upload limits are a concern.' },
    { href: '/jpg-to-pdf', label: 'Convert JPG to PDF', context: 'Turn JPG images into a PDF when you need a document rather than separate images.' },
  ],
};

function ContentBlocks({ content }: { content: string }) {
  return (
    <div className="space-y-5">
      {content.split(/\n+/).map((line, i) => {
        const text = line.trim();
        if (!text) return null;
        if (text.startsWith('## ')) {
          return (
            <h2 key={i} className="pt-3 text-2xl font-black leading-tight text-gray-900 sm:text-3xl">
              {text.slice(3)}
            </h2>
          );
        }
        return (
          <p key={i} className="leading-8">
            {text}
          </p>
        );
      })}
    </div>
  );
}

export default function ToolLandingLayout({
  toolName,
  toolSlug,
  description,
  features,
  benefits,
  faqs,
  relatedTools,
  primaryKeyword,
  secondaryKeywords,
  heroImage,
  useCase,
  mainContent,
  howitworks,
  testimonials,
  schema,
}: ToolLandingLayoutProps) {
  const toolHref = `/${toolSlug}`;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <nav aria-label="Breadcrumb" className="px-3 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-1.5 text-xs text-gray-600 sm:gap-2 sm:text-sm">
          <Link href="/">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
          <Link href="/tools">PDF Tools</Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
          <span aria-current="page" className="min-w-0 break-words font-medium text-gray-900">{toolName}</span>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">{toolName}</h1>
              <p className="mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-xl sm:leading-relaxed">{description}</p>
              <Link href={toolHref} className="mt-6 inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-center font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 sm:mt-8 sm:px-8 sm:py-4">
                Use {toolName} Now<ChevronRight className="h-5 w-5 shrink-0" />
              </Link>
            </div>
            {heroImage && (
              <div className="hidden min-w-0 lg:block">
                <img src={heroImage} alt={toolName} loading="eager" className="h-auto w-full rounded-lg object-cover shadow-2xl" />
              </div>
            )}
          </div>
        </div>
      </section>

      {workflowLinksBySlug[toolSlug] && workflowLinksBySlug[toolSlug].length > 0 && (
        <section className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Related PDF workflows</h2>
            <p className="mt-3 leading-7 text-gray-600">Continue with a related PDF task when your document workflow needs another step.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {workflowLinksBySlug[toolSlug].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-400">
                  <h3 className="font-bold text-gray-900">{link.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{link.context}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}\n\n      {guideLinksBySlug[toolSlug] && guideLinksBySlug[toolSlug].length > 0 && (
        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">Helpful PDF guides</h2>
            <p className="mt-3 leading-7 text-gray-600">Read a practical guide before or after using this PDFilio tool.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guideLinksBySlug[toolSlug].map((guide) => (
                <Link key={guide.href} href={guide.href} className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-400">
                  <h3 className="font-bold text-gray-900">{guide.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{guide.context}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {mainContent && (
        <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto w-full max-w-4xl text-base text-gray-700 sm:text-lg">
            <ContentBlocks content={mainContent} />
          </div>
        </section>
      )}

      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-black text-gray-900 sm:mb-12 sm:text-4xl">Key Features</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {features.map((f, i) => (
              <div key={i} className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Star className="mt-1 h-5 w-5 shrink-0 text-red-600 sm:h-6 sm:w-6" />
                  <h3 className="min-w-0 break-words font-bold text-gray-900">{f}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-black text-gray-900 sm:mb-12 sm:text-4xl">Benefits</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex min-w-0 items-start gap-3 sm:gap-4">
                <Shield className="mt-1 h-5 w-5 shrink-0 text-red-600 sm:h-6 sm:w-6" />
                <h3 className="min-w-0 break-words font-bold text-gray-900">{b}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {useCase && (
        <section className="bg-blue-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="mb-5 text-2xl font-black text-gray-900 sm:mb-6 sm:text-3xl">Use Cases</h2>
            <div className="space-y-3">
              {useCase.split(/\n+/).filter(Boolean).map((x, i) => (
                <p key={i} className="break-words text-base leading-7 text-gray-700 sm:text-lg">{x.trim()}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials && testimonials.length > 0 && (
        <section className="bg-gray-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="mb-8 text-center text-2xl font-black text-gray-900 sm:mb-12 sm:text-4xl">What Users Say</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
                  <p className="mb-4 break-words text-gray-600 italic">&quot;{t.text}&quot;</p>
                  <p className="break-words font-bold text-gray-900">{t.name}</p>
                  {t.role && <p className="break-words text-sm text-gray-500">{t.role}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-black text-gray-900 sm:mb-12 sm:text-4xl">How to Use {toolName}</h2>
          {howitworks ? (
            <div className="space-y-5 text-gray-600 sm:space-y-6">
              {howitworks.split(/\n+/).filter(Boolean).map((step, i) => (
                <p key={i} className="leading-7">{step.trim()}</p>
              ))}
            </div>
          ) : (
            <div className="space-y-5 sm:space-y-6">
              <div><h3 className="mb-2 font-bold text-gray-900">1. Open the Tool</h3><p className="text-gray-600">Open {toolName} and review the available workflow and supported inputs.</p></div>
              <div><h3 className="mb-2 font-bold text-gray-900">2. Add or Select Your Content</h3><p className="text-gray-600">Provide the supported file or content required by the tool, then choose any available options.</p></div>
              <div><h3 className="mb-2 font-bold text-gray-900">3. Review the Result</h3><p className="text-gray-600">Review the generated result before downloading or using it, especially when accuracy matters.</p></div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-black text-gray-900 sm:mb-12 sm:text-4xl">Frequently Asked Questions</h2>
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
                <h3 className="flex items-start gap-2 break-words font-bold leading-6 text-gray-900">
                  <Zap className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />{f.q}
                </h3>
                <p className="mt-3 break-words leading-7 text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-black text-gray-900 sm:mb-12 sm:text-4xl">Related Tools</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Array.from(
              new Map(
                [
                  ...relatedTools.map((t) => ({ name: t.name, slug: t.slug })),
                  ...getRelatedTools(toolSlug).map((t) => ({ name: t.name, slug: t.slug })),
                ].map((tool) => [tool.slug, tool])
              ).values()
            ).slice(0, 6).map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 transition hover:border-gray-300 sm:p-6">
                <h3 className="break-words font-bold text-gray-900">{t.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{getRelatedToolAnchor(t.name, t.slug)}<ChevronRight className="inline h-4 w-4" /></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h2 className="text-2xl font-black text-white sm:text-4xl">Start {toolName} Now</h2>
          <p className="mt-4 text-base leading-7 text-red-100 sm:mb-8 sm:text-xl">Use the tool directly and download your result when it is ready.</p>
          <Link href={toolHref} className="mt-6 inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-center font-bold text-red-600 sm:px-8 sm:py-4">
            Use {toolName}<ChevronRight className="h-5 w-5 shrink-0" />
          </Link>
        </div>
      </section>

      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      {!schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({'@context':'https://schema.org','@type':'SoftwareApplication',name:toolName,description,applicationCategory:'Utility'}) }} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pdfilio.com/' },
              { '@type': 'ListItem', position: 2, name: 'PDF Tools', item: 'https://pdfilio.com/tools' },
              { '@type': 'ListItem', position: 3, name: toolName, item: `https://pdfilio.com/${toolSlug}` },
            ],
          }),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}
