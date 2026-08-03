import { test, expect } from '@playwright/test';

test('page exposes social and icon metadata', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Kristian Colville — Software Engineer');

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute('content', /Full-stack software engineer in Ireland/);

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Kristian Colville — Software Engineer',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-card\.jpg$/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/apple-touch-icon.png');
});

test('favicon and social card are actually served', async ({ page, request }) => {
  await page.goto('/');
  for (const asset of ['/favicon.svg', '/apple-touch-icon.png', '/images/og-card.jpg']) {
    const response = await request.get(asset);
    expect(response.status(), `${asset} should be served`).toBe(200);
  }
});
