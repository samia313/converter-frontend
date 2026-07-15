const settings = require('../config/settings')

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' })
  }

  const token = authHeader.replace('Bearer ', '')
  
  if (token !== settings.apiKey) {
    return res.status(403).json({ error: 'Invalid API key' })
  }

  next()
}

module.exports = authMiddleware
