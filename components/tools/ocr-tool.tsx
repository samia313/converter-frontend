'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Copy, Download } from 'lucide-react';

export default function OCRTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const handleExtractText = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/convert/ocr', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('OCR extraction failed');
      }

      const data = await response.json();
      setExtractedText(data.text || 'No text found in document');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Extraction failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyText = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
    }
  };

  const handleDownloadText = () => {
    if (extractedText) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(extractedText));
      element.setAttribute('download', selectedFile?.name.replace(/\.(pdf|jpg|png)$/i, '.txt') || 'extracted.txt');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            OCR - Extract Text
          </h1>
          <p className="text-lg text-gray-600">
            Extract text from scanned documents and images
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upload Document
            </h3>
            <FileUploader
              accept=".pdf,.jpg,.png,.jpeg"
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              maxSizeMB={50}
            />

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleExtractText}
              disabled={!selectedFile || isProcessing}
              className="w-full mt-8 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Extracting Text...' : 'Extract Text'}
            </button>
          </div>

          {/* Results Area */}
          {extractedText && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Extracted Text
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                <p className="text-gray-700 text-sm whitespace-pre-wrap">
                  {extractedText}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyText}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy Text
                </button>
                <button
                  onClick={handleDownloadText}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                  <Download className="w-4 h-4" />
                  Save as TXT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
