import { test, expect } from '@playwright/test';

test('a case study page carries the nav and footer', async ({ page }) => {
  await page.goto('/projects/garda-training-systems');

  await expect(page.getByRole('link', { name: 'Kristian Colville Portfolio' })).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('nav links from a case study return to the right section', async ({ page }) => {
  await page.goto('/projects/garda-training-systems');

  await page.getByRole('link', { name: 'Projects', exact: true }).click();

  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator('#projects')).toBeInViewport();
});

test('a case study offers a way to get in touch', async ({ page }) => {
  await page.goto('/projects/garda-training-systems');
  const detail = page.getByTestId('project-detail-page');

  await expect(detail.getByRole('link', { name: 'Email me' })).toHaveAttribute(
    'href',
    /^mailto:/,
  );
  await expect(detail.getByRole('link', { name: 'All contact details' })).toBeVisible();
});

test('case studies link on to the neighbouring projects', async ({ page }) => {
  await page.goto('/projects/garda-training-systems');
  const pager = page.getByRole('navigation', { name: 'More projects' });

  // The first project has a next but no previous.
  await expect(pager.getByRole('link')).toHaveCount(1);

  await pager.getByRole('link').first().click();
  await expect(page).toHaveURL(/\/projects\/martbids-streaming$/);
  await expect(page.getByRole('navigation', { name: 'More projects' }).getByRole('link')).toHaveCount(
    2,
  );
});

test('case study subsections sit one level under the title', async ({ page }) => {
  await page.goto('/projects/garda-training-systems');
  const detail = page.getByTestId('project-detail-page');

  await expect(detail.locator('h1')).toHaveCount(1);
  // Problem/Approach/Key decisions/Outcome (+ challenge) and the contact CTA —
  // all h2, so nothing skips from h1 to h3.
  await expect(detail.locator('h3')).toHaveCount(0);
  expect(await detail.locator('h2').count()).toBeGreaterThanOrEqual(5);
});
