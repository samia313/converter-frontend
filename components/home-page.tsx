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
      color: '#cc0000',
      tools: toolsByCategory.organize,
    },
    {
      key: 'optimize',
      title: 'Optimize',
      color: '#ff9900',
      tools: toolsByCategory.optimize,
    },
    {
      key: 'convert_to',
      title: 'Convert to PDF',
      color: '#0066cc',
      tools: toolsByCategory.convert_to,
    },
    {
      key: 'convert_from',
      title: 'Convert from PDF',
      color: '#00aa00',
      tools: toolsByCategory.convert_from,
    },
    {
      key: 'edit',
      title: 'Edit & Manage',
      color: '#9933cc',
      tools: toolsByCategory.edit,
    },
    {
      key: 'ai',
      title: 'AI Features',
      color: '#cc00cc',
      tools: toolsByCategory.ai,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden flex items-center justify-center" style={{ minHeight: '600px' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        {/* Hero Animation Component */}
        <HeroAnimation />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full font-bold text-xs mb-8 tracking-widest backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            FASTEST AI PDF TOOLKIT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
          >
            Your Complete
            <br />
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              PDF Superpower
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            19+ professional PDF tools with AI superpowers. Convert, compress, merge, split, edit, and extract intelligence from your documents in seconds. No limits. No sign-up. Completely free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-2xl shadow-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 text-base"
            >
              Explore All Tools
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-red-500 text-red-400 rounded-lg hover:bg-red-500/10 font-bold transition-all duration-200 text-base backdrop-blur-sm"
            >
              Explore Premium
            </motion.button>
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

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Why Choose PDFilio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-10 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-5xl font-black text-red-600 mb-4">100%</div>
              <p className="text-gray-700 font-semibold text-lg">Free to use - No credit card required</p>
            </div>
            <div className="text-center bg-white rounded-xl p-10 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-5xl font-black text-red-600 mb-4">∞</div>
              <p className="text-gray-700 font-semibold text-lg">Unlimited processing without waiting</p>
            </div>
            <div className="text-center bg-white rounded-xl p-10 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="text-5xl font-black text-red-600 mb-4">🔒</div>
              <p className="text-gray-700 font-semibold text-lg">Secure - Files processed locally in your browser</p>
            </div>
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
