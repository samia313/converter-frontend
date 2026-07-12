'use client';

import { useState, useRef, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import { Send, Upload, Loader2, Copy, Download, RotateCcw, AlertCircle, Sparkles, FileText } from 'lucide-react';

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

export default function AIChatPDFEnhanced() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI PDF assistant. Upload a PDF document and ask me anything about it. I can help you find information, answer questions, summarize content, and much more!',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [messageCount, setMessageCount] = useState(1);
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
          text: `Great! I've loaded "${selectedFile.name}". I'm now ready to answer any questions about this document. What would you like to know?`,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setMessageCount(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !fileLoaded || isProcessing) return;

    const userQuery = inputText;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userQuery,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);
    setError(null);
    setMessageCount((prev) => prev + 1);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userQuery,
          fileName: selectedFile?.name,
          messageCount: messageCount + 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'I could not generate a response to that question.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setMessageCount((prev) => prev + 1);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I encountered an error: ${err instanceof Error ? err.message : 'Failed to process'}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
        text: 'Hello! Upload a PDF and ask me anything about it.',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setFileLoaded(false);
    setError(null);
    setMessageCount(1);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI PDF Chat</h1>
          </div>
          <p className="text-lg text-gray-600">Ask AI questions about your PDF documents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Upload Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Document</h2>

              {!fileLoaded ? (
                <>
                  <FileUploader
                    accept=".pdf,.docx,.txt"
                    onFileSelected={handleFileSelect}
                    maxSize={50}
                  />

                  {selectedFile && (
                    <div className="mt-6 space-y-3">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-2">
                          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-semibold text-gray-900 break-words">{selectedFile.name}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleLoadPDF}
                        disabled={isProcessing}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                      >
                        {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isProcessing ? 'Loading...' : 'Load & Start Chat'}
                      </button>

                      <button
                        onClick={() => setSelectedFile(null)}
                        className="w-full text-sm text-red-600 hover:text-red-700 font-semibold py-2"
                      >
                        Change File
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-bold text-green-900">✓ Document Loaded</p>
                    <p className="text-xs text-green-700 mt-1">{fileInfo?.name}</p>
                  </div>

                  <button
                    onClick={exportConversation}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition"
                  >
                    <Download className="w-4 h-4" />
                    Export Chat
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Load New File
                  </button>
                </div>
              )}

              {/* Quick Tips */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold text-gray-900 text-sm mb-3">💡 Tips:</h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li>• Ask specific questions</li>
                  <li>• Request summaries</li>
                  <li>• Get definitions</li>
                  <li>• Extract key points</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 flex flex-col h-96">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pb-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
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

            {/* Input Area */}
            <div className="border-t pt-4 space-y-2">
              {!fileLoaded && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">Upload a document to start chatting</p>
                </div>
              )}
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
                  placeholder={fileLoaded ? 'Ask a question...' : 'Load a document first...'}
                  disabled={!fileLoaded || isProcessing}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!fileLoaded || !inputText.trim() || isProcessing}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
