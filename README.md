# wellness-globe

WELLNESS•GLOBE Solutions landing page - AI-Powered Precision Medicine Franchise

## Quick Deploy

```bash
# On server
cd /var/www
git clone https://github.com/SimonAsche/wellness-globe.git
cd wellness-globe
docker compose up -d
```

## Structure

```
├── docker/
│   ├── docker-compose.yml
│   └── Caddyfile
├── site/
│   ├── index.html
│   ├── solutions/
│   │   └── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── calculator.js
└── deploy.sh
```

## Manual Deploy

```bash
./deploy.sh
```
