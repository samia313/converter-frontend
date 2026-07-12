'use client';

import { useState, useRef } from 'react';
import { Download, Trash2, Plus, AlertCircle, CheckCircle } from 'lucide-react';

interface MergeResult {
  filesCount: number;
  totalPages: number;
  outputSize: number;
}

export default function MergePDFTool() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [result, setResult] = useState<MergeResult | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
      
      if (validFiles.length !== newFiles.length) {
        setError('Some files were skipped. Only PDF files are supported.');
      } else {
        setError(null);
      }
      
      if (validFiles.length > 0) {
        setSelectedFiles([...selectedFiles, ...validFiles]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      setError('Please select at least 2 PDF files');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => formData.append('files', file));

      setProgress(30);

      const response = await fetch('/api/convert/merge-pdf', {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        throw new Error('Merge failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      setResult({
        filesCount: selectedFiles.length,
        totalPages: parseInt(response.headers.get('X-Total-Pages') || '0'),
        outputSize: blob.size,
      });

      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Merge failed');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'merged.pdf';
      link.click();
    }
  };

  const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
            Merge PDF Files
          </h1>
          <p className="text-lg text-gray-600">
            Combine multiple PDFs into one file instantly
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Upload Area */}
          <div className="p-8 border-b border-gray-200">
            <label 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center w-full p-10 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-all"
            >
              <div className="text-center">
                <Plus className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-900">Click to add PDF files</p>
                <p className="text-sm text-gray-500 mt-1">Or drag and drop files here</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="p-8 bg-blue-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <span className="text-sm text-gray-700 truncate flex-1">
                      {index + 1}. {file.name}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {(file.size / 1024 / 1024).toFixed(2)}MB
                    </span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="ml-3 p-1 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-blue-600">TOTAL FILES</p>
                  <p className="text-2xl font-bold text-blue-900">{selectedFiles.length}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-600">TOTAL SIZE</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {(totalSize / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 mx-8 mt-8 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {downloadUrl && result && (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-green-700 mb-6">
                PDFs merged successfully!
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8 bg-green-50 p-4 rounded-lg">
                <div>
                  <p className="text-xs font-semibold text-green-600">FILES</p>
                  <p className="text-2xl font-bold text-green-900">{result.filesCount}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-600">PAGES</p>
                  <p className="text-2xl font-bold text-green-900">{result.totalPages}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-600">SIZE</p>
                  <p className="text-2xl font-bold text-green-900">
                    {(result.outputSize / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    setSelectedFiles([]);
                    setDownloadUrl(null);
                    setResult(null);
                    setError(null);
                    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
                  }}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg transition"
                >
                  Merge More
                </button>
              </div>
            </div>
          )}

          {/* Merge Button */}
          {!downloadUrl && selectedFiles.length > 0 && (
            <div className="p-8">
              <button
                onClick={handleMerge}
                disabled={isProcessing || selectedFiles.length < 2}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Merging PDFs...
                  </>
                ) : (
                  'Merge PDF Files'
                )}
              </button>
              {isProcessing && (
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2 transition-all" 
                    style={{width: `${progress}%`}}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
