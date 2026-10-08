# Architecture

## Directory Structure
```
src/
├── app/              # Next.js App Router (routes, layouts)
├── components/       # Reusable UI components (ui/, layout/, workspace/)
├── features/         # Domain features (employees/, training/, tasks/, etc.)
├── lib/              # Utilities (api/, auth/, db/, permissions/, utils.ts)
├── server/           # Backend (services/, repositories/, actions/)
├── types/            # TypeScript types
└── config/           # Configuration
```

## Layered Architecture
```
UI (Components, Pages)
    ↓
Server Actions / API Routes
    ↓
Service Layer (Business logic)
    ↓
Repository Layer (Data access)
    ↓
Database (Prisma ORM)
```

## Key Patterns

### Domain-Driven Organization
- Features grouped by domain (employees, training, tasks)
- Improves discoverability and maintainability

### Service Layer
- Business logic separated from API/components
- Reusable across entry points

### Repository Pattern
- Database access abstracted through repositories
- Easy to swap database providers

### Type Safety
- Strict TypeScript everywhere
- Zod validation on API responses

### Server-First
- Server Components by default
- Client Components only when necessary
- Server Actions for mutations

## Multi-Tenancy
- Every record belongs to an organization
- Tenant isolation enforced at DB and API level
- Never rely on frontend filtering for security

## Authentication & Authorization
- HTTP-only secure cookies for sessions
- RBAC with granular permissions
- Server-side permission checks mandatory
- CSRF protection enabled

## Performance
- Server Components for data fetching
- Pagination for large datasets
- Lazy loading for modals/drawers
- Next.js caching strategy
- Image optimization with next/image

## Scalability
- Database abstraction for provider changes
- Service layer supports future microservices
- File storage abstracted (swap providers)
- API design allows backend separation
