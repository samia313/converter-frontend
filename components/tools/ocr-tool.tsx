'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Copy, Download } from 'lucide-react';
import { createWorker } from 'tesseract.js';

const MAX_PDF_PAGES = 10;
const OCR_LANG = 'eng';

export default function OcrTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setText('');
    setError('');
    setProgress(0);
    setStatus('Ready to OCR');
  };

  const runOcr = async () => {
    if (!selectedFile) return;
    setProcessing(true);
    setError('');
    setText('');
    setProgress(0);

    let worker: Awaited<ReturnType<typeof createWorker>> | null = null;
    try {
      setStatus('Starting OCR engine…');
      worker = await createWorker(OCR_LANG, 1, {
        logger: (message) => {
          if (typeof message.progress === 'number') setProgress(Math.round(message.progress * 100));
          if (message.status) setStatus(message.status);
        },
      });

      let extractedText = '';
      if (selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf')) {
        setStatus('Loading PDF…');
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();
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
        extractedText = pageTexts.join('\n\n').trim();
        pdf.cleanup();
      } else {
        setStatus('Recognizing text…');
        const result = await worker.recognize(selectedFile);
        extractedText = result.data.text.trim();
      }

      if (!extractedText) throw new Error('No text could be detected. Try a clearer, higher-resolution document.');
      setText(extractedText);
      setProgress(100);
      setStatus('OCR complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OCR failed. Please try again.');
      setStatus('OCR failed');
    } finally {
      if (worker) await worker.terminate();
      setProcessing(false);
    }
  };

  const copyText = async () => {
    if (text) await navigator.clipboard.writeText(text);
  };

  const downloadText = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedFile?.name.replace(/\.[^.]+$/, '') || 'ocr-result'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">OCR PDF Online – Extract Text</h1>
        <p className="mt-2 text-sm text-muted-foreground">Extract machine-readable text from scanned PDFs and images with a real OCR engine.</p>
      </div>
      <FileUploader accept=".pdf,.jpg,.png,.jpeg,.webp" maxSize={50 * 1024 * 1024} onFileSelected={handleFileSelected} />
      {selectedFile && (
        <div className="space-y-3 rounded-lg border p-4">
          <div className="text-sm font-medium">{selectedFile.name}</div>
          <button type="button" onClick={runOcr} disabled={processing} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
            {processing ? 'Processing…' : 'Extract Text'}
          </button>
          {processing && <div className="space-y-1"><div className="h-2 overflow-hidden rounded bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div><p className="text-xs text-muted-foreground">{status}</p></div>}
        </div>
      )}
      {error && <p className="rounded-md border border-destructive/30 p-3 text-sm text-destructive">{error}</p>}
      {text && <div className="space-y-3"><div className="flex gap-2"><button type="button" onClick={copyText} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"><Copy className="h-4 w-4" /> Copy Text</button><button type="button" onClick={downloadText} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"><Download className="h-4 w-4" /> Save as TXT</button></div><textarea readOnly value={text} className="min-h-72 w-full rounded-md border bg-background p-4 text-sm" aria-label="OCR extracted text" /></div>}
    </div>
  );
}
