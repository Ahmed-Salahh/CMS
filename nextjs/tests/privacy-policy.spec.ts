import { test, expect } from "@playwright/test";

test.describe("Privacy Policy Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/privacy-policy");
  });

  test("should load page with hero section", async ({ page }) => {
    // Check page title in hero
    await expect(page.getByRole("heading", { name: "Privacy Policy", level: 1 })).toBeVisible();
    
    // Check breadcrumbs
    await expect(page.getByText("Home")).toBeVisible();
  });

  test("should display side navigation with all sections", async ({ page }) => {
    // Check sidebar title
    await expect(page.getByRole("heading", { name: "Privacy Policy", level: 2 })).toBeVisible();
    
    // Check for key navigation items
    await expect(page.getByRole("button", { name: "Us" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Contact Us" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Your Rights" })).toBeVisible();
    await expect(page.getByRole("button", { name: "COOKIE POLICY" })).toBeVisible();
  });

  test("should navigate to section when clicking nav item", async ({ page }) => {
    // Click on a navigation item
    await page.getByRole("button", { name: "Contact Us" }).click();
    
    // Check that the section is visible (scrolled into view)
    const contactSection = page.locator("#contact-us");
    await expect(contactSection).toBeVisible();
  });

  test("should filter navigation items when searching", async ({ page }) => {
    // Type in search
    await page.getByPlaceholder("Search...").fill("cookie");
    
    // Should show filtered items
    await expect(page.getByRole("button", { name: "COOKIE POLICY" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Cookies" })).toBeVisible();
    
    // Should hide non-matching items
    await expect(page.getByRole("button", { name: "Us" })).not.toBeVisible();
  });

  test("should display main content sections", async ({ page }) => {
    // Check for main content sections
    await expect(page.locator("#us")).toBeVisible();
    await expect(page.getByText("The Academy of Financial and Accounting Excellence")).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    // Check footer is present
    const footer = page.locator('[data-name="Footer"]');
    await expect(footer).toBeVisible();
  });

  test("should have topbar with navigation", async ({ page }) => {
    // Check topbar navigation items
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "About Us" })).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Page should still load
    await expect(page.getByRole("heading", { name: "Privacy Policy", level: 1 })).toBeVisible();
  });
});
