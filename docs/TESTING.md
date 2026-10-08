# Testing Guide

## Testing Strategy

### Test Types

#### Unit Tests (40%)
- Business logic
- Utility functions
- Validation logic
- Service methods

#### Integration Tests (35%)
- API endpoints
- Database operations
- Authentication flow
- Permission checks

#### E2E Tests (25%)
- Critical user flows
- Feature workflows
- Multi-step processes

## Setup

### Test Framework

Using Node's built-in test runner with utilities:

```bash
# Install test dependencies
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

### Configuration

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
```

## Unit Tests

### Testing Services

```typescript
// lib/services/employeeService.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { EmployeeService } from '@/server/services/employeeService'
import { EmployeeRepository } from '@/server/repositories/employeeRepository'

describe('EmployeeService', () => {
  let service: EmployeeService
  let repository: EmployeeRepository

  beforeEach(() => {
    repository = new EmployeeRepository()
    service = new EmployeeService(repository)
  })

  it('should create employee with valid data', async () => {
    const data = {
      firstName: 'Ahmed',
      email: 'ahmed@company.com'
    }

    const result = await service.create(data, 'org_123')

    expect(result.success).toBe(true)
    expect(result.data?.email).toBe('ahmed@company.com')
  })

  it('should fail with invalid email', async () => {
    const data = {
      firstName: 'Ahmed',
      email: 'invalid-email'
    }

    const result = await service.create(data, 'org_123')

    expect(result.success).toBe(false)
    expect(result.error).toContain('Invalid email')
  })
})
```

### Testing Utilities

```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate, calculateAge, sortByName } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-02-15')
      expect(formatDate(date)).toBe('Feb 15, 2024')
    })
  })

  describe('calculateAge', () => {
    it('should calculate age from birth date', () => {
      const birthDate = new Date('1990-02-15')
      const age = calculateAge(birthDate)
      expect(age).toBeGreaterThan(30)
    })
  })

  describe('sortByName', () => {
    it('should sort array by name', () => {
      const items = [
        { name: 'Zara' },
        { name: 'Ahmed' },
        { name: 'Sara' }
      ]
      const sorted = sortByName(items)
      expect(sorted[0].name).toBe('Ahmed')
    })
  })
})
```

### Testing Validation

```typescript
// lib/validation/schemas.test.ts
import { describe, it, expect } from 'vitest'
import { CreateEmployeeSchema } from '@/lib/validation/schemas'

describe('Validation Schemas', () => {
  describe('CreateEmployeeSchema', () => {
    it('should validate correct data', () => {
      const data = {
        firstName: 'Ahmed',
        email: 'ahmed@company.com',
        position: 'Manager'
      }

      const result = CreateEmployeeSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should reject missing required fields', () => {
      const data = {
        firstName: 'Ahmed'
      }

      const result = CreateEmployeeSchema.safeParse(data)
      expect(result.success).toBe(false)
      expect(result.error?.issues).toHaveLength(2)
    })

    it('should reject invalid email', () => {
      const data = {
        firstName: 'Ahmed',
        email: 'not-an-email',
        position: 'Manager'
      }

      const result = CreateEmployeeSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})
```

## Integration Tests

### Testing API Routes

```typescript
// app/api/employees/route.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { POST } from '@/app/api/employees/route'
import { createMockRequest } from '@/lib/test-utils'

describe('POST /api/employees', () => {
  beforeEach(() => {
    // Setup test database
  })

  it('should create employee with valid data', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: {
        firstName: 'Ahmed',
        email: 'ahmed@company.com',
        position: 'Manager',
        branchId: 'branch_123'
      },
      user: { id: 'user_123', organizationId: 'org_123' }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data.email).toBe('ahmed@company.com')
  })

  it('should fail without authentication', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: { firstName: 'Ahmed', email: 'ahmed@company.com' }
    })

    const response = await POST(request)

    expect(response.status).toBe(401)
  })

  it('should validate required fields', async () => {
    const request = createMockRequest({
      method: 'POST',
      body: { firstName: 'Ahmed' },
      user: { id: 'user_123', organizationId: 'org_123' }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(422)
    expect(data.success).toBe(false)
  })
})
```

### Testing Database Operations

```typescript
// server/repositories/employeeRepository.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { EmployeeRepository } from '@/server/repositories/employeeRepository'
import { resetDatabase, seedDatabase } from '@/lib/test-utils'

describe('EmployeeRepository', () => {
  let repo: EmployeeRepository

  beforeEach(async () => {
    await resetDatabase()
    repo = new EmployeeRepository()
  })

  afterEach(async () => {
    await resetDatabase()
  })

  it('should find employee by ID and org', async () => {
    const employee = await repo.create({
      firstName: 'Ahmed',
      email: 'ahmed@company.com',
      organizationId: 'org_123'
    })

    const found = await repo.findById(employee.id, 'org_123')

    expect(found).toBeDefined()
    expect(found?.email).toBe('ahmed@company.com')
  })

  it('should not find employee from different org', async () => {
    await repo.create({
      firstName: 'Ahmed',
      email: 'ahmed@company.com',
      organizationId: 'org_123'
    })

    const found = await repo.findById('emp_123', 'org_456')

    expect(found).toBeUndefined()
  })

  it('should list employees with pagination', async () => {
    // Create test data
    for (let i = 0; i < 25; i++) {
      await repo.create({
        firstName: `Employee${i}`,
        email: `emp${i}@company.com`,
        organizationId: 'org_123'
      })
    }

    const result = await repo.list('org_123', { limit: 20, offset: 0 })

    expect(result.employees).toHaveLength(20)
    expect(result.total).toBe(25)
  })

  it('should update employee', async () => {
    const employee = await repo.create({
      firstName: 'Ahmed',
      email: 'ahmed@company.com',
      organizationId: 'org_123'
    })

    const updated = await repo.update(employee.id, 'org_123', {
      firstName: 'Mohammad'
    })

    expect(updated?.firstName).toBe('Mohammad')
  })

  it('should delete employee', async () => {
    const employee = await repo.create({
      firstName: 'Ahmed',
      email: 'ahmed@company.com',
      organizationId: 'org_123'
    })

    await repo.delete(employee.id, 'org_123')

    const found = await repo.findById(employee.id, 'org_123')

    expect(found).toBeUndefined()
  })
})
```

## Component Tests

### Testing React Components

```typescript
// components/employee-form.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmployeeForm } from '@/components/employee-form'

describe('EmployeeForm', () => {
  it('should render form fields', () => {
    render(<EmployeeForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    render(<EmployeeForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/first name/i), 'Ahmed')
    await user.type(screen.getByLabelText(/email/i), 'ahmed@company.com')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'Ahmed',
      email: 'ahmed@company.com'
    })
  })

  it('should show validation errors', async () => {
    const user = userEvent.setup()
    render(<EmployeeForm onSubmit={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
  })
})
```

## E2E Tests

### Using Playwright

```typescript
// e2e/employees.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Employee Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('input[name="email"]', 'admin@company.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('should create new employee', async ({ page }) => {
    await page.goto('/employees')
    await page.click('button:has-text("Add Employee")')

    await page.fill('input[name="firstName"]', 'Ahmed')
    await page.fill('input[name="email"]', 'ahmed@company.com')
    await page.selectOption('select[name="position"]', 'Manager')
    await page.click('button:has-text("Create")')

    await page.waitForURL('/employees/emp_*')
    expect(await page.textContent('h1')).toContain('Ahmed')
  })

  test('should edit employee', async ({ page }) => {
    await page.goto('/employees')
    await page.click('text=Ahmed Hassan')

    await page.click('button:has-text("Edit")')
    await page.fill('input[name="position"]', 'Senior Manager')
    await page.click('button:has-text("Save")')

    expect(await page.textContent('.toast')).toContain('Updated')
  })

  test('should delete employee', async ({ page }) => {
    await page.goto('/employees')
    await page.click('text=Ahmed Hassan')

    await page.click('button:has-text("Delete")')
    await page.click('button:has-text("Confirm")')

    await page.waitForURL('/employees')
    expect(await page.textContent('body')).not.toContain('Ahmed Hassan')
  })
})
```

## Test Utilities

### Mock Data

```typescript
// lib/test-utils.ts
export function createMockEmployee(overrides = {}) {
  return {
    id: 'emp_123',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed@company.com',
    position: 'Manager',
    status: 'active',
    organizationId: 'org_123',
    branchId: 'branch_123',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}

export function createMockRequest(options = {}) {
  return {
    method: 'GET',
    headers: new Headers(),
    json: async () => ({}),
    ...options
  }
}
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test employees.test.ts

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage

# Run E2E tests
pnpm playwright test

# Run E2E tests in headed mode
pnpm playwright test --headed

# Run specific E2E test
pnpm playwright test employees.spec.ts
```

## Test Coverage Goals

- Unit tests: 80%+
- Integration tests: 70%+
- Critical flows: 100% E2E coverage

Generate coverage report:
```bash
pnpm test --coverage
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm test
      - run: pnpm playwright test
```

## Best Practices

1. **Test Behavior, Not Implementation** - Test what the code does, not how it does it
2. **Keep Tests Focused** - One assertion per test where possible
3. **Use Descriptive Names** - Test name should describe what is being tested
4. **DRY Up Test Code** - Extract common setup to beforeEach
5. **Mock External Dependencies** - Don't call real APIs
6. **Test Edge Cases** - Empty data, null values, errors
7. **Maintain Test Data** - Keep test data realistic and minimal
8. **Run Tests Frequently** - Before committing, during development
