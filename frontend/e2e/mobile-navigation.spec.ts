import { test, expect } from '@playwright/test';

// A short phone, deliberately: the reveal animation used to gate sections on a
// fraction of their own height, which a section taller than the screen can
// never satisfy. These regressions only show up below ~790px of viewport.
const SMALL_PHONE = { width: 360, height: 640 };

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'certifications',
  'achievements',
  'contact',
];

const sectionOpacities = (page: import('@playwright/test').Page) =>
  page.evaluate(
    (ids) =>
      ids.map((id) => ({
        id,
        opacity: parseFloat(getComputedStyle(document.getElementById(id)!).opacity),
      })),
    SECTION_IDS,
  );

test('tall sections still become visible on a short phone', async ({ page }) => {
  await page.setViewportSize(SMALL_PHONE);
  await page.goto('/');

  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect
    .poll(async () => (await sectionOpacities(page)).find((s) => s.id === 'projects')!.opacity)
    .toBe(1);
});

test('scrolling past sections quickly does not leave them blank', async ({ page }) => {
  await page.setViewportSize(SMALL_PHONE);
  await page.goto('/');

  // Jump straight to the bottom, skipping everything in between, then walk back
  // up. Anything on screen must be readable at every stop.
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));

  for (let step = 20; step >= 0; step -= 1) {
    await page.evaluate((fraction) => {
      window.scrollTo({ top: document.body.scrollHeight * (fraction / 20), behavior: 'instant' });
    }, step);

    // Poll rather than sample once — catching a section mid-fade is fine, a
    // section that never finishes fading in is the bug.
    await expect
      .poll(
        async () => {
          const faded = (await sectionOpacities(page)).filter((section) => section.opacity < 1);
          return page.evaluate(
            (ids) =>
              ids.filter((id) => {
                const rect = document.getElementById(id)!.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom > 0;
              }),
            faded.map((section) => section.id),
          );
        },
        { message: `blank sections at scroll step ${step}`, timeout: 2000 },
      )
      .toEqual([]);
  }
});

test('reduced motion renders every section without waiting on a fade', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: SMALL_PHONE });
  const page = await context.newPage();
  await page.goto('/');

  const hidden = (await sectionOpacities(page)).filter((section) => section.opacity < 1);
  expect(hidden).toEqual([]);

  await context.close();
});

test('the mobile menu overlays the page instead of pushing it down', async ({ page }) => {
  await page.setViewportSize(SMALL_PHONE);
  await page.goto('/');

  // Let webfonts and the backdrop image land first, or the comparison picks up
  // the page still settling rather than anything the menu did.
  await page.waitForLoadState('networkidle');
  const heroBefore = await page.locator('#hero').boundingBox();

  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('#mobile-menu')).toBeVisible();

  await expect
    .poll(async () => (await page.locator('#hero').boundingBox())!.y, {
      message: 'hero moved when the menu opened',
    })
    .toBe(heroBefore!.y);
});

test('the mobile menu closes when the backdrop is tapped', async ({ page }) => {
  await page.setViewportSize(SMALL_PHONE);
  await page.goto('/');

  await page.getByRole('button', { name: 'Open menu' }).click();
  const panel = page.locator('#mobile-menu');
  await expect(panel).toBeVisible();

  const box = await panel.boundingBox();
  await page.mouse.click(SMALL_PHONE.width / 2, box!.y + box!.height + 40);
  await expect(panel).not.toBeVisible();
});

test('a deep link lands on the section it names', async ({ page }) => {
  await page.setViewportSize(SMALL_PHONE);
  await page.goto('/#contact');

  // Images loading below the fold used to drag the target out from under the
  // initial scroll, landing hundreds of pixels short.
  await expect.poll(async () => page.evaluate(() => window.scrollY > 100)).toBe(true);
  await expect(page.locator('#contact')).toBeInViewport();
});

test('opening a case study starts at the top of the page', async ({ page }) => {
  await page.setViewportSize(SMALL_PHONE);
  await page.goto('/');

  await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'instant' }));
  await page.locator('a[href^="/projects/"]').first().click();

  await expect(page).toHaveURL(/\/projects\//);
  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBe(0);
});
