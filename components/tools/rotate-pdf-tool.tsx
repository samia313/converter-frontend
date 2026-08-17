'use client';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function RotatePDFTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState<90 | 180 | 270>(90);
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

  const handleRotate = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('rotation', rotation.toString());

      const response = await fetch('/api/convert/rotate-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let message = 'Rotation failed';
        try {
          const data = await response.json();
          if (typeof data?.error === 'string') message = data.error;
        } catch {
          // Keep the generic error when the response is not JSON.
        }
        throw new Error(message);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rotation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = selectedFile.name.replace(/\.pdf$/i, '_rotated.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Rotate PDF
          </h1>
          <p className="text-lg text-gray-600">
            Fix PDF page orientation
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

          <div className="mt-8 mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Rotation Angle
            </label>
            <div className="grid grid-cols-3 gap-4">
              {([90, 180, 270] as const).map((angle) => (
                <label
                  key={angle}
                  className={`p-4 text-center cursor-pointer rounded-lg border-2 transition ${
                    rotation === angle
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="rotation"
                    value={angle}
                    checked={rotation === angle}
                    onChange={() => setRotation(angle)}
                    className="sr-only"
                  />
                  <div className="font-semibold text-gray-900">{angle}°</div>
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
              onClick={handleRotate}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Rotating...' : 'Rotate PDF'}
            </button>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-4">
                Rotation completed successfully!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Rotated
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg"
                >
                  Rotate Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
