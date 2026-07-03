'use client';

import { Upload, Download, X } from 'lucide-react';
import { useState } from 'react';

interface ToolTemplateProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
  onBack: () => void;
  children?: React.ReactNode;
}

export default function ToolTemplate({
  toolId,
  toolName,
  toolDescription,
  onBack,
  children,
}: ToolTemplateProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
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
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          <X className="w-4 h-4 rotate-45" />
          Back to Tools
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{toolName}</h1>
        <p className="text-gray-600">{toolDescription}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? 'border-red-600 bg-red-50'
                : 'border-gray-300 bg-gray-50 hover:border-red-600'
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Drop your files here
              </p>
              <p className="text-gray-600 mb-4">or click to browse</p>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.html"
              />
              <label
                htmlFor="file-input"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium cursor-pointer transition-colors"
              >
                Select Files
              </label>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Selected Files ({files.length})
              </h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <span className="text-gray-700">{file.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Content */}
          {children && <div className="mt-8">{children}</div>}

          {/* Action Buttons */}
          {files.length > 0 && (
            <div className="mt-8 flex gap-4">
              <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Process Files
              </button>
              <button
                onClick={() => setFiles([])}
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">About this tool</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900 mb-1">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>High quality processing</li>
                <li>Fast & secure</li>
                <li>100% free</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">File support:</p>
              <p>PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG, GIF, HTML</p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Your files are processed locally in your browser and are never uploaded to our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
