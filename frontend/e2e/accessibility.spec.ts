import { test, expect, type Page } from '@playwright/test';
import { contrastOf } from './helpers/contrast';

const AA_TEXT = 4.5;
// WCAG 2.5.5 asks for 44px; anything under that was the reason mobile felt
// fiddly, so hold the primary actions to it.
const MIN_TAP_TARGET = 44;

/**
 * Colours are mid-transition for a beat after the theme flips (`transition-colors`
 * is on most of these elements), so poll until the value settles rather than
 * sampling a frame of the fade.
 */
async function expectReadable(page: Page, selector: string, label: string) {
  await expect
    .poll(() => contrastOf(page, selector), { message: label })
    .toBeGreaterThan(AA_TEXT);
}

test('interactive text meets AA contrast in dark mode', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /dark mode/i }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  // Every link colour derives from this one token; if it passes, the class does.
  await expectReadable(page, 'nav a[href$="#projects"]', 'nav link on the dark bar');
  await expectReadable(page, 'footer nav[aria-label="Contact"] p', 'footer group label');
  await expectReadable(page, 'footer > div > div:last-child > p', 'footer copyright');
  await expectReadable(page, '#contact a', 'contact link');
});

test('the mobile menu section label is readable in both themes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const theme of ['light', 'dark'] as const) {
    await page.goto('/');
    // On mobile the theme toggle lives inside the menu, so open it first.
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();

    const isDark = await page.locator('html').evaluate((el) => el.classList.contains('dark'));
    if ((theme === 'dark') !== isDark) {
      await page.locator('#mobile-menu').getByRole('button', { name: /mode/i }).click();
    }

    await expectReadable(page, '#mobile-menu p', `"Background" label in ${theme} mode`);
    await page.keyboard.press('Escape');
  }
});

test('primary actions are large enough to tap', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const measure = async (selector: string) =>
    page.locator(selector).first().evaluate((el) => el.getBoundingClientRect().height);

  expect(await measure('a:has-text("Read case study")'), 'read case study').toBeGreaterThanOrEqual(
    MIN_TAP_TARGET,
  );
  expect(await measure('#contact a'), 'contact link').toBeGreaterThanOrEqual(MIN_TAP_TARGET);
  expect(await measure('footer nav a'), 'footer link').toBeGreaterThanOrEqual(MIN_TAP_TARGET);
  expect(await measure('#certifications a'), 'certification verify link').toBeGreaterThanOrEqual(
    MIN_TAP_TARGET,
  );
});

test('the whole project card opens the case study', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const card = page.locator('#projects article').first();
  await card.scrollIntoViewIfNeeded();
  const box = (await card.boundingBox())!;

  // Click the card's description area — nowhere near the actual link text.
  await page.mouse.click(box.x + box.width / 2, box.y + box.height * 0.6);
  await expect(page).toHaveURL(/\/projects\//);
});

test('keyboard focus is visible', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const outline = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const style = getComputedStyle(el);
    return { width: style.outlineWidth, style: style.outlineStyle, tag: el.tagName };
  });

  expect(outline.style, 'focused element must draw an outline').not.toBe('none');
  expect(parseFloat(outline.width), 'outline width').toBeGreaterThanOrEqual(2);
});
