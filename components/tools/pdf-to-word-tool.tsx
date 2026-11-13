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

    const clickStartedAt = performance.now();
    let submitDurationMs: number | null = null;
    let pollCount = 0;
    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);
    setIsComplete(false);
    setProgressText('Uploading your PDF...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const submitStartedAt = performance.now();
      const uploadResponse = await fetch('/api/convert/pdf-to-word', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json().catch(() => null);
      submitDurationMs = performance.now() - submitStartedAt;
      console.info('[PDFilio timing] submit response', {
        durationMs: Math.round(submitDurationMs), httpStatus: uploadResponse.status,
        fileSizeBytes: selectedFile.size,
      });

      if (!uploadResponse.ok || !uploadData?.success || !uploadData?.accessToken) {
        throw new Error(uploadData?.error || 'Could not submit conversion job');
      }

      const token = uploadData.accessToken;
      const startedAt = Date.now();
      const pollingStartedAt = performance.now();
      const maxWait = 5 * 60 * 1000;

      while (Date.now() - startedAt < maxWait) {
        setProgressText('Converting PDF to Word...');

        await new Promise(resolve => setTimeout(resolve, 1500));

        pollCount += 1;
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
          const pollingDurationMs = performance.now() - pollingStartedAt;
          setProgressText('Preparing your Word document...');

          const downloadStartedAt = performance.now();
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

          const downloadResponseDurationMs = performance.now() - downloadStartedAt;
          const blobStartedAt = performance.now();
          const blob = await downloadResponse.blob();
          const blobDurationMs = performance.now() - blobStartedAt;

          if (!blob.size) {
            throw new Error('Converted Word document is empty');
          }

          const url = URL.createObjectURL(blob);
          console.info('[PDFilio timing] conversion complete', {
            totalClickToButtonMs: Math.round(performance.now() - clickStartedAt),
            submitDurationMs: Math.round(submitDurationMs ?? 0),
            pollingDurationMs: Math.round(pollingDurationMs), pollCount,
            downloadResponseDurationMs: Math.round(downloadResponseDurationMs),
            blobDurationMs: Math.round(blobDurationMs), outputSizeBytes: blob.size,
          });
          setDownloadUrl(url);
          setIsComplete(true);
          setProgressText('Conversion completed successfully.');
          setIsProcessing(false);
          return;
        }
      }

      throw new Error('Conversion is taking too long. Please try again.');
    } catch (err) {
      console.error('[PDFilio timing] conversion failed', {
        totalElapsedMs: Math.round(performance.now() - clickStartedAt),
        submitDurationMs: submitDurationMs === null ? null : Math.round(submitDurationMs),
        pollCount,
      });
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
