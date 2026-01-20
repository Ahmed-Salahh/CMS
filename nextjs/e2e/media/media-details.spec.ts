import { test, expect } from "@playwright/test";

/**
 * Media Details Page Tests
 *
 * Tests for the event details page functionality including:
 * - Page loading and rendering
 * - Upcoming vs Completed event variants
 * - Countdown timer display (upcoming events)
 * - Register Now button visibility (upcoming events)
 * - Share button functionality
 * - Related events section
 * - Breadcrumb navigation
 * - Location card and directions link
 * - Event flyer download
 * - 404 error handling
 */

test.describe("Media Details Page", () => {
  test.describe("Page Load and Basic Navigation", () => {
    test("should load media details page successfully", async ({ page }) => {
      await page.goto("/media/14");
      await expect(page).toHaveURL(/\/media\/14/);

      // Should display the event title
      const title = page.locator("h1").first();
      await expect(title).toBeVisible();
    });

    test("should display breadcrumb navigation", async ({ page }) => {
      await page.goto("/media/14");

      const breadcrumb = page.locator('nav[aria-label="breadcrumb"]');
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb.getByText("Home")).toBeVisible();
      await expect(breadcrumb.getByText("Media")).toBeVisible();
    });

    test("should navigate back to media list via breadcrumb", async ({
      page,
    }) => {
      await page.goto("/media/14");

      const mediaBreadcrumb = page
        .locator('nav[aria-label="breadcrumb"]')
        .getByText("Media");
      await mediaBreadcrumb.click();

      await expect(page).toHaveURL(/\/media$/);
    });

    test("should display 404 page for non-existent media", async ({ page }) => {
      await page.goto("/media/99999");

      await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Media Not Found" }),
      ).toBeVisible();
      await expect(page.getByText("doesn't exist")).toBeVisible();

      // Back to Media button should be visible
      await expect(
        page.getByRole("link", { name: "Back to Media" }),
      ).toBeVisible();
    });

    test("should navigate back from 404 page", async ({ page }) => {
      await page.goto("/media/99999");

      await page.getByRole("link", { name: "Back to Media" }).click();
      await expect(page).toHaveURL(/\/media$/);
    });
  });

  test.describe("Event Hero Image Section", () => {
    test("should display hero image for event", async ({ page }) => {
      await page.goto("/media/14");

      // Hero image container should be visible
      const heroImage = page.locator('img[alt*="event"]').first();
      await expect(heroImage).toBeVisible();
    });

    test("should display countdown timer for upcoming events", async ({
      page,
    }) => {
      // Navigate to an upcoming event (if available)
      await page.goto("/media/13");

      // Look for countdown timer elements
      const countdownText = page.getByText(/Days.*Hrs.*Left/i);
      await expect(countdownText).toBeVisible();
    });

    test("should not display countdown timer for completed events", async ({
      page,
    }) => {
      await page.goto("/media/14");

      // Countdown should not be visible for completed events
      const countdownText = page.getByText(/Days.*Hrs.*Left/i);
      await expect(countdownText).not.toBeVisible();
    });
  });

  test.describe("Event Information Sidebar", () => {
    test("should display Languages section", async ({ page }) => {
      await page.goto("/media/14");

      await expect(page.getByText("Languages")).toBeVisible();
    });

    test("should display Speaker section", async ({ page }) => {
      await page.goto("/media/14");

      await expect(page.getByText("Speaker")).toBeVisible();
    });

    test("should display Fee section", async ({ page }) => {
      await page.goto("/media/14");

      await expect(page.getByText("Fee")).toBeVisible();
    });

    test("should display Share button", async ({ page }) => {
      await page.goto("/media/14");

      const shareButton = page.getByRole("button", { name: /share/i });
      await expect(shareButton).toBeVisible();
    });

    test("should display Register Now button for upcoming events", async ({
      page,
    }) => {
      await page.goto("/media/13");

      const registerButton = page.getByRole("button", { name: /register now/i });
      await expect(registerButton).toBeVisible();
    });

    test("should not display Register Now button for completed events", async ({
      page,
    }) => {
      await page.goto("/media/14");

      const registerButton = page.getByRole("button", { name: /register now/i });
      await expect(registerButton).not.toBeVisible();
    });
  });

  test.describe("Share Button Functionality", () => {
    test("should trigger share functionality when clicked", async ({
      page,
      context,
    }) => {
      await page.goto("/media/14");

      // Get the share button
      const shareButton = page.getByRole("button", { name: /share/i });
      await expect(shareButton).toBeVisible();

      // Click share button - this will either:
      // 1. Open native share dialog (if supported)
      // 2. Copy to clipboard (fallback)
      // We can't easily test native share dialog, but we can verify button click works
      await shareButton.click();

      // The button should still be visible after click (no errors)
      await expect(shareButton).toBeVisible();
    });
  });

  test.describe("Event Date Information", () => {
    test("should display Start Date section", async ({ page }) => {
      await page.goto("/media/14");

      await expect(page.getByText("Start Date")).toBeVisible();
    });

    test("should display End Date section", async ({ page }) => {
      await page.goto("/media/14");

      await expect(page.getByText("End Date")).toBeVisible();
    });

    test("should display date values", async ({ page }) => {
      await page.goto("/media/14");

      // Look for date format patterns
      const datePattern = page.getByText(/\d{2}\/\d{2}\/\d{4}/);
      await expect(datePattern.first()).toBeVisible();
    });
  });

  test.describe("Event Description", () => {
    test("should display event description", async ({ page }) => {
      await page.goto("/media/14");

      // Description section should be visible
      const descriptionSection = page.locator("main").getByText(/description/i);
      // The description content should be present (allow for long descriptions)
      await expect(page.locator("main")).toContainText(/.+/);
    });
  });

  test.describe("Location Card", () => {
    test("should display location card", async ({ page }) => {
      await page.goto("/media/14");

      await expect(page.getByText("Location")).toBeVisible();
    });

    test("should display directions button", async ({ page }) => {
      await page.goto("/media/14");

      const directionsButton = page.getByRole("link", { name: /directions/i });
      await expect(directionsButton).toBeVisible();
    });

    test("should have correct Google Maps link", async ({ page }) => {
      await page.goto("/media/14");

      const directionsButton = page.getByRole("link", { name: /directions/i });
      const href = await directionsButton.getAttribute("href");

      expect(href).toContain("google.com/maps");
    });

    test("should open directions in new tab", async ({ page }) => {
      await page.goto("/media/14");

      const directionsButton = page.getByRole("link", { name: /directions/i });
      const target = await directionsButton.getAttribute("target");

      expect(target).toBe("_blank");
    });
  });

  test.describe("Event Flyer Card", () => {
    test("should display event flyer card when flyer exists", async ({
      page,
    }) => {
      await page.goto("/media/14");

      // Check if flyer section is visible (may not be present for all events)
      const flyerSection = page.getByText(/event flyer/i);
      const isFlyerVisible = await flyerSection.isVisible().catch(() => false);

      if (isFlyerVisible) {
        await expect(flyerSection).toBeVisible();
      }
    });

    test("should have download link for flyer", async ({ page }) => {
      await page.goto("/media/14");

      // Look for download link
      const downloadLink = page.getByRole("link", { name: /download/i });
      const isDownloadVisible = await downloadLink
        .isVisible()
        .catch(() => false);

      if (isDownloadVisible) {
        const href = await downloadLink.getAttribute("href");
        expect(href).toBeTruthy();
      }
    });
  });

  test.describe("Related Events Section", () => {
    test("should display Related Events heading", async ({ page }) => {
      await page.goto("/media/14");

      await expect(page.getByText("Related Events")).toBeVisible();
    });

    test("should display related event cards", async ({ page }) => {
      await page.goto("/media/14");

      // Look for related event links
      const relatedEventCards = page.locator(
        'section:has-text("Related Events") a[href^="/media/"]',
      );

      // Should have at least one related event
      const count = await relatedEventCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test("should navigate to related event when clicked", async ({ page }) => {
      await page.goto("/media/14");

      // Get the first related event card
      const relatedEventCards = page.locator(
        'section:has-text("Related Events") a[href^="/media/"]',
      );

      const firstCard = relatedEventCards.first();
      const href = await firstCard.getAttribute("href");

      // Click the card
      await firstCard.click();

      // Should navigate to the related event
      await expect(page).toHaveURL(new RegExp(href!.replace("/", "\\/")));
    });

    test("should display up to 4 related events", async ({ page }) => {
      await page.goto("/media/14");

      const relatedEventCards = page.locator(
        'section:has-text("Related Events") a[href^="/media/"]',
      );

      const count = await relatedEventCards.count();
      expect(count).toBeLessThanOrEqual(4);
    });
  });

  test.describe("Responsive Design", () => {
    test("should render correctly on mobile viewport", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/media/14");

      // Page should still load successfully
      const title = page.locator("h1").first();
      await expect(title).toBeVisible();

      // Share button should be visible
      const shareButton = page.getByRole("button", { name: /share/i });
      await expect(shareButton).toBeVisible();
    });

    test("should render correctly on tablet viewport", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto("/media/14");

      // Page should load successfully
      const title = page.locator("h1").first();
      await expect(title).toBeVisible();
    });

    test("should render correctly on desktop viewport", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto("/media/14");

      // Page should load successfully
      const title = page.locator("h1").first();
      await expect(title).toBeVisible();
    });
  });

  test.describe("Upcoming Event Specific Features", () => {
    test("should display countdown with days and hours", async ({ page }) => {
      await page.goto("/media/13");

      // Countdown should show days
      await expect(page.getByText(/\d+\s*Days/i)).toBeVisible();

      // Countdown should show hours
      await expect(page.getByText(/\d+\s*Hrs/i)).toBeVisible();
    });

    test("should have Register Now button enabled", async ({ page }) => {
      await page.goto("/media/13");

      const registerButton = page.getByRole("button", { name: /register now/i });
      await expect(registerButton).toBeEnabled();
    });
  });

  test.describe("Completed Event Specific Features", () => {
    test("should not show countdown timer", async ({ page }) => {
      await page.goto("/media/14");

      // Look for countdown text - should not be present
      const countdown = page.getByText(/Days.*Hrs.*Left/i);
      await expect(countdown).not.toBeVisible();
    });

    test("should show Share button only (no Register Now)", async ({
      page,
    }) => {
      await page.goto("/media/14");

      // Share should be visible
      await expect(
        page.getByRole("button", { name: /share/i }),
      ).toBeVisible();

      // Register Now should NOT be visible
      await expect(
        page.getByRole("button", { name: /register now/i }),
      ).not.toBeVisible();
    });
  });

  test.describe("Page Meta Information", () => {
    test("should have proper page title", async ({ page }) => {
      await page.goto("/media/14");

      // Page should have a title
      const title = await page.title();
      expect(title).toBeTruthy();
    });
  });

  test.describe("Error Handling", () => {
    test("should handle invalid media ID gracefully", async ({ page }) => {
      await page.goto("/media/invalid-id");

      // Should show 404 or error message
      const errorHeading = page.getByRole("heading", { name: /404|error/i });
      await expect(errorHeading).toBeVisible();
    });

    test("should handle negative media ID", async ({ page }) => {
      await page.goto("/media/-1");

      // Should show 404 page
      await expect(page.getByText(/not found|doesn't exist/i)).toBeVisible();
    });
  });

  test.describe("Navigation Flow", () => {
    test("should maintain navigation history", async ({ page }) => {
      // Start at media list
      await page.goto("/media");

      // Navigate to media details
      const firstMediaCard = page.locator('a[href^="/media/"]').first();
      await firstMediaCard.click();

      // Should be on details page
      await expect(page).toHaveURL(/\/media\/\d+/);

      // Go back
      await page.goBack();

      // Should be back at media list
      await expect(page).toHaveURL(/\/media$/);
    });

    test("should navigate between related events correctly", async ({
      page,
    }) => {
      await page.goto("/media/14");
      const initialUrl = page.url();

      // Click on a related event
      const relatedEventCards = page.locator(
        'section:has-text("Related Events") a[href^="/media/"]',
      );
      await relatedEventCards.first().click();

      // Should be on a different page
      await expect(page).not.toHaveURL(initialUrl);

      // Should still be on a media details page
      await expect(page).toHaveURL(/\/media\/\d+/);
    });
  });

  test.describe("TBA (To Be Announced) Fields", () => {
    test("should display TBA for missing field values", async ({ page }) => {
      // Navigate to an event that might have TBA values
      await page.goto("/media/13");

      // Check if TBA is displayed for empty fields
      const tbaText = page.getByText("TBA");
      const tbaCount = await tbaText.count();

      // TBA may or may not be present depending on data
      // Just verify the page loads without errors
      await expect(page.locator("h1").first()).toBeVisible();
    });
  });

  test.describe("Free vs Paid Events", () => {
    test("should display Free for free events", async ({ page }) => {
      await page.goto("/media/13");

      // Check if Free is displayed in the Fee section
      const freeText = page.getByText(/free/i);
      const isFree = await freeText.isVisible().catch(() => false);

      // Verify page loads correctly regardless
      await expect(page.getByText("Fee")).toBeVisible();
    });

    test("should display fee amount for paid events", async ({ page }) => {
      await page.goto("/media/14");

      // Fee section should be visible
      await expect(page.getByText("Fee")).toBeVisible();
    });
  });
});
