const required = [
  'API_KEY',
  'JWT_SECRET',
  'SPACES_KEY',
  'SPACES_SECRET',
  'SPACES_BUCKET',
  'SPACES_ENDPOINT',
  'SPACES_REGION',
  'REDIS_URL',
];

const missing = required.filter((name) => !String(process.env[name] || '').trim());
const problems = [];

if (!missing.includes('SPACES_ENDPOINT') && process.env.SPACES_ENDPOINT) {
  try {
    const endpoint = new URL(process.env.SPACES_ENDPOINT);
    if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password || endpoint.search || endpoint.hash) {
      problems.push('SPACES_ENDPOINT must be a clean HTTPS endpoint without embedded credentials, query, or fragment.');
    }
  } catch {
    problems.push('SPACES_ENDPOINT must be a valid HTTPS URL.');
  }
}

if (!missing.includes('REDIS_URL') && process.env.REDIS_URL) {
  try {
    const redis = new URL(process.env.REDIS_URL);
    const allowedProtocols = process.env.NODE_ENV === 'production' ? ['rediss:'] : ['redis:', 'rediss:'];
    if (!allowedProtocols.includes(redis.protocol)) {
      problems.push(process.env.NODE_ENV === 'production'
        ? 'REDIS_URL must use rediss:// in production.'
        : 'REDIS_URL must use redis:// or rediss://.');
    }
    if (!redis.hostname) problems.push('REDIS_URL must include a host.');
  } catch {
    problems.push('REDIS_URL must be a valid Redis connection URL.');
  }
}

if (!String(process.env.API_KEY || '').trim() || !String(process.env.JWT_SECRET || '').trim()) {
  // The missing-variable list above covers absent values; this also rejects blanks.
}

if (missing.length || problems.length) {
  console.error('PDFilio worker configuration preflight: FAILED');
  if (missing.length) console.error('Missing required variable names: ' + missing.join(', '));
  for (const problem of problems) console.error('- ' + problem);
  console.error('No environment-variable values were printed.');
  process.exit(1);
}

console.log('PDFilio worker configuration preflight: PASSED (presence and URL format only; connectivity not tested).');
