/**
 * Unified Tool Execution API
 * Handles ALL PDF, AI, and document conversion operations
 * Single entry point for all tool requests - NO ERRORS
 */

import { NextRequest, NextResponse } from 'next/server';
import { executeToolOperation, ToolRequest, ToolResponse } from '@/lib/unified-tool-service';

export const maxDuration = 300; // 5 minutes for large files

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract operation type
    const operation = formData.get('operation') as string;
    if (!operation) {
      return NextResponse.json(
        { success: false, error: 'Operation type required' },
        { status: 400 }
      );
    }

    // Build tool request
    const toolRequest: ToolRequest = {
      operation: operation as any,
    };

    // Extract files if present
    const fileEntries = formData.getAll('files');
    if (fileEntries.length > 0) {
      toolRequest.files = fileEntries as File[];
    }

    const singleFile = formData.get('file');
    if (singleFile) {
      toolRequest.file = singleFile as File;
    }

    // Extract options
    const options: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('options.')) {
        const optionKey = key.replace('options.', '');
        options[optionKey] = value;
      }
    }
    if (Object.keys(options).length > 0) {
      toolRequest.options = options;
    }

    // Extract user input
    const userInput = formData.get('userInput') as string | null;
    if (userInput) {
      toolRequest.userInput = userInput;
    }

    console.log(`[v0] Executing tool operation: ${operation}`);

    // Execute the tool operation
    const response: ToolResponse = await executeToolOperation(toolRequest);

    console.log(`[v0] Tool operation complete: ${response.success ? 'success' : 'failed'}`);

    // If successful and has data, return as file download
    if (response.success && response.data instanceof Buffer) {
      const filename = `${operation}-${Date.now()}.pdf`;
      return new NextResponse(response.data, {
        headers: {
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Type': 'application/pdf',
          'Content-Length': String(response.data.length),
          'Cache-Control': 'no-cache',
          'X-Processing-Time': String(response.processingTime || 0),
        },
      });
    }

    // Otherwise return JSON response
    return NextResponse.json(response, {
      status: response.success ? 200 : 400,
      headers: {
        'X-Processing-Time': String(response.processingTime || 0),
      },
    });
  } catch (error) {
    console.error('[v0] API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
