import { test, expect } from '@playwright/test';

test('certification verify link opens in a new tab with the correct URL', async ({ page }) => {
  await page.goto('/');
  const verifyLink = page.getByRole('link', { name: 'Verify' }).first();
  await expect(verifyLink).toHaveAttribute('href', 'https://example.com/verify');
  await expect(verifyLink).toHaveAttribute('target', '_blank');
  await expect(verifyLink).toHaveAttribute('rel', 'noopener noreferrer');
});
