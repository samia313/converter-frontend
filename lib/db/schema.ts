import { pgTable, text, timestamp, boolean, integer, numeric } from 'drizzle-orm/pg-core'

// Better Auth tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').unique(),
  emailVerified: boolean('emailVerified'),
  name: text('name'),
  image: text('image'),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt'),
  token: text('token').unique(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId'),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId'),
  providerId: text('providerId'),
  userId: text('userId'),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier'),
  value: text('value'),
  expiresAt: timestamp('expiresAt'),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
})

// Monetization tables
export const subscription = pgTable('subscription', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  stripeCustomerId: text('stripeCustomerId').unique(),
  stripeSubscriptionId: text('stripeSubscriptionId').unique(),
  plan: text('plan').notNull().default('free'),
  status: text('status').notNull().default('active'),
  priceInCents: integer('priceInCents'),
  currentPeriodStart: timestamp('currentPeriodStart'),
  currentPeriodEnd: timestamp('currentPeriodEnd'),
  cancelAtPeriodEnd: boolean('cancelAtPeriodEnd').default(false),
  canceledAt: timestamp('canceledAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const usage = pgTable('usage', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  conversionsThisMonth: integer('conversionsThisMonth').default(0),
  mergesThisMonth: integer('mergesThisMonth').default(0),
  optimizationsThisMonth: integer('optimizationsThisMonth').default(0),
  editsThisMonth: integer('editsThisMonth').default(0),
  storageUsedMB: numeric('storageUsedMB', { precision: 10, scale: 2 }).default('0'),
  lastResetDate: timestamp('lastResetDate').notNull().defaultNow(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
