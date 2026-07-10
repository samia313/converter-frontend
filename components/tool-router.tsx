'use client';

import dynamic from 'next/dynamic';
import ToolTemplate from '@/components/tool-template';
import { tools } from '@/lib/tools-config';

// Dynamically import all tool components
const MergeTool = dynamic(() => import('./tools/merge-tool'), { ssr: false });
const SplitTool = dynamic(() => import('./tools/split-tool'), { ssr: false });
const CompressTool = dynamic(() => import('./tools/compress-tool'), { ssr: false });
const CompressPDFTool = dynamic(() => import('./tools/compress-pdf-tool'), { ssr: false });
const MergePDFTool = dynamic(() => import('./tools/merge-pdf-tool'), { ssr: false });
const SplitPDFTool = dynamic(() => import('./tools/split-pdf-tool'), { ssr: false });
const RotatePDFTool = dynamic(() => import('./tools/rotate-pdf-tool'), { ssr: false });
const RemovePagesTool = dynamic(() => import('./tools/remove-pages-tool'), { ssr: false });
const CropPDFTool = dynamic(() => import('./tools/crop-pdf-tool'), { ssr: false });
const WatermarkPDFTool = dynamic(() => import('./tools/watermark-pdf-tool'), { ssr: false });
const PageNumbersTool = dynamic(() => import('./tools/page-numbers-tool'), { ssr: false });
const RedactPDFTool = dynamic(() => import('./tools/redact-pdf-tool'), { ssr: false });
const ProtectPDFTool = dynamic(() => import('./tools/protect-pdf-tool'), { ssr: false });
const UnlockPDFTool = dynamic(() => import('./tools/unlock-pdf-tool'), { ssr: false });
const SignPDFTool = dynamic(() => import('./tools/sign-pdf-tool'), { ssr: false });
const EditPDFTool = dynamic(() => import('./tools/edit-pdf-tool'), { ssr: false });
const JPGToPDFTool = dynamic(() => import('./tools/jpg-to-pdf-tool'), { ssr: false });
const ImageToPDFTool = dynamic(() => import('./tools/image-to-pdf-tool'), { ssr: false });
const HTMLToPDFTool = dynamic(() => import('./tools/html-to-pdf-tool'), { ssr: false });
const ExcelToPDFTool = dynamic(() => import('./tools/excel-to-pdf-tool'), { ssr: false });
const WordToPDFTool = dynamic(() => import('./tools/word-to-pdf-tool'), { ssr: false });
const PowerPointToPDFTool = dynamic(() => import('./tools/powerpoint-to-pdf-tool'), { ssr: false });
const PDFToWordTool = dynamic(() => import('./tools/pdf-to-word-tool'), { ssr: false });
const PDFToJPGTool = dynamic(() => import('./tools/pdf-to-jpg-tool'), { ssr: false });
const PDFToPNGTool = dynamic(() => import('./tools/pdf-to-png-tool'), { ssr: false });
const PDFToExcelTool = dynamic(() => import('./tools/pdf-to-excel-tool'), { ssr: false });
const PDFToPowerPointTool = dynamic(() => import('./tools/pdf-to-powerpoint-tool'), { ssr: false });
const OCRTool = dynamic(() => import('./tools/ocr-tool'), { ssr: false });
const PDFChatTool = dynamic(() => import('./tools/pdf-chat-tool'), { ssr: false });

interface ToolRouterProps {
  toolId: string;
  onBack: () => void;
}

export default function ToolRouter({ toolId, onBack }: ToolRouterProps) {
  const tool = tools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <ToolTemplate
        toolId={toolId}
        toolName="Tool Not Found"
        toolDescription="This tool is not yet implemented"
        onBack={onBack}
      />
    );
  }

  // Route to specific tool components
  switch (toolId) {
    case 'merge':
      return <MergeTool onBack={onBack} />;
    case 'split':
      return <SplitTool onBack={onBack} />;
    case 'compress':
      return <CompressTool onBack={onBack} />;
    case 'compress-pdf':
      return <CompressPDFTool />;
    case 'merge-pdf':
      return <MergePDFTool />;
    case 'split-pdf':
      return <SplitPDFTool />;
    case 'rotate-pdf':
      return <RotatePDFTool />;
    case 'remove-pages':
      return <RemovePagesTool />;
    case 'crop-pdf':
      return <CropPDFTool />;
    case 'watermark-pdf':
      return <WatermarkPDFTool />;
    case 'page-numbers':
      return <PageNumbersTool />;
    case 'redact-pdf':
      return <RedactPDFTool />;
    case 'protect-pdf':
      return <ProtectPDFTool />;
    case 'unlock-pdf':
      return <UnlockPDFTool />;
    case 'sign-pdf':
      return <SignPDFTool />;
    case 'edit-pdf':
      return <EditPDFTool />;
    case 'jpg-to-pdf':
      return <JPGToPDFTool />;
    case 'image-to-pdf':
      return <ImageToPDFTool />;
    case 'html-to-pdf':
      return <HTMLToPDFTool />;
    case 'excel-to-pdf':
      return <ExcelToPDFTool />;
    case 'word-to-pdf':
      return <WordToPDFTool />;
    case 'powerpoint-to-pdf':
      return <PowerPointToPDFTool />;
    case 'pdf-to-word':
      return <PDFToWordTool />;
    case 'pdf-to-jpg':
      return <PDFToJPGTool />;
    case 'pdf-to-png':
      return <PDFToPNGTool />;
    case 'pdf-to-excel':
      return <PDFToExcelTool />;
    case 'pdf-to-powerpoint':
      return <PDFToPowerPointTool />;
    case 'ocr':
      return <OCRTool />;
    case 'pdf-chat':
      return <PDFChatTool />;

    // Default: Show generic template for unimplemented tools
    default:
      return (
        <ToolTemplate
          toolId={toolId}
          toolName={tool.name}
          toolDescription={tool.description}
          onBack={onBack}
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-700">
              This tool is coming soon! Check back for the latest updates.
            </p>
            <p className="text-blue-600 text-sm mt-2">
              In the meantime, try our other available tools.
            </p>
          </div>
        </ToolTemplate>
      );
  }
}
