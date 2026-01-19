# Copilot Instructions for Full-Stack Application

## Architecture Overview

This is a full-stack application with a **Django REST backend** and **Next.js 16 frontend** running in Docker containers, communicating through a shared network.

### Core Components

- **Backend**: Django 5.1 + Django REST Framework on port 8000
- **Frontend**: Next.js 16 (App Router) with React 19 + Clerk authentication on port 3000
- **Database**: SQLite (persisted in Docker volume `sqlite_data_*`)
- **Auth**: Clerk handles authentication; user email passed to Django for authorization

### Docker Development (Primary)

```bash
# Build and start both services
docker compose up --build

# Access apps
# Frontend: http://localhost:3000
# Django Admin: http://127.0.0.1:8000/admin (admin / a1Rj74XqK2Kj)
```

The `entrypoint.sh` script runs migrations and initializes data:

- Creates migrations for `app` and `reports` apps
- Runs `roles.py` to seed Django groups/permissions
- Runs `reports.py` to seed report definitions
- Creates superuser when `CREATE_SUPERUSER=true`

### Local Development (Alternative)

**Django** (from `django/project/`):

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python roles.py  # First-time setup only
python manage.py runserver
```

**Next.js** (from `nextjs/`):

```bash
npm install
npm run dev  # Uses Turbopack
```

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

- **Never call Django directly from frontend components**
- Always proxy through Next.js API routes (`/api/*`) if it is not a server component
- API routes read `process.env.API_URL` (set to `http://localhost:8000` or backend container)
- Pass user email from Clerk to Django in request body/headers for authorization

Example API route pattern:

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

### Debugging Docker Issues

- Check logs: `docker compose logs backend` or `docker compose logs frontend`
- Django migrations run automatically via `entrypoint.sh` build args
- SQLite database persists in named volume (survives `docker compose down`)
- Use `docker compose down -v` to wipe database (WARNING: data loss)
