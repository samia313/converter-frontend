const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const settings = require('../config/settings')
const { v4: uuidv4 } = require('uuid')

const spacesEndpoint = new AWS.Endpoint(settings.spaces.endpoint)
const s3Client = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: settings.spaces.key,
  secretAccessKey: settings.spaces.secret,
  region: settings.spaces.region,
})

/**
 * Upload a conversion as a private object and return a short-lived signed URL.
 * fileOrBuffer may be a Buffer or an on-disk file path. Using streams for paths
 * avoids loading large conversion results into Node's heap.
 */
const uploadFile = async (fileOrBuffer, filename, mimeType) => {
  const safeFilename = path.basename(filename)
  const key = `conversions/${uuidv4()}-${safeFilename}`
  const body = typeof fileOrBuffer === 'string'
    ? fs.createReadStream(fileOrBuffer)
    : fileOrBuffer

  const params = {
    Bucket: settings.spaces.bucket,
    Key: key,
    Body: body,
    ContentType: mimeType,
    ACL: 'private',
    CacheControl: 'private, max-age=0, no-cache, no-store, must-revalidate',
  }

  try {
    await s3Client.upload(params).promise()
    const signedUrl = s3Client.getSignedUrl('getObject', {
      Bucket: settings.spaces.bucket,
      Key: key,
      Expires: settings.spaces.signedUrlTtl,
    })
    console.log('[SPACES] Private file uploaded:', key)
    return signedUrl
  } catch (error) {
    console.error('[SPACES] Upload error:', error)
    throw error
  }
}

const downloadFile = async (key, destinationPath) => {
  const output = fs.createWriteStream(destinationPath, { mode: 0o600 })
  try {
    const request = s3Client.getObject({
      Bucket: settings.spaces.bucket,
      Key: key,
    }).createReadStream()
    await new Promise((resolve, reject) => {
      request.on('error', reject)
      output.on('error', reject)
      output.on('finish', resolve)
      request.pipe(output)
    })
    return destinationPath
  } catch (error) {
    try { output.destroy() } catch {}
    try { fs.rmSync(destinationPath, { force: true }) } catch {}
    throw error
  }
}

const deleteFile = async (key) => {
  if (!key) return
  try {
    await s3Client.deleteObject({ Bucket: settings.spaces.bucket, Key: key }).promise()
  } catch (error) {
    console.warn('[SPACES] Delete error:', key, error.message)
  }
}

const signedDownloadUrl = (key) => s3Client.getSignedUrl('getObject', {
  Bucket: settings.spaces.bucket,
  Key: key,
  Expires: settings.spaces.signedUrlTtl,
})

module.exports = { uploadFile, downloadFile, deleteFile, signedDownloadUrl }
