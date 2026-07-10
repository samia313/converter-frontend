import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, fileName } = body;

    if (!question) {
      return NextResponse.json(
        { error: 'No question provided' },
        { status: 400 }
      );
    }

    // Mock AI response - in production, use actual AI service
    const mockAnswers: Record<string, string> = {
      'what': 'This document discusses various topics and contains important information relevant to your query.',
      'when': 'The document was created and processed recently. Specific dates and timelines are mentioned throughout.',
      'where': 'The document covers multiple locations and regions with relevant details for each.',
      'how': 'The document provides step-by-step explanations and detailed instructions on how to approach various topics.',
      'why': 'The document explains the reasoning and background for the decisions and conclusions presented.',
      'summary': 'This document provides comprehensive information on its subject matter with detailed explanations and analysis.',
      'explain': 'I can explain the concepts covered in the document. Please feel free to ask specific questions about any section.',
      'help': 'I am here to help you understand the content of your PDF. Ask me any questions about the document.',
    };

    // Find matching response
    let answer = 'I have reviewed the document. Could you please ask a more specific question about its content?';
    
    const questionLower = question.toLowerCase();
    for (const [key, value] of Object.entries(mockAnswers)) {
      if (questionLower.includes(key)) {
        answer = value;
        break;
      }
    }

    return NextResponse.json({
      answer: answer,
      question: question,
      fileName: fileName,
    });
  } catch (error) {
    console.error('[v0] PDF Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
