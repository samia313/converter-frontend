'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Loader2, Scissors } from 'lucide-react';

export default function PDFSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPageCount();
      setTotalPages(pages);
      setEndPage(pages);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
      const arrayBuffer = await droppedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPageCount();
      setTotalPages(pages);
      setEndPage(pages);
    }
  };

  const splitPDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    if (startPage < 1 || endPage > totalPages || startPage > endPage) {
      alert(`Please enter valid page numbers between 1 and ${totalPages}`);
      return;
    }

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      const newPdf = await PDFDocument.create();
      const pages = pdf.getPages().slice(startPage - 1, endPage);
      
      for (const page of pages) {
        const copiedPages = await newPdf.copyPages(pdf, [pdf.getPages().indexOf(page)]);
        copiedPages.forEach(p => newPdf.addPage(p));
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `split-${startPage}-${endPage}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Error splitting PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#3b82f6] rounded-lg p-8 text-center bg-[#1a1f2e] hover:bg-[#252d3d] transition-colors"
      >
        <Scissors className="mx-auto h-12 w-12 text-[#3b82f6] mb-4" />
        <p className="text-white mb-2 font-semibold">Drag a PDF file here</p>
        <p className="text-[#9ca3af] mb-4">or</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2 rounded-lg transition-colors"
        >
          Select File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {file && (
        <div className="mt-6 space-y-4">
          <div className="bg-[#1a1f2e] p-4 rounded-lg">
            <p className="text-white font-semibold mb-2">{file.name}</p>
            <p className="text-[#9ca3af] text-sm">Total Pages: {totalPages}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a1f2e] p-4 rounded-lg">
              <label className="block text-white font-semibold mb-2">Start Page</label>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={startPage}
                onChange={(e) => setStartPage(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-[#0f1419] text-white p-2 rounded border border-[#2d3748] focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
            <div className="bg-[#1a1f2e] p-4 rounded-lg">
              <label className="block text-white font-semibold mb-2">End Page</label>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={endPage}
                onChange={(e) => setEndPage(Math.min(totalPages, parseInt(e.target.value) || totalPages))}
                className="w-full bg-[#0f1419] text-white p-2 rounded border border-[#2d3748] focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={splitPDF}
            disabled={loading}
            className="w-full bg-[#06b6d4] hover:bg-[#0891b2] disabled:bg-[#2d3748] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Splitting...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Download Split PDF
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
