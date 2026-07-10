'use client';

import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}

export default function FileUploader({
  onFileSelected,
  accept = '.pdf',
  multiple = false,
  maxSize = 50,
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB limit`;
    }
    return null;
  };

  const handleFiles = (files: FileList) => {
    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        newFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert('Error: ' + errors.join('\n'));
    }

    if (newFiles.length > 0) {
      if (multiple) {
        setSelectedFiles([...selectedFiles, ...newFiles]);
        onFileSelected([...selectedFiles, ...newFiles]);
      } else {
        setSelectedFiles([newFiles[0]]);
        onFileSelected([newFiles[0]]);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelected(newFiles);
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive
            ? 'border-red-600 bg-red-50'
            : 'border-gray-300 hover:border-red-600'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="text-lg font-semibold text-gray-700 mb-1">
          Drop your files here
        </p>
        <p className="text-sm text-gray-500">
          or click to browse
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
