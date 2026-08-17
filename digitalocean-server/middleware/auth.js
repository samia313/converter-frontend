const crypto = require('crypto')
const settings = require('../config/settings')

const authMiddleware = (req, res, next) => {
  if (!settings.apiKey) {
    console.error('[AUTH] API_KEY is not configured')
    return res.status(503).json({ error: 'Conversion service is not configured', code: 'AUTH_NOT_CONFIGURED' })
  }

  const authHeader = req.headers.authorization || ''
  const match = authHeader.match(/^Bearer\s+(.+)$/i)
  if (!match) return res.status(401).json({ error: 'Missing or invalid authorization header', code: 'AUTH_REQUIRED' })

  const token = match[1].trim()
  const expected = Buffer.from(settings.apiKey)
  const received = Buffer.from(token)
  const valid = expected.length === received.length && crypto.timingSafeEqual(expected, received)

  if (!valid) return res.status(403).json({ error: 'Invalid API key', code: 'AUTH_INVALID' })
  return next()
}

module.exports = authMiddleware
