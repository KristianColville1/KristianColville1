import { test, expect } from '@playwright/test';

test('clicking a skill card opens an offcanvas with usage and proficiency detail', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Languages' }).click();

  const panel = page.getByRole('dialog', { name: 'Languages' });
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('heading', { name: 'JavaScript' })).toBeVisible();
  await expect(panel.getByText('Core language for both React front ends and Node.js services.')).toBeVisible();
  await expect(panel.getByText('Proficient').first()).toBeVisible();

  await panel.getByRole('button', { name: 'Close panel' }).click();
  await expect(panel).not.toBeVisible();
});

test('skills section shows focus-area progress indicators', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('progressbar', { name: 'Backend & Integrations' })).toHaveAttribute(
    'aria-valuenow',
    '75',
  );
  await expect(page.getByRole('progressbar', { name: 'Frontend' })).toHaveAttribute('aria-valuenow', '25');
});
