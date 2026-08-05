import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";

test("Navigate to Signup Page", async ({ page }) => {

    // Home Page
    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();
    await homePage.verifyHomePageLoaded();

    // Login opens in new tab
    const [loginTab] = await Promise.all([
        page.context().waitForEvent("page"),
        homePage.clickLogin(),
    ]);

    await loginTab.waitForLoadState();

    // Login Page
    const loginPage = new LoginPage(loginTab);

    console.log(loginPage);

    console.log(
        Object.getOwnPropertyNames(
            Object.getPrototypeOf(loginPage)
        )
    );

    await loginPage.verifyLoginPageLoaded();

    await loginPage.clickSignUp();

    await loginPage.verifySignUpPageLoaded();

});