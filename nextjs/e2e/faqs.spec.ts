import { test, expect } from "@playwright/test";

test.describe("FAQs Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/faqs");
  });

  test("should load the FAQs page", async ({ page }) => {
    // Check page title is visible
    await expect(
      page.getByRole("heading", { name: "Frequently Asked Questions" })
    ).toBeVisible();
  });

  test("should display the page hero with breadcrumbs", async ({ page }) => {
    // Check breadcrumbs
    await expect(page.getByText("Home")).toBeVisible();
    await expect(page.getByText("FAQs").first()).toBeVisible();
  });

  test("should display the sidebar with category navigation", async ({
    page,
  }) => {
    // Check sidebar title
    await expect(page.getByText("Switch between sections")).toBeVisible();

    // Check search input
    await expect(page.getByPlaceholder("Search...")).toBeVisible();

    // Check category items
    await expect(page.getByRole("button", { name: "Payment" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Studying" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Degrees" })).toBeVisible();
  });

  test("should display FAQ categories with questions", async ({ page }) => {
    // Check Payment category
    await expect(
      page.getByRole("heading", { name: "Payment" }).first()
    ).toBeVisible();
    await expect(
      page.getByText("How do I update my account information?")
    ).toBeVisible();
    await expect(
      page.getByText("What payment methods are accepted?")
    ).toBeVisible();

    // Check Studying category
    await expect(
      page.getByRole("heading", { name: "Studying" }).first()
    ).toBeVisible();
    await expect(page.getByText("What is the program schedule?")).toBeVisible();

    // Check Degrees category
    await expect(
      page.getByRole("heading", { name: "Degrees" }).first()
    ).toBeVisible();
    await expect(
      page.getByText("What certifications will I receive?")
    ).toBeVisible();
  });

  test("should expand FAQ accordion when clicked", async ({ page }) => {
    // Find and click the first FAQ question
    const firstFaq = page.getByText("Are there any payment plans available?");
    await firstFaq.click();

    // Check that the answer is visible
    await expect(
      page.getByText(
        "Yes, we offer flexible payment plans for our programs. You can choose to pay in installments"
      )
    ).toBeVisible();

    // Check that helpful buttons are visible
    await expect(page.getByText("Helpful")).toBeVisible();
  });

  test("should collapse FAQ accordion when clicked again", async ({ page }) => {
    // Click to expand
    const faqQuestion = page.getByText(
      "Are there any payment plans available?"
    );
    await faqQuestion.click();

    // Verify it's expanded
    const answer = page.getByText(
      "Yes, we offer flexible payment plans for our programs. You can choose to pay in installments"
    );
    await expect(answer).toBeVisible();

    // Click again to collapse
    await faqQuestion.click();

    // Verify answer is hidden
    await expect(answer).not.toBeVisible();
  });

  test("should filter FAQs when searching", async ({ page }) => {
    // Type in search box
    const searchInput = page.getByPlaceholder("Search...");
    await searchInput.fill("payment");

    // Wait for filter to apply
    await page.waitForTimeout(300);

    // Payment related FAQs should still be visible
    await expect(
      page.getByText("What payment methods are accepted?")
    ).toBeVisible();
  });

  test("should navigate to category when sidebar item is clicked", async ({
    page,
  }) => {
    // Click on Studying category in sidebar
    await page.getByRole("button", { name: "Studying" }).click();

    // Wait for scroll
    await page.waitForTimeout(500);

    // Studying section should be in view
    const studyingSection = page.locator("#studying");
    await expect(studyingSection).toBeInViewport();
  });

  test("should display share button for each category", async ({ page }) => {
    // Check share buttons exist (one per category)
    const shareButtons = page.locator('[class*="Share2"], svg');
    await expect(shareButtons.first()).toBeVisible();
  });

  test("should display category descriptions", async ({ page }) => {
    // Check category descriptions
    await expect(
      page.getByText("Here you can find any payment related issues")
    ).toBeVisible();
    await expect(
      page.getByText("Here you can find any studying related issues")
    ).toBeVisible();
    await expect(
      page.getByText("Here you can find any degree related issues")
    ).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer is visible
    await expect(page.locator("footer")).toBeVisible();
  });
});
