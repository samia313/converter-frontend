'use client';

import { useState, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download, CheckCircle, AlertCircle } from 'lucide-react';

interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  reduction: number;
}

export default function CompressPDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [progress, setProgress] = useState(0);

  const handleCompress = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('quality', quality);

      // Add abort signal for timeout (30 seconds max)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      setProgress(30); // Simulated progress

      const response = await fetch('/api/convert/compress-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed: ${response.statusText}`);
      }

      setProgress(80);

      const blob = await response.blob();
      const originalSize = selectedFile.size;
      const compressedSize = blob.size;
      const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      // Extract metrics from response headers
      const xReduction = response.headers.get('X-Compression-Ratio');
      const xOriginal = response.headers.get('X-Original-Size');
      const xCompressed = response.headers.get('X-Compressed-Size');

      setResult({
        originalSize: parseInt(xOriginal || String(originalSize)),
        compressedSize: parseInt(xCompressed || String(compressedSize)),
        reduction: parseInt(xReduction || String(Math.max(0, reduction))),
      });

      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Processing timeout - file may be too large or connection lost');
      } else if (err instanceof Error && err.message.includes('429')) {
        setError('Too many requests. Please wait a moment and try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Compression failed');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && selectedFile) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = selectedFile.name.replace('.pdf', '_compressed.pdf');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        window.URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compress PDF
          </h1>
          <p className="text-lg text-gray-600">
            Reduce PDF file size without losing quality
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader
            accept=".pdf"
            onFileSelected={(files) => setSelectedFile(files[0] || null)}
            
            maxSize={50}
          />

          {/* Quality Selection */}
          <div className="mt-8 mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Compression Quality
            </label>
            <div className="grid grid-cols-3 gap-4">
              {(['high', 'medium', 'low'] as const).map((q) => (
                <label
                  key={q}
                  className={`p-4 text-center cursor-pointer rounded-lg border-2 transition ${
                    quality === q
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="quality"
                    value={q}
                    checked={quality === q}
                    onChange={(e) => setQuality(e.target.value as typeof quality)}
                    className="hidden"
                  />
                  <div className="font-semibold text-gray-900 capitalize">{q}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {q === 'high' && 'Best Quality'}
                    {q === 'medium' && 'Balanced'}
                    {q === 'low' && 'Smaller Size'}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {!downloadUrl ? (
            <>
              <button
                onClick={handleCompress}
                disabled={!selectedFile || isProcessing}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                {isProcessing && (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>{isProcessing ? 'Processing...' : 'Compress PDF'}</span>
              </button>
              {isProcessing && (
                <div className="mt-4 space-y-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-blue-700 text-sm text-center">
                    {progress < 50 && 'Reading your file...'}
                    {progress >= 50 && progress < 90 && 'Compressing your PDF...'}
                    {progress >= 90 && 'Finalizing...'}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-green-600 font-semibold text-lg">
                  Compression successful!
                </p>
              </div>

              {result && (
                <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600">Original</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {(result.originalSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Compressed</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {(result.compressedSize / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Reduction</p>
                    <p className="text-sm font-semibold text-green-600">
                      {result.reduction > 0 ? '-' : '+'}{Math.abs(result.reduction)}%
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setDownloadUrl(null);
                    setResult(null);
                    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
                  }}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg"
                >
                  Compress Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
