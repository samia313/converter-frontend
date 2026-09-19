'use client';

import { useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Copy, Download } from 'lucide-react';

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const MAX_PDF_PAGES = 10;
const OCR_LANG = 'eng';
const TESSERACT_CDN = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';

type OcrWorker = {
  recognize: (image: unknown) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<unknown>;
};

type TesseractApi = {
  createWorker: (
    lang: string,
    oem?: number,
    options?: { logger?: (message: { progress?: number; status?: string }) => void }
  ) => Promise<OcrWorker>;
};

declare global {
  interface Window {
    Tesseract?: TesseractApi;
  }
}

function loadTesseract(): Promise<TesseractApi> {
  if (typeof window === 'undefined') throw new Error('OCR is only available in a browser.');
  if (window.Tesseract) return Promise.resolve(window.Tesseract);

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-pdfilio-tesseract]');
    if (existing) {
      existing.addEventListener('load', () => window.Tesseract ? resolve(window.Tesseract) : reject(new Error('OCR engine loaded without its API.')));
      existing.addEventListener('error', () => reject(new Error('Could not load the OCR engine.')));
      return;
    }

    const script = document.createElement('script');
    script.src = TESSERACT_CDN;
    script.async = true;
    script.dataset.pdfilioTesseract = 'true';
    script.onload = () => window.Tesseract ? resolve(window.Tesseract) : reject(new Error('OCR engine loaded without its API.'));
    script.onerror = () => reject(new Error('Could not load the OCR engine. Please check your internet connection and try again.'));
    document.head.appendChild(script);
  });
}

export default function OcrTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleFileSelected = (files: File[]) => {
    const file = files[0] ?? null;
    setSelectedFile(file);
    setText('');
    setError('');
    setProgress(0);
    setStatus(file ? 'Ready to OCR' : '');
  };

  const runServerPdfOcr = async (file: File) => {
    setStatus('Uploading PDF to the OCR server…');
    setProgress(10);

    const formData = new FormData();
    formData.append('file', file, file.name);

    const response = await fetch('/api/convert/ocr', {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(90000),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(typeof data?.error === 'string' ? data.error : 'Server OCR failed. Please try again.');
    }

    if (typeof data?.text !== 'string') {
      throw new Error('OCR completed without extracted text.');
    }

    setProgress(100);
    return data.text.trim();
  };

  const runBrowserImageOcr = async (file: File) => {
    setStatus('Loading OCR engine…');
    const tesseract = await loadTesseract();

    const worker = await tesseract.createWorker(OCR_LANG, 1, {
      logger: (message) => {
        if (typeof message.progress === 'number') setProgress(Math.round(message.progress * 100));
        if (message.status) setStatus(message.status);
      },
    });

    try {
      setStatus('Recognizing image text…');
      const result = await worker.recognize(file);
      return result.data.text.trim();
    } finally {
      await worker.terminate();
    }
  };

  const runOcr = async () => {
    if (!selectedFile) return;
    setProcessing(true);
    setError('');
    setText('');
    setProgress(0);

    try {
      const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');
      let extractedText = '';

      if (isPdf) {
        extractedText = await runServerPdfOcr(selectedFile);
      } else {
        extractedText = await runBrowserImageOcr(selectedFile);
      }

      if (!extractedText) throw new Error('No text could be detected. Try a clearer, higher-resolution document.');
      setText(extractedText);
      setProgress(100);
      setStatus('OCR complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OCR failed. Please try again.');
      setStatus('OCR failed');
    } finally {
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
    link.download = `${selectedFile?.name.replace(/\\.[^.]+$/, '') || 'ocr-result'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">OCR PDF Online – Extract Text</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Extract English text from scanned PDFs on the server, or from JPG/PNG/WebP images directly in your browser.
        </p>
      </div>
      <FileUploader accept=".pdf,.jpg,.png,.jpeg,.webp" maxSize={MAX_FILE_SIZE} onFileSelected={handleFileSelected} />
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
