import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const length = (formData.get('length') as string) || 'medium';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Mock summary response - in production, use AI service
    let summary = '';

    if (length === 'short') {
      summary = `Summary (Short):\n\nThis document covers key topics and important information. The main points include essential details and conclusions relevant to the subject matter.`;
    } else if (length === 'long') {
      summary = `Summary (Long):\n\nThis comprehensive document addresses multiple aspects of the topic in detail. 

Key Sections:
1. Introduction and Background: The document begins with important context and historical perspective.

2. Main Content: The core material discusses essential concepts, methodologies, and practical applications.

3. Analysis and Findings: Detailed examination of the subject matter with supporting evidence and data.

4. Conclusions: Summary of findings and their implications for future work.

5. Recommendations: Suggested next steps and considerations for implementation.

Important Details: The document emphasizes critical information and provides thorough explanation of complex topics.`;
    } else {
      summary = `Summary (Medium):\n\nThis document provides a balanced overview of the subject matter with key points and important details.

Main Topics:
- Core concepts and foundational information
- Detailed explanation of primary themes
- Analysis of relevant data and findings
- Key takeaways and conclusions

The document effectively covers the essential information while maintaining clarity and comprehensive coverage.`;
    }

    return NextResponse.json({
      summary: summary,
      fileName: file.name,
      length: length,
    });
  } catch (error) {
    console.error('[v0] AI Summary error:', error);
    return NextResponse.json(
      { error: 'Summary generation failed' },
      { status: 500 }
    );
  }
}
