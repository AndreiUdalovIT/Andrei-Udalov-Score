import { expect, test } from '@playwright/test';

test('a chosen theme survives navigation and reload', async ({ page }) => {
  await page.goto('/profile');
  const dark = page.getByRole('radio', { name: 'Тёмная', exact: true });
  const light = page.getByRole('radio', { name: 'Светлая', exact: true });
  await expect(page.getByRole('radio', { name: 'Системная' })).toBeChecked();

  await dark.click();
  await expect(dark).toBeChecked();
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  await page.reload();
  await expect(dark).toBeChecked();
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);

  await page
    .getByRole('navigation', { name: 'Разделы' })
    .getByRole('link', {
      name: 'Календарь',
      exact: true,
    })
    .click();
  await expect(page).toHaveURL('/calendar');
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  await page.goBack();
  await expect(dark).toBeChecked();

  await light.click();
  await page.reload();
  await expect(light).toBeChecked();
  await expect(page.locator('html')).toHaveClass(/\blight\b/);
});

test('system theme follows the device until the user overrides it', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/profile');
  const system = page.getByRole('radio', { name: 'Системная' });
  await expect(system).toBeChecked();
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveClass(/\blight\b/);

  await page.getByRole('radio', { name: 'Тёмная', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  await system.click();
  await expect(system).toBeChecked();
  await expect(page.locator('html')).toHaveClass(/\blight\b/);
  await page.reload();
  await expect(system).toBeChecked();
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
});
