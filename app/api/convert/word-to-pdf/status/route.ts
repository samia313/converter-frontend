import { NextRequest, NextResponse } from 'next/server';
import {
  verifyJobToken,
  getConversionStatus,
} from '@/lib/pdfilio-conversion';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

    const status = await getConversionStatus(jobId);

    return NextResponse.json({
      success: true,
      state: status.state,
      progress: Number.isFinite(Number(status.progress))
        ? Number(status.progress)
        : 0,
      ...(status.state === 'failed'
        ? { error: 'Word to PDF conversion failed' }
        : {}),
    }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Could not check conversion status' },
      { status: 502 }
    );
  }
}
