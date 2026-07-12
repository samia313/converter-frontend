'use client';

import { useState } from 'react';
import { Download, Upload, Loader2, CheckCircle2, AlertCircle, Scissors } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

interface SplitResult {
  message: string;
  fileCount: number;
  size: number;
}

export default function SplitPDFToolEnhanced() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [result, setResult] = useState<SplitResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [splitType, setSplitType] = useState<'pages' | 'range'>('range');
  const [pageRange, setPageRange] = useState('');
  const [allPages, setAllPages] = useState(false);

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleSplit = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file');
      return;
    }

    if (splitType === 'range' && !pageRange.trim() && !allPages) {
      setError('Please enter page range (e.g., 1-3, 5, 7-9)');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      if (!allPages) {
        formData.append('pages', pageRange);
      }

      setProgress(25);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch('/api/convert/split-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to split PDF');
      }

      setProgress(75);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setResult({
        message: 'PDF split successfully!',
        fileCount: 1,
        size: blob.size,
      });
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to split PDF');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `split-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError(null);
    setDownloadUrl(null);
    setResult(null);
    setProgress(0);
    setPageRange('');
    setAllPages(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Scissors className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Split PDF</h1>
          </div>
          <p className="text-lg text-gray-600">Extract specific pages or split your PDF into separate files</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Upload PDF</h2>
                <FileUploader
                  accept=".pdf"
                  onFileSelected={handleFileSelect}
                  maxSize={100}
                />

                {selectedFile && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-gray-900">{selectedFile.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <>
                  <div className="border-t pt-4">
                    <h3 className="font-bold text-gray-900 mb-3">Split Type</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-blue-200 bg-blue-50 cursor-pointer">
                        <input
                          type="radio"
                          value="range"
                          checked={splitType === 'range'}
                          onChange={(e) => setSplitType(e.target.value as 'range')}
                          className="w-4 h-4"
                        />
                        <span className="font-medium text-gray-900">Extract Pages</span>
                      </label>
                    </div>
                  </div>

                  {splitType === 'range' && (
                    <div className="border-t pt-4">
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Page Range
                      </label>
                      <input
                        type="text"
                        value={pageRange}
                        onChange={(e) => setPageRange(e.target.value)}
                        placeholder="e.g., 1-3, 5, 7-9"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-600 mt-2">
                        Enter page numbers separated by commas or ranges with hyphens
                      </p>
                    </div>
                  )}

                  <div>
                    <button
                      onClick={handleSplit}
                      disabled={!selectedFile || isProcessing}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                      {isProcessing ? `Processing... ${progress}%` : 'Split PDF'}
                    </button>
                  </div>

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

              {result && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">{result.message}</p>
                    <p className="text-xs text-green-700">
                      Output: {(result.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview & Download Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Preview & Download</h2>

              {!selectedFile ? (
                <div className="p-12 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No PDF selected</p>
                  <p className="text-sm text-gray-500">Upload a PDF file to get started</p>
                </div>
              ) : result && downloadUrl ? (
                <div className="space-y-4">
                  <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <span className="font-bold text-green-900">Processing Complete!</span>
                    </div>
                    <p className="text-sm text-green-800">Your PDF has been successfully split and is ready to download.</p>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    <Download className="w-6 h-6" />
                    Download Split PDF
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 font-semibold py-2 border-2 border-gray-300 rounded-lg transition"
                  >
                    Split Another PDF
                  </button>
                </div>
              ) : (
                <div className="p-12 text-center bg-blue-50 rounded-xl border-2 border-blue-200">
                  <Scissors className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Ready to split</p>
                  <p className="text-sm text-gray-500">Fill in the page range and click "Split PDF" to extract pages</p>
                </div>
              )}

              {/* Info Section */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-bold text-gray-900 mb-3">Examples:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">1-3</span> - Extract pages 1 to 3</li>
                  <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">5</span> - Extract only page 5</li>
                  <li><span className="font-mono bg-gray-100 px-2 py-1 rounded">1-3,5,7-9</span> - Mix ranges and individual pages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
