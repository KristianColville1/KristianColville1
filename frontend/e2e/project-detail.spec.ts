import { test, expect } from '@playwright/test';

test('navigating from a project card opens its case study and links back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Read case study' }).first().click();

  await expect(page).toHaveURL(/\/projects\/sample-project-one/);
  await expect(page.getByRole('heading', { name: 'Sample Project One' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/kristiancolville1/sample-project-one',
  );

  await page.getByRole('link', { name: '← Back home' }).click();
  await expect(page).toHaveURL('/');
});
