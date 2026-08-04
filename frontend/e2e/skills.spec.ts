import { test, expect } from '@playwright/test';

test('skills are listed plainly, with nothing to click and no self-rating', async ({ page }) => {
  await page.goto('/');
  const skills = page.locator('#skills');

  await expect(skills.getByRole('heading', { name: 'Languages' })).toBeVisible();
  await expect(skills.getByText('JavaScript', { exact: true })).toBeVisible();

  // The cards used to be buttons opening a panel of self-assessed levels.
  await expect(skills.getByRole('button')).toHaveCount(0);
  await expect(skills.getByRole('dialog')).toHaveCount(0);
  for (const level of ['Familiar', 'Comfortable', 'Proficient', 'Expert']) {
    await expect(skills.getByText(level, { exact: true })).toHaveCount(0);
  }
});

test('skills section explains the backend/frontend focus in prose', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#skills').getByText(/leans toward backend and integrations/)).toBeVisible();
});
