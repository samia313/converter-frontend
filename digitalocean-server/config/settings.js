require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3001,
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
  },

  // File Settings
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || 104857600), // 100MB
  uploadTempDir: process.env.UPLOAD_TEMP_DIR || '/tmp',
  cleanupInterval: parseInt(process.env.CLEANUP_INTERVAL || 86400000), // 24 hours

  // Conversion
  conversionTimeout: parseInt(process.env.CONVERSION_TIMEOUT || 60000),
  maxConcurrentConversions: parseInt(process.env.MAX_CONCURRENT_CONVERSIONS || 5),

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
}
