#!/bin/bash

# Shop Deployment Script for Timeweb Server
# Usage: ./deploy.sh

set -e

SERVER="root@37.252.20.170"
APP_DIR="/var/www/shop"
REPO_URL="https://github.com/seplitza/shop.git"
APP_NAME="seplitza-shop"

echo "🚀 Deploying Seplitza Shop to Timeweb..."

# Deploy to server
ssh $SERVER <<'ENDSSH'
set -e

APP_DIR="/var/www/shop"
APP_NAME="seplitza-shop"

echo "📁 Setting up directory..."
mkdir -p $APP_DIR
cd $APP_DIR

# Clone or pull repository
if [ -d ".git" ]; then
  echo "📥 Pulling latest changes..."
  git pull origin main
else
  echo "📥 Cloning repository..."
  git clone https://github.com/seplitza/shop.git .
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps --production=false

# Build application
echo "🔨 Building Next.js app..."
NODE_ENV=production npm run build

# Setup systemd service if not exists
if [ ! -f "/etc/systemd/system/$APP_NAME.service" ]; then
  echo "⚙️  Creating systemd service..."
  cat > /etc/systemd/system/$APP_NAME.service << EOF
[Unit]
Description=Seplitza Shop - Next.js Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
Environment=PORT=3001
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload
  systemctl enable $APP_NAME
fi

# Restart service
echo "🔄 Restarting service..."
systemctl restart $APP_NAME

# Check status
sleep 2
if systemctl is-active --quiet $APP_NAME; then
  echo "✅ Deployment successful!"
  echo "📊 Service status:"
  systemctl status $APP_NAME --no-pager | head -10
else
  echo "❌ Service failed to start"
  systemctl status $APP_NAME --no-pager
  exit 1
fi

ENDSSH

echo ""
echo "✅ Deployment completed!"
echo "🌐 Shop URL: https://shop.seplitza.ru"
echo "🔍 Check logs: ssh $SERVER 'journalctl -u $APP_NAME -f'"
