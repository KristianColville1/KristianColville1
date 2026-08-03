import { test, expect } from '@playwright/test';

test('navigating from a project card opens its case study and links back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Read case study' }).first().click();

  await expect(page).toHaveURL(/\/projects\/churchcamlive/);
  await expect(page.getByRole('heading', { name: 'ChurchCamLive.ie' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Live demo' })).toHaveAttribute(
    'href',
    'https://churchcamlive.ie',
  );

  await page.getByRole('link', { name: '← Back home' }).click();
  await expect(page).toHaveURL('/');
});
