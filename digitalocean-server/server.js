const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const settings = require('./config/settings')
const authMiddleware = require('./middleware/auth')

const app = express()

fs.mkdirSync(settings.uploadTempDir, { recursive: true })

const allowedOrigins = new Set(settings.allowedOrigins.length
  ? settings.allowedOrigins
  : ['https://pdfilio.com', 'https://www.pdfilio.com'])

// Never use open CORS in production. Requests without an Origin are allowed for
// server-to-server health checks and Vercel/API proxy calls.
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true)
    return callback(new Error('Origin not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
}))

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: true }))

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, settings.uploadTempDir),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`),
})

const upload = multer({
  storage,
  limits: { fileSize: settings.maxFileSize, files: 1 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff']
    if (allowedMimes.includes(file.mimetype)) cb(null, true)
    else cb(Object.assign(new Error('Invalid file type'), { status: 400, code: 'INVALID_FILE_TYPE' }))
  },
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), activeTempDir: settings.uploadTempDir })
})

app.get('/version', (req, res) => {
  res.json({ version: '1.1.0', name: 'PDFilio Conversion Server' })
})

app.use('/convert', authMiddleware)
const convertRoutes = require('./routes/convert')
app.use('/convert', convertRoutes)

app.use((err, req, res, next) => {
  console.error('[ERROR]', err)
  const status = Number.isInteger(err.status) ? err.status : (err.code === 'LIMIT_FILE_SIZE' ? 413 : 500)
  const message = status >= 500 ? 'Conversion server error' : (err.message || 'Request failed')
  res.status(status).json({ error: message, code: err.code || 'INTERNAL_ERROR' })
})

app.use((req, res) => res.status(404).json({ error: 'Endpoint not found', code: 'NOT_FOUND' }))

// Remove abandoned uploads/temp conversion artifacts. Never touch files newer than the TTL.
const cleanupTempFiles = () => {
  const cutoff = Date.now() - settings.cleanupInterval
  try {
    for (const entry of fs.readdirSync(settings.uploadTempDir, { withFileTypes: true })) {
      const target = `${settings.uploadTempDir}/${entry.name}`
      try {
        const stat = fs.statSync(target)
        if (stat.mtimeMs < cutoff) fs.rmSync(target, { recursive: true, force: true })
      } catch (error) {
        console.warn('[CLEANUP] Could not inspect:', target, error.message)
      }
    }
  } catch (error) {
    console.error('[CLEANUP] Scan failed:', error.message)
  }
}

const cleanupTimer = setInterval(cleanupTempFiles, settings.cleanupInterval)
cleanupTimer.unref()
cleanupTempFiles()

const PORT = settings.port
const server = app.listen(PORT, () => {
  console.log(`[SERVER] PDFilio Conversion Server running on port ${PORT}`)
  console.log(`[SERVER] Environment: ${settings.nodeEnv}`)
  console.log(`[SERVER] Max concurrent conversions: ${settings.maxConcurrentConversions}`)
})

const shutdown = (signal) => {
  console.log(`[SERVER] ${signal} received, shutting down gracefully`)
  clearInterval(cleanupTimer)
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(1), 10000).unref()
}
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
