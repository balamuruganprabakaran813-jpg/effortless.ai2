import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly expectedUrlPattern = /login/i;

  readonly identifierField: Locator;
  readonly passwordField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.identifierField = page.locator(
      'input[type="email"], input[name*="email" i], input[name*="username" i], input[placeholder*="email" i], input[placeholder*="username" i]'
    );
    this.passwordField = page.locator('input[type="password"]');
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page).toHaveURL(this.expectedUrlPattern);
    await expect(this.identifierField.first()).toBeVisible();
    await expect(this.passwordField.first()).toBeVisible();
  }
}