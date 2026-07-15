# DigitalOcean PDF Conversion Server - Complete Deployment Guide

## Prerequisites

- DigitalOcean account (digitalocean.com)
- Basic Linux/SSH knowledge
- Domain name (optional)

---

## Step 1: Create DigitalOcean Droplet

### 1.1 Go to DigitalOcean Console
1. Log in to digitalocean.com
2. Click "Create" → "Droplets"

### 1.2 Select Configuration
- **Operating System**: Ubuntu 22.04 LTS
- **Droplet Type**: Basic ($6/month)
- **CPU Options**: 2GB RAM, 1 CPU, 50GB SSD
- **Region**: Singapore (sgp1) or closest to your users
- **Authentication**: SSH Key (recommended)

### 1.3 Generate SSH Key (If needed)
```bash
# On your local machine
ssh-keygen -t rsa -b 4096 -f digitalocean-key

# Add public key to DigitalOcean during droplet creation
```

### 1.4 Create Droplet
- Click "Create Droplet"
- Wait 2-3 minutes for droplet to be ready
- Note the droplet IP address (e.g., 123.45.67.89)

---

## Step 2: Initial Server Setup

### 2.1 SSH into Droplet
```bash
ssh -i digitalocean-key root@<droplet-ip>
# Or if using password:
ssh root@<droplet-ip>
```

### 2.2 Update System
```bash
apt update && apt upgrade -y
```

### 2.3 Create Non-Root User
```bash
useradd -m -s /bin/bash converter
usermod -aG sudo converter
passwd converter
# Enter password for converter user
```

### 2.4 Add SSH Key for New User
```bash
su - converter
mkdir -p ~/.ssh
# Add your public key to ~/.ssh/authorized_keys
echo "your-public-key-here" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
exit
```

---

## Step 3: Install Dependencies

### 3.1 Install Node.js
```bash
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs npm
```

### 3.2 Install PDF Tools
```bash
sudo apt install -y libreoffice imagemagick ghostscript tesseract-ocr
sudo apt install -y ffmpeg poppler-utils
sudo apt install -y git
```

### 3.3 Verify Installation
```bash
node --version
npm --version
libreoffice --version
```

---

## Step 4: Deploy Conversion Server

### 4.1 Clone or Upload Server Code
```bash
# SSH as converter user
ssh -i digitalocean-key converter@<droplet-ip>

# Create directory
mkdir -p ~/pdf-conversion-api
cd ~/pdf-conversion-api

# Option 1: Clone from GitHub (if you have repo)
# git clone <your-repo> .

# Option 2: Upload files via SCP
# scp -r digitalocean-server/* converter@<droplet-ip>:~/pdf-conversion-api/
```

### 4.2 Install Node Dependencies
```bash
cd ~/pdf-conversion-api
npm install
```

### 4.3 Configure Environment Variables
```bash
nano .env
```

Add:
```env
PORT=3001
NODE_ENV=production

API_KEY=your-strong-secret-key-here

SPACES_KEY=your-spaces-key
SPACES_SECRET=your-spaces-secret
SPACES_BUCKET=pdffilio-conversions
SPACES_ENDPOINT=https://sgp1.digitaloceanspaces.com
SPACES_REGION=sgp1

MAX_FILE_SIZE=104857600
UPLOAD_TEMP_DIR=/tmp
CONVERSION_TIMEOUT=60000
MAX_CONCURRENT_CONVERSIONS=5

LOG_LEVEL=info
```

Save: Ctrl+X, Y, Enter

---

## Step 5: DigitalOcean Spaces Setup

### 5.1 Create Spaces Bucket
1. Go to DigitalOcean console
2. Click "Spaces" in sidebar
3. Click "Create Spaces Bucket"
4. Name: `pdffilio-conversions`
5. Region: `sgp1` (same as droplet)
6. Restriction: Unrestricted (or restrict to your domain)
7. Click "Create Space"

### 5.2 Generate API Keys
1. Click account menu (top right)
2. Select "API"
3. Under "Spaces keys", click "Generate New Key"
4. Copy Key and Secret
5. Add to `.env` file

### 5.3 Configure CORS
1. Go to Space settings
2. Click "CORS"
3. Add:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "POST", "DELETE"],
    "AllowedOrigins": ["https://pdfilio.com", "https://*.pdfilio.com"],
    "ExposeHeaders": ["Content-Length"]
  }
]
```

---

## Step 6: Setup Process Manager (PM2)

### 6.1 Install PM2 Globally
```bash
sudo npm install -g pm2
pm2 completion install
```

### 6.2 Start Server with PM2
```bash
cd ~/pdf-conversion-api
pm2 start server.js --name "pdf-converter"
pm2 save
sudo pm2 startup
```

### 6.3 Verify Server is Running
```bash
pm2 status
pm2 logs pdf-converter
```

---

## Step 7: SSL Certificate (HTTPS)

### 7.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 7.2 Generate Certificate (if using domain)
```bash
sudo certbot certonly --standalone -d api.pdffilio.com
```

### 7.3 Update Server for HTTPS
Create `server-https.js`:
```javascript
const https = require('https')
const fs = require('fs')
const app = require('./server')

const ssl = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.pdffilio.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.pdffilio.com/fullchain.pem'),
}

https.createServer(ssl, app).listen(443)
```

---

## Step 8: Firewall Configuration

### 8.1 Enable UFW
```bash
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### 8.2 Allow Required Ports
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3001/tcp  # Node.js API
```

### 8.3 Verify Rules
```bash
sudo ufw status
```

---

## Step 9: Monitoring & Logging

### 9.1 View Logs
```bash
pm2 logs pdf-converter
pm2 monit
```

### 9.2 Setup Log Rotation (optional)
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 5
```

### 9.3 Monitor Resources
```bash
htop
df -h  # Disk usage
free -h  # Memory
```

---

## Step 10: Configure Next.js Frontend

### 10.1 Add Environment Variables to Vercel
In Vercel project settings:
```
DIGITALOCEAN_DROPLET_IP=<your-droplet-ip>:3001
DIGITALOCEAN_API_KEY=<your-api-key>
```

### 10.2 Update Next.js Routes
Import and use `digitalocean-client.ts`:
```typescript
import { pdfToWord, pdfToExcel } from '@/lib/digitalocean-client'

// In your API route
const result = await pdfToWord(fileBuffer, filename)
```

---

## Testing

### Test 1: Health Check
```bash
curl https://<droplet-ip>:3001/health
# Response: {"status":"ok","timestamp":"2024-07-13T..."}
```

### Test 2: Convert PDF
```bash
curl -H "Authorization: Bearer <api-key>" \
  -F "file=@test.pdf" \
  https://<droplet-ip>:3001/convert/pdf-to-word
```

### Test 3: Monitor Conversion
Check `/tmp` for uploaded files and Spaces bucket for output files.

---

## Troubleshooting

### Issue: Server not running
```bash
pm2 status
pm2 restart pdf-converter
pm2 logs pdf-converter
```

### Issue: Out of disk space
```bash
sudo rm -rf /tmp/*  # Clear temp files
df -h  # Check space
```

### Issue: Memory issues
```bash
free -h
ps aux | sort -nrk 3,3 | head -10  # Top processes by CPU
```

### Issue: Conversion failing
```bash
# Test LibreOffice manually
libreoffice --headless --convert-to docx test.pdf

# Test ImageMagick
convert test.pdf test.png

# Test Tesseract
tesseract test.png output
```

---

## Maintenance

### Regular Backups
```bash
# Backup Spaces bucket
aws s3 sync s3://pdffilio-conversions ~/backups/

# Or use DigitalOcean Snapshots
```

### Update System
```bash
sudo apt update
sudo apt upgrade -y
```

### Renew SSL Certificates (auto)
```bash
sudo certbot renew --dry-run
```

### Monitor Performance
```bash
sar -u 1 10  # CPU
sar -r 1 10  # Memory
sar -n DEV 1 10  # Network
```

---

## Cost Analysis

| Item | Cost | Duration |
|------|------|----------|
| Droplet | $6 | Monthly |
| Spaces (250GB free) | $0-5 | Monthly |
| Bandwidth | $0.10/GB | Pay as you go |
| **Total** | **$6-15** | Monthly |

---

## Support & Monitoring

### Health Checks
Add to cron job:
```bash
*/5 * * * * curl https://<droplet-ip>:3001/health || pm2 restart pdf-converter
```

### Alerts
Consider adding monitoring service:
- Uptime Robot (free)
- DataDog
- New Relic

---

Deployment complete! Your conversion server is now live and integrated with your Next.js application.
