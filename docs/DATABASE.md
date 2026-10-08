# Database Schema

PostgreSQL + Prisma ORM. All tables scoped to organization for multi-tenancy.

## Core Tables

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **Organizations** | id, name, slug, logo | Tenant container |
| **Users** | id, email, password, organizationId, role | Authentication |
| **Roles** | id, name | Role definitions |
| **Permissions** | id, name | Granular permissions |
| **Branches** | id, name, location, organizationId | Multi-branch support |
| **Departments** | id, name, branchId, organizationId | Team organization |
| **Employees** | id, name, email, branchId, departmentId, organizationId | Staff records |

## Training Tables

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **Courses** | id, title, organizationId, status | Course definitions |
| **Lessons** | id, courseId, title, videoUrl | Lesson content |
| **Enrollments** | id, employeeId, courseId, progress | Training progress |
| **Quizzes** | id, courseId, passingScore | Assessments |

## Operations Tables

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **Tasks** | id, title, assigneeId, status, dueDate | Task management |
| **Checklists** | id, title, status, organizationId | Checklist templates |
| **ChecklistItems** | id, checklistId, title, required | Items in checklist |
| **SOPs** | id, title, content, version, organizationId | Procedures |
| **Requests** | id, title, assigneeId, status, organizationId | Tickets/requests |

## Performance Tables

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **KPIs** | id, name, target, frequency, organizationId | KPI definitions |
| **KPIMeasurements** | id, kpiId, value, date | KPI tracking |
| **Goals** | id, title, targetValue, ownerId | Employee goals |
| **Rewards** | id, title, points | Incentive system |

## Audit Tables

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| **ActivityLogs** | id, action, entityType, userId, timestamp | Activity tracking |
| **AuditLogs** | id, action, userId, timestamp, ipAddress | Security audit |

## Key Relationships

```
Organization
├── Branches
│   ├── Departments
│   └── Employees
├── Users
├── Roles & Permissions
├── Courses & Enrollments
├── Tasks
├── KPIs & Measurements
└── Requests
```

## Indexes

Essential performance indexes:
- `users(email, organizationId)`
- `employees(organizationId, branchId)`
- `tasks(organizationId, status, dueDate)`
- `enrollments(employeeId, courseId)`
- `kpiMeasurements(kpiId, date)`
- `activityLogs(organizationId, timestamp)`

## Commands

```bash
pnpm db:migrate       # Run migrations
pnpm db:migrate:dev   # Create new migration
pnpm db:push          # Push schema to database
pnpm db:seed          # Seed sample data
pnpm db:reset         # Reset database (dev only)
pnpm db:studio        # Open GUI browser
```
