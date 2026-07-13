const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const Tesseract = require('tesseract.js')
const pdfreader = require('pdf-parse')
const settings = require('../config/settings')

const execAsync = promisify(exec)

// PDF to Word (.docx)
const pdfToWord = async (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const command = `libreoffice --headless --convert-to docx --outdir ${path.dirname(outputPath)} "${inputPath}"`
    exec(command, (error) => {
      if (error) return reject(error)
      
      // LibreOffice creates file with same name but different extension
      const tempOutput = inputPath.replace(/\.[^.]+$/, '.docx')
      fs.renameSync(tempOutput, outputPath)
      resolve()
    })
  })
}

// PDF to Excel (.xlsx)
const pdfToExcel = async (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const command = `libreoffice --headless --convert-to xlsx --outdir ${path.dirname(outputPath)} "${inputPath}"`
    exec(command, (error) => {
      if (error) return reject(error)
      
      const tempOutput = inputPath.replace(/\.[^.]+$/, '.xlsx')
      fs.renameSync(tempOutput, outputPath)
      resolve()
    })
  })
}

// PDF to PowerPoint (.pptx)
const pdfToPowerPoint = async (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const command = `libreoffice --headless --convert-to pptx --outdir ${path.dirname(outputPath)} "${inputPath}"`
    exec(command, (error) => {
      if (error) return reject(error)
      
      const tempOutput = inputPath.replace(/\.[^.]+$/, '.pptx')
      fs.renameSync(tempOutput, outputPath)
      resolve()
    })
  })
}

// PDF to Images (PNG)
const pdfToImages = async (inputPath, outputDir) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const command = `pdftoppm "${inputPath}" ${path.join(outputDir, 'page')} -png`
    exec(command, async (error) => {
      if (error) return reject(error)

      // Upload images to Spaces
      const files = fs.readdirSync(outputDir).filter((f) => f.endsWith('.png'))
      const spacesService = require('../utils/spaces')
      
      const imageUrls = []
      for (const file of files) {
        const filePath = path.join(outputDir, file)
        const fileBuffer = fs.readFileSync(filePath)
        const url = await spacesService.uploadFile(fileBuffer, file, 'image/png')
        imageUrls.push(url)
      }

      // Cleanup output directory
      files.forEach((f) => fs.unlinkSync(path.join(outputDir, f)))
      fs.rmdirSync(outputDir)

      resolve(imageUrls)
    })
  })
}

// PDF OCR (Extract text)
const pdfOCR = async (inputPath, outputPath) => {
  try {
    // Convert PDF to images first
    const tempDir = path.join(settings.uploadTempDir, `ocr-${Date.now()}`)
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    // Convert PDF to images
    await execAsync(`pdftoppm "${inputPath}" ${path.join(tempDir, 'page')} -png`)

    // Extract text from all images
    const imageFiles = fs.readdirSync(tempDir).filter((f) => f.endsWith('.png'))
    let allText = ''

    for (const imageFile of imageFiles) {
      const imagePath = path.join(tempDir, imageFile)
      const { data } = await Tesseract.recognize(imagePath, 'eng')
      allText += data.text + '\n---PAGE BREAK---\n'
      fs.unlinkSync(imagePath)
    }

    fs.rmdirSync(tempDir)

    // Create searchable PDF using ghostscript
    fs.writeFileSync(outputPath, allText)

    return allText
  } catch (error) {
    console.error('[OCR] Error:', error)
    throw error
  }
}

module.exports = {
  pdfToWord,
  pdfToExcel,
  pdfToPowerPoint,
  pdfToImages,
  pdfOCR,
}
