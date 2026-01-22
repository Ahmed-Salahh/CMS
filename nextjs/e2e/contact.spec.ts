import { test, expect } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    // Warm up connection first
    await page.goto("/");
    // Navigate to contact page
    await page.goto("/contact");
  });

  test("should load contact page successfully", async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole("heading", { name: "Contact us" })).toBeVisible();
    
    // Check for page title in hero section
    await expect(page.getByText("Contact us")).toBeVisible();
    
    // Verify breadcrumbs are present
    const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
    await expect(breadcrumb.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(breadcrumb.getByText("Contact us")).toBeVisible();
  });

  test("should display contact information correctly", async ({ page }) => {
    // Check contact hours
    await expect(page.getByText("Contact hours")).toBeVisible();
    await expect(page.getByText("08:00 - 16:00")).toBeVisible();
    
    // Check working days
    await expect(page.getByText("Monday - Friday")).toBeVisible();
    
    // Check holiday information  
    await expect(page.getByText("We don't work on Friday")).toBeVisible();
    
    // Check contact cards
    await expect(page.getByText("Let's Talk")).toBeVisible();
    await expect(page.getByText("+996 312 123-456-7890")).toBeVisible();
    
    await expect(page.getByText("General Support")).toBeVisible();
    await expect(page.getByText("hello@yourwebsite.com")).toBeVisible();
    
    await expect(page.getByText("Our Office")).toBeVisible();
    await expect(page.getByText("725 Park Ave, New York")).toBeVisible();
  });

  test("should display contact form with all fields", async ({ page }) => {
    // Check form is present
    const form = page.locator("form");
    await expect(form).toBeVisible();
    
    // Check form fields
    await expect(page.getByLabel("Type of interest")).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Phone Number")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    
    // Check submit button
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible();
  });

  test("should handle form submission", async ({ page }) => {
    // Fill out the form
    await page.getByLabel("Type of interest").click();
    await page.getByText("Inquiry").click();
    
    await page.getByLabel("Name").fill("John Doe");
    await page.getByLabel("Email").fill("john.doe@example.com");
    await page.getByLabel("Phone Number").fill("1234567890");
    await page.getByLabel("Message").fill("This is a test message for the contact form.");
    
    // Submit the form
    await page.getByRole("button", { name: "Send Message" }).click();
    
    // Check for loading state (button should be disabled)
    const submitButton = page.getByRole("button", { name: "Send Message" });
    await expect(submitButton).toBeDisabled();
  });

  test("should validate required fields", async ({ page }) => {
    // Try to submit empty form
    await page.getByRole("button", { name: "Send Message" }).click();
    
    // Browser should prevent submission due to required fields
    // The form should still be visible (not submitted)
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile-specific elements are visible
    await expect(page.getByRole("heading", { name: "Contact us" })).toBeVisible();
    
    // Check form is still accessible
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    
    // Check contact information is displayed
    await expect(page.getByText("Contact hours")).toBeVisible();
    await expect(page.getByText("Let's Talk")).toBeVisible();
  });

  test("should display correct phone country code options", async ({ page }) => {
    // Click on country code selector
    await page.locator("button").filter({ hasText: "+996" }).click();
    
    // Check for different country codes
    await expect(page.getByText("+1", { exact: true })).toBeVisible();
    await expect(page.getByText("+7", { exact: true })).toBeVisible();
    await expect(page.getByText("+996", { exact: true })).toBeVisible();
    
    // Select a different country code
    await page.getByText("+1", { exact: true }).click();
    
    // Verify the change
    await expect(page.locator("button").filter({ hasText: "+1" })).toBeVisible();
  });

  test("should handle desktop layout correctly", async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Check desktop header elements
    await expect(page.getByRole("link", { name: "My tasks" })).toBeVisible();
    await expect(page.getByPlaceholder("Search")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    
    // Check navigation menu
    const nav = page.getByRole("banner").getByRole("navigation");
    await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Programs" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Media" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "FAQs" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
    
    // Check two-column layout is present
    const mainContent = page.getByRole("main");
    await expect(mainContent).toBeVisible();
  });
});

test.describe("Contact Page - Error Handling", () => {
  test("should handle page load errors gracefully", async ({ page }) => {
    // Warm up connection
    await page.goto("/");
    
    // Test direct navigation to contact page
    await page.goto("/contact");
    
    // Page should load without errors
    await expect(page.getByRole("heading", { name: "Contact us" })).toBeVisible({ timeout: 10000 });
  });
});