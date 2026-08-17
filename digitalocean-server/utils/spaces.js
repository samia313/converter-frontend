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

module.exports = { uploadFile }
