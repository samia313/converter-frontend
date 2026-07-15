'use client';

import { useRef, useState, useCallback } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

interface FileUploadInputProps {
  onFileSelect: (file: File) => Promise<void>;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  description?: string;
}

export function FileUploadInput({
  onFileSelect,
  acceptedTypes = ['application/pdf'],
  maxSizeMB = 100,
  disabled = false,
  isLoading = false,
  label = 'Upload File',
  description,
}: FileUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const validateFile = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      if (!acceptedTypes.includes(file.type)) {
        return {
          valid: false,
          error: `Invalid file type. Accepted: ${acceptedTypes.map((t) => t.split('/')[1]).join(', ')}`,
        };
      }

      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB > maxSizeMB) {
        return {
          valid: false,
          error: `File size ${fileSizeMB.toFixed(2)}MB exceeds ${maxSizeMB}MB limit`,
        };
      }

      return { valid: true };
    },
    [acceptedTypes, maxSizeMB]
  );

  const handleFile = useCallback(
    async (file: File) => {
      const validation = validateFile(file);

      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        setSelectedFile(null);
        return;
      }

      setError('');
      setSelectedFile(file);
      setDragActive(false);

      try {
        await onFileSelect(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
        setSelectedFile(null);
      }
    },
    [validateFile, onFileSelect]
  );

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    if (!disabled && !isLoading) {
      inputRef.current?.click();
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setError('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        } ${(disabled || isLoading) && 'opacity-50 cursor-not-allowed'}`}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          accept={acceptedTypes.join(',')}
          disabled={disabled || isLoading}
          className="hidden"
          aria-label="File upload"
        />

        {/* Upload Icon & Text */}
        {!selectedFile ? (
          <div className="space-y-2">
            <Upload className="h-10 w-10 mx-auto text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isLoading ? 'Processing...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {description || `Max ${maxSizeMB}MB`}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-medium text-green-700">
                {selectedFile.name}
              </p>
            </div>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Upload Error</p>
            <p className="text-xs mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* File Info & Clear Button */}
      {selectedFile && !error && (
        <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
          <p className="text-xs text-blue-700 truncate">
            Ready to process: {selectedFile.name}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="flex-shrink-0 text-blue-600 hover:text-blue-700 p-1"
            aria-label="Clear file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
