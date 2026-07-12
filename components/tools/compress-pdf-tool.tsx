'use client';

import { useState, useRef } from 'react';
import { Download, CheckCircle, AlertCircle, Upload } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
        setError(null);
        setDownloadUrl(null);
        setResult(null);
      } else {
        setError('Only PDF files are supported');
      }
    }
  };

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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      setProgress(30);

      const response = await fetch('/api/convert/compress-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Compression failed');
      }

      setProgress(80);

      const blob = await response.blob();
      const originalSize = selectedFile.size;
      const compressedSize = blob.size;
      const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      setResult({
        originalSize,
        compressedSize,
        reduction: Math.max(0, reduction),
      });

      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compression failed');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && selectedFile) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = selectedFile.name.replace('.pdf', '_compressed.pdf');
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
            Compress PDF
          </h1>
          <p className="text-lg text-gray-600">
            Reduce file size while maintaining quality
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* File Upload */}
          <div className="p-8 border-b border-gray-200">
            <label 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center w-full p-10 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-all"
            >
              <div className="text-center">
                <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-900">Click to select PDF</p>
                <p className="text-sm text-gray-500 mt-1">Select a PDF file to compress</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="p-8 bg-blue-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Selected File</h3>
              <div className="p-4 bg-white rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-700 truncate flex-1">{selectedFile.name}</span>
                <span className="text-xs text-gray-500 ml-2">{(selectedFile.size / 1024 / 1024).toFixed(2)}MB</span>
              </div>
            </div>
          )}

          {/* Quality Selection */}
          {selectedFile && (
            <div className="p-8 border-b border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Compression Quality</label>
              <div className="grid grid-cols-3 gap-4">
                {(['high', 'medium', 'low'] as const).map((q) => (
                  <label key={q} className={`p-4 text-center cursor-pointer rounded-lg border-2 transition ${quality === q ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                    <input type="radio" name="quality" value={q} checked={quality === q} onChange={(e) => setQuality(e.target.value as typeof quality)} className="hidden" />
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
          )}

          {/* Error */}
          {error && (
            <div className="p-4 m-8 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Compress Button */}
          {selectedFile && !downloadUrl && (
            <div className="p-8">
              <button onClick={handleCompress} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-3">
                {isProcessing && <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>}
                {isProcessing ? 'Compressing...' : 'Compress PDF'}
              </button>
              {isProcessing && (
                <>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-blue-700 text-sm text-center mt-3">
                    {progress < 50 && 'Reading your file...'}
                    {progress >= 50 && progress < 90 && 'Compressing your PDF...'}
                    {progress >= 90 && 'Finalizing...'}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Success */}
          {downloadUrl && result && (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-green-700 mb-6">Compression successful!</p>
              <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600">Original</p>
                  <p className="text-sm font-semibold text-gray-900">{(result.originalSize / 1024 / 1024).toFixed(2)}MB</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Compressed</p>
                  <p className="text-sm font-semibold text-gray-900">{(result.compressedSize / 1024 / 1024).toFixed(2)}MB</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Reduction</p>
                  <p className="text-sm font-semibold text-green-600">{result.reduction > 0 ? '-' : '+'}{Math.abs(result.reduction)}%</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <button onClick={handleDownload} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition">
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button onClick={() => { setSelectedFile(null); setDownloadUrl(null); setResult(null); if (downloadUrl) window.URL.revokeObjectURL(downloadUrl); }} className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg transition">
                  Compress Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
