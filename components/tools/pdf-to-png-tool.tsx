'use client';

import { useState, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function PdftopngTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [toolName, setToolName] = useState('pdf-to-png');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.split('/')[1];
      setToolName(path || 'pdf-to-png');
    }
  }, []);

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`/api/convert/${toolName}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Processing failed');
      const blob = await response.blob();
      setDownloadUrl(window.URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && selectedFile) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${selectedFile.name.split('.')[0]}_converted.${selectedFile.name.split('.').pop()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">pdf-to-png</h1>
          <p className="text-lg text-gray-600">Process your files instantly</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader accept="*" onFileSelected={(files) => setSelectedFile(files[0] || null)} maxSize={100} />

          {error && <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-700 text-sm">{error}</p></div>}

          {!downloadUrl ? (
            <button onClick={handleConvert} disabled={!selectedFile || isProcessing} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition">
              {isProcessing ? 'Processing...' : 'Process File'}
            </button>
          ) : (
            <div className="text-center mt-6">
              <p className="text-green-600 font-semibold mb-4">Processing completed!</p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleDownload} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button onClick={() => { setSelectedFile(null); setDownloadUrl(null); }} className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg">
                  Process Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
