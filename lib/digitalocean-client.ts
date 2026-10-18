/**
 * DigitalOcean Conversion Server Client
 * Communicates with the PDF conversion API running on DigitalOcean Droplet
 */

import { getDigitalOceanConfig } from './digitalocean-config'

const { baseUrl, apiKey } = getDigitalOceanConfig()
const API_KEY = apiKey || ''
const BASE_URL = baseUrl ? `${baseUrl}/convert` : ''

interface ConversionResponse {
  success: boolean
  format: string
  downloadUrl?: string
  downloadUrls?: string[]
  error?: string
}

/**
 * Call DigitalOcean conversion API with file
 */
export async function callDigitalOceanAPI(
  endpoint: string,
  file: Buffer,
  filename: string
): Promise<ConversionResponse> {
  if (!BASE_URL || !API_KEY) {
    throw new Error('DigitalOcean conversion service is not configured. Set DIGITALOCEAN_CONVERTER_URL and DIGITALOCEAN_CONVERTER_API_KEY (or the legacy variable names).')
  }
  const formData = new FormData()
  formData.append('file', new Blob([file]), filename)

  try {
    console.log(`[v0] Calling DigitalOcean API: ${endpoint}`)

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`)
    }

    const data: ConversionResponse = await response.json()
    console.log(`[v0] Conversion successful: ${endpoint}`)
    return data
  } catch (error) {
    console.error(`[v0] DigitalOcean API error:`, error)
    throw error
  }
}

/**
 * PDF to Word conversion
 */
export async function pdfToWord(file: Buffer, filename: string): Promise<ConversionResponse> {
  return callDigitalOceanAPI('pdf-to-word', file, filename)
}

/**
 * PDF to Excel conversion
 */
export async function pdfToExcel(file: Buffer, filename: string): Promise<ConversionResponse> {
  return callDigitalOceanAPI('pdf-to-excel', file, filename)
}

/**
 * PDF to PowerPoint conversion
 */
export async function pdfToPowerPoint(file: Buffer, filename: string): Promise<ConversionResponse> {
  return callDigitalOceanAPI('pdf-to-ppt', file, filename)
}

/**
 * PDF to Images conversion
 */
export async function pdfToImages(file: Buffer, filename: string): Promise<ConversionResponse> {
  return callDigitalOceanAPI('pdf-to-images', file, filename)
}

/**
 * PDF OCR (Extract text)
 */
export async function pdfOCR(file: Buffer, filename: string): Promise<ConversionResponse> {
  return callDigitalOceanAPI('pdf-ocr', file, filename)
}
