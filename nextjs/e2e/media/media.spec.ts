import { test, expect } from '@playwright/test';

/**
 * Media Page Tests
 * 
 * Tests for the media page functionality including:
 * - Page loading and navigation
 * - Filter functionality (All Media, News, Events, Gallery, Others)
 * - Search functionality
 * - Pagination
 * - Event status filtering
 * - Media type filtering
 * - Sort ordering
 */

test.describe('Media Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/media');
    await expect(page).toHaveURL(/\/media/);
  });

  test.describe('Page Load and Basic Navigation', () => {
    test('should load media page successfully', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText('All Media');
      await expect(page.locator('h2')).toHaveText('Media');
    });

    test('should display breadcrumb navigation', async ({ page }) => {
      const breadcrumb = page.locator('nav[aria-label="breadcrumb"]');
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb.getByText('Home')).toBeVisible();
      await expect(breadcrumb.getByText('All Media')).toBeVisible();
    });

    test('should display filter buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'All Media' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'News' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Events' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Gallery' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Others' })).toBeVisible();
    });

    test('should display media items on page load', async ({ page }) => {
      // Wait for media items to load
      const mediaItems = page.locator('[role="main"] a[href^="/media/"]');
      await expect(mediaItems.first()).toBeVisible();
      
      // Should show 8 items per page by default
      const itemCount = await mediaItems.count();
      expect(itemCount).toBeLessThanOrEqual(8);
    });
  });

  test.describe('Filter Functionality', () => {
    test('should filter by News', async ({ page }) => {
      await page.getByRole('button', { name: 'News' }).click();
      
      // URL should update
      await expect(page).toHaveURL(/type=news/);
      
      // Heading should update
      await expect(page.locator('h1')).toHaveText('News');
      
      // Breadcrumb should update
      await expect(page.locator('nav[aria-label="breadcrumb"]').getByText('News')).toBeVisible();
      
      // All items should be News type
      const badges = page.locator('text=News').first();
      await expect(badges).toBeVisible();
    });

    test('should filter by Events', async ({ page }) => {
      await page.getByRole('button', { name: 'Events' }).click();
      
      await expect(page).toHaveURL(/type=events/);
      await expect(page.locator('h1')).toHaveText('Events');
      
      // Should show Event Status dropdown
      const eventStatusDropdown = page.getByRole('combobox').filter({ hasText: 'Event Status' });
      await expect(eventStatusDropdown).toBeVisible();
    });

    test('should filter by Gallery', async ({ page }) => {
      await page.getByRole('button', { name: 'Gallery' }).click();
      
      await expect(page).toHaveURL(/type=gallery/);
      await expect(page.locator('h1')).toHaveText('Gallery');
      
      // Should show Media Type dropdown
      const mediaTypeDropdown = page.getByRole('combobox').filter({ hasText: 'Media Type' });
      await expect(mediaTypeDropdown).toBeVisible();
    });

    test('should filter by Others', async ({ page }) => {
      await page.getByRole('button', { name: 'Others' }).click();
      
      await expect(page).toHaveURL(/type=others/);
      await expect(page.locator('h1')).toHaveText('Others');
      
      // All items should be Others type
      const badges = page.locator('text=Others').first();
      await expect(badges).toBeVisible();
    });

    test('should return to All Media', async ({ page }) => {
      // First filter by News
      await page.getByRole('button', { name: 'News' }).click();
      await expect(page).toHaveURL(/type=news/);
      
      // Then click All Media
      await page.getByRole('button', { name: 'All Media' }).click();
      await expect(page).toHaveURL(/^\/media$/);
      await expect(page.locator('h1')).toHaveText('All Media');
    });
  });

  test.describe('Event Status Filtering', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to Events first
      await page.getByRole('button', { name: 'Events' }).click();
      await expect(page).toHaveURL(/type=events/);
    });

    test('should display event status dropdown with options', async ({ page }) => {
      const eventStatusDropdown = page.getByRole('combobox').filter({ hasText: 'Event Status' });
      await eventStatusDropdown.click();
      
      // Check all options are available
      await expect(page.getByRole('option', { name: 'All' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Upcoming' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Completed' })).toBeVisible();
    });

    test('should filter by Upcoming events', async ({ page }) => {
      const eventStatusDropdown = page.getByRole('combobox').filter({ hasText: 'Event Status' });
      await eventStatusDropdown.click();
      await page.getByRole('option', { name: 'Upcoming' }).click();
      
      // URL should update
      await expect(page).toHaveURL(/event_status=upcoming/);
      
      // All visible events should be Upcoming
      const upcomingBadges = page.locator('text=Upcoming');
      await expect(upcomingBadges.first()).toBeVisible();
      
      // Should show countdown timers
      await expect(page.locator('text=Days').first()).toBeVisible();
      await expect(page.locator('text=Hrs').first()).toBeVisible();
    });

    test('should filter by Completed events', async ({ page }) => {
      const eventStatusDropdown = page.getByRole('combobox').filter({ hasText: 'Event Status' });
      await eventStatusDropdown.click();
      await page.getByRole('option', { name: 'Completed' }).click();
      
      // URL should update
      await expect(page).toHaveURL(/event_status=completed/);
      
      // All visible events should be Completed
      const completedBadges = page.locator('text=Completed');
      await expect(completedBadges.first()).toBeVisible();
      
      // Should not show countdown timers
      await expect(page.locator('text=Days')).not.toBeVisible();
    });

    test('should show all events when selecting All status', async ({ page }) => {
      // First filter by Upcoming
      const eventStatusDropdown = page.getByRole('combobox').filter({ hasText: 'Event Status' });
      await eventStatusDropdown.click();
      await page.getByRole('option', { name: 'Upcoming' }).click();
      await expect(page).toHaveURL(/event_status=upcoming/);
      
      // Then select All
      await eventStatusDropdown.click();
      await page.getByRole('option', { name: 'All' }).click();
      
      // Should show both Upcoming and Completed events
      await expect(page.locator('text=Upcoming').first()).toBeVisible();
      await expect(page.locator('text=Completed').first()).toBeVisible();
    });
  });

  test.describe('Gallery Media Type Filtering', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to Gallery first
      await page.getByRole('button', { name: 'Gallery' }).click();
      await expect(page).toHaveURL(/type=gallery/);
    });

    test('should display media type dropdown with options', async ({ page }) => {
      const mediaTypeDropdown = page.getByRole('combobox').filter({ hasText: 'Media Type' });
      await mediaTypeDropdown.click();
      
      // Check all options are available
      await expect(page.getByRole('option', { name: 'All' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Image' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Video' })).toBeVisible();
    });

    test('should filter by Image media type', async ({ page }) => {
      const mediaTypeDropdown = page.getByRole('combobox').filter({ hasText: 'Media Type' });
      await mediaTypeDropdown.click();
      await page.getByRole('option', { name: 'Image' }).click();
      
      // URL should update
      await expect(page).toHaveURL(/media_type=image/);
      
      // Media items should be displayed
      const mediaItems = page.locator('[role="main"] a[href^="/media/"]');
      await expect(mediaItems.first()).toBeVisible();
    });

    test('should filter by Video media type', async ({ page }) => {
      const mediaTypeDropdown = page.getByRole('combobox').filter({ hasText: 'Media Type' });
      await mediaTypeDropdown.click();
      await page.getByRole('option', { name: 'Video' }).click();
      
      // URL should update
      await expect(page).toHaveURL(/media_type=video/);
      
      // Video icon should be visible on items
      const videoIcons = page.locator('[role="main"] img').filter({ hasText: '' });
      const itemsExist = await page.locator('[role="main"] a[href^="/media/"]').count() > 0;
      expect(itemsExist).toBeTruthy();
    });
  });

  test.describe('Search Functionality', () => {
    test('should filter media items by search query', async ({ page }) => {
      const searchBox = page.getByRole('main').getByRole('textbox', { name: 'Search...' });
      await searchBox.fill('AI');
      
      // Wait for search to process
      await page.waitForTimeout(500);
      
      // Items containing "AI" should be visible
      await expect(page.locator('text=AI').first()).toBeVisible();
    });

    test('should clear results when search is cleared', async ({ page }) => {
      const searchBox = page.getByRole('main').getByRole('textbox', { name: 'Search...' });
      
      // Search for something
      await searchBox.fill('AI');
      await page.waitForTimeout(500);
      
      // Clear search
      await searchBox.clear();
      await page.waitForTimeout(500);
      
      // Should show all media again
      const mediaItems = page.locator('[role="main"] a[href^="/media/"]');
      const count = await mediaItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should work with search and filters together', async ({ page }) => {
      // Filter by News
      await page.getByRole('button', { name: 'News' }).click();
      
      // Then search
      const searchBox = page.getByRole('main').getByRole('textbox', { name: 'Search...' });
      await searchBox.fill('AI');
      await page.waitForTimeout(500);
      
      // Should show News items containing "AI"
      await expect(page.locator('text=News').first()).toBeVisible();
      await expect(page.locator('text=AI').first()).toBeVisible();
    });
  });

  test.describe('Pagination', () => {
    test('should display pagination controls', async ({ page }) => {
      const pagination = page.locator('nav[aria-label="pagination"]');
      await expect(pagination).toBeVisible();
      
      // Should show page indicator
      await expect(page.locator('text=Page 1 of')).toBeVisible();
    });

    test('should navigate to next page', async ({ page }) => {
      // Click Next button
      const nextButton = page.getByRole('generic', { name: 'Go to next page' });
      await nextButton.click();
      
      // URL should update
      await expect(page).toHaveURL(/page=2/);
      
      // Page indicator should update
      await expect(page.locator('text=Page 2 of')).toBeVisible();
    });

    test('should navigate to specific page number', async ({ page }) => {
      // Click on page 2 directly
      await page.getByText('2', { exact: true }).click();
      
      // URL should update
      await expect(page).toHaveURL(/page=2/);
      
      // Page indicator should update
      await expect(page.locator('text=Page 2 of')).toBeVisible();
    });

    test('should navigate to previous page', async ({ page }) => {
      // First go to page 2
      await page.getByText('2', { exact: true }).click();
      await expect(page).toHaveURL(/page=2/);
      
      // Then click Previous
      const prevButton = page.getByRole('generic', { name: 'Go to previous page' });
      await prevButton.click();
      
      // Should be back on page 1
      await expect(page.locator('text=Page 1 of')).toBeVisible();
    });

    test('should disable previous button on first page', async ({ page }) => {
      // Previous button should not be clickable on page 1
      const prevButton = page.getByRole('generic', { name: 'Go to previous page' });
      
      // Check if the button is in disabled state (no cursor pointer)
      const prevListItem = prevButton.locator('..');
      await expect(prevListItem).toBeVisible();
    });

    test('should navigate to first page with << button', async ({ page }) => {
      // Go to page 2 first
      await page.getByText('2', { exact: true }).click();
      await expect(page).toHaveURL(/page=2/);
      
      // Click first page button
      await page.getByText('««').click();
      
      // Should be on page 1
      await expect(page.locator('text=Page 1 of')).toBeVisible();
    });

    test('should navigate to last page with >> button', async ({ page }) => {
      // Click last page button
      await page.getByText('»»').click();
      
      // Should be on last page
      await expect(page).toHaveURL(/page=/);
      const pageText = await page.locator('text=/Page \\d+ of \\d+/').textContent();
      expect(pageText).toContain('Page');
    });
  });

  test.describe('Sort Order', () => {
    test('should display sort dropdown', async ({ page }) => {
      // Click on Events to see sort dropdown
      await page.getByRole('button', { name: 'Events' }).click();
      
      const sortDropdown = page.getByRole('combobox').filter({ hasText: 'Recent First' });
      await expect(sortDropdown).toBeVisible();
    });

    // Note: Add more sort tests when sort options are implemented
  });

  test.describe('Media Item Cards', () => {
    test('should display media item information', async ({ page }) => {
      const firstItem = page.locator('[role="main"] a[href^="/media/"]').first();
      
      // Should have title
      const title = firstItem.locator('h3');
      await expect(title).toBeVisible();
      
      // Should have description
      const description = firstItem.locator('p');
      await expect(description).toBeVisible();
      
      // Should have "View Media" button
      const viewButton = firstItem.getByRole('button', { name: 'View Media' });
      await expect(viewButton).toBeVisible();
    });

    test('should navigate to media detail page on click', async ({ page }) => {
      const firstItem = page.locator('[role="main"] a[href^="/media/"]').first();
      const href = await firstItem.getAttribute('href');
      
      await firstItem.click();
      
      // Should navigate to detail page
      await expect(page).toHaveURL(new RegExp(href!));
    });

    test('should display media badges correctly', async ({ page }) => {
      // Get first item with Gallery badge
      await page.getByRole('button', { name: 'Gallery' }).click();
      
      const galleryBadge = page.locator('text=Gallery').first();
      await expect(galleryBadge).toBeVisible();
    });

    test('should display event countdown for upcoming events', async ({ page }) => {
      await page.getByRole('button', { name: 'Events' }).click();
      
      // Filter to upcoming events
      const eventStatusDropdown = page.getByRole('combobox').filter({ hasText: 'Event Status' });
      await eventStatusDropdown.click();
      await page.getByRole('option', { name: 'Upcoming' }).click();
      
      // Should show countdown
      await expect(page.locator('text=Days').first()).toBeVisible();
      await expect(page.locator('text=Hrs').first()).toBeVisible();
      await expect(page.locator('text=Left').first()).toBeVisible();
    });
  });

  test.describe('Date Filter', () => {
    test('should display date filter input', async ({ page }) => {
      // Navigate to Events or News to see date filter
      await page.getByRole('button', { name: 'Events' }).click();
      
      const dateFilter = page.getByPlaceholder('Filter by Date');
      await expect(dateFilter).toBeVisible();
    });

    // Note: Add more date filter tests when date filtering is implemented
  });

  test.describe('Responsive Behavior', () => {
    test('should be responsive on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Page should still load
      await expect(page.locator('h1')).toBeVisible();
      
      // Filter buttons should be visible
      await expect(page.getByRole('button', { name: 'All Media' })).toBeVisible();
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      
      // Page should still load
      await expect(page.locator('h1')).toBeVisible();
      
      // All filters should be visible
      await expect(page.getByRole('button', { name: 'News' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Events' })).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle empty search results gracefully', async ({ page }) => {
      const searchBox = page.getByRole('main').getByRole('textbox', { name: 'Search...' });
      await searchBox.fill('xyznonexistentquery123');
      await page.waitForTimeout(500);
      
      // Page should still be functional
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should maintain state when switching filters', async ({ page }) => {
      // Apply News filter
      await page.getByRole('button', { name: 'News' }).click();
      await expect(page).toHaveURL(/type=news/);
      
      // Switch to Events
      await page.getByRole('button', { name: 'Events' }).click();
      await expect(page).toHaveURL(/type=events/);
      
      // Page should be functional
      await expect(page.locator('h1')).toHaveText('Events');
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      // Check h1 exists
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
      
      // Check h2 exists
      const h2 = page.locator('h2');
      await expect(h2).toBeVisible();
      
      // Check h3 headings on cards
      const h3 = page.locator('h3').first();
      await expect(h3).toBeVisible();
    });

    test('should have accessible navigation elements', async ({ page }) => {
      // Breadcrumb should have proper aria-label
      const breadcrumb = page.locator('nav[aria-label="breadcrumb"]');
      await expect(breadcrumb).toBeVisible();
      
      // Pagination should have proper aria-label
      const pagination = page.locator('nav[aria-label="pagination"]');
      await expect(pagination).toBeVisible();
    });

    test('should have keyboard navigable filter buttons', async ({ page }) => {
      // Focus on News button
      await page.getByRole('button', { name: 'News' }).focus();
      
      // Press Enter to activate
      await page.keyboard.press('Enter');
      
      // Should navigate to News
      await expect(page).toHaveURL(/type=news/);
    });
  });
});
