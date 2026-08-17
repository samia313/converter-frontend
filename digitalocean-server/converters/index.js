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
    await runCommand('libreoffice', ['--headless', '--convert-to', format, '--outdir', outputDir, inputPath])
    const generated = path.join(outputDir, `${path.basename(inputPath, path.extname(inputPath))}.${format.split(':')[0]}`)
    ensureOutput(generated)
    if (generated !== outputPath) fs.renameSync(generated, outputPath)
    ensureOutput(outputPath)
  })
}

const pdfToWord = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'docx')
const pdfToExcel = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'xlsx')
const pdfToPowerPoint = (inputPath, outputPath) => libreOfficeConvert(inputPath, outputPath, 'pptx')

async function pdfToImages(inputPath, outputDir) {
  return withConversionSlot(async () => {
    fs.mkdirSync(outputDir, { recursive: true })
    try {
      await runCommand('pdftoppm', [inputPath, path.join(outputDir, 'page'), '-png'])
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

async function pdfOCR(inputPath, outputPath, language = 'eng') {
  return withConversionSlot(async () => {
    const safeLanguage = String(language || 'eng').trim().replace(/[^a-zA-Z0-9_+.-]/g, '') || 'eng'
    await runCommand('ocrmypdf', ['--skip-text', '--language', safeLanguage, inputPath, outputPath])
    ensureOutput(outputPath)
    const parsed = await pdfParse(fs.readFileSync(outputPath))
    return parsed.text || ''
  })
}

module.exports = { pdfToWord, pdfToExcel, pdfToPowerPoint, pdfToImages, pdfOCR }
