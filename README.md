# ReOps Platform F - Operations Management SaaS

A complete, production-ready operations management SaaS platform inspired by [ReOps.io](https://reops.io/).

## Quick Links

📖 **Documentation**
- [Getting Started](./docs/DEVELOPMENT.md) - Setup and development guide
- [Architecture](./docs/ARCHITECTURE.md) - System design and patterns
- [API Documentation](./docs/API.md) - All endpoints and usage
- [Components](./docs/COMPONENTS.md) - UI component library
- [Database](./docs/DATABASE.md) - Schema and relationships
- [Security](./docs/SECURITY.md) - Authentication and authorization
- [Testing](./docs/TESTING.md) - Testing strategies and examples
- [Deployment](./docs/DEPLOYMENT.md) - Production deployment
- [Contributing](./docs/CONTRIBUTING.md) - Code standards and workflow
- [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues and solutions
- [Changelog](./CHANGELOG.md) - Version history and releases

## Overview

ReOps Platform F is a modern Operations Operating System designed for companies with employees, branches, franchises, training programs, SOPs, checklists, tasks, requests, KPIs, and performance management.

## Core Features

### Organization Management
- Multi-branch operations
- Department and team management
- Employee management with roles and permissions
- Organization settings and configurations

### Operations Management
- SOPs (Standard Operating Procedures)
- Task management with recurring support
- Checklists and checklist templates
- Request/ticket system
- Resource and document library

### Training Platform
- Course creation and management
- Lesson delivery (video, text, PDF, attachments)
- Quizzes and assessments
- Training plans and learning paths
- Progress tracking and certificates

### Performance & Analytics
- KPI management and tracking
- Employee and branch performance dashboards
- Performance trends and reports
- Rewards and recognition system
- Custom analytics and exports

### Multi-Tenant Architecture
- Complete organization data isolation
- Role-based access control (RBAC)
- Granular permission system
- Audit logs and activity tracking

## Technology Stack

### Frontend
- Next.js (latest stable)
- React (latest stable)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for analytics

### Backend
- Next.js Route Handlers & Server Actions
- Service layer architecture
- Repository pattern
- Validation with Zod

### Database
- PostgreSQL
- Drizzle ORM
- Proper relational schema with foreign keys

## Architecture

```
src/
├── app/              # Next.js app router
├── components/       # Reusable UI components
├── features/         # Domain-organized features
├── lib/              # Shared utilities and services
├── server/           # Backend services and repositories
├── types/            # TypeScript type definitions
└── config/           # Configuration files
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- pnpm (or npm/yarn)

### Development Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and secrets

# Set up database
pnpm db:migrate
pnpm db:seed

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Demo Credentials
Once seeded, use:
- Email: demo@acme.com
- Password: demo123

## Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm test         # Run tests
pnpm lint         # Run linter
pnpm type-check   # Check TypeScript
pnpm db:migrate   # Run database migrations
pnpm db:seed      # Seed development data
pnpm db:studio    # Open Prisma Studio
```

### Project Structure

- **`app/`** - Next.js routes and pages
- **`components/`** - React components (UI, layout, workspace)
- **`features/`** - Feature modules (employees, training, tasks, etc.)
- **`lib/`** - Utilities, services, database client
- **`server/`** - Backend services and repositories
- **`docs/`** - Complete documentation

For detailed development guidelines, see [DEVELOPMENT.md](./docs/DEVELOPMENT.md)

## Features

✅ **Architecture**
- Multi-tenant SaaS architecture
- Domain-driven design
- Clean layered architecture
- Type-safe codebase

✅ **Security**
- Complete authentication
- Role-based authorization (RBAC)
- Server-side permission checks
- Secure session management
- Audit logging

✅ **User Experience**
- Responsive design (mobile, tablet, desktop)
- Arabic/English support with RTL
- Accessibility compliance (WCAG 2.2 AA target)
- Loading and error states
- Empty state messaging

✅ **Developer Experience**
- TypeScript with strict mode
- Clear code organization
- Comprehensive documentation
- Testing infrastructure
- Development utilities

✅ **Production Ready**
- Performance optimized
- Security hardened
- Deployment ready
- Error handling
- Monitoring ready

## Documentation

Each topic has comprehensive documentation:

| Topic | File | Purpose |
|-------|------|---------|
| Getting Started | [DEVELOPMENT.md](./docs/DEVELOPMENT.md) | Setup, scripts, adding features |
| Architecture | [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System design, patterns, data flow |
| API | [API.md](./docs/API.md) | All endpoints, request/response examples |
| Components | [COMPONENTS.md](./docs/COMPONENTS.md) | Component library, usage examples |
| Database | [DATABASE.md](./docs/DATABASE.md) | Schema, tables, relationships, indexes |
| Security | [SECURITY.md](./docs/SECURITY.md) | Authentication, authorization, best practices |
| Testing | [TESTING.md](./docs/TESTING.md) | Unit, integration, E2E tests with examples |
| Deployment | [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Vercel, self-hosted, Docker, monitoring |
| Contributing | [CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Code standards, git workflow, code review |
| Troubleshooting | [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) | Common issues and solutions |

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/reops_dev

# Authentication & Security
AUTH_SECRET=generate-a-random-secret-key-here

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

See [.env.example](./.env.example) for all available options.

## API Documentation

All API endpoints are documented in [docs/API.md](./docs/API.md):

- Employee management
- Branch management
- Task management
- Training & courses
- Request/ticket system
- KPI tracking
- Reports and analytics

## Testing

- **Unit tests** for business logic and utilities
- **Integration tests** for API endpoints and database
- **E2E tests** for critical user flows

See [docs/TESTING.md](./docs/TESTING.md) for setup and examples.

```bash
pnpm test                    # Run all tests
pnpm test --coverage         # Generate coverage report
pnpm playwright test         # Run E2E tests
pnpm playwright test --headed # Visual E2E test run
```

## Deployment

### Quick Deploy to Vercel

```bash
git push origin main
# Automatically deploys via webhook
```

### Self-Hosted

Complete deployment guides available for:
- Docker & Docker Compose
- Linux/Unix servers
- Ubuntu with Nginx
- PM2 process manager

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## Code Quality

- **TypeScript** - Strict type checking
- **ESLint** - Code quality rules
- **Prettier** - Code formatting
- **Tests** - Unit, integration, E2E coverage
- **Security** - Regular audits and updates

```bash
pnpm lint         # Check code quality
pnpm format       # Format code
pnpm type-check   # Check TypeScript
pnpm test         # Run tests
```

## Performance

- Server Components by default
- Optimized database queries
- Image optimization
- Code splitting
- Proper caching strategies

For optimization tips, see [DEVELOPMENT.md](./docs/DEVELOPMENT.md) and [DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## Security

Security is built-in:

- ✅ HTTP-only secure cookies
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ SQL injection prevention (via Drizzle ORM)
- ✅ Input validation with Zod
- ✅ Authorization checks on every endpoint
- ✅ Audit logging

See [docs/SECURITY.md](./docs/SECURITY.md) for details.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for:

- Code quality standards
- Git workflow and branching
- Pull request process
- Testing requirements
- Commit message conventions

## Roadmap

### Phase 1 (Current)
- ✅ Core architecture and foundation
- ✅ Multi-tenancy
- ✅ Basic CRUD operations
- ✅ Documentation

### Phase 2
- [ ] Advanced training platform
- [ ] Performance analytics
- [ ] Workflow automation
- [ ] Advanced reporting

### Phase 3
- [ ] Mobile apps
- [ ] AI-powered insights
- [ ] Advanced integrations
- [ ] Marketplace

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Support

- 📖 [Documentation](./docs) - Complete guides
- 🐛 [Issues](https://github.com/eraasoft-train/REOPS-Platform-F/issues) - Report bugs
- 💬 [Discussions](https://github.com/eraasoft-train/REOPS-Platform-F/discussions) - Ask questions
- 📧 [Email](mailto:support@reops-platform.com) - Contact support

## License

Proprietary - All rights reserved

## Authors

Developed by ReOps Platform Team

## Acknowledgments

- Inspired by [ReOps.io](https://reops.io/)
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
