import { createHash } from 'node:crypto'
import { Redis } from '@upstash/redis'
import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

type AuthRateLimitRecord = {
  key: string
  count: number
  lastRequest: number
}

let authRateLimitRedis: Redis | undefined

function getAuthRateLimitRedis(): Redis {
  if (authRateLimitRedis) return authRateLimitRedis

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw new Error('Auth rate-limit Redis configuration is missing')
  }

  authRateLimitRedis = new Redis({ url, token })
  return authRateLimitRedis
}

const authRateLimitConsumeScript = `
local current = redis.call('GET', KEYS[1])
local now = tonumber(ARGV[1])
local windowMs = tonumber(ARGV[2])
local maxRequests = tonumber(ARGV[3])
local ttlSeconds = tonumber(ARGV[4])

if not current then
  local data = { count = 1, lastRequest = now }
  redis.call('SET', KEYS[1], cjson.encode(data), 'EX', ttlSeconds)
  return { 1, 0 }
end

local data = cjson.decode(current)
local lastRequest = tonumber(data.lastRequest)

if now - lastRequest > windowMs then
  data.count = 1
  data.lastRequest = now
  redis.call('SET', KEYS[1], cjson.encode(data), 'EX', ttlSeconds)
  return { 1, 0 }
end

if tonumber(data.count) >= maxRequests then
  local retryAfter = math.ceil((lastRequest + windowMs - now) / 1000)
  return { 0, math.max(1, retryAfter) }
end

data.count = tonumber(data.count) + 1
data.lastRequest = now
redis.call('SET', KEYS[1], cjson.encode(data), 'EX', ttlSeconds)

return { 1, 0 }
`

const authRateLimitStorage = {
  get: async (key: string): Promise<AuthRateLimitRecord | null> => {
    const hashedKey = createHash('sha256').update(key).digest('hex')
    return getAuthRateLimitRedis().get<AuthRateLimitRecord>(
      `pdfilio:auth:ratelimit:${hashedKey}`,
    )
  },

  set: async (
    key: string,
    value: AuthRateLimitRecord,
    _update?: boolean,
  ): Promise<void> => {
    const hashedKey = createHash('sha256').update(key).digest('hex')
    await getAuthRateLimitRedis().set(
      `pdfilio:auth:ratelimit:${hashedKey}`,
      value,
      { ex: 61 },
    )
  },

  consume: async (
    key: string,
    rule: { window: number; max: number },
  ): Promise<{ allowed: boolean; retryAfter: number | null }> => {
    const hashedKey = createHash('sha256').update(key).digest('hex')
    const redisKey = `pdfilio:auth:ratelimit:${hashedKey}`
    const redis = getAuthRateLimitRedis()

    const result = await redis.eval<number[], number[]>(
      authRateLimitConsumeScript,
      [redisKey],
      [
        Date.now(),
        rule.window * 1000,
        rule.max,
        Math.ceil(rule.window) + 1,
      ],
    )

    return {
      allowed: Number(result[0]) === 1,
      retryAfter: Number(result[1]) > 0 ? Number(result[1]) : null,
    }
  },
}

export const auth = betterAuth({
  database: pool,
  baseURL:
    process.env.BETTER_AUTH_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.V0_RUNTIME_URL),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  trustedOrigins: [
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
  ],
  rateLimit: {
    customStorage: authRateLimitStorage,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  ...(process.env.NODE_ENV === 'development'
    ? {
        advanced: {
          defaultCookieAttributes: {
            sameSite: 'none' as const,
            secure: true,
          },
        },
      }
    : {}),
})
