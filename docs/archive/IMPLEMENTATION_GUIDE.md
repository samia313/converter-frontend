# Complete Implementation Guide: Database, APIs, and File Pipeline

## TABLE OF CONTENTS
1. [Database Integration (Neon)](#database-integration)
2. [API Route Testing](#api-testing)
3. [File Pipeline Completion](#file-pipeline)

---

## DATABASE INTEGRATION (Neon)

### Step 1: Check BETTER_AUTH_SECRET Environment Variable

```bash
# This must be set before running any auth code
# Generate it with:
openssl rand -base64 32

# Example output: 
# K7mXq2pL9vR+jN3fB8wY1ZaSb/dC4qE6tU5vL+oP=
```

**Action Required:** Add the `BETTER_AUTH_SECRET` environment variable to your Vercel project:
1. Go to: https://vercel.com/dashboard
2. Select: "converter-frontend" project
3. Go to: Settings → Environment Variables
4. Add new variable:
   - Key: `BETTER_AUTH_SECRET`
   - Value: (generated from openssl command above)
5. Redeploy

### Step 2: Database Schema Setup

The Neon database already has auth tables (user, session, account, verification) from Better Auth.

You need to add application-specific tables:

```sql
-- 1. Create conversions table to track file conversions
CREATE TABLE IF NOT EXISTS conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  tool_name TEXT NOT NULL,
  input_file_name TEXT NOT NULL,
  input_file_size INTEGER NOT NULL,
  output_file_name TEXT,
  output_file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- 2. Create file uploads table to track temporary files
CREATE TABLE IF NOT EXISTS file_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create user stats table to track usage
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  total_conversions INTEGER DEFAULT 0,
  total_files_processed INTEGER DEFAULT 0,
  conversions_today INTEGER DEFAULT 0,
  last_conversion_at TIMESTAMP,
  premium_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 3: Setup Drizzle Schema

Create `/lib/db/schema.ts`:

```typescript
import { pgTable, text, uuid, timestamp, integer } from 'drizzle-orm/pg-core'

// Better Auth tables (already exist, reference them)
export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('createdAt', { mode: 'date' }),
  updatedAt: timestamp('updatedAt', { mode: 'date' }),
})

export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expiresAt', { mode: 'date' }),
  createdAt: timestamp('createdAt', { mode: 'date' }),
  updatedAt: timestamp('updatedAt', { mode: 'date' }),
})

// Application tables
export const conversions = pgTable('conversions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  toolName: text('tool_name').notNull(),
  inputFileName: text('input_file_name').notNull(),
  inputFileSize: integer('input_file_size').notNull(),
  outputFileName: text('output_file_name'),
  outputFileSize: integer('output_file_size'),
  status: text('status').notNull().default('pending'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  completedAt: timestamp('completed_at'),
})

export const fileUploads = pgTable('file_uploads', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  fileName: text('file_name').notNull(),
  filePath: text('file_path').notNull(),
  fileSize: integer('file_size').notNull(),
  mimeType: text('mime_type'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const userStats = pgTable('user_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull().unique(),
  totalConversions: integer('total_conversions').default(0),
  totalFilesProcessed: integer('total_files_processed').default(0),
  conversionsToday: integer('conversions_today').default(0),
  lastConversionAt: timestamp('last_conversion_at'),
  premiumUntil: timestamp('premium_until'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

### Step 4: Setup Drizzle Client

Create `/lib/db/index.ts`:

```typescript
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
})

export const db = drizzle(pool, { schema })

export * from 'drizzle-orm'
```

### Step 5: Setup Better Auth

Create `/lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { pool, db } from "./db"
import * as schema from "./db/schema"

export const auth = new betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || 
    (process.env.VERCEL_PROJECT_PRODUCTION_URL 
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:3000`),
  trustedOrigins: [
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    process.env.V0_RUNTIME_URL,
    "http://localhost:3000",
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes:
      process.env.NODE_ENV === "development"
        ? {
            sameSite: "none",
            secure: true,
          }
        : undefined,
  },
})
```

Create `/lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient()
```

### Step 6: Mount Auth Handler

Create `/app/api/auth/[...all]/route.ts`:

```typescript
import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = toNextJsHandler(auth.handler)
```

### Step 7: Install Required Packages

```bash
cd /vercel/share/v0-project

# Install Neon dependencies
pnpm add better-auth pg drizzle-orm

# Install dev dependencies
pnpm add -D @types/pg
```

---

## API ROUTE TESTING

### Test Strategy

Every API route needs to be tested for:
1. **Accepts correct file type** (PDF, Word, Excel, etc.)
2. **Returns HTTP 200 on success**
3. **Returns valid output file**
4. **Handles errors gracefully**

### Test Script for All 29 APIs

Create a test file: `/test-apis.sh`

```bash
#!/bin/bash

echo "Starting API Tests..."
echo "===================="

# Start dev server if not running
if ! curl -s http://localhost:3000 > /dev/null; then
  echo "Starting dev server..."
  pnpm run dev > /tmp/dev.log 2>&1 &
  sleep 15
fi

# Create test files
printf '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000052 00000 n\n0000000102 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n149\n%%%%EOF' > /tmp/test.pdf

echo "test" > /tmp/test.txt

# PDF Tools Testing
echo ""
echo "PDF TOOLS:"
echo "─────────"

PDF_TOOLS=(
  "compress-pdf"
  "merge-pdf"
  "split-pdf"
  "rotate-pdf"
  "crop-pdf"
  "remove-pages"
  "watermark-pdf"
  "page-numbers"
  "protect-pdf"
  "unlock-pdf"
)

for tool in "${PDF_TOOLS[@]}"; do
  echo -n "Testing $tool... "
  curl -s -o /tmp/out.pdf -w "%{http_code}" \
    -X POST -F "file=@/tmp/test.pdf" \
    http://localhost:3000/api/convert/$tool

  if [ -s /tmp/out.pdf ]; then
    echo " ✓ (Output: $(stat -c%s /tmp/out.pdf) bytes)"
  else
    echo " ✗ (Empty response)"
  fi
done

# Conversion Tools
echo ""
echo "CONVERSION TOOLS:"
echo "────────────────"

CONVERSION_TOOLS=(
  "pdf-to-jpg"
  "pdf-to-png"
  "pdf-to-excel"
  "pdf-to-word"
  "jpg-to-pdf"
  "image-to-pdf"
  "excel-to-pdf"
  "word-to-pdf"
  "html-to-pdf"
  "powerpoint-to-pdf"
)

for tool in "${CONVERSION_TOOLS[@]}"; do
  echo -n "Testing $tool... "
  curl -s -o /tmp/out -w "%{http_code}" \
    -X POST -F "file=@/tmp/test.pdf" \
    http://localhost:3000/api/convert/$tool

  if [ -s /tmp/out ]; then
    echo " ✓"
  else
    echo " ✗"
  fi
done

# AI Tools
echo ""
echo "AI TOOLS:"
echo "────────"

AI_TOOLS=(
  "ai-summary"
  "ai-chat"
  "ai-translate"
  "ai-rewrite"
  "ocr"
)

for tool in "${AI_TOOLS[@]}"; do
  echo -n "Testing $tool... "
  curl -s -o /tmp/out -w "%{http_code}" \
    -X POST -F "file=@/tmp/test.pdf" \
    http://localhost:3000/api/convert/$tool

  if [ -s /tmp/out ]; then
    echo " ✓"
  else
    echo " ✗"
  fi
done

echo ""
echo "Test Complete!"
```

Run it:

```bash
chmod +x /test-apis.sh
./test-apis.sh
```

### Individual API Testing

Test specific tool with curl:

```bash
# Test compress-pdf
curl -X POST \
  -F "file=@/path/to/file.pdf" \
  http://localhost:3000/api/convert/compress-pdf \
  -o output.pdf

# Check result
file output.pdf
```

---

## FILE PIPELINE COMPLETION

### Current State Analysis

The file pipeline has 3 stages:
1. **Upload** ✓ (FileUploader component works)
2. **Process** ⚠ (APIs exist but need testing)
3. **Download** ⚠ (Download logic may be incomplete)

### Complete File Pipeline Implementation

Create `/lib/file-pipeline.ts`:

```typescript
import { db } from './db'
import { conversions, fileUploads } from './db/schema'
import { eq } from 'drizzle-orm'

export interface ConversionRequest {
  userId: string
  toolName: string
  inputFile: File
  conversionId: string
}

// 1. Track file upload
export async function logFileUpload(
  userId: string,
  fileName: string,
  fileSize: number,
  mimeType: string
) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  
  const upload = await db.insert(fileUploads).values({
    userId,
    fileName,
    filePath: `/uploads/${Date.now()}-${fileName}`,
    fileSize,
    mimeType,
    expiresAt,
  }).returning()
  
  return upload[0]
}

// 2. Track conversion start
export async function startConversion(
  userId: string,
  toolName: string,
  inputFileName: string,
  inputFileSize: number
) {
  const conversion = await db.insert(conversions).values({
    userId,
    toolName,
    inputFileName,
    inputFileSize,
    status: 'processing',
  }).returning()
  
  return conversion[0]
}

// 3. Update conversion with result
export async function completeConversion(
  conversionId: string,
  outputFileName: string,
  outputFileSize: number
) {
  const conversion = await db.update(conversions)
    .set({
      outputFileName,
      outputFileSize,
      status: 'completed',
      completedAt: new Date(),
    })
    .where(eq(conversions.id, conversionId))
    .returning()
  
  return conversion[0]
}

// 4. Log conversion error
export async function failConversion(
  conversionId: string,
  error: string
) {
  const conversion = await db.update(conversions)
    .set({
      status: 'failed',
      errorMessage: error,
      completedAt: new Date(),
    })
    .where(eq(conversions.id, conversionId))
    .returning()
  
  return conversion[0]
}

// 5. Get user conversion history
export async function getUserConversions(userId: string) {
  return db.select()
    .from(conversions)
    .where(eq(conversions.userId, userId))
}

// 6. Update user stats
export async function updateUserStats(userId: string) {
  const userConversions = await db.select()
    .from(conversions)
    .where(eq(conversions.userId, userId))
  
  const completedCount = userConversions.filter(
    c => c.status === 'completed'
  ).length
  
  return {
    totalConversions: completedCount,
    lastConversion: userConversions[0]?.createdAt,
  }
}
```

### Update API Routes to Use Pipeline

Example: `/app/api/convert/compress-pdf/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import { startConversion, completeConversion, failConversion } from '@/lib/file-pipeline'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  let conversionId: string | null = null
  
  try {
    // 1. Get authenticated user
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Get file
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file || !file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      )
    }

    // 3. Start conversion tracking
    const conversion = await startConversion(
      session.user.id,
      'compress-pdf',
      file.name,
      file.size
    )
    conversionId = conversion.id

    // 4. Process file
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
    const pdfBytes = await pdf.save()
    const buffer = Buffer.from(pdfBytes)

    // 5. Complete conversion
    await completeConversion(
      conversionId,
      `compressed-${file.name}`,
      buffer.length
    )

    // 6. Return file
    return new NextResponse(buffer, {
      headers: {
        'Content-Disposition': `attachment; filename="compressed-${file.name}"`,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-cache',
      },
    })

  } catch (error) {
    console.error('[v0] Compress PDF error:', error)
    
    // Log failure
    if (conversionId) {
      await failConversion(
        conversionId,
        error instanceof Error ? error.message : 'Unknown error'
      )
    }

    return NextResponse.json(
      { error: 'Conversion failed' },
      { status: 500 }
    )
  }
}
```

### Frontend File Upload Integration

Update `/components/tools/file-uploader.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function FileUploader({ toolName, apiEndpoint }) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Conversion failed')
      }

      // Get file from response
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `converted-${file.name}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      // Refresh to show in history
      router.refresh()

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={loading}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!file || loading}
      >
        {loading ? 'Converting...' : 'Convert'}
      </button>
    </form>
  )
}
```

---

## SUMMARY CHECKLIST

### Database Integration
- [ ] Generate BETTER_AUTH_SECRET
- [ ] Add env variable to Vercel
- [ ] Run SQL schema creation scripts
- [ ] Create Drizzle schema file
- [ ] Create Drizzle client
- [ ] Setup Better Auth
- [ ] Mount auth handler
- [ ] Install packages (better-auth, pg, drizzle-orm)

### API Testing
- [ ] Create test script
- [ ] Run against all 29 endpoints
- [ ] Fix failing endpoints
- [ ] Verify output files are valid
- [ ] Test error handling

### File Pipeline
- [ ] Create file-pipeline.ts utility
- [ ] Update API routes to use pipeline
- [ ] Integrate with database
- [ ] Update frontend file upload
- [ ] Test end-to-end conversion

---

**NEXT STEPS:**
1. Add BETTER_AUTH_SECRET to environment
2. Run all SQL schema creation
3. Install Neon packages
4. Copy reference files from examples
5. Test APIs with script
6. Deploy and verify

