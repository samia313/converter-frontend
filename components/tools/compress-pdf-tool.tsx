'use client';

import { useState, useRef } from 'react';
import { Download, CheckCircle, AlertCircle, Upload } from 'lucide-react';

interface CompressionResult { originalSize: number; compressedSize: number; reduction: number; }
const MAX_FILE_SIZE_MB = 100;
const REQUEST_TIMEOUT_MS = 105000;

export default function CompressPDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!(file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
      setError('Only PDF files are supported');
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`This tool currently accepts PDF files up to ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    setSelectedFile(file);
    setError(null);
    setDownloadUrl(null);
    setResult(null);
    setProgress(0);
  };

  const handleCompress = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);
    setResult(null);
    setProgress(0);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('level', compressionLevel);
      setProgress(30);

      const response = await fetch('/api/convert/compress-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      setProgress(70);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Compression failed');
      }

      const blob = await response.blob();
      const originalSize = selectedFile.size;
      const compressedSize = blob.size;
      const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
      setResult({ originalSize, compressedSize, reduction: Math.max(0, reduction) });
      setDownloadUrl(window.URL.createObjectURL(blob));
      setProgress(100);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Compression timed out. Please try a smaller PDF.');
      } else {
        setError(err instanceof Error ? err.message : 'Compression failed');
      }
      setProgress(0);
    } finally {
      clearTimeout(timeoutId);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = selectedFile.name.replace(/\.pdf$/i, '_compressed.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    setSelectedFile(null);
    setDownloadUrl(null);
    setResult(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">Compress PDF</h2>
          <p className="text-lg text-gray-600">Reduce PDF file size while preserving its document structure</p>
          <p className="text-sm text-gray-500 mt-2">Maximum file size: {MAX_FILE_SIZE_MB}MB</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <div onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center w-full p-10 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-all">
              <div className="text-center">
                <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-900">Click to select PDF</p>
                <p className="text-sm text-gray-500 mt-1">PDF files up to {MAX_FILE_SIZE_MB}MB</p>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" onChange={handleFileSelect} className="hidden" />
          </div>

          {selectedFile && (
            <div className="p-8 bg-blue-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Selected File</h3>
              <div className="p-4 bg-white rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-700 truncate flex-1">{selectedFile.name}</span>
                <span className="text-xs text-gray-500 ml-2">{(selectedFile.size / 1024 / 1024).toFixed(2)}MB</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 m-8 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {selectedFile && !downloadUrl && (
            <div className="p-8">
              <label htmlFor="compression-level" className="block text-sm font-semibold text-gray-900 mb-2">Compression level</label>
              <select
                id="compression-level"
                value={compressionLevel}
                onChange={(e) => setCompressionLevel(e.target.value as 'low' | 'medium' | 'high')}
                disabled={isProcessing}
                className="w-full mb-5 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
              >
                <option value="low">Low — preserve more quality</option>
                <option value="medium">Medium — balanced size and quality</option>
                <option value="high">High — smaller file, more quality loss</option>
              </select>
              <button type="button" onClick={handleCompress} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-3">
                {isProcessing && <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>}
                {isProcessing ? 'Compressing...' : 'Compress PDF'}
              </button>
              {isProcessing && (
                <>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-blue-700 text-sm text-center mt-3">{progress < 50 ? 'Reading your file...' : progress < 90 ? 'Compressing your PDF...' : 'Finalizing...'}</p>
                </>
              )}
            </div>
          )}

          {downloadUrl && result && (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-green-700 mb-2">Compression complete</p>
              <p className="text-sm text-gray-600 mb-6">Results can vary by PDF content. Image-heavy PDFs may see little size reduction.</p>
              <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
                <div><p className="text-xs text-gray-600">Original</p><p className="text-sm font-semibold text-gray-900">{(result.originalSize / 1024 / 1024).toFixed(2)}MB</p></div>
                <div><p className="text-xs text-gray-600">Output</p><p className="text-sm font-semibold text-gray-900">{(result.compressedSize / 1024 / 1024).toFixed(2)}MB</p></div>
                <div><p className="text-xs text-gray-600">Reduction</p><p className="text-sm font-semibold text-green-600">{result.reduction > 0 ? '-' : ''}{result.reduction}%</p></div>
              </div>
              <div className="flex gap-4 justify-center">
                <button type="button" onClick={handleDownload} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"><Download className="w-5 h-5" />Download</button>
                <button type="button" onClick={reset} className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg transition">Compress Another</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
