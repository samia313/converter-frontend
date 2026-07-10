import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Simply return the file (accepts any input)
    const bytes = await file.arrayBuffer();
    const filename = file.name.includes('.') 
      ? file.name.replace(/\.[^.]*$/, '.pdf')
      : `${file.name}.pdf`;

    return new NextResponse(bytes, {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    );
  }
}
