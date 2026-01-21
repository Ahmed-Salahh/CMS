# Copilot Instructions - Testing (Playwright)

## Testing Philosophy

All new pages and features should be tested using the **Playwright MCP server** to ensure functionality and prevent regressions.

## Playwright MCP Server Integration

### Testing Workflow

When creating a new page or feature:

1. **Implement the feature** following frontend/backend guidelines
2. **Test interactively** using Playwright MCP tools
3. **Generate test file** based on interactions
4. **Save test** to `nextjs/e2e/` directory

### Interactive Testing with MCP

Use Playwright MCP tools to:

- Navigate to the new page
- Interact with UI elements (click, type, select)
- Verify page content and behavior
- Test form submissions and API calls
- Validate error states and edge cases

**Example MCP Testing Session**:

```
1. Navigate to http://localhost:3000/dashboard/tasks
2. Click "Create Task" button
3. Fill in task title and description
4. Submit form
5. Verify task appears in list
6. Test filter functionality
7. Test task deletion
```

## Test File Organization

### Directory Structure

```
nextjs/
  e2e/
    auth.spec.ts              ← Authentication tests
    dashboard.spec.ts         ← Dashboard page tests
    tasks.spec.ts             ← Tasks feature tests
    settings.spec.ts          ← Settings page tests
    helpers/
      auth-helpers.ts         ← Reusable auth utilities
      test-data.ts            ← Test data generators
```

### Test File Naming Convention

- Use kebab-case: `feature-name.spec.ts`
- Name after the feature or page being tested
- Group related tests in the same file

## Test Structure

### Basic Test Template

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Navigate to page, login, etc.
    await page.goto("http://localhost:3000/dashboard/feature");
  });

  test("should display page content", async ({ page }) => {
    // Arrange

    // Act

    // Assert
    await expect(
      page.getByRole("heading", { name: "Feature Title" }),
    ).toBeVisible();
  });

  test("should handle user interaction", async ({ page }) => {
    // Test implementation
  });
});
```

### Authentication in Tests

```typescript
// helpers/auth-helpers.ts
export async function login(page: Page, email: string, password: string) {
  await page.goto("http://localhost:3000/sign-in");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL("**/dashboard");
}

// In test file
import { login } from "./helpers/auth-helpers";

test.beforeEach(async ({ page }) => {
  await login(page, "test@example.com", "password123");
});
```

## Test Patterns

### Testing Page Navigation

```typescript
test("should navigate to tasks page", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");
  await page.getByRole("link", { name: "Tasks" }).click();
  await expect(page).toHaveURL(/.*\/dashboard\/tasks/);
  await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
});
```

### Testing Forms

```typescript
test("should create new task", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/tasks");

  // Click create button
  await page.getByRole("button", { name: "Create Task" }).click();

  // Fill form
  await page.getByLabel("Title").fill("Test Task");
  await page.getByLabel("Description").fill("Test Description");
  await page.getByLabel("Status").selectOption("in_progress");

  // Submit
  await page.getByRole("button", { name: "Submit" }).click();

  // Verify success
  await expect(page.getByText("Task created successfully")).toBeVisible();
  await expect(page.getByText("Test Task")).toBeVisible();
});
```

### Testing API Interactions

```typescript
test("should load data from API", async ({ page }) => {
  // Mock API response if needed
  await page.route("**/api/tasks", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: [{ id: "1", title: "Test Task", status: "pending" }],
      }),
    });
  });

  await page.goto("http://localhost:3000/dashboard/tasks");

  // Verify data is displayed
  await expect(page.getByText("Test Task")).toBeVisible();
});
```

### Testing Error States

```typescript
test("should display error message on failed submission", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/tasks");

  // Mock API error
  await page.route("**/api/tasks", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
    });
  });

  await page.getByRole("button", { name: "Create Task" }).click();
  await page.getByLabel("Title").fill("Test Task");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Internal server error")).toBeVisible();
});
```

### Testing Modals/Dialogs

```typescript
test("should open and close modal", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/tasks");

  // Open modal
  await page.getByRole("button", { name: "Create Task" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  // Close modal
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
```

### Testing Filters and Search

```typescript
test("should filter tasks by status", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/tasks");

  // Select filter
  await page.getByLabel("Status").selectOption("completed");

  // Verify filtered results
  await expect(page.getByText("Completed Task")).toBeVisible();
  await expect(page.getByText("Pending Task")).not.toBeVisible();
});

test("should search tasks", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/tasks");

  // Enter search query
  await page.getByPlaceholder("Search tasks...").fill("important");

  // Verify search results
  await expect(page.getByText("Important Task")).toBeVisible();
  await expect(page.getByText("Regular Task")).not.toBeVisible();
});
```

## Test Data Management

### Creating Test Data

```typescript
// helpers/test-data.ts
export function generateTask(overrides = {}) {
  return {
    id: Math.random().toString(36).substring(7),
    title: "Test Task",
    description: "Test Description",
    status: "pending",
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

export function generateUser(overrides = {}) {
  return {
    id: Math.random().toString(36).substring(7),
    email: "test@example.com",
    full_name: "Test User",
    ...overrides,
  };
}
```

### Using Test Data

```typescript
import { generateTask } from "./helpers/test-data";

test("should display task details", async ({ page }) => {
  const task = generateTask({
    title: "Specific Test Task",
    status: "completed",
  });

  // Mock API with test data
  await page.route("**/api/tasks/*", async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true, data: task }),
    });
  });

  await page.goto(`http://localhost:3000/dashboard/tasks/${task.id}`);
  await expect(page.getByText(task.title)).toBeVisible();
});
```

## Best Practices

### 1. Follow AAA Pattern

```typescript
test("should do something", async ({ page }) => {
  // Arrange - Set up test conditions
  await page.goto("http://localhost:3000/dashboard");

  // Act - Perform actions
  await page.getByRole("button", { name: "Action" }).click();

  // Assert - Verify results
  await expect(page.getByText("Success")).toBeVisible();
});
```

### 2. Use Semantic Selectors

```typescript
// ✅ GOOD - Semantic, accessible selectors
await page.getByRole("button", { name: "Submit" });
await page.getByLabel("Email");
await page.getByText("Welcome");

// ❌ BAD - Fragile CSS selectors
await page.locator(".btn-primary");
await page.locator("#email-input");
```

### 3. Wait for Elements Properly

```typescript
// ✅ GOOD - Wait for element to be visible
await expect(page.getByText("Success")).toBeVisible();

// ✅ GOOD - Wait for URL change
await page.waitForURL("**/dashboard");

// ❌ BAD - Arbitrary timeouts
await page.waitForTimeout(1000);
```

### 4. Test User Flows, Not Implementation

```typescript
// ✅ GOOD - Tests user behavior
test("user can create and view task", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/tasks");
  await page.getByRole("button", { name: "Create Task" }).click();
  await page.getByLabel("Title").fill("New Task");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("New Task")).toBeVisible();
});

// ❌ BAD - Tests implementation details
test("API endpoint is called", async ({ page }) => {
  let apiCalled = false;
  await page.route("**/api/tasks", async (route) => {
    apiCalled = true;
    await route.continue();
  });
  // ...
});
```

### 5. Keep Tests Independent

```typescript
// ✅ GOOD - Each test is independent
test.describe("Tasks", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("http://localhost:3000/dashboard/tasks");
  });

  test("test 1", async ({ page }) => {
    /* ... */
  });
  test("test 2", async ({ page }) => {
    /* ... */
  });
});

// ❌ BAD - Tests depend on each other
test("create task", async ({ page }) => {
  /* creates task */
});
test("edit task", async ({ page }) => {
  /* assumes task exists */
});
```

## Running Tests

### Local Development

```bash
# Run all tests
npm run test:e2e

# Run specific test file
npm run test:e2e tasks.spec.ts

# Run tests in headed mode (see browser)
npm run test:e2e -- --headed

# Run tests in debug mode
npm run test:e2e -- --debug
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
});
```

## Test Coverage Goals

### What to Test

- ✅ User authentication flows
- ✅ Page navigation
- ✅ Form submissions
- ✅ Data loading and display
- ✅ Error handling and validation
- ✅ Interactive components (modals, dropdowns, etc.)
- ✅ Search and filter functionality
- ✅ CRUD operations

### What Not to Test

- ❌ Styling and layout (use visual regression if needed)
- ❌ Third-party library internals
- ❌ Backend API logic (test separately)
- ❌ Browser compatibility (Playwright handles this)

## Generating Tests from MCP Interactions

When using Playwright MCP to test a page:

1. **Perform all necessary interactions** to test the feature
2. **Note the sequence of actions** and expected outcomes
3. **Generate test file** based on the interaction flow
4. **Follow existing test patterns** in the e2e folder
5. **Ensure tests cover key user interactions**

**Example MCP Session → Test File**:

MCP Interactions:

```
1. goto('http://localhost:3000/dashboard/tasks')
2. click('button[name="Create Task"]')
3. fill('input[name="title"]', 'Test Task')
4. click('button[type="submit"]')
5. Expect text 'Test Task' to be visible
```

Generated Test:

```typescript
test("should create new task", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/tasks");
  await page.getByRole("button", { name: "Create Task" }).click();
  await page.getByLabel("Title").fill("Test Task");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Test Task")).toBeVisible();
});
```

## Troubleshooting

### Common Issues

**Issue**: Test times out waiting for element

```typescript
// Solution: Increase timeout or check selector
await expect(page.getByText("Text")).toBeVisible({ timeout: 10000 });
```

**Issue**: Test fails intermittently

```typescript
// Solution: Add proper waits
await page.waitForLoadState("networkidle");
await expect(page.getByText("Text")).toBeVisible();
```

**Issue**: Authentication not persisting

```typescript
// Solution: Use context storage
const context = await browser.newContext({
  storageState: "auth.json",
});
```
