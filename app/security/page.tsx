'use client';

import Navbar from '@/components/navbar';
import { Shield, Lock, Trash2, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'AES Encryption',
      description: 'Military-grade 256-bit AES encryption protects all your files during upload, processing, and storage. Your documents are encrypted end-to-end.',
      details: ['256-bit AES encryption', 'End-to-end protection', 'Encrypted in transit and at rest']
    },
    {
      icon: Trash2,
      title: 'Automatic Deletion',
      description: 'All uploaded files are automatically deleted from our servers after 1 hour. No file retention, no backups.',
      details: ['Files deleted after 1 hour', 'No permanent storage', 'Automatic cleanup']
    },
    {
      icon: FileText,
      title: 'GDPR Compliant',
      description: 'PDFilio fully complies with GDPR regulations. We respect your privacy rights and provide data subject access requests.',
      details: ['GDPR compliant', 'Privacy rights respected', 'Data subject access available']
    },
    {
      icon: Shield,
      title: 'No File Sharing',
      description: 'Your files are completely private. We do not share, sell, or transfer your data to third parties under any circumstances.',
      details: ['No file sharing', 'No data selling', 'Private processing only']
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
              <Shield className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              Security & Privacy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data security and privacy are our top priorities. PDFilio uses enterprise-grade encryption and strict privacy policies to protect your documents.
            </p>
          </div>
        </section>

        {/* Security Features Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <Icon className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust Badges Section */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Industry Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {['SSL Secure', 'GDPR Compliant', 'ISO 27001', 'SOC 2 Type II'].map((cert, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center border border-gray-200">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-gray-900">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to use a secure PDF solution?
          </h2>
          <Link
            href="/"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Get Started Free
          </Link>
        </section>
      </main>
    </div>
  );
}
