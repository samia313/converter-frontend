'use client';

import { useState } from 'react';
import { Download, Trash2, Upload, Loader2, CheckCircle2, AlertCircle, GripVertical, File, Zap } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

interface MergeResult {
  filesCount: number;
  totalPages: number;
  outputSize: number;
  successMessage: string;
}

export default function MergePDFToolEnhanced() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [result, setResult] = useState<MergeResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleFileSelect = (files: File[]) => {
    const newFiles = files.filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
    
    if (files.length !== newFiles.length) {
      setError('Only PDF files are supported. Invalid files were ignored.');
    } else {
      setError(null);
    }
    
    if (newFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    if (selectedFiles.length <= 1) {
      setDownloadUrl(null);
      setResult(null);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem !== null && draggedItem !== index) {
      const newFiles = [...selectedFiles];
      [newFiles[draggedItem], newFiles[index]] = [newFiles[index], newFiles[draggedItem]];
      setSelectedFiles(newFiles);
      setDraggedItem(index);
    }
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
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      setProgress(25);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch('/api/convert/merge-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to merge PDFs');
      }

      setProgress(75);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setResult({
        filesCount: selectedFiles.length,
        totalPages: 0,
        outputSize: blob.size,
        successMessage: 'PDFs merged successfully!'
      });
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to merge PDFs');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `merged-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
    setError(null);
    setDownloadUrl(null);
    setResult(null);
    setProgress(0);
  };

  const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Merge PDF Files</h1>
          </div>
          <p className="text-lg text-gray-600">Combine multiple PDFs into one document instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Files</h2>
              
              <FileUploader
                accept=".pdf"
                onFileSelected={handleFileSelect}
                maxSize={100}
              />

              {selectedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Total size: {(totalSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    onClick={handleMerge}
                    disabled={selectedFiles.length < 2 || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isProcessing ? `Processing... ${progress}%` : 'Merge PDFs'}
                  </button>

                  {selectedFiles.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="w-full text-sm text-gray-600 hover:text-gray-900 font-semibold py-2 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear All
                    </button>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {result && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">{result.successMessage}</p>
                    <p className="text-xs text-green-700">Output: {(result.outputSize / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* File List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Merge Order</h2>
              
              {selectedFiles.length === 0 ? (
                <div className="p-12 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No files selected</p>
                  <p className="text-sm text-gray-500">Upload PDF files to see them here</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={() => setDraggedItem(null)}
                      className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 transition cursor-move ${
                        draggedItem === index ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <File className="w-5 h-5 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">#{index + 1}</span>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {result && downloadUrl && (
                <div className="mt-6 pt-6 border-t">
                  <button
                    onClick={handleDownload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Merged PDF
                  </button>
                </div>
              )}

              {/* Info Section */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">How it works:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Upload multiple PDF files</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Drag to reorder files</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Click Merge to combine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">4.</span>
                    <span>Download your merged PDF</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
