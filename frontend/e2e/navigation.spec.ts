import { test, expect } from '@playwright/test';

test('background sections live behind a dropdown on desktop', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Education' })).not.toBeVisible();

  await page.getByRole('button', { name: 'Background' }).click();

  const educationLink = page.getByRole('link', { name: 'Education' });
  await expect(educationLink).toBeVisible();
  await educationLink.click();

  await expect(page).toHaveURL(/#education$/);
  await expect(page.locator('#education')).toBeInViewport();
  await expect(page.getByRole('link', { name: 'Education' })).not.toBeVisible();
});

test('education section lists qualifications from most recent', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#education');
  await expect(
    section.getByRole('heading', { name: 'QQI Level 8 Higher Diploma in Computer Science' }),
  ).toBeVisible();
  await expect(section.getByText('SETU, Waterford · 2024 — Present')).toBeVisible();
});
