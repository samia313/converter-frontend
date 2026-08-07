'use client';

import { motion } from 'framer-motion';
import { tools, toolsByCategory } from '@/lib/tools-config';
import { ChevronRight } from 'lucide-react';
import TypingText from './typing-text';
import TrustIndicators from './trust-indicators';
import FeatureCardsGrid from './feature-cards-grid';
import HeroAnimation from './hero-animation';
import UnifiedToolsGrid from './unified-tools-grid';
import { animationVariants } from '@/lib/animations';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

export default function HomePage({ onSelectTool }: HomePageProps) {
  const categories = [
    {
      key: 'organize',
      title: 'Organize PDF',
      color: '#0369a1',
      tools: toolsByCategory.organize,
    },
    {
      key: 'optimize',
      title: 'Optimize',
      color: '#0ea5e9',
      tools: toolsByCategory.optimize,
    },
    {
      key: 'convert_to',
      title: 'Convert to PDF',
      color: '#0369a1',
      tools: toolsByCategory.convert_to,
    },
    {
      key: 'convert_from',
      title: 'Convert from PDF',
      color: '#0ea5e9',
      tools: toolsByCategory.convert_from,
    },
    {
      key: 'edit',
      title: 'Edit & Manage',
      color: '#0369a1',
      tools: toolsByCategory.edit,
    },
    {
      key: 'ai',
      title: 'AI Features',
      color: '#0ea5e9',
      tools: toolsByCategory.ai,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden flex items-center justify-center" style={{ minHeight: '450px' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        {/* Hero Animation Component */}
        <HeroAnimation />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 border border-sky-500/50 text-sky-300 rounded-full font-bold text-xs mb-8 tracking-widest backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            FASTEST AI PDF TOOLKIT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[34px] font-black text-white mb-4 leading-tight"
          >
            Chat with PDFs, Translate Documents,
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Summarize Reports & Convert Files using AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            60+ professional PDF tools powered by GPT. Convert, compress, merge, split, edit, translate to 100+ languages, and extract intelligence from your documents instantly. No limits. No sign-up. Completely secure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <motion.button
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-lg hover:shadow-2xl shadow-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 text-base"
            >
              Start Free
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-sky-500 text-sky-400 rounded-lg hover:bg-sky-500/10 font-bold transition-all duration-200 text-base backdrop-blur-sm"
            >
              No Signup
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-300"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🔒</span>
              <span>Secure Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span>GPT Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌍</span>
              <span>100+ Languages</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured AI Tools Section - At Top */}
      <section id="tools" className="relative pt-8 pb-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse" style={{animationDelay: '2s'}} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 border border-blue-200 animate-bounce" style={{animationDelay: '0.5s'}}>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-blue-700 font-bold text-sm tracking-widest">POWERED BY AI</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Advanced AI Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your PDFs with intelligent AI features that work like magic. Process, analyze, and enhance documents with cutting-edge technology.
            </p>
          </div>
          
          <motion.div
            variants={animationVariants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {toolsByCategory.ai.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  variants={animationVariants.staggerItem}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 text-left overflow-hidden"
                >
                  {/* Premium gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                        <div className="relative w-16 h-16 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 group-hover:shadow-2xl transition-shadow duration-500">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      {tool.badge && (
                        <span className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200 animate-pulse">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all font-bold text-sm">
                      Try Now
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <FeatureCardsGrid />

      {/* Trust Indicators Section */}
      <TrustIndicators />

      {/* Unified Tools Grid - All Tools in One Place */}
      <UnifiedToolsGrid />

      {/* Why PDFilio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Why PDFilio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need for PDF management, in one powerful platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">Process files instantly with our optimized AI engine</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-gray-600 text-sm">Your files are never stored. Processed locally in your browser</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">Completely Free</h3>
              <p className="text-gray-600 text-sm">No credit card, no hidden fees, unlimited usage</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-bold text-gray-900 mb-2">AI Powered</h3>
              <p className="text-gray-600 text-sm">Built with GPT technology for intelligent document processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to master your PDFs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">📄</div>
                <h3 className="font-bold text-gray-900">PDF Organization</h3>
              </div>
              <p className="text-gray-600 text-sm">Merge, split, rotate, and organize your PDFs</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">🎨</div>
                <h3 className="font-bold text-gray-900">Format Conversion</h3>
              </div>
              <p className="text-gray-600 text-sm">Convert to/from Word, Excel, PowerPoint, images</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">💬</div>
                <h3 className="font-bold text-gray-900">Chat with PDFs</h3>
              </div>
              <p className="text-gray-600 text-sm">Ask questions and get answers from your documents</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">🌐</div>
                <h3 className="font-bold text-gray-900">Translation</h3>
              </div>
              <p className="text-gray-600 text-sm">Translate documents to 100+ languages</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">📊</div>
                <h3 className="font-bold text-gray-900">Summarization</h3>
              </div>
              <p className="text-gray-600 text-sm">Get AI-powered summaries of any document</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">📦</div>
                <h3 className="font-bold text-gray-900">Compression</h3>
              </div>
              <p className="text-gray-600 text-sm">Reduce file size while maintaining quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Models Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">We use the latest AI models to process your documents</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all">
              <h3 className="font-bold text-xl mb-3">GPT-4</h3>
              <p className="text-gray-300">Advanced language understanding for chat and summarization</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all">
              <h3 className="font-bold text-xl mb-3">Vision AI</h3>
              <p className="text-gray-300">Intelligent document understanding and image processing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:border-white/40 transition-all">
              <h3 className="font-bold text-xl mb-3">Translation API</h3>
              <p className="text-gray-300">Support for 100+ languages with high accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">Your Security is Our Priority</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-xl">✓</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">End-to-End Encryption</h3>
                    <p className="text-gray-600">All files are encrypted during transfer and processing</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-xl">✓</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">No File Storage</h3>
                    <p className="text-gray-600">Files are never stored on our servers or any permanent storage</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-xl">✓</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">GDPR Compliant</h3>
                    <p className="text-gray-600">We comply with international data protection regulations</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-xl">✓</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Privacy Policy</h3>
                    <p className="text-gray-600">Read our transparent privacy policy for complete details</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 border-2 border-blue-100">
              <div className="space-y-6 text-center">
                <div className="text-6xl">🔐</div>
                <h3 className="text-2xl font-black text-gray-900">Enterprise-Grade Security</h3>
                <p className="text-gray-600">Bank-level encryption keeps your documents safe</p>
                <div className="pt-6 border-t border-blue-200">
                  <p className="text-sm text-gray-600">SSL/TLS • AES-256 Encryption • GDPR Compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Supported Formats</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Work with all popular file formats</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['PDF', 'DOCX', 'XLSX', 'PPTX', 'PNG', 'JPG', 'GIF', 'SVG', 'TXT', 'RTF', 'ODT', 'XPS'].map((format) => (
              <div key={format} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg hover:border-blue-200 transition-all">
                <p className="font-bold text-gray-900">{format}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Loved by Users</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">See what our users say about PDFilio</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Student', text: 'PDFilio saved me hours on document work. The AI features are incredible!' },
              { name: 'Michael Chen', role: 'Business Owner', text: 'Finally a free tool that actually works. No ads, no limitations, just results.' },
              { name: 'Emma Davis', role: 'Professional', text: 'The translation and summarization features are game-changers for my workflow.' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: 'Is my data safe?', a: 'Yes, all files are processed in your browser and never stored on our servers.' },
              { q: 'Do I need to create an account?', a: 'No, PDFilio works completely without signup or registration.' },
              { q: 'How many files can I process?', a: 'Unlimited! Process as many files as you need, completely free.' },
              { q: 'What languages are supported?', a: 'We support 100+ languages for translation and document processing.' },
              { q: 'Can I use it on mobile?', a: 'Yes, PDFilio works on all devices - desktop, tablet, and mobile.' },
              { q: 'Is there a file size limit?', a: 'PDFilio handles files up to 100MB. Most files process in seconds.' }
            ].map((faq, index) => (
              <details key={index} className="group border border-white/20 rounded-lg p-6 bg-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all">
                <summary className="flex items-center justify-between font-bold text-lg">
                  {faq.q}
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Latest from Our Blog</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Tips, guides, and insights for PDF mastery</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'How to Chat with Your PDFs Using AI', date: 'Dec 15, 2024', readTime: '5 min read' },
              { title: 'Complete Guide to PDF Compression', date: 'Dec 12, 2024', readTime: '8 min read' },
              { title: 'Best Practices for Document Organization', date: 'Dec 10, 2024', readTime: '6 min read' }
            ].map((blog, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-all cursor-pointer">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">{blog.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-lg hover:shadow-2xl shadow-lg font-bold transition-all duration-200"
            >
              View All Articles
            </motion.button>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Most Popular Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Start with these top-rated tools loved by thousands</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolsByCategory.ai.slice(0, 4).map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{tool.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Organize PDF</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Merge PDF</a></li>
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Split PDF</a></li>
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Rotate PDF</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Convert</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Word to PDF</a></li>
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">PDF to Word</a></li>
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Excel to PDF</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-red-600 font-medium transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-10 text-center text-gray-600 font-medium">
            <p>© 2024 pdfilio. All rights reserved. Your complete PDF solution.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
