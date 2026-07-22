import { pgTable, text, timestamp, boolean, integer, uuid, varchar } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// Conversions tracking table
export const conversions = pgTable('conversions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  toolName: text('toolName').notNull(),
  inputFileName: text('inputFileName').notNull(),
  inputFileSize: integer('inputFileSize').notNull(),
  outputFileName: text('outputFileName'),
  outputFileSize: integer('outputFileSize'),
  status: text('status').notNull().default('pending'),
  errorMessage: text('errorMessage'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  completedAt: timestamp('completedAt'),
})

// User conversion stats
export const userStats = pgTable('userStats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull().unique(),
  totalConversions: integer('totalConversions').notNull().default(0),
  totalFilesProcessed: integer('totalFilesProcessed').notNull().default(0),
  lastConversionAt: timestamp('lastConversionAt'),
  premiumUntil: timestamp('premiumUntil'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Subscriptions for Stripe integration
export const subscription = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  stripeCustomerId: text('stripeCustomerId').notNull().unique(),
  stripeSubscriptionId: text('stripeSubscriptionId'),
  plan: text('plan').notNull().default('free'),
  status: text('status').notNull().default('inactive'),
  currentPeriodStart: timestamp('currentPeriodStart'),
  currentPeriodEnd: timestamp('currentPeriodEnd'),
  canceledAt: timestamp('canceledAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// --- Production Pipeline Tables -------------------------------------------

// Job tracking table (for Redis queue integration)
export const processingJobs = pgTable('processingJobs', {
  id: text('id').primaryKey(),
  userId: text('userId'),
  jobId: text('jobId').unique().notNull(),
  type: text('type').notNull(), // compress, merge, split, etc.
  status: text('status').notNull().default('pending'), // pending, processing, completed, failed, retry
  inputSize: integer('inputSize').notNull(),
  outputSize: integer('outputSize'),
  inputFileUrl: text('inputFileUrl'),
  outputFileUrl: text('outputFileUrl'),
  errorMessage: text('errorMessage'),
  retries: integer('retries').default(0),
  maxRetries: integer('maxRetries').default(3),
  processingTimeMs: integer('processingTimeMs'),
  metadata: text('metadata'), // JSON string
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  startedAt: timestamp('startedAt'),
  completedAt: timestamp('completedAt'),
  expiresAt: timestamp('expiresAt').notNull(),
})

// Detailed conversion logs
export const conversionLogs = pgTable('conversionLogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversionId: text('conversionId').notNull(),
  level: text('level').notNull(), // info, warn, error, debug
  message: text('message').notNull(),
  details: text('details'), // JSON string
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Processing metrics and statistics
export const processingMetrics = pgTable('processingMetrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  type: text('type').notNull(), // Tool type (compress, merge, etc.)
  successCount: integer('successCount').default(0),
  failureCount: integer('failureCount').default(0),
  totalProcessingTimeMs: integer('totalProcessingTimeMs').default(0),
  averageFileSize: integer('averageFileSize'),
  peakConcurrency: integer('peakConcurrency'),
  metadata: text('metadata'), // JSON string
})

// Error tracking and alerts
export const errorLogs = pgTable('errorLogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversionId: text('conversionId'),
  errorType: text('errorType').notNull(),
  errorMessage: text('errorMessage').notNull(),
  stackTrace: text('stackTrace'),
  metadata: text('metadata'), // JSON string
  isResolved: boolean('isResolved').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  resolvedAt: timestamp('resolvedAt'),
})

// File storage metadata for Vercel Blob
export const fileStorageMetadata = pgTable('fileStorageMetadata', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversionId: text('conversionId').notNull(),
  fileType: text('fileType').notNull(), // input, output
  fileName: varchar('fileName').notNull(),
  mimeType: varchar('mimeType'),
  fileSize: integer('fileSize').notNull(),
  blobUrl: text('blobUrl').notNull(),
  checksum: varchar('checksum'), // For integrity verification
  uploadedAt: timestamp('uploadedAt').notNull().defaultNow(),
  expiresAt: timestamp('expiresAt').notNull(),
})

// System health checks
export const healthCheckLogs = pgTable('healthCheckLogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  status: text('status').notNull(), // healthy, degraded, unhealthy
  queueHealth: text('queueHealth'),
  storageHealth: text('storageHealth'),
  databaseHealth: text('databaseHealth'),
  message: text('message'),
  metrics: text('metrics'), // JSON string
  checkedAt: timestamp('checkedAt').notNull().defaultNow(),
})
