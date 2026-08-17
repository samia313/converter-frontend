const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const settings = require('../config/settings')
const converters = require('../converters')
const spacesService = require('../utils/spaces')

const storage = multer.diskStorage({
  destination: settings.uploadTempDir,
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`),
})

const upload = multer({
  storage,
  limits: { fileSize: settings.maxFileSize, files: 1 },
})

const cleanupFile = (filepath) => {
  if (!filepath) return
  try { fs.rmSync(filepath, { recursive: true, force: true }) } catch (error) { console.warn('[CLEANUP]', filepath, error.message) }
}

const assertPdf = (filepath) => {
  const fd = fs.openSync(filepath, 'r')
  try {
    const header = Buffer.alloc(5)
    const bytesRead = fs.readSync(fd, header, 0, 5, 0)
    if (bytesRead !== 5 || header.toString('ascii') !== '%PDF-') {
      const error = new Error('Uploaded file is not a valid PDF')
      error.status = 400
      error.code = 'INVALID_PDF'
      throw error
    }
  } finally { fs.closeSync(fd) }
}

const requireFile = (req) => {
  if (!req.file) {
    const error = new Error('No file provided')
    error.status = 400
    error.code = 'NO_FILE'
    throw error
  }
  assertPdf(req.file.path)
  return req.file
}

const convertAndUpload = async ({ inputPath, outputPath, filename, mimeType, converter }) => {
  await converter(inputPath, outputPath)
  if (!fs.existsSync(outputPath) || fs.statSync(outputPath).size === 0) throw new Error('Conversion produced an empty output')
  return spacesService.uploadFile(outputPath, filename, mimeType)
}

router.post('/pdf-to-word', upload.single('file'), async (req, res, next) => {
  let outputPath
  try {
    const file = requireFile(req)
    outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.docx`)
    const downloadUrl = await convertAndUpload({ inputPath: file.path, outputPath, filename: `${path.basename(file.originalname, '.pdf')}.docx`, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', converter: converters.pdfToWord })
    res.json({ success: true, format: 'docx', downloadUrl })
  } catch (error) { next(error) } finally { cleanupFile(req.file?.path); cleanupFile(outputPath) }
})

router.post('/pdf-to-excel', upload.single('file'), async (req, res, next) => {
  let outputPath
  try {
    const file = requireFile(req)
    outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.xlsx`)
    const downloadUrl = await convertAndUpload({ inputPath: file.path, outputPath, filename: `${path.basename(file.originalname, '.pdf')}.xlsx`, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', converter: converters.pdfToExcel })
    res.json({ success: true, format: 'xlsx', downloadUrl })
  } catch (error) { next(error) } finally { cleanupFile(req.file?.path); cleanupFile(outputPath) }
})

router.post('/pdf-to-ppt', upload.single('file'), async (req, res, next) => {
  let outputPath
  try {
    const file = requireFile(req)
    outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.pptx`)
    const downloadUrl = await convertAndUpload({ inputPath: file.path, outputPath, filename: `${path.basename(file.originalname, '.pdf')}.pptx`, mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', converter: converters.pdfToPowerPoint })
    res.json({ success: true, format: 'pptx', downloadUrl })
  } catch (error) { next(error) } finally { cleanupFile(req.file?.path); cleanupFile(outputPath) }
})

router.post('/pdf-to-images', upload.single('file'), async (req, res, next) => {
  let outputDir
  try {
    const file = requireFile(req)
    outputDir = path.join(settings.uploadTempDir, `images-${uuidv4()}`)
    const imageUrls = await converters.pdfToImages(file.path, outputDir)
    res.json({ success: true, format: 'images', count: imageUrls.length, downloadUrls: imageUrls })
  } catch (error) { next(error) } finally { cleanupFile(req.file?.path); cleanupFile(outputDir) }
})

router.post('/pdf-ocr', upload.single('file'), async (req, res, next) => {
  let outputPath
  try {
    const file = requireFile(req)
    outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.pdf`)
    const language = req.body?.language || 'eng'
    const extractedText = await converters.pdfOCR(file.path, outputPath, language)
    const downloadUrl = await spacesService.uploadFile(outputPath, `${path.basename(file.originalname, '.pdf')}-ocr.pdf`, 'application/pdf')
    res.json({ success: true, format: 'pdf', textExtracted: extractedText.slice(0, 500), downloadUrl })
  } catch (error) { next(error) } finally { cleanupFile(req.file?.path); cleanupFile(outputPath) }
})

module.exports = router
