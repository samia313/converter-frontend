'use client'

import { useState } from 'react'
import { extractFileContent, validateAIFile } from '@/lib/ai-tool-framework'
import { AlertCircle, Loader2, Download, Zap } from 'lucide-react'

const ANALYSIS_TYPES = [
  { value: 'summary', label: 'Summary', desc: 'Key findings and conclusions' },
  { value: 'abstract', label: 'Abstract', desc: 'Condensed overview' },
  { value: 'keywords', label: 'Keywords', desc: 'Important terms and concepts' },
  { value: 'citations', label: 'Citations', desc: 'Referenced sources' },
  { value: 'methodology', label: 'Methodology', desc: 'Research approach and methods' },
  { value: 'results', label: 'Results', desc: 'Key findings and data' },
]

export default function ResearchAssistantTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisType, setAnalysisType] = useState('summary')
  const [focusArea, setFocusArea] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateAIFile(file, 'research')
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const validation = validateAIFile(file, 'research')
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select a file')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const content = await extractFileContent(selectedFile)

      // Framework implementation for research analysis
      // In production, integrate with LLM for intelligent analysis
      const analysisResult = generateResearchAnalysis(content, analysisType, focusArea)
      setResult(analysisResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsLoading(false)
    }
  }

  const generateResearchAnalysis = (content: string, type: string, focus: string): string => {
    const lines = content.split('\n').filter(l => l.trim())
    const preview = lines.slice(0, 10).join('\n')

    return `RESEARCH ANALYSIS REPORT
${'='.repeat(70)}

Document: ${selectedFile?.name}
Analysis Type: ${type}
${focus ? `Focus Area: ${focus}` : ''}
Date Generated: ${new Date().toLocaleDateString()}

${'─'.repeat(70)}

CONTENT ANALYSIS:
${preview || 'Content preview'}

${'─'.repeat(70)}

ANALYSIS FRAMEWORK FOR ${type.toUpperCase()}:

This analysis tool is ready for LLM integration to provide:

For SUMMARY Analysis:
• Key findings and main points
• Research conclusions
• Important recommendations

For ABSTRACT Analysis:
• Condensed document overview
• Purpose and scope
• Results in brief

For KEYWORDS Analysis:
• Primary research concepts
• Technical terminology
• Research domain classification

For CITATIONS Analysis:
• Referenced sources identification
• Citation patterns
• Related works

For METHODOLOGY Analysis:
• Research approach
• Data collection methods
• Analysis techniques used

For RESULTS Analysis:
• Key findings summary
• Data interpretation
• Statistical results

${'─'.repeat(70)}

NEXT STEPS FOR PRODUCTION:

1. Connect to LLM API (OpenAI GPT-4, Claude, or similar)
2. Implement document parsing for PDF/academic formats
3. Add citation extraction and formatting
4. Implement academic metadata extraction
5. Add keyword extraction with importance ranking
6. Include statistical analysis for research data

${'─'.repeat(70)}

Framework Status: Ready for LLM Integration
Last Updated: ${new Date().toISOString()}
`
  }

  const handleDownload = () => {
    if (!result) return

    const element = document.createElement('a')
    const file = new Blob([result], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `research-analysis-${analysisType}-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Research Assistant</h1>
        <p className="text-lg text-gray-600">Analyze research documents with AI-powered insights</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">1. Upload Research Document</label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragActive
                ? 'border-emerald-500 bg-emerald-50'
                : selectedFile
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            }`}
          >
            <div className="text-4xl mb-2">📚</div>
            <p className="font-semibold text-gray-900">
              {selectedFile ? `Selected: ${selectedFile.name}` : 'Drop research document here or click'}
            </p>
            <p className="text-sm text-gray-600 mt-1">PDF or DOCX academic papers (max 50MB)</p>
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              accept=".pdf,.docx"
              className="hidden"
            />
            <label htmlFor="file-input" className="inline-block mt-4">
              <button
                type="button"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition"
              >
                Choose File
              </button>
            </label>
          </div>
        </div>

        {/* Analysis Type */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">2. Select Analysis Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ANALYSIS_TYPES.map(type => (
              <button
                key={type.value}
                onClick={() => setAnalysisType(type.value)}
                className={`p-4 rounded-lg transition text-left border-2 ${
                  analysisType === type.value
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-gray-100 text-gray-900 border-transparent hover:bg-gray-200'
                }`}
              >
                <p className="font-semibold">{type.label}</p>
                <p className="text-sm opacity-75">{type.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Focus Area */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">3. Focus Area (Optional)</label>
          <input
            type="text"
            value={focusArea}
            onChange={e => setFocusArea(e.target.value)}
            placeholder="e.g., Machine Learning, Climate Change, Economics..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-sm text-gray-600 mt-2">Leave empty for general analysis</p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || isLoading}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Analyze Document
            </>
          )}
        </button>

        {/* Result */}
        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-900">Analysis Complete</h3>
            <div className="max-h-64 overflow-y-auto bg-white p-4 rounded text-sm text-gray-700 whitespace-pre-wrap border border-green-300">
              {result}
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <Download className="w-4 h-4" />
              Download Analysis
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Analysis Capabilities:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Multi-format support (PDF, DOCX)</li>
            <li>✓ 6 analysis types</li>
            <li>✓ Custom focus areas</li>
            <li>✓ Structured output</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Perfect For:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Academic research</li>
            <li>✓ Literature reviews</li>
            <li>✓ Paper analysis</li>
            <li>✓ Document indexing</li>
          </ul>
        </div>
      </div>

      {/* Production Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <strong>Production Enhancement:</strong> Connect to OpenAI GPT-4, Claude, or academic AI models for advanced analysis, citation extraction, and structured data generation.
        </p>
      </div>
    </div>
  )
}
