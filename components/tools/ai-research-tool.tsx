'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Search, Download, Copy } from 'lucide-react';

export default function AIResearchTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [researchType, setResearchType] = useState('insights');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', researchType);

      const response = await fetch('/api/convert/ai-research', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResults(data.analysis || 'Could not analyze document');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze document');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (results) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(results));
      element.setAttribute('download', 'research-analysis.txt');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleCopy = () => {
    if (results) {
      navigator.clipboard.writeText(results);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Search className="w-8 h-8 text-cyan-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              AI Research Assistant
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Extract insights, key findings, and comprehensive analysis from your documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload & Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Upload Research Document
            </h3>

            <FileUploader
              accept=".pdf,.txt,.doc,.docx"
              onFileSelected={(files) => setSelectedFile(files[0] || null)}
              maxSize={50}
            />

            {/* Analysis Type Selection */}
            <div className="mt-8 mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Analysis Type
              </label>
              <div className="space-y-2">
                {[
                  { value: 'insights', label: 'Key Insights & Findings' },
                  { value: 'summary', label: 'Executive Summary' },
                  { value: 'methodology', label: 'Methodology Analysis' },
                  { value: 'conclusion', label: 'Conclusion & Implications' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`block p-3 cursor-pointer rounded-lg border-2 transition ${
                      researchType === option.value
                        ? 'border-cyan-600 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={option.value}
                      checked={researchType === option.value}
                      onChange={(e) => setResearchType(e.target.value)}
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
              onClick={handleAnalyze}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Analyzing...' : 'Analyze Document'}
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Research Analysis
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto mb-4">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {results}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
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
