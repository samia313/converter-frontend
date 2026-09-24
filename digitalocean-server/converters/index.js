const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
const pdfParse = require('pdf-parse')
const settings = require('../config/settings')

let activeConversions = 0
const waiters = []

async function acquireSlot() {
  if (activeConversions < settings.maxConcurrentConversions) {
    activeConversions += 1
    return
  }
  await new Promise((resolve) => waiters.push(resolve))
  activeConversions += 1
}

function releaseSlot() {
  activeConversions = Math.max(0, activeConversions - 1)
  const next = waiters.shift()
  if (next) next()
}

function runCommand(command, args, timeoutMs = settings.conversionTimeout) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    let settled = false
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      if (!settled) {
        settled = true
        const error = new Error(`Conversion timed out after ${timeoutMs}ms`)
        error.code = 'CONVERSION_TIMEOUT'
        reject(error)
      }
    }, timeoutMs)
    child.stdout.on('data', (chunk) => { stdout += chunk.toString() })
    child.stderr.on('data', (chunk) => { stderr += chunk.toString() })
    child.on('error', (error) => {
      clearTimeout(timer)
      if (!settled) { settled = true; reject(error) }
    })
    child.on('close', (code, signal) => {
      clearTimeout(timer)
      if (settled) return
      settled = true
      if (code === 0) return resolve({ stdout, stderr })
      const error = new Error(stderr.trim() || `Command exited with code ${code}${signal ? ` (${signal})` : ''}`)
      error.code = code === null ? 'COMMAND_TERMINATED' : 'CONVERSION_FAILED'
      reject(error)
    })
  })
}

async function withConversionSlot(task) {
  await acquireSlot()
  try { return await task() } finally { releaseSlot() }
}

function ensureOutput(outputPath) {
  if (!fs.existsSync(outputPath)) throw new Error(`Converter did not produce expected output: ${path.basename(outputPath)}`)
  const stat = fs.statSync(outputPath)
  if (!stat.isFile() || stat.size === 0) throw new Error(`Converter produced an empty output: ${path.basename(outputPath)}`)
}

async function libreOfficeConvert(inputPath, outputPath, format) {
  return withConversionSlot(async () => {
    const outputDir = path.dirname(outputPath)
    try {
      await runCommand('libreoffice', ['--headless', '--convert-to', format, '--outdir', outputDir, inputPath])
    } catch (error) {
      if (error.code === 'ENOENT') {
        const unavailable = new Error('This conversion requires LibreOffice on the conversion server.')
        unavailable.code = 'LIBREOFFICE_ENGINE_UNAVAILABLE'
        unavailable.status = 503
        throw unavailable
      }
      throw error
    }
    const generated = path.join(outputDir, `${path.basename(inputPath, path.extname(inputPath))}.${format.split(':')[0]}`)
    ensureOutput(generated)
    if (generated !== outputPath) fs.renameSync(generated, outputPath)
    ensureOutput(outputPath)
  })
}

const pdfToWord = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'docx')
const wordToPdf = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'pdf:writer_pdf_Export')
const pdfToExcel = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'xlsx')
const pdfToPowerPoint = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'pptx')
const powerpointToPdf = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'pdf:impress_pdf_Export')
const htmlToPdf = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'pdf:writer_pdf_Export')
const excelToPdf = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'pdf:calc_pdf_Export')

async function unlockPdf(inputPath, outputPath, password = '') {
  const safePassword = String(password ?? '')
  return withConversionSlot(async () => {
    try {
      await runCommand('qpdf', [`--password=${safePassword}`, '--decrypt', inputPath, outputPath])
    } catch (error) {
      if (error.code === 'ENOENT') {
        const unavailable = new Error('PDF unlocking requires qpdf on the conversion server.')
        unavailable.code = 'UNLOCK_ENGINE_UNAVAILABLE'
        unavailable.status = 503
        throw unavailable
      }
      const denied = new Error('The PDF could not be unlocked. Check the password and make sure you are authorized to remove its protection.')
      denied.code = 'UNLOCK_FAILED'
      denied.status = 422
      throw denied
    }
    ensureOutput(outputPath)
  })
}

async function pdfToPng(inputPath, outputPath) {
  return withConversionSlot(async () => {
    const outputDir = `${outputPath}.pages`
    fs.mkdirSync(outputDir, { recursive: true })
    try {
      try {
        await runCommand('pdftoppm', ['-png', '-r', '150', inputPath, path.join(outputDir, 'page')])
      } catch (error) {
        if (error.code === 'ENOENT') {
          const unavailable = new Error('PDF to PNG conversion requires Poppler (pdftoppm) on the conversion server.')
          unavailable.code = 'PDF_RENDER_ENGINE_UNAVAILABLE'
          unavailable.status = 503
          throw unavailable
        }
        throw error
      }
      const files = fs.readdirSync(outputDir).filter((f) => f.toLowerCase().endsWith('.png')).sort()
      if (!files.length) throw new Error('PDF to PNG produced no output files')
      if (files.length === 1) {
        fs.renameSync(path.join(outputDir, files[0]), outputPath)
        ensureOutput(outputPath)
        return { outputPath, format: 'png' }
      }
      const zipPath = outputPath.replace(/\.png$/i, '.zip')
      try {
        await runCommand('zip', ['-j', zipPath, ...files.map((file) => path.join(outputDir, file))])
      } catch (error) {
        if (error.code === 'ENOENT') {
          const unavailable = new Error('Creating multi-page image downloads requires the zip utility on the conversion server.')
          unavailable.code = 'ZIP_ENGINE_UNAVAILABLE'
          unavailable.status = 503
          throw unavailable
        }
        throw error
      }
      ensureOutput(zipPath)
      return { outputPath: zipPath, format: 'zip' }
    } finally { fs.rmSync(outputDir, { recursive: true, force: true }) }
  })
}

async function pdfToJpg(inputPath, outputPath) {
  return withConversionSlot(async () => {
    const outputDir = `${outputPath}.pages`
    fs.mkdirSync(outputDir, { recursive: true })
    try {
      try {
        await runCommand('pdftoppm', ['-jpeg', '-r', '150', inputPath, path.join(outputDir, 'page')])
      } catch (error) {
        if (error.code === 'ENOENT') {
          const unavailable = new Error('PDF to JPG conversion requires Poppler (pdftoppm) on the conversion server.')
          unavailable.code = 'PDF_RENDER_ENGINE_UNAVAILABLE'
          unavailable.status = 503
          throw unavailable
        }
        throw error
      }
      const files = fs.readdirSync(outputDir).filter((f) => f.toLowerCase().endsWith('.jpg')).sort()
      if (!files.length) throw new Error('PDF to JPG produced no output files')
      if (files.length === 1) {
        fs.renameSync(path.join(outputDir, files[0]), outputPath)
        ensureOutput(outputPath)
        return { outputPath, format: 'jpg' }
      }
      const zipPath = outputPath.replace(/\.jpg$/i, '.zip')
      await runCommand('zip', ['-j', zipPath, ...files.map((file) => path.join(outputDir, file))])
      ensureOutput(zipPath)
      return { outputPath: zipPath, format: 'zip' }
    } finally { fs.rmSync(outputDir, { recursive: true, force: true }) }
  })
}

async function pdfToImages(inputPath, outputDir) {
  return withConversionSlot(async () => {
    fs.mkdirSync(outputDir, { recursive: true })
    try {
      try {
        await runCommand('pdftoppm', [inputPath, path.join(outputDir, 'page'), '-png'])
      } catch (error) {
        if (error.code === 'ENOENT') {
          const unavailable = new Error('PDF to image conversion requires Poppler (pdftoppm) on the conversion server.')
          unavailable.code = 'PDF_RENDER_ENGINE_UNAVAILABLE'
          unavailable.status = 503
          throw unavailable
        }
        throw error
      }
      const files = fs.readdirSync(outputDir).filter((f) => f.endsWith('.png')).sort()
      if (!files.length) throw new Error('PDF to images produced no output files')
      const spacesService = require('../utils/spaces')
      const imageUrls = []
      for (const file of files) {
        const filePath = path.join(outputDir, file)
        imageUrls.push(await spacesService.uploadFile(filePath, `images/${file}`, 'image/png'))
      }
      return imageUrls
    } finally {
      fs.rmSync(outputDir, { recursive: true, force: true })
    }
  })
}

async function compressPdf(inputPath, outputPath, level = 'medium') {
  return withConversionSlot(async () => {
    const presets = {
      low: '/prepress',
      medium: '/ebook',
      high: '/screen',
    }
    const preset = presets[String(level || 'medium').toLowerCase()] || presets.medium
    try {
      await runCommand('gs', [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      `-dPDFSETTINGS=${preset}`,
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      `-sOutputFile=${outputPath}`,
      inputPath,
      ])
    } catch (error) {
      if (error.code === 'ENOENT') {
        const unavailable = new Error('PDF compression requires Ghostscript on the conversion server.')
        unavailable.code = 'COMPRESSION_ENGINE_UNAVAILABLE'
        unavailable.status = 503
        throw unavailable
      }
      throw error
    }
    ensureOutput(outputPath)
  })
}

async function pdfOCR(inputPath, outputPath, language = 'eng') {
  return withConversionSlot(async () => {
    const safeLanguage = String(language || 'eng').trim().replace(/[^a-zA-Z0-9_+.-]/g, '') || 'eng'
    try {
      await runCommand('ocrmypdf', ['--skip-text', '--language', safeLanguage, inputPath, outputPath])
    } catch (error) {
      if (error.code === 'ENOENT') {
        const unavailable = new Error('OCR requires OCRmyPDF on the conversion server.')
        unavailable.code = 'OCR_ENGINE_UNAVAILABLE'
        unavailable.status = 503
        throw unavailable
      }
      throw error
    }
    ensureOutput(outputPath)
    const parsed = await pdfParse(fs.readFileSync(outputPath))
    return parsed.text || ''
  })
}

module.exports = { pdfToWord, wordToPdf, pdfToExcel, pdfToPowerPoint, powerpointToPdf, htmlToPdf, excelToPdf, unlockPdf, pdfToJpg, pdfToPng, pdfToImages, compressPdf, pdfOCR }
