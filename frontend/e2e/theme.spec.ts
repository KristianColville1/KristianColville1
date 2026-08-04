import { test, expect } from '@playwright/test';
import { contrastOf } from './helpers/contrast';

for (const theme of ['light', 'dark'] as const) {
  test(`case study text stays readable in ${theme} mode`, async ({ page }) => {
    await page.goto('/');
    if (theme === 'dark') {
      await page.getByRole('button', { name: /dark mode/i }).click();
    }

    await page.goto('/projects/churchcamlive-crm');
    await expect(page.getByTestId('project-detail-page')).toBeVisible();

    const ratio = await contrastOf(page, '[data-testid="project-detail-page"] h1');
    expect(ratio, `contrast in ${theme} mode`).toBeGreaterThan(4.5);
  });
}
