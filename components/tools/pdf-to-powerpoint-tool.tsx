'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

const MAX_FILE_SIZE_MB = 100;

export default function PdftopowerpointTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [toolName, setToolName] = useState('pdf-to-powerpoint');

  useEffect(() => {
    const path = window.location.pathname.split('/')[1];
    setToolName(path || 'pdf-to-powerpoint');
  }, []);

  useEffect(() => () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  }, [downloadUrl]);

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('/api/convert/' + toolName, {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(65000),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'PDF to PowerPoint conversion failed.');
      }
      const blob = await response.blob();
      if (!blob.size) throw new Error('The converter returned an empty PowerPoint file.');
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF to PowerPoint conversion failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = selectedFile.name.replace(/\.pdf$/i, '') + '.pptx';
    document.body.appendChild(a);
    a.click();
    a.remove();
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">PDF to PowerPoint Converter</h1>
          <p className="text-lg text-gray-600">Convert supported PDF files to editable PPTX presentations</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader
            accept=".pdf"
            onFileSelected={(files) => {
              const file = files[0] || null;
              setSelectedFile(file);
              setError(null);
              if (downloadUrl) URL.revokeObjectURL(downloadUrl);
              setDownloadUrl(null);
            }}
            maxSize={MAX_FILE_SIZE_MB}
          />
          {selectedFile && (
            <p className="mt-3 text-sm text-gray-500">
              Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
            </p>
          )}
          {error && <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-700 text-sm">{error}</p></div>}
          {!downloadUrl ? (
            <button onClick={handleConvert} disabled={!selectedFile || isProcessing} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition">
              {isProcessing ? 'Converting...' : 'Convert to PowerPoint'}
            </button>
          ) : (
            <div className="text-center mt-6">
              <p className="text-green-600 font-semibold mb-4">Conversion completed.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleDownload} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
                  <Download className="w-5 h-5" /> Download PPTX
                </button>
                <button onClick={reset} className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg">
                  Convert Another
                </button>
              </div>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-8">
            Maximum file size: 100 MB. Complex layouts, scanned pages, fonts, tables, charts, and graphics may require review after conversion.
          </p>
        </div>
      </div>
    </section>
  );
}
