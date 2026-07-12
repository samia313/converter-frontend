'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download, Upload, Loader2, AlertCircle, BookOpen, Copy, RotateCcw } from 'lucide-react';

interface SummaryResult {
  summary: string;
  wordCount: number;
  readingTime: number;
}

export default function AISummaryEnhanced() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [summaryLength, setSummaryLength] = useState('medium');

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleGenerateSummary = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSummary(null);
    setResult(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('length', summaryLength);

      setProgress(25);

      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Summary generation failed');
      }

      setProgress(75);
      const data = await response.json();
      const summaryText = data.summary || data.response || 'Could not generate summary';
      
      setSummary(summaryText);
      setResult({
        summary: summaryText,
        wordCount: summaryText.split(/\s+/).length,
        readingTime: Math.ceil(summaryText.split(/\s+/).length / 200),
      });
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    if (!summary) return;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(summary));
    element.setAttribute('download', `summary-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError(null);
    setSummary(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI PDF Summarizer</h1>
          </div>
          <p className="text-lg text-gray-600">Get instant summaries of your PDF documents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select PDF</h2>
                <FileUploader
                  accept=".pdf"
                  onFileSelected={handleFileSelect}
                  maxSize={100}
                />

                {selectedFile && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-gray-900">{selectedFile.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <>
                  <div className="border-t pt-4">
                    <label className="block text-sm font-bold text-gray-900 mb-3">Summary Length</label>
                    <div className="space-y-2">
                      {[
                        { value: 'short', label: 'Short', desc: '2-3 paragraphs' },
                        { value: 'medium', label: 'Medium', desc: '4-6 paragraphs (Recommended)' },
                        { value: 'long', label: 'Long', desc: '8-10 paragraphs' }
                      ].map((option) => (
                        <label key={option.value} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                          summaryLength === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}>
                          <input
                            type="radio"
                            value={option.value}
                            checked={summaryLength === option.value}
                            onChange={(e) => setSummaryLength(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{option.label}</p>
                            <p className="text-xs text-gray-600">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateSummary}
                    disabled={!selectedFile || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isProcessing ? `Summarizing... ${progress}%` : 'Generate Summary'}
                  </button>

                  {selectedFile && (
                    <button
                      onClick={handleReset}
                      className="w-full text-sm text-gray-600 hover:text-gray-900 font-semibold py-2"
                    >
                      Start Over
                    </button>
                  )}
                </>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>

              {!selectedFile ? (
                <div className="p-12 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No PDF selected</p>
                  <p className="text-sm text-gray-500">Upload a PDF to generate a summary</p>
                </div>
              ) : isProcessing ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-12 h-12 text-blue-400 mx-auto mb-3 animate-spin" />
                  <p className="text-gray-600 font-medium">Generating summary...</p>
                  <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
                </div>
              ) : result && summary ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-bold">WORDS</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{result.wordCount}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-bold">READ TIME</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{result.readingTime}min</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-bold">LENGTH</p>
                      <p className="text-lg font-bold text-blue-600 mt-1 capitalize">{summaryLength}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200 max-h-64 overflow-y-auto">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{summary}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(summary)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 font-semibold"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center bg-blue-50 rounded-xl border-2 border-blue-200">
                  <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Ready to summarize</p>
                  <p className="text-sm text-gray-500">Select a summary length and click "Generate Summary"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
