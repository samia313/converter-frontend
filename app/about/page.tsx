'use client';

import Navbar from '@/components/navbar';
import { ArrowRight, Users, Zap, Globe, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onSelectTool={() => {}} onNavigateBlog={() => {}} />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6">
              About PDFilio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming how professionals work with PDF documents through AI-powered innovation and enterprise-grade security.
            </p>
          </div>
        </section>

        {/* Success Story Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Success Story
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                PDFilio started with a simple mission: make PDF processing effortless and intelligent. What began as a small project to solve our own document management challenges has grown into a trusted platform serving millions of professionals worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Today, PDFilio processes over 50 million documents annually, helping professionals save thousands of hours of manual work. Our AI-powered features have become industry-standard tools for document intelligence and processing.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From startup to industry leader, we've maintained our core values: simplicity, security, and innovation. Every feature we build is designed to empower professionals and democratize AI-powered document processing.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-12 border border-red-200">
              <div className="space-y-8">
                <div>
                  <p className="text-5xl font-black text-red-600">50M+</p>
                  <p className="text-gray-600 text-lg">Documents Processed</p>
                </div>
                <div>
                  <p className="text-5xl font-black text-red-600">100K+</p>
                  <p className="text-gray-600 text-lg">Active Users Daily</p>
                </div>
                <div>
                  <p className="text-5xl font-black text-red-600">150+</p>
                  <p className="text-gray-600 text-lg">Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower professionals worldwide with intelligent, secure, and easy-to-use PDF tools that save time and reduce complexity in document processing workflows.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To become the world's most trusted and intelligent PDF workspace, where AI and automation transform how professionals interact with documents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why PDFilio */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose PDFilio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Process documents in seconds with our optimized infrastructure and cloud-based architecture.'
              },
              {
                icon: Users,
                title: 'Built for Teams',
                description: 'Collaborate seamlessly with team members and share results securely with integrated sharing controls.'
              },
              {
                icon: Globe,
                title: 'Global Scale',
                description: 'Trusted by professionals in 150+ countries with support for 40+ languages and local compliance.'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Founder Section */}
        <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Meet Our Founder
            </h2>
            <div className="bg-white rounded-xl p-12 border border-gray-200 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Samia Ahmad Naveed</h3>
                <p className="text-red-600 font-semibold mb-4">Founder & CEO</p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Samia founded PDFilio with a vision to revolutionize document processing. With a background in software engineering and AI, Samia has assembled a world-class team dedicated to making PDF work smarter and faster for millions of professionals globally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions about PDFilio? We'd love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
