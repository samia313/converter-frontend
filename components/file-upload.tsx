'use client';

import React, { useRef, useState } from 'react';
import { useFileUpload } from '@/lib/use-file-upload';

interface FileUploadProps {
  apiEndpoint: string;
  onSuccess?: (blob: Blob, fileName: string) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
  acceptText?: string;
  placeholder?: string;
  buttonText?: string;
}

export function FileUpload({
  apiEndpoint,
  onSuccess,
  onError,
  multiple = false,
  acceptText = 'PDF files',
  placeholder = 'Drag and drop your files here or click to select',
  buttonText = 'Choose Files',
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { isLoading, progress, error, success, fileName, upload, downloadFile, reset } =
    useFileUpload(apiEndpoint);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    await upload(files, {
      onSuccess: (blob) => {
        const downloadFileName = fileName || 'converted-file';
        downloadFile(blob, downloadFileName);
        onSuccess?.(blob, fileName);
      },
      onError: (err) => {
        onError?.(err);
      },
    });
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
    handleUpload(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpload(e.currentTarget.files);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Upload Area */}
      {!success && (
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            multiple={multiple}
            accept=".pdf"
            className="hidden"
            disabled={isLoading}
          />

          <div className="space-y-4">
            <div className="text-2xl">📄</div>
            <div>
              <p className="text-gray-700 font-medium">{placeholder}</p>
              <p className="text-sm text-gray-500 mt-2">Supports {acceptText}</p>
            </div>

            <button
              className="
                px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed
              "
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : buttonText}
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isLoading && (
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{fileName}</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !success && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-medium">Error</p>
          <p className="text-sm text-red-600 mt-1">{error}</p>
          <button
            onClick={reset}
            className="text-sm text-red-700 hover:text-red-800 underline mt-2"
          >
            Try again
          </button>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">✅</span>
            <div className="flex-1">
              <p className="text-sm text-green-700 font-medium">File converted successfully!</p>
              <p className="text-sm text-green-600 mt-1">
                {fileName} has been converted and is ready to download.
              </p>
              <button
                onClick={reset}
                className="text-sm text-green-700 hover:text-green-800 underline mt-2"
              >
                Convert another file
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
