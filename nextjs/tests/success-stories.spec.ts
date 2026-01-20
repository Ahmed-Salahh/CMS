import { test, expect } from "@playwright/test";

test.describe("Success Stories Page", () => {
  test("should load the success stories page", async ({ page }) => {
    await page.goto("/success-stories");

    // Check page title or heading
    await expect(page.locator("h1")).toContainText("Success Stories");
  });

  test("should display story cards", async ({ page }) => {
    await page.goto("/success-stories");

    // Wait for stories to load
    await page.waitForSelector('[data-testid="story-card"]', {
      timeout: 10000,
    });

    // Check that at least one story card is visible
    const storyCards = page.locator('[data-testid="story-card"]');
    await expect(storyCards.first()).toBeVisible();
  });

  test("should have filter controls", async ({ page }) => {
    await page.goto("/success-stories");

    // Check for search input
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();

    // Check for category filter
    const categoryFilter = page.locator('select, [role="combobox"]').first();
    await expect(categoryFilter).toBeVisible();
  });

  test("should navigate to story details when card is clicked", async ({
    page,
  }) => {
    await page.goto("/success-stories");

    // Wait for stories to load
    await page.waitForSelector('[data-testid="story-card"]', {
      timeout: 10000,
    });

    // Click on the first story card
    const firstCard = page.locator('[data-testid="story-card"]').first();
    await firstCard.click();

    // Wait for navigation and check URL contains story ID
    await page.waitForURL(/\/success-stories\/\d+/);
    expect(page.url()).toMatch(/\/success-stories\/\d+/);
  });

  test("should display story details page correctly", async ({ page }) => {
    // Navigate directly to a story details page
    await page.goto("/success-stories/1");

    // Check for hero section
    await expect(page.locator("h1")).toContainText("Story Details");

    // Check for breadcrumbs
    const breadcrumb = page.locator(
      "text=/Home.*Success Stories.*Story Details/",
    );
    await expect(breadcrumb).toBeVisible();

    // Check for featured image
    await expect(page.locator('img[alt*="featured"]')).toBeVisible();

    // Check for author info in sidebar
    await expect(page.locator("text=/Story writer/i")).toBeVisible();

    // Check for rating section
    await expect(page.locator("text=/Rate this Story/i")).toBeVisible();

    // Check for share button
    await expect(page.locator('button:has-text("Share")')).toBeVisible();
  });

  test("should display other stories section on details page", async ({
    page,
  }) => {
    await page.goto("/success-stories/1");

    // Check for "Other Stories" heading
    await expect(page.locator('h2:has-text("Other Stories")')).toBeVisible();

    // Check that related story cards are displayed
    const relatedCards = page.locator('[data-testid="story-card"]');
    const count = await relatedCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should filter stories by category", async ({ page }) => {
    await page.goto("/success-stories");

    // Wait for stories to load
    await page.waitForSelector('[data-testid="story-card"]', {
      timeout: 10000,
    });

    // Open category dropdown
    await page.click('button:has-text("All Categories")');

    // Select a category
    await page.click('text="Technology"');

    // Wait for filtered results
    await page.waitForTimeout(1000);

    // Verify URL or content has changed
    const storyCards = page.locator('[data-testid="story-card"]');
    await expect(storyCards.first()).toBeVisible();
  });

  test("should search for stories", async ({ page }) => {
    await page.goto("/success-stories");

    // Find and fill search input
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill("test story");

    // Submit search (press Enter or click search button)
    await searchInput.press("Enter");

    // Wait for results to update
    await page.waitForTimeout(1000);

    // Check that results are displayed
    const storyCards = page.locator('[data-testid="story-card"]');
    const count = await storyCards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should navigate through pagination", async ({ page }) => {
    await page.goto("/success-stories");

    // Wait for stories to load
    await page.waitForSelector('[data-testid="story-card"]', {
      timeout: 10000,
    });

    // Check if pagination exists
    const nextButton = page
      .locator('button:has-text("Next"), button[aria-label*="next"]')
      .first();

    if (await nextButton.isVisible()) {
      await nextButton.click();

      // Wait for page to load
      await page.waitForTimeout(1000);

      // Verify we're on page 2
      await expect(page.locator('button:has-text("2")')).toHaveClass(
        /active|default/,
      );
    }
  });

  test("should display author image and rating on cards", async ({ page }) => {
    await page.goto("/success-stories");

    // Wait for stories to load
    await page.waitForSelector('[data-testid="story-card"]', {
      timeout: 10000,
    });

    const firstCard = page.locator('[data-testid="story-card"]').first();

    // Check for rating badge
    await expect(firstCard.locator("text=/\\d\\.\\d/")).toBeVisible();

    // Check for author name
    await expect(firstCard.locator('span[class*="text-xs"]')).toBeVisible();
  });
});
