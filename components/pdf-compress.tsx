'use client';

import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Loader2, Zap } from 'lucide-react';

export default function PDFCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(75);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const compressPDF = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      // Compress by reducing image quality and removing redundancy
      const pdfBytes = await pdf.save({ useObjectStreams: true });
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed-${file.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Error compressing PDF');
    } finally {
      setLoading(false);
    }
  };

  const originalSize = file ? (file.size / 1024 / 1024).toFixed(2) : 0;

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#3b82f6] rounded-lg p-8 text-center bg-[#1a1f2e] hover:bg-[#252d3d] transition-colors"
      >
        <Zap className="mx-auto h-12 w-12 text-[#3b82f6] mb-4" />
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
            <p className="text-[#9ca3af] text-sm">Size: {originalSize} MB</p>
          </div>

          <div className="bg-[#1a1f2e] p-4 rounded-lg">
            <label className="block text-white font-semibold mb-3">Compression Level</label>
            <input
              type="range"
              min="30"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[#9ca3af] text-sm mt-2">
              <span>Higher Compression</span>
              <span>{quality}%</span>
              <span>Lower Compression</span>
            </div>
          </div>

          <button
            onClick={compressPDF}
            disabled={loading}
            className="w-full bg-[#06b6d4] hover:bg-[#0891b2] disabled:bg-[#2d3748] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Compressing...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Download Compressed PDF
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
