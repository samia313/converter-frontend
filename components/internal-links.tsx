'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface InternalLink {
  title: string;
  description: string;
  href: string;
  keyword: string;
}

interface InternalLinksProps {
  title?: string;
  links: InternalLink[];
  columns?: 2 | 3;
}

export default function InternalLinks({
  title = 'Related PDF Tools',
  links,
  columns = 3,
}: InternalLinksProps) {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">{title}</h2>
        <div className={`grid ${gridClass[columns]} gap-6`}>
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="group p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:border-red-300 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                  {link.title}
                </h3>
                <ChevronRight className="w-5 h-5 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-gray-600 text-sm mb-3">{link.description}</p>
              <p className="text-xs text-red-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                {link.keyword} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
