const IORedis = require('ioredis')
const settings = require('../config/settings')

if (!settings.redisUrl) {
  throw new Error('REDIS_URL is required for the PDFilio conversion queue')
}

const baseOptions = {
  maxRetriesPerRequest: 20,
  enableReadyCheck: true,
}

const createQueueConnection = () => new IORedis(settings.redisUrl, {
  ...baseOptions,
  enableOfflineQueue: false,
})

const createWorkerConnection = () => new IORedis(settings.redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
})

module.exports = { createQueueConnection, createWorkerConnection }
