'use client';

import { useState, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import ProcessingPanel from '@/components/processing-panel';

export default function PDFToWordTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progressText, setProgressText] = useState('');

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const handleConvert = async () => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);
    setIsComplete(false);
    setProgressText('Uploading your PDF...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await fetch('/api/convert/pdf-to-word', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json().catch(() => null);

      if (!uploadResponse.ok || !uploadData?.success || !uploadData?.accessToken) {
        throw new Error(uploadData?.error || 'Could not submit conversion job');
      }

      const token = uploadData.accessToken;
      const startedAt = Date.now();
      const maxWait = 5 * 60 * 1000;

      while (Date.now() - startedAt < maxWait) {
        setProgressText('Converting PDF to Word...');

        await new Promise(resolve => setTimeout(resolve, 1500));

        const statusResponse = await fetch(
          '/api/convert/pdf-to-word/status',
          {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
          }
        );

        const statusData = await statusResponse.json().catch(() => null);

        if (!statusResponse.ok || !statusData?.success) {
          throw new Error(statusData?.error || 'Could not check conversion progress');
        }

        if (statusData.state === 'failed') {
          throw new Error(statusData.error || 'PDF conversion failed');
        }

        if (statusData.state === 'completed') {
          setProgressText('Preparing your Word document...');

          const downloadResponse = await fetch(
            '/api/convert/pdf-to-word/download',
            {
              headers: { Authorization: `Bearer ${token}` },
              cache: 'no-store',
            }
          );

          if (!downloadResponse.ok) {
            const downloadData = await downloadResponse.json().catch(() => null);
            throw new Error(downloadData?.error || 'Could not download converted file');
          }

          const blob = await downloadResponse.blob();

          if (!blob.size) {
            throw new Error('Converted Word document is empty');
          }

          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setIsComplete(true);
          setProgressText('Conversion completed successfully.');
          setIsProcessing(false);
          return;
        }
      }

      throw new Error('Conversion is taking too long. Please try again.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed';
      setError(message);
      setIsProcessing(false);
      setProgressText('');
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = selectedFile.name.replace(/\.pdf$/i, '') + '.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();

    setIsComplete(false);
    setSelectedFile(null);
    setDownloadUrl(null);
    setProgressText('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Convert PDF to Word
        </h2>

        <FileUploader
          onFileSelected={(files) => {
            setSelectedFile(files[0] || null);
            setError(null);
            setIsComplete(false);
            setProgressText('');
          }}
          accept=".pdf"
          maxSize={50}
        />

        {selectedFile && (
          <div className="mt-6">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors font-semibold text-lg"
            >
              {isProcessing ? 'Converting...' : 'Convert to Word'}
            </button>
          </div>
        )}

        {progressText && (
          <p className="mt-4 text-center text-sm text-gray-600" aria-live="polite">
            {progressText}
          </p>
        )}

        <ProcessingPanel
          isProcessing={isProcessing}
          isComplete={isComplete}
          error={error}
          downloadUrl={downloadUrl}
          fileName={selectedFile?.name.replace(/\.pdf$/i, '') + '.docx'}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
