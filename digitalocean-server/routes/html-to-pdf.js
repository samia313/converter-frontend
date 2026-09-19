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
const upload = multer({ storage, limits: { fileSize: settings.maxFileSize, files: 1 } })
const cleanupFile = (filepath) => { if (!filepath) return; try { fs.rmSync(filepath, { recursive: true, force: true }) } catch (error) { console.warn('[CLEANUP]', filepath, error.message) } }
const convertAndUpload = async ({ inputPath, outputPath, filename, converter }) => {
  await converter(inputPath, outputPath)
  if (!fs.existsSync(outputPath) || fs.statSync(outputPath).size === 0) throw new Error('Conversion produced an empty output')
  return spacesService.uploadFile(outputPath, filename, 'application/pdf')
}

router.post('/html-to-pdf', upload.single('file'), async (req, res, next) => {
  let outputPath
  try {
    const file = req.file
    if (!file) { const e = new Error('No HTML file provided'); e.status = 400; e.code = 'NO_FILE'; throw e }
    const ext = path.extname(file.originalname).toLowerCase()
    if (!['.html', '.htm'].includes(ext)) { const e = new Error('Only HTML and HTM files are supported'); e.status = 415; e.code = 'UNSUPPORTED_HTML_FORMAT'; throw e }
    outputPath = path.join(settings.uploadTempDir, `${uuidv4()}.pdf`)
    const downloadUrl = await convertAndUpload({ inputPath:file.path, outputPath, filename:`${path.basename(file.originalname, ext)}.pdf`, converter:converters.htmlToPdf })
    res.json({ success:true, format:'pdf', downloadUrl })
  } catch (error) { next(error) } finally { cleanupFile(req.file?.path); cleanupFile(outputPath) }
})
module.exports = router
