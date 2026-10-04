const { Queue } = require('bullmq')
const settings = require('../config/settings')
const { createQueueConnection } = require('./connection')

const connection = createQueueConnection()

const conversionQueue = new Queue(settings.queueName, {
  connection,
  prefix: settings.queuePrefix,
  defaultJobOptions: {
    attempts: settings.jobAttempts,
    backoff: { type: 'exponential', delay: settings.jobBackoffMs },
    removeOnComplete: { age: 60 * 60, count: 1000 },
    removeOnFail: { age: 24 * 60 * 60, count: 5000 },
  },
})

const closeQueue = async () => {
  await conversionQueue.close()
  await connection.quit()
}

module.exports = { conversionQueue, closeQueue }
