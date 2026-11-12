import { NextRequest, NextResponse } from 'next/server';
import { submitConversion } from '@/lib/pdfilio-conversion';

export const runtime = 'nodejs';
export const maxDuration = 120;
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Please select a PDF file' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File must be between 1 byte and 50 MB' },
        { status: 400 }
      );
    }

    const result = await submitConversion(file, 'pdf-to-word');

    return NextResponse.json({
      success: true,
      accessToken: result.accessToken,
      status: 'queued',
    }, {
      status: 202,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Could not submit PDF conversion job' },
      { status: 502 }
    );
  }
}
