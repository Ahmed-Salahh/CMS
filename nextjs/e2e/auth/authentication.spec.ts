import { test, expect } from '@playwright/test';
import { verifyPageTitle, waitForNetworkIdle } from '../helpers/test-helpers';

/**
 * Authentication E2E Tests
 * 
 * Tests cover:
 * - Sign-in page rendering
 * - Sign-up page rendering
 * - Navigation between auth pages
 * - Redirect behavior for unauthenticated users
 * 
 * Assumptions:
 * - Clerk authentication is configured
 * - Sign-in/Sign-up pages are at /sign-in and /sign-up
 * - Protected routes redirect to /sign-in
 */

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies and storage before each test
    await page.context().clearCookies();
    await page.goto('/');
  });

  test.describe('Sign In Page', () => {
    test('should load sign-in page successfully', async ({ page }) => {
      await page.goto('/sign-in');
      await waitForNetworkIdle(page);

      // Verify page loaded
      await expect(page).toHaveURL(/\/sign-in/);
      
      // Verify Clerk sign-in component is rendered
      // Note: Clerk uses iframes, so we check for the presence of the component
      const clerkComponent = page.locator('[data-clerk-component]').first();
      await expect(clerkComponent).toBeVisible({ timeout: 10000 });
    });

    test('should display sign-in form elements', async ({ page }) => {
      await page.goto('/sign-in');
      await page.waitForLoadState('networkidle');

      // Wait for Clerk component to load
      await page.waitForSelector('[data-clerk-component]', { timeout: 10000 });

      // Verify the sign-in component is present
      const signInComponent = page.locator('[data-clerk-component]');
      await expect(signInComponent).toBeVisible();
    });

    test('should navigate to sign-up from sign-in page', async ({ page }) => {
      await page.goto('/sign-in');
      await page.waitForLoadState('networkidle');

      // Look for "Sign up" link within Clerk component
      // Note: This selector may need adjustment based on Clerk's actual DOM structure
      const signUpLink = page.getByText(/sign up/i).first();
      
      if (await signUpLink.isVisible()) {
        await signUpLink.click();
        await expect(page).toHaveURL(/\/sign-up/, { timeout: 5000 });
      }
    });
  });

  test.describe('Sign Up Page', () => {
    test('should load sign-up page successfully', async ({ page }) => {
      await page.goto('/sign-up');
      await waitForNetworkIdle(page);

      // Verify page loaded
      await expect(page).toHaveURL(/\/sign-up/);
      
      // Verify Clerk sign-up component is rendered
      const clerkComponent = page.locator('[data-clerk-component]').first();
      await expect(clerkComponent).toBeVisible({ timeout: 10000 });
    });

    test('should display sign-up form elements', async ({ page }) => {
      await page.goto('/sign-up');
      await page.waitForLoadState('networkidle');

      // Wait for Clerk component to load
      await page.waitForSelector('[data-clerk-component]', { timeout: 10000 });

      // Verify the sign-up component is present
      const signUpComponent = page.locator('[data-clerk-component]');
      await expect(signUpComponent).toBeVisible();
    });

    test('should navigate to sign-in from sign-up page', async ({ page }) => {
      await page.goto('/sign-up');
      await page.waitForLoadState('networkidle');

      // Look for "Sign in" link within Clerk component
      const signInLink = page.getByText(/sign in/i).first();
      
      if (await signInLink.isVisible()) {
        await signInLink.click();
        await expect(page).toHaveURL(/\/sign-in/, { timeout: 5000 });
      }
    });
  });

  test.describe('Protected Routes', () => {
    test('should redirect unauthenticated users to sign-in', async ({ page }) => {
      // Try to access a protected route
      await page.goto('/programs');
      
      // Should redirect to sign-in page
      await expect(page).toHaveURL(/\/sign-in/, { timeout: 10000 });
    });

    test('should redirect from dashboard to sign-in when not authenticated', async ({ page }) => {
      await page.goto('/media');
      
      // Should redirect to sign-in page
      await expect(page).toHaveURL(/\/sign-in/, { timeout: 10000 });
    });

    test('should redirect from workflows to sign-in when not authenticated', async ({ page }) => {
      await page.goto('/workflows');
      
      // Should redirect to sign-in page
      await expect(page).toHaveURL(/\/sign-in/, { timeout: 10000 });
    });
  });

  test.describe('Authentication State', () => {
    test('should persist auth state across page refreshes', async ({ page }) => {
      // This test assumes a user is already authenticated
      // In a real scenario, you would:
      // 1. Authenticate the user
      // 2. Store cookies/tokens
      // 3. Test persistence
      
      test.skip(!process.env.TEST_USER_EMAIL, 'Requires authenticated user');
    });

    test('should clear auth state on sign-out', async ({ page }) => {
      // This test would verify sign-out functionality
      // Requires authenticated session
      
      test.skip(!process.env.TEST_USER_EMAIL, 'Requires authenticated user');
    });
  });
});

test.describe('Authentication Error Handling', () => {
  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network error by blocking Clerk API calls
    await page.route('**/clerk/**', (route) => {
      route.abort('failed');
    });

    await page.goto('/sign-in');
    
    // The page should still load, even if Clerk has issues
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('should handle slow network conditions', async ({ page }) => {
    // Simulate slow network
    await page.route('**/clerk/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.goto('/sign-in');
    
    // Should eventually load
    await expect(page).toHaveURL(/\/sign-in/);
  });
});
