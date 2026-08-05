import { expect, Locator, Page } from "@playwright/test";
import { ENV } from "../config/env";

export class HomePage {
  readonly page: Page;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByRole("link", {
      name: "Login",
    });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(ENV.BASE_URL);
  }

  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(ENV.BASE_URL);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }
}