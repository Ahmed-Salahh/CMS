import { test as base } from '@playwright/test';

/**
 * Test fixtures for authentication
 * This provides reusable authenticated sessions across tests
 */

type AuthFixtures = {
  authenticatedPage: any;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Note: In a real scenario, you would:
    // 1. Sign in with valid Clerk credentials
    // 2. Store the session in browser storage/cookies
    // 3. Reuse the session for subsequent tests
    
    // For now, we'll assume you need to authenticate via Clerk UI
    // You may want to use Clerk's test tokens or mock authentication
    await page.goto('/sign-in');
    
    // TODO: Add actual authentication logic here
    // Example:
    // await page.getByTestId('email-input').fill('test@example.com');
    // await page.getByTestId('password-input').fill('testpassword');
    // await page.getByTestId('sign-in-button').click();
    // await page.waitForURL('/');
    
    await use(page);
  },
});

export { expect } from '@playwright/test';
