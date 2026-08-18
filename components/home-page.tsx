'use client';

import { motion } from 'framer-motion';
import { toolsByCategory } from '@/lib/tools-config';
import { ChevronRight } from 'lucide-react';
import TrustIndicators from './trust-indicators';
import FeatureCardsGrid from './feature-cards-grid';
import HeroAnimation from './hero-animation';
import UnifiedToolsGrid from './unified-tools-grid';
import { animationVariants } from '@/lib/animations';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

export default function HomePage({ onSelectTool }: HomePageProps) {
  const scrollToTools = () => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="w-full">
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden flex items-center justify-center" style={{ minHeight: '450px' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        </div>
        <HeroAnimation />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 border border-sky-500/50 text-sky-300 rounded-full font-bold text-xs mb-8 tracking-widest backdrop-blur-sm">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
            AI PDF TOOLKIT
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Chat with PDFs, Translate Documents,
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">Summarize Reports & Convert Files using AI</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-base sm:text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional PDF tools for converting, compressing, merging, splitting, editing, translating, and working with supported AI document features.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button onClick={scrollToTools} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-lg shadow-lg font-bold flex items-center justify-center gap-2 text-base">
              Start Free <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button onClick={scrollToTools} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 border-2 border-sky-500 text-sky-400 rounded-lg hover:bg-sky-500/10 font-bold text-base backdrop-blur-sm">
              Browse Tools
            </motion.button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-300">
            <div className="flex items-center gap-2"><span className="text-xl">🔒</span><span>Secure Processing</span></div>
            <div className="flex items-center gap-2"><span className="text-xl">⚡</span><span>Fast Workflows</span></div>
            <div className="flex items-center gap-2"><span className="text-xl">🌍</span><span>Multilingual Tools</span></div>
          </div>
        </div>
      </section>

      <section id="tools" className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 border border-blue-200">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-blue-700 font-bold text-sm tracking-widest">AI TOOLS</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Advanced AI Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Process and analyze documents with the AI features currently available in PDFilio.</p>
          </div>
          <motion.div variants={animationVariants.staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {toolsByCategory.ai.map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.button key={tool.id} onClick={() => onSelectTool(tool.id)} variants={animationVariants.staggerItem} whileHover={{ y: -8 }} className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 text-left overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-500 to-purple-500"><Icon className="w-8 h-8 text-white" /></div>
                      {tool.badge && <span className="px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200">{tool.badge}</span>}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600">{tool.name}</h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{tool.description}</p>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">Try Now <ChevronRight className="w-4 h-4" /></div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      <FeatureCardsGrid />
      <TrustIndicators />
      <UnifiedToolsGrid />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Why PDFilio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A focused toolkit for supported PDF and document workflows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['⚡', 'Fast Workflows', 'Efficient processing for supported document tools.'],
              ['🧩', 'Many PDF Tools', 'One place for common PDF organization and conversion tasks.'],
              ['🤖', 'AI Features', 'AI-powered document capabilities where available.'],
              ['🌍', 'Accessible', 'Simple browser-based access with multilingual options where supported.'],
            ].map(([icon, title, description]) => (
              <div key={title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
