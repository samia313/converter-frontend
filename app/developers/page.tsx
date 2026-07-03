'use client';

import Navbar from '@/components/navbar';
import { Code, Zap, Shield, BarChart3, Users, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DevelopersPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for development and testing',
      features: [
        '5,000 API calls per month',
        'All PDF conversion tools',
        'Email support',
        '99% uptime SLA',
        'REST API access'
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing applications',
      features: [
        '50,000 API calls per month',
        'All PDF tools + AI features',
        'Priority email support',
        '99.9% uptime SLA',
        'Webhook support',
        'Advanced analytics'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large-scale operations',
      features: [
        'Unlimited API calls',
        'All features included',
        '24/7 phone support',
        '99.99% uptime SLA',
        'Dedicated account manager',
        'Custom integrations'
      ],
      cta: 'Contact Sales'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process documents in milliseconds with our optimized infrastructure'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: '256-bit encryption, GDPR compliant, SOC 2 certified'
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Track usage, monitor performance, and optimize costs'
    },
    {
      icon: Code,
      title: 'Easy Integration',
      description: 'Simple REST API with SDKs for popular programming languages'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSelectTool={() => {}} onNavigateBlog={() => {}} />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Code className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              PDFilio API
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Integrate powerful PDF processing into your application. Process documents programmatically with our robust REST API.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://docs.pdfilio.com"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Read Documentation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                Get API Key
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose PDFilio API?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Code Example */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Easy Integration
            </h2>
            <div className="bg-gray-900 rounded-xl p-8 text-gray-100 font-mono text-sm overflow-x-auto">
              <pre>{`// Example: Convert PDF to Word
const response = await fetch('https://api.pdfilio.com/v1/convert', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    file_url: 'https://example.com/document.pdf',
    output_format: 'docx'
  })
});

const result = await response.json();
console.log('Converted file:', result.download_url);`}</pre>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 border-2 transition-all ${
                  plan.popular
                    ? 'border-red-600 bg-red-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold w-fit mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors mb-8 ${
                    plan.popular
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-xs">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* API Endpoints */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Available Endpoints
            </h2>
            <div className="space-y-4">
              {[
                { method: 'POST', endpoint: '/v1/convert', description: 'Convert documents between formats' },
                { method: 'POST', endpoint: '/v1/compress', description: 'Compress PDF files' },
                { method: 'POST', endpoint: '/v1/merge', description: 'Merge multiple PDFs' },
                { method: 'POST', endpoint: '/v1/split', description: 'Split PDF into pages' },
                { method: 'POST', endpoint: '/v1/ocr', description: 'Extract text from images' },
                { method: 'GET', endpoint: '/v1/status/:job_id', description: 'Check job status' }
              ].map((endpoint, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded font-bold text-white text-sm ${
                        endpoint.method === 'POST' ? 'bg-blue-600' : 'bg-green-600'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-gray-900 font-mono">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-gray-600">{endpoint.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start with a free trial. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Create Developer Account
          </Link>
        </section>
      </main>
    </div>
  );
}
