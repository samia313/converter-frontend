'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function PDFToJpgTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadType, setDownloadType] = useState<'jpg' | 'zip'>('jpg');

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('/api/convert/pdf-to-jpg', { method: 'POST', body: formData });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'PDF to JPG conversion failed.');
      }
      const type = response.headers.get('content-type') || '';
      setDownloadType(type.includes('zip') ? 'zip' : 'jpg');
      setDownloadUrl(URL.createObjectURL(await response.blob()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF to JPG conversion failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = downloadType === 'zip'
      ? `${selectedFile.name.replace(/\.[^.]+$/, '')}-jpg.zip`
      : `${selectedFile.name.replace(/\.[^.]+$/, '')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setSelectedFile(null);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">PDF to JPG Converter</h1>
          <p className="text-lg text-gray-600">Render PDF pages as JPG images</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader accept=".pdf" onFileSelected={(files) => setSelectedFile(files[0] || null)} maxSize={100} />
          {selectedFile && <p className="mt-4 text-sm text-gray-600">PDF selected · Maximum 100MB · Up to 50 pages per conversion</p>}
          {error && <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-700 text-sm">{error}</p></div>}
          {!downloadUrl ? (
            <button onClick={handleConvert} disabled={!selectedFile || isProcessing} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition">
              {isProcessing ? 'Converting...' : 'Convert to JPG'}
            </button>
          ) : (
            <div className="text-center mt-6">
              <p className="text-green-600 font-semibold mb-4">JPG output created successfully.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleDownload} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg"><Download className="w-5 h-5" />Download {downloadType === 'zip' ? 'JPGs' : 'JPG'}</button>
                <button onClick={reset} className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg">Convert Another</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}