/**
 * Unified Tool Execution API
 * Handles PDF, AI, and document conversion operations.
 * Converted files are returned to the browser as a response only;
 * the browser decides when to download them.
 */

import { NextRequest, NextResponse } from 'next/server';
import { executeToolOperation, ToolRequest, ToolResponse } from '@/lib/unified-tool-service';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { subscription } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const operation = formData.get('operation') as string;

    const allowedOperations = new Set([
      'merge', 'split', 'compress', 'rotate', 'crop',
      'pdf-to-word', 'pdf-to-excel', 'pdf-to-ppt', 'pdf-to-jpg', 'pdf-to-png', 'pdf-to-text',
      'word-to-pdf', 'excel-to-pdf', 'ppt-to-pdf', 'jpg-to-pdf', 'html-to-pdf',
      'chat', 'summarize', 'translate', 'ocr', 'extract', 'analyze',
      'watermark', 'unlock', 'protect', 'redact', 'sign',
      'page-numbers', 'organize', 'repair', 'compare',
    ]);
    if (!operation || !allowedOperations.has(operation)) {
      return NextResponse.json({ success: false, error: 'A valid, supported operation type is required' }, { status: 400 });
    }

    // The unified service currently has placeholder implementations for these AI operations.
    // Fail closed rather than returning fabricated "successful" AI results.
    if (operation === 'chat' || operation === 'summarize' || operation === 'translate') {
      return NextResponse.json(
        { success: false, error: 'This AI operation is not available through the unified execution API yet.' },
        { status: 503 }
      );
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
