const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const { pdfToWord } = require('../converters')

const fixture = process.env.PDF_TO_WORD_FIXTURE
if (!fixture) {
  console.log('SKIP: set PDF_TO_WORD_FIXTURE=/absolute/path/to/sample.pdf to run the live engine test')
  process.exit(0)
}
if (!fs.existsSync(fixture)) throw new Error(`Fixture not found: ${fixture}`)

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pdfilio-pdf-to-word-'))
const output = path.join(dir, 'output.docx')

try {
  pdfToWord(fixture, output)
    .then(() => {
      assert.ok(fs.existsSync(output), 'DOCX output was not created')
      assert.ok(fs.statSync(output).size > 0, 'DOCX output is empty')
      const type = execFileSync('file', ['-b', output], { encoding: 'utf8' }).trim()
      assert.match(type, /Microsoft Word|Zip archive/i, `Unexpected DOCX type: ${type}`)
      console.log(`PASS: PDF→Word produced valid DOCX (${fs.statSync(output).size} bytes)`)
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
