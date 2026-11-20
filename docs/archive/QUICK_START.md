# Production Pipeline - Quick Start Guide

## 1. Health Check (Test Everything)

```bash
# Check if system is working
curl http://localhost:3000/api/health | jq '.'

# Response: Shows queue status, storage usage, logs, metrics, alerts
```

## 2. Submit a Conversion Job

```typescript
import { getConversionService } from '@/lib/services/conversion-service';

const conversion = getConversionService();

// Submit job
const result = await conversion.submitConversion({
  type: 'compress',        // Tool type: compress|merge|split|convert|ocr
  buffer: pdfBuffer,       // File content
  userId: 'user-123',      // User ID (optional)
  options: {
    inputFileName: 'document.pdf'
  },
  metadata: {
    customField: 'value'
  }
});

console.log(result.jobId);   // Track this ID
console.log(result.status);  // 'queued'
```

## 3. Check Job Status

```typescript
const conversion = getConversionService();
const status = await conversion.getConversionStatus(jobId);

console.log(status.status);        // 'queued', 'processing', 'completed', 'failed'
console.log(status.outputUrl);     // URL to download file
console.log(status.processingTime); // Time in ms
console.log(status.error);         // Error message if failed
```

## 4. Get System Health

```typescript
const conversion = getConversionService();
const health = await conversion.getSystemHealth();

console.log(health.status);        // 'healthy', 'degraded', 'unhealthy'
console.log(health.queue);         // Queue health details
console.log(health.metrics);       // Performance metrics
```

## 5. View Processing Logs

```typescript
import { getLoggingService } from '@/lib/services/logging-service';

const logging = getLoggingService();
const logs = await logging.getConversionLogs(jobId, 50);

logs.forEach(log => {
  console.log(`[${log.level}] ${log.message}`, log.context);
});
```

## 6. Get Metrics

```typescript
import { getMetricsService } from '@/lib/services/metrics-service';

const metrics = getMetricsService();

// By tool type
const compressMetrics = metrics.getMetrics('compress');
console.log(compressMetrics.successCount);
console.log(compressMetrics.averageCompressionRatio);

// All metrics
const summary = metrics.getPerformanceSummary();
console.log(summary.successRate);
console.log(summary.byType);
```

## 7. Handle Errors

```typescript
try {
  const result = await conversion.submitConversion({
    type: 'compress',
    buffer: pdfBuffer,
  });
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  
  if (message.includes('File size')) {
    // Handle file size error
  } else if (message.includes('Input file')) {
    // Handle invalid input
  } else {
    // Handle other errors
  }
}
```

## 8. Run Maintenance Tasks

```bash
# Run cleanup (removes old jobs, files, logs)
curl -X POST http://localhost:3000/api/health \
  -H "Content-Type: application/json" \
  -d '{"action":"cleanup"}'

# Reset metrics
curl -X POST http://localhost:3000/api/health \
  -H "Content-Type: application/json" \
  -d '{"action":"reset-metrics"}'
```

## 9. Integration with API Routes

```typescript
// app/api/convert/compress-pdf/route.ts
import { getConversionService } from '@/lib/services/conversion-service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    const buffer = Buffer.from(await file.arrayBuffer());

    const conversion = getConversionService();
    const result = await conversion.submitConversion({
      type: 'compress',
      buffer,
      userId,
      options: { inputFileName: file.name },
      metadata: { mimeType: file.type }
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
```

## 10. Key Commands

```bash
# Test the build
npm run build

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Check TypeScript
npx tsc --noEmit

# Dev server
npm run dev

# Production build
npm run build
npm start
```

## Service Architecture

```
ConversionService (Orchestrator)
  ├── Queue Service (Redis - Upstash)
  │   └── Job enqueue, tracking, retries
  ├── Storage Service (Vercel Blob)
  │   └── File upload, download, integrity check
  ├── Logging Service (Redis - Upstash)
  │   └── Structured logs, search, analytics
  └── Metrics Service (In-memory)
      └── Performance tracking, alerts
```

## Configuration

```env
# Already configured
REDIS_URL=rediss://...
KV_REST_API_TOKEN=...
DATABASE_URL=postgresql://...

# Optional tunables
MAX_FILE_SIZE=500MB
LOG_LEVEL=info
JOB_RETENTION_DAYS=7
LOG_RETENTION_DAYS=30
```

## Testing Examples

```bash
# Submit a test conversion
curl -X POST http://localhost:3000/api/health

# Check system health
curl http://localhost:3000/api/health | jq '.status'

# View queue metrics
curl http://localhost:3000/api/health | jq '.components.queue.metrics'

# View performance
curl http://localhost:3000/api/health | jq '.performance'
```

## API Response Examples

### Success
```json
{
  "jobId": "job-1721755200000-abc123",
  "status": "queued"
}
```

### Completed
```json
{
  "jobId": "job-1721755200000-abc123",
  "status": "completed",
  "outputUrl": "https://...",
  "outputSize": 1024000,
  "processingTime": 2500
}
```

### Error
```json
{
  "error": "File size exceeds maximum limit of 500MB"
}
```

## Common Patterns

**Fire and Forget:**
```typescript
const result = await conversion.submitConversion({ ... });
// Returns immediately with jobId
```

**Poll for Completion:**
```typescript
const poll = setInterval(async () => {
  const status = await conversion.getConversionStatus(result.jobId);
  if (status.status === 'completed') {
    clearInterval(poll);
    downloadFile(status.outputUrl);
  }
}, 2000);
```

**WebSocket Updates:**
```typescript
const ws = new WebSocket('ws://localhost:3000/ws/conversion');
ws.send(JSON.stringify({ jobId }));
ws.onmessage = (e) => console.log(JSON.parse(e.data));
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Queue not processing | Check `/api/health` → `components.queue` |
| High memory usage | Run cleanup via `POST /api/health` |
| Slow processing | Review metrics at `/api/health` |
| File not uploading | Check storage health at `/api/health` |

## Key Files

- `lib/services/conversion-service.ts` - Main API
- `lib/services/queue.ts` - Job queue
- `lib/services/storage-service.ts` - File storage
- `lib/services/logging-service.ts` - Event logging
- `lib/services/metrics-service.ts` - Performance metrics
- `app/api/health/route.ts` - Monitoring endpoint
- `PRODUCTION_PIPELINE.md` - Full documentation

---

**Ready to use! Start with step 1 (Health Check) to verify everything is working.**
