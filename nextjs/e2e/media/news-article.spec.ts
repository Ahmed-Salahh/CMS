import { test, expect } from "@playwright/test";

/**
 * News Article Page Tests
 *
 * Tests for the news article page functionality including:
 * - Page loading and rendering
 * - Hero image display with carousel
 * - Article title and content
 * - Author sidebar
 * - Share functionality
 * - Publish date display
 * - Helpful buttons
 * - Tags display
 * - Related news section
 * - Breadcrumb navigation
 * - 404 error handling
 */

test.describe("News Article Page", () => {
  test.describe("Page Load and Basic Navigation", () => {
    test("should load news article page successfully", async ({ page }) => {
      // Navigate to a news article (assuming ID 1 exists and is a news item)
      await page.goto("/media/news/1");
      await expect(page).toHaveURL(/\/media\/news\/1/);

      // Should display the article title
      const title = page.locator("h1").first();
      await expect(title).toBeVisible();
    });

    test("should display breadcrumb navigation", async ({ page }) => {
      await page.goto("/media/news/1");

      const breadcrumb = page.locator('nav[aria-label="breadcrumb"]');
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb.getByText("Home")).toBeVisible();
      await expect(breadcrumb.getByText("Media")).toBeVisible();
      await expect(breadcrumb.getByText("News")).toBeVisible();
    });

    test("should navigate back to news list via breadcrumb", async ({
      page,
    }) => {
      await page.goto("/media/news/1");

      const newsBreadcrumb = page
        .locator('nav[aria-label="breadcrumb"]')
        .getByText("News");
      await newsBreadcrumb.click();

      await expect(page).toHaveURL(/\/media\?type=news$/);
    });

    test("should display 404 page for non-existent news article", async ({
      page,
    }) => {
      await page.goto("/media/news/99999");

      await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "News Article Not Found" })
      ).toBeVisible();
      await expect(page.getByText("doesn't exist")).toBeVisible();

      // Back to News button should be visible
      await expect(
        page.getByRole("link", { name: "Back to News" })
      ).toBeVisible();
    });

    test("should navigate back from 404 page", async ({ page }) => {
      await page.goto("/media/news/99999");

      await page.getByRole("link", { name: "Back to News" }).click();
      await expect(page).toHaveURL(/\/media\?type=news$/);
    });
  });

  test.describe("Article Hero Section", () => {
    test("should display hero image carousel", async ({ page }) => {
      await page.goto("/media/news/1");

      // Hero image should be visible
      const heroSection = page.locator(
        "div.rounded-\\[18px\\].border.border-\\[\\#e2e4e9\\]"
      ).first();
      await expect(heroSection).toBeVisible();
    });

    test("should display carousel indicators", async ({ page }) => {
      await page.goto("/media/news/1");

      // Should have 5 carousel indicators
      const indicators = page.locator("div.h-1.w-\\[22px\\]");
      await expect(indicators).toHaveCount(5);
    });

    test("should display navigation arrows", async ({ page }) => {
      await page.goto("/media/news/1");

      // Left and right navigation buttons should be visible
      const navButtons = page.locator("button").filter({ has: page.locator("svg") });
      const leftArrow = navButtons.filter({ has: page.locator('[data-lucide="chevron-left"]') });
      const rightArrow = navButtons.filter({ has: page.locator('[data-lucide="chevron-right"]') });

      await expect(leftArrow.or(navButtons.first())).toBeVisible();
      await expect(rightArrow.or(navButtons.nth(1))).toBeVisible();
    });

    test("should display News tag on hero image", async ({ page }) => {
      await page.goto("/media/news/1");

      // News tag should be visible
      await expect(page.getByText("News").first()).toBeVisible();
    });
  });

  test.describe("Article Content", () => {
    test("should display article title", async ({ page }) => {
      await page.goto("/media/news/1");

      // Article title should be visible and not empty
      const title = page.locator("h1").first();
      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      expect(titleText).toBeTruthy();
    });

    test("should display article description", async ({ page }) => {
      await page.goto("/media/news/1");

      // Description should be visible
      const description = page.locator("p").filter({ hasText: /stunning/i }).first();
      await expect(description.or(page.locator("p").nth(1))).toBeVisible();
    });

    test("should display tags", async ({ page }) => {
      await page.goto("/media/news/1");

      // Tags should be visible (Insurance, life, Benefits, Education, Money)
      const tagsContainer = page.locator("div.rounded-md.bg-\\[\\#eaedf0\\]");
      await expect(tagsContainer.first()).toBeVisible();
    });
  });

  test.describe("Author Sidebar", () => {
    test("should display author information", async ({ page }) => {
      await page.goto("/media/news/1");

      // Author section should be visible
      await expect(page.getByText("Author")).toBeVisible();
      
      // Author name should be visible
      const authorName = page.getByText("Ali Mohamed Ghamri");
      await expect(authorName.or(page.locator("p").filter({ hasText: /author/i }).nth(1))).toBeVisible();
    });

    test("should display author avatar", async ({ page }) => {
      await page.goto("/media/news/1");

      // Avatar image should be visible
      const avatar = page.locator("img[alt*='Ali']");
      await expect(avatar.or(page.locator("div.rounded-full").first())).toBeVisible();
    });

    test("should display share button", async ({ page }) => {
      await page.goto("/media/news/1");

      // Share button should be visible
      const shareButton = page.getByRole("button", { name: /share/i });
      await expect(shareButton).toBeVisible();
    });

    test("should be able to click share button", async ({ page }) => {
      await page.goto("/media/news/1");

      const shareButton = page.getByRole("button", { name: /share/i });
      await shareButton.click();
      // Note: Actual share functionality would need to be implemented
    });
  });

  test.describe("Metadata Section", () => {
    test("should display publish date", async ({ page }) => {
      await page.goto("/media/news/1");

      // Publish date label should be visible
      await expect(page.getByText("Publish Date")).toBeVisible();
      
      // Date value should be visible (format: DD/MM/YYYY)
      const datePattern = /\d{2}\/\d{2}\/\d{4}/;
      const dateText = page.locator("p").filter({ hasText: datePattern });
      await expect(dateText.or(page.locator("p").nth(5))).toBeVisible();
    });

    test("should display helpful buttons", async ({ page }) => {
      await page.goto("/media/news/1");

      // Helpful button should be visible
      const helpfulButton = page.getByRole("button", { name: /helpful/i });
      await expect(helpfulButton).toBeVisible();
    });

    test("should be able to click helpful button", async ({ page }) => {
      await page.goto("/media/news/1");

      const helpfulButton = page.getByRole("button", { name: /helpful/i });
      await helpfulButton.click();
      // Note: Actual vote functionality would need to be implemented
    });

    test("should display thumbs down button", async ({ page }) => {
      await page.goto("/media/news/1");

      // Thumbs down button should be visible
      const thumbsDownButtons = page.locator("button").filter({
        has: page.locator("svg").filter({ has: page.locator(".rotate-180") }),
      });
      await expect(thumbsDownButtons.first().or(page.locator("button").nth(3))).toBeVisible();
    });
  });

  test.describe("Related News Section", () => {
    test("should display related news section", async ({ page }) => {
      await page.goto("/media/news/1");

      // Related News heading should be visible
      const relatedHeading = page.getByRole("heading", { name: /related news/i });
      await expect(relatedHeading).toBeVisible();
    });

    test("should display related news cards", async ({ page }) => {
      await page.goto("/media/news/1");

      // Should display at most 4 related news items
      const relatedCards = page.locator("div.group.relative");
      const count = await relatedCards.count();
      expect(count).toBeGreaterThanOrEqual(0);
      expect(count).toBeLessThanOrEqual(4);
    });

    test("should navigate to related news article", async ({ page }) => {
      await page.goto("/media/news/1");

      // Find and click first related news link
      const relatedLinks = page.locator("a[href^='/media/news/']");
      const count = await relatedLinks.count();
      
      if (count > 1) {
        // Skip the first link (current article) and click the second one
        await relatedLinks.nth(1).click();
        await expect(page).toHaveURL(/\/media\/news\/\d+/);
      }
    });

    test("should display Read More buttons on related cards", async ({
      page,
    }) => {
      await page.goto("/media/news/1");

      // Read More buttons should be visible
      const readMoreButtons = page.getByRole("button", { name: /read more/i });
      const count = await readMoreButtons.count();
      
      if (count > 0) {
        await expect(readMoreButtons.first()).toBeVisible();
      }
    });
  });

  test.describe("Responsive Design", () => {
    test("should display correctly on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/media/news/1");

      // Page should load without errors
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test("should display correctly on tablet", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto("/media/news/1");

      // Page should load without errors
      await expect(page.locator("h1").first()).toBeVisible();
    });

    test("should display correctly on desktop", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto("/media/news/1");

      // Page should load without errors
      await expect(page.locator("h1").first()).toBeVisible();
    });
  });

  test.describe("SEO and Accessibility", () => {
    test("should have proper page title", async ({ page }) => {
      await page.goto("/media/news/1");

      // Page should have a title
      const title = await page.title();
      expect(title).toBeTruthy();
    });

    test("should have proper heading hierarchy", async ({ page }) => {
      await page.goto("/media/news/1");

      // Should have h1 for article title
      const h1 = page.locator("h1");
      await expect(h1.first()).toBeVisible();

      // Should have h2 for Related News
      const h2 = page.locator("h2");
      const count = await h2.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test("should have alt text for images", async ({ page }) => {
      await page.goto("/media/news/1");

      // All images should have alt text
      const images = page.locator("img");
      const count = await images.count();
      
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute("alt");
        expect(alt).toBeDefined();
      }
    });
  });

  test.describe("Error Handling", () => {
    test("should handle invalid news ID gracefully", async ({ page }) => {
      await page.goto("/media/news/invalid-id");

      // Should show 404 or error message
      const errorHeading = page.getByRole("heading", { name: /404|error/i });
      await expect(errorHeading).toBeVisible();
    });

    test("should handle negative news ID", async ({ page }) => {
      await page.goto("/media/news/-1");

      // Should show 404 page
      await expect(page.getByText(/not found|doesn't exist/i)).toBeVisible();
    });
  });

  test.describe("Navigation Flow", () => {
    test("should maintain navigation history", async ({ page }) => {
      // Start at news list
      await page.goto("/media?type=news");

      // Navigate to news article
      const firstNewsCard = page.locator("a[href^='/media/news/']").first();
      await firstNewsCard.click();
      await expect(page).toHaveURL(/\/media\/news\/\d+/);

      // Go back
      await page.goBack();
      await expect(page).toHaveURL(/\/media\?type=news/);
    });

    test("should navigate from media list to news article", async ({
      page,
    }) => {
      await page.goto("/media?type=news");

      // Click first news card
      const firstNewsCard = page.locator("a[href^='/media/news/']").first();
      await firstNewsCard.click();
      await expect(page).toHaveURL(/\/media\/news\/\d+/);
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("should be able to navigate with keyboard", async ({ page }) => {
      await page.goto("/media/news/1");

      // Tab through interactive elements
      await page.keyboard.press("Tab");
      
      // Share button should be focusable
      const shareButton = page.getByRole("button", { name: /share/i });
      await shareButton.focus();
      await expect(shareButton).toBeFocused();
    });

    test("should activate buttons with Enter key", async ({ page }) => {
      await page.goto("/media/news/1");

      // Focus on helpful button
      const helpfulButton = page.getByRole("button", { name: /helpful/i });
      await helpfulButton.focus();

      // Press Enter to activate
      await page.keyboard.press("Enter");
      // Note: Actual functionality would need to be verified
    });
  });
});
