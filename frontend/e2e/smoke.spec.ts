import { test, expect } from '@playwright/test';

test('home page loads with the expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Kristian Colville — Software Engineer');
});
