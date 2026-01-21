# Copilot Instructions for Full-Stack Application

## Architecture Overview

This is a full-stack application with a **Django REST backend** and **Next.js 16 frontend** running in Docker containers, communicating through a shared network.

### Core Components

- **Backend**: Django 5.1 + Django REST Framework on port 8000
- **Frontend**: Next.js 16 (App Router) with React 19 + Clerk authentication on port 3000
- **Database**: SQLite (persisted in Docker volume `sqlite_data_*`)
- **Auth**: Clerk handles authentication; user email passed to Django for authorization

## Project-Specific Conventions

### Frontend Patterns

#### Route Organization

- **(auth)**: Clerk authentication pages (sign-in, sign-up) with centered layout
- **(dashboard)**: Authenticated routes with custom dashboard layout
- Use Next.js **App Router file conventions**: `layout.tsx`, `page.tsx`, `route.ts`

#### Authentication Flow

```typescript
// API routes: Use currentUser() for server-side auth
import { currentUser } from "@clerk/nextjs/server";
const user = await currentUser();
const email = user?.emailAddresses[0]?.emailAddress;

// Middleware: Protected routes via Clerk middleware (src/proxy.ts)
// Public routes: /sign-in, /sign-up, /api/webhooks
```

#### Backend Communication

- **PRIORITY: Use Server Components for data fetching** - Server components can directly fetch from Django backend and are the preferred approach
- **Never call Django directly from client components** - Only server components and API routes should communicate with Django
- Use Next.js API routes (`/api/*`) only when:
  - Client-side interactivity is required
  - Fetching from client components
  - Handling webhooks or external callbacks
- API routes read `process.env.API_URL` (set to `http://localhost:8000` or backend container)
- Pass user email from Clerk to Django in request body/headers for authorization

Example server component pattern (PREFERRED):

```typescript
// nextjs/src/app/(dashboard)/example/page.tsx
import { currentUser } from "@clerk/nextjs/server";

export default async function ExamplePage() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const response = await fetch(`${process.env.API_URL}/app/endpoint/`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();

  return <div>{/* render data */}</div>;
}
```

Example API route pattern (use only when necessary):

```typescript
// nextjs/src/app/api/example/route.ts
export async function GET(req: Request) {
  const user = await currentUser();
  const response = await fetch(`${process.env.API_URL}/app/endpoint/`, {
    headers: {
      /* user email */
    },
  });
  return Response.json(await response.json());
}
```

#### Code Organization

**CRITICAL: Component Separation**

- **NEVER put all code in page.tsx** - this is the most important rule
- **ALWAYS extract components into separate files** - pages should only handle layout and data fetching
- Break down ANY page that has more than 100 lines into smaller components
- If you're writing JSX for cards, tables, forms, or any UI element, create a separate component file
- Page files should be lightweight orchestrators that compose smaller components

**TypeScript Interfaces & Types**

- All interfaces and types go in `nextjs/src/types/` directory
- **ALWAYS check if the interface already exists before creating a new one**
- Search the types folder for similar interfaces and reuse them
- Use clear, descriptive names following PascalCase convention (e.g., `User`, `TaskItem`, `ApiResponse`)

**Utility Functions**

- All utility functions go in `nextjs/src/utils/` directory
- **ALWAYS check if a utility function already exists before creating a new one**
- Search the utils folder for existing helper functions
- Create focused, single-purpose utility functions
- Use clear, descriptive names following camelCase convention (e.g., `formatDate`, `calculateTotal`)

**Component Organization**

- Check `nextjs/src/components/` for existing shared components before creating new ones
- Break down complex pages into smaller, reusable components
- Place reusable components in `nextjs/src/components/`
- Place page-specific components in the same directory as the page that uses them
- Follow the single responsibility principle - one component, one purpose

Example structure:

```
src/
  app/(dashboard)/tasks/page.tsx          # Main page component (data fetching + layout only)
  app/(dashboard)/tasks/task-header.tsx   # Page-specific header component
  app/(dashboard)/tasks/task-filters.tsx  # Page-specific filters component
  components/
    task-card.tsx                          # Shared component
    task-list.tsx                          # Shared component
    ui/                                    # shadcn/ui components
  types/
    task.ts                                # Task-related interfaces
  utils/
    task-helpers.ts                        # Task-related utilities
```

**What to Extract from page.tsx:**

- Any custom JSX component (cards, tables, forms, headers, sidebars)
- Reusable UI patterns (list items, filters, search bars)
- Complex rendering logic (conditional displays, mappings)
- Keep in page.tsx: data fetching, auth checks, basic layout structure

### Backend Patterns

#### Django App Structure

- `app/`: Core application models, views and API endpoints
- `reports/`: Reporting functionality with SQL-based chart definitions
- `project/`: Django settings, URLs, WSGI config

#### API Conventions

- All views use `@api_view()` decorator with appropriate HTTP methods (e.g., `@api_view(['GET'])`, `@api_view(['POST', 'PUT'])`)
- Include `@csrf_exempt` for external calls (Clerk webhooks)
- Return `JsonResponse` with `{"success": bool, "data": {...}}` structure
- CORS enabled for `http://localhost:3000`

#### Database Models

- Use AutoField for primary keys
- Use UUID primary keys where appropriate
- Use `app/models.py` for core models
- Use `reports/models.py` for report-related models
- Follow Django ORM best practices
- TextField for flexible data storage
- Timestamps: `created_at`, `updated_at` (auto_now_add/auto_now)
- Model naming: PascalCase (e.g., `Users`, `Roles`)

### Configuration Files

**Environment Variables** ([nextjs/.env.local](../nextjs/.env.local)):

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`: Clerk auth
- `API_URL`: Django backend URL (http://localhost:8000)
- `NEXT_PUBLIC_NEXTJS_API_URL`: Frontend URL for webhooks
- `SIGNING_SECRET`: Clerk webhook verification

**Django Settings** ([django/project/project/settings.py](../django/project/project/settings.py)):

- Uses `django-unfold` for modern admin UI
- `CSRF_TRUSTED_ORIGINS`: Must include frontend URL
- SQLite database at `BASE_DIR/database/db.sqlite3`
- Static files served by WhiteNoise with compressed manifest storage

### UI Component Library

Uses **shadcn/ui** components (Radix UI + Tailwind CSS):

- Components in `nextjs/src/components/ui/`
- Configure via [components.json](../nextjs/components.json)
- Recharts for data visualization (bar, line, pie, doughnut charts)
- Custom components follow kebab-case naming

### Figma Design Implementation (Pixel-Perfect Conversion)

When implementing designs from Figma using MCP tools, act as a **Pixel-Perfect Front-End Engine** with zero tolerance for deviation.

#### STRICT EXECUTION RULES

**1. Single Source of Truth**

- The Figma file is the absolute standard - no exceptions
- Do NOT "improve", "modernize", or "simplify" the design
- Do NOT change spacing, colors, typography, or alignment

**2. Geometry & Spacing**

- Extract EXACT pixel values for all `padding`, `margin`, `gap`, `width`, `height`, and `border-radius`
- Maintain the exact visual hierarchy defined by font weights and sizes
- Use Figma's spacing values directly - do not round or adjust

**3. Colors (CRITICAL - UPDATED RULES)**

**MANDATORY COLOR WORKFLOW:**

1. **First, ALWAYS check [globals.css](../nextjs/src/app/globals.css)** for existing shadcn/ui color variables
2. **Extract the exact color from Figma design** (hex, rgb, or hsl)
3. **Compare Figma color with globals.css colors:**
   - If an **exact or very close match** exists in globals.css → USE the existing Tailwind class
   - If **no match exists** → ADD the new color to globals.css following shadcn naming convention, then use the Tailwind class
4. **NEVER use custom Tailwind colors (like bg-[#3B82F6]) or hardcoded hex/rgb values directly in components**

**Color Class Usage (shadcn/ui convention):**

- Use semantic Tailwind classes that map to CSS variables: `bg-primary`, `text-foreground`, `bg-background`, `border-border`
- Common shadcn classes:
  - `bg-background` / `text-foreground` - Main background and text
  - `bg-primary` / `text-primary-foreground` - Primary actions
  - `bg-secondary` / `text-secondary-foreground` - Secondary elements
  - `bg-muted` / `text-muted-foreground` - Muted/subdued content
  - `bg-accent` / `text-accent-foreground` - Accent elements
  - `bg-card` / `text-card-foreground` - Card backgrounds
  - `bg-popover` / `text-popover-foreground` - Popover/dropdown backgrounds
  - `border-border` - Border colors
  - `bg-destructive` / `text-destructive-foreground` - Destructive actions
- For opacity: `bg-primary/80` or `text-muted-foreground/50`

**Adding New Colors to globals.css:**

When the design color doesn't exist in globals.css, follow shadcn naming convention:

```css
/* In :root section (light mode) */
--chart-1: 220 90% 56%; /* Chart colors */
--chart-2: 280 65% 60%;
--success: 142 76% 36%; /* Status colors */
--warning: 38 92% 50%;
--info: 199 89% 48%;

/* In .dark section (dark mode) */
--chart-1: 220 85% 65%;
--chart-2: 280 60% 70%;
--success: 142 71% 45%;
--warning: 38 87% 60%;
--info: 199 89% 58%;
```

**Naming Convention (shadcn/ui style):**

- Use semantic names that describe purpose: `--chart-1`, `--success`, `--warning`, `--info`
- For custom colors, follow pattern: `--feature-name` (e.g., `--sidebar`, `--highlight`)
- Avoid generic names like `--color1` or `--new-color`
- Ensure each color has both light and dark mode values

**Then use with Tailwind:**

```tsx
// After adding to globals.css
// --chart-1: 220 90% 56%;

<div className="bg-chart-1 text-white">
  <span className="text-success">Success message</span>
</div>
```

**Example Implementation:**

❌ **WRONG - Using custom Tailwind values or CSS variable syntax:**

```tsx
<div className="bg-[#3B82F6] text-white">
  <span className="text-[#8B5CF6]">Hello</span>
</div>

<div className="bg-[hsl(var(--primary))] text-white">
  <span>Also wrong syntax</span>
</div>
```

✅ **CORRECT - Using shadcn Tailwind classes:**

```tsx
<div className="bg-primary text-primary-foreground">
  <span className="text-muted-foreground">Hello</span>
</div>

<div className="bg-card border border-border">
  <h2 className="text-foreground">Card Title</h2>
  <p className="text-muted-foreground">Card description</p>
</div>
```

**4. Typography & Fonts**

- ALWAYS check [globals.css](../nextjs/src/app/globals.css) for existing font imports and definitions first
- Check [layout.tsx](../nextjs/src/app/layout.tsx) for existing font configurations
- If design font doesn't exist:
  - Import the font using Next.js font optimization (`next/font/google` or `next/font/local`)
  - Add it to the layout.tsx file
- Preserve exact font weights, sizes, line heights, and letter spacing from Figma

**5. Layout Logic**

- Preserve exact layout structure from Figma (e.g., Main Content Column + Sidebar)
- Use appropriate shadcn/ui components that match design patterns
- Maintain grid/flex configurations exactly as designed

**6. Zero Hallucination**

- Do not invent elements not visible in the design
- Do not omit elements that are visible (breadcrumbs, icons, buttons, etc.)
- Every visual element must have a code counterpart

**7. Images & Assets**

- When Figma design contains images, download them using the asset URLs from `mcp_figma_get_design_context` response
- Save downloaded images to `nextjs/public/` directory with descriptive names
- Use relative paths in Next.js components: `/filename.png`
- Maintain image dimensions and aspect ratios as specified in design
- Use Next.js <Image> component with proper width/height attributes

#### Integration Checklist

- [ ] Fetch design context from Figma MCP
- [ ] Extract all spacing/sizing values
- [ ] **Extract all colors from design and compare with globals.css**
- [ ] **Add missing colors to globals.css with semantic names**
- [ ] **Use CSS variables (not hardcoded colors) in all components**
- [ ] Download and save images to `nextjs/public/`
- [ ] Use appropriate shadcn components
- [ ] Create Next.js API route for data fetching (if needed)
- [ ] Implement page with server components + auth
- [ ] Verify pixel-perfect match against Figma overlay

**Output Requirement**: Production-ready code that matches the design overlay perfectly with zero visual discrepancies and uses globals.css color system consistently.

## Critical Integration Points

### Clerk Webhook → Django User Sync

[nextjs/src/app/api/webhooks/route.ts](../nextjs/src/app/api/webhooks/route.ts) forwards Clerk user events to Django's `/app/userCreated` endpoint to sync user data.

## Common Tasks

### Adding a Django Model

1. Define in `app/models.py`.
2. Run `python manage.py makemigrations app`
3. Run `python manage.py migrate`
4. Register in `app/admin.py` for admin interface

### Creating a Django API Endpoint

1. Add view in `app/views.py` with `@api_view()` decorator
2. Map URL in `app/urls.py`

### Adding a Frontend Page

1. Create `nextjs/src/app/(dashboard)/[route]/page.tsx`
2. Use server components with `await currentUser()` for auth
3. Fetch data via Next.js API routes if it is not a server component, not direct Django calls
4. Add route to `proxy.ts` if it needs auth protection
5. **Test the page using Playwright MCP server:**
   - Use the Playwright MCP tools to navigate to the new page
   - Interact with and test the page functionality
   - Generate a Playwright test file in `nextjs/e2e/` directory based on the interactions
   - Follow existing test patterns in the e2e folder
   - Ensure tests cover key user interactions and page functionality
