'use client';

import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';
import ToolTemplate from '@/components/tool-template';

interface MergeToolProps {
  onBack: () => void;
}

export default function MergeTool({ onBack }: MergeToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setFiles([]);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Error merging PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolTemplate
      toolId="merge"
      toolName="Merge PDF"
      toolDescription="Combine multiple PDF files into one document"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Merge Options</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4" defaultChecked />
              <span className="ml-2 text-gray-700">Combine all PDFs into one file</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4" />
              <span className="ml-2 text-gray-700">Keep original page order</span>
            </label>
          </div>
        </div>

        {files.length >= 2 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-medium">
              Ready to merge {files.length} files. Click "Process Files" to begin.
            </p>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
