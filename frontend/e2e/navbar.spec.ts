import { test, expect } from '@playwright/test';

test('theme toggle switches and persists dark mode', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);

  await page.getByRole('button', { name: /light mode/i }).click();
  await expect(html).not.toHaveClass(/dark/);

  await page.reload();
  await expect(html).not.toHaveClass(/dark/);
});

test('nav links are present for every section', async ({ page }) => {
  await page.goto('/');
  for (const label of ['About', 'Skills', 'Projects', 'Certifications', 'Achievements', 'Experience', 'Contact']) {
    await expect(page.getByRole('link', { name: label })).toBeVisible();
  }
});
