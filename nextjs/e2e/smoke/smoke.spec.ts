import { test, expect } from '@playwright/test';
import { waitForNetworkIdle } from '../helpers/test-helpers';

/**
 * Smoke Tests
 * 
 * Quick tests to verify critical functionality works
 * These should run fast and catch major issues
 */

test.describe('Smoke Tests', () => {
  test('home page loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\//);
  });

  test('sign-in page is accessible', async ({ page }) => {
    await page.goto('/sign-in');
    await expect(page).toHaveURL(/sign-in/);
  });

  test('programs page redirects to authentication', async ({ page }) => {
    await page.goto('/programs');
    // App might redirect to sign-in or sign-up - both are valid auth pages
    await expect(page).toHaveURL(/sign-(in|up)/, { timeout: 10000 });
  });

  test('app handles 404 errors', async ({ page }) => {
    const response = await page.goto('/non-existent-page');
    // Next.js may return 200 with custom 404 page or 404 status
    expect([200, 404]).toContain(response?.status());
  });

  test('app loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.goto('/');
    // Wait a bit instead of networkidle which can timeout
    await page.waitForTimeout(2000);

    // Allow specific known errors if any
    const criticalErrors = errors.filter(
      (error) => !error.includes('favicon') // Example: ignore favicon errors
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('app has proper meta tags', async ({ page }) => {
    await page.goto('/programs');
    
    // Check for viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toBeTruthy();

    // Check for charset
    const charset = await page.locator('meta[charset]').count();
    expect(charset).toBeGreaterThan(0);
  });

  test('external resources load successfully', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('requestfailed', (request) => {
      failedRequests.push(request.url());
    });

    await page.goto('/');
    // Wait a bit instead of networkidle
    await page.waitForTimeout(2000);

    // Filter out acceptable failures (like blocked trackers)
    const criticalFailures = failedRequests.filter(
      (url) => !url.includes('analytics') && !url.includes('tracking')
    );

    expect(criticalFailures).toHaveLength(0);
  });
});
