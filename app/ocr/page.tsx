import { Metadata } from 'next';
import ToolLandingLayout from '@/components/tool-landing-layout';
import OCRTool from '@/components/tools/ocr-tool';

export const metadata: Metadata = {
  title: 'OCR - Extract Text from Images | PDFilio',
  description: 'Extract text from scanned documents and images using OCR technology. Convert images to editable text instantly.',
  keywords: 'OCR, text extraction, scanned documents, image to text',
};

export default function OCRPage() {
  return (
    <>
      <OCRTool />
      <ToolLandingLayout
        toolName="OCR - Text Extraction"
        toolSlug="ocr"
        description="Extract text from scanned documents and images using advanced OCR technology. Instantly convert images to editable text."
        primaryKeyword="OCR"
        secondaryKeywords={['text extraction', 'image to text', 'OCR tool', 'document scanning']}
        features={['Multi-language recognition', 'Fast processing', 'High accuracy']}
        benefits={['Save time digitizing documents', 'Convert images to editable text', 'No installation required']}
        faqs={[]}
        relatedTools={[]}
      />
    </>
  );
}
