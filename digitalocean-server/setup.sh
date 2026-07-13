#!/bin/bash
# Automated DigitalOcean Server Setup Script

set -e

echo "=== DigitalOcean PDF Conversion Server Setup ==="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
   echo "Please run as root (sudo)"
   exit 1
fi

# Update system
echo "[1/5] Updating system..."
apt update && apt upgrade -y

# Install dependencies
echo "[2/5] Installing dependencies..."
apt install -y curl git nodejs npm
apt install -y libreoffice imagemagick ghostscript tesseract-ocr ffmpeg poppler-utils

# Create converter user
echo "[3/5] Creating converter user..."
useradd -m -s /bin/bash converter 2>/dev/null || true
usermod -aG sudo converter

# Clone/setup application
echo "[4/5] Setting up application..."
su - converter << 'EOF'
mkdir -p ~/pdf-conversion-api
cd ~/pdf-conversion-api

# If git repo provided
# git clone <repo> .

# Install npm dependencies
npm install

echo "✓ Application setup complete"
EOF

# Setup PM2
echo "[5/5] Setting up PM2..."
npm install -g pm2
su - converter << 'EOF'
pm2 start ~/pdf-conversion-api/server.js --name "pdf-converter"
pm2 save
EOF

sudo pm2 startup

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Configure .env file with your DigitalOcean Spaces credentials"
echo "2. Start server: pm2 start server.js"
echo "3. Test: curl http://localhost:3001/health"
echo "4. Configure firewall: sudo ufw allow 3001/tcp"
echo "5. Setup SSL: sudo certbot certonly --standalone -d your-domain.com"
echo ""
EOF

chmod +x /vercel/share/v0-project/digitalocean-server/setup.sh

echo "✓ Deployment guide and setup script created"
