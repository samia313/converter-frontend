'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Loader2 } from 'lucide-react';

export default function PDFMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles([...files, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files');
      return;
    }

    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Error merging PDFs');
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
        <Upload className="mx-auto h-12 w-12 text-[#3b82f6] mb-4" />
        <p className="text-white mb-2 font-semibold">Drag and drop PDF files here</p>
        <p className="text-[#9ca3af] mb-4">or</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2 rounded-lg transition-colors"
        >
          Select Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-3">Selected Files ({files.length})</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-[#1a1f2e] p-3 rounded-lg">
                <span className="text-white text-sm">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-[#ef4444] hover:text-[#dc2626] text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={mergePDFs}
            disabled={loading}
            className="w-full mt-6 bg-[#06b6d4] hover:bg-[#0891b2] disabled:bg-[#2d3748] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Merging...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Download Merged PDF
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
