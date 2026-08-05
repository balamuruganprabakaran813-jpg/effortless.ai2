import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Effortless AI Home Page', () => {

    test('Verify all header modules are clickable', async ({ page }) => {

        const homePage = new HomePage(page);

        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();
        await homePage.verifyHeaderModulesClickable();

    });

    test('Verify Login button opens Login page', async ({ page }) => {

        const homePage = new HomePage(page);

        await homePage.navigateToHomePage();
        await homePage.clickLogin();

        await expect(page).toHaveURL(/login|signin/i);

    });

    test('Verify Schedule Demo page opens successfully', async ({ page }) => {

        const homePage = new HomePage(page);

        await homePage.navigateToHomePage();
        // Click the Schedule Demo link/button directly if HomePage helper is unavailable
        await page.click('text=Schedule Demo');

        await expect(page).toHaveURL(/schedule|demo/i);

    });

});