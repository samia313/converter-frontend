const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { conversionQueue } = require('../queue')
const settings = require('../config/settings')
const spaces = require('../utils/spaces')

const router = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    destination: settings.uploadTempDir,
    filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`),
  }),
  limits: { fileSize: settings.maxFileSize, files: 1 },
})

const TOOL_INPUTS = {
  'pdf-to-word': ['.pdf'],
  'word-to-pdf': ['.doc', '.docx'],
  'pdf-to-excel': ['.pdf'],
  'pdf-to-ppt': ['.pdf'],
  'ppt-to-pdf': ['.ppt', '.pptx'],
  'excel-to-pdf': ['.xlsx'],
  'html-to-pdf': ['.html', '.htm'],
  'compress-pdf': ['.pdf'],
  'unlock-pdf': ['.pdf'],
  'pdf-to-png': ['.pdf'],
  'pdf-to-jpg': ['.pdf'],
  'pdf-ocr': ['.pdf'],
}

const cleanup = (file) => {
  if (!file?.path) return
  try { fs.rmSync(file.path, { force: true }) } catch (error) { console.warn('[QUEUE] upload cleanup failed:', error.message) }
}

const fail = (message, code, status = 400) => {
  const error = new Error(message)
  error.code = code
  error.status = status
  return error
}

const assertPdf = (filepath) => {
  const fd = fs.openSync(filepath, 'r')
  try {
    const header = Buffer.alloc(5)
    const read = fs.readSync(fd, header, 0, 5, 0)
    if (read !== 5 || header.toString('ascii') !== '%PDF-') throw fail('Uploaded file is not a valid PDF', 'INVALID_PDF')
  } finally { fs.closeSync(fd) }
}

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const tool = String(req.body?.tool || '').trim().toLowerCase()
    const allowed = TOOL_INPUTS[tool]
    if (!allowed) throw fail('Unsupported conversion tool', 'UNSUPPORTED_TOOL', 422)
    if (!req.file) throw fail('No file provided', 'NO_FILE')
    
    const ext = path.extname(req.file.originalname).toLowerCase()
    if (!allowed.includes(ext)) throw fail(`Unsupported input format for ${tool}`, 'UNSUPPORTED_INPUT_FORMAT', 415)
    if (ext === '.pdf') assertPdf(req.file.path)

    const inputName = `jobs/${uuidv4()}/input${ext}`
    const inputKey = await spaces.uploadFile(req.file.path, inputName, req.file.mimetype || 'application/octet-stream')

    const job = await conversionQueue.add('convert', {
      tool,
      inputKey,
      originalName: path.basename(req.file.originalname),
      options: req.body?.options ? JSON.parse(req.body.options) : {
        level: req.body?.level,
        password: req.body?.password,
        language: req.body?.language,
      },
      submittedAt: new Date().toISOString(),
    })

    await conversionQueue.add('cleanup-output', { key: inputKey }, {
      delay: settings.outputTtlMs + (60 * 60 * 1000),
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: { age: 7 * 24 * 60 * 60 },
    }).catch((error) => console.warn('[QUEUE] input cleanup scheduling failed:', error.message))

    res.status(202).json({
      success: true,
      jobId: String(job.id),
      status: 'queued',
      statusUrl: `/convert/jobs/${job.id}`,
    })
  } catch (error) {
    next(error)
  } finally {
    cleanup(req.file)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const job = await conversionQueue.getJob(String(req.params.id))
    if (!job) throw fail('Conversion job not found or expired', 'JOB_NOT_FOUND', 404)

    const state = await job.getState()
    const response = {
      success: true,
      jobId: String(job.id),
      state,
      progress: job.progress,
      tool: job.data?.tool,
    }

    if (state === 'completed') {
      const result = job.returnvalue || {}
      response.result = {
        filename: result.filename,
        mimeType: result.mimeType,
        expiresAt: result.expiresAt,
        downloadUrl: result.outputKey ? spaces.signedDownloadUrl(result.outputKey) : null,
      }
    }

    if (state === 'failed') {
      response.error = job.failedReason || 'Conversion failed'
      response.code = 'CONVERSION_FAILED'
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const job = await conversionQueue.getJob(String(req.params.id))
    if (!job) throw fail('Conversion job not found or expired', 'JOB_NOT_FOUND', 404)

    const result = job.returnvalue || {}
    if (job.data?.inputKey) await spaces.deleteFile(job.data.inputKey)
    if (result.outputKey) await spaces.deleteFile(result.outputKey)
    await job.remove()

    res.json({ success: true, jobId: String(job.id), deleted: true })
  } catch (error) {
    next(error)
  }
})

module.exports = router
