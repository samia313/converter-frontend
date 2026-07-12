'use client';

import { useState, useRef, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import { Send, MessageCircle, Upload, Loader2, Copy, Download, RotateCcw, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

export default function AIChatPDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Upload a PDF and ask me any questions about it. I can help you find information, summarize content, and answer questions.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileLoaded, setFileLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    setSelectedFile(file);
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
    });
    setError(null);
  };

  const handleLoadPDF = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Validate file is loaded successfully
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to load document');
      }

      setFileLoaded(true);
      setMessages([
        {
          id: '1',
          text: `Document "${selectedFile.name}" loaded successfully! I'm ready to answer any questions about it.`,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !fileLoaded || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: inputText,
          fileName: selectedFile?.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'I could not find an answer to your question.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process your message');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileInfo(null);
    setMessages([
      {
        id: '1',
        text: 'Hello! Upload a PDF and ask me any questions about it.',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setFileLoaded(false);
    setError(null);
  };

  const exportConversation = () => {
    const text = messages.map((m) => `${m.isUser ? 'You' : 'AI'}: ${m.text}`).join('\n\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `chat-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Chat with Your PDF
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Ask questions and get instant answers from your documents using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Upload */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Document
            </h3>
            {!fileLoaded ? (
              <>
                <FileUploader
                  accept=".pdf,.docx,.txt"
                  onFileSelected={handleFileSelect}
                  maxSize={50}
                />
                {selectedFile && (
                  <div className="mt-4 space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm font-semibold text-gray-900 break-words">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="mt-3 w-full text-sm text-red-600 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                    <button
                      onClick={handleLoadPDF}
                      disabled={isProcessing}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isProcessing ? 'Loading...' : 'Load & Start Chat'}
                    </button>
                  </div>
                )}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-semibold text-green-900">{fileInfo?.name}</p>
                  <p className="text-xs text-green-700 mt-1">Ready for chat</p>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full text-sm text-red-600 hover:text-red-700 font-semibold flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Load Different File
                </button>
              </div>
            )}
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 flex flex-col h-96">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.timestamp.toLocaleTimeString()}</p>
                    {!msg.isUser && (
                      <button
                        onClick={() => handleCopy(msg.text)}
                        className="mt-2 text-xs opacity-70 hover:opacity-100 transition flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {!fileLoaded && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700 text-sm">
                  Upload a document to start chatting
                </p>
              </div>
            )}

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && fileLoaded && !isProcessing) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={fileLoaded ? "Ask a question..." : "Load a document first..."}
                disabled={!fileLoaded || isProcessing}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
              />
              <button
                onClick={handleSendMessage}
                disabled={!fileLoaded || !inputText.trim() || isProcessing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg px-4 py-2 transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
              {fileLoaded && (
                <button
                  onClick={exportConversation}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg px-4 py-2 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
