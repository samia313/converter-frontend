'use client'

import { useState, useCallback } from 'react'
import { AlertCircle, CheckCircle, Loader2, Download } from 'lucide-react'
import { validateAIFile, extractFileContent, formatAIResponse, AIToolType } from '@/lib/ai-tool-framework'

interface AIToolWrapperProps {
  toolType: AIToolType
  toolName: string
  description: string
  onProcess: (fileContent: string, userInput?: string, options?: Record<string, any>) => Promise<string>
  requiresUserInput?: boolean
  inputPlaceholder?: string
  acceptedFormats?: string[]
  showOptions?: boolean
  optionsComponent?: React.ReactNode
}

export default function AIToolWrapper({
  toolType,
  toolName,
  description,
  onProcess,
  requiresUserInput = false,
  inputPlaceholder = 'Enter your query or instructions...',
  acceptedFormats = ['pdf', 'docx', 'txt'],
  showOptions = false,
  optionsComponent,
}: AIToolWrapperProps) {
  const [file, setFile] = useState<File | null>(null)
  const [userInput, setUserInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isDragActive, setIsDragActive] = useState(false)

  const handleFileChange = useCallback((selectedFile: File) => {
    setError('')
    setResult('')

    const validation = validateAIFile(selectedFile, toolType)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      return
    }

    setFile(selectedFile)
  }, [toolType])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files[0])
    }
  }, [handleFileChange])

  const handleProcess = useCallback(async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    if (requiresUserInput && !userInput.trim()) {
      setError('Please provide input/query')
      return
    }

    setIsProcessing(true)
    setError('')
    setResult('')

    try {
      console.log(`[v0] Processing with ${toolType} tool...`)
      const fileContent = await extractFileContent(file)
      const response = await onProcess(fileContent, userInput, {})
      const formatted = formatAIResponse(response)
      setResult(formatted)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Processing failed'
      console.error('[v0] AI Tool error:', errorMsg)
      setError(errorMsg)
    } finally {
      setIsProcessing(false)
    }
  }, [file, userInput, requiresUserInput, toolType, onProcess])

  const handleDownload = useCallback(() => {
    if (!result) return

    const element = document.createElement('a')
    const file = new Blob([result], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `${toolType}-result-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }, [result, toolType])

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{toolName}</h1>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      {/* File Upload */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : file
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          id="file-input"
          accept={acceptedFormats.map(f => `.${f}`).join(',')}
          onChange={e => e.target.files && handleFileChange(e.target.files[0])}
          className="hidden"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer block"
        >
          <div className="text-4xl mb-2">📄</div>
          <p className="font-semibold text-gray-900">
            {file ? `Selected: ${file.name}` : 'Drop file here or click to select'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Supported: {acceptedFormats.join(', ')} (max 50MB)
          </p>
        </label>
      </div>

      {/* User Input (if required) */}
      {requiresUserInput && (
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Your Query or Instructions
          </label>
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            placeholder={inputPlaceholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
          />
        </div>
      )}

      {/* Options (if available) */}
      {showOptions && optionsComponent && (
        <div className="bg-gray-50 p-4 rounded-lg">
          {optionsComponent}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Process Button */}
      <button
        onClick={handleProcess}
        disabled={!file || isProcessing || (requiresUserInput && !userInput.trim())}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          'Process with AI'
        )}
      </button>

      {/* Result */}
      {result && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Result</h2>
          </div>
          <div className="max-h-96 overflow-y-auto bg-gray-50 p-4 rounded text-sm text-gray-700 whitespace-pre-wrap">
            {result}
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Result
          </button>
        </div>
      )}

      {/* Features */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✓ Secure processing - Files never stored</li>
          <li>✓ Fast results - AI-powered analysis</li>
          <li>✓ Multiple formats supported</li>
          <li>✓ Download results instantly</li>
        </ul>
      </div>
    </div>
  )
}
