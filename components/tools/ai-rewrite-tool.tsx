'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Wand2, Download, Copy } from 'lucide-react';

export default function AIRewriteTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tone, setTone] = useState('professional');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rewrittenText, setRewrittenText] = useState<string | null>(null);

  const handleRewrite = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('tone', tone);

      const response = await fetch('/api/convert/ai-rewrite', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Rewrite failed');
      }

      const data = await response.json();
      setRewrittenText(data.rewrittenText || 'Could not rewrite document');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rewrite document');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (rewrittenText) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(rewrittenText));
      element.setAttribute('download', 'rewritten-document.txt');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleCopy = () => {
    if (rewrittenText) {
      navigator.clipboard.writeText(rewrittenText);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wand2 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              AI Rewrite & Improve
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Improve your document content with AI-powered rewriting suggestions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload & Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Upload Document
            </h3>

            <FileUploader
              accept=".pdf,.txt,.doc,.docx"
              onFileSelected={(files) => setSelectedFile(files[0] || null)}
              maxSize={50}
            />

            {/* Tone Selection */}
            <div className="mt-8 mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Writing Tone
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'professional', label: 'Professional' },
                  { value: 'casual', label: 'Casual' },
                  { value: 'formal', label: 'Formal' },
                  { value: 'creative', label: 'Creative' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`p-3 text-center cursor-pointer rounded-lg border-2 transition ${
                      tone === option.value
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tone"
                      value={option.value}
                      checked={tone === option.value}
                      onChange={(e) => setTone(e.target.value)}
                      className="hidden"
                    />
                    <div className="font-semibold text-sm text-gray-900">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleRewrite}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Rewriting...' : 'Rewrite Document'}
            </button>
          </div>

          {/* Results */}
          {rewrittenText && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Rewritten Content
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto mb-4">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {rewrittenText}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
