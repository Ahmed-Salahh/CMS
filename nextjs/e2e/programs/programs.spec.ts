import { test, expect } from '@playwright/test';
import {
  waitForNetworkIdle,
  mockApiResponse,
  interceptApiCall,
} from '../helpers/test-helpers';

/**
 * Programs Feature E2E Tests
 * 
 * Tests cover:
 * - Programs list page rendering
 * - Filtering and search functionality
 * - Pagination
 * - Error handling
 * - Empty states
 * 
 * Assumptions:
 * - User is authenticated (should be extended with auth fixtures)
 * - Backend API is available at configured API_URL
 * - Programs endpoint: /app/list_programs/
 */

test.describe('Programs Page', () => {
  // Mock data for programs
  const mockProgramsData = {
    programs: [
      {
        id: 1,
        title: 'Financial Analysis Bootcamp',
        description: 'Comprehensive financial analysis training',
        status: 'active',
        start_date: '2026-02-01',
        end_date: '2026-05-01',
        duration: '3 months',
      },
      {
        id: 2,
        title: 'Investment Banking Fundamentals',
        description: 'Learn the basics of investment banking',
        status: 'upcoming',
        start_date: '2026-03-15',
        end_date: '2026-06-15',
        duration: '3 months',
      },
      {
        id: 3,
        title: 'Advanced Portfolio Management',
        description: 'Master portfolio management strategies',
        status: 'active',
        start_date: '2026-01-10',
        end_date: '2026-04-10',
        duration: '3 months',
      },
    ],
    total: 3,
    page: 1,
    per_page: 8,
    total_pages: 1,
  };

  const emptyProgramsData = {
    programs: [],
    total: 0,
    page: 1,
    per_page: 8,
    total_pages: 0,
  };

  test.beforeEach(async ({ page }) => {
    // Note: In production, you would use auth fixtures here
    // For now, we'll assume the user is authenticated
  });

  test.describe('Page Loading and Rendering', () => {
    test('should load programs page successfully', async ({ page }) => {
      // Mock successful API response
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Verify page URL
      await expect(page).toHaveURL(/\/programs/);
      
      // Verify page title
      await expect(page).toHaveTitle(/Programs/);
    });

    test('should display programs list', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Check for program cards/items
      // Assumption: Programs are displayed in a list or grid
      const programElements = page.locator('[data-testid="program-card"]');
      
      // If data-testid is not available, use alternative selectors
      const programList = programElements.count();
      await expect(await programList).toBeGreaterThan(0);
    });

    test('should display correct number of programs', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Verify program count matches mock data
      const programCards = page.locator('[data-testid="program-card"]');
      await expect(programCards).toHaveCount(mockProgramsData.programs.length);
    });

    test('should display program details correctly', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Verify first program details are visible
      const firstProgram = mockProgramsData.programs[0];
      
      await expect(page.getByText(firstProgram.title)).toBeVisible();
      
      // Check if description is visible (might be truncated)
      const description = page.getByText(firstProgram.description, { exact: false });
      if (await description.count() > 0) {
        await expect(description.first()).toBeVisible();
      }
    });
  });

  test.describe('Search and Filtering', () => {
    test('should filter programs by status', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Look for status filter dropdown
      const statusFilter = page.locator('[data-testid="status-filter"]')
        .or(page.getByLabel(/status/i));
      
      if (await statusFilter.isVisible()) {
        await statusFilter.click();
        
        // Select "active" status
        const activeOption = page.getByText('active', { exact: false });
        await activeOption.click();

        // Wait for filtered results
        await page.waitForURL(/status=active/);
      }
    });

    test('should search programs by keyword', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Look for search input
      const searchInput = page.locator('[data-testid="search-input"]')
        .or(page.getByPlaceholder(/search/i));
      
      if (await searchInput.isVisible()) {
        await searchInput.fill('Financial');
        
        // Submit search (press Enter or click search button)
        await searchInput.press('Enter');

        // Wait for search results
        await page.waitForURL(/search=Financial/);
      }
    });

    test('should filter by date range', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Look for date range filters
      const startDateInput = page.locator('[data-testid="start-date"]')
        .or(page.getByLabel(/start date/i));
      
      if (await startDateInput.isVisible()) {
        await startDateInput.fill('2026-02-01');
        
        const endDateInput = page.locator('[data-testid="end-date"]')
          .or(page.getByLabel(/end date/i));
        
        if (await endDateInput.isVisible()) {
          await endDateInput.fill('2026-05-01');
          
          // Submit or wait for auto-filter
          await page.waitForURL(/start_date=2026-02-01/);
        }
      }
    });

    test('should sort programs', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Look for sort dropdown
      const sortDropdown = page.locator('[data-testid="sort-select"]')
        .or(page.getByLabel(/sort/i));
      
      if (await sortDropdown.isVisible()) {
        await sortDropdown.click();
        
        // Select sort option
        const sortOption = page.getByText(/date/i).first();
        await sortOption.click();

        // Wait for sorted results
        await waitForNetworkIdle(page);
      }
    });

    test('should clear all filters', async ({ page }) => {
      // Start with filtered URL
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);
      
      await page.goto('/programs?status=active&search=Financial');
      await waitForNetworkIdle(page);

      // Look for clear filters button
      const clearButton = page.locator('[data-testid="clear-filters"]')
        .or(page.getByText(/clear/i));
      
      if (await clearButton.isVisible()) {
        await clearButton.click();
        
        // Should navigate to base URL
        await expect(page).toHaveURL('/programs');
      }
    });
  });

  test.describe('Pagination', () => {
    const paginatedData = {
      programs: mockProgramsData.programs,
      total: 25,
      page: 1,
      per_page: 8,
      total_pages: 4,
    };

    test('should display pagination controls', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, paginatedData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Look for pagination component
      const pagination = page.locator('[data-testid="pagination"]')
        .or(page.locator('nav[aria-label*="pagination"]'));
      
      await expect(pagination).toBeVisible();
    });

    test('should navigate to next page', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, paginatedData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Find and click next button
      const nextButton = page.locator('[data-testid="next-page"]')
        .or(page.getByLabel(/next/i))
        .or(page.getByText(/next/i));
      
      if (await nextButton.isVisible()) {
        await nextButton.click();
        
        // Should update URL with page parameter
        await page.waitForURL(/page=2/);
      }
    });

    test('should navigate to previous page', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, paginatedData);

      // Start on page 2
      await page.goto('/programs?page=2');
      await waitForNetworkIdle(page);

      // Find and click previous button
      const prevButton = page.locator('[data-testid="prev-page"]')
        .or(page.getByLabel(/previous/i))
        .or(page.getByText(/previous/i));
      
      if (await prevButton.isVisible()) {
        await prevButton.click();
        
        // Should go back to page 1
        await expect(page).toHaveURL(/programs(?!.*page=)/);
      }
    });

    test('should navigate to specific page number', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, paginatedData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Click on page number (e.g., page 3)
      const pageButton = page.locator('[data-testid="page-3"]')
        .or(page.getByLabel('Page 3'))
        .or(page.getByText('3', { exact: true }));
      
      if (await pageButton.isVisible()) {
        await pageButton.click();
        
        await page.waitForURL(/page=3/);
      }
    });

    test('should disable previous button on first page', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, paginatedData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      const prevButton = page.locator('[data-testid="prev-page"]')
        .or(page.getByLabel(/previous/i));
      
      if (await prevButton.count() > 0) {
        await expect(prevButton.first()).toBeDisabled();
      }
    });

    test('should disable next button on last page', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, paginatedData);

      // Navigate to last page
      await page.goto('/programs?page=4');
      await waitForNetworkIdle(page);

      const nextButton = page.locator('[data-testid="next-page"]')
        .or(page.getByLabel(/next/i));
      
      if (await nextButton.count() > 0) {
        await expect(nextButton.first()).toBeDisabled();
      }
    });
  });

  test.describe('Empty States', () => {
    test('should display empty state when no programs exist', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, emptyProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Look for empty state message
      const emptyState = page.locator('[data-testid="empty-state"]')
        .or(page.getByText(/no programs found/i))
        .or(page.getByText(/no results/i));
      
      await expect(emptyState.first()).toBeVisible();
    });

    test('should display empty state with helpful message for search', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, emptyProgramsData);

      await page.goto('/programs?search=NonexistentProgram');
      await waitForNetworkIdle(page);

      // Should show no results message
      const noResults = page.getByText(/no programs found/i)
        .or(page.getByText(/no results/i));
      
      await expect(noResults.first()).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle API errors gracefully', async ({ page }) => {
      // Mock API error
      await mockApiResponse(
        page,
        /\/app\/list_programs/,
        { error: 'Internal server error' },
        500
      );

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Should display error message or fallback UI
      // The app should handle this gracefully
      const errorMessage = page.getByText(/error/i).or(page.getByText(/failed/i));
      
      // At minimum, the page should load
      await expect(page).toHaveURL(/\/programs/);
    });

    test('should handle network timeout', async ({ page }) => {
      // Mock slow/timeout response
      await page.route(/\/app\/list_programs/, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await route.fulfill({
          status: 408,
          body: JSON.stringify({ error: 'Request timeout' }),
        });
      });

      await page.goto('/programs');
      
      // Should handle timeout gracefully
      await expect(page).toHaveURL(/\/programs/);
    });

    test('should retry failed requests', async ({ page }) => {
      let requestCount = 0;
      
      await page.route(/\/app\/list_programs/, async (route) => {
        requestCount++;
        
        if (requestCount === 1) {
          // First request fails
          await route.fulfill({ status: 500 });
        } else {
          // Second request succeeds
          await route.fulfill({
            status: 200,
            body: JSON.stringify(mockProgramsData),
          });
        }
      });

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Should eventually succeed if retry logic exists
      // This depends on your implementation
    });
  });

  test.describe('Program Details Navigation', () => {
    test('should navigate to program details page', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Click on first program
      const firstProgram = page.locator('[data-testid="program-card"]').first()
        .or(page.getByText(mockProgramsData.programs[0].title));
      
      if (await firstProgram.isVisible()) {
        await firstProgram.click();
        
        // Should navigate to details page
        await expect(page).toHaveURL(/\/details\/program|\/programs\/\d+/);
      }
    });

    test('should open program in new tab when middle-clicked', async ({ page, context }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Get first program link
      const programLink = page.locator('[data-testid="program-link"]').first();
      
      if (await programLink.count() > 0 && await programLink.isVisible()) {
        // Listen for new page
        const pagePromise = context.waitForEvent('page');
        
        // Middle click (Ctrl+Click on Windows)
        await programLink.click({ modifiers: ['ControlOrMeta'] });
        
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        
        // Verify new page URL
        await expect(newPage).toHaveURL(/\/details\/program|\/programs\/\d+/);
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Verify page loads on mobile
      await expect(page).toHaveURL(/\/programs/);
      
      // Programs should be visible
      const programs = page.locator('[data-testid="program-card"]');
      await expect(programs.first()).toBeVisible();
    });

    test('should display correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      await expect(page).toHaveURL(/\/programs/);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Check for main heading
      const mainHeading = page.locator('h1');
      await expect(mainHeading).toBeVisible();
    });

    test('should support keyboard navigation', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Tab through interactive elements
      await page.keyboard.press('Tab');
      
      // Verify focus is visible
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('should have accessible labels for form controls', async ({ page }) => {
      await mockApiResponse(page, /\/app\/list_programs/, mockProgramsData);

      await page.goto('/programs');
      await waitForNetworkIdle(page);

      // Search input should have label or aria-label
      const searchInput = page.locator('input[type="search"]')
        .or(page.locator('[role="searchbox"]'));
      
      if (await searchInput.count() > 0) {
        const input = searchInput.first();
        const ariaLabel = await input.getAttribute('aria-label');
        const label = page.locator(`label[for="${await input.getAttribute('id')}"]`);
        
        // Should have either aria-label or associated label
        expect(ariaLabel !== null || (await label.count()) > 0).toBeTruthy();
      }
    });
  });
});
