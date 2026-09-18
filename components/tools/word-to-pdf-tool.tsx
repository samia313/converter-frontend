'use client';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/file-uploader';
import ProcessingPanel from '@/components/processing-panel';
import { Download, FileText } from 'lucide-react';

export default function WordToPDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const handleConvert = async () => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setIsComplete(false);
    setError(null);
    if (downloadUrl) {
      window.URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 55_000);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/convert/word-to-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        let message = `Conversion failed (${response.status})`;
        try {
          const data = await response.json();
          if (typeof data?.error === 'string' && data.error.trim()) message = data.error;
        } catch {
          // Keep the status-based error when the API does not return JSON.
        }
        throw new Error(message);
      }

      const blob = await response.blob();
      if (blob.size === 0) throw new Error('The converter returned an empty PDF. Please try another supported document.');

      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setIsComplete(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Conversion took too long. Try a smaller or simpler Word document.');
      } else {
        setError(err instanceof Error ? err.message : 'Conversion failed. Please try again.');
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && selectedFile) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = selectedFile.name.replace(/\.(docx?|odt)$/i, '.pdf');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleReset = () => {
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    setSelectedFile(null);
    setIsComplete(false);
    setError(null);
    setDownloadUrl(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Word to PDF Converter
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Convert supported Word documents to PDF online
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {!isComplete ? (
            <div>
              <FileUploader
                accept=".docx"
                onFileSelected={(files) => setSelectedFile(files[0] || null)}
                maxSize={100}
              />

              <button
                onClick={handleConvert}
                disabled={!selectedFile || isProcessing}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isProcessing ? 'Converting...' : 'Convert to PDF'}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Conversion Complete!</h3>
              <p className="text-gray-600 mb-8">Your PDF is ready to download</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Convert Another
                </button>
              </div>
            </div>
          )}

          <ProcessingPanel
            isProcessing={isProcessing}
            isComplete={isComplete}
            error={error}
            downloadUrl={downloadUrl}
            fileName={selectedFile?.name}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </section>
  );
}
