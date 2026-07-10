'use client';

import { useState, useEffect } from 'react';
import { Download, Trash2, GripVertical, CheckCircle, AlertCircle } from 'lucide-react';

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Validate file types
      const validFiles: File[] = [];
      const invalidFiles: File[] = [];
      
      newFiles.forEach(file => {
        const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        if (isPDF) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      });
      
      // Show error if there are invalid files
      if (invalidFiles.length > 0) {
        const invalidNames = invalidFiles.map(f => f.name).join(', ');
        const hasDocx = invalidFiles.some(f => f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || f.name.toLowerCase().endsWith('.docx'));
        
        if (hasDocx) {
          setError(`Word documents detected: ${invalidNames}\n\nTo merge Word files: First convert them to PDF using the "Word to PDF" tool, then merge them together.`);
        } else {
          setError(`Invalid file format: ${invalidNames}\n\nOnly PDF files can be merged. Please select PDF files.`);
        }
      } else {
        setError(null);
      }
      
      // Add only valid PDF files
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
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      setProgress(30);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch('/api/convert/merge-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed: ${response.statusText}`);
      }

      setProgress(80);

      const blob = await response.blob();
      const filesCount = parseInt(response.headers.get('X-Merged-Files') || '0');
      const totalPages = parseInt(response.headers.get('X-Total-Pages') || '0');
      const outputSize = parseInt(response.headers.get('X-Output-Size') || String(blob.size));

      setResult({
        filesCount,
        totalPages,
        outputSize,
      });

      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Processing timeout - merge took too long. Try with fewer files.');
      } else if (err instanceof Error && err.message.includes('429')) {
        setError('Too many requests. Please wait a moment and try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Merge failed');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        window.URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Merge PDF Files
          </h1>
          <p className="text-lg text-gray-600">
            Combine multiple PDF files into one
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* File Upload Area */}
          <div className="mb-8">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Only PDF files can be merged.</strong> If you have Word documents, Excel files, or images, use the appropriate conversion tool first (Word to PDF, Excel to PDF, Image to PDF) to convert them to PDF format.
              </p>
            </div>
            <label className="flex items-center justify-center w-full p-8 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:bg-green-50 transition">
              <div className="text-center">
                <p className="text-gray-600 font-semibold">
                  Click to select PDF files
                </p>
                <p className="text-sm text-gray-500">
                  Select 2 or more PDFs to merge
                </p>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 text-sm">
                        {index + 1}. {file.name}
                      </span>
                      <span className="text-gray-500 text-xs ml-auto">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="p-2 hover:bg-red-100 rounded transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm whitespace-pre-wrap">{error}</p>
            </div>
          )}

          {/* Stats */}
          {selectedFiles.length > 0 && !downloadUrl && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-blue-600 font-semibold">TOTAL FILES</p>
                  <p className="text-2xl font-bold text-blue-900">{selectedFiles.length}</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-semibold">TOTAL SIZE</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {(totalSize / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!downloadUrl ? (
            <>
              <button
                onClick={handleMerge}
                disabled={selectedFiles.length < 2 || isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                {isProcessing && (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>{isProcessing ? 'Merging PDFs...' : 'Merge PDF Files'}</span>
              </button>
              {isProcessing && (
                <div className="mt-4 space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-green-700 text-sm text-center font-medium">
                    {progress < 50 && 'Reading PDF files...'}
                    {progress >= 50 && progress < 90 && 'Merging pages...'}
                    {progress >= 90 && 'Finalizing...'}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-green-600 font-semibold text-lg">
                  PDFs merged successfully!
                </p>
              </div>

              {result && (
                <div className="grid grid-cols-3 gap-4 bg-green-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-green-600">FILES MERGED</p>
                    <p className="text-2xl font-bold text-green-900">{result.filesCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-600">TOTAL PAGES</p>
                    <p className="text-2xl font-bold text-green-900">{result.totalPages}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-600">OUTPUT SIZE</p>
                    <p className="text-2xl font-bold text-green-900">
                      {(result.outputSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Merged PDF
                </button>
                <button
                  onClick={() => {
                    setSelectedFiles([]);
                    setDownloadUrl(null);
                    setResult(null);
                    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
                  }}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg"
                >
                  Merge More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
