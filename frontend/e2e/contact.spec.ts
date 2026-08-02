import { test, expect } from '@playwright/test';

test('contact section exposes working links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:kristiancolville96@gmail.com',
  );
  await expect(page.getByRole('link', { name: 'GitHub' }).last()).toHaveAttribute(
    'href',
    'https://github.com/kristiancolville1',
  );
});

test('hero CTA scrolls to the contact section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Get in touch' }).click();
  await expect(page).toHaveURL(/#contact$/);
});
