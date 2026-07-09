'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface InternalLink {
  title: string;
  description: string;
  href: string;
}

interface PageInternalLinksProps {
  links: InternalLink[];
  title?: string;
  className?: string;
}

export default function PageInternalLinks({ 
  links, 
  title = 'Related Pages',
  className = ''
}: PageInternalLinksProps) {
  return (
    <section className={`bg-gray-50 px-4 sm:px-6 lg:px-8 py-20 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:border-red-300 transition-all group"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{link.description}</p>
              <span className="text-red-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
