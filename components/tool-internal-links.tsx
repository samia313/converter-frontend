'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getRelatedTools } from '@/lib/seo-keywords'

interface ToolInternalLinksProps {
  currentToolSlug: string
  title?: string
  className?: string
}

export default function ToolInternalLinks({
  currentToolSlug,
  title = 'Related PDF Tools',
  className = '',
}: ToolInternalLinksProps) {
  const relatedTools = getRelatedTools(currentToolSlug)

  if (relatedTools.length === 0) {
    return null
  }

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black mb-8 text-gray-900">{title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group border border-gray-200 p-6 rounded-lg hover:shadow-lg hover:border-red-300 transition-all bg-white"
              title={tool.keyword}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                  {tool.name}
                </h3>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
              <div className="text-xs text-red-600 font-semibold">{tool.keyword}</div>
            </Link>
          ))}
        </div>

        {/* Internal Link Strategy Info */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-2">Maximize Your PDF Workflow</h3>
          <p className="text-gray-700 text-sm">
            Combine multiple PDFilio tools to optimize your document workflow. Convert PDFs, merge files, compress sizes, and protect documents all in one platform.
          </p>
        </div>
      </div>
    </section>
  )
}
