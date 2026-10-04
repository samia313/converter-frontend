const { Worker } = require('bullmq')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const settings = require('../config/settings')
const { createWorkerConnection } = require('./connection')
const { conversionQueue } = require('./index')
const spaces = require('../utils/spaces')
const converters = require('../converters')

const QUEUE = settings.queueName
const connection = createWorkerConnection()

const TOOL_DEFINITIONS = {
  'pdf-to-word': {
    input: ['.pdf'],
    outputExt: '.docx',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    convert: (input, output) => converters.pdfToWord(input, output),
  },
  'word-to-pdf': {
    input: ['.doc', '.docx'],
    outputExt: '.pdf',
    mime: 'application/pdf',
    convert: (input, output) => converters.wordToPdf(input, output),
  },
  'pdf-to-excel': {
    input: ['.pdf'],
    outputExt: '.xlsx',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    convert: (input, output) => converters.pdfToExcel(input, output),
  },
  'pdf-to-ppt': {
    input: ['.pdf'],
    outputExt: '.pptx',
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    convert: (input, output) => converters.pdfToPowerPoint(input, output),
  },
  'ppt-to-pdf': {
    input: ['.ppt', '.pptx'],
    outputExt: '.pdf',
    mime: 'application/pdf',
    convert: (input, output) => converters.powerpointToPdf(input, output),
  },
  'excel-to-pdf': {
    input: ['.xlsx'],
    outputExt: '.pdf',
    mime: 'application/pdf',
    convert: (input, output) => converters.excelToPdf(input, output),
  },
  'html-to-pdf': {
    input: ['.html', '.htm'],
    outputExt: '.pdf',
    mime: 'application/pdf',
    convert: (input, output) => converters.htmlToPdf(input, output),
  },
  'compress-pdf': {
    input: ['.pdf'],
    outputExt: '.pdf',
    mime: 'application/pdf',
    convert: (input, output, data) => converters.compressPdf(input, output, data.options?.level || 'medium'),
  },
  'unlock-pdf': {
    input: ['.pdf'],
    outputExt: '.pdf',
    mime: 'application/pdf',
    convert: (input, output, data) => converters.unlockPdf(input, output, data.options?.password || ''),
  },
  'pdf-to-png': {
    input: ['.pdf'],
    outputExt: '.png',
    mime: 'image/png',
    special: true,
  },
  'pdf-to-jpg': {
    input: ['.pdf'],
    outputExt: '.jpg',
    mime: 'image/jpeg',
    special: true,
  },
  'pdf-ocr': {
    input: ['.pdf'],
    outputExt: '.pdf',
    mime: 'application/pdf',
    convert: async (input, output, data) => converters.pdfOCR(input, output, data.options?.language || 'eng'),
  },
}

const safeBaseName = (name) => {
  const base = path.basename(String(name || 'document'))
  return base.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 180) || 'document'
}

const cleanup = (target) => {
  if (!target) return
  try { fs.rmSync(target, { recursive: true, force: true }) } catch (error) { console.warn('[WORKER] cleanup failed:', target, error.message) }
}

const processConversion = async (job) => {
  const data = job.data
  const definition = TOOL_DEFINITIONS[data.tool]
  if (!definition) {
    const error = new Error(`Unsupported conversion tool: ${data.tool}`)
    error.code = 'UNSUPPORTED_TOOL'
    throw error
  }

  const ext = path.extname(data.originalName || '').toLowerCase()
  if (!definition.input.includes(ext)) {
    const error = new Error(`Unsupported input format for ${data.tool}`)
    error.code = 'UNSUPPORTED_INPUT_FORMAT'
    throw error
  }

  const jobDir = path.join(settings.uploadTempDir, 'jobs', String(job.id || uuidv4()))
  fs.mkdirSync(jobDir, { recursive: true, mode: 0o700 })
  const inputPath = path.join(jobDir, `input${ext}`)
  const outputPath = path.join(jobDir, `output${definition.outputExt}`)

  try {
    await spaces.downloadFile(data.inputKey, inputPath)

    if (ext === '.pdf') {
      const fd = fs.openSync(inputPath, 'r')
      try {
        const header = Buffer.alloc(5)
        const read = fs.readSync(fd, header, 0, 5, 0)
        if (read !== 5 || header.toString('ascii') !== '%PDF-') {
          const error = new Error('Uploaded file is not a valid PDF')
          error.code = 'INVALID_PDF'
          throw error
        }
      } finally { fs.closeSync(fd) }
    }

    let result
    if (data.tool === 'pdf-to-png') {
      result = await converters.pdfToPng(inputPath, outputPath)
    } else if (data.tool === 'pdf-to-jpg') {
      result = await converters.pdfToJpg(inputPath, outputPath)
    } else {
      await definition.convert(inputPath, outputPath, data)
      result = { outputPath, format: definition.outputExt.slice(1) }
    }

    const finalPath = result.outputPath || outputPath
    if (!fs.existsSync(finalPath) || fs.statSync(finalPath).size === 0) {
      throw new Error('Conversion produced an empty output')
    }

    const originalBase = path.basename(data.originalName || 'document', ext)
    const finalExt = result.format === 'zip' ? '.zip' : definition.outputExt
    const outputName = `${safeBaseName(originalBase)}${finalExt}`
    const outputKey = await spaces.uploadFile(finalPath, outputName, result.format === 'zip' ? 'application/zip' : definition.mime)

    await spaces.deleteFile(data.inputKey)
    await conversionQueue.add('cleanup-output', { key: outputKey }, {
      delay: settings.outputTtlMs,
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: { age: 7 * 24 * 60 * 60 },
    })

    await job.updateProgress(100)
    return {
      outputKey,
      filename: outputName,
      mimeType: result.format === 'zip' ? 'application/zip' : definition.mime,
      expiresAt: new Date(Date.now() + settings.outputTtlMs).toISOString(),
    }
  } finally {
    cleanup(jobDir)
  }
}

const processCleanup = async (job) => {
  if (job.data?.key) await spaces.deleteFile(job.data.key)
  return { deleted: true }
}

const worker = new Worker(QUEUE, async (job) => {
  if (job.name === 'cleanup-output') return processCleanup(job)
  if (job.name === 'convert') return processConversion(job)
  const error = new Error(`Unknown job type: ${job.name}`)
  error.code = 'UNKNOWN_JOB_TYPE'
  throw error
}, {
  connection,
  prefix: settings.queuePrefix,
  concurrency: settings.workerConcurrency,
  limiter: { max: settings.workerConcurrency, duration: 1000 },
})

worker.on('completed', (job) => console.log('[WORKER] completed', job.id, job.name))
worker.on('failed', (job, error) => console.error('[WORKER] failed', job?.id, job?.name, error))
worker.on('error', (error) => console.error('[WORKER] error', error))

const shutdown = async (signal) => {
  console.log(`[WORKER] ${signal} received, shutting down`)
  await worker.close()
  await connection.quit()
  process.exit(0)
}
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

console.log(`[WORKER] PDFilio conversion worker started: queue=${QUEUE}, concurrency=${settings.workerConcurrency}`)
