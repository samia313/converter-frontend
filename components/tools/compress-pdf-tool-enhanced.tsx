'use client';

import { useState } from 'react';
import { Download, Upload, Loader2, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

interface CompressResult {
  originalSize: number;
  compressedSize: number;
  compression: number;
  message: string;
}

export default function CompressPDFToolEnhanced() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState('medium');

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
      setSelectedFile(file);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('quality', quality);

      setProgress(25);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch('/api/convert/compress-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to compress PDF');
      }

      setProgress(75);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const compression = Math.round(((selectedFile.size - blob.size) / selectedFile.size) * 100);

      setDownloadUrl(url);
      setResult({
        originalSize: selectedFile.size,
        compressedSize: blob.size,
        compression: compression,
        message: 'PDF compressed successfully!'
      });
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compress PDF');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `compressed-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError(null);
    setDownloadUrl(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Compress PDF</h1>
          </div>
          <p className="text-lg text-gray-600">Reduce PDF file size while maintaining quality</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select PDF</h2>
                <FileUploader
                  accept=".pdf"
                  onFileSelected={handleFileSelect}
                  maxSize={500}
                />

                {selectedFile && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-gray-900">{selectedFile.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <>
                  <div className="border-t pt-4">
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Compression Quality
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'low', label: 'Low', desc: 'Maximum compression' },
                        { value: 'medium', label: 'Medium', desc: 'Balanced (Recommended)' },
                        { value: 'high', label: 'High', desc: 'Best quality' }
                      ].map((option) => (
                        <label key={option.value} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                          quality === option.value 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}>
                          <input
                            type="radio"
                            value={option.value}
                            checked={quality === option.value}
                            onChange={(e) => setQuality(e.target.value)}
                            className="w-4 h-4"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{option.label}</p>
                            <p className="text-xs text-gray-600">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleCompress}
                    disabled={!selectedFile || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isProcessing ? `Compressing... ${progress}%` : 'Compress PDF'}
                  </button>

                  {selectedFile && (
                    <button
                      onClick={handleReset}
                      className="w-full text-sm text-gray-600 hover:text-gray-900 font-semibold py-2"
                    >
                      Start Over
                    </button>
                  )}
                </>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Results</h2>

              {!selectedFile ? (
                <div className="p-12 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No PDF selected</p>
                  <p className="text-sm text-gray-500">Upload a PDF file to compress</p>
                </div>
              ) : result && downloadUrl ? (
                <div className="space-y-4">
                  <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <span className="font-bold text-green-900">Compression Complete!</span>
                    </div>
                    <p className="text-sm text-green-800">{result.message}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-semibold">ORIGINAL SIZE</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {(result.originalSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 font-semibold">COMPRESSED SIZE</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">
                        {(result.compressedSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-gray-600 font-semibold">REDUCTION</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">
                        {result.compression}%
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    <Download className="w-6 h-6" />
                    Download Compressed PDF
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 font-semibold py-2 border-2 border-gray-300 rounded-lg transition"
                  >
                    Compress Another PDF
                  </button>
                </div>
              ) : isProcessing ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-12 h-12 text-blue-400 mx-auto mb-3 animate-spin" />
                  <p className="text-gray-600 font-medium">Compressing your PDF...</p>
                  <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
                </div>
              ) : (
                <div className="p-12 text-center bg-blue-50 rounded-xl border-2 border-blue-200">
                  <Zap className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Ready to compress</p>
                  <p className="text-sm text-gray-500">Select compression level and click "Compress PDF"</p>
                </div>
              )}

              {/* Info Section */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-bold text-gray-900 mb-3">Compression Levels:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><strong>Low:</strong> Maximum compression, smallest file size, slight quality loss</li>
                  <li><strong>Medium:</strong> Balanced compression, good quality, recommended</li>
                  <li><strong>High:</strong> Minimal compression, best quality, larger file size</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
