const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const script = path.join(__dirname, '..', 'scripts', 'check-config.js');
const validEnv = {
  PATH: process.env.PATH || '',
  NODE_ENV: 'production',
  API_KEY: 'test-api-key-not-real',
  JWT_SECRET: 'test-jwt-secret-not-real',
  SPACES_KEY: 'test-spaces-key-not-real',
  SPACES_SECRET: 'test-spaces-secret-not-real',
  SPACES_BUCKET: 'test-bucket',
  SPACES_ENDPOINT: 'https://sgp1.digitaloceanspaces.com',
  SPACES_REGION: 'sgp1',
  REDIS_URL: 'rediss://default:test-password@redis.example:6379',
};

function run(overrides = {}) {
  return spawnSync(process.execPath, [script], {
    encoding: 'utf8',
    env: { ...validEnv, ...overrides },
    timeout: 5000,
  });
}

test('passes when required variables and secure production URL formats are present', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /preflight: PASSED/);
  assert.doesNotMatch(result.stdout + result.stderr, /test-api-key-not-real|test-jwt-secret-not-real|test-password/);
});

test('fails when required configuration is missing without printing values', () => {
  const result = run({ SPACES_SECRET: '' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Missing required variable names: SPACES_SECRET/);
  assert.doesNotMatch(result.stdout + result.stderr, /test-api-key-not-real|test-password/);
});

test('rejects plaintext Redis in production', () => {
  const result = run({ REDIS_URL: 'redis://redis.example:6379' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /REDIS_URL must use rediss:\/\/ in production/);
  assert.doesNotMatch(result.stdout + result.stderr, /test-password/);
});

test('rejects non-HTTPS Spaces endpoints', () => {
  const result = run({ SPACES_ENDPOINT: 'http://sgp1.digitaloceanspaces.com' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /SPACES_ENDPOINT must be a clean HTTPS endpoint/);
});
