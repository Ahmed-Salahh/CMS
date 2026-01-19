import { test, expect } from '@playwright/test';

/**
 * Example test demonstrating how to add data-testid attributes
 * 
 * This is a template for creating new tests
 */

test.describe('Example Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Navigate to page, authenticate, etc.
    await page.goto('/');
  });

  test('example test with best practices', async ({ page }) => {
    // Arrange: Set up test data
    const testData = { name: 'Test User' };

    // Act: Perform actions
    await page.getByTestId('action-button').click();

    // Assert: Verify results
    await expect(page.getByTestId('result')).toBeVisible();
  });

  test('example with multiple assertions', async ({ page }) => {
    // Multiple assertions for comprehensive testing
    await expect(page.getByTestId('header')).toBeVisible();
    await expect(page.getByTestId('header')).toContainText('Welcome');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  });

  test('example with user interactions', async ({ page }) => {
    // Fill form
    await page.getByTestId('name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('john@example.com');

    // Submit form
    await page.getByTestId('submit-button').click();

    // Wait for success message
    await expect(page.getByTestId('success-message')).toBeVisible();
  });

  test('example with API mocking', async ({ page }) => {
    // Mock API response
    await page.route('**/api/data', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [] }),
      });
    });

    await page.goto('/data-page');

    // Verify mocked data is used
    await expect(page.getByTestId('data-list')).toBeVisible();
  });

  test('example with error handling', async ({ page }) => {
    // Mock API error
    await page.route('**/api/data', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    await page.goto('/data-page');

    // Verify error message is displayed
    await expect(page.getByTestId('error-message')).toBeVisible();
    await expect(page.getByTestId('error-message')).toContainText('error');
  });
});

/**
 * How to add data-testid to your components:
 * 
 * React/Next.js components:
 * ```tsx
 * <button data-testid="submit-button">Submit</button>
 * <input data-testid="email-input" type="email" />
 * <div data-testid="result-container">{result}</div>
 * ```
 * 
 * Dynamic testids:
 * ```tsx
 * {programs.map((program) => (
 *   <div key={program.id} data-testid={`program-${program.id}`}>
 *     <h3 data-testid={`program-title-${program.id}`}>{program.title}</h3>
 *   </div>
 * ))}
 * ```
 * 
 * Conditional testids:
 * ```tsx
 * <button
 *   data-testid={isLoading ? 'loading-button' : 'submit-button'}
 *   disabled={isLoading}
 * >
 *   {isLoading ? 'Loading...' : 'Submit'}
 * </button>
 * ```
 */
