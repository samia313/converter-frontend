const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const settings = require('../config/settings')
const converters = require('../converters')
const spacesService = require('../utils/spaces')

// Multer setup
const storage = multer.diskStorage({
  destination: settings.uploadTempDir,
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: settings.maxFileSize },
})

// Helper to clean up files
const cleanupFile = (filepath) => {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath)
  }
}

// PDF to Word conversion
router.post('/pdf-to-word', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    console.log('[CONVERT] PDF to Word:', req.file.filename)

    const inputPath = req.file.path
    const outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.docx`)

    // Convert using LibreOffice
    await converters.pdfToWord(inputPath, outputPath)

    // Upload to Spaces
    const fileBuffer = fs.readFileSync(outputPath)
    const spacesUrl = await spacesService.uploadFile(
      fileBuffer,
      `${uuidv4()}.docx`,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )

    // Cleanup
    cleanupFile(inputPath)
    cleanupFile(outputPath)

    res.json({
      success: true,
      format: 'docx',
      downloadUrl: spacesUrl,
    })
  } catch (error) {
    if (req.file) cleanupFile(req.file.path)
    next(error)
  }
})

// PDF to Excel conversion
router.post('/pdf-to-excel', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    console.log('[CONVERT] PDF to Excel:', req.file.filename)

    const inputPath = req.file.path
    const outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.xlsx`)

    // Convert using LibreOffice
    await converters.pdfToExcel(inputPath, outputPath)

    // Upload to Spaces
    const fileBuffer = fs.readFileSync(outputPath)
    const spacesUrl = await spacesService.uploadFile(
      fileBuffer,
      `${uuidv4()}.xlsx`,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    // Cleanup
    cleanupFile(inputPath)
    cleanupFile(outputPath)

    res.json({
      success: true,
      format: 'xlsx',
      downloadUrl: spacesUrl,
    })
  } catch (error) {
    if (req.file) cleanupFile(req.file.path)
    next(error)
  }
})

// PDF to PowerPoint conversion
router.post('/pdf-to-ppt', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    console.log('[CONVERT] PDF to PowerPoint:', req.file.filename)

    const inputPath = req.file.path
    const outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.pptx`)

    // Convert using LibreOffice
    await converters.pdfToPowerPoint(inputPath, outputPath)

    // Upload to Spaces
    const fileBuffer = fs.readFileSync(outputPath)
    const spacesUrl = await spacesService.uploadFile(
      fileBuffer,
      `${uuidv4()}.pptx`,
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    )

    // Cleanup
    cleanupFile(inputPath)
    cleanupFile(outputPath)

    res.json({
      success: true,
      format: 'pptx',
      downloadUrl: spacesUrl,
    })
  } catch (error) {
    if (req.file) cleanupFile(req.file.path)
    next(error)
  }
})

// PDF to Images conversion
router.post('/pdf-to-images', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    console.log('[CONVERT] PDF to Images:', req.file.filename)

    const inputPath = req.file.path
    const outputDir = path.join(settings.uploadTempDir, uuidv4())

    // Convert to images
    const imageUrls = await converters.pdfToImages(inputPath, outputDir)

    // Cleanup
    cleanupFile(inputPath)

    res.json({
      success: true,
      format: 'images',
      count: imageUrls.length,
      downloadUrls: imageUrls,
    })
  } catch (error) {
    if (req.file) cleanupFile(req.file.path)
    next(error)
  }
})

// PDF OCR conversion
router.post('/pdf-ocr', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' })
    }

    console.log('[CONVERT] PDF OCR:', req.file.filename)

    const inputPath = req.file.path
    const outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.pdf`)

    // Extract text using OCR
    const extractedText = await converters.pdfOCR(inputPath, outputPath)

    // Upload to Spaces
    const fileBuffer = fs.readFileSync(outputPath)
    const spacesUrl = await spacesService.uploadFile(
      fileBuffer,
      `${uuidv4()}.pdf`,
      'application/pdf'
    )

    // Cleanup
    cleanupFile(inputPath)
    cleanupFile(outputPath)

    res.json({
      success: true,
      format: 'pdf',
      textExtracted: extractedText.substring(0, 500), // Preview
      downloadUrl: spacesUrl,
    })
  } catch (error) {
    if (req.file) cleanupFile(req.file.path)
    next(error)
  }
})

module.exports = router
