# Development

## Setup

```bash
git clone https://github.com/eraasoft-train/REOPS-Platform-F.git
cd REOPS-Platform-F
pnpm install
cp .env.example .env.local
# Edit .env.local with your database URL
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Visit `http://localhost:3000`

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/reops_dev
AUTH_SECRET=random-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Scripts

```bash
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run linter
pnpm format           # Format code
pnpm type-check       # TypeScript check
pnpm test             # Run tests
pnpm db:migrate       # Run migrations
pnpm db:migrate:dev   # Create migration
pnpm db:seed          # Seed data
pnpm db:reset         # Reset database (dev only)
pnpm db:studio        # Prisma GUI
```

## Adding a Feature

### 1. Database Schema
Edit `prisma/schema.prisma`:
```prisma
model Feature {
  id String @id @default(cuid())
  title String
  organizationId String
  createdAt DateTime @default(now())
  @@index([organizationId])
}
```

### 2. Create Migration
```bash
pnpm db:migrate:dev --name add_feature
```

### 3. Types (`features/feature/types.ts`)
```typescript
export type Feature = {
  id: string
  title: string
  organizationId: string
  createdAt: Date
}
```

### 4. Repository (`server/repositories/featureRepository.ts`)
```typescript
export class FeatureRepository {
  async findById(id: string, orgId: string) {
    return prisma.feature.findFirst({
      where: { id, organizationId: orgId }
    })
  }
}
```

### 5. Service (`server/services/featureService.ts`)
```typescript
export class FeatureService {
  constructor(private repo: FeatureRepository) {}
  
  async get(id: string, orgId: string) {
    return this.repo.findById(id, orgId)
  }
}
```

### 6. API/Server Action
```typescript
// app/api/features/route.ts
import { validateAuth } from '@/lib/auth'

export async function GET(req: Request) {
  const user = await validateAuth(req)
  // Fetch data
  return Response.json({ data })
}
```

### 7. UI Components (`features/feature/components/`, `features/feature/page.tsx`)

## Code Patterns

### Component
```typescript
// 'use client' for interactive components
export function FeatureCard({ data }: Props) {
  return <div>{data.title}</div>
}
```

### Server Action
```typescript
'use server'
import { validateAuth } from '@/lib/auth'

export async function createFeature(data: FormData) {
  const user = await validateAuth()
  // Validate, check permissions, create
  return { success: true }
}
```

## Code Quality
- Strict TypeScript (no `any`)
- Zod validation on all inputs
- Authorization checks server-side
- Small, focused components
- Reusable business logic

## Debugging
- `pnpm db:studio` - GUI database browser
- Browser DevTools - Network, Console
- Server logs in terminal
- Add `console.log` for debugging

## Testing
- Unit tests: business logic, calculations
- Integration tests: auth, CRUD, API
- E2E tests: critical user flows (Playwright)

## Troubleshooting

Database issues:
```bash
echo $DATABASE_URL     # Verify URL
psql $DATABASE_URL     # Test connection
pnpm db:reset          # Reset (dev only)
```

Build issues:
```bash
rm -rf .next node_modules
pnpm install
pnpm type-check
```

## Deployment (Vercel)
```bash
git push origin main  # Auto-deploys
```

Configure in dashboard:
- Environment variables
- Database connection
- Auto-deploy settings
