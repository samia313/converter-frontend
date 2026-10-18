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
    if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setIsComplete(false);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 55000);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('/api/convert/pdf-to-word', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

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

      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (!contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        throw new Error('The conversion service returned an unexpected file format. No download was created.');
      }

      const blob = await response.blob();
      if (blob.size < 4) throw new Error('Converted Word file is empty or invalid.');
      const header = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
      if (header[0] !== 0x50 || header[1] !== 0x4b || header[2] !== 0x03 || header[3] !== 0x04) {
        throw new Error('The generated Word file failed integrity validation. Please try again.');
      }

      setDownloadUrl(window.URL.createObjectURL(blob));
      setIsComplete(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Conversion took too long. Try a smaller or simpler PDF, or use OCR first if the PDF is scanned.');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      window.clearTimeout(timeoutId);
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
        <p className="mb-5 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
          This version extracts selectable text into a Word document. Original page layout, images, and tables may not be preserved; scanned PDFs require OCR first.
        </p>

        {!isComplete && (
          <>
            <FileUploader
              onFileSelected={(files) => setSelectedFile(files[0] || null)}
              accept=".pdf"
              maxSize={100}
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
