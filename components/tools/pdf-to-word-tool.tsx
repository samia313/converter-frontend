'use client';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/file-uploader';
import ProcessingPanel from '@/components/processing-panel';

export default function PDFToWordTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const resetForAnotherFile = () => {
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    setSelectedFile(null);
    setDownloadUrl(null);
    setIsComplete(false);
    setIsProcessing(false);
    setError(null);
  };

  useEffect(() => () => {
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
  }, [downloadUrl]);

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);
    setIsComplete(false);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('/api/convert/pdf-to-word', { method: 'POST', body: formData });

      if (!response.ok) {
        let errorMessage = 'Conversion failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      if (blob.size === 0) throw new Error('Converted file is empty');

      setDownloadUrl(window.URL.createObjectURL(blob));
      setIsComplete(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = selectedFile.name.replace(/\.pdf$/i, '.docx');
    link.click();
  };

  return (
    <div className="mx-auto w-full max-w-2xl py-8">
      <div className="rounded-lg bg-white p-6 shadow-md sm:p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Convert PDF to Word</h2>

        {!isComplete && (
          <>
            <FileUploader
              onFileSelected={(files) => setSelectedFile(files[0] || null)}
              accept=".pdf"
              maxSize={50}
            />

            {selectedFile && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="w-full rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:bg-red-400"
                >
                  {isProcessing ? 'Converting...' : 'Convert to Word'}
                </button>
              </div>
            )}
          </>
        )}

        <ProcessingPanel
          isProcessing={isProcessing}
          isComplete={isComplete}
          error={error}
          downloadUrl={downloadUrl}
          fileName={selectedFile?.name.replace(/\.pdf$/i, '.docx')}
          onDownload={handleDownload}
          onConvertAnother={resetForAnotherFile}
        />
      </div>
    </div>
  );
}
