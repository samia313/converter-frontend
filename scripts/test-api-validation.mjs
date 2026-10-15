import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

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

  const invalidRotationForm = new FormData();
  invalidRotationForm.append('file', sourceBlob, 'api-smoke-test.pdf');
  invalidRotationForm.append('rotation', '45');
  const invalidRotation = await fetch(`${baseUrl}/api/convert/rotate-pdf`, {
    method: 'POST', body: invalidRotationForm,
  });
  assert.equal(invalidRotation.status, 400, 'rotate route must reject unsupported angles');

  console.log('API smoke tests passed: missing inputs rejected; valid PDF rotation and split produce parseable outputs; invalid angle rejected.');
} finally {
  server.kill('SIGTERM');
}
