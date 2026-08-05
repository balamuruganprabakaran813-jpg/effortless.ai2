import { test } from '@playwright/test';

test('DEBUG: capture state after clicking Login', async ({ page }) => {
  await page.goto('https://goeffortless.ai/');

  const loginLink = page.getByRole('link', { name: 'Login', exact: true }).first();
  await loginLink.click();

  await page.waitForTimeout(2000);

  console.log('URL after click:', page.url());

  const dialogCount = await page.getByRole('dialog').count();
  console.log('role="dialog" elements found:', dialogCount);

  const passwordFieldCount = await page.locator('input[type="password"]').count();
  console.log('password fields found on page:', passwordFieldCount);

  await page.screenshot({ path: 'debug-after-login-click.png', fullPage: true });
  console.log('Screenshot saved to debug-after-login-click.png');
});