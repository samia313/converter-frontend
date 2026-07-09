import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap - PDFilio',
  description: 'Complete sitemap of all PDFilio pages and PDF tools. Browse all available features and resources.',
  alternates: {
    canonical: 'https://pdfilio.com/sitemap',
  },
};

export default function SitemapPage() {
  const toolCategories = [
    {
      name: 'Convert & Optimize',
      tools: [
        { name: 'Compress PDF', slug: 'compress-pdf' },
        { name: 'Merge PDF', slug: 'merge-pdf' },
        { name: 'PDF to Word', slug: 'pdf-to-word' },
        { name: 'Word to PDF', slug: 'word-to-pdf' },
      ],
    },
    {
      name: 'Edit & Organize',
      tools: [
        { name: 'Split PDF', slug: 'split-pdf' },
        { name: 'Rotate PDF', slug: 'rotate-pdf' },
        { name: 'Remove Pages', slug: 'remove-pages' },
        { name: 'Organize PDF', slug: 'organize-pdf' },
      ],
    },
    {
      name: 'Convert Formats',
      tools: [
        { name: 'PDF to Excel', slug: 'pdf-to-excel' },
        { name: 'Excel to PDF', slug: 'excel-to-pdf' },
        { name: 'PDF to PowerPoint', slug: 'pdf-to-powerpoint' },
        { name: 'PowerPoint to PDF', slug: 'powerpoint-to-pdf' },
      ],
    },
    {
      name: 'Image Conversion',
      tools: [
        { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
        { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
        { name: 'PDF to PNG', slug: 'pdf-to-png' },
        { name: 'PNG to PDF', slug: 'png-to-pdf' },
      ],
    },
  ];

  const mainPages = [
    { name: 'Home', slug: '/' },
    { name: 'About Us', slug: '/about' },
    { name: 'Contact', slug: '/contact' },
    { name: 'Security & Privacy', slug: '/security' },
    { name: 'API Documentation', slug: '/developers' },
    { name: 'Affiliate Program', slug: '/affiliate' },
    { name: 'Referral Program', slug: '/referral' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sitemap</h1>
          <p className="text-lg text-gray-600">Browse all pages and PDF tools available on PDFilio</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Pages Section */}
        <section className="mb-12 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            Main Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainPages.map((page) => (
              <Link
                key={page.slug}
                href={page.slug}
                className="flex items-center justify-between p-3 rounded border border-gray-200 hover:border-red-300 hover:bg-red-50 transition group"
              >
                <span className="text-gray-700 group-hover:text-red-600 font-medium">{page.name}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
              </Link>
            ))}
          </div>
        </section>

        {/* PDF Tools by Category */}
        {toolCategories.map((category) => (
          <section key={category.name} className="mb-12 bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              {category.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="flex items-center justify-between p-3 rounded border border-gray-200 hover:border-red-300 hover:bg-red-50 transition group"
                >
                  <span className="text-gray-700 group-hover:text-red-600 font-medium">{tool.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Quick Links */}
        <section className="mb-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-8 border border-red-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/" className="text-red-600 hover:text-red-700 font-medium text-sm">Home</Link>
            <Link href="/about" className="text-red-600 hover:text-red-700 font-medium text-sm">About</Link>
            <Link href="/contact" className="text-red-600 hover:text-red-700 font-medium text-sm">Support</Link>
            <Link href="/security" className="text-red-600 hover:text-red-700 font-medium text-sm">Security</Link>
            <Link href="/developers" className="text-red-600 hover:text-red-700 font-medium text-sm">API</Link>
            <Link href="/affiliate" className="text-red-600 hover:text-red-700 font-medium text-sm">Affiliate</Link>
            <Link href="/referral" className="text-red-600 hover:text-red-700 font-medium text-sm">Referral</Link>
            <Link href="/compress-pdf" className="text-red-600 hover:text-red-700 font-medium text-sm">Compress PDF</Link>
          </div>
        </section>

        {/* SEO Info Box */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">About This Sitemap</h3>
          <p className="text-gray-700 mb-4">
            This page provides a comprehensive directory of all pages and tools available on PDFilio. Use this sitemap to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Browse all available PDF conversion and editing tools</li>
            <li>Find specific pages and resources</li>
            <li>Access main company information and support pages</li>
            <li>Discover our affiliate and referral programs</li>
            <li>Connect with our API documentation</li>
          </ul>
          <p className="text-gray-600 text-sm mt-4">
            For a machine-readable XML sitemap, visit <Link href="/sitemap.xml" className="text-blue-600 hover:underline">/sitemap.xml</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
