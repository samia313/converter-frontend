const AWS = require('aws-sdk')
const settings = require('../config/settings')
const { v4: uuidv4 } = require('uuid')

const spacesEndpoint = new AWS.Endpoint(settings.spaces.endpoint)
const s3Client = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: settings.spaces.key,
  secretAccessKey: settings.spaces.secret,
  region: settings.spaces.region,
})

const uploadFile = async (fileBuffer, filename, mimeType) => {
  const params = {
    Bucket: settings.spaces.bucket,
    Key: `conversions/${filename}`,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: 'public-read',
    CacheControl: 'max-age=86400', // 24 hours
  }

  try {
    const result = await s3Client.upload(params).promise()
    console.log('[SPACES] File uploaded:', filename)
    return result.Location
  } catch (error) {
    console.error('[SPACES] Upload error:', error)
    throw error
  }
}

module.exports = {
  uploadFile,
}
