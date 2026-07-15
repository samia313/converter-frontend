'use client';

import React, { useState, useRef } from 'react';
import { Download, X, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface UniversalToolProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
  icon: React.ReactNode;
  acceptedFileTypes?: string[];
  allowMultipleFiles?: boolean;
  maxFileSize?: number; // in MB
  toolColor?: string;
}

interface FileItem {
  id: string;
  file: File;
  size: number;
  name: string;
}

export function UniversalTool({
  toolId,
  toolName,
  toolDescription,
  icon,
  acceptedFileTypes = ['.pdf'],
  allowMultipleFiles = false,
  maxFileSize = 100,
  toolColor = '#cc0000',
}: UniversalToolProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    if (!allowMultipleFiles && files.length > 0) {
      setError('Only one file allowed for this tool');
      return;
    }

    const newFileItems: FileItem[] = [];
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      
      // Check file type
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedFileTypes.includes(fileExt)) {
        setError(`${file.name} is not supported. Accepted: ${acceptedFileTypes.join(', ')}`);
        continue;
      }

      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        setError(`${file.name} exceeds ${maxFileSize}MB limit`);
        continue;
      }

      newFileItems.push({
        file,
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        size: file.size,
        name: file.name,
      });
    }

    if (!allowMultipleFiles && newFileItems.length > 1) {
      setFiles([newFileItems[0]]);
      setError('Only one file allowed for this tool');
    } else {
      setFiles(prev => [...prev, ...newFileItems]);
    }

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

  const handleProcess = async () => {
    if (files.length === 0) {
      setError('Please select files to process');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('operation', toolId);

      if (allowMultipleFiles) {
        files.forEach(f => formData.append('files', f.file));
      } else {
        formData.append('file', files[0].file);
      }

      setProgress(30);

      const response = await fetch('/api/tools/execute', {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Processing failed');
      }

      // Check if response is a file download
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/pdf') || contentType?.includes('application/octet-stream')) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${toolId}-${Date.now()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        setSuccess(data.message || 'Processing completed successfully');
      }

      setProgress(100);
      setTimeout(() => {
        setFiles([]);
        setProgress(0);
        setSuccess(null);
      }, 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Processing failed';
      console.error('[v0] Error:', msg);
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
          {/* Header */}
          <div className="px-8 py-12 text-white" style={{ background: `linear-gradient(135deg, ${toolColor}, ${toolColor}dd)` }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{icon}</div>
              <div>
                <h1 className="text-4xl font-bold">{toolName}</h1>
                <p className="text-white/80 mt-1">{toolDescription}</p>
              </div>
            </div>
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
                isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-gray-50'
              }`}
            >
              <p className="text-gray-600 text-lg font-medium">Drag files here or click</p>
              <p className="text-gray-500 text-sm mt-2">Max {maxFileSize}MB per file</p>
              <p className="text-gray-500 text-xs mt-1">Supported: {acceptedFileTypes.join(', ')}</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple={allowMultipleFiles}
                accept={acceptedFileTypes.join(',')}
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-800 text-sm">{success}</p>
              </div>
            )}

            {/* Files List */}
            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Selected ({files.length})
                </h3>
                <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                  {files.map((fileItem, index) => (
                    <div key={fileItem.id} className="flex items-center justify-between bg-white rounded p-3 border border-gray-200">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="bg-gray-200 text-gray-700 rounded px-2 py-1 text-sm font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-medium truncate">{fileItem.name}</p>
                          <p className="text-gray-500 text-sm">{formatFileSize(fileItem.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(fileItem.id)}
                        className="ml-2 text-gray-400 hover:text-red-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {totalSize > 0 && (
                    <div className="text-sm text-gray-600 pt-2 border-t border-gray-200 mt-4">
                      Total: <span className="font-semibold">{formatFileSize(totalSize)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Progress */}
            {isProcessing && (
              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing...</span>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 transition-all duration-300"
                    style={{ width: `${progress}%`, background: toolColor }}
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            {files.length > 0 && (
              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleProcess}
                  disabled={isProcessing || files.length === 0}
                  className="flex-1 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${toolColor}, ${toolColor}dd)`,
                    opacity: isProcessing ? 0.7 : 1,
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Process
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setFiles([]);
                    setError(null);
                  }}
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

export default UniversalTool;
