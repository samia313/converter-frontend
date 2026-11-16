import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';
import {
  verifyJobToken,
  downloadConversion,
} from '@/lib/pdfilio-conversion';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion-download', limit: 20, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const authorization = request.headers.get('authorization') || '';
    const token = authorization.startsWith('Bearer ')
      ? authorization.slice(7)
      : '';

    const jobId = verifyJobToken(token, 'word-to-pdf');

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired job token' },
        { status: 401 }
      );
    }

    const file = await downloadConversion(jobId);

    const safeFilename = file.filename
      .replace(/[\r\n"\\]/g, '_')
      .replace(/[^\x20-\x7E]/g, '_')
      .slice(0, 180) || 'converted-file.pdf';

    return new Response(file.body, {
      status: 200,
      headers: {
        'Content-Type': file.mimeType,
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Converted file is not ready or download failed' },
      { status: 502 }
    );
  }
}
