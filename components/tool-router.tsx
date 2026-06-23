'use client';

import dynamic from 'next/dynamic';
import ToolTemplate from '@/components/tool-template';
import { tools } from '@/lib/tools-config';

// Dynamically import tool components
const MergeTool = dynamic(() => import('./tools/merge-tool'), { ssr: false });
const SplitTool = dynamic(() => import('./tools/split-tool'), { ssr: false });
const CompressTool = dynamic(() => import('./tools/compress-tool'), { ssr: false });

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
