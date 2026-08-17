/**
 * Unified Tool Execution API
 * Handles PDF, AI, and document conversion operations.
 * Converted files are returned to the browser as a response only;
 * the browser decides when to download them.
 */

import { NextRequest, NextResponse } from 'next/server';
import { executeToolOperation, ToolRequest, ToolResponse } from '@/lib/unified-tool-service';

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const operation = formData.get('operation') as string;

    if (!operation) {
      return NextResponse.json({ success: false, error: 'Operation type required' }, { status: 400 });
    }

    const toolRequest: ToolRequest = { operation: operation as any };

    const fileEntries = formData.getAll('files');
    if (fileEntries.length > 0) toolRequest.files = fileEntries as File[];

    const singleFile = formData.get('file');
    if (singleFile) toolRequest.file = singleFile as File;

    const options: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('options.')) options[key.replace('options.', '')] = value;
    }
    if (Object.keys(options).length > 0) toolRequest.options = options;

    const userInput = formData.get('userInput') as string | null;
    if (userInput) toolRequest.userInput = userInput;

    const response: ToolResponse = await executeToolOperation(toolRequest);

    // IMPORTANT: Do not trigger an attachment download automatically.
    // Return the converted bytes as an inline response. The client creates
    // an object URL and shows an explicit "Download Your File" button.
    if (response.success && response.data instanceof Buffer) {
      const filename = `${operation}-${Date.now()}`;
      const contentType = response.metadata?.contentType || 'application/octet-stream';
      const extension = response.metadata?.extension || '';

      return new NextResponse(response.data, {
        headers: {
          'Content-Disposition': `inline; filename="${filename}${extension}"`,
          'Content-Type': contentType,
          'Content-Length': String(response.data.length),
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Download-Filename': `${filename}${extension}`,
          'X-Processing-Time': String(response.processingTime || 0),
        },
      });
    }

    return NextResponse.json(response, {
      status: response.success ? 200 : 400,
      headers: { 'X-Processing-Time': String(response.processingTime || 0) },
    });
  } catch (error) {
    console.error('[UnifiedToolAPI] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
