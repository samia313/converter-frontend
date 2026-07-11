'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Upload, AlertCircle, Loader2 } from 'lucide-react'
import { extractFileContent, validateAIFile } from '@/lib/ai-tool-framework'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
}

export default function PDFChatTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileLoaded, setFileLoaded] = useState(false)
  const [fileContent, setFileContent] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateAIFile(file, 'chat')
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleLoadPDF = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    setError(null)

    try {
      const content = await extractFileContent(selectedFile)
      setFileContent(content)
      setFileLoaded(true)
      setMessages([
        {
          id: '1',
          type: 'assistant',
          content: `I've loaded your ${selectedFile.name}. I can answer questions about the document. What would you like to know?`,
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !fileLoaded || isLoading) return

    const userQuery = inputValue
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userQuery,
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userQuery,
          documentContent: fileContent,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response || 'I could not generate a response.',
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Error: ${err instanceof Error ? err.message : 'Failed to process'}`,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const validation = validateAIFile(file, 'chat')
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PDF Chat Assistant</h1>
          <p className="text-lg text-gray-600">Upload your PDF and ask questions to get instant answers powered by AI</p>
        </div>

        {/* Main Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {!fileLoaded ? (
            // Upload Section
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Your Document</h2>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center bg-blue-50 hover:border-blue-500 transition cursor-pointer"
              >
                <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <p className="text-gray-900 font-semibold mb-2">Drop your file here or click to select</p>
                <p className="text-sm text-gray-600 mb-4">Supports PDF, DOCX, TXT (up to 50MB)</p>
                <input
                  type="file"
                  id="file-input"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                />
                <label htmlFor="file-input" className="inline-block">
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    Select File
                  </button>
                </label>
              </div>

              {/* Selected File */}
              {selectedFile && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">Selected: {selectedFile.name}</p>
                  <p className="text-sm text-green-600">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Load Button */}
              <button
                onClick={handleLoadPDF}
                disabled={!selectedFile || isLoading}
                className="w-full mt-6 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLoading ? 'Loading...' : 'Load & Start Chat'}
              </button>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Your file is processed securely. No data is stored on our servers.
                </p>
              </div>
            </div>
          ) : (
            // Chat Section
            <>
              <div className="flex items-center justify-between p-4 border-b bg-blue-50">
                <div>
                  <h3 className="font-semibold text-gray-900">Chatting about: {selectedFile?.name}</h3>
                </div>
                <button
                  onClick={() => {
                    setFileLoaded(false)
                    setMessages([])
                    setSelectedFile(null)
                    setFileContent('')
                    setInputValue('')
                  }}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition"
                >
                  Upload New
                </button>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-white">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Help Text */}
        {fileLoaded && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Example Questions:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• What is the main topic of this document?</li>
              <li>• Summarize the key points</li>
              <li>• What does it say about [topic]?</li>
              <li>• Compare [concept A] and [concept B]</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
