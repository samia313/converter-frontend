import { Document, Packer, Paragraph, convertInchesToTwip } from 'docx';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export async function convertPdfToWord(pdfFile: File): Promise<Buffer> {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const paragraphs: Paragraph[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      paragraphs.push(
        new Paragraph({
          text: pageText || `[Page ${i}]`,
          spacing: { after: 400 },
        })
      );
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    return buffer;
  } catch (error) {
    throw new Error(`Failed to convert PDF to Word: ${error}`);
  }
}

export async function convertWordToPdf(docFile: File): Promise<Buffer> {
  // Note: Full Word to PDF conversion requires a backend service like libreoffice or similar
  // This is a simplified implementation that returns a placeholder PDF
  // For production, consider using a service like:
  // - LibreOffice on server
  // - CloudConvert API
  // - FileConverterAPI
  
  throw new Error(
    'Word to PDF conversion requires a server-side implementation. Please use our API endpoint instead.'
  );
}
