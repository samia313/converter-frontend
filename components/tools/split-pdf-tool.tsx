'use client';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function SplitPDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const reset = () => {
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    setSelectedFile(null);
    setDownloadUrl(null);
    setError(null);
  };

  const handleSplit = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/convert/split-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let message = 'Split failed';
        try {
          const data = await response.json();
          if (typeof data?.error === 'string') message = data.error;
        } catch {
          // Keep the generic error when the response is not JSON.
        }
        throw new Error(message);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/zip')) {
        throw new Error('Split service returned an invalid file format');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Split failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = selectedFile.name.replace(/\.pdf$/i, '_split.zip');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Split PDF
          </h1>
          <p className="text-lg text-gray-600">
            Split your PDF into two downloadable parts
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader
            accept=".pdf"
            onFileSelected={(files) => {
              if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
              setDownloadUrl(null);
              setError(null);
              setSelectedFile(files[0] || null);
            }}
            maxSize={50}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {!downloadUrl ? (
            <button
              onClick={handleSplit}
              disabled={!selectedFile || isProcessing}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Splitting...' : 'Split PDF'}
            </button>
          ) : (
            <div className="text-center mt-8">
              <p className="text-green-600 font-semibold mb-4">
                Split completed! Download both parts as ZIP
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download ZIP
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg"
                >
                  Split Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
