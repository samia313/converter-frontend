'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import FileUploader from '@/components/file-uploader';

export default function PdfMetadataTool() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState({ title:'', author:'', subject:'', keywords:'', creator:'', producer:'' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

  const process = async () => {
    if (!file) return;
    setBusy(true); setError(null);
    try {
      const body = new FormData();
      body.append('file', file);
      Object.entries(fields).forEach(([key, value]) => body.append(key, value));
      const res = await fetch('/api/convert/pdf-metadata', { method:'POST', body });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Metadata update failed.');
      }
      const blob = await res.blob();
      if (url) URL.revokeObjectURL(url);
      setUrl(URL.createObjectURL(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Metadata update failed.');
    } finally { setBusy(false); }
  };

  const reset = () => { if (url) URL.revokeObjectURL(url); setUrl(null); setFile(null); setError(null); };
  const input = (key: keyof typeof fields, label: string, placeholder: string) => (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span>
      <input value={fields[key]} onChange={(e)=>setFields({...fields,[key]:e.target.value})} placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500" />
    </label>
  );

  return <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
    <div className="container mx-auto max-w-2xl px-4">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">PDF Metadata Editor</h1>
        <p className="text-lg text-gray-600">Edit title, author, subject, keywords, creator, and producer metadata.</p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
        <FileUploader accept="application/pdf,.pdf" onFileSelected={(files)=>setFile(files[0] || null)} maxSize={100} />
        {file && <div className="mt-6 grid gap-4 md:grid-cols-2">
          {input('title','Title','Document title')}
          {input('author','Author','Author name')}
          {input('subject','Subject','Document subject')}
          {input('keywords','Keywords','invoice, report, contract')}
          {input('creator','Creator','Application or creator')}
          {input('producer','Producer','PDF producer')}
        </div>}
        {error && <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
        {!url ? <button onClick={process} disabled={!file || busy} className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400">{busy ? 'Updating Metadata...' : 'Update PDF Metadata'}</button>
        : <div className="mt-6 text-center"><p className="mb-4 font-semibold text-green-600">Metadata updated successfully.</p><div className="flex justify-center gap-3">
          <a href={url} download={file ? `${file.name.replace(/\.pdf$/i,'')}_metadata.pdf` : 'updated-metadata.pdf'} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"><Download className="h-5 w-5"/>Download PDF</a>
          <button onClick={reset} className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-900">Process Another</button>
        </div></div>}
      </div>
    </div>
  </section>;
}
