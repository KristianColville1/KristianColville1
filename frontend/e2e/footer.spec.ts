import { test, expect } from '@playwright/test';

test('footer lists contact details and the current copyright year', async ({ page }) => {
  await page.goto('/');
  const footer = page.getByRole('contentinfo');

  await expect(footer.getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:kristiancolville96@gmail.com',
  );
  await expect(footer.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('target', '_blank');

  // tel: hands off to the OS dialer — opening it in a new tab strands a blank window.
  const phone = footer.getByRole('link', { name: 'Phone' });
  await expect(phone).toHaveAttribute('href', 'tel:+353833937493');
  await expect(phone).not.toHaveAttribute('target', '_blank');

  const year = new Date().getFullYear();
  await expect(footer.getByText(`© ${year} Kristian Colville. All rights reserved.`)).toBeVisible();
});

test('hero headline exposes the full sentence to assistive tech while it animates', async ({ page }) => {
  await page.goto('/');

  const heading = page.locator('#hero').getByRole('heading', { level: 1 });
  await expect(heading).toContainText('Software engineer who turns');
  await expect(heading).toContainText('technical problems into reliable systems.');

  // The word cycles, so the visible text should change on its own.
  const first = await heading.innerText();
  await expect
    .poll(async () => (await heading.innerText()) !== first, { timeout: 8000 })
    .toBe(true);
});
