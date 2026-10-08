# Deployment Guide

## Environments

### Development
- Local development with hot reload
- SQLite or local PostgreSQL
- Debug logging enabled
- All features enabled

### Staging
- Production-like environment
- Real PostgreSQL
- Email preview mode
- Detailed logging

### Production
- Optimized build
- Real PostgreSQL with backups
- Real email service
- Error tracking enabled
- Rate limiting enabled

## Prerequisites

- Vercel account (recommended) or own server
- PostgreSQL database
- Environment variables configured
- Domain name configured

## Vercel Deployment (Recommended)

### Setup

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select GitHub repository
   - Configure environment variables

3. **Set Environment Variables**
   ```
   DATABASE_URL=postgresql://...
   AUTH_SECRET=your-secret-key
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically

### Automatic Deployments
- Merges to `main` deploy to production
- Create `staging` branch for staging deploys
- Preview deployments for pull requests

### Database Migrations
```bash
# Run migrations before deploy
pnpm db:migrate:prod

# Or configure automatic migrations in Vercel
```

## Self-Hosted Deployment

### Server Requirements
- Node.js 18+
- PostgreSQL 14+
- 2GB RAM minimum
- 10GB storage

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/eraasoft-train/REOPS-Platform-F.git
   cd REOPS-Platform-F
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env.production
   # Edit with production values
   ```

4. **Database Setup**
   ```bash
   pnpm db:migrate:prod
   pnpm db:seed:prod  # Optional: seed sample data
   ```

5. **Build**
   ```bash
   pnpm build
   ```

6. **Start Server**
   ```bash
   pnpm start
   # Or use PM2 for process management
   pm2 start "pnpm start" --name reops
   ```

### Nginx Configuration

```nginx
upstream app {
  server localhost:3000;
}

server {
  listen 80;
  server_name yourdomain.com;
  
  # Redirect to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name yourdomain.com;

  ssl_certificate /path/to/cert;
  ssl_certificate_key /path/to/key;

  # Security headers
  add_header Strict-Transport-Security "max-age=31536000" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;

  location / {
    proxy_pass http://app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --prod

# Copy source
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/reops
      AUTH_SECRET: ${AUTH_SECRET}
      NEXT_PUBLIC_APP_URL: https://yourdomain.com
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: reops
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: reops
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Build and run:
```bash
docker compose up -d
```

## Database Management

### Backups

#### PostgreSQL Backup
```bash
# Full backup
pg_dump -U user -h localhost reops > reops_backup.sql

# Compressed backup
pg_dump -U user -h localhost reops | gzip > reops_backup.sql.gz
```

#### Restore
```bash
psql -U user -h localhost reops < reops_backup.sql

# From compressed
gunzip -c reops_backup.sql.gz | psql -U user -h localhost reops
```

#### Automated Backups
```bash
# Cron job for daily backups
0 2 * * * pg_dump -U user -h localhost reops | gzip > /backups/reops_$(date +\%Y\%m\%d).sql.gz
```

### Migrations in Production

```bash
# Dry run
pnpm db:migrate:deploy --dry-run

# Apply migrations
pnpm db:migrate:deploy

# Create new migration
pnpm db:migrate:dev --name add_new_feature
```

## Monitoring & Logging

### Application Logs
```bash
# Vercel
vercel logs [deployment-url]

# Self-hosted
tail -f /var/log/app.log

# Docker
docker logs container_id
```

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Datadog for monitoring

### Health Check
```bash
# Endpoint should respond with 200
curl https://yourdomain.com/api/health
```

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle
npm run build -- --profile

# Next.js bundle analyzer
npm install @next/bundle-analyzer
```

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // For above-fold images
/>
```

### Database Optimization
```sql
-- Add indexes for common queries
CREATE INDEX idx_employees_org ON employees(organization_id);
CREATE INDEX idx_tasks_status ON tasks(status, assignee_id);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM employees WHERE organization_id = 'org_123';
```

## Scaling Considerations

### Horizontal Scaling
- Ensure application is stateless
- Use database connection pooling
- Load balance across multiple instances

### Database Scaling
- Add indexes as needed
- Archive old data
- Consider read replicas
- Monitor query performance

### Caching Strategy
- Cache frequently accessed data
- Use Redis for distributed caching
- Implement cache invalidation

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secure
- [ ] Database backups configured
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] CORS properly configured
- [ ] SQL injection prevention verified
- [ ] Authentication secure
- [ ] API keys rotated
- [ ] Monitoring enabled
- [ ] Logging enabled
- [ ] Error tracking setup
- [ ] SSL certificate valid
- [ ] Firewall configured
- [ ] Regular security updates

## Rollback Procedure

### Vercel
```bash
# Redeploy previous version
vercel rollback
```

### Self-Hosted
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to previous build
pm2 restart reops
```

## Maintenance

### Regular Tasks
- Monitor disk space
- Update dependencies monthly
- Review logs for errors
- Test backup restoration
- Update SSL certificates before expiry

### Database Maintenance
```sql
-- Vacuum to reclaim space
VACUUM ANALYZE;

-- Check for bloated tables
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Troubleshooting

### Build Failures
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check environment variables
env | grep DATABASE_URL
```

### Database Connection Issues
```bash
# Test connection
psql -U user -h host -d database

# Check connection pool
SELECT count(*) FROM pg_stat_activity;
```

### Performance Issues
- Check slow queries in logs
- Analyze database indexes
- Monitor CPU and memory
- Check for memory leaks
- Review application logs

## Getting Help

- Check deployment logs
- Review environment variables
- Verify database connectivity
- Check application health endpoint
- Review security settings
