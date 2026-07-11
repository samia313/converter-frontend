'use client';

import { useState, useEffect } from 'react';
import FileUploader from '@/components/file-uploader';
import ProcessingPanel from '@/components/processing-panel';
import { Download } from 'lucide-react';

export default function PDFToWordTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);
    setIsComplete(false);

    try {
      console.log('[v0] Starting PDF to Word conversion for:', selectedFile.name);
      
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/convert/pdf-to-word', {
        method: 'POST',
        body: formData,
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

      const blob = await response.blob();
      console.log('[v0] Received converted file, size:', blob.size);
      
      if (blob.size === 0) {
        throw new Error('Converted file is empty');
      }
      
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      setIsComplete(true);
      setIsProcessing(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      console.error('[v0] Conversion error:', errorMsg);
      setError(errorMsg);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl && selectedFile) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = selectedFile.name.replace('.pdf', '.docx');
      link.click();
      setIsProcessing(false);
      setIsComplete(false);
      setSelectedFile(null);
      setDownloadUrl(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Convert PDF to Word
        </h2>

        <FileUploader
          onFileSelected={(files) => setSelectedFile(files[0] || null)}
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

        <ProcessingPanel
          isProcessing={isProcessing}
          isComplete={isComplete}
          error={error}
          downloadUrl={downloadUrl}
          fileName={selectedFile?.name.replace('.pdf', '.docx')}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}
