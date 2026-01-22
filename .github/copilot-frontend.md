# Copilot Instructions - Frontend (Next.js)

## Route Organization

### Directory Structure

- **(auth)**: Clerk authentication pages (sign-in, sign-up) with centered layout
- **(dashboard)**: Authenticated routes with custom dashboard layout
- Use Next.js **App Router file conventions**: `layout.tsx`, `page.tsx`, `route.ts`

### Route Examples

```
app/
  (auth)/
    sign-in/[[...sign-in]]/page.tsx
    sign-up/[[...sign-up]]/page.tsx
    layout.tsx                          ← Centered auth layout
  (dashboard)/
    page.tsx                            ← Dashboard home
    tasks/page.tsx                      ← Tasks page
    settings/page.tsx                   ← Settings page
    layout.tsx                          ← Dashboard layout with sidebar
  api/
    webhooks/route.ts                   ← Clerk webhook handler
    example/route.ts                    ← API endpoint for client components
```

## Authentication Patterns

### Server Components (PREFERRED)

```typescript
// app/(dashboard)/example/page.tsx
import { currentUser } from "@clerk/nextjs/server";

export default async function ExamplePage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  if (!email) {
    return <div>Please sign in</div>;
  }

  // Direct fetch to Django backend
  const response = await fetch(`${process.env.API_URL}/app/endpoint/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  return <div>{/* render data */}</div>;
}
```

### API Routes (Use Only When Necessary)

Use API routes ONLY for:

- Client-side interactivity requirements
- Fetching from client components
- Webhooks or external callbacks

```typescript
// app/api/example/route.ts
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const response = await fetch(`${process.env.API_URL}/app/endpoint/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return Response.json(await response.json());
}
```

### Protected Routes

Protected routes are configured in `src/proxy.ts` using Clerk middleware:

- **Public routes**: `/sign-in`, `/sign-up`, `/api/webhooks`
- **Protected routes**: Everything else (all dashboard routes)

## Code Organization Rules

### CRITICAL: Component Separation

**NEVER put all code in page.tsx** - This is the most important rule.

#### Page File Rules

- **ALWAYS extract components into separate files**
- Pages should only handle layout and data fetching
- Break down ANY page that has more than 100 lines into smaller components
- If you're writing JSX for cards, tables, forms, or any UI element, create a separate component file
- Page files should be lightweight orchestrators that compose smaller components

#### What to Keep in page.tsx

- Data fetching logic
- Authentication checks
- Basic layout structure
- Component composition

#### What to Extract from page.tsx

- Any custom JSX component (cards, tables, forms, headers, sidebars)
- Reusable UI patterns (list items, filters, search bars)
- Complex rendering logic (conditional displays, mappings)

### TypeScript Interfaces & Types

Location: `nextjs/src/types/` directory

**RULES:**

- **ALWAYS check if the interface already exists before creating a new one**
- Search the types folder for similar interfaces and reuse them
- Use clear, descriptive names following PascalCase convention
- One file per domain (e.g., `user.ts`, `task.ts`, `api.ts`)

```typescript
// types/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}

export interface TaskListResponse {
  success: boolean;
  data: Task[];
}
```

### Utility Functions

Location: `nextjs/src/utils/` directory

**RULES:**

- **ALWAYS check if a utility function already exists before creating a new one**
- Search the utils folder for existing helper functions
- Create focused, single-purpose utility functions
- Use clear, descriptive names following camelCase convention

```typescript
// utils/date-helpers.ts
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// utils/api-helpers.ts
export async function fetchWithAuth(
  url: string,
  email: string,
  options?: RequestInit,
) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify({
      email,
      ...JSON.parse((options?.body as string) || "{}"),
    }),
  });
}
```

### Component Organization

Location: `nextjs/src/components/` for shared components

**RULES:**

- Check `nextjs/src/components/` for existing shared components before creating new ones
- Break down complex pages into smaller, reusable components
- Place **reusable components** in `nextjs/src/components/`
- Place **page-specific components** in the same directory as the page that uses them
- Follow the single responsibility principle - one component, one purpose

#### Example Structure

```
src/
  app/
    (dashboard)/
      tasks/
        page.tsx                    ← Main page (data fetching + layout only)
        task-header.tsx             ← Page-specific header
        task-filters.tsx            ← Page-specific filters
        task-create-dialog.tsx      ← Page-specific create dialog
  components/
    task-card.tsx                   ← Shared task card component
    task-list.tsx                   ← Shared task list component
    task-status-badge.tsx           ← Shared status badge
    ui/                             ← shadcn/ui components
      button.tsx
      card.tsx
      dialog.tsx
  types/
    task.ts                         ← Task interfaces
  utils/
    task-helpers.ts                 ← Task utility functions
```

#### Component File Template

```typescript
// components/task-card.tsx
import { Task } from '@/types/task';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TaskCardProps {
  task: Task;
  onUpdate?: (task: Task) => void;
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
      </CardContent>
    </Card>
  );
}
```

## Backend Communication

### Rules

1. **PRIORITY: Use Server Components** for data fetching
2. Server components can directly fetch from Django backend
3. **Never call Django directly from client components**
4. Use Next.js API routes (`/api/*`) only when client-side interactivity is required

### Environment Variable

```typescript
// Server Components and API Routes
const API_URL = process.env.API_URL; // http://localhost:8000
```

### Passing User Email to Django

All Django requests must include the user's email for authorization:

```typescript
const response = await fetch(`${process.env.API_URL}/app/endpoint/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: userEmail,
    // ... other data
  }),
});
```

## UI Component Library (shadcn/ui)

### Available Components

Components located in `nextjs/src/components/ui/`:

- Radix UI primitives + Tailwind CSS v4 styling
- Configuration via `components.json`
- Colors defined in `globals.css` using `@theme` directive
- Common components: Button, Card, Dialog, Form, Input, Select, Table, Tabs

### Data Visualization

Use **Recharts** for charts:

```typescript
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis } from 'recharts';

// Example usage
<LineChart width={600} height={300} data={data}>
  <Line type="monotone" dataKey="value" stroke="#8884d8" />
  <XAxis dataKey="name" />
  <YAxis />
</LineChart>
```

### Naming Convention

- shadcn/ui components use kebab-case: `button.tsx`, `card.tsx`, `dialog.tsx`
- Custom components use PascalCase: `TaskCard.tsx`, `UserProfile.tsx`

## TypeScript Best Practices

- **No `any` types** - always provide proper typing
- Use TypeScript strict mode
- Define interfaces for all API responses
- Use type guards for runtime checks

```typescript
// Good
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Type guard
function isTask(obj: unknown): obj is Task {
  return (
    typeof obj === "object" && obj !== null && "id" in obj && "title" in obj
  );
}
```

## Common Patterns

### Loading States

```typescript
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-40 w-full" />}>
      <DataComponent />
    </Suspense>
  );
}
```

### Error Handling

```typescript
// app/(dashboard)/tasks/page.tsx
export default async function TasksPage() {
  try {
    const response = await fetch(`${process.env.API_URL}/app/tasks/`);

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();
    return <TaskList tasks={data.data} />;
  } catch (error) {
    return <div>Error loading tasks. Please try again.</div>;
  }
}
```

### Client Component Interactivity

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function TaskCreateButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ /* data */ }),
      });
      // Handle response
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button onClick={handleCreate} disabled={isLoading}>
      Create Task
    </Button>
  );
}
```
