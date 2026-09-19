'use client';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download } from 'lucide-react';

export default function HtmltopdfTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); }, [downloadUrl]);

  const convert = async () => {
    if (!selectedFile) return;
    setProcessing(true); setError(null);
    try {
      const body = new FormData(); body.append('file', selectedFile);
      const response = await fetch('/api/convert/html-to-pdf', { method:'POST', body });
      if (!response.ok) { const data = await response.json().catch(()=>null); throw new Error(data?.error || 'HTML to PDF conversion failed.'); }
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(URL.createObjectURL(await response.blob()));
    } catch (e) { setError(e instanceof Error ? e.message : 'HTML to PDF conversion failed.'); }
    finally { setProcessing(false); }
  };

  const reset = () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); setDownloadUrl(null); setSelectedFile(null); setError(null); };

  return <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
    <div className="container mx-auto max-w-2xl px-4">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">HTML to PDF Converter</h1>
        <p className="text-lg text-gray-600">Convert HTML and HTM files to PDF with the PDFilio conversion server.</p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
        <FileUploader accept=".html,.htm,text/html" onFileSelected={(files)=>setSelectedFile(files[0] || null)} maxSize={100} />
        {selectedFile && <p className="mt-4 text-sm text-gray-600">HTML selected · Maximum 100MB</p>}
        {error && <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
        {!downloadUrl ? <button onClick={convert} disabled={!selectedFile || processing} className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400">{processing ? 'Converting...' : 'Convert to PDF'}</button>
        : <div className="mt-6 text-center"><p className="mb-4 font-semibold text-green-600">PDF created successfully.</p><div className="flex justify-center gap-3"><a href={downloadUrl} download={selectedFile ? selectedFile.name.replace(/\.(html?|HTML?)$/i,'.pdf') : 'converted.pdf'} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"><Download className="h-5 w-5"/>Download PDF</a><button onClick={reset} className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-900">Convert Another</button></div></div>}
      </div>
    </div>
  </section>;
}
