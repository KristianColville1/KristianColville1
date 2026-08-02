import { test, expect } from '@playwright/test';

test('contact section exposes working links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:kristiancolville96@gmail.com',
  );
  const githubLink = page.locator('#contact').getByRole('link', { name: 'GitHub' });
  await expect(githubLink).toHaveAttribute('href', 'https://github.com/kristiancolville1');
  await expect(githubLink).toHaveAttribute('target', '_blank');
  await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
});

test('hero CTA scrolls to the contact section', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Get in touch' }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
});
