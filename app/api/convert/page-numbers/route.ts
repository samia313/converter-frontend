import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export const runtime = 'nodejs'
export const maxDuration = 120
const MAX_FILE_SIZE = 100 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 })
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({ error: 'Only PDF files are supported.' }, { status: 415 })
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'The PDF exceeds the 100 MB upload limit.' }, { status: 413 })
    const start = Number(form.get('start') ?? 1)
    const fontSize = Number(form.get('fontSize') ?? 10)
    const position = String(form.get('position') ?? 'bottom-center')
    if (!Number.isInteger(start) || start < 1 || start > 999999) return NextResponse.json({ error: 'Starting number must be a positive integer.' }, { status: 400 })
    if (!Number.isInteger(fontSize) || fontSize < 6 || fontSize > 36) return NextResponse.json({ error: 'Font size must be between 6 and 36 points.' }, { status: 400 })
    if (!['bottom-left','bottom-center','bottom-right','top-left','top-center','top-right'].includes(position)) return NextResponse.json({ error: 'Invalid page number position.' }, { status: 400 })

    const bytes = new Uint8Array(await file.arrayBuffer())
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') return NextResponse.json({ error: 'The uploaded file is not a valid PDF.' }, { status: 422 })
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

    const output = await pdf.save()
    const name = file.name.replace(/\.pdf$/i, '') + '_numbered.pdf'
    return new NextResponse(output as BodyInit, {
      headers: { 'Content-Type':'application/pdf', 'Content-Disposition':`attachment; filename="${name}"`, 'Content-Length':String(output.length), 'Cache-Control':'no-store' }
    })
  } catch (error) {
    console.error('Page Numbers error:', error)
    return NextResponse.json({ error: 'Could not add page numbers to this PDF.' }, { status: 500 })
  }
}