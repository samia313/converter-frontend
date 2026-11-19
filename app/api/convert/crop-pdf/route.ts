import { enforceRateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import { getDownloadHeaders, sanitizePdfDownloadFilename, validateOutputBuffer, validatePdfFile } from '@/lib/pdf-utils'

export const runtime = 'nodejs'
export const maxDuration = 120

function num(value: FormDataEntryValue | null) {
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await enforceRateLimit(request, { namespace: 'conversion', limit: 10, window: '1 m' });
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Please upload a PDF file.' }, { status: 400 })
    const validation = await validatePdfFile(file)
    if (!validation.valid) return NextResponse.json({ error: validation.error || 'Invalid PDF file.' }, { status: 400 })

    const left = num(form.get('left'))
    const right = num(form.get('right'))
    const top = num(form.get('top'))
    const bottom = num(form.get('bottom'))
    if ([left, right, top, bottom].some(v => !Number.isFinite(v) || v < 0 || v > 1000)) {
      return NextResponse.json({ error: 'Crop margins must be numbers from 0 to 1000 points.' }, { status: 400 })
    }

    const bytes = new Uint8Array(await file.arrayBuffer())

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

    const output = Buffer.from(await pdf.save())
    const outputValidation = validateOutputBuffer(output, 'Crop PDF')
    if (!outputValidation.valid) return NextResponse.json({ error: outputValidation.error || 'Generated PDF is invalid.' }, { status: 500 })
    const filename = sanitizePdfDownloadFilename(file.name, '_cropped.pdf')
    return new NextResponse(output, { headers: getDownloadHeaders(filename, output.length) })
  } catch (error) {
    console.error('Crop PDF error:', error)
    return NextResponse.json({ error: 'Could not crop this PDF. The file may be damaged, encrypted, or unsupported.' }, { status: 500 })
  }
}