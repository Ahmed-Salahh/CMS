/**
 * Global test configuration and setup
 * This file runs before all tests
 */

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');

  // Check if the app is running
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(config.projects[0].use.baseURL || 'http://localhost:3000', {
      timeout: 30000,
    });
    console.log('✅ Application is accessible');
  } catch (error) {
    console.error('❌ Application is not accessible. Make sure the dev server is running.');
    console.error('   Run: npm run dev');
    throw error;
  } finally {
    await browser.close();
  }

  console.log('✅ Global setup complete\n');
}

export default globalSetup;
