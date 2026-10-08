# Component Library Guide

## Component Organization

```
components/
├── ui/              # Base UI components (shadcn/ui based)
├── layout/          # Layout components
├── workspace/       # Dashboard-specific components
└── [feature]/       # Feature-specific components
```

## Base UI Components

### Buttons
```typescript
import { Button } from '@/components/ui/button'

// Variants
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button isLoading>Loading...</Button>
```

### Cards
```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Forms
```typescript
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl,
  FormMessage 
} from '@/components/ui/form'

// Use with react-hook-form
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Dialogs
```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Tables
```typescript
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Badges & Status
```typescript
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/ui/status-badge'

// Badge
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>

// Status Badge
<StatusBadge status="active">Active</StatusBadge>
<StatusBadge status="pending">Pending</StatusBadge>
<StatusBadge status="error">Error</StatusBadge>
```

### Alerts
```typescript
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Alert Title</AlertTitle>
  <AlertDescription>Alert description here</AlertDescription>
</Alert>
```

## Layout Components

### AppShell
Main application wrapper with sidebar and topbar.

```typescript
import { AppShell } from '@/components/layout/app-shell'

<AppShell>
  {/* Page content */}
</AppShell>
```

### Sidebar
Navigation sidebar (collapsible on mobile).

```typescript
import { Sidebar } from '@/components/layout/sidebar'

<Sidebar>
  <SidebarItem href="/dashboard" icon={Home}>Dashboard</SidebarItem>
  <SidebarItem href="/employees" icon={Users}>Employees</SidebarItem>
</Sidebar>
```

### Topbar
Header with navigation and user menu.

```typescript
import { Topbar } from '@/components/layout/topbar'

<Topbar 
  organizationName="Acme Corp"
  branchName="Cairo Main"
/>
```

### PageHeader
Page title and breadcrumbs.

```typescript
import { PageHeader } from '@/components/layout/page-header'

<PageHeader
  title="Employees"
  description="Manage organization employees"
  breadcrumbs={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Employees' }
  ]}
/>
```

## Workspace Components

### Dashboard Cards

#### KPI Card
```typescript
import { KpiCard } from '@/components/workspace/kpi-card'

<KpiCard
  title="Total Employees"
  value={124}
  change={+5.2}
  icon={Users}
/>
```

#### Metric Card
```typescript
import { MetricCard } from '@/components/workspace/metric-card'

<MetricCard
  title="Training Completion"
  value="87%"
  subtitle="This month"
/>
```

#### Status Card
```typescript
import { StatusCard } from '@/components/workspace/status-card'

<StatusCard
  label="Active Branches"
  value={4}
  status="success"
/>
```

### Data Display

#### Employee Table
```typescript
import { EmployeeTable } from '@/components/workspace/employee-table'

<EmployeeTable 
  employees={data}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

#### Task List
```typescript
import { TaskList } from '@/components/workspace/task-list'

<TaskList
  tasks={tasks}
  onStatusChange={handleStatusChange}
  onAssign={handleAssign}
/>
```

#### Timeline
```typescript
import { Timeline } from '@/components/workspace/timeline'

<Timeline
  items={activities}
  showDate
/>
```

### Forms & Input

#### Search Bar
```typescript
import { SearchBar } from '@/components/workspace/search-bar'

<SearchBar
  placeholder="Search employees..."
  onSearch={handleSearch}
/>
```

#### Filter Bar
```typescript
import { FilterBar } from '@/components/workspace/filter-bar'

<FilterBar
  filters={[
    { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
    { key: 'branch', label: 'Branch', options: branches }
  ]}
  onFilter={handleFilter}
/>
```

#### Date Range Picker
```typescript
import { DateRangePicker } from '@/components/workspace/date-range-picker'

<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
/>
```

### Feedback

#### Loading State
```typescript
import { LoadingState } from '@/components/workspace/loading-state'

<LoadingState message="Loading employees..." />
```

#### Empty State
```typescript
import { EmptyState } from '@/components/workspace/empty-state'

<EmptyState
  icon={Users}
  title="No employees yet"
  description="Create your first employee to get started"
  action={<Button>Add Employee</Button>}
/>
```

#### Error State
```typescript
import { ErrorState } from '@/components/workspace/error-state'

<ErrorState
  title="Failed to load employees"
  description="Please try again"
  onRetry={handleRetry}
/>
```

## Icon Library

Using Lucide React icons:

```typescript
import {
  Users,
  Home,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
  Trash2,
  Edit2,
  Plus,
  Search,
  Menu,
  Bell,
  LogOut
} from 'lucide-react'

<Users className="h-4 w-4" />
<Home className="h-6 w-6" />
```

## Component Styling

### Tailwind Classes
Components use standard Tailwind utilities:

```typescript
<div className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm">
  <span className="text-sm font-medium text-gray-700">Label</span>
  <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Action
  </button>
</div>
```

### CSS Modules Alternative
For complex styling:

```typescript
// component.module.css
.container {
  @apply flex items-center gap-4;
}

// component.tsx
import styles from './component.module.css'
<div className={styles.container}>...</div>
```

## Creating Custom Components

### Template
```typescript
import { ReactNode } from 'react'

interface CustomComponentProps {
  title: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
}

export function CustomComponent({
  title,
  children,
  variant = 'primary',
  disabled = false,
  className = ''
}: CustomComponentProps) {
  return (
    <div className={`
      component
      ${variant === 'primary' ? 'bg-blue-50' : 'bg-gray-50'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}
    `}>
      <h3 className="font-semibold text-lg">{title}</h3>
      <div>{children}</div>
    </div>
  )
}
```

## Best Practices

1. **Composition**: Build complex UIs from small, focused components
2. **Props**: Keep props simple and type-safe
3. **Variants**: Use variants for different styles rather than multiple props
4. **Accessibility**: Include ARIA labels and semantic HTML
5. **Testing**: Test component behavior and edge cases
6. **Documentation**: Document complex components with examples
7. **Performance**: Memoize expensive components with `React.memo()`
8. **Reusability**: Extract common patterns into reusable components

## Performance Tips

```typescript
// Memoize to prevent unnecessary re-renders
export const CustomComponent = React.memo(({ data }: Props) => {
  return <div>{data}</div>
})

// Use callback for event handlers
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies])

// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingState />
})
```
