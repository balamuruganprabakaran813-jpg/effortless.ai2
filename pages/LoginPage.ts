import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly signUpButton: Locator;

    constructor(page: Page) {

        console.log("LoginPage Loaded Successfully");

        this.page = page;

        this.signUpButton = page.getByRole("button", {
            name: /Sign Up/i,
        });
    }

    async verifyLoginPageLoaded(): Promise<void> {

        await this.page.waitForLoadState("domcontentloaded");

        await expect(this.page).toHaveURL(/goeffortless\.ai/);
    }

    async clickSignUp(): Promise<void> {

        await this.signUpButton.click();
    }

    async verifySignUpPageLoaded(): Promise<void> {

        await expect(this.page).toHaveURL(/signup/);
    }

}