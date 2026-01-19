# Playwright E2E Tests

This directory contains end-to-end tests for the Next.js application using Playwright.

## Test Structure

```
e2e/
├── auth/                    # Authentication tests
│   └── authentication.spec.ts
├── programs/                # Programs feature tests
│   └── programs.spec.ts
├── fixtures/                # Reusable test fixtures
│   └── auth.ts
├── helpers/                 # Test helper functions
│   └── test-helpers.ts
└── README.md
```

## Prerequisites

1. Install Playwright:
```bash
npm install -D @playwright/test
npx playwright install
```

2. Ensure your Next.js app is configured to run on `http://localhost:3000`

3. Set up environment variables (optional):
```bash
# .env.test
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=testpassword
API_URL=http://localhost:8000
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test e2e/auth/authentication.spec.ts
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests for specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in UI mode
```bash
npx playwright test --ui
```

## Test Reports

After running tests, you can view the HTML report:
```bash
npx playwright show-report
```

## Writing Tests

### Best Practices

1. **Use stable selectors**:
   - Prefer `data-testid` attributes
   - Use semantic selectors (getByRole, getByLabel)
   - Avoid CSS selectors that might change

```typescript
// Good
await page.getByTestId('program-card').click();
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Search programs').fill('test');

// Avoid
await page.locator('.card-container > div:nth-child(2)').click();
```

2. **Wait for stability**:
   - Use proper waiting strategies
   - Wait for network to be idle
   - Wait for elements to be visible

```typescript
await page.waitForLoadState('networkidle');
await page.waitForSelector('[data-testid="programs-list"]', { state: 'visible' });
```

3. **Mock API calls when appropriate**:
```typescript
await mockApiResponse(page, /\/app\/list_programs/, mockData);
```

4. **Use helper functions** from `helpers/test-helpers.ts`:
```typescript
import { waitForNetworkIdle, mockApiResponse } from '../helpers/test-helpers';

await waitForNetworkIdle(page);
await mockApiResponse(page, /api-endpoint/, mockData);
```

5. **Test both success and failure scenarios**:
```typescript
test('should handle API errors gracefully', async ({ page }) => {
  await mockApiResponse(page, /api/, { error: 'Failed' }, 500);
  // Test error handling
});
```

## Adding data-testid Attributes

To make tests more stable, add `data-testid` attributes to your components:

```tsx
// Example: Program card component
<div data-testid="program-card">
  <h2 data-testid="program-title">{title}</h2>
  <p data-testid="program-description">{description}</p>
  <button data-testid="program-enroll">Enroll</button>
</div>

// Example: Search input
<input
  data-testid="search-input"
  type="search"
  placeholder="Search programs..."
/>

// Example: Pagination
<nav data-testid="pagination">
  <button data-testid="prev-page">Previous</button>
  <button data-testid="page-1">1</button>
  <button data-testid="next-page">Next</button>
</nav>
```

## Authentication Setup

Currently, the tests assume Clerk authentication is configured. To test authenticated flows:

1. Create test users in Clerk dashboard
2. Store test credentials securely
3. Use auth fixtures to authenticate before tests:

```typescript
import { test } from '../fixtures/auth';

test.use({ authenticatedPage: true });

test('authenticated test', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/programs');
  // Test authenticated functionality
});
```

## Continuous Integration

The tests are configured to run in CI with:
- Automatic retries on failure
- Screenshot and video capture on failure
- Parallel execution disabled for consistency

Example GitHub Actions workflow:

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Debugging Tips

1. **Use page.pause()** for interactive debugging:
```typescript
await page.pause();
```

2. **Take screenshots** during test execution:
```typescript
await page.screenshot({ path: 'screenshot.png' });
```

3. **Check console logs**:
```typescript
page.on('console', msg => console.log(msg.text()));
```

4. **Use test.step()** for better reporting:
```typescript
await test.step('Navigate to programs page', async () => {
  await page.goto('/programs');
});
```

## Known Limitations

1. **Clerk Authentication**: Current tests don't fully authenticate. You'll need to:
   - Set up test users
   - Implement auth fixtures with real credentials
   - Or mock Clerk authentication

2. **API Mocking**: Some tests mock API responses. Ensure mocks match actual API structure.

3. **Dynamic Selectors**: If you don't have `data-testid` attributes yet, tests use fallback selectors that may be fragile.

## Next Steps

1. Add `data-testid` attributes to all testable components
2. Implement full authentication flow in fixtures
3. Add tests for:
   - Workflows page
   - Media page
   - User profile
   - Reports
4. Set up CI/CD pipeline with test execution
5. Configure test coverage reporting
