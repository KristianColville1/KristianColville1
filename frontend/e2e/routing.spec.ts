import { test, expect } from '@playwright/test';

test('unknown project slug redirects to home', async ({ page }) => {
  await page.goto('/projects/does-not-exist');
  await expect(page).toHaveURL('/');
  await expect(page.getByTestId('home-page')).toBeVisible();
});

test('known project slug stays on the project detail page', async ({ page }) => {
  await page.goto('/projects/churchcamlive');
  await expect(page.getByTestId('project-detail-page')).toBeVisible();
});
