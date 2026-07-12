import { Metadata } from 'next';
import Link from 'next/link';
import { AI_TOOLS_MAPPING, getFeaturedAITools, getAIToolsByCategory } from '@/lib/ai-tools-router';
import { ArrowRight, Zap, Globe, FileText, Search, Pencil } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advanced AI Tools | PDFilio',
  description: 'Discover 18+ powerful AI tools for document analysis, translation, summarization, research, and more.',
  keywords: 'ai tools, document analysis, translation, summarization, research assistant',
};

const categoryIcons = {
  chat: <MessageCircleIcon className="w-6 h-6" />,
  translation: <Globe className="w-6 h-6" />,
  summarization: <FileText className="w-6 h-6" />,
  research: <Search className="w-6 h-6" />,
  rewriting: <Pencil className="w-6 h-6" />,
  extraction: <Zap className="w-6 h-6" />,
};

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function ToolCard({ tool }: { tool: (typeof AI_TOOLS_MAPPING)[0] }) {
  return (
    <Link
      href={`/tools/ai/${tool.slug}`}
      className="group bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-200 hover:border-blue-300 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 capitalize">{tool.category}</p>
        </div>
        {tool.featured && (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
            Featured
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>
      <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold group-hover:gap-3 transition">
        Try Now
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

export default function AIToolsPage() {
  const featured = getFeaturedAITools();
  const categories = ['chat', 'translation', 'summarization', 'research', 'rewriting', 'extraction'] as const;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Advanced AI Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unlock the power of AI with our 18+ advanced document analysis, translation, summarization, and research tools. Process any document instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tools/ai/ai-chat-pdf"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Try AI Chat PDF
            </Link>
            <Link
              href="#tools"
              className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition"
            >
              Explore All Tools
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: '18+ Tools', value: 'Advanced Features' },
            { label: '100% Secure', value: 'No Data Storage' },
            { label: '<2s Processing', value: 'Lightning Fast' },
            { label: 'Free to Use', value: 'No Sign-up' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-2xl font-bold text-blue-600">{stat.label}</p>
              <p className="text-gray-600 text-sm mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Tools */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {featured.slice(0, 3).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* All Tools by Category */}
      <div className="bg-white border-t">
        <div className="container mx-auto max-w-6xl px-4 py-16" id="tools">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">All AI Tools</h2>
          {categories.map((category) => {
            const tools = getAIToolsByCategory(category);
            if (tools.length === 0) return null;

            return (
              <div key={category} className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    {categoryIcons[category]}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 capitalize">{category} Tools</h3>
                  <span className="ml-auto px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full">
                    {tools.length} tools
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Our AI Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Powered by Advanced AI',
              description: 'Uses cutting-edge language models to understand and process your documents with precision.',
            },
            {
              title: 'Privacy First',
              description: 'Your documents are processed securely. No data is stored on our servers permanently.',
            },
            {
              title: 'Multiple Formats',
              description: 'Works with PDF, DOCX, TXT, and other common document formats up to 50MB.',
            },
            {
              title: 'Instant Results',
              description: 'Get results in seconds. No waiting, no queues, just instant processing.',
            },
            {
              title: 'Easy to Use',
              description: 'Simple, intuitive interface. No technical knowledge required to get started.',
            },
            {
              title: 'Always Free',
              description: 'No subscription required. Use as many tools as you want completely free.',
            },
          ].map((benefit, i) => (
            <div key={i} className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Documents?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Start using our AI tools today. No sign-up required. No credit card needed.
          </p>
          <Link
            href="/tools/ai/ai-chat-pdf"
            className="inline-block px-8 py-3 bg-white hover:bg-blue-50 text-blue-600 font-semibold rounded-lg transition"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
