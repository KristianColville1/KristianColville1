import { test, expect } from '@playwright/test';

test('home page renders every section in order', async ({ page }) => {
  await page.goto('/');
  const sectionIds = await page
    .locator('section[id]')
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionIds).toEqual([
    'hero',
    'about',
    'skills',
    'projects',
    'certifications',
    'achievements',
    'experience',
    'contact',
  ]);
});

test('mobile viewport renders without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasOverflow).toBe(false);
});
