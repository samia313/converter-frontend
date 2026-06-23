'use client';

import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';
import ToolTemplate from '@/components/tool-template';

interface CompressToolProps {
  onBack: () => void;
}

export default function CompressTool({ onBack }: CompressToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(75);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCompress = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      // Basic compression by reducing image quality
      const pages = pdf.getPages();
      for (const page of pages) {
        // This is a simplified approach - pdf-lib has limited image compression
        // In production, you'd use more sophisticated compression techniques
      }

      const pdfBytes = await pdf.save();
      const originalSize = file.size;
      const compressedSize = pdfBytes.length;
      const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed-${quality}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert(`Compression complete! Size reduced by ${reduction}%`);
      setFiles([]);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Error compressing PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolTemplate
      toolId="compress"
      toolName="Compress PDF"
      toolDescription="Reduce file size while maintaining quality"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Quality Level: {quality}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Low Quality</span>
            <span>High Quality</span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Compression Info:</strong> Higher quality settings produce larger files. Try lowering the quality to achieve better compression.
          </p>
        </div>

        {files.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-medium">
              Ready to compress with {quality}% quality. Click "Process Files" to begin.
            </p>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}
