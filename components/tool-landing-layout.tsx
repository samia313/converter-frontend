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
  heroImage?: string;
  useCase?: string;
  mainContent?: string;
  howitworks?: string;
  testimonials?: Array<{ name: string; text: string; role?: string }>;
  schema?: Record<string, any>;
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
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">{toolName}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{description}</p>
              <Link href={toolHref} className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition-all duration-200 inline-flex items-center gap-2">
                Use {toolName} Now
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            {heroImage && (
              <div className="hidden lg:block">
                <img src={heroImage} alt={toolName} className="rounded-lg shadow-2xl" />
              </div>
            )}
          </div>
        </div>
      </section>

      {mainContent && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {mainContent.split('\n').map((paragraph, i) => <p key={i} className="mb-4">{paragraph}</p>)}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4"><Star className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" /><div><h3 className="font-bold text-gray-900 mb-2">{feature}</h3></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4"><Shield className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" /><div><h3 className="font-bold text-gray-900 mb-2">{benefit}</h3></div></div>
            ))}
          </div>
        </div>
      </section>

      {useCase && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 border-l-4 border-blue-600">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Use Cases</h2>
            <div className="prose prose-lg max-w-none text-gray-700">{useCase.split('\n').map((line, i) => <p key={i} className="mb-3">{line}</p>)}</div>
          </div>
        </section>
      )}

      {testimonials && testimonials.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">What Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, star) => <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}</div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div><p className="font-bold text-gray-900">{testimonial.name}</p>{testimonial.role && <p className="text-sm text-gray-500">{testimonial.role}</p>}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">How to Use {toolName}</h2>
          <div className="space-y-6">
            <div className="flex gap-4"><div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-white font-bold">1</div><div><h3 className="font-bold text-gray-900 mb-2">Upload Your File</h3><p className="text-gray-600">Drag and drop your PDF file or click to browse from your computer</p></div></div>
            <div className="flex gap-4"><div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-white font-bold">2</div><div><h3 className="font-bold text-gray-900 mb-2">Configure Settings</h3><p className="text-gray-600">Choose your preferred options and parameters for the conversion</p></div></div>
            <div className="flex gap-4"><div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-600 text-white font-bold">3</div><div><h3 className="font-bold text-gray-900 mb-2">Download Result</h3><p className="text-gray-600">Get your converted file instantly - no sign-up required</p></div></div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">{faqs.map((faq, i) => <div key={i} className="bg-white rounded-lg p-6 border border-gray-200"><h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5 text-red-600" />{faq.q}</h3><p className="text-gray-600">{faq.a}</p></div>)}</div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((tool, i) => <Link key={i} href={`/${tool.slug}`} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-lg hover:border-red-300 transition-all group"><h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{tool.name}</h3><p className="text-sm text-gray-600 flex items-center gap-1 group-hover:gap-2 transition-all">Learn more<ChevronRight className="w-4 h-4" /></p></Link>)}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Start {toolName} Now</h2>
          <p className="text-xl text-red-100 mb-8">No sign-up required. Free and unlimited.</p>
          <Link href={toolHref} className="px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 font-bold transition-all duration-200 inline-flex items-center gap-2">Use {toolName}<ChevronRight className="w-5 h-5" /></Link>
        </div>
      </section>

      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      {!schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({'@context':'https://schema.org','@type':'SoftwareApplication',name:toolName,description:description,applicationCategory:'Utility',offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}}) }} />}
    </div>
  );
}
