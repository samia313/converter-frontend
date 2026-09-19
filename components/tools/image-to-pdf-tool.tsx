'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function ImageToPDFTool() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!selectedFiles.length) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append('files', file));

      const response = await fetch('/api/convert/image-to-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Image to PDF conversion failed.');
      }

      const blob = await response.blob();
      setDownloadUrl(window.URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image to PDF conversion failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = selectedFiles.length === 1
      ? `${selectedFiles[0].name.replace(/\.[^.]+$/, '')}.pdf`
      : 'images.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    setSelectedFiles([]);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Image to PDF Converter</h1>
          <p className="text-lg text-gray-600">Convert JPG and PNG images into PDF pages</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader
            accept=".jpg,.jpeg,.png"
            multiple
            onFileSelected={setSelectedFiles}
            maxSize={100}
          />

          {selectedFiles.length > 0 && (
            <p className="mt-4 text-sm text-gray-600">
              {selectedFiles.length} image{selectedFiles.length === 1 ? '' : 's'} selected · Maximum 30 images
            </p>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {!downloadUrl ? (
            <button
              onClick={handleConvert}
              disabled={!selectedFiles.length || isProcessing}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Converting...' : 'Convert to PDF'}
            </button>
          ) : (
            <div className="text-center mt-6">
              <p className="text-green-600 font-semibold mb-4">PDF created successfully.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleDownload} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button onClick={reset} className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg">
                  Convert More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
