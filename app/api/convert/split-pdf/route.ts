import { NextRequest, NextResponse } from 'next/server';
import { validatePdfFile, splitPdf, getDownloadHeaders } from '@/lib/pdf-utils';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const splitPageStr = formData.get('splitPage') as string;

    // Validate file
    const validation = await validatePdfFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const splitPage = splitPageStr ? parseInt(splitPageStr, 10) : undefined;

    // Split
    const result = await splitPdf(buffer, splitPage);
    if (!result.success) {
      console.error('[v0] Split error:', result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const fileName = file.name.replace(/\.pdf$/i, '');
    const filename = `${fileName}-part1-${Date.now()}.pdf`;

    return new NextResponse(result.data, {
      headers: getDownloadHeaders(filename, result.data!.length),
      status: 200,
    });
  } catch (error) {
    console.error('[v0] Split PDF error:', error);
    return NextResponse.json(
      { error: 'Split failed. Please try again.' },
      { status: 500 }
    );
  }
}
