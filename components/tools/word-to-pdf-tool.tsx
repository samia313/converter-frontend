'use client';

import { useState, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import ProcessingPanel from '@/components/processing-panel';
import { Download, FileText } from 'lucide-react';

export default function WordToPDFTool() {
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
    setIsComplete(false);
    setError(null);
    setDownloadUrl(null);
    setProgressText('Uploading your Word document...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await fetch('/api/convert/word-to-pdf', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json().catch(() => null);

      if (
        !uploadResponse.ok ||
        !uploadData?.success ||
        !uploadData?.accessToken
      ) {
        throw new Error(uploadData?.error || 'Could not submit conversion job');
      }

      const token = uploadData.accessToken;
      const startedAt = Date.now();
      const maxWait = 5 * 60 * 1000;

      while (Date.now() - startedAt < maxWait) {
        setProgressText('Converting Word document to PDF...');

        await new Promise(resolve => setTimeout(resolve, 1500));

        const statusResponse = await fetch(
          '/api/convert/word-to-pdf/status',
          {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
          }
        );

        const statusData = await statusResponse.json().catch(() => null);

        if (!statusResponse.ok || !statusData?.success) {
          throw new Error(
            statusData?.error || 'Could not check conversion progress'
          );
        }

        if (statusData.state === 'failed') {
          throw new Error(statusData.error || 'Word to PDF conversion failed');
        }

        if (statusData.state === 'completed') {
          setProgressText('Preparing your PDF...');

          const downloadResponse = await fetch(
            '/api/convert/word-to-pdf/download',
            {
              headers: { Authorization: `Bearer ${token}` },
              cache: 'no-store',
            }
          );

          if (!downloadResponse.ok) {
            const downloadData = await downloadResponse.json().catch(() => null);
            throw new Error(
              downloadData?.error || 'Could not download converted PDF'
            );
          }

          const blob = await downloadResponse.blob();

          if (!blob.size) {
            throw new Error('Converted PDF file is empty');
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
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setIsProcessing(false);
      setProgressText('');
    }
  };

  const handleDownload = () => {
    if (!downloadUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = selectedFile.name.replace(/\.(docx?)$/i, '') + '.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsComplete(false);
    setError(null);
    setDownloadUrl(null);
    setProgressText('');
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Word to PDF Converter
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Convert your Word documents to PDF instantly
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {!isComplete ? (
            <div>
              <FileUploader
                accept=".doc,.docx"
                onFileSelected={(files) => {
                  setSelectedFile(files[0] || null);
                  setError(null);
                  setProgressText('');
                }}
                maxSize={50}
              />

              <button
                onClick={handleConvert}
                disabled={!selectedFile || isProcessing}
                className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isProcessing ? 'Converting...' : 'Convert to PDF'}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Conversion Complete!
              </h3>

              <p className="text-gray-600 mb-8">
                Your PDF is ready to download
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Convert Another
                </button>
              </div>
            </div>
          )}

          {progressText && (
            <p
              className="mt-4 text-center text-sm text-gray-600"
              aria-live="polite"
            >
              {progressText}
            </p>
          )}

          <ProcessingPanel
            isProcessing={isProcessing}
            isComplete={isComplete}
            error={error}
            downloadUrl={downloadUrl}
            fileName={selectedFile?.name.replace(/\.(docx?)$/i, '') + '.pdf'}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </section>
  );
}
