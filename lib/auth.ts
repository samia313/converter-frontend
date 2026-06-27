import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db'
import * as schema from './db/schema'

const baseURL =
  process.env.BETTER_AUTH_URL ||
  `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` ||
  `https://${process.env.VERCEL_URL}` ||
  process.env.V0_RUNTIME_URL ||
  'http://localhost:3000'

export const auth = betterAuth({
  baseURL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
  },
  trustedOrigins: [
    baseURL,
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
  ],
})
