import { NextRequest, NextResponse } from 'next/server';
import { mergePdfs, getDownloadHeaders } from '@/lib/pdf-utils';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = (formData.getAll('files') as File[]) || [];

    // Merge PDFs
    const result = await mergePdfs(files);
    if (!result.success) {
      console.error('[v0] Merge error:', result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const filename = `merged-${Date.now()}.pdf`;
    return new NextResponse(result.data, {
      headers: {
        ...getDownloadHeaders(filename, result.data!.length),
        'X-Pages': String(result.metadata?.pages || 0),
      },
      status: 200,
    });
  } catch (error) {
    console.error('[v0] Merge PDF error:', error);
    return NextResponse.json(
      { error: 'Merging failed. Please try again.' },
      { status: 500 }
    );
  }
}
