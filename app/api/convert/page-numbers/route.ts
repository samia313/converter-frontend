import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { getDownloadHeaders, sanitizePdfDownloadFilename, validateOutputBuffer, validatePdfFile } from '@/lib/pdf-utils'

export const runtime = 'nodejs'
export const maxDuration = 120

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 })
    const validation = await validatePdfFile(file)
    if (!validation.valid) return NextResponse.json({ error: validation.error || 'Invalid PDF file.' }, { status: 400 })
    const start = Number(form.get('start') ?? 1)
    const fontSize = Number(form.get('fontSize') ?? 10)
    const position = String(form.get('position') ?? 'bottom-center')
    if (!Number.isInteger(start) || start < 1 || start > 999999) return NextResponse.json({ error: 'Starting number must be a positive integer.' }, { status: 400 })
    if (!Number.isInteger(fontSize) || fontSize < 6 || fontSize > 36) return NextResponse.json({ error: 'Font size must be between 6 and 36 points.' }, { status: 400 })
    if (!['bottom-left','bottom-center','bottom-right','top-left','top-center','top-right'].includes(position)) return NextResponse.json({ error: 'Invalid page number position.' }, { status: 400 })

    const bytes = new Uint8Array(await file.arrayBuffer())
    const pdf = await PDFDocument.load(bytes)
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const margin = Math.max(18, fontSize * 1.5)

    pdf.getPages().forEach((page, index) => {
      const label = String(start + index)
      const { width, height } = page.getSize()
      const textWidth = font.widthOfTextAtSize(label, fontSize)
      let x = margin
      if (position.endsWith('center')) x = (width - textWidth) / 2
      if (position.endsWith('right')) x = width - textWidth - margin
      const y = position.startsWith('top') ? height - margin - fontSize : margin
      page.drawText(label, { x, y, size: fontSize, font, color: rgb(0.2,0.2,0.2) })
    })

    const output = Buffer.from(await pdf.save())
    const outputValidation = validateOutputBuffer(output, 'Add Page Numbers')
    if (!outputValidation.valid) return NextResponse.json({ error: outputValidation.error || 'Generated PDF is invalid.' }, { status: 500 })
    const filename = sanitizePdfDownloadFilename(file.name, '_numbered.pdf')
    return new NextResponse(output, {
      headers: getDownloadHeaders(filename, output.length)
    })
  } catch (error) {
    console.error('Page Numbers error:', error)
    return NextResponse.json({ error: 'Could not add page numbers to this PDF.' }, { status: 500 })
  }
}