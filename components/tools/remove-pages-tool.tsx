'use client';

import { useState, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function RemovePagesTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pagesToRemove, setPagesTRemove] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleRemove = async () => {
    if (!selectedFile || !pagesToRemove) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('pages', pagesToRemove);

      const response = await fetch('/api/convert/remove-pages', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Removal failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Removal failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && selectedFile) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = selectedFile.name.replace('.pdf', '_removed.pdf');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Remove Pages
          </h1>
          <p className="text-lg text-gray-600">
            Delete unwanted pages from PDF
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader
            accept=".pdf"
            onFileSelected={(files) => setSelectedFile(files[0] || null)}
            maxSize={50}
          />

          <div className="mt-8 mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pages to Remove (e.g., 1,3,5 or 2-4)
            </label>
            <input
              type="text"
              value={pagesToRemove}
              onChange={(e) => setPagesTRemove(e.target.value)}
              placeholder="Enter page numbers separated by commas"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {!downloadUrl ? (
            <button
              onClick={handleRemove}
              disabled={!selectedFile || !pagesToRemove || isProcessing}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Removing...' : 'Remove Pages'}
            </button>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-4">
                Pages removed successfully!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setDownloadUrl(null);
                    setPagesTRemove('');
                  }}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg"
                >
                  Remove More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
