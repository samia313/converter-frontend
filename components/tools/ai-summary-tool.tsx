'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Copy, Download } from 'lucide-react';

export default function AISummaryTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium');

  const handleGenerateSummary = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('length', summaryLength);

      const response = await fetch('/api/convert/ai-summary', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Summary generation failed');
      }

      const data = await response.json();
      setSummary(data.summary || 'Could not generate summary');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate summary');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopySummary = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
    }
  };

  const handleDownloadSummary = () => {
    if (summary) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(summary));
      element.setAttribute('download', 'summary.txt');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Document Summary
          </h1>
          <p className="text-lg text-gray-600">
            Generate intelligent summaries of your PDF documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upload PDF
            </h3>
            <FileUploader
              accept=".pdf"
              onFileSelected={(files) => setSelectedFile(files[0] || null)}
              
              maxSize={50}
            />

            {/* Summary Length Selection */}
            <div className="mt-8 mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Summary Length
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['short', 'medium', 'long'] as const).map((length) => (
                  <label
                    key={length}
                    className={`p-3 text-center cursor-pointer rounded-lg border-2 transition ${
                      summaryLength === length
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="length"
                      value={length}
                      checked={summaryLength === length}
                      onChange={(e) => setSummaryLength(e.target.value as typeof summaryLength)}
                      className="hidden"
                    />
                    <div className="font-semibold text-sm text-gray-900 capitalize">
                      {length}
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
              onClick={handleGenerateSummary}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Generating Summary...' : 'Generate Summary'}
            </button>
          </div>

          {/* Results Area */}
          {summary && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI Summary
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {summary}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopySummary}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button
                  onClick={handleDownloadSummary}
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
