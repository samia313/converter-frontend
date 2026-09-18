'use client';

import { useState, useRef } from 'react';
import { Download, X, AlertCircle, CheckCircle } from 'lucide-react';

interface FileItem {
  file: File;
  id: string;
  size: number;
  name: string;
}

export default function MergePDFTool() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const newFileItems: FileItem[] = [];

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];

      if (file.type !== 'application/pdf') {
        setError(`"${file.name}" is not a PDF`);
        continue;
      }

      if (file.size > 100 * 1024 * 1024) {
        setError(`"${file.name}" exceeds 100MB limit`);
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

  const handleDragLeave = () => {
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
      setError('Select at least 2 PDF files');
      return;
    }

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > 500 * 1024 * 1024) {
      setError('Total size exceeds 500MB');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      const formData = new FormData();
      files.forEach((fileItem) => {
        formData.append('files', fileItem.file);
      });

      setProgress(30);

      const response = await fetch('/api/convert/merge-pdf', {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Status ${response.status}: ${text}`);
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error('Empty result');
      }

      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      const link = document.createElement('a');
      link.href = url;
      link.download = `merged-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setProgress(100);
      setSuccess(`Merged ${files.length} files!`);

      setTimeout(() => {
        setFiles([]);
        setProgress(0);
        setSuccess(null);
      }, 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-white">
            <h2 className="text-4xl font-bold mb-2">Merge PDF</h2>
            <p className="text-red-100">Combine multiple PDFs into one</p>
          </div>

          <div className="p-8">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
                isDragging ? 'border-red-600 bg-red-50' : 'border-gray-300 bg-gray-50'
              }`}
            >
              <p className="text-gray-600 text-lg font-medium">Drag PDFs here or click</p>
              <p className="text-gray-500 text-sm mt-2">Max 100MB per file · 500MB total</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800 text-sm">{success}</p>
              </div>
            )}

            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Selected ({files.length})</h3>
                <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                  {files.map((fileItem, index) => (
                    <div key={fileItem.id} className="flex items-center justify-between bg-white rounded p-3 border border-gray-200">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="bg-gray-200 text-gray-700 rounded px-2 py-1 text-sm font-medium w-6 h-6 flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-medium truncate">{fileItem.name}</p>
                          <p className="text-gray-500 text-sm">{formatFileSize(fileItem.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeFile(fileItem.id);
                        }}
                        className="ml-2 text-gray-400 hover:text-red-600"
                        aria-label={`Remove ${fileItem.name}`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <div className="text-sm text-gray-600 pt-2 border-t border-gray-200 mt-4 flex items-center justify-between gap-4">
                    <span>Total: <span className="font-semibold">{formatFileSize(totalSize)}</span></span>
                    <span>Limit: 500MB</span>
                  </div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing...</span>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {files.length > 0 && (
              <div className="mt-8 flex gap-4">
                <button
                  type="button"
                  onClick={handleMerge}
                  disabled={isProcessing || files.length < 2}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
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
                  type="button"
                  onClick={() => setFiles([])}
                  disabled={isProcessing}
                  className="px-8 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-900 font-semibold py-4 rounded-lg transition"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
