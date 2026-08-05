import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly path = '/';

  readonly header: Locator;
  readonly loginLink: Locator;
  readonly scheduleDemoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.loginLink = page.getByRole('link', { name: 'Login', exact: true }).first();
    this.scheduleDemoLink = page
      .getByRole('link', { name: 'Schedule Demo', exact: false })
      .or(page.getByRole('button', { name: 'Schedule Demo', exact: false }))
      .first();
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.path);
  }

  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/goeffortless\.ai\/?$/);
    await expect(this.header).toBeVisible();
  }

  
  async verifyHeaderModulesClickable(): Promise<void> {
    const headerLinks = this.header.getByRole('link');
    const count = await headerLinks.count();

    expect(count, 'Expected at least one link in the header').toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = headerLinks.nth(i);
      await expect(link, `Header link at index ${i} should be visible`).toBeVisible();
      await expect(link, `Header link at index ${i} should be enabled`).toBeEnabled();

      const href = await link.getAttribute('href');
      expect(href, `Header link at index ${i} should have an href`).toBeTruthy();
    }
  }


  async clickLogin(): Promise<Page> {
    await expect(this.loginLink).toBeVisible();

    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 5_000 }).catch(() => null),
      this.loginLink.click(),
    ]);

    const destination = popup ?? this.page;
    await destination.waitForLoadState('domcontentloaded');
    return destination;
  }

  
  async clickScheduleDemo(): Promise<Page> {
    await expect(this.scheduleDemoLink).toBeVisible();

    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 5_000 }).catch(() => null),
      this.scheduleDemoLink.click(),
    ]);

    const destination = popup ?? this.page;
    await destination.waitForLoadState('domcontentloaded');
    return destination;
  }
}