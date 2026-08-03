import { test, expect } from '@playwright/test';

test('navigating from a project card opens its case study and links back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Read case study' }).first().click();

  await expect(page).toHaveURL(/\/projects\/churchcamlive$/);

  // Scope to the detail page so assertions wait for the new view to mount
  // rather than racing the still-mounted home page.
  const detail = page.getByTestId('project-detail-page');
  await expect(detail.getByRole('heading', { name: 'ChurchCamLive', exact: true })).toBeVisible();
  await expect(detail.getByRole('link', { name: 'Live demo' })).toHaveAttribute(
    'href',
    'https://churchcamlive.ie',
  );

  await page.getByRole('link', { name: '← Back home' }).click();
  await expect(page).toHaveURL('/');
});

test('client work is split into active and completed groups', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#projects');

  await expect(section.getByRole('heading', { name: 'Active Client Work' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Completed Client Work' })).toBeVisible();

  await expect(section.getByRole('heading', { name: 'ChurchCamLive CRM' })).toBeVisible();
  await expect(section.getByRole('heading', { name: 'Employee Management System' })).toBeVisible();
});

test('a project without a public repo hides the GitHub button', async ({ page }) => {
  await page.goto('/projects/employee-management-system');
  const detail = page.getByTestId('project-detail-page');
  await expect(detail.getByRole('link', { name: 'Live demo' })).toBeVisible();
  await expect(detail.getByRole('link', { name: 'GitHub' })).toHaveCount(0);
});
