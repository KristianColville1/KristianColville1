import { test, expect } from '@playwright/test';

test('certification verify link opens in a new tab with the correct URL', async ({ page }) => {
  await page.goto('/');
  const verifyLink = page.locator('#certifications').getByRole('link', { name: 'Verify' }).first();
  await expect(verifyLink).toHaveAttribute(
    'href',
    'https://www.credly.com/badges/3754c2bf-6335-46d4-8c59-91c42cae460d',
  );
  await expect(verifyLink).toHaveAttribute('target', '_blank');
  await expect(verifyLink).toHaveAttribute('rel', 'noopener noreferrer');
});

test('certifications are grouped by issuer as rows', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#certifications');
  await expect(section.getByRole('heading', { name: 'Microsoft', exact: true })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'MTA: Networking Fundamentals' })).toBeVisible();
  await expect(section.getByText('February 2021')).toBeVisible();
  await expect(section.getByRole('link', { name: 'Verify' })).toHaveCount(4);
});
