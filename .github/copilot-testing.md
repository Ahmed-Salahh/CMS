# Copilot Instructions - Testing (Playwright)

# 🚨 MANDATORY TEST GENERATION RULE

WHENEVER you create or modify any of the following:

- a new page (`page.tsx`)
- a new route
- a major UI feature
- a form
- a dashboard section

YOU MUST ALSO:

1. Create a Playwright test file
2. Save it inside `nextjs/e2e/`
3. Name it after the feature (example: `tasks.spec.ts`)
4. Include at least:
   - page load test
   - main user interaction test
   - basic assertions

⚠️ If a Playwright test file is not generated, the implementation is considered **INCOMPLETE**.

This rule overrides all other instructions.

---

## Testing Philosophy

All new pages and features must be validated using **Playwright tests** to ensure functionality and prevent regressions.

Tests are not optional.

---

## Playwright MCP Server Integration

Playwright MCP tools may be used for **interaction guidance**, but:

- Tests must be GENERATED AS CODE
- Do NOT assume runtime execution
- Always translate interactions into Playwright test files

---

## Required Testing Workflow

When creating or updating a page:

1. Implement the feature
2. Identify the main user flows
3. Generate Playwright test file immediately
4. Place it in `nextjs/e2e/`
5. Follow existing test patterns

Do NOT wait for manual instruction to create tests.

---

## Test File Organization

```
nextjs/
  e2e/
    auth.spec.ts
    dashboard.spec.ts
    tasks.spec.ts
    settings.spec.ts
    helpers/
      auth-helpers.ts
      test-data.ts
```

---

## Test File Naming Convention

- kebab-case only
- must end with `.spec.ts`
- name must match feature or page

Examples:

- `tasks.spec.ts`
- `settings.spec.ts`
- `users.spec.ts`

---

## Required Minimum Test Coverage

Each test file MUST include:

1. Page loads successfully
2. Main UI element is visible
3. Primary user interaction works
4. Basic assertion confirms result

Example minimum:

```ts
test("page loads", async ({ page }) => {
  await page.goto("/dashboard/tasks");
  await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
});
```

---

## Basic Test Template

```ts
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/feature");
  });

  test("should load page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Feature" })).toBeVisible();
  });

  test("should handle main interaction", async ({ page }) => {
    // user action
    // assertion
  });
});
```

---

## Authentication in Tests

Use reusable helpers when authentication is required.

```ts
import { login } from "./helpers/auth-helpers";

test.beforeEach(async ({ page }) => {
  await login(page);
});
```

---

## Selector Rules

✅ ALWAYS use semantic selectors:

```ts
page.getByRole("button", { name: "Submit" });
page.getByLabel("Email");
page.getByText("Success");
```

❌ NEVER rely on:

```ts
.page-container
#submit-btn
```

---

## 🚨 CRITICAL: Strict Mode & Scoped Locators

Playwright runs in **strict mode** by default - locators must match exactly ONE element.

### Common Pitfalls & Solutions

**Problem: Multiple elements with same role/name**
Pages often have duplicate links (header, breadcrumbs, footer). Example: "Home" link appears 4 times.

❌ **BAD - Will fail with strict mode violation:**
```ts
await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
await expect(page.getByRole("link", { name: "Media" })).toBeVisible();
```

✅ **GOOD - Scope to specific area:**
```ts
// Scope breadcrumb links to breadcrumb navigation
const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
await expect(breadcrumb.getByRole("link", { name: "Media" })).toBeVisible();

// Scope content to main area
const mainContent = page.getByRole("main");
await expect(mainContent.locator("h1").first()).toBeVisible();

// Scope to header navigation
const headerNav = page.getByRole("banner").getByRole("navigation");
await expect(headerNav.getByRole("link", { name: "Home" })).toBeVisible();

// Scope to footer
const footer = page.getByRole("contentinfo");
await expect(footer.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
```

### Use `.first()` When Multiple Matches Expected

When you know multiple elements exist and want the first one:

```ts
// Get first h1 in main content (avoids page hero h1)
const title = page.getByRole("main").locator("h1").first();
await expect(title).toBeVisible();

// Get first matching text
const notFoundText = page.getByText(/not found|404/i).first();
await expect(notFoundText).toBeVisible();
```

### Scoping Reference Table

| Area | Locator |
|------|---------|
| Header | `page.getByRole("banner")` |
| Main Content | `page.getByRole("main")` |
| Footer | `page.getByRole("contentinfo")` |
| Breadcrumbs | `page.getByRole("navigation", { name: "breadcrumb" })` |
| Header Nav | `page.getByRole("banner").getByRole("navigation")` |

---

## Connection Warm-up for Isolated Tests

Test blocks without `beforeEach` navigation may fail with SSL/connection errors.

❌ **BAD - Cold start can fail:**
```ts
test.describe("Direct URL Access", () => {
  test("should handle 404", async ({ page }) => {
    await page.goto("/non-existent-page"); // May fail with SSL error
  });
});
```

✅ **GOOD - Warm up connection first:**
```ts
test.describe("Direct URL Access", () => {
  test("should handle 404", async ({ page }) => {
    // Warm up connection
    await page.goto("/");
    
    // Now test the actual URL
    await page.goto("/non-existent-page");
    await expect(page.getByText(/not found|404/i).first()).toBeVisible();
  });
});
```

---

## Assertion Best Practices

❌ **BAD - Using .catch() for assertions:**
```ts
await expect(page.getByText("Success")).toBeVisible().catch(() => {
  expect(page.url()).toContain("success");
});
```

✅ **GOOD - Use proper timeout and single assertion:**
```ts
await expect(page.getByText("Success")).toBeVisible({ timeout: 10000 });
```

✅ **GOOD - Use soft assertions for optional checks:**
```ts
// For elements that may or may not exist
const hasElement = await page.getByText("Optional").isVisible().catch(() => false);
if (hasElement) {
  await expect(page.getByText("Optional")).toBeVisible();
}
```

---

## Waiting Rules

✅ GOOD:

```ts
await expect(page.getByText("Success")).toBeVisible();
await page.waitForURL("**/dashboard");
```

❌ BAD:

```ts
await page.waitForTimeout(1000);
```

---

## Test Behavior Rules

- Test user behavior, not implementation
- Tests must be independent
- Avoid shared state between tests
- Do not rely on test order

---

## API Mocking (Optional)

Mock APIs only when:

- backend is unavailable
- testing error states
- testing empty or edge scenarios

```ts
await page.route("**/api/tasks", (route) =>
  route.fulfill({
    status: 200,
    body: JSON.stringify({ success: true, data: [] }),
  }),
);
```

---

## Output Completion Rule

A feature is NOT COMPLETE unless:

- UI code is generated
- Types are defined (if applicable)
- AND Playwright tests are created

If tests are missing, generate them automatically.

---

## Final Rule

If unsure whether a test is required — **CREATE IT**.
