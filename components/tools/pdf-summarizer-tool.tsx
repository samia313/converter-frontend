'use client'

import { useState } from 'react'
import { extractFileContent, validateAIFile } from '@/lib/ai-tool-framework'
import { AlertCircle, Loader2, Download, BookOpen } from 'lucide-react'

export default function PDFSummarizerTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateAIFile(file, 'summarize')
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
      const validation = validateAIFile(file, 'summarize')
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleSummarize = async () => {
    if (!selectedFile) {
      setError('Please select a file')
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const content = await extractFileContent(selectedFile)

      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentContent: content,
          summaryLength,
          language: 'en',
        }),
      })

      if (!response.ok) {
        throw new Error('Summarization failed')
      }

      const data = await response.json()
      setResult(data.summary)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to summarize')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!result) return

    const element = document.createElement('a')
    const file = new Blob([result], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `summary-${summaryLength}-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">PDF Summarizer</h1>
        <p className="text-lg text-gray-600">Generate concise summaries of long documents automatically</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">1. Upload Document</label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragActive
                ? 'border-purple-500 bg-purple-50'
                : selectedFile
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            }`}
          >
            <div className="text-4xl mb-2">📝</div>
            <p className="font-semibold text-gray-900">
              {selectedFile ? `Selected: ${selectedFile.name}` : 'Drop file here or click to select'}
            </p>
            <p className="text-sm text-gray-600 mt-1">PDF, DOCX, or TXT (max 50MB)</p>
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />
            <label htmlFor="file-input" className="inline-block mt-4">
              <button
                type="button"
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
              >
                Choose File
              </button>
            </label>
          </div>
        </div>

        {/* Summary Length */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">2. Select Summary Length</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: 'short', label: 'Short', desc: '20% of original' },
              { value: 'medium', label: 'Medium', desc: '40% of original' },
              { value: 'long', label: 'Long', desc: '60% of original' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSummaryLength(option.value as 'short' | 'medium' | 'long')}
                className={`p-4 rounded-lg transition text-left ${
                  summaryLength === option.value
                    ? 'bg-purple-600 text-white border-2 border-purple-700'
                    : 'bg-gray-100 text-gray-900 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                <p className="font-semibold">{option.label}</p>
                <p className="text-sm opacity-75">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Summarize Button */}
        <button
          onClick={handleSummarize}
          disabled={!selectedFile || isLoading}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <BookOpen className="w-5 h-5" />
              Generate Summary
            </>
          )}
        </button>

        {/* Result */}
        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-900">Summary Generated</h3>
            <div className="max-h-64 overflow-y-auto bg-white p-4 rounded text-sm text-gray-700 whitespace-pre-wrap border border-green-300">
              {result}
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <Download className="w-4 h-4" />
              Download Summary
            </button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✓ Three summary length options</li>
          <li>✓ AI-powered extraction of key points</li>
          <li>✓ Works with PDF, DOCX, and TXT</li>
          <li>✓ Preserves document meaning</li>
          <li>✓ Fast processing</li>
          <li>✓ Secure - files never stored</li>
        </ul>
      </div>

      {/* Use Cases */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Perfect For:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Research papers and articles</li>
          <li>• Business reports and documents</li>
          <li>• Academic papers</li>
          <li>• News articles and blogs</li>
          <li>• Long-form content and books</li>
        </ul>
      </div>
    </div>
  )
}
