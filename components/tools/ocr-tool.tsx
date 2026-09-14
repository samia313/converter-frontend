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

          await page.render({ canvas, canvasContext: context, viewport }).promise;
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
              maxSize={50 * 1024 * 1024}
              onFilesSelected={(files) => {
                setSelectedFile(files[0] || null);
                setError(null);
                setExtractedText(null);
                setProgress(0);
                setStatus('');
              }}
              multiple={false}
            />

            {selectedFile && (
              <button
                type="button"
                onClick={handleExtractText}
                disabled={isProcessing}
                className="mt-6 w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isProcessing ? 'Extracting text…' : 'Extract Text'}
              </button>
            )}

            {isProcessing && (
              <div className="mt-6" aria-live="polite">
                <div className="mb-2 flex justify-between text-sm text-gray-600">
                  <span>{status || 'Processing…'}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Extracted Text</h2>
              {extractedText && (
                <div className="flex gap-2">
                  <button type="button" onClick={handleCopyText} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                    <Copy className="h-4 w-4" /> Copy
                  </button>
                  <button type="button" onClick={handleDownloadText} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                    <Download className="h-4 w-4" /> TXT
                  </button>
                </div>
              )}
            </div>

            {extractedText ? (
              <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-800">
                {extractedText}
              </pre>
            ) : (
              <div className="flex min-h-[260px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center text-gray-500">
                Your extracted text will appear here after OCR finishes.
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Browser-based OCR. Scanned PDFs are rendered page-by-page before text recognition. PDF OCR currently supports up to 10 pages per run.
        </p>
      </div>
    </section>
  );
}
