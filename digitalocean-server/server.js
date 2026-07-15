const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const settings = require('./config/settings')
const authMiddleware = require('./middleware/auth')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '100mb', extended: true }))

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = settings.uploadTempDir
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: settings.maxFileSize },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  },
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

// Version endpoint
app.get('/version', (req, res) => {
  res.json({ version: '1.0.0', name: 'PDFilio Conversion Server' })
})

// Apply auth middleware to all conversion routes
app.use('/convert', authMiddleware)

// Import conversion routes
const convertRoutes = require('./routes/convert')
app.use('/convert', convertRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    code: err.code || 'INTERNAL_ERROR',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Start server
const PORT = settings.port
app.listen(PORT, () => {
  console.log(`[SERVER] PDFilio Conversion Server running on port ${PORT}`)
  console.log(`[SERVER] Environment: ${settings.nodeEnv}`)
})
