# Security

## Authentication
- HTTP-only secure cookies for sessions (no localStorage tokens)
- Server-side session validation
- Password: minimum 8 chars, bcrypt hashed
- Email verification required (24-hour token expiry)
- CSRF protection enabled

## Authorization (RBAC)

Roles:
- `SUPER_ADMIN` - System administration
- `ORG_OWNER` - Organization owner
- `ORG_ADMIN` - Organization admin
- `MANAGER` - Manager role
- `EMPLOYEE` - Standard user

Granular permissions:
- `employees.{read,create,update,delete}`
- `branches.{read,manage}`
- `training.{read,manage,publish}`
- `courses.{create,publish}`
- `sops.{read,manage}`
- `tasks.{read,manage}`
- `requests.{read,manage}`
- `kpis.{read,manage}`
- `reports.{read,export}`
- `users.manage`
- `settings.manage`

**Rule**: Server-side checks on every API endpoint. Frontend never trusted.

## Data Security
- **Tenant Isolation**: Every query scoped to organization
- **Input Validation**: Zod validation + Prisma ORM prevents SQL injection
- **Output Encoding**: User content sanitized, HTML entities encoded
- **No inline scripts** in user content

## API Security
- SameSite cookies for CSRF protection
- Rate limiting on auth endpoints
- Content-Type validation
- Request size limits

## Secrets Management
- Environment variables only (never committed)
- Use `.env.example` template
- Never log sensitive values
- Never expose to client: DB credentials, API keys, JWT secrets, encryption keys

## Production Checklist
- [ ] All secrets in environment variables
- [ ] HTTPS enforced with HSTS header
- [ ] Security headers set (CSP, X-Content-Type-Options, X-Frame-Options)
- [ ] Input validation on all endpoints
- [ ] Authorization checks on protected routes
- [ ] Prisma ORM prevents SQL injection
- [ ] No hardcoded credentials
- [ ] Error messages don't leak info
- [ ] Audit logging enabled
- [ ] Rate limiting configured
- [ ] Dependencies scanned (npm audit)
- [ ] CORS properly configured
