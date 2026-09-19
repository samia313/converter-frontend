'use client';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

const MAX_FILE_SIZE_MB = 100;

export default function UnlockpdfTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setSelectedFile(null);
    setPassword('');
    setError(null);
    setDownloadUrl(null);
  };

  const handleConvert = async () => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('password', password);

      const response = await fetch('/api/convert/unlock-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let message = 'The PDF could not be unlocked.';
        try {
          const data = await response.json();
          if (typeof data?.error === 'string') message = data.error;
        } catch {
          // Keep the fallback message for non-JSON responses.
        }
        throw new Error(message);
      }

      const blob = await response.blob();
      setDownloadUrl(URL.createObjectURL(blob));
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The PDF could not be unlocked.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;

    const baseName = selectedFile.name.replace(/\\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = baseName + '_unlocked.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unlock PDF Online</h1>
          <p className="text-lg text-gray-600">
            Remove supported PDF protection when you have the required password or authorization.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader
            accept=".pdf,application/pdf"
            onFileSelected={(files) => {
              setSelectedFile(files[0] || null);
              setError(null);
              if (downloadUrl) URL.revokeObjectURL(downloadUrl);
              setDownloadUrl(null);
            }}
            maxSize={MAX_FILE_SIZE_MB}
          />

          {selectedFile && !downloadUrl && (
            <div className="mt-6">
              <label htmlFor="unlock-password" className="block text-sm font-medium text-gray-700 mb-2">
                PDF password
              </label>
              <input
                id="unlock-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter the required password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-2 text-xs text-gray-500">
                Enter the password if the PDF requires one to open or decrypt. This tool does not crack or bypass passwords.
              </p>
            </div>
          )}

          <p className="mt-4 text-xs text-gray-500">
            Only unlock PDFs you are authorized to access or modify. Maximum file size: {MAX_FILE_SIZE_MB} MB.
          </p>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {!downloadUrl ? (
            <button
              onClick={handleConvert}
              disabled={!selectedFile || isProcessing}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Unlocking PDF...' : 'Unlock PDF'}
            </button>
          ) : (
            <div className="text-center mt-6">
              <p className="text-green-600 font-semibold mb-4">PDF unlocked successfully.</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg"
                >
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
