'use client';

import { useState, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function CompressPDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleCompress = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('quality', quality);

      // Add abort signal for timeout (15 seconds max)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('/api/convert/compress-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Processing timeout - file may be too large');
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
            <button
              onClick={handleCompress}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Compressing...' : 'Compress PDF'}
            </button>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-4">
                Compression completed successfully!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Compressed
                </button>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setDownloadUrl(null);
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
