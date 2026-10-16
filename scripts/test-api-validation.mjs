import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import JSZip from 'jszip';
import sharp from 'sharp';

const port = Number(process.env.PDFILIO_TEST_PORT || 3187);
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn('pnpm', ['exec', 'next', 'start', '-p', String(port)], {
  env: { ...process.env, PORT: String(port), HOSTNAME: '127.0.0.1' },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverOutput = '';
server.stdout.on('data', (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on('data', (chunk) => { serverOutput += chunk.toString(); });

async function waitForServer() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next server exited early:\n${serverOutput}`);
    try {
      const response = await fetch(`${baseUrl}/api/convert/rotate-pdf`, {
        method: 'POST',
        body: new FormData(),
        signal: AbortSignal.timeout(1500),
      });
      if (response.status === 400) return;
    } catch {
      // The local server may not be listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Next server did not become ready:\n${serverOutput}`);
}

async function postJson(path, body) {
  return fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
}

try {
  await waitForServer();

  const emptyRotate = await fetch(`${baseUrl}/api/convert/rotate-pdf`, {
    method: 'POST',
    body: new FormData(),
  });
  assert.equal(emptyRotate.status, 400, 'rotate route must reject a missing file');

  const emptySplit = await fetch(`${baseUrl}/api/convert/split-pdf`, {
    method: 'POST',
    body: new FormData(),
  });
  assert.equal(emptySplit.status, 400, 'split route must reject a missing file');

  const emptySummary = await postJson('/api/ai/summarize', {});
  assert.equal(emptySummary.status, 400, 'summarize route must reject missing document content');

  const emptyTranslation = await postJson('/api/ai/translate', {});
  assert.equal(emptyTranslation.status, 400, 'translate route must reject missing text and target language');

  // Exercise real conversion endpoints using a valid four-page PDF, not only error paths.
  const sourcePdf = await PDFDocument.create();
  for (let index = 0; index < 4; index += 1) sourcePdf.addPage([612, 792]);
  const sourceBytes = await sourcePdf.save();
  const sourceBlob = new Blob([sourceBytes], { type: 'application/pdf' });

  const rotateForm = new FormData();
  rotateForm.append('file', sourceBlob, 'api-smoke-test.pdf');
  rotateForm.append('rotation', '90');
  const rotateResponse = await fetch(`${baseUrl}/api/convert/rotate-pdf`, {
    method: 'POST', body: rotateForm, signal: AbortSignal.timeout(20_000),
  });
  assert.equal(rotateResponse.status, 200, `rotate should process a valid PDF; got ${rotateResponse.status}: ${await rotateResponse.clone().text()}`);
  assert.match(rotateResponse.headers.get('content-type') || '', /application\/pdf/i);
  const rotatedBytes = new Uint8Array(await rotateResponse.arrayBuffer());
  assert.equal(String.fromCharCode(...rotatedBytes.slice(0, 5)), '%PDF-');
  const rotatedPdf = await PDFDocument.load(rotatedBytes);
  assert.equal(rotatedPdf.getPageCount(), 4, 'rotation must preserve page count');
  assert.deepEqual(rotatedPdf.getPages().map((page) => page.getRotation().angle), [90, 90, 90, 90]);

  const splitForm = new FormData();
  splitForm.append('file', sourceBlob, 'api-smoke-test.pdf');
  splitForm.append('splitPage', '2');
  const splitResponse = await fetch(`${baseUrl}/api/convert/split-pdf`, {
    method: 'POST', body: splitForm, signal: AbortSignal.timeout(20_000),
  });
  assert.equal(splitResponse.status, 200, `split should process a valid PDF; got ${splitResponse.status}: ${await splitResponse.clone().text()}`);
  assert.match(splitResponse.headers.get('content-type') || '', /application\/zip/i);
  const zipBytes = new Uint8Array(await splitResponse.arrayBuffer());
  assert.deepEqual(Array.from(zipBytes.slice(0, 4)), [0x50, 0x4b, 0x03, 0x04]);
  const archive = await JSZip.loadAsync(zipBytes);
  const pdfEntries = Object.values(archive.files).filter((entry) => !entry.dir && entry.name.endsWith('.pdf'));
  assert.equal(pdfEntries.length, 2, 'split ZIP must contain exactly two PDF files');
  const splitPageCounts = [];
  for (const entry of pdfEntries) {
    const bytes = new Uint8Array(await entry.async('uint8array'));
    assert.equal(String.fromCharCode(...bytes.slice(0, 5)), '%PDF-');
    splitPageCounts.push((await PDFDocument.load(bytes)).getPageCount());
  }
  assert.deepEqual(splitPageCounts.sort((left, right) => left - right), [2, 2]);

  // Verify merge handles multiple real PDFs and returns a parseable combined document.
  const mergeForm = new FormData();
  mergeForm.append('files', sourceBlob, 'first.pdf');
  mergeForm.append('files', sourceBlob, 'second.pdf');
  const mergeResponse = await fetch(`${baseUrl}/api/convert/merge-pdf`, {
    method: 'POST', body: mergeForm, signal: AbortSignal.timeout(20_000),
  });
  assert.equal(mergeResponse.status, 200, `merge should process valid PDFs; got ${mergeResponse.status}: ${await mergeResponse.clone().text()}`);
  assert.match(mergeResponse.headers.get('content-type') || '', /application\/pdf/i);
  const mergedBytes = new Uint8Array(await mergeResponse.arrayBuffer());
  assert.equal(String.fromCharCode(...mergedBytes.slice(0, 5)), '%PDF-');
  const mergedPdf = await PDFDocument.load(mergedBytes);
  assert.equal(mergedPdf.getPageCount(), 8, 'merge should preserve all pages from both inputs');

  const invalidSplitForm = new FormData();
  invalidSplitForm.append('file', sourceBlob, 'api-smoke-test.pdf');
  invalidSplitForm.append('splitPage', '4');
  const invalidSplit = await fetch(`${baseUrl}/api/convert/split-pdf`, {
    method: 'POST', body: invalidSplitForm,
  });
  assert.equal(invalidSplit.status, 400, 'split must reject a split point at the last page');

  const malformedPdfForm = new FormData();
  malformedPdfForm.append('file', new Blob(['not a PDF'], { type: 'application/pdf' }), 'fake.pdf');
  const malformedPdf = await fetch(`${baseUrl}/api/convert/rotate-pdf`, {
    method: 'POST', body: malformedPdfForm,
  });
  assert.equal(malformedPdf.status, 400, 'rotation must reject spoofed PDF uploads');

  const malformedWordForm = new FormData();
  malformedWordForm.append('file', new Blob(['not a PDF'], { type: 'application/pdf' }), 'fake.pdf');
  const malformedWord = await fetch(`${baseUrl}/api/convert/pdf-to-word`, {
    method: 'POST', body: malformedWordForm, signal: AbortSignal.timeout(20_000),
  });
  assert.equal(malformedWord.status, 400, 'PDF-to-Word must reject spoofed PDF uploads');

  const { PDFParse } = await import('pdf-parse');
  const textlessPdfForm = new FormData();
  textlessPdfForm.append('file', sourceBlob, 'textless.pdf');
  const textlessParser = new PDFParse({ data: Buffer.from(sourceBytes) });
  let textlessDiagnostic = '';
  try {
    const result = await textlessParser.getText();
    textlessDiagnostic = result.text;
  } finally {
    await textlessParser.destroy();
  }
  const textlessWord = await fetch(`${baseUrl}/api/convert/pdf-to-word`, {
    method: 'POST', body: textlessPdfForm, signal: AbortSignal.timeout(20_000),
  });
  assert.equal(textlessWord.status, 422, `PDF-to-Word must reject textless PDFs rather than return an empty DOCX; got ${textlessWord.status}. Direct parser text: ${JSON.stringify(textlessDiagnostic.slice(0, 500))}. Server output: ${serverOutput.slice(-4000)}`);

  // Verify the local image-to-PDF route produces a real, parseable PDF.
  const pngBytes = await sharp({
    create: { width: 8, height: 6, channels: 3, background: { r: 220, g: 80, b: 40 } },
  }).png().toBuffer();
  const imageForm = new FormData();
  imageForm.append('file', new Blob([pngBytes], { type: 'image/png' }), 'smoke-test.png');
  const imageToPdf = await fetch(`${baseUrl}/api/convert/image-to-pdf`, {
    method: 'POST', body: imageForm, signal: AbortSignal.timeout(20_000),
  });
  assert.equal(imageToPdf.status, 200, `image-to-PDF should process a valid PNG; got ${imageToPdf.status}: ${await imageToPdf.clone().text()}`);
  assert.match(imageToPdf.headers.get('content-type') || '', /application\/pdf/i);
  const imagePdfBytes = new Uint8Array(await imageToPdf.arrayBuffer());
  assert.equal(String.fromCharCode(...imagePdfBytes.slice(0, 5)), '%PDF-');
  assert.equal((await PDFDocument.load(imagePdfBytes)).getPageCount(), 1, 'one uploaded image should produce one PDF page');

  const invalidImageForm = new FormData();
  invalidImageForm.append('file', new Blob(['not a PNG'], { type: 'image/png' }), 'fake.png');
  const invalidImage = await fetch(`${baseUrl}/api/convert/image-to-pdf`, {
    method: 'POST', body: invalidImageForm, signal: AbortSignal.timeout(20_000),
  });
  assert.equal(invalidImage.status, 415, 'image-to-PDF must reject spoofed image uploads');

  // Verify PDF-to-Excel generates a valid XLSX package from selectable PDF text.
  const textPdf = await PDFDocument.create();
  const textPage = textPdf.addPage([612, 792]);
  const testFont = await textPdf.embedFont(StandardFonts.Helvetica);
  textPage.drawText('PDFilio spreadsheet smoke test', { x: 48, y: 720, size: 16, font: testFont });
  textPage.drawText('Revenue 123', { x: 48, y: 690, size: 12, font: testFont });
  const textPdfBytes = await textPdf.save();
  // Diagnose the parser against the exact fixture before testing the HTTP route.
  const diagnosticParser = new PDFParse({ data: Buffer.from(textPdfBytes) });
  try {
    const diagnosticText = await diagnosticParser.getText();
    assert.match(diagnosticText.text, /PDFilio spreadsheet smoke test/, 'PDF text extractor must read the generated fixture');
  } catch (error) {
    throw new Error(`PDF-to-Excel test fixture text extraction failed: ${error instanceof Error ? error.stack || error.message : String(error)}`);
  } finally {
    await diagnosticParser.destroy();
  }
  const pdfToExcelForm = new FormData();
  pdfToExcelForm.append('file', new Blob([textPdfBytes], { type: 'application/pdf' }), 'spreadsheet-source.pdf');
  const pdfToExcel = await fetch(`${baseUrl}/api/convert/pdf-to-excel`, {
    method: 'POST', body: pdfToExcelForm, signal: AbortSignal.timeout(30_000),
  });
  assert.equal(pdfToExcel.status, 200, `PDF-to-Excel should convert selectable text; got ${pdfToExcel.status}: ${await pdfToExcel.clone().text()}\nServer output:\n${serverOutput.slice(-8000)}`);
  assert.match(pdfToExcel.headers.get('content-type') || '', /spreadsheetml\.sheet/i);
  const xlsxBytes = new Uint8Array(await pdfToExcel.arrayBuffer());
  assert.deepEqual(Array.from(xlsxBytes.slice(0, 4)), [0x50, 0x4b, 0x03, 0x04], 'XLSX output must be a ZIP package');
  const xlsx = await JSZip.loadAsync(xlsxBytes);
  const worksheet = await xlsx.file('xl/worksheets/sheet1.xml')?.async('string');
  assert.ok(worksheet, 'XLSX must contain a worksheet');
  assert.match(worksheet, /PDFilio spreadsheet smoke test/, 'XLSX should preserve extracted PDF text');
  assert.match(worksheet, /Revenue 123/, 'XLSX should preserve extracted values');

  const invalidRotationForm = new FormData();
  invalidRotationForm.append('file', sourceBlob, 'api-smoke-test.pdf');
  invalidRotationForm.append('rotation', '45');
  const invalidRotation = await fetch(`${baseUrl}/api/convert/rotate-pdf`, {
    method: 'POST', body: invalidRotationForm,
  });
  assert.equal(invalidRotation.status, 400, 'rotate route must reject unsupported angles');

  console.log('API smoke tests passed: missing inputs rejected; valid rotation, split, and merge produce parseable outputs; malformed files and invalid options rejected; textless PDF-to-Word input returns a clear 422; valid image-to-PDF output is parseable and spoofed images are rejected; PDF-to-Excel returns a valid XLSX with extracted text.');
} finally {
  server.kill('SIGTERM');
}
