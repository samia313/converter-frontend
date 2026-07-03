'use client';

import { ChevronRight, Star, Shield, Zap, Lock } from 'lucide-react';
import Link from 'next/link';

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
}: ToolLandingLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Canonical URL will be added in metadata */}
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            {toolName}
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {description}
          </p>
          <button className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition-all duration-200 inline-flex items-center gap-2">
            Use {toolName} Now
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{benefit}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            How to Use {toolName}
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Upload Your File</h3>
                <p className="text-gray-600">Drag and drop your PDF file or click to browse from your computer</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Configure Settings</h3>
                <p className="text-gray-600">Choose your preferred options and parameters for the conversion</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Download Result</h3>
                <p className="text-gray-600">Get your converted file instantly - no sign-up required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-red-600" />
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools Section - Internal Linking */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((tool, i) => (
              <Link
                key={i}
                href={`/${tool.slug}`}
                className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-lg hover:border-red-300 transition-all group"
              >
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more
                  <ChevronRight className="w-4 h-4" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Start {toolName} Now
          </h2>
          <p className="text-xl text-red-100 mb-8">
            No sign-up required. Free and unlimited.
          </p>
          <button className="px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 font-bold transition-all duration-200 inline-flex items-center gap-2">
            Use {toolName}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: toolName,
            description: description,
            applicationCategory: 'Utility',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
    </div>
  );
}
