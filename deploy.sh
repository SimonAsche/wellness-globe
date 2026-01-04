#!/bin/bash
set -e

echo "🚀 Deploying wellness-globe..."

cd /var/www/wellness-globe
git pull origin main

docker compose up -d

echo "✅ Deployed successfully at $(date)"
echo "🌐 https://wellnessglobe.net"
