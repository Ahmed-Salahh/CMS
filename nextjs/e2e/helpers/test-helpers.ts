import { Page, expect } from '@playwright/test';

/**
 * Helper functions for common test operations
 */

/**
 * Wait for network to be idle
 */
export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Wait for element to be visible with custom timeout
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout = 10000
) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Check if element exists without failing the test
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { timeout: 1000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Fill form field with validation
 */
export async function fillField(
  page: Page,
  selector: string,
  value: string
) {
  const field = page.locator(selector);
  await expect(field).toBeVisible();
  await field.fill(value);
  await expect(field).toHaveValue(value);
}

/**
 * Click button and wait for navigation
 */
export async function clickAndNavigate(
  page: Page,
  selector: string,
  expectedUrl?: string
) {
  await page.locator(selector).click();
  if (expectedUrl) {
    await page.waitForURL(expectedUrl);
  }
}

/**
 * Get API response data
 */
export async function interceptApiCall(
  page: Page,
  urlPattern: string | RegExp
) {
  return await page.waitForResponse(
    (response) =>
      (typeof urlPattern === 'string'
        ? response.url().includes(urlPattern)
        : urlPattern.test(response.url())) && response.status() === 200
  );
}

/**
 * Mock API response
 */
export async function mockApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  responseData: any,
  status = 200
) {
  await page.route(urlPattern, (route) => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    });
  });
}

/**
 * Take a screenshot with custom name
 */
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
}

/**
 * Verify page title
 */
export async function verifyPageTitle(page: Page, expectedTitle: string) {
  await expect(page).toHaveTitle(new RegExp(expectedTitle, 'i'));
}

/**
 * Verify URL contains text
 */
export async function verifyUrlContains(page: Page, text: string) {
  await expect(page).toHaveURL(new RegExp(text));
}
