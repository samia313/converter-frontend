import Link from 'next/link'
import type { Metadata } from 'next'
import { sitemapGroups } from '@/lib/seo/sitemap-categories'

export const metadata: Metadata = {
  title: 'Sitemap - PDFilio',
  description: 'Browse PDFilio PDF tools, converters, AI PDF tools, guides, and articles in one complete HTML sitemap.',
  alternates: {
    canonical: 'https://pdfilio.com/sitemap-page',
  },
}

type SitemapEntry = string | { url: string; lastModified?: Date }

const sections: { title: string; entries: SitemapEntry[] }[] = [
  { title: 'Main Pages', entries: [...sitemapGroups.core, '/developers', '/affiliate', '/referral'] },
  { title: 'PDF Tools', entries: sitemapGroups['pdf-tools'] },
  { title: 'File Converters', entries: sitemapGroups.converters },
  { title: 'Security & Editing', entries: sitemapGroups['security-editing'] },
  { title: 'OCR & Extraction', entries: sitemapGroups['ocr-extraction'] },
  { title: 'AI PDF Tools', entries: sitemapGroups['ai-tools'] },
  { title: 'Guides', entries: sitemapGroups.guides },
  { title: 'Blog Articles', entries: sitemapGroups.blog },
]

function entryPath(entry: SitemapEntry) {
  return typeof entry === 'string' ? entry : entry.url
}

function entryLabel(entry: SitemapEntry) {
  const path = entryPath(entry)
  if (path === '/') return 'Home'
  return path
    .split('/')
    .filter(Boolean)
    .at(-1)!
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PDFilio Sitemap</h1>
          <p className="text-lg text-gray-600">
            Browse PDF tools, file converters, AI tools, guides, and articles.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sections.map((section) => (
          <section key={section.title} className="mb-10 bg-white rounded-lg p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{section.title}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.entries.map((entry) => {
                const path = entryPath(entry)
                return (
                  <li key={path}>
                    <Link
                      href={path}
                      className="block rounded border border-gray-200 p-3 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition"
                    >
                      {entryLabel(entry)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}

        <section className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">XML Sitemap</h2>
          <p className="text-gray-700">
            Search engines can use the{' '}
            <Link href="/sitemap-index.xml" className="text-red-600 hover:underline">
              XML sitemap index
            </Link>{' '}
            to discover PDFilio URLs.
          </p>
        </section>
      </div>
    </main>
  )
}
