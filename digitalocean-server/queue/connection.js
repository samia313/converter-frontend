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

// Short, bounded health probe. Never return or log the Redis URL or raw errors.
const checkRedisConnectivity = async (timeoutMs = 2500) => {
  if (!settings.redisUrl) return false
  let client
  let timer
  try {
    client = new IORedis(settings.redisUrl, {
      lazyConnect: true,
      connectTimeout: timeoutMs,
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      enableOfflineQueue: false,
      retryStrategy: () => null,
    })
    const probe = async () => {
      await client.connect()
      return (await client.ping()) === 'PONG'
    }
    const timedOut = new Promise((resolve) => {
      timer = setTimeout(() => resolve(false), timeoutMs)
    })
    return await Promise.race([probe().catch(() => false), timedOut])
  } catch {
    return false
  } finally {
    if (timer) clearTimeout(timer)
    if (client) {
      try { client.disconnect() } catch {}
    }
  }
}

module.exports = { createQueueConnection, createWorkerConnection, checkRedisConnectivity }
