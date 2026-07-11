import { getToolConfig, AI_TOOLS_MAPPING } from '@/config/ai-tools-mapping'
import PDFChatTool from '@/components/tools/pdf-chat-tool'
import PDFTranslatorTool from '@/components/tools/pdf-translator-tool'
import PDFSummarizerTool from '@/components/tools/pdf-summarizer-tool'
import ResearchAssistantTool from '@/components/tools/research-assistant-tool'
import { AlertCircle } from 'lucide-react'

interface AIToolPageProps {
  params: {
    slug: string
  }
}

const componentMap: Record<string, React.ComponentType> = {
  PDFChatTool: PDFChatTool,
  PDFTranslatorTool: PDFTranslatorTool,
  PDFSummarizerTool: PDFSummarizerTool,
  ResearchAssistantTool: ResearchAssistantTool,
}

export async function generateStaticParams() {
  return AI_TOOLS_MAPPING.map((tool) => ({
    slug: tool.slug,
  }))
}

export default function AIToolPage({ params }: AIToolPageProps) {
  const toolConfig = getToolConfig(params.slug)

  if (!toolConfig) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md text-center bg-white rounded-xl shadow-lg p-8 border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
          <p className="text-gray-600 mb-6">The AI tool "{params.slug}" could not be found.</p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Back to Home
          </a>
        </div>
      </main>
    )
  }

  const Component = componentMap[toolConfig.component]

  if (!Component) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md text-center bg-white rounded-xl shadow-lg p-8 border border-yellow-200">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Component Not Available</h1>
          <p className="text-gray-600 mb-2">Tool: {toolConfig.name}</p>
          <p className="text-gray-600 mb-6">Component: {toolConfig.component}</p>
          <a
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Back to Home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              PDFilio
            </a>
          </div>
          <div className="text-sm text-gray-600">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              {toolConfig.category}
            </span>
          </div>
        </div>
      </header>

      {/* Tool Component */}
      <Component />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About PDFilio</h3>
              <p className="text-gray-400 text-sm">
                Free online tools for PDF conversion, AI analysis, and document processing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/pdf-to-word" className="hover:text-white">PDF to Word</a></li>
                <li><a href="/word-to-pdf" className="hover:text-white">Word to PDF</a></li>
                <li><a href="/ai-chat-pdf" className="hover:text-white">Chat PDF</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                <li><a href="/docs" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 PDFilio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
