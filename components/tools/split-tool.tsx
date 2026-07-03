'use client';

import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';
import ToolTemplate from '@/components/tool-template';

interface SplitToolProps {
  onBack: () => void;
}

export default function SplitTool({ onBack }: SplitToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [pageRange, setPageRange] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSplit = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      
      // Parse page range (e.g., "1,3-5" means pages 1, 3, 4, 5)
      const pages = parsePageRange(pageRange, pdf.getPageCount());
      
      if (pages.length === 0) {
        alert('Please enter valid page numbers');
        setIsProcessing(false);
        return;
      }

      const splitPdf = await PDFDocument.create();
      for (const pageNum of pages) {
        const [page] = await splitPdf.copyPages(pdf, [pageNum - 1]);
        splitPdf.addPage(page);
      }

      const pdfBytes = await splitPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `split-${pages[0]}-${pages[pages.length - 1]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Error splitting PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const parsePageRange = (range: string, totalPages: number): number[] => {
    if (!range.trim()) return [];
    
    const pages: Set<number> = new Set();
    const parts = range.split(',');
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(p => parseInt(p.trim()));
        for (let i = start; i <= end && i <= totalPages; i++) {
          pages.add(i);
        }
      } else {
        const page = parseInt(part.trim());
        if (page <= totalPages) pages.add(page);
      }
    }
    
    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <ToolTemplate
      toolId="split"
      toolName="Split PDF"
      toolDescription="Extract specific pages from a PDF or split into multiple files"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Range
          </label>
          <input
            type="text"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
            placeholder="e.g., 1,3-5,7 (extract pages 1, 3, 4, 5, and 7)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter page numbers separated by commas. Use hyphens for ranges (e.g., 1,3-5).
          </p>
        </div>

        {pageRange && files.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 font-medium">
              Ready to extract pages from your PDF. Click "Process Files" to begin.
            </p>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
