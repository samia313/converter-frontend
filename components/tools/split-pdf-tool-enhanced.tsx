'use client';

import { useEffect, useState } from 'react';
import { Download, Loader2, AlertCircle, Scissors } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

export default function SplitPDFToolEnhanced() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [splitPage, setSplitPage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const handleSplit = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file.');
      return;
    }
    if (splitPage.trim() && (!/^\d+$/.test(splitPage.trim()) || Number(splitPage) < 1)) {
      setError('Enter a whole page number greater than zero, or leave it blank to split in the middle.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 55_000);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      if (splitPage.trim()) formData.append('splitPage', splitPage.trim());

      const response = await fetch('/api/convert/split-pdf', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      if (!response.ok) {
        let message = 'Split failed. Please try another PDF.';
        try {
          const payload = await response.json();
          if (typeof payload?.error === 'string') message = payload.error;
        } catch {
          // Retain the safe fallback if the server did not return JSON.
        }
        throw new Error(message);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/zip')) {
        throw new Error('Split service returned an unexpected file format. No download was created.');
      }
      const blob = await response.blob();
      if (blob.size === 0) throw new Error('Split produced an empty output. Please try another PDF.');
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof DOMException && err.name === 'AbortError'
        ? 'Splitting took too long. Try a smaller or simpler PDF.'
        : err instanceof Error ? err.message : 'Split failed.');
    } finally {
      window.clearTimeout(timeoutId);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = selectedFile.name.replace(/\.pdf$/i, '') + '-split.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setSelectedFile(null);
    setSplitPage('');
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <Scissors className="h-7 w-7 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Split PDF</h1>
          </div>
          <p className="text-gray-600">Divide a supported multi-page PDF into two files and download both in a ZIP.</p>
        </div>

        <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <FileUploader
            accept=".pdf"
            onFileSelected={(files) => {
              if (downloadUrl) URL.revokeObjectURL(downloadUrl);
              setDownloadUrl(null);
              setError(null);
              setSelectedFile(files[0] || null);
              setSplitPage('');
            }}
            maxSize={100}
          />

          {selectedFile && (
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="break-all text-sm font-semibold text-gray-900">{selectedFile.name}</p>
              <label htmlFor="enhanced-split-page" className="mt-4 block text-sm font-semibold text-gray-900">
                Split after page (optional)
              </label>
              <input
                id="enhanced-split-page"
                type="number"
                min="1"
                step="1"
                value={splitPage}
                onChange={(event) => setSplitPage(event.target.value)}
                placeholder="Leave blank to split in the middle"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
                inputMode="numeric"
              />
              <p className="mt-2 text-xs text-gray-500">Example: 5 creates pages 1–5 in the first PDF and the remaining pages in the second.</p>
            </div>
          )}

          {error && (
            <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!downloadUrl ? (
            <button
              type="button"
              onClick={handleSplit}
              disabled={!selectedFile || isProcessing}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isProcessing && <Loader2 className="h-5 w-5 animate-spin" />}
              {isProcessing ? 'Splitting PDF…' : 'Split PDF'}
            </button>
          ) : (
            <div className="space-y-4 text-center">
              <p className="font-semibold text-green-700">Split completed. Both PDF parts are in the ZIP file.</p>
              <button type="button" onClick={handleDownload} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
                <Download className="h-5 w-5" /> Download ZIP
              </button>
              <button type="button" onClick={reset} className="block w-full rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-200">
                Split Another PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
