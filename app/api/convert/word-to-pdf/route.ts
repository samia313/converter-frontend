import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';
import { submitConversion } from '@/lib/pdfilio-conversion';

export const runtime = 'nodejs';
export const maxDuration = 120;
export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Please select a Word document' },
        { status: 400 }
      );
    }

    const filename = file.name.toLowerCase();

    if (!filename.endsWith('.doc') && !filename.endsWith('.docx')) {
      return NextResponse.json(
        { success: false, error: 'Only DOC and DOCX files are supported' },
        { status: 400 }
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File must be between 1 byte and 50 MB' },
        { status: 400 }
      );
    }

    const result = await submitConversion(file, 'word-to-pdf');

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
      { success: false, error: 'Could not submit Word conversion job' },
      { status: 502 }
    );
  }
}
