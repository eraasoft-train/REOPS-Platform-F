# Troubleshooting Guide

## Common Issues and Solutions

### Development Environment

#### Node.js Version Error
**Problem**: `Error: The Node.js version X.X.X is not compatible`

**Solution**:
```bash
# Check Node version
node --version

# Update Node.js if needed
nvm install 18
nvm use 18

# Or download from https://nodejs.org
```

#### pnpm Not Found
**Problem**: `command not found: pnpm`

**Solution**:
```bash
# Install pnpm globally
npm install -g pnpm

# Or use corepack (Node 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

#### Dependencies Won't Install
**Problem**: `npm ERR! ERR! 404 Not Found`

**Solution**:
```bash
# Clear cache
pnpm store prune

# Reinstall from scratch
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Database Issues

#### Connection String Not Found
**Problem**: `Error: DATABASE_URL not set`

**Solution**:
```bash
# Create .env.local
cp .env.example .env.local

# Edit and set DATABASE_URL
DATABASE_URL=postgresql://user:password@localhost:5432/reops_dev

# Verify
echo $DATABASE_URL
```

#### PostgreSQL Connection Refused
**Problem**: `connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Check if PostgreSQL is running
psql -U postgres -h localhost -c "SELECT 1"

# Start PostgreSQL
# macOS with Homebrew
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Restart PostgreSQL service from Services app
```

#### Database Already Exists
**Problem**: `Error: database "reops_dev" already exists`

**Solution**:
```bash
# Reset database (dev only)
pnpm db:reset

# Or manually drop and recreate
psql -U postgres -c "DROP DATABASE reops_dev;"
pnpm db:setup
```

#### Migration Errors
**Problem**: `Error: migration failed`

**Solution**:
```bash
# Check migration status
pnpm db:migrate:status

# Roll back last migration
pnpm db:migrate:resolve

# Try migration again
pnpm db:migrate:deploy

# For Prisma, reset and re-run
pnpm db:push --force-reset
```

### Build Issues

#### Next.js Build Fails
**Problem**: `Error: Compilation failed`

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try building again
pnpm build

# If still failing, check for TypeScript errors
pnpm type-check
```

#### TypeScript Errors
**Problem**: `TS2307: Cannot find module`

**Solution**:
```bash
# Check import paths are correct
# Verify tsconfig.json baseUrl and paths

# Regenerate TypeScript cache
rm tsconfig.tsbuildinfo
pnpm type-check

# Check for missing types
pnpm add -D @types/node @types/react @types/react-dom
```

#### Out of Memory During Build
**Problem**: `JavaScript heap out of memory`

**Solution**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm build

# Or set environment variable permanently
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Runtime Errors

#### Port Already in Use
**Problem**: `Error: listen EADDRINUSE :::3000`

**Solution**:
```bash
# Kill process using port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 pnpm dev
```

#### Blank Page / 500 Error
**Problem**: Application loads but shows error

**Solution**:
```bash
# Check browser console for errors
# Check terminal for server errors

# Verify environment variables
echo $DATABASE_URL
echo $AUTH_SECRET

# Check database connection
psql $DATABASE_URL -c "SELECT 1"

# Verify migrations ran
pnpm db:migrate:status

# Check Next.js build
pnpm build
```

#### Authentication Not Working
**Problem**: Can't login or session not persisting

**Solution**:
```bash
# Verify AUTH_SECRET is set
echo $AUTH_SECRET

# Clear browser cookies
# Dev tools → Application → Cookies → Delete

# Check database for users
psql $DATABASE_URL -c "SELECT * FROM users LIMIT 5;"

# Restart development server
# Kill process and restart
pnpm dev
```

### API Issues

#### API Endpoint Returns 404
**Problem**: `Error: 404 Not Found`

**Solution**:
```bash
# Verify endpoint exists
# Check app/api/[route]/route.ts exists

# Check HTTP method (GET, POST, etc.)
curl -X GET http://localhost:3000/api/endpoint

# Check Authorization header
curl -H "Authorization: Bearer token" http://localhost:3000/api/endpoint
```

#### CORS Error
**Problem**: `Error: Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
```typescript
// Add CORS headers in route handler
export async function GET(req: Request) {
  return new Response('data', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
```

#### Authorization Failures
**Problem**: `Error: 403 Forbidden`

**Solution**:
```bash
# Check user permissions in database
psql $DATABASE_URL -c "SELECT user_id, role FROM users WHERE id='user_123';"

# Verify organization association
psql $DATABASE_URL -c "SELECT * FROM users WHERE organization_id='org_123';"

# Check permission configuration
# Verify authorization logic in route handler
```

### Performance Issues

#### Slow Page Load
**Problem**: Application takes long to load

**Solution**:
```bash
# Check database query performance
# Enable query logging
export NODE_ENV=development
pnpm dev

# Monitor database queries
psql $DATABASE_URL -c "SELECT * FROM pg_stat_statements LIMIT 10;"

# Add indexes if needed
# See docs/DATABASE.md for index suggestions
```

#### High CPU Usage
**Problem**: Server using excessive CPU

**Solution**:
```bash
# Check for infinite loops or heavy processing
# Review server logs

# Check for unoptimized database queries
EXPLAIN ANALYZE SELECT * FROM tasks WHERE organization_id='org_123';

# Consider adding caching
# Check for memory leaks
```

#### Memory Leak
**Problem**: Memory usage keeps increasing

**Solution**:
```bash
# Check for retained references
# Profile with Node.js inspector
node --inspect node_modules/.bin/next dev

# Check for event listeners not being cleaned up
// Ensure useEffect cleanup
useEffect(() => {
  const listener = () => {}
  window.addEventListener('resize', listener)
  
  return () => {
    window.removeEventListener('resize', listener)
  }
}, [])
```

### Deployment Issues

#### Deploy Fails on Vercel
**Problem**: Deployment fails with build error

**Solution**:
```bash
# Check build logs in Vercel dashboard
# Verify environment variables are set in Vercel

# Test build locally
pnpm build

# Check for missing dependencies
pnpm install --production

# Verify database connection works
# Connect to production database locally to test
DATABASE_URL=production_url pnpm db:migrate:status
```

#### Database Connection Fails in Production
**Problem**: `Error: connect ECONNREFUSED`

**Solution**:
```bash
# Verify DATABASE_URL is correct
vercel env pull

# Check IP whitelisting on database
# Verify security groups allow connection

# Test connection from deployment environment
# Use a test function to ping database
```

### Debugging

#### Enable Debug Logging
```typescript
// In environment variables
DEBUG=*

// Or specific modules
DEBUG=app,server pnpm dev
```

#### Use VS Code Debugger
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js Debug",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/next",
      "runtimeArgs": ["dev"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

#### Browser DevTools
```javascript
// In browser console
localStorage.debug = '*'
location.reload()

// Check Application tab for cookies, storage
// Check Network tab for API requests
// Check Console for errors
```

#### Check Logs

```bash
# Development logs
# Check terminal where pnpm dev is running

# Production logs
# Vercel
vercel logs [url]

# Self-hosted
tail -f /var/log/app.log
docker logs container_id

# Database logs
tail -f /var/log/postgresql/postgresql.log
```

### Getting Help

1. **Check Documentation**
   - Review relevant docs in `/docs` folder
   - Check CONTRIBUTING.md for code standards

2. **Search Issues**
   - Look for similar issues on GitHub
   - Check existing discussions

3. **Review Code**
   - Check similar features for patterns
   - Look at tests for expected behavior

4. **Ask Community**
   - Create GitHub issue with:
     - Problem description
     - Steps to reproduce
     - Expected vs actual behavior
     - Environment info (OS, Node version, etc.)
     - Error messages and stack traces

5. **Debug Methodically**
   - Isolate the problem
   - Check one thing at a time
   - Verify assumptions
   - Document what you try

## Common Error Messages

### "Permission denied"
- Check user roles and permissions
- Verify organization association
- Check database permissions

### "User not found"
- Verify user exists in database
- Check organization association
- Verify authentication token

### "Invalid input"
- Check Zod schema validation
- Verify data types
- Check required fields

### "Duplicate entry"
- Check unique constraints in database
- Verify unique fields (email, slug, etc.)
- Check for race conditions

### "Timeout"
- Check database query performance
- Verify network connectivity
- Increase timeout values if needed
- Check for long-running operations

## Tips for Efficient Debugging

1. **Use meaningful variable names** - Easier to track in logs
2. **Add strategic console logs** - Before removing in production
3. **Check error stack traces** - Line numbers and file paths help
4. **Test in isolation** - Create minimal reproduction case
5. **Use version control** - Revert to last known working state
6. **Keep logs organized** - Use prefixes for different modules
7. **Document workarounds** - For temporary fixes, note why and how to fix properly
