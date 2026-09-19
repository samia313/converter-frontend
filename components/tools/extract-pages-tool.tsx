'use client';

import { useEffect, useState } from 'react';
import { Download, FileOutput } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

export default function ExtractPagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  const extract = async () => {
    if (!file || !pages.trim()) return;
    setBusy(true); setError(null);
    try {
      const form = new FormData();
      form.append('file', file); form.append('pages', pages);
      const response = await fetch('/api/convert/extract-pages', { method: 'POST', body: form });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Unable to extract PDF pages.');
      }
      setUrl(URL.createObjectURL(await response.blob()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to extract PDF pages.');
    } finally { setBusy(false); }
  };

  const reset = () => { if (url) URL.revokeObjectURL(url); setUrl(null); setFile(null); setPages(''); setError(null); };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"><FileOutput className="h-7 w-7" /></div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Extract Pages from PDF</h1>
          <p className="text-lg text-gray-600">Select specific pages and create a new PDF containing only those pages.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {!url && <FileUploader accept=".pdf,application/pdf" onFileSelected={files => setFile(files[0] || null)} maxSize={100} />}
          {file && !url && <p className="mt-4 text-sm text-gray-600">Selected: <span className="font-medium text-gray-900">{file.name}</span></p>}
          {!url && (
            <div className="mt-5">
              <label htmlFor="extract-pages" className="mb-2 block text-sm font-medium text-gray-700">Page numbers</label>
              <input id="extract-pages" value={pages} onChange={e => setPages(e.target.value)} placeholder="Example: 1,3,5-7 is not supported; use 1,3,5,6,7" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="mt-2 text-xs text-gray-500">Enter original page numbers separated by commas.</p>
            </div>
          )}
          {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          {!url ? (
            <button onClick={extract} disabled={!file || !pages.trim() || busy} className="w-full mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400">{busy ? 'Extracting pages...' : 'Extract Pages'}</button>
          ) : (
            <div className="text-center mt-4">
              <p className="text-green-600 font-semibold mb-4">Pages extracted successfully.</p>
              <a href={url} download={(file?.name.replace(/\.pdf$/i, '') || 'document') + '_extracted.pdf'} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white"><Download className="h-5 w-5" />Download Extracted PDF</a>
              <button onClick={reset} className="ml-3 rounded-lg bg-gray-200 px-6 py-3 font-semibold">Extract Another</button>
            </div>
          )}
          <p className="mt-5 text-xs text-gray-500">Creates a new PDF from the selected pages. Your original PDF is not overwritten.</p>
        </div>
      </div>
    </section>
  );
}
