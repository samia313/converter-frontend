# PDFilio - Deployment & Reliability Guide

## Overview

Complete guide for deploying and maintaining the PDFilio PDF converter application with maximum reliability and uptime.

---

## Production Deployment Checklist

### Pre-Deployment

- [ ] All error handling implemented
- [ ] File upload validators working
- [ ] Download handlers with retry logic
- [ ] Environment variables configured
- [ ] Rate limiting enabled
- [ ] Logging configured

### Environment Variables

Create `.env.production.local`:

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# File Upload Settings
MAX_UPLOAD_SIZE_MB=100
MAX_TOTAL_SIZE_MB=500
UPLOAD_DIR=/var/uploads

# Rate Limiting
RATE_LIMIT_INTERVAL=60000
RATE_LIMIT_MAX_REQUESTS=30

# Logging
LOG_LEVEL=info
```

---

## Server Configuration (DigitalOcean)

### Current Setup

```
Server: ubuntu-s-1vcpu-512mb-10gb-tor1
Upgraded to: 2GB RAM / 50GB Disk / TOR1 Region
```

### Recommended Production Setup

For production, we recommend upgrading to:
- **Minimum**: 2GB RAM / 50GB SSD (current setup)
- **Recommended**: 4GB RAM / 100GB SSD / 2 vCPU
- **High Traffic**: 8GB+ RAM / 250GB SSD / 4+ vCPU

### Installation & Setup (Already Done)

1. ✅ Node.js 20.20.2
2. ✅ PM2 process manager
3. ✅ Nginx reverse proxy
4. ✅ Ghostscript, ImageMagick, FFmpeg
5. ✅ LibreOffice

---

## Application Monitoring

### PM2 Monitoring

```bash
# View all processes
pm2 list

# Real-time monitoring
pm2 monit

# View logs
pm2 logs pdfilio

# View specific errors
pm2 logs pdfilio --err

# Save configuration
pm2 save

# Startup configuration
pm2 startup
```

### Health Check Script

Create `/var/healthcheck.sh`:

```bash
#!/bin/bash

# Check if services are running
systemctl is-active --quiet nginx || echo "Nginx is down"
pm2 list | grep "online" || echo "PM2 processes offline"

# Check disk space
DISK=$(df / | awk 'NR==2 {print int($5)}')
if [ $DISK -gt 90 ]; then
    echo "Disk usage critical: ${DISK}%"
fi

# Check memory
MEM=$(free | awk '/^Mem:/ {printf("%.0f", $3/$2 * 100)}')
if [ $MEM -gt 80 ]; then
    echo "Memory usage high: ${MEM}%"
fi
```

Run daily:
```bash
(crontab -l 2>/dev/null; echo "0 * * * * /var/healthcheck.sh | mail -s 'Server Health' admin@example.com") | crontab -
```

---

## Error Handling

### Implemented Error Types

All errors follow standardized format:

```json
{
  "error": "User-friendly message",
  "code": "ERROR_CODE",
  "timestamp": "2026-07-15T10:00:00Z",
  "details": "Technical details (dev only)"
}
```

### Error Codes

| Code | Status | Meaning | Fix |
|------|--------|---------|-----|
| NO_FILE | 400 | No file uploaded | Ensure file is selected |
| INVALID_FILE_TYPE | 400 | Wrong file type | Use supported format |
| FILE_TOO_LARGE | 413 | File exceeds limit | Split/compress file |
| CORRUPTED_FILE | 400 | PDF invalid | Re-export from source |
| PROCESSING_FAILED | 500 | Conversion error | Retry or contact support |
| CONVERSION_TIMEOUT | 408 | Processing too long | Use smaller file |
| RATE_LIMITED | 429 | Too many requests | Wait before retrying |
| INTERNAL_ERROR | 500 | Server error | Check logs/support |

### Retry Logic

Automatic retry implemented:
- Max retries: 3
- Initial delay: 1 second
- Backoff multiplier: 1.5x
- Network errors: Retried
- Invalid files: Not retried

---

## File Upload & Download

### Upload Validation

All uploads validated for:
- File type (PDF, Images, Documents, etc.)
- File size (100MB per file, 500MB total)
- File integrity
- Virus scanning (optional)

### Download Handling

Safe download with:
- Content-type verification
- Filename sanitization
- Resumable downloads
- Error recovery

---

## Performance Optimization

### Caching

```bash
# Enable browser caching (Nginx)
add_header Cache-Control "public, max-age=3600";

# CDN optimization
add_header X-Cache-Status $upstream_cache_status;
```

### Compression

PDF compression integrated:
- Uses object streams
- Removes unnecessary data
- Preserves quality

### Database (if added)

Recommended: Neon PostgreSQL

```sql
CREATE TABLE conversions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  file_name VARCHAR(255),
  file_size INT,
  conversion_type VARCHAR(50),
  status VARCHAR(20),
  created_at TIMESTAMP,
  completed_at TIMESTAMP,
  error_message TEXT
);

CREATE INDEX idx_user_conversions ON conversions(user_id, created_at);
```

---

## Security

### SSL/HTTPS (Already configured if domain added)

```bash
# Check certificate
certbot certificates

# Auto-renewal
certbot renew --dry-run

# Manual renewal
certbot renew
```

### Rate Limiting

Configured per IP:
- 30 requests per 60 seconds
- Exceeding returns 429 status
- Configurable via environment variables

### Input Validation

- File type whitelist
- Size limits
- Filename sanitization
- Buffer overflow prevention

---

## Backups

### File Backups

```bash
# Manual backup
tar -czf backup_$(date +%Y%m%d).tar.gz /var/uploads/

# Automated (cron)
0 2 * * * tar -czf /backup/uploads_$(date +\%Y\%m\%d).tar.gz /var/uploads/
```

### Database Backup (when added)

```bash
# Neon backup
pg_dump -h [host] -U [user] -d [db] > backup.sql
```

### DigitalOcean Snapshots

Enable automatic snapshots:
- Dashboard → Droplet → Backups
- Enable weekly backups
- Cost: ~$1-2/month

---

## Logging & Monitoring

### Application Logs

```bash
# Real-time logs
pm2 logs pdfilio --lines 50 --follow

# Error logs
pm2 logs pdfilio --err

# Clear logs
pm2 flush
```

### Nginx Logs

```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs  
tail -f /var/log/nginx/error.log

# Monitor specific errors
grep "5[0-9][0-9]" /var/log/nginx/error.log
```

### System Logs

```bash
# System journal
journalctl -u pdfilio -n 50

# Service logs
systemctl status nginx
systemctl status pm2-root
```

---

## Scaling

### Horizontal Scaling (Multiple Servers)

Use load balancer:
1. DigitalOcean Load Balancer
2. Add multiple droplets
3. Configure health checks
4. Use sticky sessions if needed

### Vertical Scaling (Single Server)

Upgrade droplet:
1. DigitalOcean Console
2. Droplet → Resize
3. Increase RAM/CPU/Disk
4. Choose "Flexible Resize"
5. Restart application

---

## Troubleshooting

### Application Won't Start

```bash
# Check process
pm2 list

# View error log
pm2 logs pdfilio --err

# Restart
pm2 restart pdfilio

# Check port 3000
netstat -tlnp | grep 3000
```

### High Memory Usage

```bash
# Check memory
free -h

# Find memory-heavy processes
ps aux --sort=-%mem | head -10

# Restart PM2 processes
pm2 restart all
```

### Nginx Errors

```bash
# Test config
nginx -t

# View error
tail -20 /var/log/nginx/error.log

# Restart Nginx
systemctl restart nginx
```

### File Upload Issues

- Check `/var/uploads/` permissions: `chmod 755 /var/uploads/`
- Check disk space: `df -h`
- Check file size: `ls -lh /var/uploads/temp/`

---

## Maintenance

### Regular Tasks

**Daily**:
- Monitor error logs
- Check disk usage
- Verify processes running

**Weekly**:
- Review performance metrics
- Check for updates
- Verify backups

**Monthly**:
- Update system packages: `apt update && apt upgrade -y`
- Review security logs
- Test disaster recovery

### Update Procedure

```bash
# Update Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Update application
cd /var/www/converter-frontend
git pull origin main
pnpm install
pnpm run build
pm2 restart pdfilio

# Update system
sudo apt update && sudo apt upgrade -y

# Restart Nginx
sudo systemctl restart nginx
```

---

## Support & Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [PM2 Docs](https://pm2.keymetrics.io/)
- [Nginx Docs](https://nginx.org/en/docs/)

### Monitoring Services

Consider integrating:
- **Sentry**: Error tracking - sentry.io
- **DataDog**: Monitoring - datadoghq.com
- **New Relic**: APM - newrelic.com
- **Uptime Robot**: Uptime monitoring - uptimerobot.com

### Contact

For critical issues:
1. Check application logs: `pm2 logs pdfilio`
2. Check system resources: `free -h`, `df -h`
3. Check nginx status: `systemctl status nginx`
4. Restart services: `pm2 restart all`
5. Contact support if issue persists

---

## Success Metrics

Target reliability:
- ✅ 99.5% uptime
- ✅ <500ms response time
- ✅ <0.1% error rate
- ✅ Zero data loss

Current status:
- Server: Running stable
- All conversion tools: Functional
- Error handling: Comprehensive
- File storage: Persistent

---

**Last Updated**: 2026-07-15  
**Version**: 1.0  
**Status**: Production Ready
