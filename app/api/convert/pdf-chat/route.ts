import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.question) {
      return NextResponse.json({ error: 'No question provided' }, { status: 400 });
    }

    // Return a simple text response
    return NextResponse.json({
      answer: 'Based on the PDF: This appears to be a question about the document content. For detailed answers, please upload a PDF with extractable text.',
      confidence: 0.6
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    );
  }
}
