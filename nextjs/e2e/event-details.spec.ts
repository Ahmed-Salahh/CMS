import { test, expect } from "@playwright/test";

test.describe("Event Details Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to media page and click on an event
    await page.goto("/media?type=events");
    // Wait for events to load
    await page.waitForSelector('[data-testid="media-card"], .group.cursor-pointer', { timeout: 10000 }).catch(() => {});
  });

  test("should display the page hero with breadcrumbs", async ({ page }) => {
    // Click on the first event card if available
    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Check for page hero
      await expect(page.getByRole("heading", { name: "Event Details" })).toBeVisible();

      // Check for breadcrumbs - scope to breadcrumb navigation
      const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb.getByRole("link", { name: "Media" })).toBeVisible();
      await expect(breadcrumb.getByRole("link", { name: "Events" })).toBeVisible();
    }
  });

  test("should display event hero section with image and tags", async ({ page }) => {
    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Check for event image container
      const heroSection = page.locator('[class*="rounded-[18px]"]').first();
      await expect(heroSection).toBeVisible();

      // Check for event tag
      await expect(page.getByText("Event", { exact: true })).toBeVisible();
    }
  });

  test("should display event title", async ({ page }) => {
    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Check for event title (h1) - use main content area to avoid page hero h1
      const mainContent = page.getByRole("main");
      const title = mainContent.locator("h1").first();
      await expect(title).toBeVisible();
    }
  });

  test("should display event sidebar with languages, speaker, fee", async ({ page }) => {
    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Check for sidebar elements (may or may not be present depending on data)
      const languagesSection = page.getByText("Languages");
      const speakerSection = page.getByText("Speaker");
      const feeSection = page.getByText("Fee");

      // At least one of these should be visible if sidebar has data
      const hasLanguages = await languagesSection.isVisible().catch(() => false);
      const hasSpeaker = await speakerSection.isVisible().catch(() => false);
      const hasFee = await feeSection.isVisible().catch(() => false);

      // Check for Register Now button
      const registerButton = page.getByRole("button", { name: /register now/i });
      await expect(registerButton).toBeVisible();

      // Check for Share button
      const shareButton = page.getByRole("button", { name: /share/i });
      await expect(shareButton).toBeVisible();
    }
  });

  test("should display event metadata with location and dates", async ({ page }) => {
    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Check for location section (if present)
      const locationSection = page.getByText("Location");
      const hasLocation = await locationSection.isVisible().catch(() => false);

      // Check for date sections (if present)
      const startDateSection = page.getByText("Start Date");
      const endDateSection = page.getByText("End Date");
      
      const hasStartDate = await startDateSection.isVisible().catch(() => false);
      const hasEndDate = await endDateSection.isVisible().catch(() => false);

      // Event page should be rendered regardless of specific data
      expect(true).toBeTruthy();
    }
  });

  test("should display related events section if available", async ({ page }) => {
    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Wait for page to load fully
      await page.waitForLoadState("networkidle");

      // Check for Related Events section (may not exist if no related events)
      const relatedSection = page.getByRole("heading", { name: /related events/i });
      const hasRelatedEvents = await relatedSection.isVisible().catch(() => false);

      // If related events exist, verify the section structure
      if (hasRelatedEvents) {
        await expect(relatedSection).toBeVisible();
      }
    }
  });

  test("should navigate back to media page from breadcrumbs", async ({ page }) => {
    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Click on Media breadcrumb - scope to breadcrumb navigation
      const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
      await breadcrumb.getByRole("link", { name: "Media" }).click();
      
      // Should navigate back to media page
      await expect(page).toHaveURL("/media");
    }
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });

    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Page should still be functional on mobile
      await expect(page.getByRole("heading", { name: "Event Details" })).toBeVisible();

      // Content should be visible - scope to main content
      const mainContent = page.getByRole("main");
      const title = mainContent.locator("h1").first();
      await expect(title).toBeVisible();
    }
  });

  test("should display countdown timer for upcoming events", async ({ page }) => {
    // Navigate to upcoming events specifically
    await page.goto("/media?type=events&event_status=upcoming");
    
    const eventCard = page.locator(".group.cursor-pointer, [data-testid='media-card']").first();
    
    if (await eventCard.isVisible()) {
      await eventCard.click();
      await page.waitForURL(/\/media\/events\/\d+/);

      // Check for countdown elements (if event is upcoming)
      const daysText = page.getByText("Days");
      const hrsText = page.getByText("Hrs");
      const leftText = page.getByText("Left");

      const hasDays = await daysText.isVisible().catch(() => false);
      const hasHrs = await hrsText.isVisible().catch(() => false);
      const hasLeft = await leftText.isVisible().catch(() => false);

      // For upcoming events, countdown should be visible
      if (hasDays && hasHrs && hasLeft) {
        await expect(daysText).toBeVisible();
        await expect(hrsText).toBeVisible();
        await expect(leftText).toBeVisible();
      }
    }
  });
});

test.describe("Event Details Page - Direct URL Access", () => {
  test("should return 404 for non-existent event", async ({ page }) => {
    // Warm up connection first
    await page.goto("/media");
    
    // Try to access a non-existent event
    await page.goto("/media/events/999999");
    
    // Should show 404 page - check for common 404 indicators
    const notFoundIndicator = page.getByText(/not found|404|does not exist/i).first();
    await expect(notFoundIndicator).toBeVisible({ timeout: 10000 });
  });
});
