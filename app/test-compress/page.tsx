'use client';

import CompressPDFTool from '@/components/tools/compress-pdf-tool';

export default function TestCompressPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test: Compress PDF</h1>
        <CompressPDFTool />
      </div>
    </div>
  );
}
