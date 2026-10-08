# AI Agent Guidelines

## Project Overview
ReOps Platform F is a production-ready operations management SaaS application built with Next.js, React, TypeScript, and PostgreSQL.

## Key Principles
- **Architecture First**: Follow domain-driven design with clear separation of concerns
- **Type Safety**: Strict TypeScript - no unnecessary `any` types
- **Server-First**: Use Server Components by default, Client Components only when needed
- **Security**: All authorization checks on server-side, never trust the client
- **Multi-Tenancy**: Every data operation scoped to organization

## Documentation
- [README.md](./README.md) - Project overview and features
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System design and patterns
- [docs/DATABASE.md](./docs/DATABASE.md) - Database schema and relationships
- [docs/SECURITY.md](./docs/SECURITY.md) - Authentication and authorization
- [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) - Development setup and workflows

## Before Implementing
1. Read the relevant documentation section
2. Check existing code patterns in the feature area
3. Verify database schema in `prisma/schema.prisma`
4. Ensure all authorization checks are server-side
5. Test with multiple organizations to verify isolation

## Tooling
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod for input validation
- **UI**: Tailwind CSS + shadcn/ui components
- **Package Manager**: pnpm
