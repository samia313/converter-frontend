const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const { pdfToWord } = require('../converters')

function createSmokePdf(filePath) {
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    '<< /Length 57 >>\nstream\nBT /F1 18 Tf 72 720 Td (PDFilio PDF to Word smoke test) Tj ET\nendstream',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf, 'binary'))
    pdf += (i + 1) + ' 0 obj\n' + objects[i] + '\nendobj\n'
  }
  const xref = Buffer.byteLength(pdf, 'binary')
  pdf += 'xref\n0 ' + (objects.length + 1) + '\n0000000000 65535 f \n'
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n'
  }
  pdf += 'trailer\n<< /Size ' + (objects.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF\n'
  fs.writeFileSync(filePath, pdf, 'binary')
}

const suppliedFixture = process.env.PDF_TO_WORD_FIXTURE
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfilio-pdf-to-word-'))
const fixture = suppliedFixture || path.join(dir, 'smoke.pdf')
const output = path.join(dir, 'output.docx')

try {
  if (suppliedFixture) {
    if (!fs.existsSync(suppliedFixture)) throw new Error('Fixture not found: ' + suppliedFixture)
  } else {
    createSmokePdf(fixture)
  }

  pdfToWord(fixture, output)
    .then(() => {
      assert.ok(fs.existsSync(output), 'DOCX output was not created')
      assert.ok(fs.statSync(output).size > 0, 'DOCX output is empty')
      const type = execFileSync('file', ['-b', output], { encoding: 'utf8' }).trim()
      assert.match(type, /Microsoft Word|Zip archive/i, 'Unexpected DOCX type: ' + type)
      console.log('PASS: PDF→Word produced valid DOCX (' + fs.statSync(output).size + ' bytes)')
    })
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
    .finally(() => fs.rmSync(dir, { recursive: true, force: true }))
} catch (error) {
  fs.rmSync(dir, { recursive: true, force: true })
  throw error
}