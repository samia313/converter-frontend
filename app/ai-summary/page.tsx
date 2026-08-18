import { Metadata } from 'next';
import AISummaryTool from '@/components/tools/ai-summary-tool';

export const metadata: Metadata = {
  title: 'AI Document Summary | PDFilio',
  description: 'Generate a summary of a supported PDF document using AI.',
  keywords: 'AI summary, document summary, PDF summary, text summarization',
  alternates: { canonical: 'https://pdfilio.com/ai-summary' },
};

export default function AISummaryPage() {
  return <AISummaryTool />;
}
