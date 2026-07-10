import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Mock PDF loading response
    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileSize: file.size,
      message: `PDF loaded: ${file.name}`,
    });
  } catch (error) {
    console.error('[v0] PDF Chat load error:', error);
    return NextResponse.json(
      { error: 'Failed to load PDF' },
      { status: 500 }
    );
  }
}
