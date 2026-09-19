'use client';

import { useEffect, useState } from 'react';
import FileUploader from '@/components/file-uploader';
import { Download, RotateCcw } from 'lucide-react';

const MAX_FILE_SIZE_MB = 100;

export default function EditPdfTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [fontSize, setFontSize] = useState(18);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => () => { if (downloadUrl) URL.revokeObjectURL(downloadUrl); }, [downloadUrl]);

  const handleFileSelected = (files: File[]) => {
    setSelectedFile(files[0] || null);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null); setError(null); setPageNumber(1);
  };

  const handleEdit = async () => {
    if (!selectedFile || !text.trim()) return;
    setIsProcessing(true); setError(null);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile); formData.append('text', text.trim());
      formData.append('pageNumber', String(pageNumber)); formData.append('x', String(x));
      formData.append('y', String(y)); formData.append('fontSize', String(fontSize));
      const response = await fetch('/api/convert/edit-pdf', { method: 'POST', body: formData });
      if (!response.ok) { const payload = await response.json().catch(() => null); throw new Error(payload?.error || 'Could not edit the PDF.'); }
      setDownloadUrl(URL.createObjectURL(await response.blob()));
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not edit the PDF.'); }
    finally { setIsProcessing(false); }
  };

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setSelectedFile(null); setText(''); setPageNumber(1); setX(50); setY(50); setFontSize(18); setDownloadUrl(null); setError(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-10"><h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Edit PDF Online</h1><p className="text-lg text-gray-600">Add text to a PDF page and download the edited copy.</p></div>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <FileUploader accept=".pdf,application/pdf" onFileSelected={handleFileSelected} maxSize={MAX_FILE_SIZE_MB} />
          {selectedFile && !downloadUrl && <div className="mt-6 space-y-5">
            <div><label className="block text-sm font-semibold text-gray-800 mb-2">Text to add</label><textarea value={text} onChange={(e) => setText(e.target.value.slice(0, 500))} maxLength={500} rows={3} placeholder="Enter text to place on the PDF" className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" /><p className="text-xs text-gray-500 mt-1">{text.length}/500 characters</p></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="text-sm font-medium text-gray-700">Page<input type="number" min={1} value={pageNumber} onChange={(e) => setPageNumber(Math.max(1, Number(e.target.value) || 1))} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
              <label className="text-sm font-medium text-gray-700">X position<input type="number" min={0} value={x} onChange={(e) => setX(Number(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
              <label className="text-sm font-medium text-gray-700">Y position<input type="number" min={0} value={y} onChange={(e) => setY(Number(e.target.value) || 0)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
            </div>
            <label className="block text-sm font-medium text-gray-700">Font size<input type="number" min={6} max={72} value={fontSize} onChange={(e) => setFontSize(Math.min(72, Math.max(6, Number(e.target.value) || 18)))} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
            <p className="text-xs text-gray-500">Positions use PDF points from the bottom-left corner of the selected page.</p>
            {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg"><p className="text-red-700 text-sm">{error}</p></div>}
            <button onClick={handleEdit} disabled={!text.trim() || isProcessing} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition">{isProcessing ? 'Editing PDF…' : 'Add Text & Edit PDF'}</button>
          </div>}
          {downloadUrl && <div className="text-center mt-6"><p className="text-green-600 font-semibold mb-4">PDF edited successfully.</p><div className="flex flex-col sm:flex-row gap-3 justify-center"><a href={downloadUrl} download={(selectedFile?.name.replace(/\.pdf$/i, '') || 'document') + '_edited.pdf'} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg"><Download className="w-5 h-5" />Download Edited PDF</a><button onClick={reset} className="inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg"><RotateCcw className="w-5 h-5" />Edit Another PDF</button></div></div>}
        </div>
      </div>
    </section>
  );
}