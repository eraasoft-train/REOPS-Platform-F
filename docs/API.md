# API Documentation

## API Architecture

All API endpoints follow a consistent pattern:
- Server Actions for mutations (preferred)
- Route Handlers for complex logic or file uploads
- All endpoints require authentication
- Multi-tenancy validation on every request

## Authentication

### Headers
```
Authorization: Bearer [token]
Content-Type: application/json
```

### Session
- HTTP-only secure cookies
- No manual token management needed
- Automatic session validation

### Response Format
```json
{
  "success": true,
  "data": {...}
}
```

Or for errors:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Core Endpoints

### Organization

#### GET /api/organizations
Get current organization details.

**Response:**
```json
{
  "id": "org_123",
  "name": "Acme Operations",
  "slug": "acme-ops",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### POST /api/organizations
Create new organization (onboarding).

**Request:**
```json
{
  "name": "Company Name",
  "industry": "retail"
}
```

### Employees

#### GET /api/employees
List employees with filtering and pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `branch`: Filter by branch ID
- `status`: active | inactive | on_leave
- `search`: Search by name or email

**Response:**
```json
{
  "data": [
    {
      "id": "emp_123",
      "firstName": "Ahmed",
      "lastName": "Hassan",
      "email": "ahmed@company.com",
      "position": "Manager",
      "branch": "Cairo",
      "status": "active"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

#### POST /api/employees
Create new employee.

**Request:**
```json
{
  "firstName": "Ahmed",
  "lastName": "Hassan",
  "email": "ahmed@company.com",
  "position": "Sales Manager",
  "branchId": "branch_123",
  "departmentId": "dept_456"
}
```

#### GET /api/employees/[id]
Get employee details.

**Response:**
```json
{
  "id": "emp_123",
  "firstName": "Ahmed",
  "email": "ahmed@company.com",
  "position": "Manager",
  "branch": {...},
  "tasks": [...],
  "training": [...],
  "performance": {...}
}
```

#### PUT /api/employees/[id]
Update employee.

**Request:**
```json
{
  "position": "Senior Manager",
  "status": "active"
}
```

#### DELETE /api/employees/[id]
Delete employee (soft delete - status changed to inactive).

### Branches

#### GET /api/branches
List all branches.

**Response:**
```json
{
  "data": [
    {
      "id": "branch_123",
      "name": "Cairo Main",
      "location": "Cairo",
      "manager": "Ahmed Hassan",
      "employeeCount": 24,
      "status": "active"
    }
  ]
}
```

#### POST /api/branches
Create new branch.

**Request:**
```json
{
  "name": "Alexandria Branch",
  "location": "Alexandria",
  "managerId": "user_123"
}
```

### Tasks

#### GET /api/tasks
List tasks with filtering.

**Query Parameters:**
- `status`: todo | in_progress | completed
- `assignee`: Filter by assignee ID
- `priority`: low | medium | high | urgent
- `due`: Filter by due date range

**Response:**
```json
{
  "data": [
    {
      "id": "task_123",
      "title": "Inventory Check",
      "status": "in_progress",
      "priority": "high",
      "assignee": "Ahmed Hassan",
      "dueDate": "2024-02-15",
      "progress": 65
    }
  ]
}
```

#### POST /api/tasks
Create new task.

**Request:**
```json
{
  "title": "Inventory Check",
  "description": "Full stock count",
  "assigneeId": "emp_123",
  "priority": "high",
  "dueDate": "2024-02-15",
  "branchId": "branch_456"
}
```

#### PATCH /api/tasks/[id]
Update task status or details.

**Request:**
```json
{
  "status": "completed",
  "completedAt": "2024-02-10T10:30:00Z"
}
```

### Training

#### GET /api/courses
List all courses.

**Response:**
```json
{
  "data": [
    {
      "id": "course_123",
      "title": "Safety Training",
      "instructor": "Sara Ahmed",
      "lessons": 5,
      "status": "published"
    }
  ]
}
```

#### POST /api/courses
Create new course.

**Request:**
```json
{
  "title": "Customer Service",
  "description": "Training on customer interactions",
  "instructor": "Sara Ahmed",
  "difficulty": "beginner"
}
```

#### POST /api/enrollments
Enroll employee in course.

**Request:**
```json
{
  "courseId": "course_123",
  "employeeId": "emp_456"
}
```

#### GET /api/enrollments/[id]
Get enrollment progress.

**Response:**
```json
{
  "id": "enroll_123",
  "employee": "Ahmed Hassan",
  "course": "Safety Training",
  "progress": 60,
  "lessonCompleted": 3,
  "totalLessons": 5,
  "status": "in_progress"
}
```

### Requests

#### GET /api/requests
List all requests/tickets.

**Query Parameters:**
- `status`: open | in_progress | resolved | closed
- `priority`: low | medium | high | urgent
- `category`: Maintenance | HR | IT | Operations

**Response:**
```json
{
  "data": [
    {
      "id": "req_123",
      "title": "Fix AC Unit",
      "category": "Maintenance",
      "priority": "high",
      "status": "in_progress",
      "assignee": "Mohammed Ali",
      "createdAt": "2024-02-01"
    }
  ]
}
```

#### POST /api/requests
Create new request.

**Request:**
```json
{
  "title": "Fix Printer",
  "description": "Printer 3 not printing",
  "category": "IT",
  "priority": "medium",
  "branchId": "branch_123"
}
```

### KPIs

#### GET /api/kpis
List all KPIs.

**Response:**
```json
{
  "data": [
    {
      "id": "kpi_123",
      "name": "Sales Target",
      "target": 100000,
      "current": 85000,
      "status": "on_track",
      "frequency": "monthly"
    }
  ]
}
```

#### POST /api/kpis/[id]/measurements
Add KPI measurement.

**Request:**
```json
{
  "value": 5000,
  "date": "2024-02-15",
  "branchId": "branch_123"
}
```

### Reports

#### GET /api/reports/employees
Generate employee report.

**Query Parameters:**
- `startDate`: Start date
- `endDate`: End date
- `branch`: Branch ID
- `format`: json | csv | pdf

**Response:**
```json
{
  "data": [
    {
      "employee": "Ahmed Hassan",
      "branch": "Cairo",
      "tasksCompleted": 24,
      "trainingHours": 12,
      "performanceScore": 88
    }
  ]
}
```

#### GET /api/reports/training
Generate training analytics report.

#### GET /api/reports/performance
Generate performance report.

#### GET /api/reports/kpi
Generate KPI report.

## Server Actions

### Creating Server Actions
```typescript
'use server'

import { validateAuth } from '@/lib/auth'
import { z } from 'zod'

const CreateEmployeeSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email()
})

export async function createEmployee(data: unknown) {
  const user = await validateAuth()
  const validated = CreateEmployeeSchema.parse(data)
  
  // Business logic
  
  return { success: true, data: employee }
}
```

### Using Server Actions
```typescript
'use client'

import { createEmployee } from '@/server/actions/employees'

export function EmployeeForm() {
  const handleSubmit = async (formData: FormData) => {
    const result = await createEmployee(formData)
    if (result.success) {
      // Handle success
    } else {
      // Handle error
    }
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "User does not have permission to access this resource"
}
```

### Common Error Codes
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (authenticated but lacks permission)
- `404` - Not found
- `422` - Validation error
- `500` - Server error

### Validation Errors
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": ["Invalid email format"],
    "firstName": ["First name is required"]
  }
}
```

## Pagination

All list endpoints support pagination:
- `page`: Current page (1-indexed)
- `limit`: Items per page
- Response includes `total`, `page`, `limit`

```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 20,
  "pages": 5
}
```

## Rate Limiting

API rate limits (to be implemented):
- 60 requests per minute (anonymous)
- 600 requests per minute (authenticated)
- Rate limit headers included in response

## Webhooks

Reserved for future implementation:
- Employee events
- Training completion
- Request status changes
- KPI threshold alerts
