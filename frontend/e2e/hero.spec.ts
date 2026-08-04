import { test, expect } from '@playwright/test';

test('the hero names who this is and what they do', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('#hero');

  // The identity block is the first two paragraphs: name, then role and
  // disciplines. Scoped deliberately — "Software engineer" also opens the
  // headline, so an unscoped text match is ambiguous.
  await expect(hero.locator('p').first()).toHaveText('Kristian Colville');

  const disciplines = hero.locator('p').nth(1);
  await expect(disciplines).toContainText('Software Engineer');
  for (const discipline of ['Backend', 'Real-Time Systems', 'Infrastructure', 'Integrations']) {
    await expect(disciplines).toContainText(discipline);
  }
});

for (const viewport of [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
]) {
  test(`the hero CTA clears the headline on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await expect(page.locator('#hero h1')).toBeVisible();

    // Measure the last text line's real bottom, descenders included — the line
    // box stops short of them, which is how the CTA ended up overlapping.
    const clearance = await page.evaluate(() => {
      const h1 = document.querySelector('#hero h1')!;
      const button = document.querySelector('#hero a[href="#contact"]')!;
      const range = document.createRange();
      range.selectNodeContents(h1);
      const lines = [...range.getClientRects()];
      const lastLine = lines[lines.length - 1];
      return button.getBoundingClientRect().top - lastLine.bottom;
    });

    expect(clearance, 'gap between the headline and the CTA').toBeGreaterThan(8);
  });
}
