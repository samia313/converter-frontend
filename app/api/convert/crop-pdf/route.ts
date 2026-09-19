import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export const runtime = 'nodejs'
export const maxDuration = 120

const MAX_FILE_SIZE = 100 * 1024 * 1024

function num(value: FormDataEntryValue | null) {
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 })
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) return NextResponse.json({ error: 'Only PDF files are supported.' }, { status: 415 })
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'The PDF exceeds the 100 MB upload limit.' }, { status: 413 })

    const left = num(form.get('left'))
    const right = num(form.get('right'))
    const top = num(form.get('top'))
    const bottom = num(form.get('bottom'))
    if ([left, right, top, bottom].some(v => !Number.isFinite(v) || v < 0 || v > 1000)) {
      return NextResponse.json({ error: 'Crop margins must be numbers from 0 to 1000 points.' }, { status: 400 })
    }

    const bytes = new Uint8Array(await file.arrayBuffer())
    if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') return NextResponse.json({ error: 'The uploaded file is not a valid PDF.' }, { status: 422 })

    const pdf = await PDFDocument.load(bytes)
    for (const page of pdf.getPages()) {
      const box = page.getMediaBox()
      const width = box.width
      const height = box.height
      if (left + right >= width || top + bottom >= height) {
        return NextResponse.json({ error: 'The crop margins are too large for at least one page.' }, { status: 400 })
      }
      page.setCropBox(box.x + left, box.y + bottom, width - left - right, height - top - bottom)
    }

    const output = await pdf.save()
    const name = file.name.replace(/\.pdf$/i, '') + '_cropped.pdf'
    return new NextResponse(output as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${name}"`,
        'Content-Length': String(output.length),
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Crop PDF error:', error)
    return NextResponse.json({ error: 'Could not crop this PDF. The file may be damaged, encrypted, or unsupported.' }, { status: 500 })
  }
}