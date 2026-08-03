import { test, expect } from '@playwright/test';

test('theme toggle switches and persists dark mode', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/dark/);

  await page.getByRole('button', { name: /dark mode/i }).click();
  await expect(html).toHaveClass(/dark/);

  await page.reload();
  await expect(html).toHaveClass(/dark/);
});

test('nav links are present for every section', async ({ page }) => {
  await page.goto('/');
  for (const label of ['About', 'Skills', 'Projects', 'Certifications', 'Achievements', 'Experience', 'Contact']) {
    await expect(page.getByRole('link', { name: label })).toBeVisible();
  }
});

test('logo names the site and links back to the top', async ({ page }) => {
  await page.goto('/');
  const logo = page.getByRole('link', { name: 'Kristian Colville Portfolio' });
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('href', '#hero');
});

test('clicking a nav link scrolls the target section into view', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator('#projects')).toBeInViewport();
});

test('mobile viewport hides nav links and theme toggle behind a hamburger menu', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Projects' })).not.toBeVisible();
  await expect(page.getByRole('button', { name: /dark mode/i })).not.toBeVisible();

  const menuButton = page.getByRole('button', { name: 'Open menu' });
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  await expect(page.getByRole('button', { name: /dark mode/i })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
  await page.getByRole('link', { name: 'Projects' }).click();

  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole('link', { name: 'Projects' })).not.toBeVisible();
});
