# Copilot Instructions - Full-Stack Application

## Architecture Overview

This is a full-stack application with a **Django REST backend** and **Next.js 16 frontend** running in Docker containers, communicating through a shared network.

### Core Components

- **Backend**: Django 5.1 + Django REST Framework on port 8000
- **Frontend**: Next.js 16 (App Router) with React 19 + Clerk authentication on port 3000
- **Database**: SQLite (persisted in Docker volume `sqlite_data_*`)
- **Auth**: Clerk handles authentication; user email passed to Django for authorization

### Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4 (CSS-first configuration), shadcn/ui components
- **Backend**: Django 5.1, Django REST Framework, django-unfold admin
- **Database**: SQLite with volume persistence
- **Auth**: Clerk (authentication) + Django (authorization)
- **Containers**: Docker Compose with shared network

## File Organization

Detailed implementation rules are split across specialized files:

- **[copilot-frontend.md](./copilot-frontend.md)**: Next.js patterns, routing, authentication, component organization
- **[copilot-backend.md](./copilot-backend.md)**: Django models, views, API conventions, database patterns
- **[copilot-figma.md](./copilot-figma.md)**: Pixel-perfect Figma design implementation rules
- **[copilot-testing.md](./copilot-testing.md)**: Playwright testing with MCP server integration

## Critical Integration Points

### Authentication Flow

1. Clerk handles user authentication in frontend
2. User email extracted via `currentUser()` from Clerk
3. Email passed to Django backend for authorization
4. Webhook syncs Clerk user events to Django (`/api/webhooks/route.ts` → `/app/userCreated`)

### Frontend ↔ Backend Communication

- **PRIORITY**: Use Next.js Server Components for data fetching
- Server components directly fetch from Django backend at `process.env.API_URL`
- Use API routes (`/api/*`) only when client-side interactivity is required
- Never call Django directly from client components

### Environment Configuration

**Frontend** ([nextjs/.env.local](../nextjs/.env.local)):

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
- `API_URL`: Django backend URL (http://localhost:8000)
- `NEXT_PUBLIC_NEXTJS_API_URL`: Frontend URL for webhooks
- `SIGNING_SECRET`: Clerk webhook verification

**Backend** ([django/project/project/settings.py](../django/project/project/settings.py)):

- `CSRF_TRUSTED_ORIGINS`: Must include frontend URL
- CORS enabled for `http://localhost:3000`
- SQLite at `BASE_DIR/database/db.sqlite3`

## Quick Reference

### Adding a New Feature

1. **Backend**: Create Django model → migrate → add API endpoint → update URLs
2. **Frontend**: Create page in `app/(dashboard)/[route]/` → extract components → add types → test with Playwright
3. **Integration**: Use server components for data fetching → pass user email for auth

### Implementing from Figma Design (One-Prompt Workflow)

When given a Figma URL:

1. **Fetch design** using MCP tools
2. **Update colors** in `globals.css` (@theme block + @layer base) if needed
3. **Configure fonts** in `@theme` block or `layout.tsx` if needed
4. **Use shadcn/ui components** (never custom implementations)
5. **Implement responsive design** (mobile → tablet → desktop)
6. **Download images** to `public/`
7. **Extract components** (follow frontend rules)
8. **Generate Playwright tests**
9. **Complete in ONE TURN** - don't stop midway

### Project Structure

```
nextjs/
  src/
    app/
      (auth)/           ← Clerk sign-in/sign-up pages
      (dashboard)/      ← Protected routes with dashboard layout
      api/              ← API routes (webhooks, client-side endpoints)
    components/         ← Shared components
      ui/               ← shadcn/ui components
    types/              ← TypeScript interfaces
    utils/              ← Utility functions
  e2e/                  ← Playwright tests

django/
  project/
    app/                ← Core application (models, views, APIs)
    reports/            ← Reporting functionality
    project/            ← Settings, URLs, WSGI config
    database/           ← SQLite database file
```

## Development Workflow

1. Check existing code before creating new files (types, utils, components)
2. Follow file organization conventions (see frontend/backend docs)
3. Use TypeScript strictly (no `any` types)
4. Test new pages with Playwright MCP server
5. Maintain pixel-perfect design fidelity (see Figma docs)

For detailed implementation guidelines, refer to the specialized instruction files listed above.
