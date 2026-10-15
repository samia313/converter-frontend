import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

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

  console.log('API smoke tests passed: rotate/split reject missing files; summarize/translate reject missing input.');
} finally {
  server.kill('SIGTERM');
}
