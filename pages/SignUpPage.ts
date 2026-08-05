import { expect, Locator, Page } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;

  // Step 1 - Confirm Email
  readonly emailTextBox: Locator;
  readonly continueButton: Locator;

  // Step 2 - Personal Details
  readonly firstNameTextBox: Locator;
  readonly lastNameTextBox: Locator;
  readonly phoneNumberTextBox: Locator;

  // Step 3 - Business Details
  readonly companyNameTextBox: Locator;
  readonly companyWebsiteTextBox: Locator;

  // Step 4 - Password
  readonly passwordTextBox: Locator;
  readonly confirmPasswordTextBox: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step 1
    this.emailTextBox = page.locator("input[type='email']");
    this.continueButton = page.getByRole("button", { name: /continue/i });

    // Step 2
    this.firstNameTextBox = page.locator("input[name='firstName']");
    this.lastNameTextBox = page.locator("input[name='lastName']");
    this.phoneNumberTextBox = page.locator("input[name='phone']");

    // Step 3
    this.companyNameTextBox = page.locator("input[name='companyName']");
    this.companyWebsiteTextBox = page.locator("input[name='website']");

    // Step 4
    this.passwordTextBox = page.locator("input[name='password']");
    this.confirmPasswordTextBox = page.locator("input[name='confirmPassword']");
    this.createAccountButton = page.getByRole("button", {
      name: /create account/i,
    });
  }

  async verifySignUpPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/signup/);
  }

  async confirmEmail(email: string): Promise<void> {
    await this.emailTextBox.fill(email);
    await this.continueButton.click();
  }

  async enterPersonalDetails(
    firstName: string,
    lastName: string,
    phone: string
  ): Promise<void> {
    await this.firstNameTextBox.fill(firstName);
    await this.lastNameTextBox.fill(lastName);
    await this.phoneNumberTextBox.fill(phone);
    await this.continueButton.click();
  }

  async enterBusinessDetails(
    companyName: string,
    website: string
  ): Promise<void> {
    await this.companyNameTextBox.fill(companyName);
    await this.companyWebsiteTextBox.fill(website);
    await this.continueButton.click();
  }

  async createPassword(
    password: string,
    confirmPassword: string
  ): Promise<void> {
    await this.passwordTextBox.fill(password);
    await this.confirmPasswordTextBox.fill(confirmPassword);
    await this.createAccountButton.click();
  }
}