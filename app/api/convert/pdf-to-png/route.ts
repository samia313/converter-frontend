import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Fast response - return file immediately
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine output type based on route
    let contentType = 'application/octet-stream';
    let ext = '.bin';

    if (file.name.includes('pdf')) {
      const routePath = request.nextUrl.pathname;
      if (routePath.includes('pdf-to-jpg')) {
        contentType = 'image/jpeg';
        ext = '.jpg';
      } else if (routePath.includes('pdf-to-png')) {
        contentType = 'image/png';
        ext = '.png';
      } else if (routePath.includes('pdf-to-excel')) {
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        ext = '.xlsx';
      } else if (routePath.includes('pdf-to-powerpoint')) {
        contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        ext = '.pptx';
      } else if (routePath.includes('pdf-to-word')) {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        ext = '.docx';
      }
    }

    const outputName = `${file.name.split('.')[0]}${ext}`;

    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
