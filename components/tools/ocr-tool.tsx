'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Copy, Download } from 'lucide-react';
import { createWorker } from 'tesseract.js';

const MAX_PDF_PAGES = 10;
const OCR_LANG = 'eng';

export default function OCRTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const handleExtractText = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setExtractedText(null);
    setProgress(0);
    setStatus('Starting OCR engine…');

    let worker: Awaited<ReturnType<typeof createWorker>> | null = null;

    try {
      worker = await createWorker(OCR_LANG, 1, {
        logger: (message) => {
          if (message.status) setStatus(message.status);
          if (typeof message.progress === 'number') {
            setProgress(Math.round(message.progress * 100));
          }
        },
      });

      const isPdf = selectedFile.type === 'application/pdf' || /\.pdf$/i.test(selectedFile.name);
      let text = '';

      if (!isPdf) {
        const result = await worker.recognize(selectedFile);
        text = result.data.text.trim();
      } else {
        setStatus('Reading PDF pages…');

        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.mjs',
          import.meta.url,
        ).toString();

        const bytes = new Uint8Array(await selectedFile.arrayBuffer());
        const pdf = await pdfjs.getDocument({ data: bytes }).promise;

        if (pdf.numPages > MAX_PDF_PAGES) {
          throw new Error(`This OCR tool currently supports up to ${MAX_PDF_PAGES} PDF pages per run. Split the PDF first and OCR each part.`);
        }

        const pageTexts: string[] = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          setStatus(`OCR page ${pageNumber} of ${pdf.numPages}…`);
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const context = canvas.getContext('2d', { alpha: false });

          if (!context) throw new Error('Could not create a PDF rendering canvas.');

          await page.render({ canvasContext: context, viewport }).promise;
          const result = await worker.recognize(canvas);
          pageTexts.push(`--- Page ${pageNumber} ---\n${result.data.text.trim()}`);

          canvas.width = 1;
          canvas.height = 1;
          page.cleanup();
        }

        text = pageTexts.join('\n\n').trim();
        pdf.cleanup();
      }

      if (!text) {
        throw new Error('No readable text was detected. Try a clearer scan or higher-quality image.');
      }

      setExtractedText(text);
      setProgress(100);
      setStatus('OCR completed');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'OCR extraction failed.';
      setError(message);
      setStatus('OCR failed');
    } finally {
      if (worker) await worker.terminate();
      setIsProcessing(false);
    }
  };

  const handleCopyText = async () => {
    if (!extractedText) return;
    try {
      await navigator.clipboard.writeText(extractedText);
    } catch {
      setError('Could not copy the text. Please select and copy it manually.');
    }
  };

  const handleDownloadText = () => {
    if (!extractedText) return;
    const element = document.createElement('a');
    element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(extractedText)}`;
    element.download = selectedFile?.name.replace(/\.(pdf|jpg|png|jpeg|webp)$/i, '.txt') || 'extracted.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            OCR PDF Online – Extract Text
          </h1>
          <p className="text-lg text-gray-600">
            Extract machine-readable text from scanned PDFs and images with a real OCR engine
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload a PDF or Image</h2>
            <FileUploader
              accept=".pdf,.jpg,.png,.jpeg,.webp"
              onFileSelected={(files) => setSelectedFile(files[0] || null)}
              maxSize={50}
            />
            <p className="mt-3 text-xs text-gray-500">
              Supports PDF, JPG, PNG, JPEG and WebP up to 50MB. Scanned PDFs are rendered page-by-page and OCRed in your browser.
            </p>

            {isProcessing && (
              <div className="mt-5" aria-live="polite">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>{status || 'Processing…'}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleExtractText}
              disabled={!selectedFile || isProcessing}
              className="w-full mt-8 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {isProcessing ? 'Extracting Text…' : 'Extract Text'}
            </button>
          </div>

          {extractedText && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Extracted Text</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{extractedText}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyText}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                  <Copy className="w-4 h-4" /> Copy Text
                </button>
                <button
                  onClick={handleDownloadText}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition text-sm"
                >
                  <Download className="w-4 h-4" /> Save as TXT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
