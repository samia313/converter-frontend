'use client';

import { tools, toolsByCategory } from '@/lib/tools-config';
import { ChevronRight } from 'lucide-react';
import TypingText from './typing-text';

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
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full font-bold text-xs mb-6 tracking-widest">
            TRUSTED BY PROFESSIONALS WORLDWIDE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <TypingText 
              text="AI-Powered PDF" 
              speed={80}
              cursor={false}
              delay={200}
            />
            <br />
            <TypingText 
              text="Workspace for Professionals" 
              speed={80}
              cursor={true}
              delay={900}
            />
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your PDF workflow with intelligent AI features. Access 30+ professional-grade tools for merging, converting, editing, and analyzing documents. Enterprise security, unlimited processing, completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base"
            >
              Start Processing
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-bold transition-all duration-200 text-base">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </section>

      {/* Tools by Category */}
      <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {categories.map((category) => (
            <div key={category.key} className="mb-20">
              <h2 className="text-4xl font-black text-gray-900 mb-10">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => onSelectTool(tool.id)}
                      className="bg-white border border-gray-200 rounded-xl p-7 hover:shadow-xl hover:border-gray-300 transition-all duration-300 text-left group"
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="w-14 h-14 rounded-lg flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: category.color + '15' }}
                        >
                          <Icon className="w-7 h-7" style={{ color: category.color }} />
                        </div>
                        {tool.badge && (
                          <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2.5">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-5 leading-relaxed">{tool.description}</p>
                      <div className="flex items-center gap-2 text-red-600 group-hover:gap-3 transition-all font-bold text-sm">
                        Use Tool
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-16 text-center">Why Choose PDFilio?</h2>
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
      <footer className="border-t border-gray-200 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
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
