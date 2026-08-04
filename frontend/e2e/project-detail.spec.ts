import { test, expect } from '@playwright/test';

test('navigating from a project card opens its case study and links back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Read case study' }).first().click();

  await expect(page).toHaveURL(/\/projects\/garda-training-systems$/);

  // Scope to the detail page so assertions wait for the new view to mount
  // rather than racing the still-mounted home page.
  const detail = page.getByTestId('project-detail-page');
  await expect(
    detail.getByRole('heading', { name: 'Garda Training Centre Systems', exact: true }),
  ).toBeVisible();

  await page.getByRole('link', { name: '← Back home' }).click();
  await expect(page).toHaveURL('/');
});

test('the home page shows selected work, not the whole back catalogue', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#projects');

  await expect(section.getByRole('heading', { name: 'Selected work' })).toBeVisible();
  await expect(section.locator('article')).toHaveCount(5);

  // The strongest story leads.
  await expect(section.locator('article h4').first()).toHaveText('Garda Training Centre Systems');
});

test('the rest of the work lives on a dedicated page', async ({ page }) => {
  await page.goto('/');
  await page.locator('#projects').getByRole('link', { name: /See all \d+ projects/ }).click();

  await expect(page).toHaveURL(/\/projects$/);
  const index = page.getByTestId('projects-index-page');
  await expect(index.getByRole('heading', { name: 'All projects' })).toBeVisible();
  await expect(index.locator('article')).toHaveCount(7);

  // Work that isn't featured on the home page is still reachable here.
  await expect(index.getByRole('heading', { name: 'ChurchCamLive CRM' })).toBeVisible();
});

test('a project without a public repo hides the GitHub button', async ({ page }) => {
  await page.goto('/projects/employee-management-system');
  const detail = page.getByTestId('project-detail-page');
  await expect(detail.getByRole('link', { name: 'Live demo' })).toBeVisible();
  await expect(detail.getByRole('link', { name: 'GitHub' })).toHaveCount(0);
});
