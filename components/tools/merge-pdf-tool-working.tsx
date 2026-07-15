'use client';

import { useState, useRef } from 'react';
import { Download, X, AlertCircle, CheckCircle } from 'lucide-react';

interface FileItem {
  file: File;
  id: string;
  size: number;
  name: string;
}

export default function MergePDFToolWorking() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [keepOrder, setKeepOrder] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes, k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const newFileItems: FileItem[] = [];
    
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      
      // Validate file type
      if (file.type !== 'application/pdf') {
        setError(`File "${file.name}" is not a PDF. Please upload PDF files only.`);
        continue;
      }

      // Validate file size (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        setError(`File "${file.name}" exceeds 100MB limit.`);
        continue;
      }

      newFileItems.push({
        file,
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        size: file.size,
        name: file.name,
      });
    }

    setFiles(prev => [...prev, ...newFileItems]);
    setError(null);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    // Validate total size
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > 500 * 1024 * 1024) {
      setError('Total file size exceeds 500MB limit. Please remove some files.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      console.log('[v0] Starting merge with', files.length, 'files');
      
      const formData = new FormData();
      files.forEach((fileItem) => {
        console.log('[v0] Adding file:', fileItem.name);
        formData.append('files', fileItem.file);
      });

      setProgress(30);

      console.log('[v0] Calling API...');
      const response = await fetch('/api/convert/merge-pdf', {
        method: 'POST',
        body: formData,
      });

      console.log('[v0] API Response status:', response.status);
      setProgress(70);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Merge failed with status ${response.status}`);
      }

      const blob = await response.blob();
      console.log('[v0] Received blob:', blob.size, 'bytes');

      if (blob.size === 0) {
        throw new Error('The merged PDF is empty. Please check your files.');
      }

      // Download the file
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setProgress(100);
      setSuccess(`Successfully merged ${files.length} files! Download started automatically.`);
      console.log('[v0] Merge completed successfully');
      
      // Reset after 2 seconds
      setTimeout(() => {
        setFiles([]);
        setProgress(0);
        setSuccess(null);
      }, 2000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to merge files. Please try again.';
      console.error('[v0] Merge error:', errorMsg);
      setError(errorMsg);
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setFiles([]);
    setError(null);
    setSuccess(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Merge PDF Files</h1>
            <p className="text-red-100 text-lg">Combine multiple PDFs into one document</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
                isDragging
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-6-12v12m0 0l-3-3m3 3l3-3"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-gray-600 text-lg font-medium">Drag and drop PDFs here</p>
              <p className="text-gray-500 text-sm mt-2">or click to select files</p>
              <p className="text-gray-400 text-xs mt-4">
                Maximum 100MB per file, 500MB total
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900 font-medium">Error</p>
                  <p className="text-red-800 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-900 font-medium">Success</p>
                  <p className="text-green-800 text-sm mt-1">{success}</p>
                </div>
              </div>
            )}

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Selected Files ({files.length})
                </h3>
                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  {files.map((fileItem, index) => (
                    <div
                      key={fileItem.id}
                      className="flex items-center justify-between bg-white rounded p-3 border border-gray-200"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="bg-gray-200 text-gray-700 rounded px-2 py-1 text-sm font-medium w-6 h-6 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-medium truncate">
                            {fileItem.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {formatFileSize(fileItem.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(fileItem.id)}
                        className="ml-2 text-gray-400 hover:text-red-600 transition"
                        title="Remove file"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <div className="text-sm text-gray-600 pt-2 border-t border-gray-200 mt-4">
                    Total size: <span className="font-semibold">{formatFileSize(totalSize)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Merge Options */}
            {files.length > 0 && (
              <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-4">Merge Options</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepOrder}
                    onChange={(e) => setKeepOrder(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-red-600"
                  />
                  <span className="text-gray-900">Keep original page order</span>
                </label>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && progress > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing...</span>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-red-600 h-2 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {files.length > 0 && (
              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleMerge}
                  disabled={isProcessing || files.length < 2}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Process Files
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  disabled={isProcessing}
                  className="px-8 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-900 font-semibold py-4 rounded-lg transition"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Empty State */}
            {files.length === 0 && !error && !success && (
              <div className="mt-8 text-center text-gray-500">
                <p className="text-sm">No files selected yet</p>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>Upload 2 or more PDF files</li>
                <li>Review your files and merge options</li>
                <li>Click "Process Files" to merge</li>
                <li>Download your merged PDF automatically</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
