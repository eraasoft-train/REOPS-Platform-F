# Contributing Guide

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Proper type annotations
- Avoid `any` unless absolutely necessary
- Use discriminated unions for variants
- Export types alongside implementations

### File Organization
- Max 300 lines per file
- Single responsibility principle
- Related code grouped together
- Clear imports/exports

### Naming Conventions
- Components: `PascalCase` (e.g., `EmployeeCard.tsx`)
- Functions/variables: `camelCase` (e.g., `fetchEmployees()`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- Types/Interfaces: `PascalCase` (e.g., `Employee`, `IRepository`)

### Comments & Documentation
- Self-documenting code preferred
- Comment complex logic with reasoning
- JSDoc for public functions
- README in each feature directory

### Error Handling
- All promises have error handling
- Meaningful error messages
- User-facing errors don't leak internals
- Server actions return typed responses

## Git Workflow

### Branch Naming
- Feature: `feature/description`
- Bug fix: `fix/description`
- Chore: `chore/description`
- Docs: `docs/description`

### Commit Messages
- Present tense: "Add feature" not "Added feature"
- Descriptive: explain what and why
- Link to issues when relevant: "Fixes #123"
- Keep under 72 characters

### Pull Request Process
1. Create feature branch from `main`
2. Make focused changes
3. Write clear PR description
4. Include related issue numbers
5. Request review from team
6. Address feedback
7. Squash and merge to main

## Code Review Checklist

### Reviewer Should Verify
- [ ] Code follows TypeScript best practices
- [ ] Authorization checks in place (server-side)
- [ ] Database queries optimized
- [ ] Error handling present
- [ ] No hardcoded values or secrets
- [ ] Component tests or manual testing done
- [ ] Responsive design tested
- [ ] No console.log statements left

### Author Should Provide
- [ ] Summary of changes
- [ ] Testing steps
- [ ] Screenshots for UI changes
- [ ] Link to related issue
- [ ] Any breaking changes noted

## Testing Requirements

### Unit Tests
- Business logic functions
- Validation functions
- Utility functions
- Authorization helpers

### Integration Tests
- API endpoints with database
- Authentication flow
- Permission checks
- Multi-tenancy isolation

### Manual Testing
- Test on multiple screen sizes
- Test with different user roles
- Test error scenarios
- Test with sample data

## Performance Guidelines

### Frontend
- Images optimized with `next/image`
- Code splitting for large components
- Memoization for expensive renders
- Lazy load modals and drawers

### Backend
- Database queries indexed
- N+1 queries avoided
- Pagination for large datasets
- Efficient sorting and filtering

### Database
- Foreign keys for relationships
- Indexes on frequently queried columns
- Regular maintenance and analysis
- Connection pooling configured

## Documentation Requirements

### For New Features
1. Update feature README in `features/[feature]/README.md`
2. Add types to `types.ts`
3. Document API endpoints in comments
4. Update main README if user-facing
5. Add to CHANGELOG

### Code Documentation
```typescript
/**
 * Creates a new employee in the organization
 * @param data - Employee data
 * @param orgId - Organization ID for multi-tenancy
 * @returns Created employee or error
 * @throws AuthorizationError if user lacks permission
 */
export async function createEmployee(
  data: CreateEmployeeInput,
  orgId: string
): Promise<Result<Employee>>
```

### README Template for Features
```markdown
# [Feature Name]

## Overview
Brief description of what this feature does.

## Files
- `components/` - React components
- `types.ts` - TypeScript types
- `actions.ts` - Server actions
- `README.md` - This file

## Usage
How to use this feature as a developer.

## API
Document endpoints or server actions.

## Database
Tables and relationships used.
```

## Security Checklist

Before committing:
- [ ] No secrets in code
- [ ] Environment variables used correctly
- [ ] Authorization checks server-side
- [ ] Input validation with Zod
- [ ] No SQL injection risk (using Prisma/ORM)
- [ ] CORS configured if needed
- [ ] Rate limiting considered

## Accessibility Requirements

- Semantic HTML used
- ARIA labels where needed
- Keyboard navigation tested
- Color not sole indicator
- Focus states visible
- Images have alt text
- Forms properly labeled

## Common Tasks

### Adding a Feature
1. Create directory in `features/`
2. Create `types.ts` with types
3. Create `components/` directory
4. Create `actions.ts` for server logic
5. Create `README.md` documentation
6. Add to main navigation if needed
7. Update docs/DEVELOPMENT.md

### Fixing a Bug
1. Create issue describing bug
2. Create fix branch
3. Add test that reproduces bug
4. Fix the bug
5. Verify test passes
6. Update documentation if needed

### Refactoring Code
1. Ensure tests pass first
2. Make focused changes
3. Run tests after refactoring
4. No behavior changes
5. PR description explains why

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release PR
4. Tag release in git
5. Deploy to production

## Getting Help

- Check existing issues/discussions
- Review similar feature implementation
- Ask in team channels
- Consult documentation
- Check code examples
