'use client';

import { useEffect, useState } from 'react';
import { Download, Layers3 } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

export default function FlattenPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  const flatten = async () => {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const response = await fetch('/api/convert/flatten-pdf', { method: 'POST', body: form });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'Unable to flatten PDF.');
      }
      setUrl(URL.createObjectURL(await response.blob()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to flatten PDF.');
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    if (url) URL.revokeObjectURL(url);
    setUrl(null);
    setFile(null);
    setError(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Layers3 className="h-7 w-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Flatten PDF Online</h1>
          <p className="text-lg text-gray-600">Flatten supported PDF form fields into a non-editable page appearance.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {!url && <FileUploader accept=".pdf,application/pdf" onFileSelected={files => setFile(files[0] || null)} maxSize={100} />}

          {file && !url && (
            <p className="mt-4 text-sm text-gray-600">
              Selected: <span className="font-medium text-gray-900">{file.name}</span>
            </p>
          )}

          {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

          {!url ? (
            <button onClick={flatten} disabled={!file || busy} className="w-full mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400">
              {busy ? 'Flattening PDF...' : 'Flatten PDF'}
            </button>
          ) : (
            <div className="text-center mt-4">
              <p className="text-green-600 font-semibold mb-4">PDF flattened successfully.</p>
              <a
                href={url}
                download={(file?.name.replace(/\.pdf$/i, '') || 'document') + '_flattened.pdf'}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white"
              >
                <Download className="h-5 w-5" />
                Download Flattened PDF
              </a>
              <button onClick={reset} className="ml-3 rounded-lg bg-gray-200 px-6 py-3 font-semibold">Flatten Another</button>
            </div>
          )}

          <p className="mt-5 text-xs text-gray-500">
            Flattening is intended for supported interactive PDF form fields. It does not remove encryption or bypass passwords.
          </p>
        </div>
      </div>
    </section>
  );
}
