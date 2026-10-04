require('dotenv').config()

const intEnv = (name, fallback) => {
  const value = Number.parseInt(process.env[name] || '', 10)
  return Number.isFinite(value) && value > 0 ? value : fallback
}

module.exports = {
  port: intEnv('PORT', 3001),
  nodeEnv: process.env.NODE_ENV || 'development',

  // API Settings
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,

  // Spaces Configuration
  spaces: {
    key: process.env.SPACES_KEY,
    secret: process.env.SPACES_SECRET,
    bucket: process.env.SPACES_BUCKET,
    endpoint: process.env.SPACES_ENDPOINT,
    region: process.env.SPACES_REGION,
    signedUrlTtl: Math.min(intEnv('SIGNED_URL_TTL', 900), 3600), // 15 minutes, max 1 hour
  },

  // File Settings
  maxFileSize: intEnv('MAX_FILE_SIZE', 100 * 1024 * 1024),
  uploadTempDir: process.env.UPLOAD_TEMP_DIR || '/tmp/pdfilio',
  cleanupInterval: intEnv('CLEANUP_INTERVAL', 60 * 60 * 1000),

  // Conversion
  conversionTimeout: intEnv('CONVERSION_TIMEOUT', 60 * 1000),
  maxConcurrentConversions: intEnv('MAX_CONCURRENT_CONVERSIONS', 5),

  // CORS: comma-separated origins. Empty means same-origin/server-to-server only.
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),

  // Queue / worker
  redisUrl: process.env.REDIS_URL,
  queueName: process.env.CONVERSION_QUEUE_NAME || 'pdfilio-conversion',
  queuePrefix: process.env.CONVERSION_QUEUE_PREFIX || 'pdfilio',
  workerConcurrency: intEnv('WORKER_CONCURRENCY', 1),
  jobAttempts: intEnv('JOB_ATTEMPTS', 3),
  jobBackoffMs: intEnv('JOB_BACKOFF_MS', 5000),
  outputTtlMs: intEnv('OUTPUT_TTL_MS', 24 * 60 * 60 * 1000),

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
}
