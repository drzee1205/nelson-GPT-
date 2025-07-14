# Nelson-GPT Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Server with Python 3.11+ and Node.js 20+
- Domain name with SSL certificate
- API keys for Mistral AI and Hugging Face

### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y python3.11 python3.11-venv nodejs npm nginx

# Install pnpm
npm install -g pnpm

# Install PM2 for process management
npm install -g pm2
```

### Step 2: Application Setup
```bash
# Clone the application
git clone <repository-url> nelson-gpt
cd nelson-gpt

# Set up backend
cd nelson-gpt-backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set up frontend
cd ../nelson-gpt-frontend
pnpm install
pnpm run build

# Copy build to backend
cp -r dist/* ../nelson-gpt-backend/src/static/
```

### Step 3: Environment Configuration
```bash
# Create production environment file
cd nelson-gpt-backend
cat > .env << EOF
MISTRAL_API_KEY=your_production_mistral_key
HUGGINGFACE_API_KEY=your_production_huggingface_key
SUPABASE_URL=your_production_supabase_url
SUPABASE_KEY=your_production_supabase_key
FLASK_ENV=production
EOF
```

### Step 4: Production Server Setup
```bash
# Install Gunicorn
pip install gunicorn

# Create Gunicorn configuration
cat > gunicorn.conf.py << EOF
bind = "0.0.0.0:5000"
workers = 4
worker_class = "sync"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 100
timeout = 30
keepalive = 2
preload_app = True
EOF

# Create systemd service
sudo cat > /etc/systemd/system/nelson-gpt.service << EOF
[Unit]
Description=Nelson-GPT Flask Application
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/nelson-gpt/nelson-gpt-backend
Environment=PATH=/home/ubuntu/nelson-gpt/nelson-gpt-backend/venv/bin
ExecStart=/home/ubuntu/nelson-gpt/nelson-gpt-backend/venv/bin/gunicorn -c gunicorn.conf.py src.main:app
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable nelson-gpt
sudo systemctl start nelson-gpt
```

### Step 5: Nginx Configuration
```bash
# Create Nginx configuration
sudo cat > /etc/nginx/sites-available/nelson-gpt << EOF
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # PWA headers
    location /manifest.json {
        add_header Cache-Control "public, max-age=86400";
        add_header Content-Type "application/manifest+json";
    }

    location /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Content-Type "application/javascript";
    }

    # Static files
    location /static/ {
        alias /home/ubuntu/nelson-gpt/nelson-gpt-backend/src/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API routes
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # WebSocket support for streaming
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }

    # Frontend routes
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/nelson-gpt /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔧 Monitoring & Maintenance

### Health Checks
```bash
# Check application status
sudo systemctl status nelson-gpt

# View logs
sudo journalctl -u nelson-gpt -f

# Check Nginx status
sudo systemctl status nginx

# Monitor resources
htop
```

### Backup Strategy
```bash
# Create backup script
cat > backup.sh << EOF
#!/bin/bash
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/nelson-gpt"

# Create backup directory
mkdir -p \$BACKUP_DIR

# Backup application files
tar -czf \$BACKUP_DIR/nelson-gpt_\$DATE.tar.gz /home/ubuntu/nelson-gpt

# Backup database (if using SQLite)
cp /home/ubuntu/nelson-gpt/nelson-gpt-backend/src/database/app.db \$BACKUP_DIR/database_\$DATE.db

# Keep only last 7 days of backups
find \$BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find \$BACKUP_DIR -name "*.db" -mtime +7 -delete
EOF

chmod +x backup.sh

# Add to crontab for daily backups
echo "0 2 * * * /home/ubuntu/nelson-gpt/backup.sh" | crontab -
```

### Updates & Maintenance
```bash
# Update application
cd /home/ubuntu/nelson-gpt
git pull origin main

# Rebuild frontend
cd nelson-gpt-frontend
pnpm install
pnpm run build
cp -r dist/* ../nelson-gpt-backend/src/static/

# Update backend dependencies
cd ../nelson-gpt-backend
source venv/bin/activate
pip install -r requirements.txt

# Restart service
sudo systemctl restart nelson-gpt
```

## 📊 Performance Optimization

### Database Optimization
- Use PostgreSQL for production instead of SQLite
- Implement connection pooling
- Add database indexes for search queries

### Caching Strategy
- Implement Redis for session storage
- Cache API responses for static content
- Use CDN for static assets

### Scaling Considerations
- Use load balancer for multiple instances
- Implement horizontal scaling with Docker
- Monitor performance with APM tools

## 🔐 Security Checklist

- ✅ SSL/TLS encryption enabled
- ✅ Security headers configured
- ✅ API keys stored securely
- ✅ Regular security updates
- ✅ Firewall configured
- ✅ Access logs monitored
- ✅ Rate limiting implemented

## 🚨 Troubleshooting

### Common Issues

**Application won't start:**
```bash
# Check logs
sudo journalctl -u nelson-gpt -n 50

# Verify environment
source venv/bin/activate
python -c "import src.main"
```

**PWA not installing:**
- Verify HTTPS is enabled
- Check manifest.json is accessible
- Ensure service worker is registered

**API errors:**
- Verify API keys are correct
- Check network connectivity
- Monitor rate limits

### Emergency Procedures
```bash
# Quick restart
sudo systemctl restart nelson-gpt nginx

# Rollback to previous version
git checkout HEAD~1
# Rebuild and restart

# Emergency maintenance mode
# Create maintenance.html and redirect all traffic
```

## 📞 Support Contacts

- **Technical Issues:** [Your support email]
- **Emergency:** [Emergency contact]
- **Documentation:** [Documentation URL]

---

**Note:** Always test deployments in a staging environment before production deployment.

