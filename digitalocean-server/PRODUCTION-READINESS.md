# PDFilio production readiness runbook

This runbook records the remaining infrastructure work for PR #107. It is a checklist, not evidence that any cloud resource is already configured. Do not put secrets, tokens, or raw connection strings in GitHub issues, PR comments, or logs.

## Current verified preview status

- The preview deployment for the PR head can build and serve the application.
- The preview `/api/health` endpoint returned HTTP 503 on 2026-10-18.
- The health response reported the queue unhealthy, persistent storage not configured, and the conversion worker not configured.
- AI provider configuration was detected, but a configured key does not prove a real AI request succeeds.
- No production deployment or end-to-end conversion has been verified.

## Required Vercel configuration

In the Vercel project, add these only after obtaining the real endpoint and a newly generated secret from the appropriate provider. Set the same worker API key on both sides.

| Variable | Required value |
| --- | --- |
| `DIGITALOCEAN_CONVERTER_URL` (or the supported alias in `lib/digitalocean-config.ts`) | Reachable HTTPS base URL of the conversion worker; no trailing path such as `/health` |
| `DIGITALOCEAN_CONVERTER_API_KEY` (or supported alias) | Newly generated worker API key; identical to worker `API_KEY` |
| `KV_REST_API_URL` | Upstash Redis **HTTPS REST** endpoint, not a TCP `redis://` or `rediss://` connection URL |
| `KV_REST_API_TOKEN` | Upstash REST token |
| `HEALTH_CHECK_API_KEY` | Strong random secret for authenticated health maintenance actions; never reuse the worker API key |

Apply the variables to the correct Vercel environments (Preview first; Production only during an approved release), then redeploy the corresponding deployment so runtime functions receive the values. Do not paste secret values into this checklist.

## Required DigitalOcean worker configuration

On the worker host, confirm these exist in the service's private environment and are not committed to source control:

- `API_KEY` — must match the Vercel worker key.
- `JWT_SECRET` — strong, unique secret.
- `SPACES_KEY`, `SPACES_SECRET`, `SPACES_BUCKET`, `SPACES_ENDPOINT`, `SPACES_REGION` — valid DigitalOcean Spaces credentials and bucket.
- `REDIS_URL` — TCP Redis connection string for BullMQ/ioredis; use TLS (`rediss://`) in production.
- `PORT` — use the port configured for the worker service (the current deployment guide uses 3001).

Keep input/output objects private. Use signed URLs only where the client must download a result. Restrict worker ingress to HTTPS and the intended callers; do not expose an unauthenticated worker endpoint publicly. Do not use broad shell deletion commands to clear temporary files.

## Validation sequence (must be run after configuration)

1. Run `npm run check-config` in `digitalocean-server`. This checks required variable presence and URL formats only; it does not prove provider connectivity.
2. Restart the worker service using the actual process manager and inspect its status. Avoid printing environment values.
3. Request the worker `/health` endpoint over HTTPS. It must report ready only if required dependencies are reachable.
4. Request the Vercel preview `/api/health`. Expect HTTP 200 only when the queue is healthy and storage/worker/AI configuration meets the route's checks.
5. Upload a small, non-sensitive test PDF to PDF-to-Word, wait for job completion, download the output, and verify it opens as a DOCX ZIP package.
6. Test one AI operation with a non-sensitive text PDF and verify the response contains actual document-specific output, not a placeholder.
7. Record status codes, safe job IDs, output validity, and elapsed time. Never record authorization headers, API keys, signed URLs, raw provider exceptions, or document contents in shared logs.

## Release gate

Do not merge PR #107 or deploy to production until the owner explicitly approves it and preview upload/conversion plus an AI request pass. Payment configuration is out of scope and remains pending.