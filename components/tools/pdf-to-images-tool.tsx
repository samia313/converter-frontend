'use client';

import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function PDFToImagesTool() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const [zipUrl, setZipUrl] = useState<string | null>(null);

  useEffect(() => () => { if (zipUrl) URL.revokeObjectURL(zipUrl); }, [zipUrl]);

  const reset = () => {
    if (zipUrl) URL.revokeObjectURL(zipUrl);
    setFile(null); setUrls([]); setZipUrl(null); setError('');
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true); setError('');
    if (zipUrl) URL.revokeObjectURL(zipUrl);
    setZipUrl(null); setUrls([]);
    try {
      const form = new FormData();
      form.append('file', file);
      const response = await fetch('/api/convert/pdf-to-images', { method: 'POST', body: form });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.error || 'PDF to images conversion failed.');
      if (!Array.isArray(data?.downloadUrls) || !data.downloadUrls.length) throw new Error('No images were created.');
      setUrls(data.downloadUrls);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'PDF to images conversion failed.');
    } finally { setBusy(false); }
  };

  const downloadAll = async () => {
    if (!urls.length) return;
    setBusy(true); setError('');
    try {
      const zip = new JSZip();
      for (let i = 0; i < urls.length; i++) {
        const response = await fetch(urls[i], { cache: 'no-store' });
        if (!response.ok) throw new Error('Could not retrieve image ' + (i + 1) + '.');
        zip.file('page-' + String(i + 1).padStart(3, '0') + '.png', await response.blob());
      }
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      const nextUrl = URL.createObjectURL(blob);
      setZipUrl(nextUrl);
      const a = document.createElement('a');
      a.href = nextUrl;
      a.download = file?.name.replace(/\.pdf$/i, '') + '-images.zip';
      a.click();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create the ZIP download.');
    } finally { setBusy(false); }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">PDF to Images Converter</h1>
          <p className="text-lg text-gray-600">Convert PDF pages into PNG images.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FileUploader accept=".pdf" onFileSelected={(files) => { setFile(files[0] || null); setUrls([]); setError(''); }} maxSize={100} />
          {file && <p className="mt-4 text-sm text-gray-600">PDF selected · Maximum 100MB</p>}
          {error && <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4"><p className="text-sm text-red-700">{error}</p></div>}
          {!urls.length ? (
            <button onClick={convert} disabled={!file || busy} className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-gray-400">
              {busy ? 'Converting...' : 'Convert to Images'}
            </button>
          ) : (
            <div className="mt-6 text-center">
              <p className="font-semibold text-green-600">{urls.length} PNG {urls.length === 1 ? 'image' : 'images'} created successfully.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button onClick={downloadAll} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-gray-400">
                  <Download className="h-5 w-5" /> {busy ? 'Preparing ZIP...' : 'Download All as ZIP'}
                </button>
                <button onClick={reset} disabled={busy} className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-900">Convert Another</button>
              </div>
              {zipUrl && <a href={zipUrl} download={file?.name.replace(/\.pdf$/i, '') + '-images.zip'} className="mt-4 inline-block text-sm underline">Download ZIP again</a>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
